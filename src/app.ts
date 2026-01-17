// app.ts
import express from 'express';

import authRoutes from './api/routes/auth.routes';
import hotspotRoutes from './api/routes/hotspot.routes';
import profileRoutes from './api/routes/profile.routes';
import voucherRoutes from './api/routes/voucher.routes';
import { logger } from './infra/logger';

const app = express();

app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url }, 'Request recebida');
  next();
});

app.use(express.json());
app.use('/api', hotspotRoutes);
app.use('/auth', authRoutes);
app.use('/vouchers', voucherRoutes);
app.use('/profiles', profileRoutes);

export default app;
