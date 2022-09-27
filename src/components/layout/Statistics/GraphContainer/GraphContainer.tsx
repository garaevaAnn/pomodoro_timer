import React from 'react';
//import styles from './graphcontainer.module.css';
import CanvasJSReact from '../../../../assets/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export function GraphContainer() {
  const options = {
    height:400,
    axisY2:{
      valueFormatString:"###  мин"
    },
    axisX:{
      lineThickness: 6
    },
    data: [
    {
      type: "column",
      axisYType: "secondary",
      color: "#EA8A79",
      yValueFormatString:"###  мин",
      dataPoints: [
        { label: "Пн",  y: 25  },
        { label: "Вт", y: 50  },
        { label: "Ср", y: 75  },
        { label: "Чт",  y: 105  },
        { label: "Пт",  y: 90  },
        { label: "Сб", y: 0  },
        { label: "Вс", y: 0  },
      ]
    }
    ]
  }
  return (
   
      <CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
   
  );
}
