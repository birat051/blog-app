import ScreenWrapper from "../components/ScreenWrapper"
import DisplayBlogs from "../components/DisplayBlogs"
import { HelmetProvider,Helmet } from "react-helmet-async"

function DashboardPage() {
  return (
    <HelmetProvider>
    <ScreenWrapper>
      <Helmet>
        <title>Blip | Home</title>
      </Helmet>
      <DisplayBlogs showUserBlogs={false}/>
    </ScreenWrapper>
    </HelmetProvider>
  )
}

export default DashboardPage
