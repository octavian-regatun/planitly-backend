FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm 
RUN npx prisma migrate deploy
CMD npm run dev