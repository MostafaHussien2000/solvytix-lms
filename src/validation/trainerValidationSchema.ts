import { z } from "zod";

export const validationSchema = z.object({
  name: z.string().min(3, "Trainer name must be at least 3 characters."),
  bio: z.string().min(10, "Trainer bio must be at least 10 characters."),
  hourlyRate: z.coerce
    .number()
    .positive("Number of hours must be a positive number."),
  imageFile: z.custom<File | FileList>((files) => {
    if (!files) return false;
    if (files instanceof FileList)
      return files.length > 0 && files.item(0)?.type.startsWith("image/");
    if (files instanceof File) return files.type.startsWith("image/");
    return false;
  }, "You must upload a valid image file."),
  image: z.string({ message: "Required base64" }).nonempty("Required base64"),
});

export type TrainerInput = z.infer<typeof validationSchema>;
