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
-- if renewed the lease_agreement
CREATE OR REPLACE PROCEDURE if_renewed(in_lease_id INT,in_property_id INT,in_tenant_id INT,
IN_end_date DATE,in_price DECIMAL(10,2))
LANGUAGE plpgsql
AS $$
DECLARE old_end_date DATE;
BEGIN
SELECT End_date INTO old_end_date
FROM Lease_Agreement WHERE Lease_ID = in_lease_id;

--UPDATE OLD Lease_Agreement status to 'expired' and update_at  now.
UPDATE Lease_Agreement
SET Status ='expired',
Updated_at =NOW()
WHERE Lease_ID =in_lease_id;
--insert new lease_agreement
INSERT INTO Lease_Agreement (
        Property_ID,
        Tenant_ID,
        Start_date,
        End_date,
        Renewed
        Price,
        Advance_amount,
        Status,
        Created_at,
        Updated_at
    )
    VALUES (
        in_property_id,
        in_tenant_id,
        old_end_date + INTERVAL '1 day', 
        -- Start date is the day after the old lease ends
        in_end_date,
        'NO'
        in_price,
        0.00,
      'active',
        NOW(),
        NOW()
    );
END;
$$;
CREATE FUNCTION check_admin_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM Roles
        WHERE User_ID = NEW.User_ID AND Role = 'Admin'
    ) THEN
        RAISE EXCEPTION 'User must have Admin role';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER check_admin_role_trigger
BEFORE INSERT ON Admins
FOR EACH ROW
EXECUTE FUNCTION check_admin_role();

CREATE FUNCTION check_staff_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM Roles
        WHERE User_ID = NEW.User_ID AND Role = 'staff'
    ) THEN
        RAISE EXCEPTION 'User must have staff role';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_staff_role_trigger
BEFORE INSERT ON Staff
FOR EACH ROW
EXECUTE FUNCTION check_staff_role();
CREATE FUNCTION check_tenant_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM Roles
        WHERE User_ID = NEW.User_ID AND Role = 'tenant'
    ) THEN
        RAISE EXCEPTION 'User must have tenant role';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER check_tenant_role_in_lease_trigger
BEFORE INSERT OR UPDATE ON Lease_Agreement
FOR EACH ROW
EXECUTE FUNCTION check_tenant_role();

CREATE TRIGGER check_tenant_role_in_sale_trigger
BEFORE INSERT OR UPDATE ON Sale_Agreement
FOR EACH ROW
EXECUTE FUNCTION check_tenant_role();

CREATE OR REPLACE PROCEDURE if_renewed(in_lease_id INT,in_property_id INT,in_tenant_id INT,
IN_end_date DATE,in_price DECIMAL(10,2))
LANGUAGE plpgsql
AS $$
DECLARE old_end_date DATE;
BEGIN
SELECT End_date INTO old_end_date
FROM Lease_Agreement WHERE Lease_ID = in_lease_id;

--UPDATE OLD Lease_Agreement status to expired and update_at should now.
UPDATE Lease_Agreement
SET Status ='expired',
Updated_at =NOW()
WHERE Lease_ID =in_lease_id;
--insert new lease_agreement
INSERT INTO Lease_Agreement (
        Property_ID,
        Tenant_ID,
        Start_date,
        End_date,
        Renewed
        Price,
        Advance_amount,+/
        Status,
        Created_at,
        Updated_at
    )
    VALUES (
        in_property_id,
        in_tenant_id,
        old_end_date + INTERVAL '1 day', 
        -- Start date is the day after the old lease ends
        in_end_date,
        'NO'
        in_price,
        0.00,
      'active',
        NOW(),
        NOW()
    );
END;
$$;
CREATE OR REPLACE PROCEDURE add_user_with_role(
    input_first_name VARCHAR(30),
    input_middle_name VARCHAR(30),
    input_last_name VARCHAR(30),
    input_email VARCHAR(100),
    input_phone VARCHAR(15),
    input_password_hash VARCHAR(80),
    input_role VARCHAR(10),  
    --  parameters for Admin:-*
    input_UPI_ID VARCHAR(60) DEFAULT NULL,
    input_Account_no VARCHAR(20) DEFAULT NULL,
    input_IFSC_code  VARCHAR(20) DEFAULT NULL,
    input_Bank_name VARCHAR(100) DEFAULT NULL,
    input_Bank_Branch VARCHAR(100) DEFAULT NULL,
    input_Account_holder_name VARCHAR(100) DEFAULT NULL,
    -- parameter for Staff:
    input_Service            VARCHAR(15) DEFAULT NULL,
    input_Availability       BOOLEAN DEFAULT TRUE
)
LANGUAGE plpgsql
AS $$
DECLARE
    existing_user_id INT;
    new_user_id INT;
BEGIN
    -- Check if a user with the same email and role already exists.
    SELECT u.User_ID
      INTO existing_user_id
      FROM Users u
      JOIN Roles r ON u.User_ID = r.User_ID
     WHERE u.Email = input_email
       AND r.Role = input_role;
       
    IF existing_user_id IS NOT NULL THEN
        RAISE EXCEPTION 'User with email "%" and role "%" already exists.', input_email, input_role;
    END IF;
    
    -- Insert a new record into Users.
    INSERT INTO Users (First_name, Middle_name, Last_name, Email, Phone, Password_hash)
    VALUES (input_first_name, input_middle_name, input_last_name, input_email, input_phone, input_password_hash)
    RETURNING User_ID INTO new_user_id;
    
    -- Insert the role into Roles.
    INSERT INTO Roles (User_ID, Role)
    VALUES (new_user_id, input_role);
    
    -- role-specific details:
    IF input_role = 'Admin' THEN
        INSERT INTO Admins (User_ID, UPI_ID, Account_no, IFSC_code, Bank_name, Bank_Branch, Account_holder_name)
        VALUES (new_user_id, input_UPI_ID, input_Account_no, input_IFSC_code, input_Bank_name, input_Bank_Branch, input_Account_holder_name);
    ELSIF input_role = 'Staff' THEN
        INSERT INTO Staff (User_ID, Service, Account_no, IFSC_code, Bank_name, Bank_Branch, Account_holder_name, UPI_ID, Availability)
        VALUES (new_user_id, input_Service, input_Account_no, input_IFSC_code, input_Bank_name, input_Bank_Branch, input_Account_holder_name, input_UPI_ID, input_Availability);
    END IF;
    
    -- For tenant role, no additional insertion is needed.
    
END;
$$;
CREATE OR REPLACE FUNCTION prevent_overlapping_leases()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM Lease_Agreement
        WHERE Property_ID = NEW.Property_ID
        AND Lease_ID != NEW.Lease_ID -- Exclude the current row if updating
        AND Status IN ('active', 'expired')
        AND (NEW.Start_date, NEW.End_date) OVERLAPS (Start_date, End_date)
    ) THEN
        RAISE EXCEPTION 'Overlapping lease agreement detected';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_overlapping_leases_trigger
BEFORE INSERT OR UPDATE ON Lease_Agreement
FOR EACH ROW
EXECUTE PROCEDURE prevent_overlapping_leases();



