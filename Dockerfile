# Usamos uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de origem para o diretório de trabalho
COPY package.json .
COPY yarn.lock .

# Instala as dependências
RUN yarn install

# Copia o código-fonte para o diretório de trabalho
COPY . .

# Compila o código TypeScript para JavaScript
RUN yarn build
# Executa o comando para implantar as migrações do Prisma
RUN npx prisma migrate deploy

RUN npx prisma generate

# Expõe a porta em que a API será executada
EXPOSE 3333

# Define o comando que será executado quando o contêiner for iniciado
CMD ["node", "./dist/server.js"]
