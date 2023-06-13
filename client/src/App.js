import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Signin from './Pages/Auth/Signin'
import Signup from './Pages/Auth/Signup'
import Products from './Pages/Products'
import Error404 from './Pages/Error404'
import Container from './Components/Container'
import ProductDetail from './Pages/ProductDetail'
import Cart from './Pages/Cart'
import Favorites from './Pages/Favorites'
import ProtectedRoute from './Pages/ProtectedRoute';
import {AuthProvider} from './Context/AuthContext'

// ...

function App() {
  return (
    <div className="container mx-auto bg-slate-700">
      <AuthProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route exact path="/" element={<ProtectedRoute path="/" element={<Products />} />} />
            <Route exact path="/:category_id" element={<ProtectedRoute path="/:category_id" element={<Products />} />} />
            <Route exact path="/product/:product_id" element={<ProtectedRoute path="/product/:product_id" element={<ProductDetail />} />} />
            <Route exact path="/cart" element={<ProtectedRoute path="/cart" element={<Cart />} />} />
            <Route exact path="/favorites" element={<ProtectedRoute path="/favorites" element={<Favorites />} />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="*" element={<Error404 />} />
          </Routes>
        </Container>
      </AuthProvider>
    </div>
  );
}

export default App;

