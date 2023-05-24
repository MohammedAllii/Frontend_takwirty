import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTerrain } from '../features/terrains/terrainSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getTerrains, reset } from '../features/terrains/terrainSlice'

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TerrainForm() {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [adresse, setAdresse] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState(null);

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

  const onChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'nom':
        setNom(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'adresse':
        setAdresse(value);
        break;
      case 'prix':
        setPrix(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  
    // Check if any of the required inputs are empty
    if (!nom || !description || !adresse || !prix || !image) {
      // Show toast notification for the empty input
      toast.error('Please fill in all required fields');
      return;
    }
  
    // Rest of the code for form submission
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('adresse', adresse);
    formData.append('prix', prix);
    formData.append('image', image);
  
    dispatch(createTerrain(formData));
    setNom('');
    setDescription('');
    setAdresse('');
    setPrix('');
    setImage(null);
  };
  

  return (
    <MDBContainer fluid>
      <div
        className="p-2 bg-image"
        style={{
          marginTop: '-150px',
          backgroundImage: 'url(./bg.jpg)',
          height: '400px',
          width: '600px',
          display: 'block',
          margin: 'auto'
        }}
      ></div>

      <MDBCard
        className="mx-2 mb-2 p-2 shadow-2"
        style={{
          marginTop: '-100px',
          background: 'hsla(0, 0%, 100%, 0.8)',
          backdropFilter: 'blur(30px)'
        }}
      >
        <MDBCardBody className="p-5 text-center">
          <h2 className="fw-bold mb-2">Add Stadium</h2>
          <form onSubmit={onSubmit}>
            <MDBRow className="pt-1">
              <MDBCol size="6" className="mb-3">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Name"
                  id="nom"
                  name="nom"
                  value={nom}
                  placeholder="Enter name"
                  onChange={onChange}
                  type="text"
                />
              </MDBCol>
              <MDBCol size="6" className="mb-3">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Description"
                  id="description"
                  name="description"
                  value={description}
                  placeholder="Enter your description"
                  onChange={onChange}
                  type="text"
                />
              </MDBCol>
            </MDBRow>

            <MDBInput
              wrapperClass="mb-4"
              label="Adresse"
              id="adresse"
              name="adresse"
              value={adresse}
              placeholder="Enter your adresse"
              onChange={onChange}
              type="text"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Prix"
              id="prix"
              name="prix"
              value={prix}
              placeholder="Enter prix"
              onChange={onChange}
              type="number"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Image"
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button
              type="submit"
              class="btn btn-outline-dark btn-lg btn-block"
              style={{ fontFamily: 'bold', fontSize: '20px' }}
              size="md"
            >
              Add Stadium
            </button>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default TerrainForm;
