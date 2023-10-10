import PrivateRoute from './utils/PrivateRoute';
import {
    BrowserRouter as Router,
    Route, 
    Routes,
} from "react-router-dom";
import LoginPage from './screens/LoginPage';
import SignupPage from './screens/SignupPage';
import DashboardPage from './screens/Dashboard';
import CreateNewBlogPage from './screens/CreateNewBlog';
import UpdateBlogPage from './screens/UpdateBlogPage';
import ViewUserBlogs from './screens/ViewUserBlogs';

function AppRoutes() {
  return (
    <Router>
    <Routes>
    <Route path="/"  element={<PrivateRoute children={<DashboardPage />}/>} />
    <Route path="/create-blog" element={<PrivateRoute  children={<CreateNewBlogPage />}/>} />
    <Route path="/update-blog/:blogid" element={<PrivateRoute children={<UpdateBlogPage />}/>} />
    <Route  path="/user-blogs" element={<PrivateRoute children={<ViewUserBlogs />}/>} />
    <Route
        path="/login"
        element={<LoginPage />}
    />
     <Route
        path="/signup"
        element={<SignupPage />}
    />
  </Routes>
  </Router>
  )
}

export default AppRoutes