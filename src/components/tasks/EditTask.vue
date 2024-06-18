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

<script>
import { reactive, onMounted } from 'vue';
import { taskService } from '@/services/client.js';
import { useRoute, useRouter } from 'vue-router';

export default {
  props: {
    id: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const editedTask = reactive({
      taskName: '',
      description: '',
      status: '',
      dateAdded: '',
      estimatedFinishDate: ''
    });

    const fetchTaskDetails = () => {
      if (props.id) {
        taskService.getTaskById(props.id)
            .then(response => {
              Object.assign(editedTask, response.data);
            })
            .catch(error => {
              console.error('Error fetching task details:', error);
            });
      } else {
        console.error('No task id provided.');
      }
    };

    const updateTask = () => {
      const id = route.params.taskId;

      if (!id) {
        console.error('No task id provided.');
        return;
      }

      taskService.updateTask(id, editedTask)
          .then(response => {
            console.log('Task updated successfully:', response.data);
            // editedTask = { ...response.data };
            router.push('/');
          })
          .catch(error => {
            console.error('Error updating task:', error);
          });
    };

    onMounted(fetchTaskDetails);

    return {
      editedTask,
      updateTask
    };
  }
};
</script>

<style>
/* Add any styles you need here */
</style>
