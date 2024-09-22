<template>
    <div class="content-wrapper">
        <div class="edit-notification-container">
        <h1>編輯通知</h1>
        <form @submit.prevent="updateNotification" v-if="notification">
            <div class="mb-3">
            <label class="form-label">接收人</label>
            <select class="form-select" v-model="notification.notificationUserId">
                <option v-for="user in usersList" :key="user.userId" :value="user.userId">
                {{ user.userMail }}
                </option>
            </select>
            </div>
            <div class="mb-3">
            <label class="form-label">通知標題</label>
            <input class="form-control" v-model="notification.notificationTitle" />
            </div>
            <div class="mb-3">
            <label class="form-label">通知內容</label>
            <textarea class="form-control" v-model="notification.notificationContent"></textarea>
            </div>
            <div class="notification-actions">
            <button type="submit" class="btn btn-primary ms-1 px-4 rounded-pill">送出</button>
            <router-link to="/notification/list" class="btn btn-secondary ms-2 px-4 is-primary rounded-pill">取消</router-link>
            </div>
        </form>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import instance from '@/plugins/axios';

const route = useRoute();
const router = useRouter();
const notification = ref(null);
const usersList = ref([]);

const fetchNotification = async () => {
    try {
        const url = (`/notification/findNotiById/${route.params.id}`);
        // console.log('Requesting URL:',instance.defaults.baseURL+url);
        const response = await instance.get(url);
        // console.log('API response:', response.data);
        notification.value = response.data;
    } catch (err) {
        console.error('Error fetching notification:', err);
    }
};
const fetchUsers = async () => {
    try {
    const response = await instance.get('/notification/users');
    usersList.value = response.data;
    } catch (error) {
    console.error('No result:', error);
    }
};
const updateNotification = async () => {
    try {
        let data = JSON.stringify({
        "notificationId": notification.value.notificationId,
        "notificationUserId": notification.value.notificationUserId,
        "notificationTitle": notification.value.notificationTitle,
        "notificationContent": notification.value.notificationContent
        });

        await axios.put(
            `http://localhost:8080/meetu/notification/update/${notification.value.notificationId}`,
            data,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        router.push('/notification/list');
    } catch (error) {
        console.error('Error updating notification:', error);
    }
}
onMounted(async () => {
    await fetchUsers();
    await fetchNotification();
});
</script>

<style scoped>
.content-wrapper {
    padding: 20px;
    background-color: #f3f6f9;
    min-height: 100vh;
}

.edit-notification-container{
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}
</style>