  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import 'reactjs-popup/dist/index.css';
  import { FaEye, FaMap, FaMapMarked, FaMapMarkedAlt, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
  import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
  import { Link } from 'react-router-dom';
  import { useDispatch } from 'react-redux'
  import { useNavigate } from 'react-router-dom'
  import { useSelector } from 'react-redux'
  import { getTerrains, reset } from '../../features/terrains/terrainSlice'




function Reservation() {
    const [terrains, setTerrains] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const uri="http://192.168.1.9:5000";

    const { user } = useSelector((state) => state.auth)
    const { isError, message } = useSelector(
      (state) => state.terrains
    )
  
    useEffect(() => {
      if (isError) {
        console.log(message)
      }
  
      if (!user) {
        navigate('/login')
      }
  
      dispatch(getTerrains())
  
      return () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, message, dispatch])
  
  
    useEffect(() => {
      const token = localStorage.getItem('authToken');
  
      axios
        .get(`${uri}/terrains`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setTerrains(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  

  return (
    <div>
          
          <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name of stadium</th>
          <th scope='col'>Status</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {terrains.map(terrain => (
  <tr key={terrain._id}>
    <td>
      <div className='d-flex align-items-center'>
        <img
          src={`${uri}/uploads/${terrain.image}`}
          alt=''
          style={{ width: '45px', height: '45px' }}
          className='rounded-circle'
        />
        <div className='ms-2' >
          <p className='fw-bold mb-3' >{terrain.nom}</p>
          </div>
          <div className='ms-3'>
          <p className='fw-bold mb-0' style={{ fontFamily: 'bold',fontSize:'20px',color:'#359DFF'}}><FaMapMarkedAlt />  {terrain.adresse}</p>
        </div>
      </div>
    </td>
    <td>
    {terrain.etat === 0 ? (
  <MDBBadge color='warning' pill>
    en attente
  </MDBBadge>
) : terrain.etat === 1 ? (
  <MDBBadge color='success' pill>
    Approuvé
  </MDBBadge>
) : (
  <MDBBadge color='danger' pill>
    réfuser
  </MDBBadge>
)}

    </td>

    <td>
    <Link to={`/details/${terrain._id}`}>
        <FaEye style={{fontSize:'30px'}}/>
    </Link>
    </td>
  </tr>
))}

        </MDBTableBody>
        </MDBTable> 
</div>
  )
}

export default Reservation
