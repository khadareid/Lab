import { createBrowserRouter, Outlet } from 'react-router-dom';
import DashRouter from './components/dashboard/DashRouter';
import Dashboard from './components/dashboard/Dashboard';
import AllUser from './components/pages/AllUser/AllUser';
import Transaction from './components/pages/Transaction/Transaction';
import StaffEmplayee from './components/pages/StaffEmplayee/StaffEmplayee';
import Sales from './components/pages/Sales/Sales';
import MemberLab from './components/pages/MemberLab/MemberLab';
import Category from './components/pages/Category/Category';
import BorrowRecord from './components/pages/BorrowRecord/BorrowRecord';
import Book from './components/pages/Book/Book';
import Library from './components/pages/Library/Library';
import Oder from './components/pages/Oder/Oder';
import CreateUser from './components/pages/AllUser/CreateUser';
import Login from './components/pages/AllUser/Login';
import NotFound from './Homepage/Pages/NotFound';
import Page from './Homepage/Pages/AllPages';
import CreateCtgy from './components/pages/Category/CreateCtgy';
import Upadate from './components/pages/Category/Upadate';
import CrMembar from './components/pages/MemberLab/CrMembar';

const Router = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        {/* <HameUpdate /> */}
      </div>

      <div className="body flex-grow">
        <Outlet />
      </div>

      <div className="footer">
        {/* Footer */}
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Router />,
    children: [
      { path: '/', element: <Page /> },
      { path: '/login', element: <Login /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashRouter />,
    children: [
      { path: 'Overview', element: <Dashboard /> },
      { path: 'UserAccount', element: <AllUser /> },
      { path: 'transactions', element: <Transaction /> },
      { path: 'StaffEmployee', element: <StaffEmplayee /> },
      { path: 'sales', element: <Sales /> },
      { path: 'orders', element: <Oder /> },
      { path: 'MemberLab', element: <MemberLab /> },
     
      { path: 'BorrowRecords', element: <BorrowRecord /> },
      { path: 'books', element: <Book /> },
      { path: 'library', element: <Library /> },
      { path: 'CreateUser', element: <CreateUser /> },
      { path: 'CreateCtgy', element: <CreateCtgy /> },

      { path: 'CrMembar', element: <CrMembar /> },

      

      {
        path: 'Category',
        children: [
          { index: true, element: <Category /> },
          { path: 'Upadate/:id', element: <Upadate /> },
          // { path: 'DeleteCat/:id', element: <DeleteCategoryButton /> },
        ],
      },
    ],
  },
]);
