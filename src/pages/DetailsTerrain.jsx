import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBIcon } from 'mdb-react-ui-kit';

import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { FaCalendarAlt, FaClock, FaDrum, FaEnvelope, FaFileAlt, FaLocationArrow, FaMoneyBill, FaMoneyBillAlt, FaPhone, FaRegClock } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



export default function DetailsTerrain() {
    const { id } = useParams();
    const [terrain, setTerrains] = useState([]);
    const [reservations, setReservations] = useState([]);

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    const handleFilterReservations = () => {
      if (selectedDate) {
        const formattedDate = selectedDate.toLocaleDateString('en-GB');
        axios
          .get(`http://192.168.1.9:5000/reservation/search?date=${formattedDate}`)
          .then((response) => {
            // Handle the response data
            console.log(response.data);
          })
          .catch((error) => {
            // Handle the error
            console.log(error);
          });
      }
    };


    useEffect(() => {
      const token = localStorage.getItem('authToken');
  
      axios
        .get(`http://192.168.1.9:5000/terrains/${id}`, {
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

        axios
        .get(`http://192.168.1.9:5000/reservation/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setReservations(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    });

    



    return (
      <section style={{ backgroundColor: '#C8D6A2' }}>
<MDBContainer className="py-5" >
  
          <MDBRow>
            <MDBCol lg="12">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                <MDBCardImage
                      src="https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2022/09/28/3464996-1298466662.jpg?itok=Ubr1BOdu"
                      fluid
                      style={{width:'650px',height:'250px',borderRadius:'20px',border:'3px solid'}}
                    />                </MDBCardBody>
              </MDBCard>
  
            </MDBCol>
            <MDBCol lg="12">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText><FaDrum /> Nom du terrain : </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText style={{ fontFamily: 'bold',fontSize:'20px'}}>{terrain.nom}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText><FaLocationArrow /> Adresse du terrain :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText style={{ fontFamily: 'bold',fontSize:'20px'}}>{terrain.adresse}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText><FaMoneyBillAlt /> Prix du terrain :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText style={{ fontFamily: 'bold',fontSize:'20px'}}>{terrain.prix} DT</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText><FaFileAlt /> Description :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{terrain.description}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
          
                </MDBCardBody>
              </MDBCard>  
              <MDBRow>
              <MDBCol md="12">
                <h1 className='animated-text' style={{ marginBottom: '1%' }}>Les réservations </h1><br />
                <div style={{ display: 'flex', alignItems: 'center',marginLeft: '450px',marginBottom:'20px' }}>
                <div>
                  <strong> <h3>Filter By </h3></strong>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select a date"
                    style={{ width: '150px', marginLeft: '20px' }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleFilterReservations}
                    style={{ marginRight: '10px',marginTop:'5px' }}
                  >
                    Submit
                  </button>
                </div>
              </div>

              </MDBCol>
              <MDBCol md="12">
              {reservations.length === 0 ? (
                
  <div>
    <img src={"https://cdn-icons-png.flaticon.com/512/6134/6134065.png"} style={{ width: '250px',height:'250px' }}/>
    <strong style={{ fontWeight: 'bold', fontSize: '40px' }}>No Reservation found Today</strong>
  </div>
) : (
  <div>
    
    {reservations.map(reservation => (
      <MDBRow className='bordure' key={reservation._id}>
        <MDBCol md="6">
          <h4>{reservation.user.name}</h4>
          <p className="text-truncate mb-4 mb-md-0">
            <FaEnvelope/> {reservation.user.email}
          </p>
          <p className="text-truncate mb-4 mb-md-0">
            <FaPhone /> {reservation.user.phone}
          </p>
        </MDBCol>
        <MDBCol md="6" lg="6" className="border-sm-start-none border-start">
          <div className="d-flex flex-row align-items-center mb-1">
            <h4 className="mb-1 me-1" style={{ marginLeft: '215px' }}>
              <FaRegClock /> {reservation.heure} :00
            </h4>
          </div>
          <h6 className="text-success">
            <FaCalendarAlt /> {reservation.date}
          </h6>
          <div className="d-flex flex-column mt-4">
            <button className='btn btn-success' size='md'>Accepter</button>
            <button className='btn btn-outline-danger' size='md'>Rejecter</button>
          </div>
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