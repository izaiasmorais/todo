import { ITask } from "../@types/task";
import { api } from "../lib/axios";

export async function createTask() {
	const response = await api.post<ITask[]>("/tasks");

	return response.data;
}
