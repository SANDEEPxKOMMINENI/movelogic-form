import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadImage = async (file: File, roomId: string) => {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error('User must be authenticated to upload images');
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${roomId}-${Math.random()}.${fileExt}`;
    const filePath = `${roomId}/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('room-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('room-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImage = async (imagePath: string) => {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error('User must be authenticated to delete images');
  }

  try {
    const pathParts = imagePath.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const roomId = pathParts[pathParts.length - 2];

    const { error } = await supabase.storage
      .from('room-images')
      .remove([`${roomId}/${fileName}`]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};