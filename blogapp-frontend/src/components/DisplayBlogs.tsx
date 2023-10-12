import { useContext, useEffect, useState } from "react"
import styles from '../styles/displayblogs.module.css'
import { getAllBlogs, getAllUserBlogs } from "../services/Blogs"
import { Blog, BlogHeaderType, LoadingContextType } from "../utils/BlogAppTypes"
import { ScreenLoadingContext } from "./ScreenWrapper"
import BlogView from "./BlogView"

type DisplayBlogsProp=
{
    showUserBlogs: boolean
}

function DisplayBlogs(props:DisplayBlogsProp) {
  const {handleLoading}=useContext(ScreenLoadingContext)  as LoadingContextType
  const [pageNumber, setpageNumber] = useState(1)
  const [bloglist, setblogs] = useState<Blog[] | BlogHeaderType[]>([])
  let prevScrollPos = 0;
  const handleInfiniteScroll=()=>{
    const currentScrollPos = document.documentElement.scrollTop;
    if(currentScrollPos > prevScrollPos && document.documentElement.scrollTop + window.innerHeight + 1 >=document.documentElement.scrollHeight)
    setpageNumber((prev)=>prev+1)
    prevScrollPos = currentScrollPos;
  }
  useEffect(() => {
    async function getBlogs(userId:string,jwt:string)
    {
    handleLoading(true)
    const {result,message,blogs}= props.showUserBlogs? await getAllUserBlogs(userId,pageNumber,jwt): await getAllBlogs(userId,pageNumber,jwt)
    handleLoading(false)
    if (result && blogs) {
      if (props.showUserBlogs) {
        setblogs((prevBlogs) => [...(prevBlogs as BlogHeaderType[]), ...(blogs as BlogHeaderType[])]);
      } else {
        setblogs((prevBlogs) => [...(prevBlogs as Blog[]), ...(blogs as Blog[])]);
      }
    }
    else
    alert(message)
    }
    const userId=localStorage.getItem('userId')
    const jwt=localStorage.getItem('jwtToken')
    getBlogs(userId!,jwt!)
  }, [pageNumber])
  useEffect(() => {
    window.addEventListener('scroll',handleInfiniteScroll)
    return () => {
      window.removeEventListener('scroll',handleInfiniteScroll)
    }
  }, [])
  return (
    <div className={styles.displayblogcontainer}>
      {bloglist.map((blog:BlogHeaderType | Blog,index)=>{
        return (
          <BlogView blog={blog} self={props.showUserBlogs} key={blog._id+blog.createdAt+index}/>
        )
      })}
    </div>
  )
}

export default DisplayBlogs
