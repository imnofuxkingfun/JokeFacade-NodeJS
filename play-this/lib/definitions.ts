import { z } from 'zod';

export const SignupFormSchema = z.object({
  username: z.string().min(2, { message: 'Your username must be at least 2 characters long.' }).trim(),
  email: z.email({ message: 'Please enter a valid email address.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Your password must be at least 8 characters long.' })
    .regex(/[a-zA-Z]/, { message: 'It must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'It must contain at least one number.' })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Your password must be at least 8 characters long.' })
    .regex(/[a-zA-Z]/, { message: 'It must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'It must contain at least one number.' })
    .trim(),
});