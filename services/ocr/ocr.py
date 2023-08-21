
import numpy as np
import cv2, qrcode, pytesseract, time, ast, pika, datetime

debug_mode = False
DEBUG_IMG_SCALE = 0.15
RABBITMQ_HOST = "127.0.0.1"

class QRCodeError(Exception):
    pass

class NamesDetectionError(Exception):
    pass

class db():
    def get_class(id): #TODO: Request databáze
        connection = pika.BlockingConnection(pika.ConnectionParameters(RABBITMQ_HOST))
        channel = connection.channel()

        channel.queue_declare(queue='user_request_queue')
        channel.basic_publish(exchange='',
                            routing_key='user_request_queue',
                            body=str({"class_id": id}))

        channel.queue_declare(queue='user_queue')
        def callback(ch, method, properties, body):
            channel.stop_consuming()
            connection.close()
            return body

        channel.basic_consume(queue='user_queue', on_message_callback=callback, auto_ack=True)
        channel.start_consuming()

    def save(records):
        connection = pika.BlockingConnection(pika.ConnectionParameters(RABBITMQ_HOST))
        channel = connection.channel()

        channel.queue_declare(queue='absence_queue')
        channel.basic_publish(exchange='',
                            routing_key='absence_queue',
                            body=str(records))
        connection.close()

