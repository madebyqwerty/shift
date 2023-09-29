
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
        try: gray_img = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        except Exception: gray_img = self.image
        blur_gray = cv2.GaussianBlur(gray_img, (5, 5), 0)
        edges = cv2.Canny(blur_gray, 50, 150)

        threshold = 300
        min_line_length = int(self.image.shape[1]/8)
        max_line_gap = min_line_length // 15
        return cv2.HoughLinesP(edges, 1, np.pi / 180, threshold, np.array([]), min_line_length, max_line_gap)
    
    def detect_col_width(self, img) -> (int, int):
        """
        Calculate column width on image (returns first line and average column width)
        """
        lines = [0]
        avrg_col_pixel_values = []
        banned_pixels = int(self.image.shape[1] / 6)
        for col_index in range(self.image.shape[1] - banned_pixels):
            col_index += banned_pixels
            col_pixel_values = self.image[0:self.image.shape[0], col_index]
            number_of_col_pixels = len(col_pixel_values)
            average_pixel_value = sum(col_pixel_values) / number_of_col_pixels
            avrg_col_pixel_values.append(average_pixel_value)
            if average_pixel_value < 180 and col_index > lines[-1] + 20: lines.append(col_index)
        lines.pop(0)

        col_width = sum(
            cord_x - lines[index - 1]
            for index, cord_x in enumerate(lines)
            if index != 0
        )
        col_width = col_width // (len(lines) - 1)

        value = 0
        col_values = []
        for pixel_col_index, pixel_column in enumerate(avrg_col_pixel_values):
            if pixel_col_index >= lines[0]:
                value = pixel_column if value == 0 else (value + pixel_column) / 2
                if pixel_col_index in lines:
                    col_values.append(int(value))
                    value = 0

        print(col_values)

        return lines[0], col_width