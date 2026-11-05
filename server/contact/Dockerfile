FROM python:3.12-alpine

# Standard library only: nothing to pip install.
WORKDIR /app
COPY app.py .

RUN adduser -D -H app
USER app

ENV PYTHONUNBUFFERED=1 LISTEN_PORT=8000
EXPOSE 8000

HEALTHCHECK --interval=60s --timeout=5s CMD wget -qO- http://127.0.0.1:8000/healthz || exit 1

CMD ["python", "app.py"]
