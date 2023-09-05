ARG NODE_VERSION=16.14.0

FROM node:${NODE_VERSION}-alpine

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj package.json, package-lock.json lub yarn.lock
COPY package*.json ./
COPY yarn.lock ./

# Zainstaluj zależności
RUN yarn install

# Skopiuj resztę plików
COPY . ./
COPY ./api/src/types ./types

ENV NODE_ENV=production

# Zbuduj aplikację React
RUN yarn run build


# Zainstaluj serve globalnie
RUN yarn global add serve

# Serwuj zbudowaną aplikację za pomocą serve
CMD ["serve", "-s", "build", "-l", "3000"]


