import metascraper from 'metascraper';
import metascraperAuthor from 'metascraper-author';
import metascraperDate from 'metascraper-date';
import metascraperDescription from 'metascraper-description';
import metascraperImage from 'metascraper-image';
import metascraperLogo from 'metascraper-logo';
import metascraperClearbit from 'metascraper-clearbit';
import metascraperPublisher from 'metascraper-publisher';
import metascraperTitle from 'metascraper-title';
import metascraperUrl from 'metascraper-url';
import got from 'got';

class MetatagsController {
  async index(req, res) {
    const { url: targetUrl } = req.body;

    const metasExtractor = metascraper([
      metascraperAuthor(),
      metascraperDate(),
      metascraperDescription(),
      metascraperImage(),
      metascraperLogo(),
      metascraperClearbit(),
      metascraperPublisher(),
      metascraperTitle(),
      metascraperUrl(),
    ]);

    try {
      const { body: html, url } = await got(targetUrl);
      const metadata = await metasExtractor({ html, url });
      console.log(metadata);
      return res.json({ metadata });
    } catch (error) {
      console.log(error);
      return res.json(null);
    }
  }
}

export default new MetatagsController();
