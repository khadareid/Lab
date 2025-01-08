import { createBrowserRouter, Outlet } from 'react-router-dom'
import DashRouter from './components/dashboard/DashRouter'
import { Form } from './components/ui/form'
import Home from './Homepage/Home/Home'
import { Table } from './components/ui/table'
import Dashboard from './components/dashboard/Dashboard'
import HameUpdate from './Homepage/Pages/AllPages'
import AllUser from './components/pages/AllUser/AllUser'
import Transaction from './components/pages/Transaction/Transaction'
import StaffEmplayee from './components/pages/StaffEmplayee/StaffEmplayee'
import Sales from './components/pages/Sales/Sales'
import MemberLab from './components/pages/MemberLab/MemberLab'
import Category from './components/pages/Category/Category'
import BorrowRecord from './components/pages/BorrowRecord/BorrowRecord'
import Book from './components/pages/Book/Book'
import Library from './components/pages/Library/Library'
import Oder from './components/pages/Oder/Oder'
const Router = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="">
        <HameUpdate />
      </div>

      <div className="body flex-grow">
        <Outlet />
      </div>

      <div className="footer">
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default Router

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Router />,
    children: [
      // { path: '/', element: <Dhexda /> },
      // { path: '/login', element: <Login /> },
      // { path: '/register', element: <Registeration /> }
      // { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashRouter />,
    children: [
      { path: 'Form', element: <Form /> },
      { path: 'Table', element: <Table /> },

      // 
      { path: 'Overview', element: <Dashboard /> },
      { path: 'UserAccount', element: <AllUser /> },
      { path: 'Transactions', element: <Transaction /> },
      { path: 'StaffEmployee', element: <StaffEmplayee /> },
      { path: 'Sales', element: <Sales /> },
      { path: 'Orders', element: <Oder /> },
      { path: 'MemberLab', element: <MemberLab /> },
      { path: 'Category', element: <Category /> },
      { path: 'BorrowRecords', element: <BorrowRecord /> },
      { path: 'Books', element: <Book /> },
      { path: 'Table', element: <Library /> },
      
     
    ],
    
  },
])
