
"""
run: pytest
"""

def test_example():
    assert 0 == 0

"""
from ocr import Engine, Image, Qr
import pytest, cv2

class TestClass:
    def test_rotate(self):
        img = cv2.imread("TestImg/img0.jpg")
        size = img.shape
        rotated_size = Image.rotate(img).shape
        assert size[0] == rotated_size[1] and size[1] == rotated_size[0]

    def test_resize(self):
        img = cv2.imread("TestImg/img0.jpg")
        size = img.shape
        resized_size = Image.resize(img, 0.25).shape
        assert size[0]/4 == resized_size[0] and size[1]/4 == resized_size[1]

    def test_qr_processing(self):
        img = cv2.imread("TestImg/qr0.jpg")
        img, data = Qr.process(img)
        assert data == "Testovací qrcode, jen mě zajímá, zda tohle funguje"

    def test_qr_processing_upsite_down(self):
        img = cv2.imread("TestImg/qr1.jpg")
        img, data = Qr.process(img)
        assert data == "Testovací qrcode, jen mě zajímá, zda tohle funguje"
"""