import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId='959980577435-5gbhcm2r0na7itnvfe4rt0rl0pa1lcqj.apps.googleusercontent.com'>
   <BrowserRouter>
   <App />
   </BrowserRouter>

</GoogleOAuthProvider>

  
)
