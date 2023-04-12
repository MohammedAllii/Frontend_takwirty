import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTerrain } from '../features/terrains/terrainSlice'
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

function TerrainForm() {
  const [nom, setNom] = useState('')
  const [description, setDescription] = useState('')
  const [adresse, setAdresse] = useState('')
  const [prix, setPrix] = useState('')
  const [image, setImage] = useState(null)

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('nom', nom)
    formData.append('description', description)
    formData.append('adresse', adresse)
    formData.append('prix', prix)
    formData.append('image', image)

    dispatch(createTerrain(formData))
    setNom('')
    setDescription('')
    setAdresse('')
    setPrix('')
    setImage(null)
  }

  return (
      <MDBContainer fluid>
  
        <div className="p-2 bg-image" style={{marginTop:'-150px',backgroundImage: 'url(./bg.jpg)', height: '400px',width: '600px',display:'block',margin:'auto'}}></div>
  
        <MDBCard className='mx-2 mb-2 p-2 shadow-2' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
          <MDBCardBody className='p-5 text-center'>
  
            <h2 className="fw-bold mb-2">Add Stadium</h2>
            <form onSubmit={onSubmit}>
  
            <MDBRow>
              <MDBCol col='4'>
                <MDBInput
                wrapperClass='mb-4' 
                label='Name of stadium'  
                type='text'
                name='nom'
                id='nom'
                value={nom}
                onChange={(e) => setNom(e.target.value)}/>
              </MDBCol>
  
              <MDBCol col='6'>
              <MDBCol col='4'>
                <MDBInput
                wrapperClass='mb-4' 
                label='Adresse'  
                type='text'
                name='adresse'
                id='adresse'
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}/>
              </MDBCol>
              </MDBCol>
            </MDBRow>
  
            <MDBInput 
            wrapperClass='mb-4' 
            label='Description' 
            type='text'
            name='description'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>
            <MDBRow>
              <MDBCol col='4'>
                <MDBInput
                wrapperClass='mb-4' 
                label='Price'  
                type='number'
                name='prix'
                id='prix'
                value={prix}
                onChange={(e) => setPrix(e.target.value)}/>
              </MDBCol>
  
              <MDBCol col='6'>
              <MDBCol col='4'>
                <MDBInput
                wrapperClass='mb-4' 
                label='Image'  
                type='file'
                name='image'
                id='image'
                onChange={(e) => setImage(e.target.files[0])}/>
              </MDBCol>
              </MDBCol>
            </MDBRow>

  
            <button type='submit' className='btn btn-success btn-lg btn-block' size='md'>Add</button>
            </form>
          </MDBCardBody>
        </MDBCard>
  
      </MDBContainer>
    );

}

export default TerrainForm
