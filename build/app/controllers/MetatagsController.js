"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _metascraper = require('metascraper'); var _metascraper2 = _interopRequireDefault(_metascraper);
var _metascraperauthor = require('metascraper-author'); var _metascraperauthor2 = _interopRequireDefault(_metascraperauthor);
var _metascraperdate = require('metascraper-date'); var _metascraperdate2 = _interopRequireDefault(_metascraperdate);
var _metascraperdescription = require('metascraper-description'); var _metascraperdescription2 = _interopRequireDefault(_metascraperdescription);
var _metascraperimage = require('metascraper-image'); var _metascraperimage2 = _interopRequireDefault(_metascraperimage);
var _metascraperlogo = require('metascraper-logo'); var _metascraperlogo2 = _interopRequireDefault(_metascraperlogo);
var _metascraperclearbit = require('metascraper-clearbit'); var _metascraperclearbit2 = _interopRequireDefault(_metascraperclearbit);
var _metascraperpublisher = require('metascraper-publisher'); var _metascraperpublisher2 = _interopRequireDefault(_metascraperpublisher);
var _metascrapertitle = require('metascraper-title'); var _metascrapertitle2 = _interopRequireDefault(_metascrapertitle);
var _metascraperurl = require('metascraper-url'); var _metascraperurl2 = _interopRequireDefault(_metascraperurl);
var _got = require('got'); var _got2 = _interopRequireDefault(_got);

class MetatagsController {
  async index(req, res) {
    const { url: targetUrl } = req.body;

    const metasExtractor = _metascraper2.default.call(void 0, [
      _metascraperauthor2.default.call(void 0, ),
      _metascraperdate2.default.call(void 0, ),
      _metascraperdescription2.default.call(void 0, ),
      _metascraperimage2.default.call(void 0, ),
      _metascraperlogo2.default.call(void 0, ),
      _metascraperclearbit2.default.call(void 0, ),
      _metascraperpublisher2.default.call(void 0, ),
      _metascrapertitle2.default.call(void 0, ),
      _metascraperurl2.default.call(void 0, ),
    ]);

    try {
      const { body: html, url } = await _got2.default.call(void 0, targetUrl);
      const metadata = await metasExtractor({ html, url });
      return res.json({ metadata });
    } catch (error) {
      return res.json(null);
    }
  }
}

exports. default = new MetatagsController();
