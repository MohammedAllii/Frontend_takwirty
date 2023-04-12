import { FaPlus, FaSignInAlt, FaSignOutAlt, FaUser, FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import 'bootstrap/dist/css/bootstrap.min.css';


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
      <div style={{marginTop:'-5px'}}><img src={"./logo.png"} className='foot'/></div>
      </div>
      <ul>
        {user ? (
          <>
          <li>
          <a href='/profile' class="btn btn-outline" style={{fontFamily:'Brush Script MT',fontSize:'35px'}}><FaUserCircle /> {user && user.name}</a>
          </li>
          <li>
          <a href='/add' class="btn btn-outline-primary" style={{fontFamily:'bold',fontSize:'20px'}}><FaPlus /> Add Stadium</a>
        </li>
          <li>

          <button onClick={onLogout} class="btn btn-outline-danger" style={{fontFamily:'bold',fontSize:'20px'}}><FaSignOutAlt /> Logout</button>
          </li>
        </>
        ) : (
          <>
            <li>
            <a href='/login' class="btn btn-outline-primary" style={{fontFamily:'bold',fontSize:'20px'}}><FaSignInAlt /> Sign In</a>
            </li>
            <li>
            <a href='/register' class="btn btn-outline-dark" style={{fontFamily:'bold',fontSize:'20px'}}  ><FaUser /> Sign Up</a>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
