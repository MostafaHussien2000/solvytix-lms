import { useCourses } from "@/api/CourseService";
import { Button } from "@/components/ui/button";
import DeleteItemModal from "@/components/ui/delete-item";
import Loader from "@/components/ui/loader";
import { Clock, MoveLeft, Trash } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

function CourseDetails() {
  const [deleteCourseModal, setDeleteCourseModal] = useState<boolean>(false);
  const { id } = useParams();
  if (!id) return <Navigate to="/courses" />;

  const { getOne } = useCourses();
  const { data: course, isPending } = getOne(id);

  if (isPending)
    return (
      <center className="space-y-6">
        <Loader />
      </center>
    );

  if (!course) return <Navigate to="/courses" />;

  return (
    <div className="space-y-6 animate-in">
      <Link to="/courses" className="inline-flex items-center gap-2">
        <MoveLeft size={16} /> <span>Back to all courses.</span>
      </Link>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <div>
          <Button
            type="button"
            size={"icon"}
            variant={"destructive"}
            onClick={() => setDeleteCourseModal(true)}
          >
            <Trash size={"16"} />
          </Button>
          <DeleteItemModal
            itemType="Course"
            itemId={course.id}
            open={deleteCourseModal}
            onClose={() => setDeleteCourseModal(false)}
          />
        </div>
      </div>
      <div className="aspect-[21/9] relative rounded-2xl overflow-hidden">
        <img
          src={course.banner}
          alt={course.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold">${course.price}</span>
        <span className="text-muted-foreground flex gap-1 items-center">
          <Clock size={16} />
          {course.numberOfHours}
        </span>
      </div>
      <div>
        <p>{course.description}</p>
      </div>
    </div>
  );
}

export default CourseDetails;
