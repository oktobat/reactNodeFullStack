import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define : {
    'import.meta.env.VITE_API_URL' : JSON.stringify('http://localhost:8001'),
    
    'import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID': JSON.stringify('121372881908-r7cmghf3sbbu249ebqphgj3i9gd31h7i.apps.googleusercontent.com'),
    'import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI': JSON.stringify('http://localhost:5173/callback'),

    'import.meta.env.VITE_KAKAO_AUTH_CLIENT_ID': JSON.stringify('8cf399efc95799a5fce532ddd8fb5005'),
    'import.meta.env.VITE_KAKAO_AUTH_REDIRECT_URI': JSON.stringify('http://localhost:5173/oauth'),

    'import.meta.env.VITE_NAVER_AUTH_CLIENT_ID': JSON.stringify('xDqLWcIhSVLvu70KqeoG'),
    'import.meta.env.VITE_NAVER_AUTH_REDIRECT_URI': JSON.stringify('http://localhost:5173/oauth')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
