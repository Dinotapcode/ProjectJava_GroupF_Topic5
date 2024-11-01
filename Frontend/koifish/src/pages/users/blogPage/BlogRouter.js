import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlogPage from './pages/users/blogPage/BlogPage';
import BlogDetail from './pages/users/blogPage/BlogDetail';

const BlogRouter = () => (
  <Router>
    <Switch>
    <Route exact path="/" component={BlogPage} />
    <Route exact path="/blog/:id" component={BlogDetail} />
    </Switch>
  </Router>
);

export default BlogRouter;
