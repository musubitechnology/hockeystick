/*
  # Create inventory table

  1. New Tables
    - `inventory`
      - `id` (uuid, primary key)
      - `model` (text)
      - `curve` (text)
      - `hand` (text)
      - `flex` (integer)
      - `weight` (integer)
      - `price` (numeric or text for 'SOLD')
      - `quantity` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `inventory` table
    - Add policy for authenticated users to manage inventory
*/

CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model text NOT NULL,
  curve text NOT NULL,
  hand text NOT NULL CHECK (hand IN ('LH', 'RH')),
  flex integer NOT NULL,
  weight integer NOT NULL,
  price numeric,
  quantity integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  is_sold boolean DEFAULT false
);

ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
  ON inventory
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert for authenticated users only"
  ON inventory
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only"
  ON inventory
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Enable delete for authenticated users only"
  ON inventory
  FOR DELETE
  TO authenticated
  USING (true);