import { Course, Trainer } from "@/types";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { coursesBaseURL } from "./config";

const baseURL = "http://localhost:5000/trainers";

export const QUERY_KEY = "trainers";

const getAll = () => {
  return useQuery<Trainer[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      try {
        const response = await fetch(baseURL);
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });
};

const getOne = (id: string) => {
  return useQuery<Trainer>({
    queryKey: [QUERY_KEY, id],
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
    mutationFn: async (trainer: Omit<Trainer, "id">) => {
      try {
        const response = await fetch(baseURL, {
          method: "POST",
          body: JSON.stringify(trainer),
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

const updateOne = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      trainer,
    }: {
      id: string;
      trainer: Partial<Trainer>;
    }) => {
      try {
        const response = await fetch(`${baseURL}/${id}`, {
          method: "PATCH",
          body: JSON.stringify(trainer),
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

const deleteOne = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`${baseURL}/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        data.courses.forEach(async (course: Course) => {
          try {
            await fetch(`${coursesBaseURL}/${course.id}`, {
              method: "DELETE",
            });
          } catch (err) {
            console.error(err);
          }
        });
        return data;
      } catch (err) {
        console.error(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, "courses", id] });
      return true;
    },
  });
};

export const useTrainers = () => ({
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
});
