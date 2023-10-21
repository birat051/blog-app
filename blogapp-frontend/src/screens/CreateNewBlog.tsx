import { Helmet, HelmetProvider } from "react-helmet-async"
import ScreenWrapper from "../components/ScreenWrapper"
import styles from '../styles/createblog.module.css'
import TextEditor from "../components/TextEditor"

function CreateNewBlogPage() {
  return (
    <HelmetProvider>
    <ScreenWrapper>
      <Helmet>
        <title>Blip | New blog</title>
      </Helmet>
      <div className={styles.createblogwrapper}>
      <TextEditor createType="create" title="" content={[""]} imageUrl=""/>
      </div>
    </ScreenWrapper>
    </HelmetProvider>
  )
}

export default CreateNewBlogPage
