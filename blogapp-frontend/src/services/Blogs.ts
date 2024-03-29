import { AllBlogsResponse, AllUserBlogsResponse, BaseResponse, BlogDetailsResponse, BlogRequestBody, CreateBlogResponse, UploadImageResponse } from "../utils/BlogAppTypes"
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

export const createBlogPost=async (userId:string,jwt:string,body:BlogRequestBody):Promise<CreateBlogResponse>=>{
    try{
        const url=apiHelper.getCreateBlogRoute(userId)
        const res=await fetch(url,{
            method: 'POST',
            headers: {
                'Authorization': jwt,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data=await res.json()
        if(res.status===201)
        return {
            result:true,
            blogId:data.blog._id
        }
        else
        return {
            result:false,
            message: data.message
        }
    }
    catch(error)
    {
        console.log(error)
        return {
            result:false,
            message: 'Unable to create blog, unexpected error occured'
        }
    }
}

export const getBlogDetails=async (blogId:string):Promise<BlogDetailsResponse>=>{
    try
    {
    const url=apiHelper.getBlogDetailsRoute(blogId)
    const res=await fetch(url,{
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data=await res.json()
    if(res.status===200)
        return {
            result: true,
            blog:data.blog
        }
    else
    return {
        result: false,
        message:data.message
    }
    }
    catch(e)
    {
        return {
            result:false,
            message: 'Unexpected error occured'
        }
    }
}

export const updateBlog=async (userId:string,jwt:string,blogId:string,body:BlogRequestBody):Promise<BaseResponse>=>{
    try{
        const url=apiHelper.getUpdateBlogRoute(userId,blogId)
        const res=await fetch(url,{
            method: 'PUT',
            headers: {
                'Authorization': jwt,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data=await res.json()
        if(res.status===200)
        return {
            result: true,
        }
        else
        return {
            result: false,
            message: data.message
        }
    }
    catch(e)
    {
        console.log(e)
        return {
            result: false,
            message: 'Couldn\'t save changes. Unexpected error occured'
        }
    }
}

export const deleteBlog=async (userId:string,jwt:string,blogId:string):Promise<BaseResponse>=>{
    try{
        const url=apiHelper.getDeleteBlogRoute(userId,blogId)
        const res=await fetch(url,{
            method: 'DELETE',
            headers: {
                'Authorization': jwt,
                'Content-Type': 'application/json'
            },
        })
        if(res.status===200)
        return {
            result:true
        }
        else
        {
            const data=await res.json()
            return {
                result:false,
                message: data.message
            }
        }
    }
    catch(e)
    {
        return {
            result:false,
            message: 'Couldn\'t delete the blog. Unexpected error occured'
        }
    }
}