import { defineStore } from 'pinia';
import {authenticationService} from "@/services/client.js";
import { computed, ref } from 'vue';
import {jwtDecode} from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));

    async function logIn(user) {
        try {
            const response = await authenticationService.login(user);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                token.value = response.data.token;
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async function signUp(registerUser) {
        try {
            const response = await authenticationService.register( registerUser);

        } catch (error) {
            console.error('Sign up failed:', error);
            throw error;
        }
    }

    function logOut() {
        localStorage.removeItem('token');
        token.value = null;
    }

    // Computed properties
    const loggedInUser = computed(() => {
        return token.value ? jwtDecode(token.value) : null;
    });

    const isLoggedIn = computed(() => {
        return !!token.value;
    });

    return {
        logIn,
        signUp,
        logOut,
        isLoggedIn,
        loggedInUser,
        token,
    };
});
