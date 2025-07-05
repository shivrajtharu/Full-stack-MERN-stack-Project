import { useContext } from "react";
import Header from "../../components/header/index"
import SideBar from "../../components/sidebar/index"
import { MyContext } from "../../App";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    const context = useContext(MyContext);


  return (
    <>
      <section className="main">
        <Header />
        <div className="contentMain flex">
          <div
            className={`sidebarWrapper overflow-hidden ${
              context.isSideBarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
            } transition-all `}
          >
            <SideBar />
          </div>
          <div
        className={`contentRight py-4 px-5 ${
          context.isSideBarOpen === false ? "w-[100%]" : "w-[82%]"
        } transition-all`}
      >
        <Outlet /> {/* THIS RENDERS CHILD ROUTES */}
      </div>
            
        </div>
      </section>
    </>
  );
};

export default AdminLayout;
