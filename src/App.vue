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
        <div v-for="todo in todos" :key="todo.id" class="card mb-1">
            <div class="card-content">
                <div class="content">
                    <div class="columns is mobile is-vcentered">
                        <div class="column">{{ todo.content }}</div>
                        <div class="column is-5 has-text-right">
                            <button class="button is-primary is-outlined">&#10004;</button>
                            <button class="button is-danger is-outlined ml-1">&#10007;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';


const todos = ref ([
    /*{
        id: 'id1',
        content: 'meet with Bailey',
        done: false,
    },
    {
        id: 'id2',
        content: 'submit a project',
        done: false,
    },
    {
        id: 'id3',
        content: 'running',
        done: false,
    }*/
])
const newtodoContent = ref('');

const addTodo = () => {
    const newTodo = {
        id: uuidv4(),
        content: newtodoContent.value,
        done: false,
    };
    todos.value.unshift(newTodo);
    newtodoContent.value = '';
}
</script>


<style>
@import 'node_modules\bulma\css\bulma.min.css';

.wrap-todo {
    max-width: 900px;
    padding: 20px;
    margin: 0 auto;
    text-align: center;
    background: linear-gradient(to bottom right, #C4F735, #E05118);
}
</style>