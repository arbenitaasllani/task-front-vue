<template>
  <div>
    <h1>Tasks</h1>
    <div v-if="tasks.length === 0">Loading...</div>
    <div class="container mt-4 " v-else>
      <div class="row">
        <div class="col-md-6 mb-3" v-for="task in tasks" :key="task.id">
          <TaskItem :task="task" @taskDeleted="removeTask" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TaskItem from "@/components/tasks/TaskItem.vue";
import {taskService} from "@/services/client.js";

const tasks = ref([]);

const fetchTasks = async () => {
  try {
    const response = await taskService.getAllTasks();
    tasks.value = response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

const removeTask = (taskId) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId);
};

onMounted(fetchTasks);
</script>

<style scoped>
</style>