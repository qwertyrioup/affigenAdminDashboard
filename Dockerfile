# # base image
# FROM node:20.9.0-alpine
# base image
FROM node:20.9.0-alpine as BUILD_IMAGE
# Create and change to the app directory.
WORKDIR /app/panel

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
# COPY . .

# # Install production dependencies.
# # If you add a package-lock.json, speed your build by switching to 'npm ci'.
# RUN npm ci --only=production

# RUN npm run build

# CMD ["npm", "start"]

COPY package.json .
RUN yarn

COPY . .
RUN yarn run build



FROM node:20.9.0-alpine as PRODCTION_IMAGE
WORKDIR /app/panel

COPY --from=BUILD_IMAGE /app/panel/dist/ /app/panel/dist/
EXPOSE 8080


COPY package.json .
COPY vite.config.ts .
RUN npm i typescript
EXPOSE 8080

CMD ["yarn", "run", "preview"]