import { BlogViewType, User } from "../utils/BlogAppTypes"
import styles from '../styles/blogview.module.css'
import placeHolderImage from '../assets/placeholderImage.jpeg'
import { Link } from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical"
import UpdateOptions from "./UpdateOptions"

function BlogView(props:BlogViewType) {
  const uploadedAt=new Date(props.blog.createdAt)
  const [popupVisible, setpopupVisible] = useState(false)
  return (
    <div className={styles.blogviewcontainer}>
      {props.blog.imageUrl && <img src={props.blog.imageUrl} alt={`image for blog ${props.blog.title}`}/>}
      {!props.blog.imageUrl && <img src={placeHolderImage} alt={`placeholder image for blog ${props.blog.title}`}/>}
      <div>
        <Link to={`/blog/${props.blog._id}`} className={styles.blogTitle}>{props.blog.title}</Link>
        {!props.self && props.blog.userId && <p>Posted by <span>{(props.blog.userId as User).name}</span> on <span>{uploadedAt.toDateString()}</span></p>}
        {props.self  && <p>Posted on {uploadedAt.toDateString()}</p>}
      </div>
      {props.self && <FontAwesomeIcon icon={faEllipsisVertical} style={{color: 'grey',cursor: 'pointer'}} onMouseOver={()=>setpopupVisible(true)}/>}
      {popupVisible && <UpdateOptions blogId={props.blog._id} hidePopup={()=>setpopupVisible(false)}/>}
    </div>
  )
}

export default BlogView
