import pool from '@/lib/db';

export async function GET(request: Request) {
  try {
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

    if (role === 'Admin') {
        const propertyQuery = `
            SELECT * FROM Property WHERE Owner_ID = $1
        `;

        const propertyResult = await pool.query(propertyQuery, [userId]);
        const properties = propertyResult.rows;
        console.log("Properties:", properties);

        return new Response(
            JSON.stringify({ properties }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    }

    
  } catch (error) {
    console.error("Error fetching rental data:", error);
    return new Response(JSON.stringify({ message: 'Error fetching property data' }),
    { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PUT(request: Request) {
    try {
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

        if (role != 'Admin') {
            return new Response( JSON.stringify({ message: 'User is not an Owner' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } });
        }

        const req = await request.json();
        if (!req.property_id || !req.updated_details) {
            return new Response(JSON.stringify({ message: 'Missing required fields' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const propertyResult = await pool.query(
            'SELECT * FROM Property WHERE Property_ID = $1',
            [req.property_id]
        );

        if (propertyResult.rowCount === 0) {
            return new Response(JSON.stringify({ message: 'Property not found' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        const property = propertyResult.rows[0];

        if (property.owner_id != userId) {
            return new Response(JSON.stringify({ message: 'Property does not belong to user' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } });
        }

        console.log("Updated details:", req.updated_details);

        const { door_no, building_name, street_name, area, type, area_in_sqft, facing, availability, description } = req.updated_details;

        const updateResult = await pool.query(
        `UPDATE Property SET 
            Door_no = $1, 
            Building_name = $2, 
            Street_name = $3, 
            Area = $4, 
            Type = $5,
            Area_in_sqft = $6, 
            Facing = $7, 
            Availability = $8, 
            Description = $9,
            Update_at = CURRENT_TIMESTAMP
        WHERE Property_ID = $10
        RETURNING *`,
        [door_no, building_name, street_name, area, type, area_in_sqft, facing, availability, description, req.property_id]
        );

        const updatedProperty = updateResult.rows[0];
        return new Response(
            JSON.stringify({ property: updatedProperty }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    }catch (error) {
        console.error("Error updating property:", error);
        return new Response(JSON.stringify({ message: 'Error updating property' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}