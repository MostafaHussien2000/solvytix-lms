import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CourseInput,
  validationSchema,
} from "@/validation/courseValidationSchema";
import { useCourses } from "@/api/CourseService";
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
import { useTrainers } from "@/api/TrainerService";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Plus } from "lucide-react";
import { Course } from "@/types";

interface AddCourseFormProps {
  open: boolean;
  onClose: () => void;
  initialValues?: Omit<CourseInput, "bannerFile">;
}

const defaultValues: Omit<CourseInput, "bannerFile"> = {
  title: "",
  description: "",
  price: 0,
  numberOfHours: 0,
  banner: "",
  trainerId: "",
};

function AddCourseForm({ open, onClose, initialValues }: AddCourseFormProps) {
  const { addOne } = useCourses();
  const mutation = addOne();

  const { getAll: getAllTrainers } = useTrainers();

  const { data: trainers } = getAllTrainers();

  const methods = useForm<CourseInput>({
    mode: "onBlur",
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues ? initialValues : defaultValues,
  });

  const onSubmit = (data: CourseInput) => {
    const course: Omit<Course, "id"> = {
      title: data.title,
      description: data.description,
      banner: data.banner,
      numberOfHours: data.numberOfHours,
      price: data.price,
      trainerId: data.trainerId,
    };
    mutation.mutate(course, {
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
          <DialogTitle>Add New Course</DialogTitle>
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FormField
                control={methods.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter course title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Enter course description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="trainerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Trainer</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select course trainer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {trainers?.map((trainer) => (
                              <SelectItem value={trainer.id} key={trainer.id}>
                                {trainer.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel className="flex justify-center items-center gap-2 text-primary hover:bg-primary/10 rounded-sm cursor-pointer">
                              <Plus size="16" /> Add new trainer
                            </SelectLabel>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price in US Dollar</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Place a reasonable price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="numberOfHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Hours</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter the total hours of the course"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="bannerFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Banner</FormLabel>
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
                              methods.setValue(
                                "banner",
                                reader.result as string
                              );
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
              <Button type="submit" className="w-full">
                Add Course
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddCourseForm;
