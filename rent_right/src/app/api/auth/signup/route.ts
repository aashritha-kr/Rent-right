import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const res = await request.json();
  if (!res.first_name || !res.last_name || !res.email || !res.password || !res.phone || !res.role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }  

  const hashedPassword = await bcrypt.hash(res.password, 10);
  if(res.role==="Tenant"){
    try {
      await pool.query('BEGIN');

      const result = await pool.query(
        'INSERT INTO Users (First_name, Middle_name, Last_name, Email, Phone, Password_hash, Location) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING User_ID',
        [res.first_name, res.middle_name, res.last_name, res.email, res.phone, hashedPassword, res.location]
      );

      const userId = result.rows[0].user_id;

      await pool.query(
        'INSERT INTO Roles (User_ID, Role) VALUES ($1, $2)',
        [userId, res.role]
      );

      await pool.query('COMMIT');

      return NextResponse.json({ message: 'User registered successfully', userId }, { status: 201 });
    } catch (err) {
      await pool.query('ROLLBACK');
      console.error(err);
      return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
    }
  }
  else if(res.role==="Admin"){
    try {
      await pool.query('BEGIN');

      const result = await pool.query(
        'INSERT INTO Users (First_name, Middle_name, Last_name, Email, Phone, Password_hash, Location) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING User_ID',
        [res.first_name, res.middle_name, res.last_name, res.email, res.phone, hashedPassword, res.location]
      );

      const userId = result.rows[0].user_id;

      await pool.query(
        'INSERT INTO Roles (User_ID, Role) VALUES ($1, $2)',
        [userId, res.role]
      );

      await pool.query(
        'INSERT INTO Admins (User_ID, UPI_ID, Account_no, IFSC_code, Bank_name, Bank_Branch, Account_holder_name) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [userId, res.upi_id, res.account_no, res.ifsc_code, res.bank_name, res.bank_branch, res.account_holder_name]
      );

      await pool.query('COMMIT');

      return NextResponse.json({ message: 'User registered successfully', userId }, { status: 201 });
    } catch (err) {
      await pool.query('ROLLBACK');
      console.error(err);
      return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
    }
  }
  else if(res.role==="Staff"){
    try {
      await pool.query('BEGIN');

      const result = await pool.query(
        'INSERT INTO Users (First_name, Middle_name, Last_name, Email, Phone, Password_hash, Location) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING User_ID',
        [res.first_name, res.middle_name, res.last_name, res.email, res.phone, hashedPassword, res.location]
      );

      const userId = result.rows[0].user_id;

      await pool.query(
        'INSERT INTO Roles (User_ID, Role) VALUES ($1, $2)',
        [userId, res.role]
      );

      await pool.query(
        'INSERT INTO Staff (User_ID, Service, UPI_ID, Account_no, IFSC_code, Bank_name, Bank_Branch, Account_holder_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [userId, res.service, res.upi_id, res.account_no, res.ifsc_code, res.bank_name, res.bank_branch, res.account_holder_name]
      );

      await pool.query('COMMIT');

      return NextResponse.json({ message: 'User registered successfully', userId }, { status: 201 });
    } catch (err) {
      await pool.query('ROLLBACK');
      console.error(err);
      return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
    }
  }
}

