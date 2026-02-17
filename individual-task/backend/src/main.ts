// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Important: Use PORT from environment or default to 3001
  const port = process.env.PORT || 3001;
  
  // Enable CORS for your Vercel frontend URL (after deployment)
  app.enableCors({
    origin: [
      'http://localhost:3000',  // Local development
      'https://webprog-it242-react-f-git-a511e6-jonathan-mark-agbulos-projects.vercel.app' // Replace with your actual Vercel URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  
  await app.listen(port);
  console.log(`Backend running on port ${port}`);
}
bootstrap();