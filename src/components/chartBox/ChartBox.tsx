import { Link } from "react-router-dom";
import "./chartBox.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { BaseUrl } from "../../pages/requests";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  color: string;
  icon: string;
  title: string;
  dataKey: string;
  number: number | string;
  percentage: number;
  chartData: object[];
};

const ChartBox = (props: Props) => {
  const [count, setCount] = useState(0)
  const getCounts = async()=> {
    try {
      const res1 = await axios.get(`${BaseUrl}/odoo/get/count`)
      const res2 = await axios.get(`${BaseUrl}/order/get/count`)
      const res3 = await axios.get(`${BaseUrl}/auth/count`)
      const res4 = await axios.get(`${BaseUrl}/revenue`)
     

      if (props.title === "Total Users") {
        setCount(res3.data)
      } else if(props.title === "Total Products") {
        setCount(res1.data)
      } else if (props.title === "Total Revenue") {
        var value = 0
        res4.data.map((d)=> value += d.value)
        setCount("€ "+ Math.round(value))
      } else if (props.title === "Total Orders") {
        setCount(res2.data)
      }
      
      
    } catch (error) {
      console.log(error)
    }
    }
    useEffect(()=> {
    getCounts()
    }, [])

  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <img src={props.icon} alt="" />
          <span>{props.title}</span>
        </div>
        <h1>{count}</h1>
        <Link to="/" style={{ color: props.color }}>
          
        </Link>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span
            className="percentage"
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className="duration">this month</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
