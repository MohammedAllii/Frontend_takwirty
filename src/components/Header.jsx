import { FaPlus, FaSignInAlt, FaSignOutAlt, FaUser, FaUserCircle, FaBell, FaTicketAlt, FaCartPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';




function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    localStorage.setItem('authToken', null); // Set the authToken to null
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };
  
  
  const id = JSON.parse(localStorage.getItem('user'))?._id;
  const token = localStorage.getItem('authToken');
    

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
            <Link to="/reservation" style={{
                textDecoration: 'none'}}>
            <button
              style={{
                marginLeft: '0em',
                borderRadius: '9999px',
                backgroundColor: '#04BFAD',
                color: 'white',
                fontWeight: 'bold',
                padding: '10px 20px',
                border: 'none',
                textDecoration: 'none',
              }}
            >
              <span style={{ marginRight: '5px' }}><FaTicketAlt />  Réservation</span>
              <i className="mdi mdi-ticket-alt" style={{ color: 'white' }}></i>
            </button>
          </Link>
          </li>
            <li>
            <Link to="/add" style={{
                textDecoration: 'none'}}>
            <button
              style={{
                marginLeft: '0em',
                borderRadius: '9999px',
                backgroundColor: 'grey',
                color: 'white',
                fontWeight: 'bold',
                padding: '10px 20px',
                border: 'none',
                textDecoration: 'none',
              }}
            >
              <span style={{ marginRight: '5px' }}><FaPlus />  Add Stadium</span>
              <i className="mdi mdi-login" style={{ color: 'white' }}></i>
            </button>
          </Link>
            </li>
            
            <li>
              <Link to="/add" style={{
                textDecoration: 'none'}}>
            <button
              style={{
                marginLeft: '0em',
                borderRadius: '9999px',
                backgroundColor: 'red',
                color: 'white',
                fontWeight: 'bold',
                padding: '10px 20px',
                border: 'none',
                textDecoration: 'none',
              }}
              onClick={onLogout}
            >
              <span style={{ marginRight: '5px' }}><FaSignInAlt />  Logout</span>
              <i className="mdi mdi-login" style={{ color: 'white' }}></i>
            </button>
          </Link>
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