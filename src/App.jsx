import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AddEdit from './pages/AddEdit'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add' element={<AddEdit/>} />
        <Route path='/:id/edit' element={<AddEdit/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
