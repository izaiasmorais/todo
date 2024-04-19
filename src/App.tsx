import { FormEvent, useState } from "react";
import { TaskForm } from "./components/TaskForm";
import { TaskCounter } from "./components/TaskCounter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskList } from "./components/TaskList";
import { getTasks } from "./api/get-tasks";
import { deleteTask } from "./api/delete-task";
import { toggleTask } from "./api/toggle-task";
import { createTask } from "./api/create-task";
import { toast } from "sonner";

export default function App() {
	const [newTask, setNewTask] = useState("");
	const queryClient = useQueryClient();
	const { data: tasks, isLoading: isLoadingTasks } = useQuery({
		queryKey: ["tasks"],
		queryFn: () => getTasks(),
	});

	const { mutateAsync: createTaskFn } = useMutation({
		mutationFn: createTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	const { mutateAsync: deleteTaskFn } = useMutation({
		mutationFn: deleteTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	const { mutateAsync: toggleTaskFn } = useMutation({
		mutationFn: toggleTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	async function handleCreateTask(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			await createTaskFn(newTask);
			toast.success("Tarefa criada com sucesso!");
		} catch {
			toast.error("Erro ao criar uma task!");
		}
	}

	async function handleToggleTask(taskId: string) {
		try {
			await toggleTaskFn(taskId);
		} catch {
			toast.error("Erro ao atualizar a task!");
		}
	}

	async function handleDeleteTask(taskId: string) {
		try {
			await deleteTaskFn(taskId);
		} catch {
			toast.error("Erro ao deletar a task!");
		}
	}

	function taskCounter() {
		if (tasks) {
			const totalTasks = tasks.length;
			const totalDoneTasks = tasks.filter((task) => task.isDone).length;

			return {
				totalTasks,
				doneTasks: totalDoneTasks,
			};
		} else {
			return {
				totalTasks: 0,
				doneTasks: 0,
			};
		}
	}

	return (
		<main className="w-full h-screen bg-zinc-900">
			<div className="w-full h-[200px] bg-zinc-950 flex items-center justify-center">
				<img src="./Logo.png" alt="Logo" />
			</div>

			<div className="w-full flex flex-col items-center justify-center">
				<TaskForm
					newTask={newTask}
					handleCreateTask={handleCreateTask}
					setNewTask={setNewTask}
				/>

				<TaskCounter taskCounter={taskCounter} />

				<TaskList
					tasks={tasks}
					isLoadingTasks={isLoadingTasks}
					handleToggleTask={handleToggleTask}
					handleDeleteTask={handleDeleteTask}
				/>
			</div>
		</main>
	);
}
