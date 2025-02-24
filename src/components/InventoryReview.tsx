import React from 'react';
import { useFormStore } from '../store/formStore';
import { Button } from './ui/button';
import { ChevronLeft, Edit } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { supabase } from '../lib/supabase';

const InventoryReview = () => {
  const { rooms, address, floor, hasElevator, apartmentSize, setStep } = useFormStore();
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Insert move data
      const { data: moveData, error: moveError } = await supabase
        .from('moves')
        .insert({
          user_id: user.id,
          address,
          floor,
          has_elevator: hasElevator,
          apartment_size: apartmentSize
        })
        .select()
        .single();

      if (moveError) throw moveError;

      // Insert rooms and furniture
      for (const room of rooms) {
        const { data: roomData, error: roomError } = await supabase
          .from('rooms')
          .insert({
            move_id: moveData.id,
            name: room.name,
            image_url: room.imageUrl
          })
          .select()
          .single();

        if (roomError) throw roomError;

        // Insert furniture for each room
        for (const item of room.furniture) {
          const { error: furnitureError } = await supabase
            .from('furniture')
            .insert({
              room_id: roomData.id,
              name: item.name,
              quantity: 1
            });

          if (furnitureError) throw furnitureError;
        }
      }

      alert('Move details saved successfully!');
      // You might want to redirect to a success page or next step here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save move details');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-center mb-6">
        <img src="/src/assets/logo.svg" alt="MoveLogic AI" className="h-12" />
      </div>

      <h1 className="text-2xl font-bold text-center mb-2">Inventory Details</h1>
      <p className="text-gray-600 text-center mb-8">
        Please review your inventory and add/edit if required.
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg">
        <div className="bg-[#1B365C] text-white py-2 px-4 rounded-t-2xl">
          <span>STEP 7/8</span>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setStep(1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              BACK
            </button>
            <ImageUpload>
              {(openFileDialog) => (
                <button
                  onClick={openFileDialog}
                  className="flex items-center text-[#1B365C] font-medium border border-[#1B365C] rounded-full px-4 py-1"
                >
                  + ADD MORE ROOMS VIA IMAGES
                </button>
              )}
            </ImageUpload>
          </div>

          <div className="space-y-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {room.imageUrl && (
                        <img
                          src={room.imageUrl}
                          alt={room.name}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-medium mb-4">{room.name}</h3>
                        <div className="space-y-3">
                          {room.furniture.map((item) => (
                            <div key={item.id} className="grid grid-cols-2 gap-2">
                              <div className="text-gray-900 font-medium">{item.name}</div>
                              <div className="text-gray-600">
                                Width: {item.width} Height: {item.height} Length: {item.length}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    className="p-2 text-[#1B365C] hover:bg-gray-100 rounded-full"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[#00A99D] hover:bg-[#008F84] text-white mt-6"
          >
            {saving ? 'Saving...' : 'Proceed'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryReview;