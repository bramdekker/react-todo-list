import './TodoList.css';

function TodoList({ todos, setTodos, sortDir, setSortDir }) {
    function markComplete(id) {
        return function() {
            document.getElementById(`completeButton${id}`).classList.add("animation");

            setTodos(prevTodos => {
                return prevTodos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo);
            });
        }
    }

    function resetMarkAnimationClass(id) {
        return function() {
            document.getElementById(`completeButton${id}`).classList.remove("animation");
        }
    }

    function setRemoveAnimationClass(id) {
        return function() {
            document.getElementById(`removeButton${id}`).classList.add("animation");
        }
    }

    function removeTodo(id) {
        return function() {
            document.getElementById(`removeButton${id}`).classList.remove("animation");

            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        }
    }
    
    function makeSortClass(columnName) {
        if (sortDir.startsWith(columnName)) {
            return sortDir.endsWith("asc") ? " \u25BC" : " \u25B2";
        }

        return "";
    }

    function setNewSortDir(columnName) {
        if (sortDir.startsWith(columnName) && sortDir.endsWith("asc")) {
            setSortDir(`${columnName}_desc`);
        } else {
            setSortDir(`${columnName}_asc`);
        }     
    }

    function makeClassName(todo) {
        let category, completed;
        let splittedDueDate = todo.dueDate.split('/');
        splittedDueDate.reverse();
        let parsableDueDate = splittedDueDate.join('-');

        if (todo.category !== "School" && todo.category !== "Work" && todo.category !== "Housekeeping") {
            category = "other";
        } else {
            category = todo.category.charAt(0).toLowerCase() + todo.category.slice(1);
        }

        if (todo.isCompleted) {
            completed = "completed";
        } else {
            completed = "notCompleted";
        }

        if ((Date.parse(parsableDueDate) + 86399999) < Date.now()) {
            completed = "tooLate";
        }

        return `${category} ${completed}`;
    }

    const todoRows = todos.map(todo => {
        return (
            <tr className={makeClassName(todo)} key={todo.id}>
                <td className="noBorders">
                    <button id={`completeButton${todo.id}`} className="markCompleted" onClick={markComplete(todo.id)} onAnimationEnd={resetMarkAnimationClass(todo.id)}>
                        &#10004;
                    </button>
                </td>
                <td className="noBorders">
                    <button id={`removeButton${todo.id}`} className="removeTodo" onClick={setRemoveAnimationClass(todo.id)} onAnimationEnd={removeTodo(todo.id)}>
                        &#10008;
                    </button> 
                </td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.dueDate}</td>
                <td>{todo.category}</td>
                <td>{todo.isCompleted ? "Yes" : "No"}</td>
            </tr>
        )
    });
    
    return (
        <table>
            <thead>
                <tr className="tableHead">
                    <th></th>
                    <th></th>
                    <th onClick={() => setNewSortDir("title")} className="hoverPointer">
                        Title{makeSortClass("title") || ""}
                    </th>
                    <th>Description</th>
                    <th onClick={() => setNewSortDir("dueDate")} className="hoverPointer">
                        Due date{makeSortClass("dueDate") || ""}
                    </th>
                    <th onClick={() => setNewSortDir("category")} className="hoverPointer">
                        Category{makeSortClass("category") || ""}
                    </th>
                    <th onClick={() => setNewSortDir("isCompleted")} className="hoverPointer">
                        Completed{makeSortClass("isCompleted") || ""}
                    </th>
                </tr>
            </thead>
            <tbody>
                {todoRows}
            </tbody>
        </table>
    );
}

export default TodoList;