import { useTrainers } from "@/api/TrainerService";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CourseCard from "@/components/ui/course-card";
import {} from "@radix-ui/react-avatar";
import { MoveLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

function TrainerDetails() {
  const { id } = useParams();
  if (!id) return <Navigate to="/trainers" />;

  const { getOne } = useTrainers();
  const { data: trainer } = getOne(id);

  if (!trainer) return <Navigate to="/trainers" />;
  return (
    <div className="space-y-5">
      <Link to="/trainers" className="inline-flex items-center gap-2">
        <MoveLeft size={16} /> <span>Back to all trainers.</span>
      </Link>
      <div>
        <Avatar className="w-24 h-24 rounded-full">
          <AvatarImage src={trainer.image} />
          <AvatarFallback>
            {trainer.name.charAt(0).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold space-y-2">{trainer.name}</h1>
        <p className="inline-block bg-muted/50 px-3 py-1 rounded-full">
          ${trainer.hourlyRate}
          <span className="opacity-70">/h</span>
        </p>
      </div>
      <p className="bg-muted/50 p-4 rounded-md">{trainer.bio}</p>
      <h3 className="text-lg font-semibold">My Courses</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trainer.courses.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </div>
    </div>
  );
}

export default TrainerDetails;
