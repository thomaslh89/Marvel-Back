# API Express (déploiement Coolify sur lehebel.com). API_KEY est fournie par Coolify.
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY . .
EXPOSE 3000
USER node
CMD ["node", "index.js"]
