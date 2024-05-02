import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { lvtLogger } from './logger';

/*
More about middleware:
https://docs.nestjs.com/middleware
*/

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    lvtLogger.info('Middleware Log: Request received!', { url: req.url, method: req.method, headers: req.headers, body: req.body});
    next();
  }
}
