FROM node:14-alpine

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/app
COPY . /home/app

# will execute npm install in /home/app because of WORKDIR
RUN npm install

CMD ["node", "address.js"]

