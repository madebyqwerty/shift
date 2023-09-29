
from src.log.log import log
from src.engine.line_detection import LineDetection
import numpy as np
import cv2

class ImageOperations:
    """
    Manage image operations
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

class ImageProcessor:
    """
    Process the image
    """
    def __init__(self, image) -> None:
        self.image = image
        self.binary_image = None

    def crop_paper(self):
        """
        Crop the paper from the image
        """
        thresh_img = ImageOperations.convert_to_binary(self.image, 140, 255)
        filtered_img = cv2.medianBlur(thresh_img, 81) #Filter showing approximate shape of the paper
        edges_img = cv2.Canny(filtered_img, 100, 200) #Edge detection
        contours, _ = cv2.findContours(edges_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        x, y, w, h = cv2.boundingRect(contours[0])

        if h < (self.image.shape[0]/3) or w < (self.image.shape[1]/3): #If too small, probably poorly defined edges
            log("🐍 Python > Using default paper size")
            self.image = cv2.medianBlur(self.image, 3)
            return cv2.medianBlur(self.image, 3)

        log(f"🐍 Python > Using cropped paper image {[y, y+h, x, x+w]}")
        self.image = cv2.medianBlur(self.image[y:y+h, x:x+w], 3)
        return cv2.medianBlur(self.image[y:y+h, x:x+w], 3)
    
    def fix_rotation(self) -> None:
        """
        Fix rotation of the image
        """
        if self.image.shape[0] > self.image.shape[1]:
            log("🐍 Python > Rotate image 90 degrees")
            self.image = cv2.rotate(self.image, cv2.ROTATE_90_CLOCKWISE) 

        binary_img = ImageOperations.convert_to_binary(self.image, 120, 255)

        line_detector = LineDetection(binary_img)
        lines = line_detector.detect_lines()

        fix = 0
        for line in lines:
            x1, y1, x2, y2 = line[0]
            if y1 + 20 > y2 and y1 - 20 < y2 and x1 > self.image.shape[1] / 6:
                fix = y1 - y2 if fix == 0 else (fix + y1 - y2) / 2
                
        fix_rad = np.arctan2(fix, self.image.shape[1]) #Calculate rotation
        fix_deg = np.degrees(fix_rad)

        height, width = self.image.shape[:2]
        rotation = cv2.getRotationMatrix2D((width / 2, height / 2), fix_deg*5, 1)
        self.image = cv2.warpAffine(self.image, rotation, (width, height))

    def flip_if_needed(self, qrcode_cords) -> None:
        """
        Check location of the qr code and rotate image if needed
        """
        qrcode_x, qrcode_y = qrcode_cords
        if qrcode_x > self.image.shape[1]/2 or qrcode_y > self.image.shape[0]/2: #if not in top right corner, flip it
            log("👀 Tesseract (OCR) > Flip the image")
            self.image = cv2.rotate(self.image, cv2.ROTATE_180)

    def crop_table(self) -> None:
        """
        Get table from the image
        """
        gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        gray_thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 17, 9)
        gray_thresh = cv2.bilateralFilter(gray_thresh, 9, 75, 75)
        binary = ImageOperations.convert_to_binary(gray_thresh, 130, 255)

        filtered_img = cv2.medianBlur(binary, 3)
        inverted_img = cv2.bitwise_not(filtered_img)

        contours, _ = cv2.findContours(inverted_img, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        log("🐍 Python > Detect edges")

        max_area = 0
        best_rect = None
        for contour in contours:
            x, y, w, h = cv2.boundingRect(contour)
            area = w * h
            if area > max_area:
                max_area = area
                best_rect = (x, y, w, h)

        x, y, w, h = best_rect

        log(f"🐍 Python > Crop image to {[y-25, y+h+250, x-25, x+w+25]}")

        self.image = self.image[y-25:y+h+25, x-25:x+w+25]
