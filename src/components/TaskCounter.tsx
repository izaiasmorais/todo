interface TaskCounterProps {
	taskCounter: () => {
		totalTasks: number;
		doneTasks: number;
	};
}

export function TaskCounter({ taskCounter }: TaskCounterProps) {
	return (
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
	);
}
