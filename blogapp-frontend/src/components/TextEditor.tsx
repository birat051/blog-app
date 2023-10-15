import { useContext, useEffect, useRef, useState } from 'react';
import styles from '../styles/createblog.module.css'
import ContentEditor from './ContentEditor';
import { ScreenLoadingContext } from './ScreenWrapper';
import { LoadingContextType } from '../utils/BlogAppTypes';
import { uploadBlogImage } from '../services/Blogs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faImage } from '@fortawesome/free-solid-svg-icons';

function TextEditor() {
  const [paragraphs, setParagraphs] = useState(['']);
  const [image, setimage] = useState<File | null>()
  const textareaRefs = useRef(new Map<number, HTMLTextAreaElement | null>());
  const {handleLoading} =useContext(ScreenLoadingContext) as LoadingContextType
  const [activeNode, setactiveNode] = useState(0)
  const [blogImageUrl, setblogImageUrl] = useState('')
  const addParagraphAfter = (index: number) => {
    const newParagraphs = [...paragraphs];
    newParagraphs.splice(index + 1, 0, '');
    setactiveNode(index+1)
    setParagraphs(newParagraphs);
  };
  const removeParagraph = (index:number) => {
    if(paragraphs.length===1)
    return
    const newParagraphs = [...paragraphs];
    newParagraphs.splice(index, 1);
    setactiveNode(index-1)
    setParagraphs(newParagraphs);
  };
  const handleParagraphChange = (index:number, value:string) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = value;
    setParagraphs(newParagraphs);
  };
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addParagraphAfter(index);
    } else if (e.key === 'Backspace' && paragraphs[index] === '') {
      e.preventDefault();
      removeParagraph(index);
    }
  };
  const changePreviewImage=(event: React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault()
    const file = event.target.files?.[0];
    if (file) {
        setimage(file);
    }
  }
  const removePreviewImage=()=>{
    setblogImageUrl('')
    setimage(null)
  }
  useEffect(() => {
    async function uploadImage(userId:string,jwt:string)
    {
        handleLoading(true)
        const {result,message,imageUrl} = await uploadBlogImage(userId,jwt,image!)
        handleLoading(false)
        if(!result)
        alert(message)
        else
        setblogImageUrl(imageUrl!)
    }
    if(image)
    {
        const jwt=localStorage.getItem('jwtToken')
        const userId=localStorage.getItem('userId')
        uploadImage(userId!,jwt!)
    }
  }, [image])
  
  useEffect(() => {
    // Focus the newly added textarea
    const lastIndex = paragraphs.length - 1;
    if (lastIndex >= 0) {
      const textarea = textareaRefs.current.get(activeNode);
      if (textarea) {
        textarea.focus();
      }
    }
  }, [paragraphs.length]);
  return (
    <form className={styles.texteditorwrapper}>
      <div className={styles.topBar}>
      <button className={styles.publishbutton} type="submit">Publish</button>
      </div>
      {!image && (
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
      <input className={styles.titleinput} placeholder='Title' />
      <ContentEditor paragraphs={paragraphs} handleParagraphChange={handleParagraphChange} handleKeyDown={handleKeyDown} textareaRefs={textareaRefs} />
    </form>
  )
}

export default TextEditor
