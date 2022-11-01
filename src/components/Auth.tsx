import { signIn } from "next-auth/react";

export const Auth = () => {
  return (
    <div>
      <button onClick={() => signIn('github')}>GitHub Auth</button>
    </div>
  );
};
