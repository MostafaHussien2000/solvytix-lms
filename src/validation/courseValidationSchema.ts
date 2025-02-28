import { z } from "zod";

export const validationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z
    .string({ message: "You need to enter a description for your course." })
    .min(10, "Description must be at least 10 characters.")
    .nonempty({ message: "You need to enter a description for your course." }),
  price: z.coerce
    .number({ message: "Enter a valid number for course price." })
    .positive("Price must be a positive number."),
  numberOfHours: z.coerce
    .number()
    .positive("Number of hours must be a positive number."),
  bannerFile: z.custom<File | FileList>((files) => {
    if (!files) return false;
    if (files instanceof FileList)
      return files.length > 0 && files.item(0)?.type.startsWith("image/");
    if (files instanceof File) return files.type.startsWith("image/");
    return false;
  }, "You must upload a valid image file."),
  banner: z.string({ message: "Required base64" }).nonempty("Required base64"),
  trainerId: z
    .string({ message: "You need to select trainer." })
    .nonempty("You need to select trainer."),
});

export type CourseInput = z.infer<typeof validationSchema>;
