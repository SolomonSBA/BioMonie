import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import AppPolicyPage from '@/pages/AppPolicyPage';
import TermsConditionsPage from '@/pages/TermsConditionsPage';
import ContactPage from '@/pages/ContactPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/how" element={<HomePage />} />
      <Route path="/who" element={<HomePage />} />
      <Route path="/earn" element={<HomePage />} />
      <Route path="/merchants" element={<HomePage />} />
      <Route path="/faq" element={<HomePage />} />
      <Route path="/join" element={<HomePage />} />
      <Route path="/products" element={<HomePage />} />
      <Route path="/for-customers" element={<HomePage />} />
      <Route path="/for-merchants" element={<HomePage />} />
      <Route path="/for-agents" element={<HomePage />} />
      <Route path="/foin" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/app-policy" element={<AppPolicyPage />} />
      <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
      <Route path="/app-terms" element={<TermsConditionsPage appVersion />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
