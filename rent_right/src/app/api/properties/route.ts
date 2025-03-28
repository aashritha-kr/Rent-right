import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';


export async function GET(request: Request) {
  try {
    const userId = request.headers.get('User_ID');

    if (!userId) {
      const propertyQuery = `
          SELECT * FROM Property
      `;

      const propertyResult = await pool.query(propertyQuery);
      const properties = propertyResult.rows;

      return new Response(
          JSON.stringify({ properties }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
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

        return new Response(
            JSON.stringify({ properties }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    }
    else if(role==='Tenant'){
      const propertyQuery = `
          SELECT * FROM Property
      `;

      const propertyResult = await pool.query(propertyQuery);
      const properties = propertyResult.rows;

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

export async function POST(request: NextRequest) {
  const client = await pool.connect();
  try {
    const formData = await request.formData();
    const userId = request.headers.get('User_ID');

    if (!userId) {
      return new Response(
        JSON.stringify({ message: 'User ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Step 1: Check if the user is an Admin
    const userResult = await pool.query('SELECT * FROM Users WHERE User_ID = $1', [userId]);
    if (userResult.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const roleResult = await pool.query('SELECT Role FROM Roles WHERE User_ID = $1', [userId]);
    const role = roleResult.rows.length > 0 ? roleResult.rows[0].role : null;

    if (role !== 'Admin') {
      return new Response(
        JSON.stringify({ message: 'User is not an Admin' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Step 2: Collect and Validate the Required Fields
    const requiredFields = [
      'Door_no', 'Date_of_construction', 'Building_name', 'Street_name',
      'Area', 'Area_in_sqft', 'Facing', 'Type', 'Description'
    ];

    const missingFields = requiredFields.filter(field => !formData.get(field));
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ message: `Missing required fields: ${missingFields.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const propertyData = {
      Door_no: formData.get('Door_no')?.toString() || '',
      Date_of_construction: formData.get('Date_of_construction')?.toString() || '',
      Building_name: formData.get('Building_name')?.toString() || '',
      Street_name: formData.get('Street_name')?.toString() || '',
      Area: formData.get('Area')?.toString() || '',
      Area_in_sqft: formData.get('Area_in_sqft')?.toString() || '',
      Facing: formData.get('Facing')?.toString() || '',
      Type: formData.get('Type')?.toString() || '',
      Description: formData.get('Description')?.toString() || '',
      Zip_code: formData.get('Zip_code')?.toString() || '',
      Country: formData.get('Country')?.toString() || '',
      City: formData.get('City')?.toString() || '',
      State: formData.get('State')?.toString() || ''
    };

    // Step 3: Begin a Transaction
    await client.query('BEGIN');

    // Step 4: Insert Property into Property Table
    const insertPropertyQuery = `
      INSERT INTO Property (
        Owner_ID, Date_of_construction, Door_no, Building_name, Street_name,
        Area, Area_in_sqft, Facing, Type, Description, Zip_code, Country, City, State
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING Property_ID;
    `;
    const propertyValues = [
      userId, propertyData.Date_of_construction, propertyData.Door_no,
      propertyData.Building_name, propertyData.Street_name, propertyData.Area,
      propertyData.Area_in_sqft, propertyData.Facing, propertyData.Type,
      propertyData.Description, propertyData.Zip_code, propertyData.Country,
      propertyData.City, propertyData.State
    ];
    
    const propertyResult = await client.query(insertPropertyQuery, propertyValues);
    const propertyId = propertyResult.rows[0]?.property_id;

    if (!propertyId) {
      return new Response(
        JSON.stringify({ message: 'Failed to retrieve Property ID after insert' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Step 5: Insert Type-specific Data (Land, Residential, Commercial)
    if (propertyData.Type === 'Land') {
      const landData = {
        Sale_type: formData.get('Sale_type')?.toString() || '',
        Boundary_wall: formData.get('Boundary_wall')?.toString() || '',
        Price_per_sqft: formData.get('Price_per_sqft')?.toString() || '',
        Negotiability: formData.get('Negotiability')?.toString() || ''
      };

      const insertLandQuery = `
        INSERT INTO Land (Property_ID, Sale_type, Boundary_wall, Price_per_sqft, Negotiability)
        VALUES ($1, $2, $3, $4, $5);
      `;
      await client.query(insertLandQuery, [
        propertyId, landData.Sale_type, landData.Boundary_wall,
        landData.Price_per_sqft, landData.Negotiability
      ]);

    } else if (propertyData.Type === 'Residential Building') {
      const residentialData = {
        Sale_type: formData.get('Sale_type')?.toString() || '',
        BHK_Type: formData.get('BHK_Type')?.toString() || '',
        Furnishing: formData.get('Furnishing')?.toString() || '',
        Price_per_sqft: formData.get('Price_per_sqft')?.toString() || '',
        Negotiability: formData.get('Negotiability')?.toString() || '',
        Two_wheeler_parking: formData.get('Two_wheeler_parking')?.toString() || '',
        Four_wheeler_parking: formData.get('Four_wheeler_parking')?.toString() || '',
        Bathrooms: formData.get('Bathrooms')?.toString() || '',
        Floor: formData.get('Floor')?.toString() || '',
        Lift_service: formData.get('Lift_service')?.toString() || ''
      };

      const insertResidentialQuery = `
        INSERT INTO Residential_Building (
          Property_ID, Sale_type, BHK_Type, Furnishing, Price_per_sqft, Negotiability,
          Two_wheeler_parking, Four_wheeler_parking, Bathrooms, Floor, Lift_service
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
      `;
      await client.query(insertResidentialQuery, [
        propertyId, residentialData.Sale_type, residentialData.BHK_Type,
        residentialData.Furnishing, residentialData.Price_per_sqft, residentialData.Negotiability,
        residentialData.Two_wheeler_parking, residentialData.Four_wheeler_parking,
        residentialData.Bathrooms, residentialData.Floor, residentialData.Lift_service
      ]);

    } else if (propertyData.Type === 'Commercial Building') {
      const commercialData = {
        Sale_type: formData.get('Sale_type')?.toString() || '',
        Parking: formData.get('Parking')?.toString() || '',
        Furnishing: formData.get('Furnishing')?.toString() || '',
        Price_per_sqft: formData.get('Price_per_sqft')?.toString() || '',
        Negotiability: formData.get('Negotiability')?.toString() || '',
        Start_floor: formData.get('Start_floor')?.toString() || '',
        End_floor: formData.get('End_floor')?.toString() || '',
        Lift_service: formData.get('Lift_service')?.toString() || ''
      };

      const insertCommercialQuery = `
        INSERT INTO Commercial_Building (
          Property_ID, Sale_type, Parking, Furnishing, Price_per_sqft, Negotiability,
          Start_floor, End_floor, Lift_service
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
      `;
      await client.query(insertCommercialQuery, [
        propertyId, commercialData.Sale_type, commercialData.Parking,
        commercialData.Furnishing, commercialData.Price_per_sqft, commercialData.Negotiability,
        commercialData.Start_floor, commercialData.End_floor, commercialData.Lift_service
      ]);
    }

    // Step 6: Handle File Uploads
    const files = formData.getAll('images') as File[];
    if (files.length > 0) {
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }

      for (const file of files) {
        const filePath = path.join(uploadsDir, file.name);
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, fileBuffer);
      }
    }

    // Step 7: Commit the Transaction
    await client.query('COMMIT');

    return new Response(
      JSON.stringify({ message: 'Property added successfully', Property_ID: propertyId }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error adding property:', error);
    return new Response(
      JSON.stringify({ message: 'Error adding property' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    client.release(); // Release the client back to the pool
  }
}

export async function DELETE(request: Request) {

}