import { AllBlogsResponse, AllUserBlogsResponse, UploadImageResponse } from "../utils/BlogAppTypes"
import apiHelper from "./ApiHelper"

export const getAllBlogs=async (userId:string,pageNumber:number,jwt:string,limit=5):Promise<AllBlogsResponse>=>{
    try{
    console.log('Get all blogs is being invoked')
    const url=apiHelper.getAllBlogsRoute(userId,pageNumber,limit)
    const res=await fetch(url,{
        headers: {
            'Authorization': jwt,
            'Content-Type': 'application/json'
        }
    })
    const data=await res.json()
    if(res.status===200)
    {
        return {
            blogs: data.blogs,
            result: true
        }
    }
    else
    {
        return {
            message: data.message,
            result: false
        } 
    }
    }
    catch(error)
    {
        console.log(error)
        return {
            message: 'Unexpected error occured while fetching blogs',
            result: false
        } 
    }      
}

export const getAllUserBlogs=async (userId:string,pageNumber:number,jwt:string,limit=5):Promise<AllUserBlogsResponse>=>{
    try{
    const url=apiHelper.getAllUserBlogsRoute(userId,pageNumber,limit)
    const res=await fetch(url,{
        headers: {
            'Authorization': jwt,
            'Content-Type': 'application/json'
        }
    })
    const data=await res.json()
    if(res.status===200)
    {
        return {
            blogs: data.blogs,
            result: true
        }
    }
    else
    {
        return {
            message: data.message,
            result: false
        } 
    }
    }
    catch(error)
    {
        console.log(error)
        return {
            message: 'Unexpected error occured while fetching blogs',
            result: false
        } 
    }      
}

export const uploadBlogImage=async (userId:string,jwt:string,image:File):Promise<UploadImageResponse>=>{
    try{
    const formData = new FormData();
    formData.append('image', image);
    const url=apiHelper.getUploadImageRoute(userId)
    const res=await fetch(url,{
        method: 'POST',
        headers: {
            'Authorization': jwt,
        },
        body: formData
    })
    const data=await res.json()
    if(res.status===201)
    return {
    result: true,
    imageUrl: data.imageUrl
    }
    else
    return {
        result: false,
        message: data.message
    }
    }
    catch(error)
    {
        console.log(error)
        return {
            result: false,
            message: 'Unable to upload image. Unexpected error occured'
        }
    }
}