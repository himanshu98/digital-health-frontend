import React from 'react'
import Login from './Login'
import backgroundImage from '../images/hospital-market-img-1.jpg';



const divStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh', // Ensure the div takes at least the full height of the viewport
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const HomePage = () => {
  return (<div style={divStyle}>
    <h1 style={{ color: '#fff' }}>Welcome to We Care App</h1>
    <Login />
  </div>
  )
}

export default HomePage