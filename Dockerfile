FROM mcr.microsoft.com/playwright:v1.49.1-noble

WORKDIR /app

COPY ./tests ./tests

WORKDIR tests

#RUN npm install playwright
RUN npm install

CMD ["npx", "playwright", "test"]