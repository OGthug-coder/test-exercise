import React, { useState } from "react";

function Form(props) {
    const [text, setText] = useState('');
    const [important, setImportant] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (!text.trim()) {
            return;
        }
        props.addTask(text, important);
        setText("");
        setImportant(false);
    }


    function handleChangeText(e) {
        setText(e.target.value);
    }

    const handleChangeImportant = ({ target: { checked } }) => {
        setImportant(checked);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    Add a note:
                </label>
            </h2>

            <div className="input-container">
                <input
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="text"
                    autoComplete="off"
                    value={text}
                    onChange={handleChangeText}
                />
                <div className="checkbox-container">
                    <p>important: </p>
                    <input className="checkbox" type="checkbox" checked={important} onChange={handleChangeImportant} />
                </div>
            </div>

            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}

export default Form;