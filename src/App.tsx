import { Circle, CircleCheckBig, CirclePlus, Trash } from "lucide-react";
import { useState } from "react";
import { FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";

interface ITask {
	id: string;
	name: string;
	isDone: boolean;
}

export default function App() {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [newTask, setNewTask] = useState<ITask>({
		id: "",
		name: "",
		isDone: false,
	});

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
				<form
					onSubmit={handleCreateTask}
					className="flex items-center justify-center gap-2 m-[-27px] mb-6 w-[700px]"
				>
					<input
						type="text"
						className="p-4 rounded-lg bg-zinc-700 border border-zinc-950 placeholder-gray-300
						text-gray-300 w-full"
						placeholder="Adicione uma nova tarefa"
						value={newTask.name}
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

				<div className="w-[700px]">
					<div className="w-full flex justify-between items-center">
						<strong className="text-sky-500">
							Tarefas criadas{" "}
							<span className="px-3 bg-zinc-700 text-white rounded-full">
								{taskCounter().totalTasks}
							</span>
						</strong>

						<strong className="text-purple-500">
							Concluídas{" "}
							<span className="px-3 bg-zinc-700 text-white rounded-full">
								{taskCounter().doneTasks}
							</span>
						</strong>
					</div>
				</div>

				<div className="border-t border-zinc-600 text-white w-[700px] mt-6 rounded-lg">
					{tasks && tasks.length > 0 && (
						<div className="flex flex-col gap-4">
							{tasks.map((task) => {
								return (
									<div
										key={task.id}
										className="p-4 bg-zinc-800 border border-zinc-700	rounded-lg flex gap-4
								transition-colors duration-200 justify-between"
									>
										<div className="flex gap-2">
											<div className="w-6 h-6">
												{task.isDone === true && (
													<CircleCheckBig className="text-purple-500 cursor-pointer" />
												)}

												{task.isDone === false && (
													<Circle
														onClick={() => handleToggleTask(task.id)}
														className="text-sky-500 hover:text-sky-400 cursor-pointer duration-300"
													/>
												)}
											</div>

											<span className="text-gray-300">{task.name}</span>
										</div>

										<div className="w-6 h-6">
											<Trash
												className="text-zinc-500 hover:text-red-500 transition-colors cursor-pointer
								duration-300"
											/>
										</div>
									</div>
								);
							})}
						</div>
					)}

					{tasks && tasks.length === 0 && (
						<div className="flex py-16 px-8 flex-col items-center justify-between gap-4">
							<img
								src="./Clipboard.png"
								alt="Clipboard"
								className="text-zinc-500 w-14 h-14"
							/>

							<div className="flex flex-col text-zinc-400 text-center">
								<strong>Você ainda não tem tarefas cadastradas</strong>
								<span>Crie tarefas e organize seus itens a fazer</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
