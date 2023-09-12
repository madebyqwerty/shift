FROM fedora:37 as base

WORKDIR /app

RUN dnf install -y python3 python3-pip tesseract tesseract-langpack-ces mesa-libGL

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5001

CMD ["python3", "-u", "main.py"]