
from OCR.better_print import better_print
import numpy as np
import cv2

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
            better_print("🐍 Python > Using default paper size")
            return img

        better_print(f"🐍 Python > Using cropped paper image {[y, y+h, x, x+w]}")
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
        better_print("🐍 Python > Detect edges")

        max_area = 0
        best_rect = None
        for contour in contours:
            x, y, w, h = cv2.boundingRect(contour)
            area = w * h
            if area > max_area:
                max_area = area
                best_rect = (x, y, w, h)

        x, y, w, h = best_rect

        better_print(f"🐍 Python > Crop image to {[y-25, y+h+250, x-25, x+w+25]}")

        img = img[y-25:y+h+25, x-25:x+w+25]
        return Image.fix_rotation(img)
    
    def fix_rotation(img):
        """
        Fix image rotation
        """
        better_print("🐍 Python > Image loaded to rotaion fix")
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

        better_print(f"🐍 Python > Rotate fix = {int(fix_deg*1000)/1000}")
        
        height, width = img.shape[:2]
        rotation = cv2.getRotationMatrix2D((width / 2, height / 2), fix_deg, 1)
        fixed_img = cv2.warpAffine(img, rotation, (width, height))

        better_print("🐍 Python > Rotation done")
        return fixed_img
    
    def slice_and_process(img):
        """
        Slice image and process data
        """
        height = img.shape[0]
        width = img.shape[1]   

        better_print("🐍 Python > Calculate line height")

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

        better_print(f"🐍 Python > Line height is {line_height}px")
        
        lines = []
        while location < height:
            line = [0, width, location, location]
            lines.append(line)
            location += int(line_height) #int(line_height/2.5) 

        return lines, line_height