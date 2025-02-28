import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

{/* Main Router */}
import Home from './pages/Home/Home'
import Learn from './pages/Learn/Learn'
import Product from './pages/Product/Product'
import Service from './pages/Service/Service'
import AbouUs from './pages/About Us/About'
import Join from './pages/Join/Join'

{/* Oauth Import */}
import Login from './pages/Login/Login'
import Signup from './pages/SignUp/Signup'

import ProductDetail from './pages/ProductDetail/ProductDetail'

const App = () => {
  return (
    <>
      <Router>
        <Routes>

          {/* Main Router */}
          <Route path='/' element= {<Home />}/>
          <Route path='/learn' element= {<Learn />}/>
          <Route path='/product' element= {<Product />}/>
          <Route path='/service' element= {<Service />}/>
          <Route path='/aboutus' element= {<AbouUs />}/>
          <Route path='/join' element= {<Join />}/>

          {/* Oauth Import */}
          <Route path='/login' element= {<Login />}/>
          <Route path='/signup' element= {<Signup />}/>

          <Route path='/productdetail' element= {<ProductDetail />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
