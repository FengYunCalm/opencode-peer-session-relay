import type { TaskStore } from "../../internal/store/task-store.js";

export function createGetTaskHandler(taskStore: TaskStore) {
  return (taskId: string) => {
    return taskStore.getTask(taskId);
  };
}
