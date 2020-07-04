"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);
var _routes = require('./routes/routes'); var _routes2 = _interopRequireDefault(_routes);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

require('./database');

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  // Registro dos middlewares da aplicação
  middlewares() {
    this.server.use(_bodyparser2.default.json());
    this.server.use(_cors2.default.call(void 0, ));
  }

  // Registro das rotas da aplicação
  routes() {
    this.server.use(_routes2.default);
  }
}

module.exports = new App().server;
