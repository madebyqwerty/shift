
from src.db.db import db
from src.engine.image_processor import ImageProcessor, ImageOperations
from src.engine.qr_detection import QrScanner
from src.engine.slicer import Slicer
from src.log.log import log
import time

class Scanner():
    """
    Manage OCR service scanning
    """
    def __init__(self, db:db, connection) -> None:
        self.db = db
        self.connection = connection

    def scan(self, image) -> dict:
        """
        Scan image for absences
        """
        start = time.time()

        log("🐍 Python > Load image")

        imageProcessor = ImageProcessor(image)

        imageProcessor.crop_paper()
        imageProcessor.fix_rotation()
        
        log("👀 Tesseract (OCR) > Scanning for QR code")

        qrcode_cords, qrcode_data = QrScanner(imageProcessor.image, ImageOperations).scan()
        imageProcessor.flip_if_needed(qrcode_cords)

        log("🐍 Python > Image ready for scanning")

        student_class = db.get_class(qrcode_data["class_id"], self.connection)

        log("👀 Tesseract (OCR) > OCR processing started")

        slicer = Slicer(imageProcessor.image, student_class)
        data = slicer.get_data_from_image()

        log(f"🐍 Python > Done in {int((time.time()-start)*100)/100}")

        return data