# pull official base image
FROM python:3.12.4-alpine

# set environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY . /app/backend

# install dependencies
RUN apk update \
    && apk add --no-cache postgresql-dev build-base python3-dev gcc musl-dev

RUN pip install --upgrade pip

# Set pip configuration for mirrors and higher timeout
RUN pip config set global.timeout 120
RUN pip config set global.index-url https://pypi.org/simple

COPY ./requirements.txt /server
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000