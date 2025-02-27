import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Course } from "@/types";
import { useTrainers } from "@/api/TrainerService";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

function CourseCard({ course }: { course: Course }) {
  const { getOne } = useTrainers();
  const { data: trainer } = getOne(course.trainerId);
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="overflow-hidden cursor-pointer transition-colors duration-300 ease-in-out border-2 hover:border-primary">
        <div className="aspect-video relative">
          <img
            src={course.banner}
            alt={course.title}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
          <p className="text-muted-foreground">By: {trainer?.name}</p>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{course.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="font-bold">${course.price}</span>
            <span className="text-muted-foreground flex gap-1 items-center">
              <Clock size={16} />
              {course.numberOfHours}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CourseCard;
