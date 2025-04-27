FROM node:23

WORKDIR /app

COPY package.json package-lock.json ./
COPY public/ ./public/
COPY src/ ./src/

RUN addgroup --system nonroot \
    && adduser --system --group nonroot \
    && chown -R nonroot:nonroot /app
USER nonroot

ENV npm_config_cache=/tmp/.npm

RUN npm install --ignore-scripts && npm run build
CMD ["npm", "start"]
