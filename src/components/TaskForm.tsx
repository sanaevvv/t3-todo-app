import { FormEvent } from "react";
import { useStore } from "../store";
import { useMutateTask } from "../hooks/useMutateTask";

export const TaskForm = () => {
  const { createTaskMutation, updateTaskMutation } = useMutateTask();
  const { editedTask } = useStore();
  const update = useStore((state) => state.updateEditedTask);
  const payload = {
    title: editedTask.title,
    body: editedTask.body,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedTask.taskId === "") {
      createTaskMutation.mutate(payload);
    } else {
      updateTaskMutation.mutate({
        taskId: editedTask.taskId,
        ...payload,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {(updateTaskMutation.isLoading || createTaskMutation.isLoading) && (
        <p>Mutation under Process</p>)}
      <input
        type="text"
        placeholder="Title"
        value={editedTask.title}
        onChange={(e) => update({ ...editedTask, title: e.target.value })}
      />
      <p>
        {createTaskMutation.error?.data?.zodError &&
          createTaskMutation.error.data.zodError.fieldErrors.title}
      </p>
      <textarea
        placeholder="Body"
        value={editedTask.body}
        onChange={(e) => update({ ...editedTask, body: e.target.value })}
      />
      <p>
        {createTaskMutation.error?.data?.zodError &&
          createTaskMutation.error.data.zodError.fieldErrors.body}
      </p>
      <button>{editedTask.taskId === "" ? "Create" : "Update"}</button>
    </form>
  );
};
