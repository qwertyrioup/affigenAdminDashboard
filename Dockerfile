# # base image
# FROM node:20.9.0-alpine
# base image
FROM node:20.9.0-alpine
# Create and change to the app directory.
WORKDIR /usr/app

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
RUN npm i

COPY . .

## EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 5173

CMD ["npm", "run", "build"]