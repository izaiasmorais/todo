import { api } from "../lib/axios";

export async function toggleTask(taskId: string) {
	const response = await api.patch(`/tasks/${taskId}`);

	return response;
}
