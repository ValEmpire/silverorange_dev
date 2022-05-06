import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/index';
import CommitPage from './pages/Commit.page';
import './App.css';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<CommitPage />} />
      </Routes>
    </Router>
  );
}
