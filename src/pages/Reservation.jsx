  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import 'reactjs-popup/dist/index.css';
  import { FaEye, FaMap, FaMapMarked, FaMapMarkedAlt, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
  import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
  import { Link } from 'react-router-dom';





function Reservation() {
    const [terrains, setTerrains] = useState([]);

  
  
    useEffect(() => {
      const token = localStorage.getItem('authToken');
  
      axios
        .get('http://192.168.1.9:5000/terrains', {
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
  
  const handleEditSubmit = (event, terrain) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    const formData = new FormData(event.target);
    const newTerrainInfo = {
      nom: formData.get('nom'),
      adresse: formData.get('adresse'),
      prix: formData.get('prix'),
      description: formData.get('description'),
    };
  
    // Add code to handle image upload
    const imageFile = formData.get('image');
    if (imageFile) {
      newTerrainInfo.image = imageFile;
    }
  
    axios
      .put(`http://192.168.1.9:5000/terrains/${terrain._id}`, newTerrainInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        setTerrains(prevTerrains =>
          prevTerrains.map(prevTerrain =>
            prevTerrain._id === terrain._id ? response.data : prevTerrain,
          ),
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

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
          src={`http://localhost:3000/${terrain.image}`}
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
        <MDBBadge color='success' pill>
        Approuvé
        </MDBBadge>
    ) : (
        <MDBBadge color='danger' pill>
        Rejeter
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
