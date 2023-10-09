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
    <Route element={<PrivateRoute />}>
    <Route path="/" element={<DashboardPage />} />
    </Route>
    <Route element={<PrivateRoute />}>
    <Route path="/create-blog" element={<CreateNewBlogPage />} />
    </Route>
    <Route element={<PrivateRoute />}>
    <Route path="/update-blog/:blogid" element={<UpdateBlogPage />} />
    </Route>
    <Route element={<PrivateRoute />}>
    <Route path="/user-blogs" element={<ViewUserBlogs />} />
    </Route>
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