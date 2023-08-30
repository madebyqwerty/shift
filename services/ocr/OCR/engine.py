
from OCR.db import db
from OCR.image_edit import Image
from OCR.ocr import OCR, Qr
import time, cv2, datetime

class Engine():
    """
    OCR service engine
    """
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

    def slice_processing(img, last_valid_name:str, raw_students:list):
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
        data, cords = OCR.img_processing(names_cut_img, Image)
        if len(data) < 5: return None, None, cords

        name = Engine.is_name_here(students, data)
        if name == None: return None, None, cords
        
        print(f"OCR scanning...")
        
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

    def process_slices(img, lines, line_height, students, week_number):
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

        print(f"Recognized {len(names)} names")

        return records

    def process(input_img, week_number, connection, scan_id):
        """
        Image processing for the required data
        """
        start = time.time()

        print("Load image")

        paper_img = Image.crop_paper(input_img)
        filtered_img = cv2.medianBlur(paper_img, 3)

        print("Filter image")

        if filtered_img.shape[0] > filtered_img.shape[1]: #Turn horizontal
            print("Rotate image 90 degrees")
            filtered_img = cv2.rotate(filtered_img, cv2.ROTATE_90_CLOCKWISE) 

        img, qr_data = Qr.process(filtered_img, Image) #Get qr data, flip if needed
        table_img = Image.crop_table(img)

        students = db.get_class(qr_data["class_id"], connection)
    
        lines, line_height = Image.slice_and_process(table_img)

        print("OCR processing started")

        data = Engine.process_slices(table_img, lines, line_height, students, week_number)

        print("Save to database")

        db.save(data, connection, scan_id)

        print(f"Done in {int((time.time()-start)*100)/100}")

        return data


if "__main__" == __name__:
    img = Qr.create("01557898-f61c-11ed-b67e-0242ac120002")
    img.save("Qr.jpg")