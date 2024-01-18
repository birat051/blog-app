import { Helmet, HelmetProvider } from "react-helmet-async"
import ScreenWrapper from "../components/ScreenWrapper"
import styles from '../styles/createblog.module.css'
import TextEditor from "../components/TextEditor"
import { useEffect, useState } from "react"
import { getBlogDetails } from "../services/Blogs"
import { useParams } from "react-router-dom"
import { Blog } from "../utils/BlogAppTypes"
import LoadingOverlayWrapper from "react-loading-overlay-ts"
import errorStyle from "../styles/screenwrapper.module.css"

function UpdateBlogPage() {
  const { blogid } = useParams();
  const [isLoading, setisLoading] = useState(true)
  const [error, seterror] = useState('')
  const [blogDetail, setblogDetail] = useState<Blog | null>(null)
  useEffect(() => {
    async function getBlog(){
      try{
      const {result,message,blog}=await getBlogDetails(blogid!)
      if(!result)
      seterror(message!)
      else
      setblogDetail(blog!)
      }
      catch(e)
      {
        seterror('Unexpected error occured')
      }
      setisLoading(false)
    }
    getBlog()
  }, [])
  
  if(isLoading)
  return (
    <LoadingOverlayWrapper active={true} spinner>
    <ScreenWrapper >
      < >
      </>
    </ScreenWrapper> 
    </LoadingOverlayWrapper>
  )
  if(error && error.length>0)
  return (
    <ScreenWrapper >
      <p className={errorStyle.error}>{error}</p>
    </ScreenWrapper> 
  )
  return (
    <HelmetProvider>
    <ScreenWrapper>
      <Helmet>
        <title>Blip | Update blog</title>
      </Helmet>
      <div className={styles.createblogwrapper}>
      <TextEditor title={blogDetail!.title} content={blogDetail!.paragraphs} createType="update" imageUrl={blogDetail!.imageUrl!=null?blogDetail!.imageUrl:""} blogId={blogid}/>
      </div>
    </ScreenWrapper>
    </HelmetProvider>
  )
}

export default UpdateBlogPage
