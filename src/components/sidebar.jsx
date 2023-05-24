import React, { useState } from 'react';
import { MDBContainer, MDBBtn, MDBIcon, MDBListGroup, MDBListGroupItem } from 'mdbreact';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      <MDBContainer>
        <MDBBtn className="toggler" color="info" onClick={handleToggleSidebar}>
          <MDBIcon icon={isSidebarOpen ? 'angle-double-left' : 'angle-double-right'} />
        </MDBBtn>
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <MDBListGroup>
            <MDBListGroupItem>Gestion User</MDBListGroupItem>
            <MDBListGroupItem>Gestion Terrain</MDBListGroupItem>
            <MDBListGroupItem>Gestion Reservation</MDBListGroupItem>
          </MDBListGroup>
        </div>
        <div className="content">
          <div className="card">
            <h3>Number of Users</h3>
            <p>100</p>
          </div>
          <div className="card">
            <h3>Number of Terrains</h3>
            <p>50</p>
          </div>
          <div className="card">
            <h3>Number of Reservations</h3>
            <p>20</p>
          </div>
        </div>
      </MDBContainer>
    </div>
  );
};

export default Dashboard;
