import {
	useRequestGetTodos,
	useRequestAddTodo,
	useRequestUpdateTodo,
	useRequestDeleteTodo,
} from './hooks';
import styles from './app.module.css';
import { useState } from 'react';
import { handleAddTodo, handleDeleteTodo, handleToggleTodo } from './handle';

export const App = () => {
	const [isSorted, setIsSorted] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const { todos, setTodos, isLoading } = useRequestGetTodos();
	const { requestAddTodo, isCreating } = useRequestAddTodo(setTodos);
	const { requestUpdateTodo } = useRequestUpdateTodo(setTodos);
	const { requestDeleteTodo } = useRequestDeleteTodo(setTodos);

	const displayedTodos = todos
		.filter((todo) => todo.title.toLowerCase().includes(searchTerm.toLowerCase()))
		.sort((a, b) => {
			if (!isSorted) return 0;
			if (a.title > b.title) return 1;
			if (a.title < b.title) return -1;
			return 0;
		});

	return (
		<div className={styles.app}>
			<h1>Список задач</h1>

			<div className={styles.searchContainer}>
				<input
					type="text"
					placeholder="Поиск задач..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className={styles.searchInput}
				/>
			</div>

			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				<>
					{todos.length === 0 ? (
						<p className={styles.emptyMessage}>Список задач пуст</p>
					) : (
						<ul className={styles.todoList}>
							{displayedTodos.map((todo) => (
								<li key={todo.id} className={styles.todoItem}>
									<label
										className={todo.completed ? styles.completed : ''}
									>
										<input
											type="checkbox"
											checked={todo.completed}
											onChange={() =>
												handleToggleTodo(todo, requestUpdateTodo)
											}
										/>
										<span>{todo.title}</span>
									</label>

									<button
										className={styles.deleteButton}
										onClick={() =>
											handleDeleteTodo(todo.id, requestDeleteTodo)
										}
									>
										Удалить
									</button>
								</li>
							))}
						</ul>
					)}
				</>
			)}

			<div className={styles.actionsContainer}>
				<button
					className={styles.addButton}
					disabled={isCreating}
					onClick={() => handleAddTodo(requestAddTodo)}
				>
					Добавить задачу
				</button>

				<button
					className={`${styles.sortButton} ${isSorted ? styles.activeSort : ''}`}
					onClick={() => setIsSorted((prev) => !prev)}
				>
					{isSorted ? 'Сортировать по умолчанию' : 'Сортировать по алфавиту'}
				</button>
			</div>
		</div>
	);
};
