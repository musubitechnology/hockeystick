/*
  # Fix sold status handling

  1. Changes
    - Add `is_sold` column if it doesn't exist
    - Migrate existing data where price='SOLD'
    - Update price column to not allow 'SOLD' string
*/

-- Add is_sold column if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'inventory' AND column_name = 'is_sold'
  ) THEN
    ALTER TABLE inventory ADD COLUMN is_sold boolean DEFAULT false;
  END IF;
END $$;

-- Update existing records where price might be 'SOLD'
UPDATE inventory 
SET is_sold = true,
    price = 0
WHERE price IS NULL OR price::text = 'SOLD';

-- Ensure price is always numeric
ALTER TABLE inventory 
  ALTER COLUMN price SET DEFAULT 0,
  ALTER COLUMN price SET NOT NULL;