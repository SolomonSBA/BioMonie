import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ContactPage from '@/pages/ContactPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/how" element={<HomePage />} />
      <Route path="/who" element={<HomePage />} />
      <Route path="/earn" element={<HomePage />} />
      <Route path="/merchants" element={<HomePage />} />
      <Route path="/faq" element={<HomePage />} />
      <Route path="/foin" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
