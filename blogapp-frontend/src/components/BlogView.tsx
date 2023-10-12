import { BlogViewType, User } from "../utils/BlogAppTypes"
import styles from '../styles/blogview.module.css'
import placeHolderImage from '../assets/placeholderImage.jpeg'

function BlogView(props:BlogViewType) {
  const uploadedAt=new Date(props.blog.createdAt)
  return (
    <div className={styles.blogviewcontainer}>
      {props.blog.imageUrl && <img src={props.blog.imageUrl} alt={`image for blog ${props.blog.title}`}/>}
      {!props.blog.imageUrl && <img src={placeHolderImage} alt={`placeholder image for blog ${props.blog.title}`}/>}
      <div>
        <h1>{props.blog.title}</h1>
        {!props.self && props.blog.userId && <p>Posted by <span>{(props.blog.userId as User).name}</span> on <span>{uploadedAt.toDateString()}</span></p>}
        {props.self  && <p>Posted on {uploadedAt.toDateString()}</p>}
      </div>
    </div>
  )
}

export default BlogView
