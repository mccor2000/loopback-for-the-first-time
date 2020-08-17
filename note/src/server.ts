import express, {Request, Response} from 'express';
import http from 'http';
import path from 'path';
import {once} from 'events';

import {ApplicationConfig, NoteApplication} from './application';

export {ApplicationConfig};

export class ExpressServer {
  public readonly app: express.Application;
  public readonly lbApp: NoteApplication;
  private server?: http.Server;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new NoteApplication(options);

    this.app.use('/api', this.lbApp.requestHandler);

    this.app.get('/', async (_req: Request, res: Response) => {
      res.sendFile(path.resolve('public/index.html'));
    });

    this.app.get('/hello', async (_req: Request, res: Response) => {
      res.send('hello');
    });
  }

  async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
    const port = this.lbApp.restServer.config.port ?? 3000;
    const host = this.lbApp.restServer.config.host || '127.0.0.1';
    this.server = this.app.listen(port, host);
    await once(this.server, 'listening');
  }

  public async stop() {
    if (!this.server) return;
    await this.lbApp.stop();
    this.server.close();
    await once(this.server, 'close');
    this.server = undefined;
  }
}
