import { api } from "../lib/axios";

export async function deleteTask(taskId: number) {
	const response = await api.delete(`/tasks/${taskId}`);

	return response;
}
