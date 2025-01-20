import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import AuthProvider from "./features/shared/AuthProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/*" element={<App />} />
              </Routes>
              <Toaster position="top-center" />
          </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>,
)
