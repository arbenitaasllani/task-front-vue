import client from '../client.js'

class UserApi {
    constructor() {
        this.url = '/users/'
    }

    async findAll() {
        try {
            const response = await client.get(this.url)
            return response.status === 200 ? response.data : []
        } catch (err) {
            console.error('Error fetching users!', err)
            return []
        }
    }

    async findOne(userId) {
        try {
            const response = await client.get(`${this.url}${userId}`)
            return response.status === 200 ? response.data : null
        } catch (err) {
            console.error(`Error fetching user with id: ${userId}!`, err)
            return null
        }
    }

    async create(user) {
        try {
            const response = await client.post(this.url, user)
            return response.status === 201 || response.status === 200 ? response.data : null
        } catch (err) {
            console.error(`Error creating user: ${user}!`, err)
            return 'NOT CREATED!'
        }
    }
}