import React from 'react'

function Footer() {
  return (
    <footer className='flex justify-between *:text-gray-700 bg-gray-300 px-4 lg:px-40 py-4 mt-20'>
      <p>CinePhiler &copy;</p>
      <p>{new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer