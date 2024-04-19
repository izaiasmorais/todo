import { api } from "../lib/axios";

export async function deleteTask(taskId: string) {
	const response = await api.delete(`/tasks/${taskId}`);

	return response;
}
