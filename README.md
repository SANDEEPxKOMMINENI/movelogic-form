# MoveLogic AI - Multi-Step Form

A React-based multi-step form application for managing moving inventory, built with modern web technologies.

## 🚀 Live Demo

[[LINK ](https://movelogic-ai-form.netlify.app/)]

##   ( EXACT REPLICA AS GIVEN TO ME IN PDF): Demo Pictures:

![WhatsApp Image 2025-02-25 at 09 27 09_afd63de9](https://github.com/user-attachments/assets/b0c54cfa-e8e2-4f56-81f9-1f80d4ae47a5)
![WhatsApp Image 2025-02-25 at 09 28 02_f7a43f9c](https://github.com/user-attachments/assets/06e0dce3-4516-465f-aaa3-83dcd0ce2798)
![WhatsApp Image 2025-02-25 at 09 29 52_216bfd7f](https://github.com/user-attachments/assets/b232fa56-8172-4161-abd6-9d5fc7d9f7d5)
![WhatsApp Image 2025-02-25 at 09 30 16_9c03a738](https://github.com/user-attachments/assets/b70f2fdf-938f-4116-9da2-1578ea74d6d5)
![WhatsApp Image 2025-02-25 at 09 30 53_e8985080](https://github.com/user-attachments/assets/c54abe60-dff8-4956-8997-6a0d5a06064f)
![WhatsApp Image 2025-02-25 at 09 31 14_56249f8e](https://github.com/user-attachments/assets/3a0c2d1d-8d9f-418e-a8bf-1e72cb43dfcb)
![WhatsApp Image 2025-02-25 at 09 32 24_db894891](https://github.com/user-attachments/assets/9804a9b7-b463-411c-89e6-9d62f7ce8df5)
![WhatsApp Image 2025-02-25 at 09 38 29_7edc0b17](https://github.com/user-attachments/assets/ff289273-79e4-42bd-b871-e78cb808b934)
09 31 57_6e9be07e](https://github.com/user-attachments/assets/7876c66d-3a93-4fc4-811f-b7748b1f3a2d)


## 🎥 Demo Video

Will be added soon


## 🛠 Tech Stack

- **Frontend**: React with TypeScript
- **UI**: Tailwind CSS
- **State Management**: Zustand
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage

## ✨ Features

- Multi-step form with validation
- User authentication
- Real-time inventory management
- Image upload for rooms
- Responsive design
- Persistent data storage

## 🏗 Project Structure

```
src/
├── components/         # React components
│   ├── AddressForm/   # Address input step
│   ├── InventoryReview/# Inventory review step
│   ├── InventoryEdit/ # Inventory editing
│   └── ui/            # Reusable UI components
├── lib/               # Utility functions and configs
├── store/             # Zustand state management
└── assets/           # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Environment Setup

1. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/SANDEEPxKOMMINENI/movelogic-form.git
cd movelogic-form
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## 📝 Database Schema

### Tables

1. **moves**
   - id (uuid, primary key)
   - user_id (uuid, references auth.users)
   - address (text)
   - floor (integer)
   - has_elevator (boolean)
   - apartment_size (numeric)

2. **rooms**
   - id (uuid, primary key)
   - move_id (uuid, references moves)
   - name (text)
   - image_url (text)

3. **furniture**
   - id (uuid, primary key)
   - room_id (uuid, references rooms)
   - name (text)
   - quantity (integer)

## 🔒 Security Features

- Row Level Security (RLS) policies
- User authentication
- Secure file uploads
- Protected API endpoints

## 📱 Features by Page

### 1. Apartment Address Page
- Address input with validation
- Floor selection
- Stairs/Elevator toggle
- Apartment size input
- Form validation

### 2. Inventory Details Review
- Room overview
- Furniture listing
- Image upload capability
- Quick edit access

### 3. Inventory Edit
- Room details modification
- Furniture management
- Image management
- Real-time updates

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
