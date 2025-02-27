export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  numberOfHours: number;
  banner: string;
  trainerId: string;
}

export interface Trainer {
  id: string;
  name: string;
  bio: string;
  image: string;
  hourlyRate: number;
  courses: Course[];
}

export enum UserRole {
  ADMIN,
  TRAINER,
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
