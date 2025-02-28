import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTrainers } from "@/api/TrainerService";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Plus } from "lucide-react";
import { Course, Trainer } from "@/types";
import {
  TrainerInput,
  validationSchema,
} from "@/validation/trainerValidationSchema";
import { z } from "zod";
import Loader from "../ui/loader";

interface AddTrainerFormProps {
  open: boolean;
  onClose: () => void;
}

const defaultValues: Omit<TrainerInput, "imageFile"> = {
  name: "",
  bio: "",
  hourlyRate: 0,
  image: "",
};

function AddTrainerForm({ open, onClose }: AddTrainerFormProps) {
  const { addOne } = useTrainers();
  const mutation = addOne();

  const methods = useForm<TrainerInput>({
    mode: "onBlur",
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = (data: TrainerInput) => {
    const trainer: Omit<Trainer, "id"> = {
      name: data.name,
      bio: data.bio,
      image: data.image,
      hourlyRate: data.hourlyRate,
      courses: [],
    };

    mutation.mutate(trainer, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {},
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add New Trainer</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trainer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter trainer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Enter trainer bio"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate in US Dollar</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Place a trainer's hourly rate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="imageFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trainer's Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      {...field}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];

                        field.onChange(e.target.files);

                        if (file && file.type.startsWith("image/")) {
                          const reader = new FileReader();

                          reader.onload = () => {
                            methods.setValue("image", reader.result as string);
                          };

                          reader.readAsDataURL(file);
                        }
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      value={undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <Button
              type="submit"
              className="w-full"
              loading={methods.formState.isSubmitting ? "loading" : "static"}
            >
              {methods.formState.isSubmitting && <Loader />}
              Add Trainer
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTrainerForm;
