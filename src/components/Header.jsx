import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <nav>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/profile'>Profile</NavLink>
      <NavLink to='/'>Logout</NavLink>
    </nav>
  )
}

export default Header