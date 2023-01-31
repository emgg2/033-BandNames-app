import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandAdd = ({ addBand }) => {

  const [ value, setValue ] = useState('');
  const { socket } = useContext( SocketContext );

  const addNewBand = ( name ) => {
    socket.emit( 'add-new-band', { name });
    setValue('');
  }

  const onSubmit = ( ev ) => {
      ev.preventDefault();
      if ( value.trim().length > 0 ){
        addNewBand(value);
      }
  }
  
  return (
    <>
        <h3>Agregar banda</h3>
        <form onSubmit={ onSubmit }>
            <input 
                className='form-control'
                placeholder='Band new name'
                value={ value }
                onChange={ ( ev ) => { setValue( ev.target.value ) }}           
            />
        </form>

    </>
  )
}
