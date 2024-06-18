import axios from 'axios';

const BASE_URL = 'http://localhost:8080';


class AuthenticationService {
    register(data) {
        return axios.post(`${BASE_URL}/api/auth/register`, data);
    }

    login(data) {
        return axios.post(`${BASE_URL}/api/auth/login`, data);
    }
}


class TaskService {
    getAllTasks() {
        return axios.get(`${BASE_URL}/task`);
    }

    addTask(data) {
        return axios.post(`${BASE_URL}/task`, data);
    }

    getTaskById(id) {
        let URL = `${BASE_URL}/task/${id}`;
        return axios.get(URL);
    }

    updateTask(id, data) {
        let URL = `${BASE_URL}/task/${id}`;
        return axios.put(URL, data);
    }

    deleteTask(id) {
        let URL = `${BASE_URL}/task/${id}`;
        return axios.delete(URL);
    }
}


export const taskService = new TaskService();
export const authenticationService = new AuthenticationService();
