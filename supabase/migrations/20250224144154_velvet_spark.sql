/*
  # Create storage bucket for room images

  1. New Storage
    - Creates a 'room-images' storage bucket for storing room photos
  
  2. Security
    - Enable public access to room images
    - Add policies for authenticated users to manage their images
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('room-images', 'room-images', true);

-- Create policies for the bucket
CREATE POLICY "Allow public access to room images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'room-images');

CREATE POLICY "Allow authenticated users to upload room images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'room-images');

CREATE POLICY "Allow authenticated users to update their room images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'room-images')
  WITH CHECK (bucket_id = 'room-images');

CREATE POLICY "Allow authenticated users to delete their room images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'room-images');