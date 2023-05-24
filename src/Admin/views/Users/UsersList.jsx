import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, Box, Typography } from '@mui/material';
import '../Users/UsersList.scss';
import  { upgradeUser } from '../../Services/Apiclient'
import { faList, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { reset } from '../../../features/auth/authSlice'

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();

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
      navigate('/');
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);


  useEffect(() => {
    // Fetch the user data from the API
    fetch('http://192.168.1.9:5000/users/users/alls?role=1')
      .then(response => response.json())
      .then(data => {
        // Add a unique id to each user
        const usersWithId = data.map((user, index) => ({ ...user, id: user._id }));
        setUsers(usersWithId);
      })
      .catch(error => console.log(error));
  }, []);

  const handleEdit = (userId) => {
    setSelectedUser(userId);
    setEditModalOpen(true);
  };

  const handleDelete = (userId) => {
    setSelectedUser(userId);
    setDeleteModalOpen(true);
  };

  const handleConfirmEdit = async () => {
    try {
      // Call the upgradeUser method with the selectedUser and the desired path
      await upgradeUser(selectedUser, 'up');
      console.log('Edit clicked for user:', selectedUser);
      setEditModalOpen(false);
       window.location.reload();
    } catch (error) {
      console.log('Failed to upgrade user:', error.message);
      // Handle the error, show an error message, etc.
    }
  };

  const handleConfirmDelete = () => {
    // Proceed with the deletion
    console.log('Delete clicked for user:', selectedUser);
    setDeleteModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    // Add any other user properties you want to display as columns
    {
      field: 'Changer Role au Prioritaire',
      headerName: 'Changer Role au Prioritaire',
      width: 200,
      renderCell: (params) => (
        <Button className="users-list-button-edit" style={{background:'blue',color:'white'}} onClick={() => handleEdit(params.row.id)}>Change</Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <Button className="users-list-button-delete" style={{background:'red',color:'white'}} onClick={() => handleDelete(params.row.id)}>Delete</Button>
      ),
    },
  ];

  return (
    <div className="users-list-container">
      <h2 className="users-list-heading"> <FontAwesomeIcon icon={faList} /> Users List</h2>
      <DataGrid rows={users} columns={columns} pageSize={6} style={{ textDecoration: "none",fontSize:'18px',marginTop:'-15px' }} />

      {/* Edit Modal */}
      <Modal open={isEditModalOpen} onClose={handleCancel}>
        <Box sx={{ width: 300, p: 2, bgcolor: 'white', borderRadius: 4, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h6" mb={2}>Edit User</Typography>
          <Typography variant="body1" mb={2}>Are you sure you want to edit this user?</Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleConfirmEdit} mr={1}>Edit</Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal open={isDeleteModalOpen} onClose={handleCancel}>
        <Box sx={{ width: 300, p: 2, bgcolor: 'white', borderRadius: 4, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h6" mb={2}>Delete User</Typography>
          <Typography variant="body1" mb={2}>Are you sure you want to delete this user?</Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleConfirmDelete} mr={1}>Delete</Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersList;
