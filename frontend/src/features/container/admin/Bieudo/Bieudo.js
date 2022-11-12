import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale,  Title,} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux';
import binhluanchudeApi from '../../../../api/binhluanchudeApi'
import chudeApi from '../../../../api/chudeApi'


ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title);
let binhluancd , chudes
const test = async () => {
  
  const testDT = await binhluanchudeApi.getallbinhluan();
  const testChude = await chudeApi.getallbinhluan();
  chudes = testChude.data
  binhluancd = testDT.data
}
test()
function Bieudo() {
  // const binhluanchudes = useSelector(state => state.binhluanchudes.binhluanchude.data)
  // const chudes = useSelector(state => state.chudes.chude.data)
  // const binh = []
  // binhluancd.forEach(binhluan => {
  //   if(binh.indexOf(binhluan) !== -1){
  //     binh.push(binhluan)
  //   }
  // })
  const chude = chudes.map(chude=>chude.chuDe)
  const arr = chude.map(chude => binhluancd.filter(binhluan => binhluan.Chude.chuDe === chude))
  const d = arr.map(itema => {
    const testb = itema.map(item=>item.binhluanId)
    let test = itema.filter((item,index)=> {
      return !testb.includes(item.binhluanId, index + 1)
    })
    return test
  })
  const k = d.map(item => item.length)
  const data = {
    labels: chude,
    datasets: [
      {
        label: "# of Votes",
        data: k,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'COMMENTS BY CATEGORY & POLARITY',
      },
    },
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'topic.polarity',
      },
    },
  };
  // Process data chart positive and negative 
  const labels = chude;
  const blcdPostive = arr.map(blcd => blcd.filter(item=>item.analyzeCmt === 'Positive').length)
  const blcdNegative = arr.map(blcd => blcd.filter(item=>item.analyzeCmt === 'Negative').length)
  const data1 = {
    labels,
    datasets: [
      {
        label: '',
        data: blcdPostive,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  const data3 = {
    labels,
    datasets: [
      {
        label: '',
        data: blcdNegative,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  
  const data2 = {
    labels,
    datasets: [
      {
        label: 'Positive',
        data: blcdPostive,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: 'Negative',
        data: blcdNegative,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <div style = {{margin: "16px 32px"}}>
      <div>
        <h2 style = {{color: "#ccc", 'font-size': '1.5rem'}}>CATEGORIES</h2>
        <h1 style = {{color: "#000", 'font-size': '1.3rem'}}>COMMENTS BY CATEGORY</h1> 
      </div>
      <div style={{ display: "flex" ,"flex-wrap": "wrap", "margin": "10px" }}>
        <div style={{ width: 300 }}>
          <Pie
            data={data}
            width={300}
            height={300}
            options={{ 
              plugins: {
                title: {
                  display: true,
                  text: 'CATEGORY'
                }
              }
            }}
          />
        </div>
        <div style={{ width: 500  }}>
          <Bar
            data={data1}
            options={options1}
          />
          Positive
        </div>
        <div style={{ width: 500  }}>
          <Bar
            data={data3}
            options={options1}
          />
          Negative
        </div>
        <div style={{ width: 500  }}>
          <Bar
            data={data2}
            options={options2}
          />
          Negative
        </div>
      </div>
    </div>
  );
}

Bieudo.propTypes = {};

export default Bieudo;
