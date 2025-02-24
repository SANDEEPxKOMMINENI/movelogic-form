/*
  # Initial Schema Setup for MoveLogic AI

  1. New Tables
    - `moves`
      - Stores basic move information including address and apartment details
    - `rooms`
      - Stores room information for each move
    - `furniture`
      - Stores furniture items for each room

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create moves table
CREATE TABLE IF NOT EXISTS moves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  address text NOT NULL,
  floor integer NOT NULL,
  has_elevator boolean NOT NULL DEFAULT false,
  apartment_size numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  move_id uuid REFERENCES moves(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create furniture table
CREATE TABLE IF NOT EXISTS furniture (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE moves ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE furniture ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own moves"
  ON moves
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage rooms for their moves"
  ON rooms
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM moves
      WHERE moves.id = rooms.move_id
      AND moves.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM moves
      WHERE moves.id = rooms.move_id
      AND moves.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage furniture for their rooms"
  ON furniture
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM rooms
      JOIN moves ON moves.id = rooms.move_id
      WHERE rooms.id = furniture.room_id
      AND moves.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM rooms
      JOIN moves ON moves.id = rooms.move_id
      WHERE rooms.id = furniture.room_id
      AND moves.user_id = auth.uid()
    )
  );