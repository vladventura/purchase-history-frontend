FROM node:10.23.0-alpine3.9

RUN echo "Copying directories"
COPY ./ .

RUN npm install -g serve

RUN echo "Installing frontend dependencies"
RUN npm ci

RUN echo "Building the frontend"
RUN npm run build

RUN serve -p $PORT -s build