import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
        return NextResponse.json({ message: "Property ID is required" }, { status: 400 });
    }

    const propertyQuery = `
      SELECT * 
      FROM Property 
      WHERE Property_ID = $1
    `;
    const { rows: propertyRows } = await pool.query(propertyQuery, [id]);

    if (propertyRows.length === 0) {
        return NextResponse.json({ message: "Property not found" }, { status: 404 });
    }

    const property = propertyRows[0];
    
    let propertyDetails = {};

    if (property.Type === 'Residential Building') {
      const residentialQuery = `
        SELECT * 
        FROM Residential_buildings 
        WHERE Property_ID = $1
      `;
      const { rows: residentialRows } = await pool.query(residentialQuery, [id]);
      propertyDetails = residentialRows[0] || {};
    } 
    else if (property.Type === 'Commercial Building') {
      const commercialQuery = `
        SELECT * 
        FROM Commercial_buildings 
        WHERE Property_ID = $1
      `;
      const { rows: commercialRows } = await pool.query(commercialQuery, [id]);
      propertyDetails = commercialRows[0] || {};
    } 
    else if (property.Type === 'Land') {
      const landQuery = `
        SELECT * 
        FROM Plot_lands 
        WHERE Property_ID = $1
      `;
      const { rows: landRows } = await pool.query(landQuery, [id]);
      propertyDetails = landRows[0] || {};
    }

    const combinedDetails = { ...property, ...propertyDetails };
    console.log(combinedDetails)

    return NextResponse.json(combinedDetails);
    
  } catch (error) {
    console.error("Error fetching property details:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
