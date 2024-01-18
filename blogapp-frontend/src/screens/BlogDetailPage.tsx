import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogDetails } from '../services/Blogs';
import LoadingScreen from '../components/LoadingScreen';
import { User } from '../utils/BlogAppTypes';
import styles from '../styles/blogpage.module.css'

function BlogDetailPage() {
  const params = useParams();
  const blogId = params.blogid;
  const [imageUrl, setimageUrl] = useState<string | null>(null)
  const [title, settitle] = useState<string | null>(null)
  const [content, setcontent] = useState<string[] | null>(null)
  const [username,setusername] = useState<string | null>(null)
  const [createdAt,setCreatedAt] = useState<Date | null>(null)
  useEffect(() => {
    async function fetchBlogDetails()
    {
      const res=await getBlogDetails(blogId!)
      if(res.result)
      {
        settitle(res.blog!.title)
        setcontent([...res.blog!.paragraphs])
        setimageUrl(res.blog!.imageUrl)
        setusername((res.blog!.userId as User).name??null)
        setCreatedAt(res.blog?.createdAt!)
      }
    }
    fetchBlogDetails()
  }, [])
  return (
    <Suspense fallback={<LoadingScreen />}>
    <div className={styles.blogpage}>
      {title && <h1 aria-label={`Blog heading ${title}`}>{title}</h1>}
      {username && <h2 aria-label={`Author name ${username} and uploaded at ${createdAt!.toISOString()}`}>Posted by {username} {createdAt && <span>on {createdAt.toISOString()}</span>} </h2>}
      {imageUrl && <img src={imageUrl} alt={`Image for ${title} blog`}/>}
      {content && content.map((value,index)=>{
        return (<p aria-label={value} key={index}>
          {value}
        </p>)
      })}   
    </div>
    </Suspense>
  )
}

export default BlogDetailPage
