'use client'
import { useActionState, useEffect } from 'react';
import { signup } from '@/actions/auth';
import { useRouter } from 'next/dist/client/components/navigation';
import { useAuth } from '@/context/authContext';

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  const { login: updateAuthContext } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (state?.success && state?.user) {
      updateAuthContext(state.user);
      
      router.push('/');
    }
  }, [state]);

  return (
    <form action={action} className="flex flex-col gap-4 w-80">
      {state?.message && <p className="text-red-500">{state.message}</p>}
      <div>
        <label>Nume</label>
        <input name="username" placeholder="Numele tău" className="border p-2 w-full" />
        {state?.errors?.properties?.username?.errors && <p className="text-red-500">{state.errors.properties.username.errors}</p>}
      </div>

      <div>
        <label>Email</label>
        <input name="email" type="email" placeholder="Email" className="border p-2 w-full" />
        {state?.errors?.properties?.email?.errors && <p className="text-red-500">{state.errors.properties.email.errors}</p>}
      </div>

      <div>
        <label>Parolă</label>
        <input name="password" type="password" className="border p-2 w-full" />
        {state?.errors?.properties?.password?.errors && (
          <div className="text-red-500">
            <p>Parola trebuie să conțină:</p>
            <ul>
              {state.errors.properties.password.errors.map((error) => <li key={error}>- {error}</li>)}
            </ul>
          </div>
        )}
      </div>

      <button disabled={pending} type="submit" className="bg-blue-500 text-white p-2">
        {pending ? 'Se înregistrează...' : 'Creează cont'}
      </button>
    </form>
  );
}