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

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteTask() {
      console.log('Delete task:', this.task);
      // Implement deletion logic here
    }
  }
};
</script>

<style scoped>
.task-item {
  margin-bottom: 16px;
}
</style>
