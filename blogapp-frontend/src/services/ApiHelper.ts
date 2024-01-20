export class ApiHelper
{
    private baseUrl:string
    constructor(baseUrl:string)
    {
        this.baseUrl=baseUrl
    }
    getSignUpRoute()
    {
        return this.baseUrl + '/signup'
    }
    getLoginRoute()
    {
        return this.baseUrl + '/signin'
    }
    getLogoutRoute(userId:string)
    {
        return this.baseUrl + `/signout/user/${userId}`
    }
    getCreateBlogRoute(userId:string)
    {
        return this.baseUrl + `/create-blog/user/${userId}`
    }
    getUpdateBlogRoute(userId:string,blogId:string)
    {
        return this.baseUrl + `/update-blog/user/${userId}/blog/${blogId}`
    }
    getDeleteBlogRoute(userId:string,blogId:string)
    {
        return this.baseUrl + `/delete-blog/user/${userId}/blog/${blogId}`
    }
    getAllBlogsRoute(userId:string,page:number,limit:number)
    {
        return this.baseUrl + `/all-blogs/page/${page}?limit=${limit}&userid=${userId}`
    }
    getAllUserBlogsRoute(userId:string,pageNumber:number,limit:number)
    {
        return this.baseUrl + `/all-user-blogs/user/${userId}/page/${pageNumber}?limit=${limit}`
    }
    getBlogDetailsRoute(blogId:string)
    {
        return this.baseUrl + `/blog-details/${blogId}`
    }
    getValidateUserRoute(userId:string)
    {
        return this.baseUrl + `/validate-user/user/${userId}`
    }
    getUploadImageRoute(userId:string)
    {
        return this.baseUrl + `/upload-image/user/${userId}`
    }
}


const apiHelper = new ApiHelper(import.meta.env.VITE_API_URL || 'http://localhost:5001/v1')

export default apiHelper