import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux'
import React, { useState } from 'react';
import { FaEdit, FaPhone, FaEnvelope} from 'react-icons/fa'


export default function PersonalProfile() {
    const { user } = useSelector((state) => state.auth)
    const [showModal, setShowModal] = useState(false);


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
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
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
                            <h5 className="modal-title" id="exampleModalLongTitle">Are you sure to delete?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div className="modal-body">
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                        <button  type="button" className="btn btn-danger">Delete</button>
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