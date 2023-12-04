# # base image
# FROM node:20.9.0-alpine
# base image
FROM node:20.9.0-alpine

# Create and change to the app directory.
WORKDIR /usr/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY . .

# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
RUN yarn 

RUN yarn run build

CMD ["yarn", "run", "start"]


# WORKDIR /app
# COPY package*.json ./
# RUN yarn 
# COPY . .
# EXPOSE 3000
# CMD yarn run dev


# # base image
# FROM node:20.9.0


# FROM node:20.9.0-alpine as builder
# WORKDIR /app
# COPY package.json ./
# RUN yarn
# COPY . .
# RUN yarn run build
# COPY .next ./.next
# CMD ["yarn", "run", "start"]

# FROM node:20.9.0-alpine as builder
# WORKDIR /app

# COPY package.json  ./
# RUN yarn
# COPY . .
# RUN yarn run build

# FROM node:20.9.0-alpine as runner
# WORKDIR /app
# COPY --from=builder /app/package.json .
# COPY --from=builder /app/package-lock.json .
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# # EXPOSE 3000
# ENTRYPOINT ["yarn", "run", "dev"]


# FROM node:20.9.0-alpine as builder
# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN yarn
# COPY . .
# RUN yarn run build

# FROM node:20.9.0-alpine as runner
# WORKDIR /app
# COPY --from=builder /app/package.json .
# COPY --from=builder /app/package-lock.json .
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# # EXPOSE 3000
# CMD ["yarn", "run", "start"]


