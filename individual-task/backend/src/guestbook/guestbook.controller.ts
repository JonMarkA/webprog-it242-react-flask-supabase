// src/guestbook/guestbook.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('api/guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  findAll() {
    return this.guestbookService.findAll();
  }

  @Post()
  create(@Body() entry: { name: string; message: string }) {
    return this.guestbookService.create(entry);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() entry: { name: string; message: string }) {
    return this.guestbookService.update(+id, entry);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.guestbookService.delete(+id);
  }
}