<script setup>
import { toRefs, computed, ref } from 'vue';
import { taskService } from "@/services/client.js";
import { useRouter } from 'vue-router';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const emit = defineEmits(['taskDeleted']);
const { task } = toRefs(props);

const statusClass = computed(() => {
  if (task.value.status === 'Not Started') return 'not-started';
  if (task.value.status === 'In Progress') return 'in-progress';
  if (task.value.status === 'Finished') return 'finished';
  return '';
});

let showConfirmation = ref(false);

const confirmDelete = async () => {
  try {
    await taskService.deleteTask(task.value.id);
    console.log('Task deleted successfully');
    emit('taskDeleted', task.value.id);
    showConfirmation.value = false;
    router.push('/');
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

const cancelDelete = () => {
  showConfirmation.value = false;
};
</script>

<template>
  <div class="col-md-12 mb-1">
    <div class="task-item card">
      <h4 class="card-header bg-light-gray text-white">{{ task.taskName }}</h4>
      <div class="card-body">
        <p class="card-text">{{ task.description }}</p>
        <p :class="[statusClass]">Status: {{ task.status }}</p>
        <p class="card-text">Date Added: {{ task.dateAdded }}</p>
        <p class="card-text">Estimated Finish Date: {{ task.estimatedFinishDate }}</p>
        <div class="d-grid gap-2">
          <router-link :to="'/edit/' + task.id" class="btn btn-soft-primary">Edit</router-link>
          <button class="btn btn-soft-danger mt-2" @click="showConfirmation = true">Delete</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showConfirmation" class="confirmation-modal">
    <div class="modal-content">
      <p>Are you sure you want to delete the task?</p>
      <div class="modal-buttons">
        <button class="btn btn-soft-danger" @click="confirmDelete">Yes</button>
        <button class="btn btn-soft-primary" @click="cancelDelete">No</button>
      </div>
    </div>
  </div>
</template>



<style scoped>
.task-item {
  margin-bottom: 16px;
}

.not-started {
  color: #ff0000;
}

.in-progress {
  color: #ffc500;
}

.finished {
  color: #009200;
}

.btn-soft-primary {
  background-color: #e3f2fd;
  color: #0d6efd;
  border-color: #e3f2fd;
}

.btn-soft-primary:hover {
  background-color: #d1ecf1;
  border-color: #d1ecf1;
}

.btn-soft-danger {
  background-color: #f8d7da;
  color: #dc3545;
  border-color: #f8d7da;
}

.btn-soft-danger:hover {
  background-color: #f1b0b7;
  border-color: #f1b0b7;
}

.bg-light-gray {
  background-color: #868686;
}

.text-white {
  color: #343a40;
}


.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  text-align: center;
}

.modal-content p {
  margin-bottom: 20px;
}

.modal-buttons {
  display: flex;
  justify-content: center;
}

.modal-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.modal-buttons button.btn-soft-danger {
  background-color: #dc3545;
  color: white;
  border-color: #dc3545;
}

.modal-buttons button.btn-soft-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.modal-buttons button.btn-soft-primary {
  background-color: #0d6efd;
  color: white;
  border-color: #0d6efd;
}

.modal-buttons button.btn-soft-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}
</style>
