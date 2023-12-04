import Single from "../../components/single/Single"
import { singleUser } from "../../data"
import { useAppSelector } from "../../redux/hooks"
import "./user.scss"

const User = () => {

  const user = useAppSelector(state => state.user.currentUser)
  
  return (
    <div className="user">
      
      <Single {...singleUser}/>
    </div>
  )
}

export default User