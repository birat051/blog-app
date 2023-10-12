import Navbar from './Navbar'
import styles from '../styles/screenwrapper.module.css'
import { DisplayChildrenProps, LoadingContextType } from '../utils/BlogAppTypes'
import { createContext, useState } from 'react'
import LoadingOverlayWrapper from 'react-loading-overlay-ts';


export const ScreenLoadingContext = createContext<LoadingContextType | null>(null);


function ScreenWrapper(props:DisplayChildrenProps) {
  const [loading, setloading] = useState(false)
  const handleLoading=(value:boolean)=>{
    setloading(value)
  }
  return (
    <ScreenLoadingContext.Provider value={{ handleLoading,loading }} >
     <LoadingOverlayWrapper active={loading} spinner>
    <div className={styles.screenwrapper}>
      <Navbar isAuthenticated={true} />
      {props.children}
    </div>
    </LoadingOverlayWrapper>
    </ScreenLoadingContext.Provider>
  )
}

export default ScreenWrapper
