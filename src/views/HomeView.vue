<template>
  <div>
    <h1>Tasks</h1>
    <div v-if="tasks.length === 0">Loading...</div>
    <div v-else>
      <div class="row">
        <div class="col-md-6" v-for="task in tasks" :key="task.id">
          <task-item :task="task" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { taskService } from '@/services/client.js';
import TaskItem from '@/components/tasks/TaskItem.vue';

const tasks = ref([]);

const fetchTasks = async () => {
  try {
    const response = await taskService.getAllTasks();
    tasks.value = response.data;
  } catch (error) {
    console.error('There was an error fetching the tasks!', error);
  }
};

onMounted(() => {
  fetchTasks();
});
</script>

<script>
import TaskItem from '@/components/tasks/TaskItem.vue';

export default {
  components: {
    TaskItem
  }
};
</script>

<style>
/* Add any styles you need here */
</style>
