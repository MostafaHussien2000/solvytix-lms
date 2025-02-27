import { Course } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const baseURL = "http://localhost:5000/courses";

const getAll = () => {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch(baseURL);
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
        const response = await fetch(`${baseURL}/${id}`);
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
        const response = await fetch(baseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            body: JSON.stringify(course),
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
        const response = await fetch(`${baseURL}/${id}`, {
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
        const response = await fetch(`${baseURL}/${id}`, {
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
