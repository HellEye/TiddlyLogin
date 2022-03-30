FROM node
WORKDIR /server
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 5000