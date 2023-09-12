
from OCR.better_print import better_print
from OCR.engine import Engine
from OCR.errors import *
import numpy as np
import pika, sys, os, json, base64, cv2

RABBITMQ_HOST = "127.0.0.1"

def send_error(channel, error, scan_id):
    better_print("🐰 RabbitMQ > Error occured", error)
    channel.queue_declare(queue=f"scan:shift")
    channel.basic_publish(exchange='',
                        routing_key=f"scan:shift",
                        body=json.dumps({"status": "ERROR", "errors": [error], "scan_id": scan_id}))

def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    connection2 = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()

    def callback(ch, method, properties, body):
        better_print("🐰 RabbitMQ > Received data from ocr_queue")

        data = json.loads(body)
        nparr = np.frombuffer(base64.b64decode(data["img"]), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        try:
            out = Engine.process(img, int(data["week_number"]), connection2, data["id"])

            channel.queue_declare(queue=f"scan:shift")
            
            if len(out) == 0:
                channel.basic_publish(exchange='', routing_key=f"scan:shift", body=json.dumps({"status": "ERROR", "errors": ["scan/empty-absences"], "scan_id": data["id"]}))
            else:
                channel.basic_publish(exchange='', routing_key=f"scan:shift", body=json.dumps({"status": "PROCCESED", "scan_id": data["id"]}))
            
        except QRCodeError: send_error(channel, "ocr/qr-code-error", data["id"])
        except NamesDetectionError: send_error(channel, "ocr/names-detection-error", data["id"])
        except Exception as e:
            print(e)
            send_error(channel, "ocr/unknown-error", data["id"])

    channel.queue_declare(queue=f"ocr-queue")
    channel.basic_consume(queue='ocr-queue', on_message_callback=callback, auto_ack=True)

    better_print('🐰 RabbitMQ > Consuming from ocr_queue')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        better_print('🐍 Python > Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)