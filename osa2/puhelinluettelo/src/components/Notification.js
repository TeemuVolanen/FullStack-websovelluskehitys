import React from 'react'

const Notification = ({ message }) => {
  const notificationStyle = (message[1])
  ? {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 20,
    border: '2px solid #73AD21',
    backgroundColor: '#DCDCDC',
    borderRadius: '5px',
    margin: '10px',
    padding: '10px'
    }
  : {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 20,
    border: '2px solid red',
    backgroundColor: '#DCDCDC',
    borderRadius: '5px',
    margin: '10px',
    padding: '10px'
    } 

  if (message[0] === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message[0]}
    </div>
  )
}

export default Notification