import axiosInstance from 'axios';

export default {
    getTasks() {
        return axiosInstance.get('/task');
    },
    addTask(task) {
        return axiosInstance.post('tasks', task);
    }
};
