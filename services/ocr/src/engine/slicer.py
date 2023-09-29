
from src.engine.image_processor import ImageOperations
from src.engine.line_detection import LineDetection
from src.log.log import log
import numpy as np
import cv2

class Slicer:
    """
    Manage image slicing and scanning
    """
    def __init__(self, image, students) -> None:
        self.image = image
        self.students = students

    def get_data_from_image(self) -> dict:
        """
        Scan image for absences
        """
        binary_img = ImageOperations.convert_to_binary(self.image, 120, 255)
        #line_detector = LineDetection(binary_img)
        #lines = line_detector.detect_lines()

        

        cv2.imshow("Binary", ImageOperations.resize(binary_img, 0.2))
        cv2.waitKey(0)
        cv2.destroyAllWindows()

        return {}