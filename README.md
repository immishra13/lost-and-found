# TraceIt | Lost & Found Platform 🔍

TraceIt is a modern, community-driven "Lost and Found" platform designed to help people recover their missing belongings through a seamless, real-time marketplace interface.

![TraceIt Preview](https://via.placeholder.com/1200x600?text=TraceIt+Lost+and+Found+Platform)

## ✨ Features

- **Real-time Marketplace**: View and report lost/found items instantly.
- **Categorized Search**: Filter items by category (Electronics, Pets, Documents, etc.).
- **User Authentication**: Secure login and profile management via Firebase.
- **Item Management**: Detailed item listings with images, descriptions, and contact info.
- **Responsive Design**: Premium UI optimized for both desktop and mobile.
- **Instant Notifications**: Real-time updates on new listings.

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, Framer Motion (Animations)
- **Icons**: Lucide React
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Styling**: Vanilla CSS (Modern Design System)
- **Deployment**: Vercel

## 🛠️ Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/immishra13/lost-and-found.git
   cd lost-and-found
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📦 Deployment on Vercel

- Connect your GitHub repository to Vercel.
- The build command should be `npm run build`.
- The output directory should be `dist`.
- **Important**: Add the environment variables listed above in the Vercel project settings.

## 📄 License

MIT License - feel free to use and contribute!
