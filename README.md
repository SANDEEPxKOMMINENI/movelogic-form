# MoveLogic AI - Multi-Step Form

A React-based multi-step form application for managing moving inventory, built with modern web technologies.

## 🚀 Live Demo

[Add your demo link here]

## 🎥 Demo Video

[Add your Loom video link here]

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