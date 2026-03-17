FROM nginx:1.25-alpine

# ต้องเติม nginx/ นำหน้าทุกบรรทัด เพราะ Railway รันจากนอกโฟลเดอร์
COPY nginx/index.html /usr/share/nginx/html/index.html
COPY nginx/logs.html /usr/share/nginx/html/logs.html
COPY nginx/nginx.conf /etc/nginx/templates/default.conf.template

RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]