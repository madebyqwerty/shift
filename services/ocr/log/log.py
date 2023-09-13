
import datetime

def log(text: str):
    time = datetime.datetime.now().strftime("%H:%M:%S")
    print(f"[{time}] {text}")