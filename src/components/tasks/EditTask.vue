<!-- EditTask.vue -->
<template>
  <div>
    <h1>Edit Task</h1>
    <form @submit.prevent="updateTask">
      <div class="mb-3">
        <label for="taskName" class="form-label">Task Name</label>
        <input type="text" class="form-control" id="taskName" v-model="editedTask.taskName" required>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" v-model="editedTask.description"></textarea>
      </div>
      <div class="mb-3">
        <label for="status" class="form-label">Status</label>
        <input type="text" class="form-control" id="status" v-model="editedTask.status">
      </div>
      <div class="mb-3">
        <label for="dateAdded" class="form-label">Date Added</label>
        <input type="date" class="form-control" id="dateAdded" v-model="editedTask.dateAdded">
      </div>
      <div class="mb-3">
        <label for="estimatedFinishDate" class="form-label">Estimated Finish Date</label>
        <input type="date" class="form-control" id="estimatedFinishDate" v-model="editedTask.estimatedFinishDate">
      </div>
      <button type="submit" class="btn btn-primary">Update Task</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { taskService } from '@/services/client.js';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const editedTask = reactive({
  taskName: '',
  description: '',
  status: '',
  dateAdded: '',
  estimatedFinishDate: ''
});

const fetchTaskDetails = async () => {
  const taskId = route.params.taskId;
  if (taskId) {
    try {
      const response = await taskService.getTaskById(taskId);
      Object.assign(editedTask, response.data);
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  } else {
    console.error('No task id provided.');
  }
};

const updateTask = async () => {
  const taskId = route.params.taskId;
  if (!taskId) {
    console.error('No task id provided.');
    return;
  }

  try {
    const response = await taskService.updateTask(taskId, editedTask);
    console.log('Task updated successfully:', response.data);
    router.push('/');
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

onMounted(fetchTaskDetails);
</script>

<style>
/* Add any styles you need here */
</style>
