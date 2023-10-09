import { ReactNode } from "react";
import styles from '../styles/auth.module.css'

interface DisplayChildrenProps {
    children: ReactNode;
}

const AuthComponent: React.FC<DisplayChildrenProps> = ({children}) => {
  return (
    <div className={styles.authcontainer}>
      {children}
    </div>
  )
}

export default AuthComponent
