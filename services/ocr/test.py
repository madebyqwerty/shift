
from src.scan import Scanner
import cv2

class FakeDB:
    def get_class(id, connection):
        """
        Get class infor from database using class_id
        """
        return {}

image = cv2.imread("services/ocr/imgs/img1.jpg")

scanner = Scanner(FakeDB, None)
scanner.scan(image)