import React, { useContext, useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { SocketContext } from '../context/SocketContext';
  
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const BandChart = () => {

    const { socket } = useContext ( SocketContext );
    const [labels, setLabels] = useState([]);
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setLabels(bands.map ( band => band.name ));
            setDataList(bands.map ( band => band.votes ));
        });
        return () => socket.off('current-bands');        
    }, [ socket ])

   
    const options = {
        indexAxis: 'y' ,               
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right' ,
          },
          title: {
            display: true,
            text: 'Bands List',
          },
        },
      };
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Bands',
            data: dataList,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }         
        ],
      };
          

    return (
        <>      
            <Bar options={options} data={data} />;     
        </>
    )
}
