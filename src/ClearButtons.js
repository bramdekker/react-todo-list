import './ClearButtons.css';

function ClearAllButton({ todos, setTodos }) {
    function deleteAllTodos() {
        setTodos([]);
    }

    function completedTodosPresent() {
        return todos && todos.find(todo => todo.isCompleted === true);
    }

    function deleteCompletedTodos() {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.isCompleted));
    }

    function passedTodosPresent() {
        return todos && todos.find(todo => {
            let splittedDueDate = todo.dueDate.split('/');
            splittedDueDate.reverse();
            let parsableDueDate = splittedDueDate.join('-');
            return (Date.parse(parsableDueDate) + 86399999) < Date.now();
        })
    }

    function deletePassedTodos() {
        setTodos(prevTodos => prevTodos.filter(todo => {
            let splittedDueDate = todo.dueDate.split('/');
            splittedDueDate.reverse();
            let parsableDueDate = splittedDueDate.join('-');
            return (Date.parse(parsableDueDate) + 86399999) >= Date.now();
        }));
    }

    return (
        <>
            <button onClick={deleteAllTodos} disabled={todos && todos.length > 0 ? false : true}>
                Clear all
            </button>
            <button onClick={deleteCompletedTodos} disabled={!completedTodosPresent()}>
                Clear all completed
            </button>
            <button onClick={deletePassedTodos} disabled={!passedTodosPresent()}>
                Clear all passed
            </button>
        </>
    );
}

export default ClearAllButton