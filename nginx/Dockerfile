FROM nginx:1.25-alpine

# เพราะ nginx.conf อยู่ที่เดียวกับ Dockerfile เลยใช้ชื่อตรงๆ ได้เลย
COPY nginx.conf /etc/nginx/templates/default.conf.template

RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80