FROM nginx:1.25-alpine

# 1. ชี้ไปหยิบไฟล์จากโฟลเดอร์ frontend ที่อยู่ระดับเดียวกัน
COPY frontend/index.html /usr/share/nginx/html/index.html
COPY frontend/logs.html /usr/share/nginx/html/logs.html

# 2. ชี้ไปหยิบไฟล์ nginx.conf จากโฟลเดอร์ nginx
COPY nginx/nginx.conf /etc/nginx/templates/default.conf.template

RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]