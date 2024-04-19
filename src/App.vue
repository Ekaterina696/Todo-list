<template>
    <div class="wrap-todo">
        <div class="title ">My Todo List!</div>
        <form @submit.prevent="addTodo">
            <div class="field is-grouped mb-5">
                <p class="control is-expanded">
                    <input v-model="newtodoContent" class="input" type="text" placeholder="Добавить задачу">
                </p>
                <p class="control">
                    <button :disabled="!newtodoContent" class="button has-text-link-dark hsl(217, 71%, 45%)">
                        Добавить
                    </button>
                </p>
            </div>
        </form>
        <div v-for="todo in todos" :key="todo.id" class="card mb-1"
            :class="{ 'has-background-success-light' : todo.done }">
            <div class="card-content">
                <div class="content">
                    <div class="columns is mobile is-vcentered">
                        <div class="column" :class="{ 'has-text-success line-through': todo.done }">{{ todo.content }}
                        </div>
                        <div class="column is-5 has-text-right">
                            <button class="button is-primary is-outlined"
                                :class="todo.done ? 'is-success' : 'is-light'"
                                @click="toggleDone(todo.id)">&#10004;</button>
                            <button @click="deleteTodo(todo.id)"
                                class="button is-danger is-outlined ml-1">&#10007;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { 
    collection,
    onSnapshot,
    addDoc, doc,
    deleteDoc,
    updateDoc,
    query,
    orderBy,
} from "firebase/firestore";
import { db } from './firebase';

/// FB ref
const todosCollectionRef = collection(db, "todos");
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc")); // порядок сортировки данных

///TODOS
const todos = ref ([
   /* {
        id: 'id1',
        content: 'meet with Bailey',
        done: false,
    },
    {
        id: 'id2',
        content: 'submit a project',
        done: true,
    },
    {
        id: 'id3',
        content: 'running',
        done: false,
    }*/
]);

/// GET TODOS

// Получение данных в реальном времени
onMounted( () => {
    onSnapshot(todosCollectionQuery, (querySnapshot) => {
        const fbTodos = [];
        querySnapshot.forEach((doc) => {
            const todo = {
                id: doc.id,
                content: doc.data().content,
                done: doc.data().done,
            };
            fbTodos.push(todo);
        });
        todos.value = fbTodos;
    });
})

/// ADD TODO

// Добавление данных в реальном времени
const newtodoContent = ref('');

const addTodo = () => {
    addDoc(todosCollectionRef, {
        content: newtodoContent.value,
        done: false,
        date: Date.now(),
    });
    newtodoContent.value = '';
}

/// DELETE TODO
const deleteTodo = (id) => {
      deleteDoc(doc(todosCollectionRef, id));  // Удаление данных в реальном времени
};

/// TOGGLE DONE
const toggleDone = (id) => {
    const index = todos.value.findIndex((todo) => todo.id === id);
    
    // Реализация функционала mark done в двусторонней связке
    updateDoc(doc(todosCollectionRef, id), {
        done: !todos.value[index].done,
    });
};
</script>


<style>
@import 'bulma/css/bulma';

.wrap-todo {
    max-width: 400px;
    padding: 20px;
    margin: 0 auto;
    text-align: center;
    background: linear-gradient(to bottom right, #C4F735, #E05118);
}

.line-through {
    text-decoration: line-through;
}
</style>