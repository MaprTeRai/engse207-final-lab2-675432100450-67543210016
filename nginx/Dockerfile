FROM nginx:1.25-alpine

COPY index.html /usr/share/nginx/html/index.html
COPY logs.html  /usr/share/nginx/html/logs.html

# แก้ไขจาก nginx.conf เป็น nginx/nginx.conf
COPY nginx/nginx.conf /etc/nginx/templates/default.conf.template

RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80