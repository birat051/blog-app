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
    getAllBlogsRoute(userId:string)
    {
        return this.baseUrl + `/all-blogs/user/${userId}`
    }
    getBlogDetailsRoute(userId:string,blogId:string)
    {
        return this.baseUrl + `/blog-details/user/${userId}/blog/${blogId}`
    }
    getValidateUserRoute(userId:string)
    {
        return this.baseUrl + `/validate-user/user/${userId}`
    }
}


const apiHelper = new ApiHelper(import.meta.env.VITE_APP_HOOT_NAME || 'localhost:5000/v1')

export default apiHelper