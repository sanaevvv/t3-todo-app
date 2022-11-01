import { FC } from "react";
import Link from "next/link";
import { useStore } from "../store";
import { UpdateTaskInput } from "../schema/todo";
import { useMutateTask } from "../hooks/useMutateTask";

export const TaskItem: FC<UpdateTaskInput> = ({ taskId, title, body }) => {
  const update = useStore((state) => state.updateEditedTask);
  const { deleteTaskMutation } = useMutateTask();
  return (
    <li>
      <Link href={`/task/${taskId}`}>
        <a>{title}</a>
      </Link>
      <button onClick={() => update({ taskId, title, body })}>編集</button>
      <button onClick={() => deleteTaskMutation.mutate({ taskId })}>
        削除
      </button>
      {deleteTaskMutation.isLoading && <p>Mutation under process...</p>}
    </li>
  );
};
