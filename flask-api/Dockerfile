FROM python:3.9.1-alpine

ADD . /app
WORKDIR /app

RUN pip install -r requirements.txt
ENTRYPOINT [ "gunicorn", "-w 4", "-b", "0.0.0.0:5001", "wsgi:app" ]