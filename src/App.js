import React, { useEffect, useState } from 'react';
import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';
import io from "socket.io-client";

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  });
  return socket;
}

function App() {
  const [ socket ] = useState( connectSocketServer() );
  const [ online, setOnline ] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    setOnline ( socket.connected );
    
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setOnline( true );
    })
  }, [ socket ])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline( false );
    })
  }, [ socket ])

  useEffect(() => {
    socket.on('current-bands', (bands) => {
    setBands(bands);

    } )
  }, [ socket ])

  const voteBand = ( id ) => {
    socket.emit( 'vote-a-band', id );
  }
  
  const deleteBand = ( id ) => {
    socket.emit( 'delete-band', id );
  }
  
  const changeBandName = ( id, newName ) => {
    socket.emit( 'change-band-name', { id, newName });  
  }

  const addNewBand = ( name ) => {
    socket.emit( 'add-new-band', { name });
  }
  return (
    <div className="container" >
      <div className="alert">
        <p> Service status:
          {
            online 
                ? <span className="text-success"> Online </span> 
                : <span className="text-danger"> Offline </span>  
          }       
          
        </p>
      </div>


      <h1> Band Names</h1>
      <hr/>

      <div className="row">
        <div className="col-8">
          <BandList 
            data={bands}
            voteBand={ voteBand }
            deleteBand={ deleteBand }
            changeBandName={ changeBandName }
          />
        </div>
        <div className="col-4">
          <BandAdd 
            addBand={ addNewBand }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
