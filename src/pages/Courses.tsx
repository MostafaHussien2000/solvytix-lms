import { useCourses } from "@/api/CourseService";
import AddCourseForm from "@/components/forms/AddCourseForm";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/ui/course-card";
import { Plus } from "lucide-react";
import { useState } from "react";

function Courses() {
  const [showAddForm, setShowAddForm] = useState(false);

  const { getAll } = useCourses();
  const { data: courses, isPending } = getAll();
  return (
    <div className="space-y-6 animate-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>

        <Button variant="default" onClick={() => setShowAddForm(true)}>
          <Plus /> Add Course
        </Button>
      </div>
      <AddCourseForm open={showAddForm} onClose={() => setShowAddForm(false)} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isPending ? (
          <p>Loading ....</p>
        ) : (
          courses?.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))
        )}
      </div>
    </div>
  );
}

export default Courses;
