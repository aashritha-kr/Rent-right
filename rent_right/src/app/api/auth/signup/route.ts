import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { first_name, middle_name, last_name, email, phone, password, location, role } = await request.json();
  if (!first_name || !last_name || !email || !password || !phone || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }  

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query('BEGIN');

    const result = await pool.query(
      'INSERT INTO Users (First_name, Middle_name, Last_name, Email, Phone, Password_hash, Location) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING User_ID',
      [first_name, middle_name, last_name, email, phone, hashedPassword, location]
    );

    const userId = result.rows[0].user_id;

    await pool.query(
      'INSERT INTO Roles (User_ID, Role) VALUES ($1, $2)',
      [userId, role]
    );

    await pool.query('COMMIT');

    return NextResponse.json({ message: 'User registered successfully', userId }, { status: 201 });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
  }
}
