import { ITask } from "../@types/task";
import { api } from "../lib/axios";

export async function getTasks() {
	const response = await api.get<ITask[]>("/tasks");

	return response.data;
}
