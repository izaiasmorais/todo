import { api } from "../lib/axios";

export async function toggleTask(taskId: number) {
	const response = await api.put(`/tasks/${taskId}`);

	return response;
}
