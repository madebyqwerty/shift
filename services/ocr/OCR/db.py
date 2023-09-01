
import json

class db():
    def get_class(id, connection):
        channel = connection.channel()

        print("Sending request to user_request_queue")

        channel.queue_declare(queue='user_request_queue')
        channel.basic_publish(exchange='',
                            routing_key='user_request_queue',
                            body=json.dumps({"class_id": id}))

        channel.queue_declare(queue='user_queue')
        def callback(ch, method, properties, body):
            channel.stop_consuming()
            global data
            data = json.loads(body)

        channel.basic_consume(queue='user_queue', on_message_callback=callback, auto_ack=True)
        channel.start_consuming()

        return data

    def save_absence_scan(records, connection, scan_id):
        channel = connection.channel()
        
        records_dict = {
            "user_id": scan_id,
            "absences": records
        }

        print("Sending data to absence_queue")

        channel.queue_declare(queue='absence_queue')
        channel.basic_publish(exchange='',
                            routing_key='absence_queue',
                            body=json.dumps(records_dict))
