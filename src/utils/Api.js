// const URL = "https://localhost:5001/api/Notebook";
const URL = "https://webapp-210415230904.azurewebsites.net/api/Notebook";

let example_note = {
  id: -1,
  text: "text",
  important: true,
  usertoken: "token"
};

const getNotes = (token) => {
    return fetch(`${URL}/Notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token: token})
    }).then(r => r.json()).catch(e => console.log(e));
};

const createNote = (note) => {
    return fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    }).then(r => r.json()).catch(e => console.log(e));
};

const updateNote = (id, note) => {
  return fetch(`${URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
          "Content-Type": "application/json"
      }
  }).then(r => r.json()).catch(e => console.log(e))
};

const deleteNote = (id) => {
    return fetch(`${URL}/${id}`, {
        method: "DELETE"
    }).then(r => r.json()).catch(e => console.log(e));
};

const register = () => {
    return fetch("https://webapp-210415230904.azurewebsites.net/api/Users", {
        method: "GET"
    }).then(r => r.json()).catch(e => console.log(e))
};

export {createNote, getNotes, deleteNote, register, updateNote};