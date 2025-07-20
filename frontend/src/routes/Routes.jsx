import { Routes, Route } from 'react-router-dom';
import SidebarLayout from '../layouts/SidebarLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import Items from '../pages/items';
import Invoices from '../pages/invoices';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<SidebarLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/item" element={<Items />} />
        <Route path="/invoice" element={<Invoices />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
