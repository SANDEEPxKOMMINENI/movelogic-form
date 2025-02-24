import React, { useState } from 'react';
import { useFormStore } from '../store/formStore';
import { Button } from './ui/button';
import { ChevronLeft, Trash2, Plus } from 'lucide-react';
import ImageUpload from './ImageUpload';

const InventoryEdit = () => {
  const { rooms, updateRoom, setStep } = useFormStore();
  const [newItemName, setNewItemName] = useState('');

  const handleAddItem = (roomId: string) => {
    if (!newItemName) return;

    const room = rooms.find((r) => r.id === roomId);
    if (!room) return;

    const updatedRoom = {
      ...room,
      furniture: [
        ...room.furniture,
        {
          id: Date.now().toString(),
          name: newItemName,
          width: '3.5',
          height: '2.5',
          length: '6.0',
        },
      ],
    };

    updateRoom(roomId, updatedRoom);
    setNewItemName('');
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

      <div className="bg-white rounded-2xl shadow-lg">
        <div className="bg-[#1B365C] text-white py-2 px-4 rounded-t-2xl">
          <span>STEP 7/8</span>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setStep(2)}
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

          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
            >
              <div className="flex items-start gap-4 mb-4">
                {room.imageUrl && (
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <input
                    type="text"
                    value={room.name}
                    onChange={(e) =>
                      updateRoom(room.id, { ...room, name: e.target.value })
                    }
                    className="text-lg font-medium bg-transparent border-none focus:ring-0 w-full"
                    placeholder="Enter Room Name"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {room.furniture.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#F0FBFA] rounded-xl p-4 relative"
                  >
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        const updatedFurniture = room.furniture.map((f) =>
                          f.id === item.id ? { ...f, name: e.target.value } : f
                        );
                        updateRoom(room.id, {
                          ...room,
                          furniture: updatedFurniture,
                        });
                      }}
                      className="w-full bg-transparent border-none focus:ring-0 mb-2"
                      placeholder="Item Name"
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Width</label>
                        <input
                          type="text"
                          value={item.width}
                          onChange={(e) => {
                            const updatedFurniture = room.furniture.map((f) =>
                              f.id === item.id ? { ...f, width: e.target.value } : f
                            );
                            updateRoom(room.id, {
                              ...room,
                              furniture: updatedFurniture,
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded px-2 py-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Height</label>
                        <input
                          type="text"
                          value={item.height}
                          onChange={(e) => {
                            const updatedFurniture = room.furniture.map((f) =>
                              f.id === item.id ? { ...f, height: e.target.value } : f
                            );
                            updateRoom(room.id, {
                              ...room,
                              furniture: updatedFurniture,
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded px-2 py-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Length</label>
                        <input
                          type="text"
                          value={item.length}
                          onChange={(e) => {
                            const updatedFurniture = room.furniture.map((f) =>
                              f.id === item.id ? { ...f, length: e.target.value } : f
                            );
                            updateRoom(room.id, {
                              ...room,
                              furniture: updatedFurniture,
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded px-2 py-1"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const updatedFurniture = room.furniture.filter(
                          (f) => f.id !== item.id
                        );
                        updateRoom(room.id, {
                          ...room,
                          furniture: updatedFurniture,
                        });
                      }}
                      className="absolute top-4 right-4 text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Enter item name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                />
                <button
                  onClick={() => handleAddItem(room.id)}
                  className="flex items-center text-[#1B365C] font-medium"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </button>
              </div>
            </div>
          ))}

          <Button
            onClick={() => setStep(2)}
            className="w-full bg-[#00A99D] hover:bg-[#008F84] text-white mt-6"
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryEdit;