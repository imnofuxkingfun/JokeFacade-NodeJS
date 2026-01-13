'use client'

import { login } from "@/actions/auth";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import { useActionState, useEffect } from "react";

export default function LoginForm() {
  
    const [state, action, pending] = useActionState(login, undefined);

    const { login: updateAuthContext } = useAuth();
    const router = useRouter();
  useEffect(() => {
    if (state?.success && state?.user) {
      updateAuthContext(state.user);
      
      router.push('/');
    }
  }, [state, updateAuthContext, router]);
    
      return (
        <form action={action} className="flex flex-col gap-4 w-80">
            {state?.message && <p className="text-red-500">{state.message}</p>}
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
            {pending ? 'Se logheaza...' : 'Loghează-te'}
          </button>
        </form>
      );
}