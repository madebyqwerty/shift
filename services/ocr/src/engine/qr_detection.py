
from src.log.errors import QRCodeError
from src.log.log import log
import cv2, qrcode, ast

class QrScanner():
    """
    Qr code stuff
    """
    def __init__(self, image, ImageOperations) -> None:
        self.image = image
        self.ImageOperations = ImageOperations

    def create(class_id:str):
        """
        Make Qr code with data, return image
        """
        return qrcode.make({"class_id": class_id})

    def scan(self) -> ((int, int), dict):
        """
        Scan image for qr code location and data
        """
        qr_data, x, y = None, None, None
        binary_img = self.ImageOperations.convert_to_binary(img, 130, 255)

        log("👀 Tesseract (OCR) > QR processing...")
        qr_decoder = cv2.QRCodeDetector()
        data, bbox, _ = qr_decoder.detectAndDecode(binary_img)

        if bbox is None: #If qr not decoded try flip
            log("👀 Tesseract (OCR) > QR processing... (2. try)")
            rotated_img = cv2.rotate(binary_img, cv2.ROTATE_180)
            data, bbox, _ = qr_decoder.detectAndDecode(rotated_img)
            if bbox is not None:
                qr_data = data
                log("👀 Tesseract (OCR) > Flip the image")
                img = cv2.rotate(img, cv2.ROTATE_180)
                qrcode_x, qrcode_y = bbox[0][0] #qrcode cords

        else: 
            qrcode_x, qrcode_y = bbox[0][0] #qrcode cords
            qr_data = data

        if qr_data:
            return (qrcode_x, qrcode_y), ast.literal_eval(qr_data) #Convert to dict
        
        log(f"🐍 Python > QR error: {data}, {bbox}")
        raise QRCodeError("QRCode is not readable")