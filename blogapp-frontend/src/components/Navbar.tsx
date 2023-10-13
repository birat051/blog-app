import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import blipLogo from '../assets/blip_logo.png'
import styles from '../styles/navbar.module.css'
import { useLocation } from 'react-router-dom';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { signOut } from '../services/UserAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

type NavbarPropType=
{
    isAuthenticated: boolean
}

function Navbar(props:NavbarPropType) {
  const location=useLocation()
  const navigate=useNavigate()
  const logOut=async()=>{
    const userId=localStorage.getItem('userId')
    const jwtToken=localStorage.getItem('jwtToken')
    if(!userId)
    alert('Couldnt fetch current user id')
    if(!jwtToken)
    alert('Couldnt fetch authentication token')
    const {error,result}=await signOut(userId!,jwtToken!)
    if(!result)
    alert(error)
    else
    {
    localStorage.clear()
    navigate('/login', { replace: true })
    }
  }
  return (
    <nav className={styles.navbar}>
      <img src={blipLogo} className={styles.navbarlogo} />
      <ul className={styles.desktoplist}>
        {props.isAuthenticated && <li><Link to='/' className={location.pathname==='/'?styles.activelinktext:styles.linktext}>Home</Link></li>}
        {props.isAuthenticated && <li><Link to="/user-blogs" className={location.pathname==='/user-blogs'?styles.activelinktext:styles.linktext}>My Blogs</Link></li>}
        {props.isAuthenticated && <li><button onClick={logOut} className={styles.signout}>Signout</button></li>}
        {props.isAuthenticated && location.pathname!='/create-blog' && <li><Link to="/create-blog"><FontAwesomeIcon icon={faSquarePlus} className={styles.addIcon} onClick={()=>navigate('/create-blog')}/></Link></li>}
      </ul>
    </nav>
  )
}

export default Navbar
