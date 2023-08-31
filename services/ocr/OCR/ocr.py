
from OCR.errors import *
import cv2, qrcode, pytesseract, ast

BANNED_CHARS = ",.|\\/=—-1234567890()[]><!?:„“ "

class Qr():
    """
    Qr code stuff
    """
    def create(class_id:str):
        """
        Make Qr code with data, return image
        """
        return qrcode.make({"class_id": class_id})

    def process(img, Image):
        """
        If needed rotates img and get qr data, returns img, data
        """
        qr_data, x, y = None, None, None
        binary_img = Image.convert_to_binary(img, 130, 255)

        print("QR processing...")
        qr_decoder = cv2.QRCodeDetector()
        data, bbox, _ = qr_decoder.detectAndDecode(binary_img)

        if bbox is None: #If qr not decoded try flip
            print("QR processing... (2. try)")
            rotated_img = cv2.rotate(binary_img, cv2.ROTATE_180)
            data, bbox, _ = qr_decoder.detectAndDecode(rotated_img)
            if bbox is not None:
                qr_data = data
                print("Flip the image")
                img = cv2.rotate(img, cv2.ROTATE_180)
                x, y = bbox[0][0] #qrcode cords

        else: 
            x, y = bbox[0][0] #qrcode cords
            qr_data = data

        if qr_data:
            if x > img.shape[1]/2 or y > img.shape[0]/2: #if not in top right corner, flip it
                print("Flip the image")
                img = cv2.rotate(img, cv2.ROTATE_180)

            return img, ast.literal_eval(qr_data) #Convert to dict
        
        print(f"QR error: {data}, {bbox}")
        raise QRCodeError("QRCode is not readable") #No readable qrcode on img

class OCR():
    """
    OCR processing
    """
    def img_processing(input_img, Image):
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
            for char in BANNED_CHARS:
                raw_text = raw_text.replace(char, "")

            if not raw_text == "" and len(raw_text) > 3:
                text.append(data["text"][i])
                cords.append([data["top"][i], data["height"][i]])

        return " ".join(text), cords #Test return
