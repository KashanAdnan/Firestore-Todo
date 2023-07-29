import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { setDoc, deleteDoc, updateDoc, collection, doc, getFirestore, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAXVadYTfuvmpMwBtgjr2A7Zu6BZGJt68k",
    authDomain: "todo-app-14e7f.firebaseapp.com",
    projectId: "todo-app-14e7f",
    storageBucket: "todo-app-14e7f.appspot.com",
    messagingSenderId: "1032645423253",
    appId: "1:1032645423253:web:882525024447397ee52b9c",
    measurementId: "G-JGESNPR2LJ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const todoInp = document.getElementById("todo");

const addTodo = async () => {
    try {
        await setDoc(doc(db, "todos", todoInp.value), {
            todo: todoInp.value
        });
        getData()
    } catch (e) {
        console.log(e);
    }
}

const getData = async () => {
    const show_container = document.querySelector(".show-container");
    const querySnapshot = await getDocs(collection(db, "todos"));
    show_container.innerHTML = ""
    querySnapshot.forEach((doc) => {
        show_container.innerHTML += `
        <div class="main-be" id='${doc.data().todo}'>
          <p>${doc.data().todo}</p>
          <div class="buttons">
          <button onclick="updateInp('${doc.data().todo}')">Update</button>
          <button onclick="deleteTodo('${doc.data().todo}')">Delete</button>
          </div>
          </div>
        `
    });
}
const deleteTodo = async (todo) => {
    await deleteDoc(doc(db, "todos", todo));
    getData()
}

getData()

const updateInp = (todo) => {
    localStorage.setItem("purana-mal", todo)
    document.getElementById(`${todo}`).innerHTML = `
    <div>
          <input value="${todo}" id='${todo}-3' />
          <div class="buttons">
          <button onclick="updateTodo('${todo}')">Set</button>
          <button onclick="deleteTodo('${todo}')">Delete</button>
          </div>
        </div>
    `
}

const updateTodo = async (todo) => {
    const todoRef = doc(db, "todos", localStorage.getItem("purana-mal"));
    const newTodo = document.getElementById(`${todo}-3`).value
    await updateDoc(todoRef, {
        todo: newTodo
    });

    getData()
}

window.addTodo = addTodo
window.updateTodo = updateTodo
window.updateInp = updateInp
window.deleteTodo = deleteTodo
