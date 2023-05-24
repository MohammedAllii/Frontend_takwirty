import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";
import { faDrum, faSignOut,faHome, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';



const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    localStorage.setItem('authToken', null); // Set the authToken to null
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };
 
  
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span><img src={"./logo.png"} style={{width:'170px'}}/> </span>
        </Link>
      </div>
     
      <div className="center">
        <ul>
          <p className="title"><FontAwesomeIcon icon={faHome} /> MAIN</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
          <li style={{ textDecoration: "none",fontSize:'20px' }}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          
          </Link>
          <p className="title"><FontAwesomeIcon icon={faList} /> LISTS</p>
          <Link to="/user" style={{ textDecoration: "none" }}>
            <li style={{ textDecoration: "none",fontSize:'20px' }}>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <hr />
          <Link to="/prop" style={{ textDecoration: "none" }}>
            <li style={{ textDecoration: "none",fontSize:'20px' }}>
              <StoreIcon className="icon" />
              <span>Propriétaire</span>
            </li>
          </Link>  
          <hr />
          <Link to="/terrain" style={{ textDecoration: "none" }}>
            <li style={{ textDecoration: "none",fontSize:'20px' }}>
              <FontAwesomeIcon icon={faDrum} />
              <span>Terrains</span>
            </li>
          </Link> 
          <hr />
          <Link onClick={onLogout} style={{ textDecoration: "none" }}>
            <li style={{ textDecoration: "none",fontSize:'20px' }}>
              <FontAwesomeIcon icon={faSignOut} />
              <span>Logout</span>
            </li>
          </Link>    
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;
