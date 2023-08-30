# Use the Nginx image from the Docker Hub
FROM nginx:alpine

# Install git
RUN apk --no-cache add git

# Remove the default Nginx configuration file
RUN rm -f /etc/nginx/conf.d/*

# Volume 설정을 사용하여 호스트 디렉토리와 연결합니다.
VOLUME ["/usr/share/nginx/html/", "/etc/nginx/conf.d/"]

# Since the user will mount volumes at runtime, 
# there's no need to COPY the files at build-time
