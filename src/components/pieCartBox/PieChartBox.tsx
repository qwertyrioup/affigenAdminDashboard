import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss";
import {useState, useEffect} from 'react'
import axios from "axios";
import { BaseUrl } from "../../pages/requests";

const data = [
  { name: "Mobile", value: 400, color: "#0088FE" },
  { name: "Desktop", value: 300, color: "#00C49F" },
  { name: "Laptop", value: 300, color: "#FFBB28" },
  { name: "Tablet", value: 200, color: "#FF8042" },
];

const PieChartBox = () => {
  const [data, setData] = useState([])
 


  const getCounts = async()=> {
  try {
    const res1 = await axios.get(`${BaseUrl}/odoo/get/count`)

    const res3 = await axios.get(`${BaseUrl}/auth/count`)
    const res4 = await axios.get(`${BaseUrl}/order/get/count`)
    const d = [
      { name: "Products", value: res1.data, color: "#0088FE" },
  
      { name: "Users", value: res3.data, color: "#FFBB28" },
      { name: "Orders", value: res4.data, color: "#FF8042" },
    ];

    setData(d)
    
    
  } catch (error) {
    console.log(error)
  }
  }
  useEffect(()=> {
  getCounts()
  }, [])
  return (
    <div className="pieChartBox">
      <h1>Leads by Source</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
