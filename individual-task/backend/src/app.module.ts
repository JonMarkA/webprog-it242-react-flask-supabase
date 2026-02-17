import { Module } from '@nestjs/common';
import { GuestbookModule } from './guestbook/guestbook.module';

@Module({
  imports: [GuestbookModule],
})
export class AppModule {}