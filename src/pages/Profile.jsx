import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux'
import React, { useState } from 'react';
import { FaEdit, FaPhone, FaEnvelope} from 'react-icons/fa'
import axios from 'axios';



export default function PersonalProfile() {
    const { user } = useSelector((state) => state.auth)
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState([]);



    const handleEditSubmit = (event, user) => {
      event.preventDefault();
      const token = localStorage.getItem('authToken');
      const formData = new FormData(event.target);
      const newUserInfo = {
        name: formData.get('name'),
        last_name: formData.get('last_name'),
        phone: formData.get('phone'),
        password: formData.get('password'),
      };

    
      axios
        .put(`http://192.168.1.9:5000/users/${user._id}`, newUserInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          setUsers(prevUsers =>
            prevUsers.map(prevUser =>
              prevUser._id === user._id ? response.data : prevUser,
            ),
          );
        })
        .catch(error => {
          console.log(error);
        });
    };

  return (
    <section className="vh-300">
      <MDBContainer className="py-8 h-200">
        <MDBRow className="justify-content-center align-items-center h-200">
          <MDBCol lg="12" className="mb-6 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem', height:'700%' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="./terrain.png"
                    alt="Avatar" className="my-5" style={{ width: '300px' }} fluid />
                  <MDBTypography tag="h5">{user.name}</MDBTypography>
                  <MDBCardText>Role</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
            

                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Name</MDBTypography>
                        <MDBCardText className="text-muted">{user.name}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Last Name</MDBTypography>
                        <MDBCardText className="text-muted">{user.last_name}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"><FaEnvelope/> Email</MDBTypography>
                        <MDBCardText className="text-muted"> {user.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"><FaPhone /> Phone</MDBTypography>
                        <MDBCardText className="text-muted">{user.phone}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                    <a  class="btn btn-lg btn-block" style={{fontFamily:'bold',fontSize:'20px',marginTop:'120px'}} onClick={() => setShowModal(true)}><FaEdit /> Edit Information</a>
                    </div>
                {showModal && (
                    <div className="modal fade show" tabIndex="-1" role="dialog2" aria-labelledby="exampleModalCenterTitle2" aria-modal="true" style={{ display: "block" }}>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div className="modal-body">
                        <form onSubmit={event => handleEditSubmit(event, user)}>
                        <div className='form-group'>
                          <label>Name </label>
                          <input type='text' name='name' defaultValue={user.name} />
                        </div>
                        <div className='form-group'>
                          <label>Last Name</label>
                          <input type='text' name='last_name' defaultValue={user.last_name} />
                        </div>
                        <div className='form-group'>
                          <label>Phone</label>
                          <input type='number' name='phone' defaultValue={user.phone} />
                        </div>
                        <div className='form-group'>
                          <label>Email</label>
                          <input type='email' name='email' defaultValue={user.email} />
                        </div>
                        <div className='form-group'>
                          <label>Password</label>
                          <input type='password' name='password' defaultValue={user.password} />
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
                )}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}