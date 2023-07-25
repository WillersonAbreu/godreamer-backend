import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
import cors from 'cors'

import './database'

class App {
  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()
  }

  // Registro dos middlewares da aplicação
  middlewares() {
    this.server.use(bodyParser.json())
    this.server.use(cors())
  }

  // Registro das rotas da aplicação
  routes() {
    routes.map((route) => {
      this.server.use(route)
    })
  }
}

module.exports = new App().server
