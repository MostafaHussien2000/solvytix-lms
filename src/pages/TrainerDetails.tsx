import { useTrainers } from "@/api/TrainerService";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/ui/course-card";
import DeleteItemModal from "@/components/ui/delete-item";
import Loader from "@/components/ui/loader";
import { MoveLeft, Trash } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

function TrainerDetails() {
  const [deleteTrainerModal, setDeleteTrainerModal] = useState<boolean>(false);
  const { id } = useParams();
  if (!id) return <Navigate to="/trainers" />;

  const { getOne } = useTrainers();
  const { data: trainer, isPending } = getOne(id);

  if (isPending)
    return (
      <center className="space-y-6">
        <Loader />
      </center>
    );

  if (!trainer) return <Navigate to="/trainers" />;
  return (
    <div className="space-y-5">
      <Link to="/trainers" className="inline-flex items-center gap-2">
        <MoveLeft size={16} /> <span>Back to all trainers.</span>
      </Link>
      <div className="flex justify-between items-start">
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
        <div>
          <Button
            type="button"
            size={"icon"}
            variant={"destructive"}
            onClick={() => setDeleteTrainerModal(true)}
          >
            <Trash size={"16"} />
          </Button>
          <DeleteItemModal
            itemType="Trainer"
            itemId={trainer.id}
            open={deleteTrainerModal}
            onClose={() => setDeleteTrainerModal(false)}
          />
        </div>
      </div>
      <p className="bg-muted/50 p-4 rounded-md">{trainer.bio}</p>
      <h3 className="text-lg font-semibold">My Courses</h3>
      {trainer.courses.length > 1 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trainer.courses.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>
      ) : (
        <>
          <center className="space-y-5 text-muted w-full">
            No courses yet.
          </center>
        </>
      )}
    </div>
  );
}

export default TrainerDetails;
