FROM nginx:1.25-alpine

# 1. ต้องใส่ nginx/ นำหน้า เพราะไฟล์อยู่ในโฟลเดอร์ย่อย
COPY nginx/index.html /usr/share/nginx/html/index.html
COPY nginx/logs.html /usr/share/nginx/html/logs.html

# 2. แก้บรรทัดนี้ให้มี nginx/ นำหน้าด้วย
COPY nginx/nginx.conf /etc/nginx/templates/default.conf.template

RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]