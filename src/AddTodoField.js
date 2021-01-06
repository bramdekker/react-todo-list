import { useState } from 'react';
import './AddTodoField.css';

// Todos is an object with title, description, due date, category (work, etc), isCompleted.
// Maybe add preset categories: work, school, sport, housekeeping, hobby?

function AddTodoField({ setTodos, keyCount, setKeyCount }) {
    const [newTodo, setNewTodo] = useState({});
    const [openCatText, setOpenCatText] = useState(false);

    function isValidForm() {
        const { title, dueDate, category, description } = newTodo;
        return title && dueDate && category && description;
    }

    function resetTodo() {
        setNewTodo({});
    }

    function generateKey() {
        let newKey = keyCount;
        setKeyCount(prevCount => prevCount + 1);

        return newKey
    }

    function submitHandler(event) {
        event.preventDefault();
        setTodos(allTodos => {
            let newKey = {"id": generateKey()};
            return [...allTodos, {...newTodo, ...newKey}];
        });
        
        // Reset the form.
        let form = document.getElementById("newTodoForm");
        form.reset();
        resetTodo();
    }

    function changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;

        if (name === "dueDate") {
            let splittedDate = value.split('-');
            splittedDate.reverse();
            value = splittedDate.join('/');
        } else {
            if (name === "category") {
                if (value === "other") {
                    setOpenCatText(true);
                } else {
                    setOpenCatText(false);
                }
            } else if (name === "categoryText") {
                name = "category";
            }  

            value = value.charAt(0).toUpperCase() + value.slice(1);
        }
 
        setNewTodo(prevTodo => ({...prevTodo, [name]: value }));
    }

    // yyyy-mm-dd format
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let todayString = `${yyyy}-${mm}-${dd}`;

    return (
        <>
            <form id="newTodoForm" onSubmit={submitHandler}>
                <label htmlFor="title">Title:</label><br/>
                <input className="inputEl" size="47" type="text" id="title" name="title" onChange={changeHandler}/><br/>
                <label htmlFor="dueDate">Due date:</label><br/>
                <input className="inputEl" type="date" id="dueDate" name="dueDate" min={todayString} onChange={changeHandler}/><br/>
                <label htmlFor="category">Category:</label><br/>
                <input className="inputEl" type="radio" id="schoolCat" name="category" value="school" onChange={changeHandler}/>
                <label htmlFor="schoolCat">School</label>
                <input type="radio" id="workCat" name="category" value="work" onChange={changeHandler}/>
                <label htmlFor="workCat">Work</label>
                <input type="radio" id="housekeepingCat" name="category" value="housekeeping" onChange={changeHandler}/>
                <label htmlFor="housekeepingCat">Housekeeping</label>
                <input type="radio" id="otherCat" name="category" value="other" onChange={changeHandler}/>
                <label htmlFor="otherCat">Other</label><br/>
                <input
                    className="inputEl"
                    size="20"
                    type="text"
                    id="category"
                    name="categoryText"
                    onChange={changeHandler}
                    style={{display: openCatText ? "block" : "none"}}
                />
                <label htmlFor="description">Description:</label><br/>
                <textarea
                    name="description"
                    form="newTodoForm"
                    placeholder="Give a description of your TODO here ..."
                    rows="5"
                    cols="50"
                    className="inputEl"
                    onChange={changeHandler}
                >
                </textarea><br/>
                <input id="submitBtn" type="submit" value="Add TODO" disabled={!isValidForm()}/>
            </form>  
        </>
    );
}

export default AddTodoField;