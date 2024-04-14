import { TaskForm } from "./components/TaskForm";
import { TaskCounter } from "./components/TaskCounter";
import { TaskList } from "./components/TaskList";
import { getTasks } from "./api/get-tasks";
import { useQuery } from "@tanstack/react-query";

export default function App() {
	const { data: tasks, isLoading: isLoadingTasks } = useQuery({
		queryKey: ["tasks"],
		queryFn: () => getTasks(),
	});

	console.log(tasks);

	function handleCreateTask() {}

	function handleSetNewTask() {}

	function handleToggleTask() {}

	function handleDeleteTask() {}

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
					newTaskName={""}
					handleCreateTask={handleCreateTask}
					handleSetNewTask={handleSetNewTask}
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
