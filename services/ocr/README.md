# OCR service

## How to run:
- pip install -r requirements.txt
- sudo dnf install tesseract
- sudo dnf install tesseract-langpack-ces
- python main.py

## Docker:
- `sudo docker build . -t ocr-service`
- `sudo docker run ocr-service`
