import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { useCourses } from "@/api/CourseService";
import { useTrainers } from "@/api/TrainerService";
import { useNavigate } from "react-router-dom";

interface DeleteItemButtonProps {
  itemType: "Trainer" | "Course";
  itemId: string;
  open: boolean;
  onClose: () => void;
}

function DeleteItemModal({
  itemId,
  itemType,
  open,
  onClose,
}: DeleteItemButtonProps) {
  let navigate = useNavigate();
  const { deleteOne: deleteOneCourse } = useCourses();
  const courseMutation = deleteOneCourse(itemId);

  const { deleteOne: deleteOneTrainer } = useTrainers();
  const trainerMutation = deleteOneTrainer(itemId);

  const deleteCourse = () => {
    courseMutation.mutate(undefined, {
      onSuccess: () => {
        onClose();
        navigate({ pathname: "/courses" });
      },
      onError: (error) => {
        onClose();
      },
    });
  };

  const deleteTrainer = () => {
    trainerMutation.mutate(undefined, {
      onSuccess: () => {
        onClose();
        navigate({ pathname: "/trainers" });
      },
      onError: () => {
        onClose();
      },
    });
  };

  const deleteItem = itemType === "Course" ? deleteCourse : deleteTrainer;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete {itemType} !</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {itemType.toLocaleLowerCase()}{" "}
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={deleteItem}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteItemModal;
