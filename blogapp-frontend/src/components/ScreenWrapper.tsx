import Navbar from './Navbar'
import { DisplayChildrenProps } from './AuthComponent'
import styles from '../styles/auth.module.css'


function ScreenWrapper(props:DisplayChildrenProps) {
  return (
    <div className={styles.authcontainer}>
      <Navbar isAuthenticated={true} />
      {props.children}
    </div>
  )
}

export default ScreenWrapper
