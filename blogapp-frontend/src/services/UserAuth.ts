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

