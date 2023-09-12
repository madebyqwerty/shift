
import datetime

def better_print(text: str):
    time = datetime.datetime.now().strftime("%H:%M:%S")
    print(f"[{time}] {text}")