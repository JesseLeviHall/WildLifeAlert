import { Request, Response, NextFunction } from 'express';

export const checkOrigin = (req: Request, res: Response, next: NextFunction) => {
  const receivedHeader = req.headers['x-wildlifealert'];

  if (!receivedHeader || receivedHeader !== 'acceptableRequest') {
    res.status(400).send('Invalid Request Header');
  } else {
    next();
  }
};

