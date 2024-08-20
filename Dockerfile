FROM node:20

WORKDIR /app

RUN npm install -g prisma

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 4000

# Run Prisma migrations and start the application
CMD ["sh", "-c", "prisma migrate deploy && npm run start:dev"]