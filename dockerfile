FROM node
WORKDIR /server
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY pnpm-lock.yaml ./
COPY package*.json ./
COPY tsconfig.json ./

RUN pnpm fetch
RUN pnpm install

CMD ["pnpm", "run", "dev"]
EXPOSE 5000