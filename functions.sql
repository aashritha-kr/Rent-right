CREATE OR REPLACE PROCEDURE add_land(
    input_Owner_ID INT,
    input_Zip_code VARCHAR(10),
    input_Country VARCHAR(100),
    input_Date_of_construction DATE,
    input_Create_at TIMESTAMP,
    input_Update_at TIMESTAMP,
    input_Door_no VARCHAR(50),
    input_Building_name VARCHAR(100),
    input_Street_name VARCHAR(100),
    input_Area VARCHAR(100),
    input_Type VARCHAR(20),
    input_Area_in_sqft FLOAT,
    input_Facing VARCHAR(15),
    input_Availability VARCHAR(15),
    input_Past_tenant_count INT,
    input_Description VARCHAR(500),
    input_Land_Type VARCHAR(10),
    input_Boundary_wall VARCHAR(3),
    input_Sale_type VARCHAR(4),
    input_Price_per_sqft DECIMAL(10, 2),
    input_Advance_Amount DECIMAL(10, 2),
    input_Negotiability VARCHAR(3)
)
LANGUAGE plpgsql
AS $$
DECLARE 
    new_property_id INT;
BEGIN
    INSERT INTO Property(
        Owner_ID,
        Zip_code,
        Country,
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
        input_Owner_ID,
        input_Zip_code,
        input_Country,
        input_Date_of_construction,
        input_Create_at,
        input_Update_at,
        input_Door_no,
        input_Building_name,
        input_Street_name,
        input_Area,
        input_Type,
        input_Area_in_sqft,
        input_Facing,
        input_Availability,
        input_Past_tenant_count,
        input_Description
    ) RETURNING Property_ID INTO new_property_id;

    INSERT INTO Plot_lands (
        Property_ID,
        Type,
        Boundary_wall,
        Sale_type,
        Price_per_sqft,
        Advance_Amount,
        Negotiability
    ) 
    VALUES (
        new_property_id,
        input_Land_Type,
        input_Boundary_wall,
        input_Sale_type,
        input_Price_per_sqft,
        input_Advance_Amount,
        input_Negotiability
    );
END;
$$;


--to add data to respected type (residential_buildings)
CREATE OR REPLACE PROCEDURE add_residential_building(
    input_Owner_ID INT,
    input_Zip_code VARCHAR(10),
    input_Country VARCHAR(100),
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
        Zip_code,
        Country,
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
        input_Zip_code,
        input_Country,
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

--to add data to respected type (commercial_buildings)
CREATE OR REPLACE PROCEDURE add_commercial_building(
    input_Owner_ID INT,
    input_Zip_code VARCHAR(10),
    input_Country VARCHAR(100),
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
        Zip_code,
        Country,
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
        input_Zip_code,
        input_Country,
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


--when the the tenant renewed the agreement,the old agreement will be expired and new agreement will be created with advance 0.00 
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
        Renewed,
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
        'NO',
        in_price,
        0.00,
      'active',
        NOW(),
        NOW()
    );
END;
$$;

--ensures that an user being inserted to into Admins table must have the role admin
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

--ensures that an user being inserted to into Staff table must have the role staff
CREATE FUNCTION check_staff_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM Roles
        WHERE User_ID = NEW.User_ID AND Role = 'Staff'
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

--This trigger ensures that only users with the Tenant role can be assigned as a Tenant_ID in the Lease and sale Agreement
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

--adds the data based on respective roles and also checking the duplicate roles of a particular user.
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

--The prevention of creating a new lease agreement on a property before the end date of past agreement.
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

--Updation of status of staff and the maintenance work .
CREATE OR REPLACE PROCEDURE manage_maintenance(
    input_request_id INT,
    input_staff_id INT DEFAULT NULL,
    input_new_status VARCHAR(10) DEFAULT NULL -- Expected values: 'Pending', 'Assigned', 'Resolved', 'In progress', 'Cancelled'
)
LANGUAGE plpgsql
AS $$
DECLARE
    current_status VARCHAR(10);
    current_staff INT;
BEGIN
    -- Get current status and staff of the maintenance request
    SELECT Status, Staff_ID
      INTO current_status, current_staff
      FROM Maintenance
     WHERE Request_ID = input_request_id;

    IF input_request_id IS NULL OR NOT FOUND THEN
        RAISE EXCEPTION 'Maintenance request ID % not found.', input_request_id;
    END IF;

    IF input_staff_id IS NOT NULL THEN
        -- Check if the staff member exists and is available
        IF NOT EXISTS (SELECT 1 FROM Staff WHERE User_ID = input_staff_id AND Availability IS TRUE) THEN
            RAISE EXCEPTION 'Staff member with ID % is not available.', input_staff_id;
        END IF;
        -- Update maintenance record: set the staff and status to 'Assigned'
        UPDATE Maintenance
        SET Staff_ID   = input_staff_id,
            Status     = 'Assigned',
            Updated_at = NOW()
        WHERE Request_ID = input_request_id;

        -- Mark the assigned staff as unavailable
        UPDATE Staff
        SET Availability = FALSE
        WHERE User_ID = input_staff_id;
    ELSE
        -- Only updating the status without reassigning staff
        UPDATE Maintenance
        SET Status     = input_new_status,
            Updated_at = NOW()
        WHERE Request_ID = input_request_id;

        -- If the updated status means the work is completed or cancelled,
        -- mark the assigned staff (if any) as available
        IF input_new_status IN ('Resolved', 'Cancelled') THEN
            IF current_staff IS NOT NULL THEN
                UPDATE Staff
                SET Availability = TRUE
                WHERE User_ID = current_staff;
            END IF;
        END IF;
    END IF;
END;
$$;

--trigger to expire the lease agreement
CREATE OR REPLACE FUNCTION expire_lease()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.End_date <= CURRENT_DATE THEN
        NEW.Status := 'expired';
        NEW.Updated_at := NOW();
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER expire_lease_trigger
BEFORE INSERT OR UPDATE ON Lease_Agreement
FOR EACH ROW
EXECUTE PROCEDURE expire_lease();

--trigger to update the availability as true or false according to the work status
CREATE OR REPLACE FUNCTION update_staff_availability()
RETURNS TRIGGER AS $$
BEGIN
    -- Update staff availability to TRUE when maintenance is resolved or cancelled
    IF NEW.Status IN ('Resolved', 'Cancelled') THEN
        UPDATE Staff
        SET Availability = TRUE
        WHERE User_ID = NEW.Staff_ID;
    END IF;
    -- Update staff availability to FALSE when maintenance is assigned
    IF NEW.Status = 'Assigned' THEN
        UPDATE Staff
        SET Availability = FALSE
        WHERE User_ID = NEW.Staff_ID;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_staff_availability
AFTER INSERT OR UPDATE ON Maintenance
FOR EACH ROW
EXECUTE FUNCTION update_staff_availability();


