import { Course } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesBaseURL, trainersBaseURL } from "./config";

const getAll = () => {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch(coursesBaseURL);
      const data = await response.json();
      return data;
    },
  });
};

const getOne = (id: string) => {
  return useQuery<Course>({
    queryKey: ["courses", id],
    queryFn: async () => {
      try {
        const response = await fetch(`${coursesBaseURL}/${id}`);
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });
};

const addOne = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (course: Omit<Course, "id">) => {
      try {
        const courseResponse = await fetch(coursesBaseURL, {
          method: "POST",
          body: JSON.stringify(course),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!courseResponse.ok) throw new Error("Failed to add this course.");

        const createdCourse = await courseResponse.json();

        const trainerResponse = await fetch(
          `${trainersBaseURL}/${createdCourse.trainerId}`
        );
        if (!trainerResponse.ok) throw new Error("Trainer not found.");
        const trainer = await trainerResponse.json();

        const updatedTrainer = {
          ...trainer,
          courses: [...trainer.courses, createdCourse],
        };

        const updateTrainerResponse = await fetch(
          `${trainersBaseURL}/${trainer.id}`,
          {
            method: "PATCH",
            body: JSON.stringify(updatedTrainer),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!updateTrainerResponse.ok) {
          throw new Error("Failed to add course to this trainer's list.");
        }

        return createdCourse;
      } catch (err) {
        console.error(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", "trainers"] });
    },
  });
};

const updateOne = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updatedCourse,
    }: {
      id: string;
      updatedCourse: Partial<Course>;
    }) => {
      try {
        const response = await fetch(`${coursesBaseURL}/${id}`, {
          method: "PATCH",
          body: JSON.stringify(updatedCourse),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

const deleteOne = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await fetch(`${coursesBaseURL}/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

export const useCourses = () => ({
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
});
