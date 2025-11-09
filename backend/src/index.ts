import dotenv from 'dotenv';
import { createApp } from './infrastructure/server/app';
import { disconnectPrisma } from './infrastructure/db/prisma';

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`🚀 FuelEU Maritime API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(async () => {
    await disconnectPrisma();
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(async () => {
    await disconnectPrisma();
    process.exit(0);
  });
});
