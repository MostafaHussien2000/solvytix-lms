/* React Router DOM
=================== */
import { Routes, Route, Navigate } from "react-router-dom";

/* Pages
======== */
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Courses from "@/pages/Courses";
import Trainers from "@/pages/Trainers";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/trainers" element={<Trainers />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
