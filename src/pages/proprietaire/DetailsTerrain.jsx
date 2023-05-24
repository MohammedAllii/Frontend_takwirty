import { FaCalendarAlt, FaDrum, FaEnvelope, FaFileAlt, FaLocationArrow, FaMoneyBillAlt, FaPhone, FaRegClock } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { getTerrains, reset } from '../../features/terrains/terrainSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'



import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DetailsTerrain() {
  const { id } = useParams();
  const [terrain, setTerrains] = useState([]);
  const [reservations, setReservations] = useState([]);
  const uri="http://192.168.1.9:5000";

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()

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

  // Calculate the max date (current date + 8 days)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 8);

  const [showModal, setShowModal] = useState(false);
  const [reservationToAccept, setReservationToAccept] = useState(null);


  // Function to handle accepting a reservation and show the modal
  const handleAcceptReservation = (reservation) => {
    // Perform the necessary logic to accept the reservation
    setReservationToAccept(reservation);

    // Show the modal
    setShowModal(true);
  };
  const reloadPage = () => {
    window.location.reload();
  };
  
  // Function to handle closing the modal
  const closeModal = () => {
    setShowModal(false);
  };
  const acceptReservation = async (reservationId) => {
    try {
      await axios.put(`${uri}/reservation/${reservationId}/accept`);
      console.log('Reservation accepted successfully');

      toast.success('Reservation accepted successfully');
      const timer = setTimeout(reloadPage, 2000); // 2000 milliseconds = 2 seconds

    // Clear the timeout if the component is unmounted or updated before the timeout expires
    return () => clearTimeout(timer);

      // Perform any necessary UI updates or actions after accepting the reservation
    } catch (error) {
      console.error('Error accepting reservation:', error);
      // Perform any necessary error handling
    }
  };


  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [reservationToDelete, setReservationToDelete] = useState(null);

// Function to handle rejecting a reservation and show the modal
const handleRejectReservation = (reservation) => {
  // Set the reservation to be deleted
  setReservationToDelete(reservation);
  // Show the modal
  setShowDeleteModal(true);
};

// Function to handle deleting the reservation
const deleteReservation = (id) => {
  axios.delete(`${uri}/reservation/${id}`)
    .then(response => {
      console.log('Reservation deleted successfully');
      toast.success('Reservation deleted successfully');
      const timer = setTimeout(reloadPage, 2000); // 2000 milliseconds = 2 seconds

    // Clear the timeout if the component is unmounted or updated before the timeout expires
    return () => clearTimeout(timer);

      // Perform any necessary actions after deleting the reservation
    })
    .catch(error => {
      console.error('Error deleting reservation:', error);
      // Perform any necessary error handling
    });
};

// Function to handle closing the modal
const closeDeleteModal = () => {
  setShowDeleteModal(false);
};


  const formatDateString = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const handleFilterReservations = () => {
    if (selectedDate) {
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user'));
      const idUser = user?._id;
      const formattedDate = selectedDate ? formatDateString(selectedDate) : null;

      axios
        .get(`${uri}/reservation/users/${idUser}/terrains/${id}/date/${formattedDate}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setReservations(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user'));
    const idUser = user?._id;
   

    axios
      .get(`${uri}/terrains/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTerrains(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${uri}/reservation/users/${idUser}/terrains/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);



  return (
    <section style={{ backgroundColor: '#F0F0F0', borderRadius: '15px' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="12">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>
                      <FaDrum /> Name of stadium :
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{ fontWeight: 'bold', fontSize: '20px' }}>
                      {terrain.nom}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>
                      <FaLocationArrow /> Location :
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{ fontWeight: 'bold', fontSize: '20px' }}>
                      {terrain.adresse}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>
                      <FaMoneyBillAlt /> Price :
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{ fontWeight: 'bold', fontSize: '20px' }}>
                      {terrain.prix} DT
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>
                      <FaFileAlt /> Description :
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{terrain.description}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBRow>
              <MDBCol md="12">
                <h1 className="animated-text" style={{ marginBottom: '1%' }}>
                  Les réservations
                </h1>
                <br />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}
                >
                  <div>
                    <h3>Filter By</h3>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        maxDate={maxDate}
                        dateFormat="dd-MM-yyyy"
                        placeholderText="Select a date"
                        style={{ width: '150px' }}
                      />
                      <button className="btn btn-primary" onClick={handleFilterReservations}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </MDBCol>
              <MDBCol md="12">
                {reservations.length === 0 ? (
                  <div>
                    <img
                      src={'https://cdn-icons-png.flaticon.com/512/6134/6134065.png'}
                      style={{ width: '250px', height: '250px' }}
                    />
                    <strong style={{ fontWeight: 'bold', fontSize: '40px' }}>
                      No Reservation found
                    </strong>
                  </div>
                ) : (
                  <div>
                    {reservations.map((reservation) => (
                      <MDBRow className="bordure" key={reservation?._id}>
                      <MDBCol md="3">
                        <h4>{reservation?.user?.name}</h4>
                        <p className="text-truncate mb-4 mb-md-0">
                          <FaEnvelope /> {reservation?.user?.email}
                        </p>
                        <p className="text-truncate mb-4 mb-md-0">
                          <FaPhone /> {reservation?.user?.phone}
                        </p>
                      </MDBCol>
                        <MDBCol md="9" lg="9" className="border-sm-start-none border-start">
                          <div className="d-flex flex-row align-items-center mb-1">
                            <h4 className="mb-1 me-1" style={{ marginLeft: '325px' }}>
                              <FaRegClock /> {reservation.heure} :00
                            </h4>
                          </div>
                          <h6 className="text-success">
  <FaCalendarAlt />{' '}
  <span style={{ marginRight: '10px' }}>{reservation.date}</span>
  {reservation.etat === 0 ? (
    <MDBBadge color="warning" pill>
      en attente
    </MDBBadge>
  ) : terrain.etat === 1 ? (
    <MDBBadge color="success" pill>
      Approuvé
    </MDBBadge>
  ) : (
    <MDBBadge color="danger" pill>
      réfuser
    </MDBBadge>
  )}
</h6>

                          <div className="d-flex flex-column mt-4">
                            <button
                              className="btn btn-success"
                              size="lg"
                              onClick={handleAcceptReservation}
                            >
                              Accepter
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              size="md"
                              onClick={() => handleRejectReservation(reservation)}
                            >
                              Rejecter
                            </button>
                          </div>
                          <MDBModal isOpen={showModal} toggle={closeModal}>
                            <MDBModalHeader toggle={closeModal}>Confirmation</MDBModalHeader>
                            <MDBModalBody>
                              <p>Are you sure you want to accept this reservation?</p>
                              {/* Additional content or message can be added here */}
                            </MDBModalBody>
                            <MDBModalFooter>
                              <button
                                className="btn btn-success"
                                size="md"
                                onClick={() => acceptReservation(reservation?._id)}
                              >
                                Accept
                              </button>
                              <button className="btn btn-danger" onClick={closeModal}>
                                No
                              </button>
                            </MDBModalFooter>
                          </MDBModal>

                          <MDBModal isOpen={showDeleteModal} toggle={closeDeleteModal}>
                            <MDBModalHeader toggle={closeDeleteModal}>Confirmation</MDBModalHeader>
                            <MDBModalBody>
                              <p>Are you sure you want to delete the reservation?</p>
                              {/* Additional content or message can be added here */}
                            </MDBModalBody>
                            <MDBModalFooter>
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteReservation(reservation?._id)}
                              >
                                Delete
                              </button>
                              <button className="btn btn-secondary" onClick={closeDeleteModal}>
                                Cancel
                              </button>
                            </MDBModalFooter>
                          </MDBModal>
                        </MDBCol>
                      </MDBRow>
                    ))}
                  </div>
                )}
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}