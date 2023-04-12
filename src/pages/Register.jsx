import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
}
from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    last_name: '',
    password: '',
    password2: '',
  })

  const { name,last_name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        last_name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }
  return (
    <MDBContainer fluid className='my-5'>

      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>

          <MDBCard className='my-6 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'>

              <h2 className="fw-bold mb-5">Sign Up</h2>
              <form onSubmit={onSubmit}>
              <MDBRow className="pt-1">
              <MDBCol size="6" className="mb-3">
              <MDBInput 
              wrapperClass='mb-4' 
              label='Name' 
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange} type='text'/>
              </MDBCol>
              <MDBCol size="6" className="mb-3">
              <MDBInput 
              wrapperClass='mb-4' 
              label='Last Name' 
              id='last_name'
              name='last_name'
              value={last_name}
              placeholder='Enter your last name'
              onChange={onChange} type='text'/>
              </MDBCol>
              </MDBRow>

              <MDBInput 
              wrapperClass='mb-4' 
              label='Email' 
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
              type='email'/>
              <MDBInput 
              wrapperClass='mb-4' 
              label='Password' 
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange} 
              type='password'/>
              <MDBInput 
              wrapperClass='mb-4' 
              label='Confirm password' 
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password password'
              onChange={onChange} 
              type='password'/>

              <button type='submit'class="btn btn-outline-dark btn-lg btn-block"  style={{fontFamily:'bold',fontSize:'20px'}} size='md'>sign up</button>
              </form>
              <div className="text-center">

                <p>OR</p>

                <a href='/login' class="btn btn-outline-primary btn-lg btn-block" style={{color:'black',fontFamily:'bold',fontSize:'20px'}}  size='md'>sign in</a>

              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='6'>
          <img src="./img2.png" class="w-100 rounded-4 shadow-4"
            alt="" fluid/>
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Register;