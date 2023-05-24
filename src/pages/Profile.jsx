import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux'
import React, { useState } from 'react';
import { FaEdit, FaPhone, FaEnvelope} from 'react-icons/fa'
import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTerrains, reset } from '../features/terrains/terrainSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function PersonalProfile() {
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState([]);

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

    const handleEditSubmit = async (event, user) => {
      event.preventDefault();
      const token = localStorage.getItem('authToken');
      const formData = new FormData(event.target);
      const newUserInfo = {
        name: formData.get('name'),
        last_name: formData.get('last_name'),
        phone: formData.get('phone'),
        password: formData.get('password'),
        email: formData.get('email'),
      };
    
      try {
        const response = await axios.put(`${uri}/users/${user._id}`, newUserInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
    
        if (response.status === 200) {
          setUsers((prevUsers) =>
            prevUsers.map((prevUser) => (prevUser._id === user._id ? response.data : prevUser))
          );
          toast.success('Update avec success');
          setShowModal(false)
          window.location.reload();

        } 
      } catch (error) {
        console.log(error);
        toast.error('An error occurred while updating the user.');
      }
    };
    
  const token = localStorage.getItem('authToken');
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`${uri}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            
          }
          );
          setProfile(response.data);
          
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchProfile();
      
    }
    , []);

    

  return (
    <section className="vh-300">
      <MDBContainer className="py-8 h-200">
        <MDBRow className="justify-content-center align-items-center h-200">
          <MDBCol lg="12" className="mb-6 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem', height:'700%' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="./profile.gif"
                    alt="Avatar" className="my-5" style={{ width: '300px' }} fluid />
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
          <MDBCardText className="text-muted">{profile && profile.name}</MDBCardText>
        </MDBCol>
        <MDBCol size="6" className="mb-3">
          <MDBTypography tag="h6">Last Name</MDBTypography>
          <MDBCardText className="text-muted">{profile ? profile.last_name : ''}</MDBCardText>
        </MDBCol>
      </MDBRow>
      <hr className="mt-0 mb-4" />
      <MDBRow className="pt-1">
        <MDBCol size="6" className="mb-3">
          <MDBTypography tag="h6">
            <FaEnvelope /> Email
          </MDBTypography>
          <MDBCardText className="text-muted">{profile ? profile.email : ''}</MDBCardText>
        </MDBCol>
        <MDBCol size="6" className="mb-3">
          <MDBTypography tag="h6">
            <FaPhone /> Phone
          </MDBTypography>
          <MDBCardText className="text-muted">{profile ? profile.phone : ''}</MDBCardText>
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
    <label>Name</label>
    <input type='text' name='name' defaultValue={profile.name} />
  </div>
  <div className='form-group'>
    <label>Last Name</label>
    <input type='text' name='last_name' defaultValue={profile.last_name || ''} />
  </div>
  <div className='form-group'>
    <label>Phone</label>
    <input type='number' name='phone' defaultValue={profile.phone || ''} />
  </div>
  <div className='form-group'>
    <label>Email</label>
    <input type='email' name='email' defaultValue={profile.email} />
  </div>
  <div className='form-group'>
    <label>Password</label>
    <input type='password' name='password' defaultValue={profile.password} />
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