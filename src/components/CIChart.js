import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

const CIChart = ({Cin,Food,Stationery,Postage,Carriage,Traveling}) => {
 const data = {
        labels: ['Cash In', 'Food', 'Stationery', 'Postage', 'Carriage', 'Traveling'],
        datasets: [
          {
            label: '# of Votes',
            data: [Cin, Food, Stationery, Postage, Carriage, Traveling],
            backgroundColor: [
              '#009933',
              '#0033cc',
              '#ffff00',
              '#ff0000',
              '#6600cc',
              '#ff9900',
            ],
            borderColor: [
              '#ffffff',
              '#ffffff',
              '#ffffff',
              '#ffffff',
              '#ffffff',
              '#ffffff',
            ],
            borderWidth: 1,
          },
        ],
      };
      
  return (
     <Doughnut data={data} />
  )
}

export default CIChart