import { useStore } from "../store";
import { trpc } from "../utils/trpc";

export const useMutateTask = () => {
  const utils = trpc.useContext(); //キャッシュにアクセス
  const previousTodos = utils.todo.getTasks.getData(); //キャッシュを取得
  const reset = useStore((state) => state.resetEditedTask);

  const createTaskMutation = trpc.todo.createTask.useMutation({
    onSuccess: (res) => {
      if (previousTodos) {
        utils.todo.getTasks.setData([res, ...previousTodos]);
      }
      reset();
    },
  });

  const updateTaskMutation = trpc.todo.updateTask.useMutation({
    onSuccess: (res) => {
      if (previousTodos) {
        utils.todo.getTasks.setData(
          previousTodos.map((task) => (task.id === res.id ? res : task))
        );
      }
      reset();
    },
  });

  const deleteTaskMutation = trpc.todo.deleteTask.useMutation({
    onSuccess: (_, variables) => {
      if (previousTodos) {
        utils.todo.getTasks.setData(
          previousTodos.filter((task) => task.id !== variables.taskId)
        );
      }
      reset();
    },
  });

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
