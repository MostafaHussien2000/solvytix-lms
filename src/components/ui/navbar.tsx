/* React Router DOM
=================== */
import { Link } from "react-router-dom";

/* UI Components
================ */
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">
              Training Hub
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center space-x-2">
          <Link to="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link to="/courses">
            <Button variant="ghost">Courses</Button>
          </Link>
          <Link to="/trainers">
            <Button variant="ghost">Trainers</Button>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Logout</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
