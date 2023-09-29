
import cv2, pytesseract

BANNED_CHARS = ",.|\\/=—-1234567890()[]><!?:„“ "

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

            if raw_text != "" and len(raw_text) > 3:
                text.append(data["text"][i])
                cords.append([data["top"][i], data["height"][i]])

        return " ".join(text), cords
