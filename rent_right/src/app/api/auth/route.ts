import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM users');
    return NextResponse.json({result: result.rows});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error querying users table' }, { status: 500 });
  }
}
