import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const MainLayout = () => {
  return (
    <Fragment>
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Navbar />
          <Outlet />
        </main>
      </div>
    </Fragment>
  );
};

export default MainLayout;
