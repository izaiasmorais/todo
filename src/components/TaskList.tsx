import { Circle, CircleCheckBig, Trash } from "lucide-react";
import { ITask } from "../@types/task";
import { EmptyTaskList } from "./EmptyTaskList";

interface TaskListProps {
	tasks: ITask[] | undefined;
	isLoadingTasks: boolean;
	handleToggleTask: (taskId: string) => void;
	handleDeleteTask: (taskId: string) => void;
}

export function TaskList({
	tasks,
	isLoadingTasks,
	handleDeleteTask,
	handleToggleTask,
}: TaskListProps) {
	return (
		<div className="border-t border-zinc-600 text-white w-[700px] mt-6 rounded-lg">
			{isLoadingTasks && (
				<div className="w-full flex items-center justify-center h-[100px]">
					Carregando tasks...
				</div>
			)}

			{!isLoadingTasks && tasks && tasks.length > 0 && (
				<div className="flex flex-col gap-4">
					{tasks.map((task) => {
						return (
							<div
								key={task.id}
								className="p-4 bg-zinc-800 border border-zinc-700	rounded-lg flex gap-4
								transition-colors duration-200 justify-between"
							>
								<div className="flex gap-2">
									<div
										className="w-6 h-6"
										onClick={() => handleToggleTask(task.id)}
									>
										{task.isDone === true && (
											<CircleCheckBig className="text-purple-500 cursor-pointer" />
										)}

										{task.isDone === false && (
											<Circle className="text-sky-500 hover:text-sky-400 cursor-pointer duration-300" />
										)}
									</div>

									<span className="text-gray-300">{task.name}</span>
								</div>

								<div
									className="w-6 h-6"
									onClick={() => handleDeleteTask(task.id)}
								>
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

			{!isLoadingTasks && tasks && tasks.length === 0 && <EmptyTaskList />}
		</div>
	);
}
