import { useNavigate } from 'react-router-dom'
import styles from '../styles/updateoptions.module.css'
import useLocalStorage from '../hooks/useLocalStorage'
import { deleteBlog } from '../services/Blogs'
import { UserBlogsContext } from './DisplayBlogs'
import { UserBlogsContextType } from '../utils/BlogAppTypes'
import { useContext } from 'react'


type UpdateOptionsProp=
{
    blogId:string,
    hidePopup: ()=>void
}

function UpdateOptions(props:UpdateOptionsProp) {
  const {removeBlog}=useContext(UserBlogsContext)  as UserBlogsContextType
  const navigate=useNavigate()
  const [jwt,userId]=useLocalStorage()
  const deleteHandler=async ()=>{
    const {result,message}=await deleteBlog(userId!,jwt!,props.blogId)
    if(!result)
    alert(message)
    else
    {
        alert('The blog has been deleted')
        removeBlog(props.blogId)
    }
  }
  return (
    <div className={styles.optioncontainer} onMouseLeave={props.hidePopup}>
      <h2 onClick={()=>navigate(`/update-blog/${props.blogId}`)}>Update</h2>
      <h2 onClick={deleteHandler}>Delete</h2>
    </div>
  )
}

export default UpdateOptions
