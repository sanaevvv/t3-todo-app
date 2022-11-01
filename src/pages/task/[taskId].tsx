import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { trpc } from "../../utils/trpc";
import { Layout } from "../../components/Layout";

const SingleTaskPage: NextPage = () => {
  const router = useRouter();
  const taskId = router.query.taskId as string;
  const { data, isLoading, error } = trpc.todo.getSingleTask.useQuery({
    taskId,
  });
  if (isLoading) {
    return <Layout title="">Loading single task...</Layout>;
  }
  if (error) {
    return <Layout title="">{error.message}</Layout>;
  }
  return (
    <Layout title="Task Detail">
      <p>{data?.title}</p>
      <p>{data?.body}</p>
      <time>
        {data && format(new Date(data.createdAt), "yyyy-MM-dd HH:mm:ss")}
      </time><br />
      <time>
        {data && format(new Date(data.updatedAt), "yyyy-MM-dd HH:mm:ss")}
      </time><br />
      <Link href="/">
        <a>戻る</a>
      </Link>
    </Layout>
  );
};

export default SingleTaskPage;
