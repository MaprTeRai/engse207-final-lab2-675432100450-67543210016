FROM nginx:1.25-alpine

# ลบไฟล์คอนฟิกเดิมทุกอย่างที่อาจขวางทาง
RUN rm -rf /etc/nginx/conf.d/*
RUN rm -rf /etc/nginx/nginx.conf

# Copy หน้าเว็บ
COPY index.html /usr/share/nginx/html/index.html
COPY logs.html /usr/share/nginx/html/logs.html

# Copy คอนฟิกของเราไปเป็นไฟล์หลักตัวเดียวเลย
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]