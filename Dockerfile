FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD npx prisma migrate deploy && npm run dev