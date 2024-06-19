<template>
  <div>
    <h3 class="text-center mt-4">Tasks</h3>

    <!-- Filter buttons -->
    <div class="container mt-4">
      <div class="row mb-3">
        <div class="col-md-3">
          <button class="btn btn-soft-primary w-100 btn-filter" @click="filterTasks('all')">All</button>
        </div>
        <div class="col-md-3">
          <button class="btn btn-soft-primary w-100 btn-filter not-started" @click="filterTasks('not started')">Not Started</button>
        </div>
        <div class="col-md-3">
          <button class="btn btn-soft-primary w-100 btn-filter in-progress" @click="filterTasks('in progress')">In Progress</button>
        </div>
        <div class="col-md-3">
          <button class="btn btn-soft-primary w-100 btn-filter finished" @click="filterTasks('finished')">Finished</button>
        </div>
      </div>
    </div>

    <!-- Task list -->
    <div v-if="tasksToShow.length === 0">Loading...</div>
    <div class="container mt-4" v-else>
      <div class="row">
        <div class="col-md-6 mb-3" v-for="task in tasksToShow" :key="task.id">
          <TaskItem :task="task" @taskDeleted="removeTask" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TaskItem from "@/components/tasks/TaskItem.vue";
import { taskService } from "@/services/client.js";

const tasks = ref([]);
const tasksToShow = ref([]);

const fetchTasks = async () => {
  try {
    const response = await taskService.getAllTasks();
    tasks.value = response.data;
    tasksToShow.value = tasks.value; // Initially show all tasks
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

const removeTask = (taskId) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId);
  tasksToShow.value = tasksToShow.value.filter(task => task.id !== taskId);
};

const filterTasks = (status) => {
  if (status === 'all') {
    tasksToShow.value = tasks.value; // Show all tasks
  } else if (status === 'not started' || status === 'in progress' || status === 'finished') {
    tasksToShow.value = tasks.value.filter(task => task.status.toLowerCase() === status);
  }
};

onMounted(fetchTasks);
</script>

<style scoped>
.btn-filter {
  color: #ffffff;
}

.btn-soft-primary {
  background-color: #81ceef; /* Soft blue */
  border-color: #e3f2fd;
  color: #053f9a; /* Soft blue */
}

.not-started {
  background-color: #f8a2a2; /* Light red */
  border-color: #ffb3b3;
  color: #9b0000; /* Light red */
}

.in-progress {
  background-color: #ffe066; /* Light yellow */
  border-color: #ffe066;
  color: #b49700; /* Light yellow */
}

.finished {
  background-color: #89da8b; /* Light green */
  border-color: #b3ffb3;
  color: #0c6000; /* Light green */
}

/* Disable hover effect */
.btn-filter:hover {
  background-color: inherit !important;
  border-color: inherit !important;
}
</style>
