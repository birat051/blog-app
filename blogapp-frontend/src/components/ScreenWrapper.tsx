import Navbar from './Navbar'
import styles from '../styles/screenwrapper.module.css'
import { DisplayChildrenProps, LoadingContextType } from '../utils/BlogAppTypes'
import { createContext, useEffect, useState } from 'react'
import LoadingOverlayWrapper from 'react-loading-overlay-ts';
import { validateJWT } from '../services/UserAuth';
import useLocalStorage from '../hooks/useLocalStorage';


export const ScreenLoadingContext = createContext<LoadingContextType | null>(null);


function ScreenWrapper(props:DisplayChildrenProps) {
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const [jwt,userId]=useLocalStorage()
  const [loading, setloading] = useState(false)
  const handleLoading=(value:boolean)=>{
    setloading(value)
  }
  useEffect(()=>{
    async function checkLogin()
    {
      if(!jwt && !userId)
      {
        setIsAuthenticated(false)
        return
      }
      const res=await validateJWT(userId!,jwt!)
      setIsAuthenticated(res)
    }
    checkLogin()
  },[])
  return (
    <ScreenLoadingContext.Provider value={{ handleLoading,loading }} >
     <LoadingOverlayWrapper active={loading} spinner>
    <div className={styles.screenwrapper}>
      <Navbar isAuthenticated={isAuthenticated} />
      {props.children}
    </div>
    </LoadingOverlayWrapper>
    </ScreenLoadingContext.Provider>
  )
}

export default ScreenWrapper
