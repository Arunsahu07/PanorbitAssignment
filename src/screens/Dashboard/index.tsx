import Layout from '../../components/Layout';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Dashboard;
