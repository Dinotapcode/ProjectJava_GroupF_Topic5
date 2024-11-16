import {BrowserRouter as Route, Routes, Switch } from 'react-router-dom';
import BlogPage from './BlogPage';
import BlogDetail from './BlogDetail';

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

export default BlogRouter;
