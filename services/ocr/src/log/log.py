
import datetime

def log(text: str):
    """
    Custom print with time
    """
    time = datetime.datetime.now().strftime("%H:%M:%S")
    print(f"[{time}] {text}")