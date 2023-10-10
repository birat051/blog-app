import { ReactNode } from "react";
import styles from '../styles/auth.module.css'
import Navbar from "./Navbar";

export interface DisplayChildrenProps {
    children: ReactNode;
}

const AuthComponent: React.FC<DisplayChildrenProps> = ({children}) => {
  return (
    <div className={styles.authcontainer}>
    <Navbar isAuthenticated={false}/>
      {children}
    </div>
  )
}

export default AuthComponent
