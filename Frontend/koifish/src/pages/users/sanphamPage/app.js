// src/App.js hoặc file routing tương ứng
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SanphamPage from './pages/SanphamPage';
import ProductDetailPage from './pages/ProductDetailPage';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/sanpham" exact component={SanphamPage} />
                <Route path="/sanpham/:id" component={ProductDetailPage} />
                {/* Các route khác */}
            </Switch>
        </Router>
    );
};

export default App;
