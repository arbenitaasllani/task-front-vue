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
    await router.push('/');
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

onMounted(fetchTaskDetails);
</script>

<template>
  <div class="container mt-4 mb-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h3 class="text-center mt-4">Edit Task</h3>
        <form @submit.prevent="updateTask" class="mt-4">
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
          <button type="submit" class="btn btn-soft-primary w-100">Update Task</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.btn-soft-primary {
  background-color: #e3f2fd;
  color: #0d6efd;
  border-color: #e3f2fd;
}
.btn-soft-primary:hover {
  background-color: #d1ecf1;
  border-color: #d1ecf1;
}
</style>
