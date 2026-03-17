FROM nginx:1.25-alpine

# 1. ไฟล์พวกนี้อยู่ที่ Root (ข้างนอกโฟลเดอร์ nginx) ให้ใช้ path เดิมได้
# แต่ถ้ามันหาไม่เจอ ให้ลองเติม ../ นำหน้า หรือเช็คตำแหน่งอีกครั้ง
COPY index.html /usr/share/nginx/html/index.html
COPY logs.html  /usr/share/nginx/html/logs.html

# 2. **จุดสำคัญ** ไฟล์ nginx.conf อยู่ในโฟลเดอร์ nginx ต้องเติม "nginx/" นำหน้า
COPY nginx/nginx.conf /etc/nginx/templates/default.conf.template

RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]