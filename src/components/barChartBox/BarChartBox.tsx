import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "./barChartBox.scss";
import axios from "axios";
import { BaseUrl } from "../../pages/requests";
import { useEffect, useState } from "react";



const BarChartBox = () => {

const [data, setData] = useState({})

const getData = async() => {
  try {
    const res = await axios.get(`${BaseUrl}/revenue/get/lastweek`)
    setData({
      title: "Profit Earned",
      color: "#8884d8",
      dataKey: "profit",
      chartData: res.data
    })
  } catch (error) {
    console.log(error)
  }
}












useEffect(()=>{
getData()
}, [])





  return (
    <div className="barChartBox">
      <h1>Profit Earned Last Week</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={data.chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{  }}
              cursor={{fill:"none"}}
            />
            <XAxis dataKey="name" />
            
            <Bar dataKey={data.dataKey} fill={data.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
