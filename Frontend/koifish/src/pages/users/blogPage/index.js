import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import BlogRouter from './BlogRouter';  // Import BlogRouter
import './style.scss'; 

function App() {
  return (
    <Router>
      <BlogRouter />  {/* Chỉ render BlogRouter */}
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
