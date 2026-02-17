import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CorsMiddleware } from './cors.middleware';
import { GuestbookModule } from './guestbook/guestbook.module';

@Module({
  imports: [GuestbookModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}