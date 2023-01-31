import React, { useState, useEffect } from 'react'

export const BandList = ({ data, voteBand, deleteBand, changeBandName }) => {
    const [bands, setBands] = useState(data);

    useEffect(() => {
      setBands( data);
    }, [data])

    const changeName = ( event, id ) => {
      const newName = event.target.value;
      setBands(bands => bands.map( band =>{
        if( band.id === id ) {
            band.name = newName;
        }
        return band;
      }))
    }
    
    const onLostFocus = ( id, newName ) => {
        changeBandName( id, newName );
    }

    const rowsCreate = () => {
       return (
        
        bands.map( band => (

            <tr key={band.id}>
            <td>
                <button 
                    className='btn btn-primary'
                    onClick={ () => voteBand ( band.id )}                    
                > +1 </button>
            </td>
            <td>
                <input 
                    className='form-control'
                    value={ band.name } 
                    onChange={ ( event ) => changeName(event, band.id) }
                    onBlur={ () => onLostFocus ( band.id, band.name )}
                />
            </td>
            <td> <h3> { band.votes }</h3> </td>
            <td>
                <button 
                    className='btn btn-danger'
                    onClick={ () => deleteBand ( band.id ) }
                >
                    Delete
                </button>
            </td>
        </tr>)
        ))

       
    }
  return (
    <>
        <table className='table table-stripped'>
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                { rowsCreate() }
            </tbody>
        </table>
        
        
    </>

  )
}
