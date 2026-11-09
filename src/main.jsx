import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../plataforma_cinepublica.jsx' // ou ./App.jsx caso tenha mudado o nome
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)