class Image():
    """
    General image manipulation
    """
    def resize(img, size:float):
        """
        Resize the image
        """
        width = int(img.shape[1] * size)
        height = int(img.shape[0] * size)
        return cv2.resize(img, (width, height), interpolation = cv2.INTER_AREA)
    
    def convert_to_binary(img, val1:int, val2:int):
        """
        Converts image to binary
        """
        try: img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        except: None
        _, thresh_img = cv2.threshold(img, val1, val2, cv2.THRESH_BINARY) #Convert to binary image
        return thresh_img

    def crop_paper(img):
        """
        Crop the paper in image
        """
        thresh_img = Image.convert_to_binary(img, 120, 255)
        filtered_img = cv2.medianBlur(thresh_img, 81) #Filter showing approximate shape of the paper
        edges_img = cv2.Canny(filtered_img, 100, 200) #Edge detection
        contours, _ = cv2.findContours(edges_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        x, y, w, h = cv2.boundingRect(contours[0])

        if h < (img.shape[0]/3) or w < (img.shape[1]/3): #If too small, probably poorly defined edges
            if debug_mode: print("Using default paper size")
            return img

        if debug_mode: print(f"Using cropped paper image {[y, y+h, x, x+w]}")
        return img[y:y+h, x:x+w] #Crop

    def crop_table(img):
        """
        get table from image
        """
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        gray_thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 17, 9)
        gray_thresh = cv2.bilateralFilter(gray_thresh, 9, 75, 75)
        binary = Image.convert_to_binary(gray_thresh, 130, 255)

        filtered_img = cv2.medianBlur(binary, 3)
        inverted_img = cv2.bitwise_not(filtered_img)

        contours, _ = cv2.findContours(inverted_img, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        if debug_mode: print("Detect edges")

        max_area = 0
        best_rect = None
        for contour in contours:
            x, y, w, h = cv2.boundingRect(contour)
            area = w * h
            if area > max_area:
                max_area = area
                best_rect = (x, y, w, h)

        x, y, w, h = best_rect

        #if debug_mode: cv2.imshow("Table img", Image.resize(binary[y:y+h, x:x+w], DEBUG_IMG_SCALE)) #image_scale

        if debug_mode: print(f"Crop image to {[y-25, y+h+250, x-25, x+w+25]}")

        img = img[y-25:y+h+25, x-25:x+w+25]
        return Image.fix_rotation(img)
    
    def fix_rotation(img):
        """
        Fix image rotation
        """
        if debug_mode: print("Image loaded to rotaion fix")
        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur_gray = cv2.GaussianBlur(gray_img, (5, 5), 0)
        edges = cv2.Canny(blur_gray, 50, 150)

        threshold = 300
        min_line_length = int(img.shape[1]/8) 
        max_line_gap = int(min_line_length/15) 
        #Detect lines on image
        raw_lines = cv2.HoughLinesP(edges, 1, np.pi / 180, threshold, 
                                    np.array([]), min_line_length, max_line_gap)

        lines = []
        for line in raw_lines:
            for x1,y1,x2,y2 in line:
                if y1+20 > y2 and y1-20 < y2:
                    if x1 > img.shape[1]/6 and y1 > img.shape[0]/8:
                        lines.append([x1, x2, y1, y2]) #Filter lines

        fix = 0
        for line in lines:
            x1, x2, y1, y2 = line
            if fix == 0: fix = y2-y1
            else: fix = (fix + (y2-y1))/2
        fix = int(fix)

        fix_rad = np.arctan2(fix, img.shape[1]) #Calculate rotation
        fix_deg = np.degrees(fix_rad)

        if debug_mode: print(f"Rotate fix = {int(fix_deg*1000)/1000}")
        
        height, width = img.shape[:2]
        rotation = cv2.getRotationMatrix2D((width / 2, height / 2), fix_deg, 1)
        fixed_img = cv2.warpAffine(img, rotation, (width, height))

        if debug_mode: print("Rotation done")
        return fixed_img
    
    def slice_and_process(img, qr_data, week_number):
        """
        Slice image and process data
        """
        students = db.get_class(qr_data["class_id"])

        height = img.shape[0]
        width = img.shape[1]   

        if debug_mode: print("Calculate line height")

        SCALE = 750
        lines = []
        avrg_height, last_line, starter_point = 0, 0, 0
        binary_img = Image.convert_to_binary(img, 130, 255)[0:height, int(width/4):int(width/4)*2]
        scale = scale = SCALE/height

        if binary_img.shape[0] > SCALE:
            binary_img = Image.resize(binary_img, scale)

        for row_index in range(binary_img.shape[0]): #Own line detection system
            row_pixels = 0
            for column_index in range(binary_img.shape[1]):
                pixel_value = binary_img[row_index, column_index]
                if pixel_value < 100:
                    row_pixels += 1
            
            if row_pixels > binary_img.shape[1]/3:
                if row_index > last_line+20:
                    if starter_point == 0 and row_index/scale > int(height/16): starter_point = int(row_index/scale)
                    if not last_line == 0:
                        calc_height = row_index - last_line
                        if avrg_height == 0: avrg_height = calc_height
                        else: avrg_height = (avrg_height + calc_height) / 2
                    last_line = row_index

        line_height = int(avrg_height/scale)-5
        location = starter_point

        if debug_mode: print(f"Line height is {line_height}")
        
        lines = []
        while location < height:
            line = [0, width, location, location]
            lines.append(line)
            location += int(line_height) #int(line_height/2.5) 

        if debug_mode: print("OCR processing started")

        names = []
        records = []
        fixes = [0, -10, 10, -20, 20]
        last_fix = 0
        last_valid_name = None
        for line in lines:
            x1, x2, y1, _ = line
            for fix in fixes:
                fixed_height = y1+fix+last_fix
                if fixed_height < 0: fixed_height = 0
                cut_img = img[fixed_height:fixed_height+line_height, x1:x2] #Cut to slices
                if cut_img.shape[0] == line_height:
                    data = Engine.slice_processing(cut_img, last_valid_name, students)
                    if data[0]: 
                        if not data[0] in names: names.append(data[0])

                        new_fix = 0
                        for cords in data[2]:
                            calc_fix = (cut_img.shape[0]/2) - (cords[0] + (cords[1]/2))
                            if new_fix == 0: new_fix = calc_fix
                            else: new_fix = (new_fix + calc_fix) / 2
                        new_fix = int(-new_fix)

                        for absence in data[1]:
                            if absence:
                                year = datetime.datetime.today().strftime("%Y")
                                day = absence // 10
                                date = datetime.datetime.strptime(f"{year}-W{week_number}-{1+day}", "%Y-W%W-%w").strftime('%Y-%m-%d')
                                for student in students:
                                    if student["name"] == data[0]:
                                        record = {"id": student["id"], "lesson": absence-(day*10), "date": date}
                                if not record in records: 
                                    records.append(record)
                        if not last_valid_name == data[0]:
                            last_valid_name = data[0]
                            last_fix += new_fix + fix
                            break

        if debug_mode: print(f"Recognized {len(names)} names:", names)

        #if len(names) < (len(students)/100)*90: 
        #    raise NamesDetectionError("OCR detection error")

        return records

class Qr():
    """
    Qr code stuff
    """
    def create(class_id:str):
        """
        Make Qr code with data, return image
        """
        return qrcode.make({"class_id": class_id})

    def process(img):
        """
        If needed rotates img and get qr data, returns img, data
        """
        qr_data, x, y = None, None, None
        binary_img = Image.convert_to_binary(img, 130, 255)

        if debug_mode: print("QR processing...")
        qr_decoder = cv2.QRCodeDetector()
        data, bbox, _ = qr_decoder.detectAndDecode(binary_img)

        if bbox is None: #If qr not decoded try flip
            if debug_mode: print("QR processing... (2. try)")
            rotated_img = cv2.rotate(binary_img, cv2.ROTATE_180)
            data, bbox, _ = qr_decoder.detectAndDecode(rotated_img)
            if bbox is not None:
                qr_data = data
                if debug_mode: print("Flip the image")
                img = cv2.rotate(img, cv2.ROTATE_180)
                x, y = bbox[0][0] #qrcode cords

        else: 
            x, y = bbox[0][0] #qrcode cords
            qr_data = data

        if qr_data:
            if x > img.shape[1]/2 or y > img.shape[0]/2: #if not in top right corner, flip it
                if debug_mode: print("Flip the image")
                img = cv2.rotate(img, cv2.ROTATE_180)

            return img, ast.literal_eval(qr_data) #Convert to dict
        
        if debug_mode: print(f"QR error: {data}, {bbox}")
        raise QRCodeError("QRCode is not readable") #No readable qrcode on img

class OCR():
    """
    OCR processing
    """
    def img_processing(input_img):
        """
        Get raw text from image
        """
        gray_img = cv2.cvtColor(input_img, cv2.COLOR_BGR2GRAY)
        gray_thresh_img = cv2.adaptiveThreshold(gray_img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 17, 9)
        gray_thresh_img = cv2.bilateralFilter(gray_thresh_img, 9, 75, 75)
        gray_thresh_img = cv2.medianBlur(gray_thresh_img, 3)
        binary_img = Image.convert_to_binary(gray_thresh_img, 130, 255)
        edges_img = cv2.Canny(binary_img, 100, 200) #Edge detection

        data = pytesseract.image_to_data(edges_img, lang="ces", output_type=pytesseract.Output.DICT)

        cords, text = [], []
        for i in range(len(data["text"])):
            raw_text = data["text"][i]
            banned_chars = ",.|\\/=—-1234567890()[]><!?:„“ "
            for char in banned_chars:
                raw_text = raw_text.replace(char, "")

            if not raw_text == "" and len(raw_text) > 3:
                text.append(data["text"][i])
                cords.append([data["top"][i], data["height"][i]])

        return " ".join(text), cords #Test return

class Engine():
    """
    Primary functions
    """
    def process(input_img, week_number):
        """
        Image processing for the required data
        """
        start = time.time()

        if debug_mode: print("Load image")

        paper_img = Image.crop_paper(input_img)
        filtered_img = cv2.medianBlur(paper_img, 3)

        if debug_mode: print("Filter image")

        if filtered_img.shape[0] > filtered_img.shape[1]: #Turn horizontal
            if debug_mode: print("Rotate image 90 degrees")
            filtered_img = cv2.rotate(filtered_img, cv2.ROTATE_90_CLOCKWISE) 

        img, qr_data = Qr.process(filtered_img) #Get qr data, flip if needed
        table_img = Image.crop_table(img)

        data = Image.slice_and_process(table_img, qr_data, week_number)

        if debug_mode: print("Save to database")

        db.save(data)

        if debug_mode: print(f"Done in {int((time.time()-start)*100)/100}")

        """if debug_mode:
            cv2.waitKey(0) #Q for closing the window
            cv2.destroyAllWindows()"""

        return data

    def is_name_here(students, text:str):
        """
        Find name from list in text
        """
        text = text.lower().replace(" ", "")

        best_match = 0
        best_match_name = ""
        for name in students:
            edited_name = name.lower().replace(" ", "")
            if edited_name in text: return name

            index, count = 0, 0
            for i in range(len(name)):
                char = name[i]
                if char in text[index:]:
                    index = text.index(char, index) + 1
                    count += 1
                    if index == len(text):
                        break
            
            match =  (count / len(name)) * 100

            if match > best_match:
                best_match = match
                best_match_name = name

        if best_match >= 50:
            return best_match_name
        
        best_match = 0
        best_match_name = ""
        for name in students:
            match = len(set(name).intersection(set(text))) / len(set(name)) * 100
            if match > best_match:
                best_match = match
                best_match_name = name

        if best_match >= 50:
            return best_match_name

        return None

    def slice_processing(img, last_valid_name:str, raw_students:dict):
        """
        Image slice processing
        """
        students = []
        for student in raw_students:
            students.append(student["name"])

        #Limit list to prevent bad name detection
        if last_valid_name == None: last_valid_name = 0
        else: last_valid_name = students.index(last_valid_name)

        if last_valid_name == 0:
            students = students[:4]
        else:
            num = last_valid_name-1
            max = num+4
            if max > len(students): max = len(students)
            students = students[num:max]

        names_cut_img = img[0:img.shape[0], 0:int(img.shape[1]/5.5)]
        data, cords = OCR.img_processing(names_cut_img)
        if len(data) < 5: return None, None, cords

        name = Engine.is_name_here(students, data)
        if name == None: return None, None, cords
        
        if debug_mode: print(f"OCR scan: {name}")
        
        absence_cut_img = img[0:img.shape[0], int(img.shape[1]/7):img.shape[1]]
        binary_img = Image.convert_to_binary(absence_cut_img, 130, 255)

        lines = []
        last_line = 0
        for column_index in range(binary_img.shape[1]): #Own line detection system
            column_pixels = 0
            for row_index in range(binary_img.shape[0]):
                pixel_value = binary_img[row_index, column_index]
                if pixel_value < 100:
                    column_pixels += 1
            
            if column_pixels > binary_img.shape[0]/1.5:
                if column_index > last_line+10 or last_line == 0:
                    lines.append(column_index)
                last_line = column_index

        last_cut = 0
        hour = -2
        absence = []
        for line in lines:
            rectangle_img = binary_img[0:binary_img.shape[0], last_cut:line] #Cut small part
            last_cut = line

            SCALE = 40
            if rectangle_img.shape[1] > binary_img.shape[0]/2:
                hour += 1
                height, width = rectangle_img.shape
                if height > SCALE:
                    scale = SCALE/height
                    rectangle_img = Image.resize(rectangle_img, scale)
                    height, width = rectangle_img.shape

                for row_index in range(height):
                    black_pixel_count = 0
                    for column_index in range(width):
                        pixel_value = rectangle_img[row_index, column_index]
                        if pixel_value < 100:
                            black_pixel_count += 1

                    if black_pixel_count > height/2.5:
                        rectangle_img[row_index, :] = 255

                slash_posible = 0
                for column_index in range(width):
                    black_pixel_count = 0
                    for row_index in range(height):
                        pixel_value = rectangle_img[row_index, column_index]
                        if pixel_value < 100:
                            black_pixel_count += 1

                    if black_pixel_count < width/3 and black_pixel_count > width/26:
                        slash_posible += 1

                if slash_posible > width/4:
                    if hour >= 0: 
                        absence.append(hour)

        return name, absence, cords

if "__main__" == __name__:
    debug_mode = True

    #img = Qr.create("01557898-f61c-11ed-b67e-0242ac120002")
    #img.save("Qr.jpg")

    print(Engine.process(cv2.imread("ocr-service/imgs/img1.jpg"), 22))
