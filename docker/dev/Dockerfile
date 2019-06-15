FROM node

LABEL ayyouboulidi <ayyouboulidiomali@gmail.com>

RUN npm install -g yarn expo

RUN yarn global add expo-cli

RUN mkdir -p /app/isalade

WORKDIR /app/isalade

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD yarn && yarn start