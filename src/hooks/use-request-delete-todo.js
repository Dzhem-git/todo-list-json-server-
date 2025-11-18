import { useState } from 'react';

export const useRequestDeleteTodo = (setTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTodo = (id) => {
		setIsDeleting(true);

		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE',
		})
			.then(() => {
				setTodos((previewTodos) => previewTodos.filter((todo) => todo.id !== id));
			})
			.finally(() => setIsDeleting(false));
	};

	return { requestDeleteTodo, isDeleting };
};
