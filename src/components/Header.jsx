import { NavLink } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../store/authContext"


const Header = () => {
  
  const authCtx = useContext( AuthContext )
  
  return (
    <div>
      <div><h1>Hello, {authCtx.username}!</h1></div>
      <div><nav>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/profile'>Profile</NavLink>
      <NavLink to='/auth' onClick={authCtx.logout}>Logout</NavLink>
      </nav></div>
    
    </div>
  )
}

export default Header;