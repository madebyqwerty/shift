
from ocr import Engine
import numpy as np
import pika, sys, os, json, base64, cv2, argparse

parser = argparse.ArgumentParser(description='OCR service test')
parser.add_argument('--docker_mode', default=False, type=bool, help='Is in docker?')
args = parser.parse_args()

if args.docker_mode: RABBITMQ_HOST = "rabbitmq"
else: RABBITMQ_HOST = "127.0.0.1"

def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()

    def callback(ch, method, properties, body):
        data = json.loads(body)
        nparr = np.frombuffer(base64.b64decode(data["img"]), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        out = Engine.process(img, int(data["week_number"]), RABBITMQ_HOST, data["id"])
        print(f"Sending data to scan:shift")

        channel.queue_declare(queue=f"scan:shift")
        channel.basic_publish(exchange='',
                            routing_key=f"scan:shift",
                            body=str({"status": "DONE", "scan_id": data["id"]}))

    channel.basic_consume(queue='ocr-queue', on_message_callback=callback, auto_ack=True)

    print('Consuming from ocr_queue')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)