import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import TerrainForm from './components/TerrainForm'
import Details from './pages/DetailsTerrain'
import Reservation from './pages/Reservation'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/add' element={<TerrainForm />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/reservation' element={<Reservation />} />
            <Route path='/details/:id' element={<Details />} />
          </Routes>
          <br />
          <hr />
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
