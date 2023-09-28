
from src.log.log import log
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

    def crop_paper(self):
        """
        Crop the paper from the image
        """
        thresh_img = ImageOperations.convert_to_binary(self.image, 120, 255)
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

    def flip_if_needed(self, qrcode_cords) -> None:
        """
        Check location of the qr code and rotate image if needed
        """
        qrcode_x, qrcode_y = qrcode_cords
        if qrcode_x > self.image.shape[1]/2 or qrcode_y > self.image.shape[0]/2: #if not in top right corner, flip it
            log("👀 Tesseract (OCR) > Flip the image")
            self.image = cv2.rotate(self.image, cv2.ROTATE_180)

