'use client'
import { useActionState } from 'react';
import { login } from '@/actions/auth';

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="flex flex-col gap-4 w-80">
      <div>
        <label>Email</label>
        <input name="email" type="email" placeholder="Email" className="border p-2 w-full" />
        {state?.message && <p className="text-red-500">{state.message}</p>}
      </div>

      <div>
        <label>Parolă</label>
        <input name="password" type="password" placeholder="Parolă" className="border p-2 w-full" />
      </div>

      <button disabled={pending} type="submit" className="bg-blue-500 text-white p-2">
        {pending ? 'Se conectează...' : 'Conectare'}
      </button>

      {state?.success && <p className="text-green-500">Conectat cu succes!</p>}
    </form>
  );
}