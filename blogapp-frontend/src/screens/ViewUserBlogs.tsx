import { Helmet, HelmetProvider } from "react-helmet-async"
import ScreenWrapper from "../components/ScreenWrapper"
import DisplayBlogs from "../components/DisplayBlogs"

function ViewUserBlogs() {
  return (
    <HelmetProvider>
    <ScreenWrapper>
      <Helmet>
        <title>Blip | My Blogs</title>
      </Helmet>
      <DisplayBlogs showUserBlogs={true}/>
    </ScreenWrapper>
    </HelmetProvider>
  )
}

export default ViewUserBlogs
