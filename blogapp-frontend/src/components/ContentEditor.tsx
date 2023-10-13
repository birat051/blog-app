import styles from '../styles/createblog.module.css'
import { ContentEditorPropType } from '../utils/BlogAppTypes'


function ContentEditor(props:ContentEditorPropType) {
  return (
    <div>
      {props.paragraphs.map((paragraph, index) => (
        <div key={index}>
          <textarea
            placeholder='Write your content here...'
            value={paragraph}
            onChange={(e) => props.handleParagraphChange(index, e.target.value)}
            onKeyDown={(e) => props.handleKeyDown(e, index)}
            className={styles.contentinput}
            ref={(el) => props.textareaRefs.current.set(index, el)} 
          />
        </div>
      ))}
    </div>
  )
}

export default ContentEditor
