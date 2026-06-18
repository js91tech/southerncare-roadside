import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import { PublicLayout, AdminLayout } from '@/components/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { BookPage } from '@/pages/BookPage';
import { SOSPage } from '@/pages/SOSPage';
import { ContactPage } from '@/pages/ContactPage';
import { LoginPage } from '@/pages/admin/LoginPage';
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { InvoiceNewPage } from '@/pages/admin/InvoiceNewPage';
import { InvoiceEditPage } from '@/pages/admin/InvoiceEditPage';

function TabRedirect() {
  const [params] = useSearchParams();
  const tab = params.get('tab');
  const sos = params.get('sos');
  if (sos === '1') return <Navigate to="/sos" replace />;
  if (tab === 'book') return <Navigate to="/book" replace />;
  return <HomePage />;
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicLayout>
            <TabRedirect />
          </PublicLayout>
        }
      />
      <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
      <Route path="/book" element={<PublicLayout><BookPage /></PublicLayout>} />
      <Route path="/sos" element={<PublicLayout><SOSPage /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

      <Route path="/admin/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout><DashboardPage /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/invoices/new"
        element={
          <ProtectedRoute>
            <AdminLayout><InvoiceNewPage /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/invoices/:id"
        element={
          <ProtectedRoute>
            <AdminLayout><InvoiceEditPage /></AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
