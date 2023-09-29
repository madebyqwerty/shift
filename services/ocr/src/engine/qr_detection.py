
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
        binary_img = self.ImageOperations.convert_to_binary(self.image, 130, 255)

        crop_size = [int(binary_img.shape[0]/2), int(binary_img.shape[1]/2)]

        log("👀 Tesseract (OCR) > QR processing...")
        qr_decoder = cv2.QRCodeDetector()
        data, bbox, _ = qr_decoder.detectAndDecode(binary_img[0:crop_size[0], 0:crop_size[1]])

        if bbox is None: #If qr not decoded try flip
            log("👀 Tesseract (OCR) > QR processing... (2. try)")
            rotated_img = cv2.rotate(binary_img, cv2.ROTATE_180)
            data, bbox, _ = qr_decoder.detectAndDecode(rotated_img[0:crop_size[0], 0:crop_size[1]])
            if bbox is not None:
                qr_data = data
                qrcode_x, qrcode_y = bbox[0][0] #qrcode cords
                qrcode_x, qrcode_y = qrcode_x + crop_size[0], qrcode_y + crop_size[1]

        else: 
            qrcode_x, qrcode_y = bbox[0][0] #qrcode cords
            qr_data = data

        if qr_data:
            return (qrcode_x, qrcode_y), ast.literal_eval(qr_data) #Convert to dict
        
        log(f"🐍 Python > QR error: {data}, {bbox}")
        raise QRCodeError("QRCode is not readable")