import express from 'express';
import routes from './routes/routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  // Registro dos middlewares da aplicação
  middlewares() {
    this.server.use(express.json());
  }

  // Registro das rotas da aplicação
  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
