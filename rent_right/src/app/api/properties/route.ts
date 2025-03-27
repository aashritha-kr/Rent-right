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
    try {
      const formData = await request.formData();
  
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
  
      if (role !== 'Admin') {
        return new Response(
          JSON.stringify({ message: 'User is not an Admin' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      const Door_no = formData.get('Door_no')?.toString() || '';
      const Date_of_construction = formData.get('Date_of_construction')?.toString() || '';
      const Building_name = formData.get('Building_name')?.toString() || '';
      const Street_name = formData.get('Street_name')?.toString() || '';
      const Area = formData.get('Area')?.toString() || '';
      const Area_in_sqft = formData.get('Area_in_sqft')?.toString() || '';
      const Facing = formData.get('Facing')?.toString() || '';
      const Type = formData.get('Type')?.toString() || '';
      const Description = formData.get('Description')?.toString() || '';
  
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
  
      const insertQuery = `
        INSERT INTO Property (
            Owner_ID, Date_of_construction, Door_no, Building_name, Street_name,
            Area, Area_in_sqft, Facing, Type, Description
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING Property_ID;
      `;
  
      const insertValues = [
        userId,
        Date_of_construction,
        Door_no,
        Building_name,
        Street_name,
        Area,
        Area_in_sqft,
        Facing,
        Type,
        Description,
      ];
  
      const insertResult = await pool.query(insertQuery, insertValues);
      const propertyId = insertResult.rows[0]?.property_id;
  
      if (!propertyId) {
        return new Response(
          JSON.stringify({ message: 'Failed to retrieve Property ID after insert' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      const files = formData.getAll('images') as File[];
      console.log('Files to be uploaded:', files);
        if (files.length > 0) {
            const uploadsDir = path.join(process.cwd(), 'uploads');
            if (!fs.existsSync(uploadsDir)) {
              fs.mkdirSync(uploadsDir);
              console.log('Uploads directory created.');
            }

            for (const file of files) {
                const filePath = path.join(uploadsDir, file.name);
                console.log('File to be uploaded:', filePath);

                const fileBuffer = Buffer.from(await file.arrayBuffer());

                await writeFile(filePath, fileBuffer);

                console.log(`File uploaded successfully: ${file.name}`);
            }
        }
        return new Response(
            JSON.stringify({ message: 'Property added successfully', Property_ID: propertyId }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
  
    } catch (error) {
      console.error('Error adding property:', error);
      return new Response(
        JSON.stringify({ message: 'Error adding property' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }


export async function DELETE(request: Request) {

}