FROM node:latest
COPY . /tmp/
WORKDIR /tmp/
EXPOSE 8000
CMD ["node","app.js"]
