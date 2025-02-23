/* React Router DOM
=================== */
import { Outlet } from "react-router-dom";

/* UI Components
================ */
import Navbar from "@/components/ui/navbar";

function DashboardLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
