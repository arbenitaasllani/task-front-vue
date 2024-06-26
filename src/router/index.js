import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAuthStore} from "@/stores/auth.js";
import RegisterView from "@/views/auth/RegisterView.vue";
import LogInView from "@/views/auth/LogInView.vue";
import EditTask from "@/components/tasks/EditTask.vue";
import AddTask from "@/views/AddTask.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/login',
            name: 'login',
            component: LogInView
        },

        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/edit/:taskId',
            name: 'edit',
            component: EditTask,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/addTask',
            name: 'addTask',
            component: AddTask,
            meta: {
                requiresAuth: true
            }
        }


    ]
})

router.beforeEach((to, from) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {

        return {
            name: 'login',
            query: {redirect: to.fullPath},
        }
    } else if (!to.meta.requiresAuth && authStore.isLoggedIn) {
        return {
            name: 'home'
        }
    }
})

export default router

