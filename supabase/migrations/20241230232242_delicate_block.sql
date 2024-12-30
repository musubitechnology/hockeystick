/*
  # Add category column to inventory table

  1. Changes
    - Add category column to inventory table with enum type
    - Add check constraint to ensure valid categories
    - Update existing rows with parsed categories based on model names
    - Make category column NOT NULL

  2. Notes
    - Categories: Senior, Junior, Youth, Intermediate
    - Default value is 'Senior' if no category can be determined
*/

-- Create enum type for stick categories
DO $$ BEGIN
  CREATE TYPE stick_category AS ENUM ('Senior', 'Junior', 'Youth', 'Intermediate');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add category column if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'inventory' AND column_name = 'category'
  ) THEN
    ALTER TABLE inventory ADD COLUMN category stick_category DEFAULT 'Senior';
  END IF;
END $$;

-- Update existing rows with parsed categories
DO $$ BEGIN
  UPDATE inventory SET category = 
    CASE 
      WHEN LOWER(model) LIKE '%sr%' OR LOWER(model) LIKE '%senior%' THEN 'Senior'::stick_category
      WHEN LOWER(model) LIKE '%jr%' OR LOWER(model) LIKE '%junior%' THEN 'Junior'::stick_category
      WHEN LOWER(model) LIKE '%yth%' OR LOWER(model) LIKE '%youth%' THEN 'Youth'::stick_category
      WHEN LOWER(model) LIKE '%int%' OR LOWER(model) LIKE '%intermediate%' THEN 'Intermediate'::stick_category
      ELSE 'Senior'::stick_category
    END;

  -- Make category column NOT NULL after updating existing rows
  ALTER TABLE inventory ALTER COLUMN category SET NOT NULL;
END $$;