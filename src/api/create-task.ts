import { ITask } from "../@types/task";
import { api } from "../lib/axios";

export async function createTask(name: string) {
	const response = await api.post<ITask>("/tasks", {
		id: 1,
		name,
		isDone: false,
	});

	return response.data;
}
