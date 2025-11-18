export const handleAddTodo = (requestAddTodo) => {
	const title = prompt('Введите название задачи:');
	if (!title || title.trim() === '') return;
	requestAddTodo(title.trim());
};

export const handleToggleTodo = (todo, requestUpdateTodo) => {
	requestUpdateTodo(todo.id, {
		...todo,
		completed: !todo.completed,
	});
};

export const handleDeleteTodo = (id, requestDeleteTodo) => {
	requestDeleteTodo(id);
};
