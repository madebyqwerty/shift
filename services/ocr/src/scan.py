
from db.db import db
from engine.image_processor import ImageProcessor, ImageOperations
from engine.qr_detection import QrScanner

class Scanner():
    def __init__(self, db:db, connection) -> None:
        self.db = db
        self.connection = connection

    def scan(self, image) -> dict:
        imageProcessor = ImageProcessor(image)

        imageProcessor.crop_paper()
        imageProcessor.fix_rotation()
        
        qrcode_cords, qrcode_data = QrScanner(imageProcessor.image, ImageOperations).scan()
        imageProcessor.flip_if_needed(qrcode_cords)

        student_class = db.get_class(qrcode_data["class_id"], self.connection)

        

        return