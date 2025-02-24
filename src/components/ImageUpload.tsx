import React, { useRef, ReactNode } from 'react';
import { uploadImage } from '../lib/supabase';
import { useFormStore } from '../store/formStore';
import { v4 as uuidv4 } from 'uuid';

interface ImageUploadProps {
  children: (openFileDialog: () => void) => ReactNode;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ children }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addRoom } = useFormStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const roomId = uuidv4();
      const imageUrl = await uploadImage(file, roomId);
      
      addRoom({
        id: roomId,
        name: 'New Room',
        imageUrl,
        furniture: [],
      });

      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {children(openFileDialog)}
    </>
  );
};

export default ImageUpload;