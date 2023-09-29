
import numpy as np
import cv2

class LineDetection():
    """
    Manage line detection
    """
    def __init__(self, image) -> None:
        self.image = image

    def detect_lines(self) -> list:
        """
        Detect lines on image
        """
        gray_img = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        blur_gray = cv2.GaussianBlur(gray_img, (5, 5), 0)
        edges = cv2.Canny(blur_gray, 50, 150)

        threshold = 300
        min_line_length = int(self.image.shape[1]/8)
        max_line_gap = min_line_length // 15
        return cv2.HoughLinesP(edges, 1, np.pi / 180, threshold, np.array([]), min_line_length, max_line_gap)