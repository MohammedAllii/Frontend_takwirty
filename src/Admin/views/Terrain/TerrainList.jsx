import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, Box, Typography } from '@mui/material';
import '../Terrain/TerrainList.scss';
import  { upgradeTerrain } from '../../Services/Apiclient' 
import { faList, faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { reset } from '../../../features/auth/authSlice'


const TerrainList = () => {
  const [terrains, setTerrains] = useState([]);
  const [selectedTerrain, setSelectedTerrain] = useState(null);
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
    } else if (user.role !== 2) {
      navigate('/');
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    // Fetch the user data from the API
    fetch('http://192.168.1.9:5000/terrains/terrains/alls?etat=1')
      .then(response => response.json())
      .then(data => {
        // Add a unique id to each user
        const terrainsWithId = data.map((terrain, index) => ({ ...terrain, id: terrain._id }));
        setTerrains(terrainsWithId);
      })
      .catch(error => console.log(error));
  }, []);

  const handleEdit = (terrainId) => {
    setSelectedTerrain(terrainId);
    setEditModalOpen(true);
  };

  const handleDelete = (terrainId) => {
    setSelectedTerrain(terrainId);
    setDeleteModalOpen(true);
  };

  const handleConfirmEdit = async () => {
    try {
      // Call the upgradeterrain method with the selectedterrain and the desired path
      await upgradeTerrain(selectedTerrain, 'up');
      console.log('Edit clicked for Terrain:', selectedTerrain);
      setEditModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.log('Failed to upgrade Terrain:', error.message);
      // Handle the error, show an error message, etc.
    }
  };

  const handleConfirmDelete = () => {
    // Proceed with the deletion
    console.log('Delete clicked for Terrain:', selectedTerrain);
    setDeleteModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedTerrain(null);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <img src={`http://192.168.1.9:5000/uploads/${params.row.image}`} alt="Terrain" style={{ width: '80%', height: 'auto' }} />
      ),
    },
    { field: 'nom', headerName: 'Name Stadium', width: 150 },
    { field: 'adresse', headerName: 'Location', width: 150 },
    { field: 'prix', headerName: 'Price', width: 100 },
    { field: 'description', headerName: 'Description', width: 250 },
    // Add any other user properties you want to display as columns
    {
      field: 'Changer état du terrain',
      headerName: 'Changer état du terrain',
      width: 200,
      renderCell: (params) => (
        <Button className="users-list-button-edit" style={{background:'blue',color:'white'}} onClick={() => handleEdit(params.row.id)}><FontAwesomeIcon icon={faEdit} />Change</Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete terrain',
      width: 100,
      renderCell: (params) => (
        <Button className="users-list-button-delete" style={{background:'red',color:'white',position:'center'}} onClick={() => handleDelete(params.row.id)}><FontAwesomeIcon icon={faTrash} /> Delete</Button>
      ),
    },
  ];

  return (
    <div className="users-list-container">
      <h2 className="users-list-heading"> <FontAwesomeIcon icon={faList} />Terrain List</h2>
      <DataGrid rows={terrains} columns={columns} pageSize={8} style={{ textDecoration: "none",fontSize:'18px',marginTop:'-15px' }}/>

      {/* Edit Modal */}
      <Modal open={isEditModalOpen} onClose={handleCancel}>
        <Box sx={{ width: 300, p: 2, bgcolor: 'white', borderRadius: 4, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h6" mb={2}>Edit Terrain</Typography>
          <Typography variant="body1" mb={2}>Are you sure you want to edit this Terrain?</Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleConfirmEdit} mr={1}>Edit</Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal open={isDeleteModalOpen} onClose={handleCancel}>
        <Box sx={{ width: 300, p: 2, bgcolor: 'white', borderRadius: 4, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h6" mb={2}>Delete Terrain</Typography>
          <Typography variant="body1" mb={2}>Are you sure you want to delete this Terrain?</Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleConfirmDelete} mr={1}>Delete</Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default TerrainList;
