import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBBtn,
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
import { login, reset } from '../features/auth/authSlice'


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

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

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }
  return (
    <MDBContainer fluid className='my-5'>

      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>

          <MDBCard className='my-6 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'>

              <h2 className="fw-bold mb-5">Sign In</h2>
              <form onSubmit={onSubmit} >
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
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
              wrapperClass='mb-4'
              label='Password'
              type='password'/>

              <button type='submit'class="btn btn-outline-dark btn-lg btn-block" style={{fontFamily:'bold',fontSize:'20px'}} size='md'>sign in</button>
              </form>
              <div className="text-center">

                <p>OR</p>

                <a href='/register' class="btn btn-outline-primary btn-lg btn-block" style={{color:'black',fontFamily:'bold',fontSize:'20px'}}  size='md'>sign up</a>

              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='6'>
          <img src="./img3.png" class="w-100 rounded-4 shadow-4"
            alt="" fluid/>
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;