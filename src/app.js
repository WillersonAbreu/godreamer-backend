import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';

import dotenv from 'dotenv';
dotenv.config();

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  // Registro dos middlewares da aplicação
  middlewares() {
    this.server.use(bodyParser.json());
  }

  // Registro das rotas da aplicação
  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
