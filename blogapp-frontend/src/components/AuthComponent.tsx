import { createContext, useState } from "react";
import styles from '../styles/auth.module.css'
import Navbar from "./Navbar";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { DisplayChildrenProps, LoadingContextType } from "../utils/BlogAppTypes";



export const LoadingContext = createContext<LoadingContextType | null>(null);


const AuthComponent: React.FC<DisplayChildrenProps> = ({children}) => {
  const [loading, setloading] = useState(false)
  const handleLoading=(value:boolean)=>{
    setloading(value)
  }
  return (
    <LoadingContext.Provider value={{ handleLoading,loading }} >
    <LoadingOverlayWrapper active={loading} spinner>
    <div className={styles.authcontainer}>
    <Navbar isAuthenticated={false}/>
      {children}
    </div>
    </LoadingOverlayWrapper>
    </LoadingContext.Provider>
  )
}

export default AuthComponent
