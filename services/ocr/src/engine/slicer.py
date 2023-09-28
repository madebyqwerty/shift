
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
        pass