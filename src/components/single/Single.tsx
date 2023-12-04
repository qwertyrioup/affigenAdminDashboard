import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./single.scss";
import { useAppSelector } from "../../redux/hooks";

type Props = {
  id: number;
  img?: string;
  title: string;
  info: object;
  chart?: {
    dataKeys: { name: string; color: string }[];
    data: object[];
  };
  activities?: { time: string; text: string }[];
};

const Single = (props: Props) => {
  const user = useAppSelector(state => state.user.currentUser)
  return (

   
    <div className="single">
      {user && Object.keys(user).length > 0 ? <>
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.img && <img src={props.img} alt="" />}
            <h1>{user.firstname} {user.lastname} </h1>
            
          </div>
          <div className="details">
          <div className="item" >
                <span className="itemTitle">id</span>
                <span className="itemValue">{user._id}</span>
              </div>
          <div className="item" >
                <span className="itemTitle">First Name</span>
                <span className="itemValue">{user.firstname}</span>
              </div>
              <div className="item" >
                <span className="itemTitle">Last Name</span>
                <span className="itemValue">{user.lastname}</span>
              </div>
              <div className="item" >
                <span className="itemTitle">email</span>
                <span className="itemValue">{user.email}</span>
              </div>
              <div className="item" >
                <span className="itemTitle">Country</span>
                <span className="itemValue">{user.country}</span>
              </div>
              <div className="item" >
                <span className="itemTitle">Phone</span>
                <span className="itemValue">{user.phone}</span>
              </div>
              <div className="item" >
                <span className="itemTitle">isAdmin</span>
                <span className="itemValue">{user.isAdmin ? 'True' : 'False'}</span>
              </div>
          </div>
        </div>
        <hr />
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                  type="monotone"
                  dataKey={dataKey.name}
                  stroke={dataKey.color}
                  />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      {/* <div className="activities">
        <h2>Latest Activities</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div> */}
      </>
       : null}
      
    </div>
  );
};

export default Single;
