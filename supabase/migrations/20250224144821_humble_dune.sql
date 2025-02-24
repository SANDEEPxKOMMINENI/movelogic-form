/*
  # Add image_url column to rooms table

  1. Changes
    - Add `image_url` column to `rooms` table to store room image URLs
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'rooms' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE rooms ADD COLUMN image_url text;
  END IF;
END $$;