import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminUsers from '../src/Admin/views/Users/UsersList';
import AdminDashboard from '../src/Admin/views/Prios/PriosList';

function AdminApp() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </Router>
  );
}

export default AdminApp;
