import { useCourses } from "@/api/CourseService";
import CourseCard from "@/components/ui/course-card";

function Courses() {
  const { getAll } = useCourses();
  const { data: courses, isPending } = getAll();
  console.log(courses);
  return (
    <div className="space-y-6 animate-in">
      <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
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
