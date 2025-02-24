import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../lib/supabase';

interface Furniture {
  id: string;
  name: string;
  width?: string;
  height?: string;
  length?: string;
}

interface Room {
  id: string;
  name: string;
  imageUrl?: string;
  furniture: Furniture[];
}

interface FormState {
  step: number;
  address: string;
  floor: number;
  hasElevator: boolean;
  apartmentSize: number;
  rooms: Room[];
  setStep: (step: number) => void;
  setAddress: (address: string) => void;
  setFloor: (floor: number) => void;
  setHasElevator: (hasElevator: boolean) => void;
  setApartmentSize: (size: number) => void;
  addRoom: (room: Room) => void;
  updateRoom: (roomId: string, room: Room) => void;
  deleteRoom: (roomId: string) => void;
  addRoomWithImage: (file: File) => Promise<void>;
}

export const useFormStore = create<FormState>((set, get) => ({
  step: 1,
  address: '',
  floor: 1,
  hasElevator: false,
  apartmentSize: 0,
  rooms: [],
  setStep: (step) => set({ step }),
  setAddress: (address) => set({ address }),
  setFloor: (floor) => set({ floor }),
  setHasElevator: (hasElevator) => set({ hasElevator }),
  setApartmentSize: (size) => set({ apartmentSize: size }),
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  updateRoom: (roomId, updatedRoom) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === roomId ? updatedRoom : room
      ),
    })),
  deleteRoom: (roomId) =>
    set((state) => ({
      rooms: state.rooms.filter((room) => room.id !== roomId),
    })),
  addRoomWithImage: async (file: File) => {
    try {
      const roomId = uuidv4();
      const { data: { publicUrl }, error } = await supabase.storage
        .from('room-images')
        .upload(`rooms/${roomId}`, file);

      if (error) throw error;

      const newRoom: Room = {
        id: roomId,
        name: 'New Room',
        imageUrl: publicUrl,
        furniture: [],
      };

      set((state) => ({ rooms: [...state.rooms, newRoom] }));
    } catch (error) {
      console.error('Error adding room with image:', error);
      throw error;
    }
  },
}));