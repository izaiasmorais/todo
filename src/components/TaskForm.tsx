import { CirclePlus } from "lucide-react";
import { FormEvent } from "react";
import { getTasks } from "../api/get-tasks";

interface TaskFormProps {
	newTaskName: string;
	handleCreateTask: (event: FormEvent<HTMLFormElement>) => void;
	handleSetNewTask: (name: string) => void;
}

export function TaskForm({
	newTaskName,
	handleCreateTask,
	handleSetNewTask,
}: TaskFormProps) {
	return (
		<form
			onSubmit={handleCreateTask}
			className="flex items-center justify-center gap-2 m-[-27px] mb-6 w-[700px]"
		>
			<input
				type="text"
				className="p-4 rounded-lg bg-zinc-700 border border-zinc-950 placeholder-gray-300
						text-gray-300 w-full"
				placeholder="Adicione uma nova tarefa"
				value={newTaskName}
				onChange={(event) => handleSetNewTask(event.target.value)}
			/>

			<button
				type="submit"
				className="bg-sky-600 text-gray-200 gap-2 p-4 flex rounded-lg hover:bg-sky-500
						transition-colors duration-300"
			>
				Criar
				<CirclePlus />
			</button>
		</form>
	);
}
