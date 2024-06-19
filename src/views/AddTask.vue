<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import {taskService} from "@/services/client.js";

const task = reactive({
  taskName: '',
  description: '',
  status: 'Not Started',
  dateAdded: '',
  estimatedFinishDate: ''
});

const router = useRouter();

const submitForm = async () => {
  try {
    task.status = task.status.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    await taskService.addTask(task);
    console.log('Task submitted:', task);
    await router.push('/');
  } catch (error) {
    console.error('Failed to add task:', error);
  }
};
</script>

<template>
  <form @submit.prevent="submitForm" class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
          <h3 class="text-center mb-4">Add New Task</h3>
        <div class="mb-3">
          <label for="taskName" class="form-label">Task Name:</label>
          <input type="text" id="taskName" v-model="task.taskName" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">Description:</label>
          <textarea id="description" v-model="task.description" class="form-control" required></textarea>
        </div>

        <div class="mb-3">
          <label for="status" class="form-label">Status:</label>
          <select id="status" v-model="task.status" class="form-select" required>
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="finished">Finished</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="dateAdded" class="form-label">Added Date:</label>
          <input type="date" id="dateAdded" v-model="task.dateAdded" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="estimatedFinishDate" class="form-label">Estimated Finish Date:</label>
          <input type="date" id="estimatedFinishDate" v-model="task.estimatedFinishDate" class="form-control" required />
        </div>

        <button type="submit" class="btn btn-soft-primary w-100">Add Task</button>
      </div>
    </div>
  </form>
</template>



<style scoped>
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
