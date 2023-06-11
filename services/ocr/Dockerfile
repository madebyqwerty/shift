FROM clearlinux/tesseract-ocr:latest as base

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5001

CMD ["python3", "main.py"]