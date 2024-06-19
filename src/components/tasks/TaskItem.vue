<!-- TaskItem.vue -->
<script setup>
import { toRefs } from 'vue';
import { taskService } from "@/services/client.js";

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['taskDeleted']);
const { task } = toRefs(props);

const deleteTask = async () => {
  try {
    await taskService.deleteTask(task.value.id);
    console.log('Task deleted successfully');
    emit('taskDeleted', task.value.id);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
</script>

<template>
  <div class="col-md-6 mb-3">
    <div class="task-item card">
      <h2 class="card-header bg-secondary text-white">{{ task.taskName }}</h2>
      <div class="card-body">
        <p class="card-text">{{ task.description }}</p>
        <p class="card-text">Status: {{ task.status }}</p>
        <p class="card-text">Date Added: {{ task.dateAdded }}</p>
        <p class="card-text">Estimated Finish Date: {{ task.estimatedFinishDate }}</p>
        <div class="d-grid gap-2">
          <router-link :to="'/edit/' + task.id" class="btn btn-primary">Edit</router-link>
          <button class="btn btn-danger mt-2" @click="deleteTask">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  margin-bottom: 16px;
}
</style>
