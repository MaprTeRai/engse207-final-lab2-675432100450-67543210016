FROM nginx:1.25-alpine

# ดึงไฟล์จากโฟลเดอร์ frontend (เพราะ tree บอกว่ามันอยู่ที่นั่น)
COPY frontend/index.html /usr/share/nginx/html/index.html
COPY frontend/logs.html /usr/share/nginx/html/logs.html

# ดึงไฟล์ config จากโฟลเดอร์ nginx
COPY nginx/nginx.conf /etc/nginx/templates/default.conf.template

RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]