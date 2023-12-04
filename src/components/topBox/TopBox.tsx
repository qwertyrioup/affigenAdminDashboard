import "./topBox.scss"
import {topDealUsers} from "../../data.ts"
import { useEffect, useState } from "react"
import axios from "axios"
import { BaseUrl } from "../../pages/requests.ts"

const TopBox = () => {
  const [top, setTop] = useState([])
  console.log(top)


  const getTop = async()=>{
    try {
      const res = await axios.get(`${BaseUrl}/order/get/top`)
      setTop(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    getTop()
  }, [])

  return (
    <div className="topBox">
      <h1>Top Deals</h1>
      <div className="list">
        {top.map(user=>(
          <div className="listItem" key={user._id}>
            <div className="user">
              <img src={topDealUsers[4].img} alt="" />
              <div className="userTexts">
                <span className="username">{user.user_details.name}</span>
                <span className="email">{user.cart.quantity} Products</span>
              </div>
            </div>
            <span className="amount">€ {Math.round(user.cart.total)+ 1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox