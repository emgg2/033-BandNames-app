import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {

    const [ bands, setBands ] = useState([]);
    const { socket } = useContext( SocketContext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands);
        });
        return () => socket.off('current-bands');        
    }, [ socket ])

    const changeName = ( event, id ) => {
        const newName = event.target.value;
        setBands(bands => bands.map( band =>{
            if( band.id === id ) {
                band.name = newName;
            }
            return band;
      }))
    }
    
    const onLostFocus   = ( id, newName ) =>  socket.emit( 'change-band-name', { id, newName });  
    const voteBand      = ( id ) => socket.emit( 'vote-a-band', id );
    const deleteBand    = ( id ) => socket.emit( 'delete-band', id );

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
                        onChange={ ( event ) => changeName( event, band.id ) }
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