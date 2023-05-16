import { FaPlus, FaSignInAlt, FaSignOutAlt, FaUser, FaUserCircle, FaBell, FaTicketAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';



function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };
  
  const id = JSON.parse(localStorage.getItem('user'))?._id;
  const token = localStorage.getItem('authToken');
  
    const [count, setCount] = useState(0);
  
      async function fetchCount() {
        const response = await axios.get(`http://192.168.1.9:5000/reservation/count/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCount(response.data.count);
        console.log(response.data.count);
      }
      fetchCount();
    

  return (
    <header className='header'>
      <div className='logo'>
      <a href='/' style={{textDecoration:'none'}}>
        <div style={{marginTop:'-5px'}}><img src={"./logo.png"} className='foot'/></div>
        </a>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <a href='/profile' class="btn btn-outline" style={{fontFamily:'Brush Script MT',fontSize:'35px'}}>
                <FaUserCircle /> {user && user.name}
              </a>
            </li>
            <li>
              
            </li>
            <li>
              <div className="notification">
              <a href='/reservation' style={{textDecoration:'none',fontFamily:'bold',fontSize:'18px'}}>Reservation
                <FaBell style={{fontSize:'30px'}}/>
                <span className="count">{count}</span>
                </a>
              </div>
            </li>
            <li>
              <a href='/add' style={{textDecoration:'none'}}><button  class="btn btn-outline-primary" style={{fontFamily:'bold',fontSize:'18px'}}>
                <FaPlus /> Add Stadium
              </button>
              </a>
            </li>
            
            <li>
              <button onClick={onLogout} class="btn btn-outline-danger" style={{fontFamily:'bold',fontSize:'18px'}}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href='/login' class="btn btn-outline-primary" style={{fontFamily:'bold',fontSize:'20px'}}>
                <FaSignInAlt /> Sign In
              </a>
            </li>
            <li>
              <a href='/register' class="btn btn-outline-dark" style={{fontFamily:'bold',fontSize:'20px'}}>
                <FaUser /> Sign Up
              </a>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
