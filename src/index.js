import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {getCookie, setCookie} from "./utils/Cookie";
import {register, getNotes} from "./utils/Api";

if (getCookie("token") == null){
    register().then(data => setCookie("token", data.token))
        .then(() => {
            getNotes(getCookie("token")).then(data => {
                console.log(data);
                ReactDOM.render(
                    <React.StrictMode>
                        <App tasks={data}/>
                    </React.StrictMode>,
                    document.getElementById('root')
                );
            })
        });
} else {
    getNotes(getCookie("token")).then(data => {
        console.log(data);
        ReactDOM.render(
            <React.StrictMode>
                <App tasks={data}/>
            </React.StrictMode>,
            document.getElementById('root')
        );
    })
}
