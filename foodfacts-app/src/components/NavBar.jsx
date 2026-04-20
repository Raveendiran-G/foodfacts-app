import { NavLink } from 'react-router-dom'

function NavBar({ savedCount }) {
  return (
    <nav className="navbar">
      <span>🥗 FoodFacts</span>

      <NavLink to="/">Search</NavLink>
      <NavLink to="/saved">
        Saved {savedCount > 0 && <span>({savedCount})</span>}
      </NavLink>
    </nav>
  )
}

export default NavBar