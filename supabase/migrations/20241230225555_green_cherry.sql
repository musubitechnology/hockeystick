/*
  # Fix inventory table policies

  1. Changes
    - Enable anonymous access for all CRUD operations
    - Remove authenticated-only restrictions
    - Keep basic validation checks

  2. Security
    - Allow public read/write access since this is a demo app
    - Maintain data validation through CHECK constraints
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON inventory;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON inventory;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON inventory;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON inventory;

-- Create new policies for anonymous access
CREATE POLICY "Enable read access for everyone"
  ON inventory FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for everyone"
  ON inventory FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update for everyone"
  ON inventory FOR UPDATE
  USING (true);

CREATE POLICY "Enable delete for everyone"
  ON inventory FOR DELETE
  USING (true);