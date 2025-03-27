import pool from '@/lib/db';

export async function POST(request: Request) {
    try{
        const userId = request.headers.get('User_ID');
        if (!userId) {
            return new Response(
            JSON.stringify({ message: 'User ID is required' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
    
        const userResult = await pool.query('SELECT * FROM Users WHERE User_ID = $1', [userId]);
        if (userResult.rowCount === 0) {
            return new Response(
            JSON.stringify({ message: 'User not found' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }
    
        const roleResult = await pool.query('SELECT Role FROM Roles WHERE User_ID = $1', [userId]);
        const role = roleResult.rows.length > 0 ? roleResult.rows[0].role : null;
    
        if (role !== 'Tenant') {
            return new Response(
            JSON.stringify({ message: 'User is not an Tenant' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const propertyId = request.headers.get('Property_ID');
        if (!propertyId) {
            return new Response(
            JSON.stringify({ message: 'Property ID is required' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
        const requestBody = await request.json();
        console.log("Request Body:", requestBody);
        const { description } = requestBody;

        const insertEnquiryQuery = `
            INSERT INTO Enquiry (Tenant_ID, Property_ID, Description)
            VALUES ($1, $2, $3) RETURNING Enquiry_ID;
        `;
        const { rows } = await pool.query(insertEnquiryQuery, [userId, propertyId, description]);

        if (rows.length > 0) {
            const enquiryId = rows[0].enquiry_id;
            return new Response(
                JSON.stringify({ message: 'Enquiry created successfully', Enquiry_ID: enquiryId }),
                { status: 201, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            return new Response(
                JSON.stringify({ message: 'Failed to create enquiry' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (error) {
        console.error("Error creating enquiry:", error);
        return new Response(
            JSON.stringify({ message: 'Server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
