FROM node:20-alpine

WORKDIR /app

# Встановлюємо pnpm
RUN npm install -g pnpm

# Копіюємо lock та package
COPY package.json pnpm-lock.yaml* ./

# Встановлюємо залежності
RUN pnpm install

# Копіюємо весь проект
COPY . .

EXPOSE 3000

# Запуск Nuxt в dev режимі
CMD ["pnpm", "dev", "--host"]