FROM mongo:latest

COPY students.json /students.json
COPY seed.sh seed.sh
RUN chmod +x seed.sh
CMD ./seed.sh