<!--<template>-->
<!--  <div>-->
<!--    <h1>Tasks</h1>-->
<!--    <ul>-->
<!--      <li v-for="task in tasks" :key="task.id">-->
<!--        <h2>{{ task.taskName }}</h2>-->
<!--        <p>{{ task.description }}</p>-->
<!--        <p>Status: {{ task.status }}</p>-->
<!--        <p>Date Added: {{ task.dateAdded }}</p>-->
<!--        <p>Estimated Finish Date: {{ task.estimatedFinishDate }}</p>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import TaskService from './services/client.js';-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      tasks: []-->
<!--    };-->
<!--  },-->
<!--  created() {-->
<!--    this.fetchTasks();-->
<!--  },-->
<!--  methods: {-->
<!--    fetchTasks() {-->
<!--      TaskService.getAllTasks()-->
<!--          .then(response => {-->
<!--            this.tasks = response.data;-->
<!--          })-->
<!--          .catch(error => {-->
<!--            console.error("There was an error fetching the tasks!", error);-->
<!--          });-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--/* Add any styles you need here */-->
<!--</style>-->


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from "@/components/layout/TheHeader.vue";


</script>
<template>
  <TheHeader />
  <RouterView />
</template>
<style scoped>
</style>
