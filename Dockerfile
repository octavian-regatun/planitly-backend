FROM node:lts-alpine
WORKDIR /app
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
COPY . .
RUN npm install
RUN npx prisma migrate deploy
CMD npm run dev