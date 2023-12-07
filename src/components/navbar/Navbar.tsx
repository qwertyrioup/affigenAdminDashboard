import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/userRedux";
import "./navbar.scss";

const Navbar = () => {
  const user = useAppSelector(state => state.user.currentUser)
  const dispatch = useAppDispatch()


   return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>Admin Dashboard</span>
      </div>
      <div className="icons">
        {/* <img src="/search.svg" alt="" className="icon" /> */}
        {/* <img src="/app.svg" alt="" className="icon" /> */}
        {/* <img src="/expand.svg" alt="" className="icon" /> */}
        {/* <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div> */}
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          {user && <span>{user.firstname} {user.lastname}</span> }
          
        </div>
        {/* <img src="/settings.svg" alt="" className="icon" /> */}
        <img onClick={()=> {
          dispatch(logout())
        }} style={{width: 20, cursor: 'pointer' }} src="/logout.svg" alt="" className="icon" />

      </div>
    </div>
  );
};

export default Navbar;
