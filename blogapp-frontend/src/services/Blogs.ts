import { AllBlogsResponse, AllUserBlogsResponse } from "../utils/BlogAppTypes"
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