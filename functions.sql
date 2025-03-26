CREATE OR REPLACE PROCEDURE add_land(
    input_Owner_ID INT,
    input_Date_of_construction DATE,
    input_Create_at DATETIME,
    input_Update_at DATETIME,
    input_Door_no VARCHAR(50),
    input_Building_name VARCHAR(100),
    input_Street_name VARCHAR(100),
    input_Area VARCHAR(100),
    input_Type VARCHAR(20),
    input_Area_in_sqft FLOAT,
    input_Facing VARCHAR(15),
    input_Availability VARCHAR(15),
    input_Past_tenant_count INT,
    input_Description Varchar(500),

    input_Type VARCHAR(10),
    input_Type VARCHAR(10),
    input_Boundary_wall VARCHAR(3),
    input_Sale_type VARCHAR(4),
    input_Price_per_sqft DECIMAL(10, 2),
    input_Advance_Amount DECIMAL(10, 2),
    input_Negotiability VARCHAR(3)
    )
    LANGUAGE plpgsql
    AS $$
    DECLARE new_property_id INT;
    BEGIN
    INSERT INTO Property(
        Property_ID ,
        Owner_ID ,
        Date_of_construction,
        Create_at,
        Update_at,
        Door_no,
        Building_name,
        Street_name,
        Area,
        Type,
        Area_in_sqft,
        Facing,
        Availability,
        Past_tenant_count,
        Description
        ) VALUES (
        input_Owner_ID ,
        input_Date_of_construction ,
        input_Create_at ,
        input_Update_at ,
        input_Door_no ,
        input_Building_name ,
        input_Street_name ,
        input_Area ,
        input_Type ,
        input_Area_in_sqft ,
        input_Facing ,
        input_Availability ,
        input_Past_tenant_count ,
        input_Description
        ) RETURNING Property_ID INTO new_property_id;

        INSERT INTO Plot_lands (
        Property_ID ,
        Type,
        Boundary_wall,
        Sale_type,
        Price_per_sqft,
        Advance_Amount,
        Negotiability
        ) 
        VALUES (
        new_property_id,
        input_Type,
        input_Type,
        input_Boundary_wall,
        input_Sale_type,
        input_Price_per_sqft,
        input_Advance_Amount,
        input_Negotiability
        );
        END;
        $$;


CREATE OR REPLACE PROCEDURE add_residential_building(
    input_Owner_ID INT,
    input_Date_of_construction DATE,
    input_Door_no VARCHAR(50),
    input_Building_name VARCHAR(100),
    input_Street_name VARCHAR(100),
    input_Area VARCHAR(100),
    input_Area_in_sqft FLOAT,
    input_Facing VARCHAR(15),
    input_Availability VARCHAR(15),
    input_Description VARCHAR(500),
    input_Sale_type VARCHAR(4),
    input_Type VARCHAR(20),
    input_BHK_Type VARCHAR(1),
    input_Furnishing VARCHAR(15),
    input_Price DECIMAL(10, 2),
    input_Advance_amount DECIMAL(10, 2),
    input_Negotiability VARCHAR(3),
    input_Two_wheeler_parking VARCHAR(3),
    input_Four_wheeler_parking VARCHAR(3),
    input_Bathrooms INT,
    input_Floor INT,
    input_Lift_service VARCHAR(3)
)
LANGUAGE plpgsql
AS $$
DECLARE
    new_property_ID INT;
BEGIN
    INSERT INTO Property (
        Owner_ID,
        Date_of_construction,
        Door_no,
        Building_name,
        Street_name,
        Area,
        Type,
        Area_in_sqft,
        Facing,
        Availability,
        Description
    )
    VALUES (
        input_Owner_ID,
        input_Date_of_construction,
        input_Door_no,
        input_Building_name,
        input_Street_name,
        input_Area,
        'Residential Building',
        input_Area_in_sqft,
        input_Facing,
        input_Availability,
        input_Description
    )
    RETURNING Property_ID INTO new_property_ID;

    INSERT INTO Residential_buildings (
        Property_ID,
        Sale_type,
        Type,
        BHK_Type,
        Furnishing,
        Price,
        Advance_amount,
        Negotiability,
        Two_wheeler_parking,
        Four_wheeler_parking,
        Bathrooms,
        Floor,
        Lift_service
    )
    VALUES (
        new_property_ID,
        input_Sale_type,
        input_Type,
        input_BHK_Type,
        input_Furnishing,
        input_Price,
        input_Advance_amount,
        input_Negotiability,
        input_Two_wheeler_parking,
        input_Four_wheeler_parking,
        input_Bathrooms,
        input_Floor,
        input_Lift_service
    );
END;
$$;

CREATE OR REPLACE PROCEDURE add_commercial_building(
    input_Owner_ID INT,
    input_Date_of_construction DATE,
    input_Door_no VARCHAR(50),
    input_Building_name VARCHAR(100),
    input_Street_name VARCHAR(100),
    input_Area VARCHAR(100),
    input_Area_in_sqft FLOAT,
    input_Facing VARCHAR(15),
    input_Availability VARCHAR(15),
    input_Description VARCHAR(500),
    input_Sale_type VARCHAR(4),
    input_Type VARCHAR(15),
    input_Parking VARCHAR(7),
    input_Furnishing VARCHAR(15),
    input_Price DECIMAL(10, 2),
    input_Advance_amount DECIMAL(10, 2),
    input_Negotiability VARCHAR(3),
    input_Start_floor INT,
    input_End_floor INT,
    input_Lift_service VARCHAR(3)
)
LANGUAGE plpgsql
AS $$
DECLARE
    new_property_ID INT;
BEGIN
    INSERT INTO Property (
        Owner_ID,
        Date_of_construction,
        Door_no,
        Building_name,
        Street_name,
        Area,
        Type,
        Area_in_sqft,
        Facing,
        Availability,
        Description
    )
    VALUES (
        input_Owner_ID,
        input_Date_of_construction,
        input_Door_no,
        input_Building_name,
        input_Street_name,
        input_Area,
        'Commercial Building',
        input_Area_in_sqft,
        input_Facing,
        input_Availability,
        input_Description
    )
    RETURNING Property_ID INTO new_property_ID;

    INSERT INTO Commercial_buildings (
        Property_ID,
        Sale_type,
        Type,
        Parking,
        Furnishing,
        Price,
        Advance_amount,
        Negotiability,
        Start_floor,
        End_floor,
        Lift_service
    )
    VALUES (
        new_property_ID,
        input_Sale_type,
        input_Type,
        input_Parking,
        input_Furnishing,
        input_Price,
        input_Advance_amount,
        input_Negotiability,
        input_Start_floor,
        input_End_floor,
        input_Lift_service
    );
END;
$$;

