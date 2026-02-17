// src/guestbook/guestbook.service.ts
import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL as string;
    const supabaseKey = process.env.SUPABASE_KEY as string;
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async findAll() {
    const { data } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    return data;
  }

  async create(entry: { name: string; message: string }) {
    const { data } = await this.supabase
      .from('guestbook')
      .insert([entry])
      .select();
    return data?.[0];
  }

  async update(id: number, entry: { name: string; message: string }) {
    const { data } = await this.supabase
      .from('guestbook')
      .update(entry)
      .eq('id', id)
      .select();
    return data?.[0];
  }

  async delete(id: number) {
    await this.supabase
      .from('guestbook')
      .delete()
      .eq('id', id);
    return { message: 'Deleted successfully' };
  }
}