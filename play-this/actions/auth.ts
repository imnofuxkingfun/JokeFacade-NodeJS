'use server'

import { LoginFormSchema, SignupFormSchema } from '@/lib/definitions'
import { z } from 'zod';
import { gql } from 'graphql-request';
import { getClient } from '@/lib/graphql-client';
import { cookies } from 'next/headers';

const SIGNUP_MUTATION = gql`
 mutation Signup($email: String!, $username: String!, $password: String!, $role_id: Int) {
  signup(email: $email, username: $username, password: $password, role_id: $role_id) {
    token
    user {
      id
      username
      email
    }
  }
}
`;

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      username
      email
    }
  }
}
`;

const SESSION_USER_QUERY = gql`
  query SessionUser {
    sessionUser {
      id
      username
      email
      role{
        id
      }
    }
  }
`;

export async function getSessionUser(){
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  if (!token) {
    return null;
  }

  const client = await getClient();
  try{
    const data = await client.request(SESSION_USER_QUERY);
    return data.sessionUser;
  }
  catch(error: any){
    console.error("Eroare GraphQL:", error.response?.errors);
    return null;
  }
}

export async function login(prevState: unknown, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { errors: z.treeifyError(validatedFields.error) };
  }
  const variables = {
    email: validatedFields.data.email,
    password: validatedFields.data.password
  };

  const client = await getClient();

  try {
    const data = await client.request(LOGIN_MUTATION, variables);

    const token = data.login.token;
    console.log("Răspuns server:", data);

    const cookieStore = await cookies();
        cookieStore.set('session_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

    return { success: true, user: data.login.user };
  } catch (error: any) {
    console.error("Eroare GraphQL:", error.response?.errors);
    return { message: error.response?.errors[0]?.message || "Eroare la înregistrare" };
  }
};

export async function signup(prevState: unknown, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { errors: z.treeifyError(validatedFields.error) };
  }

  const variables = {
    email: validatedFields.data.email,
    username: validatedFields.data.username,
    password: validatedFields.data.password,
    role_id: 1,
  };

  const client = await getClient()

  try {
    const data = await client.request(SIGNUP_MUTATION, variables);

    const token = data.signup.token;
    console.log("Răspuns server:", data);

    const cookieStore = await cookies();
        cookieStore.set('session_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

    return { success: true, user: data.signup.user };
  } catch (error: any) {
    console.error("Eroare GraphQL:", error.response?.errors);
    return { message: error.response?.errors[0]?.message || "Eroare la înregistrare" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session_token');
  
}