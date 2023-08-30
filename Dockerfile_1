# Use the Nginx image from the Docker Hub
FROM nginx:alpine

# Install git
RUN apk --no-cache add git

# Remove the default Nginx configuration file
RUN rm -f /etc/nginx/conf.d/*

# Copy the 'index.html' file to the Nginx web root directory
COPY index.html /usr/share/nginx/html/

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/
