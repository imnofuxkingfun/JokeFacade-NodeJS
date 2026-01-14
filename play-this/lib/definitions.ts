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

export const NewArtistSchema = z.object({
  name: z.string().min(1, { message: 'Artist name must be at least 1 character long.' }).trim(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }).trim(),
});

export const NewSongSchema = z.object({
  name: z.string().min(1, { message: 'Song name must be at least 1 character long.' }).trim(),
  length: z.string().min(1, { message: 'Song length must be provided.' }).trim(),
  genreId: z.string().regex(/^\d+$/, { message: 'Genre ID must be a valid number.' }).transform(Number).refine((val) => val > 0, { message: 'Genre ID must be a positive integer.' }),
  artistId: z.string().regex(/^\d+$/, { message: 'Artist ID must be a valid number.' }).transform(Number).refine((val) => val > 0, { message: 'Artist ID must be a positive integer.' }),
  spotifyLink: z.url({ message: 'Please enter a valid URL for the Spotify link.'  }).trim(),
});
    
