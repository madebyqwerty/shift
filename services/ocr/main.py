
from ocr import Engine
import numpy as np
import pika, sys, os, json, base64, cv2

RABBITMQ_HOST = "rabbitmq"

def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()

    def callback(ch, method, properties, body):
        data = json.loads(body)
        nparr = np.frombuffer(base64.b64decode(data["img"]), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        output = Engine.process(img, int(data["week_number"]))

        channel.queue_declare(queue=f"scan:{data['id']}")
        channel.basic_publish(exchange='',
                            routing_key=f"scan:{data['id']}",
                            body='{"status": "DONE", "scan_id": "None"}')

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