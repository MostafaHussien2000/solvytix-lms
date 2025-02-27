import { Trainer } from "@/types";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

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
    mutationFn: async ({ id, trainer }: { id: string; trainer: Trainer }) => {
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
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
