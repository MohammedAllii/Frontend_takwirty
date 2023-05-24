import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteTerrain } from '../features/terrains/terrainSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMoneyBill, faFileText, faDrum } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const dispatch = useDispatch();
  const [terrains, setTerrains] = useState([]);
  const [showModal, setShowModal] = useState([]);
  const [showModal2, setShowModal2] = useState([]);
  const uri="http://192.168.1.9:5000";


  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { isError, message } = useSelector(
    (state) => state.terrains
  )

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    } else if (user.role !== 3) {
      navigate('/user');
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    axios
      .get(`${uri}/terrains`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTerrains(response.data);
        setShowModal(new Array(response.data.length).fill(false));
        setShowModal2(false);
      
      })
      .catch((error) => {
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
      .put(`${uri}/terrains/${terrain._id}`, newTerrainInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setTerrains((prevTerrains) =>
          prevTerrains.map((prevTerrain) => (prevTerrain._id === terrain._id ? response.data : prevTerrain)),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    
    <div>
      {terrains.map((terrain, index) => (
        <MDBCard key={terrain._id} style={{ maxWidth: '599x', marginLeft: '110px', marginTop: '45px', borderRadius: '15px' }}>
          <MDBRow className='g-0'>
            <MDBCol>
            <MDBCardImage
              src={`${uri}/uploads/${terrain.image}`}
              style={{ width: '100%', height: '100%', borderRadius: '15px' }}
              alt='...'
            />
            </MDBCol>
            <MDBCol md='8'>
              <MDBCardBody>
                <MDBCardTitle>
                  <FontAwesomeIcon icon={faDrum} /> {terrain.nom}
                </MDBCardTitle>
                <MDBCardText>
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    style={{ fontFamily: 'bold', fontSize: '20px', marginLeft: -495 }}
                  />{' '}
                  {terrain.prix} Dt
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    style={{ fontFamily: 'bold', fontSize: '20px', marginLeft: -175, color: 'green' }}
                  />{' '}
                  {terrain.adresse}
                </MDBCardText>
                <MDBCardText>
                  <FontAwesomeIcon icon={faFileText} />{' '}
                  <div className='spoiler'>{terrain.description.substring(0, 100)} ...</div>
                </MDBCardText>
                <div style={{ display: 'flex' }}>
                  <button
                    type='button'
                    className='btn btn-success'
                    style={{ marginLeft: 540 }}
                    onClick={() => {
                      const updatedShowModal = [...showModal];
                      updatedShowModal[index] = true;
                      setShowModal(updatedShowModal);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type='button'
                    className='btn btn-warning'
                    style={{ marginLeft: 4 }}
                    onClick={() => setShowModal2(true)}
                  >
                    <FaTrash />
                  </button>
                  {showModal[index] && (
                    <div
                      className='modal fade show'
                      tabIndex='-1'
                      role='dialog'
                      aria-labelledby='exampleModalCenterTitle'
                      aria-modal='true'
                      style={{ display: 'block' }}
                    >
                      <div className='modal-dialog modal-dialog-centered' role='document'>
                        <div className='modal-content'>
                          <div className='modal-header'>
                            <h5 className='modal-title' id='exampleModalLongTitle'>
                              Edit Terrain Information
                            </h5>
                            <button
                              type='button'
                              className='close'
                              data-dismiss='modal'
                              aria-label='Close'
                              onClick={() => {
                                const updatedShowModal = [...showModal];
                                updatedShowModal[index] = false;
                                setShowModal(updatedShowModal);
                              }}
                            >
                              <span aria-hidden='true'>&times;</span>
                            </button>
                          </div>
                          <div className='modal-body'>
                            <div>
                              <form onSubmit={(event) => handleEditSubmit(event, terrain)}>
                                <div className='form-group'>
                                  <label>Nom du Terrain</label>
                                  <input type='text' name='nom' defaultValue={terrain.nom} />
                                </div>
                                <div className='form-group'>
                                  <label>Adresse</label>
                                  <input type='text' name='adresse' defaultValue={terrain.adresse} />
                                </div>
                                <div className='form-group'>
                                  <label>Prix </label>
                                  <input type='number' name='prix' defaultValue={terrain.prix} />
                                </div>
                                <div className='form-group'>
                                  <label>Description</label>
                                  <input type='text' name='description' defaultValue={terrain.description} />
                                </div>
                                <div className='form-group'>
                                  <label>Image du terrain</label>

                                  <input type='file' name='image' id='image' />
                                </div>

                                <div className='modal-footer'>
                                  <button
                                    type='button'
                                    className='btn btn-secondary'
                                    data-dismiss='modal'
                                    onClick={() => {
                                      const updatedShowModal = [...showModal];
                                      updatedShowModal[index] = false;
                                      setShowModal(updatedShowModal);
                                    }}
                                  >
                                    Close
                                  </button>
                                  <button type='submit' className='btn btn-success'>
                                    Save Changes
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <MDBCardText>
                  {showModal2 && (
                    <div
                      className='modal fade show'
                      tabIndex='-1'
                      role='dialog2'
                      aria-labelledby='exampleModalCenterTitle2'
                      aria-modal='true'
                      style={{ display: 'block' }}
                    >
                      <div className='modal-dialog modal-dialog-centered' role='document'>
                        <div className='modal-content'>
                          <div className='modal-header'>
                            <h5 className='modal-title' id='exampleModalLongTitle'>
                              Are you sure to delete?
                            </h5>
                            <button
                              type='button'
                              className='close'
                              data-dismiss='modal'
                              aria-label='Close'
                              onClick={() => setShowModal2(false)}
                            >
                              <span aria-hidden='true'>&times;</span>
                            </button>
                          </div>
                          <div className='modal-body'></div>
                          <div className='modal-footer'>
                            <button
                              type='button'
                              className='btn btn-secondary'
                              data-dismiss='modal'
                              onClick={() => setShowModal2(false)}
                            >
                              Close
                            </button>
                            <button
                              onClick={() => dispatch(deleteTerrain(terrain._id))}
                              type='button'
                              className='btn btn-danger'
                            >
                              Delete
                            </button>
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
