import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import { deleteTerrain } from '../features/terrains/terrainSlice'
import { FaEdit, FaTrash } from 'react-icons/fa';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMapMarkerAlt, faMoneyBill, faFileText, faDrum } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const dispatch = useDispatch()
  const [terrains, setTerrains] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('authToken');

    axios
      .get('http://192.168.1.6:5000/terrains', {
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
    .put(`http://192.168.1.6:5000/terrains/${terrain._id}`, newTerrainInfo, {
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
    {terrains.map(terrain => (
    <MDBCard style={{ maxWidth: '599x',marginLeft:'110px',marginTop:'45px' }}>
      <MDBRow className='g-0'>
        <MDBCol md='4'>
          <MDBCardImage src={terrain.image} width="950px" alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle><FontAwesomeIcon icon={faDrum} /> {terrain.nom}</MDBCardTitle>
            <MDBCardText style={{ fontFamily: 'bold',fontSize:'20px',marginLeft: -550}}>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {terrain.adresse}
            </MDBCardText>
            <MDBCardText>
            <FontAwesomeIcon icon={faFileText} /> <div className='spoiler'>{terrain.description}</div>
            </MDBCardText>
            <MDBCardText style={{ fontFamily: 'bold',fontSize:'20px',marginLeft: -500}}>
            <FontAwesomeIcon icon={faMoneyBill} />  {terrain.prix} Dt
            </MDBCardText>
            <div style={{ display: 'flex' }}>
              <button type="button" className="btn btn-success" style={{ marginLeft: 450 }} onClick={() => setShowModal(true)}>
                <FaEdit />Edit
              </button>  
              <button type="button" className="btn btn-warning" style={{ marginLeft: 4 }} onClick={() => setShowModal2(true)}>
                <FaTrash />Delete
              </button> 
            </div>
   
            <MDBCardText>
            
{showModal && (
  <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-modal="true" style={{ display: "block" }}>
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">Edit Terrain Information</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div>
                <form onSubmit={event => handleEditSubmit(event, terrain)}>
                        <div className='form-group'>
                          <label>Nom du Terrain</label>
                          <input type='text' name='nom' defaultValue={terrain.nom} />
                        </div>
                        <div className='form-group'>
                          <label>Adresse</label>
                          <input type='text' name='adresse' defaultValue={terrain.adresse} />
                        </div>
                        <div className='form-group'>
                          <label>Prix</label>
                          <input type='number' name='prix' defaultValue={terrain.prix} />
                        </div>
                        <div className='form-group'>
                          <label>Description</label>
                          <input type='text' name='description' defaultValue={terrain.description} />
                        </div>
                        <div className='form-group'>
                          <label>Image du terrain</label>

                          <input
                            type='file'
                            name='image'
                            id='image'
                          />
                        </div>  
          
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                    <button type='submit' className="btn btn-success">Save Changes</button>
                  </div>  
                  
                </form>      
          </div>
          </div>
        
      </div>
      
    </div>
    
  </div>
  
  
)}

{showModal2 && (
  <div className="modal fade show" tabIndex="-1" role="dialog2" aria-labelledby="exampleModalCenterTitle2" aria-modal="true" style={{ display: "block" }}>
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">Are you sure to delete?</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal2(false)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal2(false)}>Close</button>
          <button onClick={() => dispatch(deleteTerrain(terrain._id))} type="button" className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
)}

            </MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
      
    </MDBCard>
    
          ))}
          
          
</div>

  );
}