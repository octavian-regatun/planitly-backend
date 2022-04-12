FROM node:lts-alpine
WORKDIR /app
ARG ARG_DATABASE_URL
ENV DATABASE_URL=$ARG_DATABASE_URL
COPY . .
RUN npm install
RUN npx prisma migrate deploy
CMD npm run dev