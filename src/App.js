import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import {deleteNote, createNote, updateNote} from "./utils/Api";
import {getCookie} from "./utils/Cookie";

function compare( a, b ) {
    if ( a.props.important < b.props.important ){
        return 1;
    }
    if ( a.props.important > b.props.important ){
        return -1;
    }
    return 0;
}

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const FILTER_MAP = {
    All: () => true,
    Unimportant: task => !task.important,
    Important: task => task.important
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');

    function toggleTaskImportant(id) {
        const updatedTasks = tasks.map(task => {
            if (id === task.id) {
                return {...task, important: !task.important}
            }
            return task;
        });
        setTasks(updatedTasks);
    }


    function deleteTask(id) {
        const remainingTasks = tasks.filter(task => id !== task.id);
        deleteNote(id);
        setTasks(remainingTasks);
    }


    function editTask(id, newText) {
        const editedTaskList = tasks.map(task => {
            if (id === task.id) {
                updateNote(id, {
                    id: id,
                    text: newText,
                    important: task.important,
                    UserToken: getCookie("token")
                });
                return {...task, text: newText}
            }
            return task;
        });
        setTasks(editedTaskList);
    }

    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map(task => (
            <Todo
                id={task.id}
                text={task.text}
                important={task.important}
                key={task.id}
                toggleTaskImportant={toggleTaskImportant}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        )).sort( compare );

    const filterList = FILTER_NAMES.map(text => (
        <FilterButton
            key={text}
            text={text}
            isPressed={text === filter}
            setFilter={setFilter}
        />
    ));

    function addTask(text, important) {
        const newTask = { id: "todo-" + nanoid(), text: text, important: important };
        createNote({
            text: text,
            important: important,
            UserToken: getCookie("token")
        });
        setTasks([...tasks, newTask]);
    }


    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    const listHeadingRef = useRef(null);
    const prevTaskLength = usePrevious(tasks.length);

    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    return (
        <div className="todoapp stack-large">
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                {headingText}
            </h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
        </div>
    );
}

export default App;
