FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --no-binaries
COPY . /app
USER ec2-user
CMD ["npm", "serve-debug"]
EXPOSE 3000
