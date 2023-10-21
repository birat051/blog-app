import { useContext,  useState } from 'react';
import styles from '../styles/createblog.module.css'
import ContentEditor from './ContentEditor';
import { ScreenLoadingContext } from './ScreenWrapper';
import { LoadingContextType } from '../utils/BlogAppTypes';
import { createBlogPost, updateBlog } from '../services/Blogs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faImage } from '@fortawesome/free-solid-svg-icons';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import useContentParagraphs from '../hooks/useContentParagraphs';
import useImage from '../hooks/useImage';


type TextEditorProp={
  createType: 'update' | 'create',
  title: string,
  content: string[],
  imageUrl: string,
  blogId?: string
}

function TextEditor (props:TextEditorProp) {
  const [paragraphs,handleParagraphChange,handleKeyDown,textareaRefs] = useContentParagraphs(props.content)
  const [title, settitle] = useState(props.title)
  const navigate=useNavigate()
  const [jwt,userId]=useLocalStorage()
  const [image,blogImageUrl,changePreviewImage,removePreviewImage]=useImage(props.imageUrl)
  const {handleLoading} =useContext(ScreenLoadingContext) as LoadingContextType
  const changeTitle=(e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    settitle(e.target.value)
  }
  const validateInput=()=>{
    if(title.length===0)
    {
      alert('Title should not be empty')
      return false
    }
    if(paragraphs.length===0 && paragraphs[0].length===0)
    {
      alert('Add some content')
    return false
    }
    return true
  }
  const getRequestBody=()=>{
    return blogImageUrl.length>0 ? {
      title: title,
      paragraphs: paragraphs,
      imageUrl: blogImageUrl
    }:{
      title: title,
      paragraphs: paragraphs,
    }
  }
  const createBlogHandler=async (e: React.FormEvent)=>{
    e.preventDefault()
    if(!validateInput)
    return
    const body= getRequestBody()
    handleLoading(true)
    const {result,blogId,message}=  await createBlogPost(userId!,jwt!,body)
    handleLoading(false)
    if(result)
    navigate(`/blog/${blogId}`,{replace:true})
    else
    alert(message)
  }
  const updateBlogHandler=async (e: React.FormEvent)=>{
    e.preventDefault()
    if(!validateInput)
    return
    const body= getRequestBody()
    handleLoading(true)
    const {result,message}=await updateBlog(userId!,jwt!,props.blogId!,body)
    handleLoading(false)
    if(result)
    navigate(`/blog/${props.blogId!}`,{replace:true})
    else
    alert(message)
  }
  return (
    <form className={styles.texteditorwrapper} onSubmit={props.createType==='create'?createBlogHandler:updateBlogHandler}>
      <div className={styles.topBar}>
      <button className={styles.publishbutton} type="submit">Publish</button>
      </div>
      {(blogImageUrl || blogImageUrl.length===0) && (
        <div className={styles.imageInputContainer}>
          <label htmlFor="imageInput" className={styles.imageInputLabel}>
            <FontAwesomeIcon icon={faImage} style={{marginRight: '5px',cursor:'pointer'}}/>
            Add a preview image
          </label>
          <input
            id="imageInput"
            type="file"
            onChange={changePreviewImage}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
      )}
      {blogImageUrl && blogImageUrl.length>0 && 
      <div className={styles.previewImageContainer}>
        <img src={blogImageUrl} alt="Blog preview image" />
        <div className={styles.previewImage} />
        <FontAwesomeIcon icon={faClose} style={{position:'absolute',right:'20',top: '5',color: 'grey',cursor:'pointer',fontSize:'1.25rem',zIndex: '3'}} className={styles.closeIcon} onClick={removePreviewImage}/>
      </div>}
      <input className={styles.titleinput} placeholder='Title' onChange={changeTitle} value={title}/>
      <ContentEditor paragraphs={paragraphs} handleParagraphChange={handleParagraphChange} handleKeyDown={handleKeyDown} textareaRefs={textareaRefs} />
    </form>
  )
}

export default TextEditor
