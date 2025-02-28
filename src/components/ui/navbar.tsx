/* React Router DOM
=================== */
import { Link } from "react-router-dom";

/* UI Components
================ */
import { Button } from "@/components/ui/button";
import ThemeToggle from "../ThemeToggle";

import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./sheet";
import { Menu } from "lucide-react";

function Navbar() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link to="/dashboard">
        <Button variant="ghost" onClick={() => isMobile && setIsOpen(false)}>
          Dashboard
        </Button>
      </Link>
      <Link to="/courses">
        <Button variant="ghost" onClick={() => isMobile && setIsOpen(false)}>
          Courses
        </Button>
      </Link>
      <Link to="/trainers">
        <Button variant="ghost" onClick={() => isMobile && setIsOpen(false)}>
          Trainers
        </Button>
      </Link>
    </>
  );

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">
              Training Hub
            </span>
          </Link>
        </div>

        {!isMobile && (
          <div className="flex flex-1 items-center justify-center space-x-2">
            <NavLinks />
          </div>
        )}
        {/* 
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
          <ThemeToggle />
          <Button variant="ghost">Logout</Button>
          </div> */}

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {isMobile ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[250px] pt-12"
                aria-describedby={undefined}
              >
                <SheetTitle></SheetTitle>
                <div className="flex flex-col space-y-4">
                  <NavLinks />
                  <Button variant="ghost" className="justify-start">
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button variant="ghost">Logout</Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
