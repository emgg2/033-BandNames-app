import React, { useState } from 'react'

export const BandAdd = ({ addBand }) => {

  const [ value, setValue ] = useState('');


  const addNewBand = ( name ) => {
    addBand(name);
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
