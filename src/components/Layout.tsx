import { PropsWithChildren } from 'react';
import DashboardNavbar from './DashboardNavbar';
import Sidenav from './Sidenav';
import ChatBox from './ChatBox';
const Layout = (props: PropsWithChildren) => {
  return (
    <div className=" min-h-screen ">
      <Sidenav />
      <div className="p-4 ml-72">
        <DashboardNavbar />
        <div className="py-4 ">{props.children}</div>
        <ChatBox />
      </div>
    </div>
  );
};

export default Layout;
