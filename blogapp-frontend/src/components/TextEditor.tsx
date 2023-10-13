import { useEffect, useRef, useState } from 'react';
import styles from '../styles/createblog.module.css'
import ContentEditor from './ContentEditor';

function TextEditor() {
  const [paragraphs, setParagraphs] = useState(['']);
  const textareaRefs = useRef(new Map<number, HTMLTextAreaElement | null>());
  const [activeNode, setactiveNode] = useState(0)
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
      <button className={styles.publishbutton} type="submit">Publish</button>
      <input className={styles.titleinput} placeholder='Title' />
      <ContentEditor paragraphs={paragraphs} handleParagraphChange={handleParagraphChange} handleKeyDown={handleKeyDown} textareaRefs={textareaRefs} />
    </form>
  )
}

export default TextEditor
