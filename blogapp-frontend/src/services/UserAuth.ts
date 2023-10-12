import { SignInReqBody, SignInResponse, SignOutResponse } from "../utils/BlogAppTypes"
import apiHelper from "./ApiHelper"


export const validateJWT=async (userId:string,jwtToken:string):Promise<boolean>=>{
    try{
    const validateJWTUrl=apiHelper.getValidateUserRoute(userId)
    const res=await fetch(validateJWTUrl,{
        headers: {
            'Authorization': jwtToken
        }
    })
    if(res.status===200)
    return true
    else
    return false
    }
    catch(error)
    {
        console.log('Unexpected error occured while validating jwt: ',error)
        return false
    }
}

export const signOut=async (userId:string,jwtToken:string):Promise<SignOutResponse>=>{
    try{
        const signOutUrl=apiHelper.getLogoutRoute(userId)
        const res=await fetch(signOutUrl,{
            method: 'POST',
            headers: {
                'Authorization': jwtToken,
                'Content-Type': 'application/json'
            }
        })
        if(res.status===200)
        return {result: true}
        else
        {
            const data=await res.json()
            return {result: false,error: data.message}
        }
    }
    catch(error)
    {
        console.log(error)
        return {result: false,error: 'Unexpected error occured while signing out'}
    }
}

export const userSignIn=async (data:SignInReqBody):Promise<SignInResponse> =>{
    try{
        const loginUrl=apiHelper.getLoginRoute()
        // console.log('Data is',data)
        const res=await fetch(loginUrl,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        const resData=await res.json()
        if(res.status===202)
        {
            return {
                result: true,
                token: resData.token,
                userId: resData.userId
            }
        }
        else
        return {
            result: false,
            message: resData.message
        }
    }
    catch(error)
    {
        console.log(error)
        return {
            result: false,
            message: 'Unexpected error occured while trying to login'
        }
    }
}


export const userSignUp=async (data:SignInReqBody):Promise<SignInResponse> =>{
    try{
        const loginUrl=apiHelper.getSignUpRoute()
        // console.log('Data is',data)
        const res=await fetch(loginUrl,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        const resData=await res.json()
        if(res.status===201)
        {
            return {
                result: true,
                token: resData.token,
                userId: resData.userId
            }
        }
        else
        return {
            result: false,
            message: resData.message
        }
    }
    catch(error)
    {
        console.log(error)
        return {
            result: false,
            message: 'Unexpected error occured while trying to login'
        }
    }
}

