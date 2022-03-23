
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

export const data =(es,lo,re,mi)=>{
  
  return {
    labels: ['EXPORT', 'LOCAL', 'REAL ESTATE', 'MINERAL RESOURCES'],
  datasets: [
    {
      label: '# of Votes',
      data: [es, lo, re, mi],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      maxWidth: "100%",
      borderWidth: 1,
    },
  ],
  }
  
};