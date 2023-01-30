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
    console.log( 'pasa 1' );
    setOnline ( socket.connected );
    
  }, [socket])

  useEffect(() => {
    console.log( 'pasa socket connect' );
    socket.on('connect', () => {
      setOnline( true );
    })
  }, [ socket ])

  useEffect(() => {
    console.log( 'pasa socket disconnect' );
    socket.on('disconnect', () => {
      setOnline( false );
    })
  }, [ socket ])

  useEffect(() => {
    socket.on('current-bands', (bands) => {
    setBands(bands);

    } )
  }, [socket])

  const vote = ( id ) => {
    socket.emit( 'vote-a-band', id );
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
            vote={ vote }
          />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default App;
