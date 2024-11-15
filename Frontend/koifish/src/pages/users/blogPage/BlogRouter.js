import {BrowserRouter as Route, Routes, Switch } from 'react-router-dom';
import BlogPage from './BlogPage';
import BlogDetail from './BlogDetail';

<<<<<<< HEAD
const BlogRouter = () => (
  <Router>
    <Switch>
    <Route exact path="/" component={BlogPage} />
    <Route exact path="/post/:id" component={BlogDetail} />
    </Switch>
  </Router>
);  
=======
const BlogRouter = () => {
  return (
    <Routes>
      <Switch>
        <Route path="/" Component={BlogPage} />
        <Route path="/blog/:id" Component={BlogDetail} />
      </Switch>
    </Routes>
  );
};
>>>>>>> b225cd61f3bfb2d8e814dbd56e110c0f885314a7

export default BlogRouter;
