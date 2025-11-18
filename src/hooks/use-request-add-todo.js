import { useState } from 'react';

export const useRequestAddTodo = (setTodos) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = (title) => {
		setIsCreating(true);

		fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: title,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((newTodo) => {
				setTodos((previewTodos) => [...previewTodos, newTodo]);
			})
			.finally(() => setIsCreating(false));
	};

	return { requestAddTodo, isCreating };
};
