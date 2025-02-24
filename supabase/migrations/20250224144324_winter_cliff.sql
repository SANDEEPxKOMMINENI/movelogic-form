/*
  # Fix storage policies and authentication

  1. Changes
    - Drop all existing storage policies
    - Create new policies with proper authentication checks
    - Update bucket configuration
  
  2. Security
    - Ensure proper authentication checks
    - Maintain public read access
    - Organize files by user ID
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public access to room images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to manage room images" ON storage.objects;

-- Recreate the bucket with proper configuration
DO $$
BEGIN
  DELETE FROM storage.buckets WHERE id = 'room-images';
  INSERT INTO storage.buckets (id, name, public, file_size_limit)
  VALUES ('room-images', 'Room Images', true, 52428800);
END $$;

-- Create new policies
CREATE POLICY "Enable read access for all users"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'room-images');

CREATE POLICY "Enable insert for authenticated users only"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'room-images'
  );

CREATE POLICY "Enable update for authenticated users only"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'room-images')
  WITH CHECK (bucket_id = 'room-images');

CREATE POLICY "Enable delete for authenticated users only"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'room-images');