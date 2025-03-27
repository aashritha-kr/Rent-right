import pool from '@/lib/db';

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

      if(role !== 'Staff'){
        return new Response( JSON.stringify({ message: 'User is not a Staff' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } });
      }
      const currentRequestsQuery = `
            SELECT
                Maintenance.Request_ID,
                Property.Building_name,
                Maintenance.Service,
                Maintenance.Description,
                Maintenance.Created_at,
                Maintenance.Status,
                Tenant.First_name || ' ' || Tenant.Last_name as TenantName,
                Tenant.Phone as TenantNumber,
                Owner.First_name || ' ' || Owner.Last_name as OwnerName,
                Owner.Phone as OwnerPhone
            FROM Maintenance
            JOIN Lease_Agreement ON Maintenance.Lease_ID = Lease_Agreement.Lease_ID
            JOIN Property ON Lease_Agreement.Property_ID = Property.Property_ID
            JOIN Users AS Owner ON Property.Owner_ID = Owner.User_ID
            JOIN Users AS Tenant ON Lease_Agreement.Tenant_ID = Tenant.User_ID
            WHERE Maintenance.Staff_ID = $1 AND Maintenance.Status <> 'Resolved'
        `;

        const pastRequestsQuery = `
            SELECT
                Maintenance.Request_ID,
                Property.Building_name,
                Maintenance.Service,
                Maintenance.Description,
                Maintenance.Created_at,
                Maintenance.Status,
                Tenant.First_name || ' ' || Tenant.Last_name as TenantName,
                Tenant.Phone as TenantNumber,
                Owner.First_name || ' ' || Owner.Last_name as OwnerName,
                Owner.Phone as OwnerPhone
            FROM Maintenance
            JOIN Lease_Agreement ON Maintenance.Lease_ID = Lease_Agreement.Lease_ID
            JOIN Property ON Lease_Agreement.Property_ID = Property.Property_ID
            JOIN Users AS Owner ON Property.Owner_ID = Owner.User_ID
            JOIN Users AS Tenant ON Lease_Agreement.Tenant_ID = Tenant.User_ID
            WHERE Maintenance.Staff_ID = $1 AND Maintenance.Status='Resolved'
        `;

        const [currentStaffRes, pastStaffRes] = await Promise.all([
            pool.query(currentRequestsQuery, [userId]),
            pool.query(pastRequestsQuery, [userId]),
          ]);
        const currStaffRequests = currentStaffRes.rows;
        const pastStaffRequests = pastStaffRes.rows;
  
        return new Response(JSON.stringify({ currStaffRequests, pastStaffRequests }), {
            headers: { 'Content-Type': 'application/json' },
        });
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