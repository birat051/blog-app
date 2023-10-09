import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import styles from '../styles/privateroute.module.css'
import { validateJWT } from "../services/userAuth";

type PrivateRoutePropType=
{
  children: ReactNode;
}

const PrivateRoute = (props:PrivateRoutePropType) => {
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [isLoading, setisLoading] = useState(true)
  useEffect(() => {
    async function validateUser(userId:string,jwtToken:string)
    {
      const result=await validateJWT(userId,jwtToken)
      if(result)
      {
        setisAuthenticated(result)
      }
      setisLoading(false)
    }
    const userId=sessionStorage.getItem('userId')
    const jwtToken=sessionStorage.getItem('jwtToken')
    if(userId && jwtToken)
    validateUser(userId,jwtToken)
    else
    setisLoading(false)
  }, [])
  
  if(isLoading)
  return (
    <LoadingOverlayWrapper active={true}>
    <div className={styles.loadingcontainer}/> 
    </LoadingOverlayWrapper>
  )
  return isAuthenticated ? props.children : <Navigate to="/login" />;
};

export default PrivateRoute
