import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { Auth } from "../../components/Auth";
import { Layout } from "../../components/Layout";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <Layout title="Login">
        <Auth />
      </Layout>
    );
  }

  return (
    <Layout title="Todo App">
      <button onClick={() => signOut()}>ログアウト</button>
      <p>{session.user?.name}</p>
    </Layout>
  );


};

export default Home;
