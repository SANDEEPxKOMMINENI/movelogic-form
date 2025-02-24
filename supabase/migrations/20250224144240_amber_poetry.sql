/*
  # Update storage policies for room images

  1. Changes
    - Modify storage policies to be more permissive while maintaining security
    - Allow authenticated users to manage files in the room-images bucket
  
  2. Security
    - Maintain public read access
    - Ensure authenticated users can upload/update/delete their files
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public access to room images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload room images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update their room images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete their room images" ON storage.objects;

-- Create new, more permissive policies
CREATE POLICY "Allow public access to room images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'room-images');

CREATE POLICY "Allow authenticated users to manage room images"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (bucket_id = 'room-images')
  WITH CHECK (bucket_id = 'room-images');

-- Ensure the bucket exists and is public
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'room-images'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('room-images', 'room-images', true);
  END IF;
END $$;