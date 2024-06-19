<template>
  <div class="container">
    <div class="col-md-6">
      <h3 class="text-center mt-4">Log In</h3>
      <form @submit.prevent="handleSubmit" class="mt-5">
        <div class="mb-3">
          <input type="email" class="form-control" id="Username" placeholder="Email" v-model.trim="formData.email">
        </div>

        <div class="mb-3">
          <input type="password" class="form-control" id="password" placeholder="Password" v-model.trim="formData.password">
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-color px-5 w-100">Login</button>
        </div>

        <div class="form-text text-center mt-3">
          Not Registered? <router-link to="/register" class="navbar-brand"><strong>Create an Account</strong></router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const authStore = useAuthStore();

const formData = reactive({
  email: '',
  password: '',
});

const router = useRouter();
const route = useRoute();

async function handleSubmit() {
  if (!formData.email || !formData.password) {
    await Swal.fire({
      title: 'Error!',
      text: 'Email and password are required.',
      icon: 'error',
    });
    return;
  }

  try {
    await authStore.logIn(formData);
    const redirectUrl = `${route.query.redirect || '/'}`;
    await router.push(redirectUrl).then(() => {
      window.location.reload();
    });
  } catch (e) {
    await Swal.fire({
      title: 'Error!',
      text: e.message,
      icon: 'error',
    });
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.btn-color {
  background-color: #0e1c36;
  color: #fff;
  border: 2px solid transparent; /* Ensure consistent button size */
}

.btn-color:hover {
  background-color: #fff;
  color: #0e1c36;
  border-color: #0e1c36;
}

a {
  text-decoration: none;
}
</style>
