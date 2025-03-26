import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
    const req = await request.json();
    if (!req.property_id || !req.service || !req.description) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const userId = request.headers.get('User_ID');
    if (!userId) {
        return new Response(JSON.stringify({ message: 'User ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    
    const userResult = await pool.query(
        'SELECT * FROM Users WHERE User_ID = $1',
        [userId]
    );
    
    if (userResult.rowCount === 0) {
        return new Response(JSON.stringify({ message: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    
    const user = userResult.rows[0];
    
    const roleResult = await pool.query(
        'SELECT Role FROM Roles WHERE User_ID = $1',
        [userId]
    );
    
    const role = roleResult.rows.length > 0 ? roleResult.rows[0].role : null;
    
    if (role != 'Tenant') {
        return new Response( JSON.stringify({ message: 'User is not a Tenant' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } });
    }
    
    try {
        await pool.query('BEGIN');
    
        const result = await pool.query(
            'INSERT INTO Maintenance (Lease_ID, Service, Description) VALUES ($1, $2, $3, $4) RETURNING Request_ID',
            [req.lease_id, req.service, req.description]
        );
    
        const requestId = result.rows[0].request_id;
    
        await pool.query('COMMIT');
    
        return NextResponse.json({ message: 'Maintenance request submitted successfully', requestId }, { status: 201 });
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error(err);
        return NextResponse.json({ error: 'Error submitting maintenance request' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
      const userId = request.headers.get('User_ID');
  
      if (!userId) {
        return new Response('User ID is required', { status: 400 });
      }
  
      const userResult = await pool.query(
        'SELECT * FROM Users WHERE User_ID = $1',
        [userId]
      );
  
      if (userResult.rowCount === 0) {
        return new Response('User not found', { status: 404 });
      }
  
      const user = userResult.rows[0];
  
      const roleResult = await pool.query(
        'SELECT Role FROM Roles WHERE User_ID = $1',
        [userId]
      );
  
      const role = roleResult.rows.length > 0 ? roleResult.rows[0].role : null;

      if(role === 'Tenant'){
        const currentRequestsQuery = `
            SELECT
                Maintenance.Request_ID, Property.Building_name, Maintenance.Service, Maintenance.Description, Maintenance.Status,
                Maintenance.Created_at, Maintenance.Status, Staff.Name as StaffName, Staff.PhoneNumber as StaffNumber,
                Users.First_name || ' ' || Users.Last_name as OwnerName, Users.Phone as OwnerPhone
            FROM Maintenance
            JOIN Lease_Agreement ON Maintenance.Lease_ID = Lease_Agreement.Lease_ID
            JOIN Property ON Lease_Agreement.Property_ID = Property.Property_ID
            JOIN Users ON Property.Owner_ID = Users.User_ID
            LEFT JOIN  Users AS Staff ON Maintenance.Staff_ID = Staff.User_ID
            WHERE Lease_Agreement.Tenant_ID = $1 AND Maintenance.Status IN ('Pending', 'Assigned', 'In progress')
        `;

        const pastRequestsQuery = `
            SELECT
                Maintenance.Request_ID, Property.Building_name, Maintenance.Service, Maintenance.Description, Maintenance.Status,
                Maintenance.Created_at, Maintenance.Status, Staff.Name as StaffName, Staff.PhoneNumber as StaffNumber,
                Users.First_name || ' ' || Users.Last_name as OwnerName, Users.Phone as OwnerPhone
            FROM Maintenance
            JOIN Lease_Agreement ON Maintenance.Lease_ID = Lease_Agreement.Lease_ID
            JOIN Property ON Lease_Agreement.Property_ID = Property.Property_ID
            JOIN Users ON Property.Owner_ID = Users.User_ID
            LEFT JOIN Users AS Staff ON Maintenance.Staff_ID = Staff.User_ID
            WHERE Lease_Agreement.Tenant_ID = $1 AND Maintenance.Status = 'Resolved'
        `;
  
        const [currentRequestsRes, pastRequestsRes] = await Promise.all([
            pool.query(currentRequestsQuery),
            pool.query(pastRequestsQuery),
          ]);
  
        const currentRequests = currentRequestsRes.rows;
        const pastRequests = pastRequestsRes.rows;
  
        return new Response(JSON.stringify({ currentRequests, pastRequests }), {
            headers: { 'Content-Type': 'application/json' },
        });
      }
      else if (role === 'Staff') {
        const staffRequestsQuery = `
            SELECT
                Maintenance.Request_ID,
                Property.Building_name,
                Maintenance.Service,
                Maintenance.Description,
                Maintenance.Created_at,
                Maintenance.Status,
                Tenant.Name as TenantName,
                Tenant.PhoneNumber as TenantNumber,
                Users.First_name || ' ' || Users.Last_name as OwnerName,
                Users.Phone as OwnerPhone
            FROM Maintenance
            JOIN Lease_Agreement ON Maintenance.Lease_ID = Lease_Agreement.Lease_ID
            JOIN Property ON Lease_Agreement.Property_ID = Property.Property_ID
            JOIN Users AS Owner ON Property.Owner_ID = Owner.User_ID
            JOIN Users AS Tenant ON Lease_Agreement.Tenant_ID = Tenant.User_ID  -- Join Users table for tenant details
            WHERE Maintenance.Staff_ID = $1
        `;
  
        const staffRequestsRes = await pool.query(staffRequestsQuery, [userId]);
        const staffRequests = staffRequestsRes.rows;
  
        return new Response(JSON.stringify({ staffRequests }), {
            headers: { 'Content-Type': 'application/json' },
        });
      }
      else if(role === 'Admin'){
        const adminRequestsQuery = `
            SELECT
                Maintenance.Request_ID, Property.Building_name, Maintenance.Service, Maintenance.Description, Maintenance.Status,
                Maintenance.Created_at, Maintenance.Status, Staff.Name as StaffName, Staff.PhoneNumber as StaffNumber,
                Users.First_name || ' ' || Users.Last_name as OwnerName, Users.Phone as OwnerPhone
            FROM Maintenance
            JOIN Lease_Agreement ON Maintenance.Lease_ID = Lease_Agreement.Lease_ID
            JOIN Property ON Lease_Agreement.Property_ID = Property.Property_ID
            JOIN Users ON Property.Owner_ID = Users.User_ID
            LEFT JOIN Staff ON Maintenance.Staff_ID = Staff.User_ID
        `;
  
        const adminRequestsRes = await pool.query(adminRequestsQuery);
        const adminRequests = adminRequestsRes.rows;
  
        return new Response(JSON.stringify({ adminRequests }), {
            headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        return new Response('Error fetching  maintenance requests', { status: 500 });
    }
  }

  export async function PATCH(request: Request) {
    try {
        const { requestId, newStatus } = await request.json();
        
        if (!requestId || !newStatus) {
            return new Response('Missing parameters', { status: 400 });
        }

        const updateQuery = `
            UPDATE Maintenance
            SET Status = $1
            WHERE Request_ID = $2
            RETURNING *;
        `;

        const result = await pool.query(updateQuery, [newStatus, requestId]);

        if (result.rowCount === 0) {
            return new Response('Request not found', { status: 404 });
        }

        return new Response(JSON.stringify(result.rows[0]), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error updating maintenance request status:', error);
        return new Response('Error updating status', { status: 500 });
    }
}
