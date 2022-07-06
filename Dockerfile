FROM node:lts-alpine
WORKDIR /app
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
COPY . .
RUN npm install
CMD npx prisma migrate deploy && npm run dev