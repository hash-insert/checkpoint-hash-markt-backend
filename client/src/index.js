import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './Context/AuthContext'
import { ProductProvider } from './Context/ProductContext'
import { CartProvider } from './Context/CartContext'
import { FavoriteProvider } from './Context/FavoriteContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <FavoriteProvider>
              <App />
          </FavoriteProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)