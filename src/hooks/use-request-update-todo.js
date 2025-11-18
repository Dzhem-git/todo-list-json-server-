import { useState } from 'react';

export const useRequestUpdateTodo = (setTodos) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateTodo = (id, todo) => {
		setIsUpdating(true);

		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(todo),
		})
			.then((rawResponse) => rawResponse.json())
			.then((updatedTodo) => {
				setTodos((prevTodos) =>
					prevTodos.map((item) =>
						item.id === updatedTodo.id ? updatedTodo : item,
					),
				);
			})
			.finally(() => setIsUpdating(false));
	};

	return { requestUpdateTodo, isUpdating };
};
