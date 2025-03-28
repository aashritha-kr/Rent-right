"use server"
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);

  if (!req.lease_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const userId = request.headers.get('User_ID');
  if (!userId) {
    return new Response(JSON.stringify({ message: 'User ID is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const userResult = await pool.query('SELECT * FROM Users WHERE User_ID = $1', [userId]);
  if (userResult.rowCount === 0) {
    return new Response(JSON.stringify({ message: 'User not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } });
  }

  const user = userResult.rows[0];

  const roleResult = await pool.query('SELECT Role FROM Roles WHERE User_ID = $1', [userId]);
  const role = roleResult.rows.length > 0 ? roleResult.rows[0].role : null;

  if (role === 'Tenant') {
    const propertyResult = await pool.query(
    `SELECT p.Property_ID, p.Type, p.Area_in_sqft, p.Area, p.Building_name, 
      CASE 
        WHEN p.Type = 'Plot' THEN pl.Price_per_sqft
        WHEN p.Type = 'Residential Building' THEN rb.Price
        WHEN p.Type = 'Commercial Building' THEN cb.Price
      END AS price
     FROM Property p
     LEFT JOIN Plot_lands pl ON p.Property_ID = pl.Property_ID
     LEFT JOIN Residential_buildings rb ON p.Property_ID = rb.Property_ID
     LEFT JOIN Commercial_buildings cb ON p.Property_ID = cb.Property_ID
     JOIN Lease_Agreement la ON la.Property_ID = p.Property_ID
    WHERE la.Lease_ID = $1`,
    [req.lease_id]
  );

  if (propertyResult.rowCount === 0) {
    return new Response(JSON.stringify({ message: 'Lease ID not found for the property' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } });
  }

  const property = propertyResult.rows[0];
  const amount = property.price * property.Area_in_sqft;

  try {
    await pool.query('BEGIN');

    const result = await pool.query(
      'INSERT INTO Lease_Payment (Lease_ID, Amount, Mode, Status) VALUES ($1, $2, $3, $4) RETURNING Payment_ID',
      [req.lease_id, amount, req.service, 'pending']
    );

    const paymentId = result.rows[0].payment_id;

    await pool.query('COMMIT');

    return NextResponse.json({ message: 'Payment initiation successful', paymentId, amount }, { status: 201 });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
  }
  else if(role==='Admin'){
    const requestId = request.headers.get('Request_ID');
  if (!requestId) {
    return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
  }

  const maintenanceResult = await pool.query(
    'SELECT * FROM Maintenance WHERE Request_ID = $1 AND Status IN ($2, $3)',
    [requestId, 'Pending', 'In progress']
  );

  if (maintenanceResult.rowCount === 0) {
    return NextResponse.json({ error: 'Invalid or completed maintenance request' }, { status: 404 });
  }

  const maintenanceRequest = maintenanceResult.rows[0];

  const servicePriceResult = await pool.query(
    `SELECT Price FROM Services WHERE Service = $1`, [req.service]
  );

  if (servicePriceResult.rowCount === 0) {
    return NextResponse.json({ error: 'Invalid service type' }, { status: 400 });
  }

  const servicePrice = servicePriceResult.rows[0].price;
  const paymentAmount = servicePrice;

  try {
    await pool.query('BEGIN');

    const paymentResult = await pool.query(
      'INSERT INTO Maintenance_Payment (Request_ID, Amount, Mode, Status) VALUES ($1, $2, $3, $4) RETURNING Payment_ID',
      [requestId, paymentAmount, req.service, 'pending']
    );

    const paymentId = paymentResult.rows[0].payment_id;
    await pool.query(
      'UPDATE Maintenance SET Status = $1 WHERE Request_ID = $2',
      ['Assigned', requestId]
    );

    await pool.query('COMMIT');

    return NextResponse.json({ message: 'Payment successful', paymentId, amount: paymentAmount }, { status: 201 });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
  }
  return new Response(
      JSON.stringify({ message: 'User is not a Tenant' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );

  
}

export async function GET(request: Request) {
  const userId = request.headers.get('User_ID');
  if (!userId) {
    return new Response(JSON.stringify({ message: 'User ID is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const userResult = await pool.query('SELECT * FROM Users WHERE User_ID = $1', [userId]);
  if (userResult.rowCount === 0) {
    return new Response(JSON.stringify({ message: 'User not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } });
  }

  const user = userResult.rows[0];

  const roleResult = await pool.query('SELECT Role FROM Roles WHERE User_ID = $1', [userId]);
  const role = roleResult.rows.length > 0 ? roleResult.rows[0].role : null;

  if (role === 'Tenant') {
    const leaseId = request.headers.get('Lease_ID');
    if (!leaseId) {
      return NextResponse.json({ error: 'Lease ID is required' }, { status: 400 });
    }

    try {
      const leaseResult = await pool.query(
        'SELECT * FROM Lease_Agreement WHERE Lease_ID = $1',
        [leaseId]
      );

      if (leaseResult.rowCount === 0) {
        return NextResponse.json({ message: 'Lease not found' }, { status: 404 });
      }

      const propertyResult = await pool.query(
        `SELECT p.Property_ID, p.Type, p.Area_in_sqft, p.Area, p.Building_name, 
          CASE 
            WHEN p.Type = 'Plot' THEN pl.Price_per_sqft
            WHEN p.Type = 'Residential Building' THEN rb.Price
            WHEN p.Type = 'Commercial Building' THEN cb.Price
          END AS price
         FROM Property p
         LEFT JOIN Plot_lands pl ON p.Property_ID = pl.Property_ID
         LEFT JOIN Residential_buildings rb ON p.Property_ID = rb.Property_ID
         LEFT JOIN Commercial_buildings cb ON p.Property_ID = cb.Property_ID
         JOIN Lease_Agreement la ON la.Property_ID = p.Property_ID
         WHERE la.Lease_ID = $1`,
        [leaseId]
      );

      if (propertyResult.rowCount === 0) {
        return NextResponse.json({ message: 'Property not found for this lease' }, { status: 404 });
      }

      const property = propertyResult.rows[0];
      const amount = property.price * property.Area_in_sqft;

      return NextResponse.json({
        lease_id: leaseId,
        amount:amount||0,
        property_name: property.building_name,
        address: `${property.area}, ${property.zip_code}, ${property.country}`,
        area: property.Area_in_sqft,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to fetch lease details' }, { status: 500 });
    }
  }
  else if(role==='Admin'){
    const requestId = request.headers.get('Request_ID');
    if (!requestId) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }

  }
}
