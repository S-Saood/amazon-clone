import React, {useState} from 'react'
import './Header.css';
import amazon from '../../assets/amazon.png'
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function Navbar({cartCount, setQuery}) {
  const [tempInput, setTempInput] = useState("")//local input state

  const handleSearch = () =>{
    setQuery(tempInput.toLowerCase())// only update main query on click
  } 

  return (
      <header className="header-nav">

      {/* <!-- navbar-start --> */}
      <div className="navbar">
        <Link to="/"  className="nav-logo border">
          <img src={amazon} alt="Amazon logo"
          className="logo"/>
        </Link>
        <div className="nav-address border">
          <p className="address-first">Deliver to</p>
          <div className="address-icon">
            <i className="fa-solid fa-location-dot"></i>
            <p className="address-second">Update location</p>
          </div>
        </div>
        <div className="nav-search">
          <select className="search-select">
            <option>All</option>
          </select>
          <input className="search-input"
          placeholder="Search Amazon"
          value={tempInput} 
          onChange={(event) => setTempInput(event.target.value.toLowerCase())}/>
          <div className="search-icon">
            <button className="fa-solid fa-magnifying-glass"
            type="button"
            onClick={handleSearch}
            > 
            <SearchIcon />
            </button> 
          </div>
        </div>
        <div className="nav-signin border">
          <p>Returns</p>
          <p className="nav-second">& Orders</p>
        </div>
        <div className="nav-return border">
          <p><span>Hello, sign in</span></p>
          <Link to="/regestered">
          <p className="nav-second">Account & Lists</p>
          </Link>
        </div>
        
        <Link to="/cart"  className="nav-cart border">
        <div>{cartCount}</div>
          <ShoppingCartIcon/>
          Cart
        </Link>
      </div>
      {/* <!-- navbar-end --> */}

      {/* <!-- pannel-start --> */}
      <div  className="pannel">
        <div className="pannel-all nn" id="open-nav-sidebar">
          <i className="fa-solid fa-bars"></i>
          All
        </div>
        <div className="pannel-opt ">
          <p className="border">Today's Deals</p>
          <p className="border">Registry</p>
          <p className="border">Prime Video</p>
          <p className="border">Customer Service</p>
          <p className="border">Gift Cards</p>
          <p className="border">Sell</p>
        </div>
        <div className="pannel-deals">
          <p className="border">Shop deals in electronic</p>
          
        </div>
      </div>
      {/* <!-- pannel-end --> */}

    </header>

   
  )
}

export default Navbar