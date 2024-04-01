export function EmptyTaskList() {
	return (
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
	);
}
