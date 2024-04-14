import { useState } from "react";
import { FormEvent } from "react";
import { TaskForm } from "./components/TaskForm";
import { TaskCounter } from "./components/TaskCounter";
import { TaskList } from "./components/TaskList";
import { ITask } from "./@types/task";
import { v4 as uuidv4 } from "uuid";
import { getTasks } from "./api/get-tasks";
import { useQuery } from "@tanstack/react-query";

export default function App() {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [newTask, setNewTask] = useState<ITask>({
		id: "",
		name: "",
		isDone: false,
	});

	const {
		data: result,
		isLoading: isLoadingTasks,
		error: tasksError,
	} = useQuery({
		queryKey: ["tasks"],
		queryFn: () => getTasks()
	});

	console.log(result);

	function handleCreateTask(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setTasks((prev) => [...prev, newTask]);

		setNewTask({
			id: "",
			name: "",
			isDone: false,
		});
	}

	function handleSetNewTask(name: string) {
		setNewTask({
			id: uuidv4(),
			name,
			isDone: false,
		});
	}

	function handleToggleTask(taskId: string) {
		const updatedTasks = tasks.map((task) => {
			if (task.id === taskId) {
				return {
					...task,
					isDone: !task.isDone,
				};
			}

			return task;
		});

		setTasks(updatedTasks);
	}

	function handleDeleteTask(taskId: string) {
		const updatedTasks = tasks.filter((task) => task.id !== taskId);

		setTasks(updatedTasks);
	}

	function taskCounter() {
		const totalTasks = tasks.length;
		const totalDoneTasks = tasks.filter((task) => task.isDone).length;

		return {
			totalTasks,
			doneTasks: totalDoneTasks,
		};
	}

	return (
		<main className="w-full h-screen bg-zinc-900">
			<div className="w-full h-[200px] bg-zinc-950 flex items-center justify-center">
				<img src="./Logo.png" alt="Logo" />
			</div>

			<div className="w-full flex flex-col items-center justify-center">
				<TaskForm
					newTaskName={newTask.name}
					handleCreateTask={handleCreateTask}
					handleSetNewTask={handleSetNewTask}
				/>

				<TaskCounter taskCounter={taskCounter} />

				<TaskList
					tasks={result}
					isLoadingTasks={isLoadingTasks}
					handleToggleTask={handleToggleTask}
					handleDeleteTask={handleDeleteTask}
				/>
			</div>
		</main>
	);
}
