<template>
    <div class="content-wrapper">
        <div class="notification-container">
            <h1 class="page-title">
            系統通知
            <RouterLink :to="{ name: 'addNotiPage-link' }" class="add-noti-link">
                <i class="fa fa-plus-circle"></i>
            </RouterLink>
            </h1>
    
        <div class="ts-box has-light">
        <div class="ts-tab">
            <button 
                v-for="tab in ['所有通知', '全體通知', '個人通知']" 
                :key="tab"
                @click="activeTab = tab"
                :class="['item', { 'is-active': activeTab === tab }]"
            >
                {{ tab }}
            </button>
        </div>
        <div class="ts-divider"></div>
        <div class="ts-content">
            <div class="notification-list">
                <!-- <template v-if="activeTab === '所有通知' || activeTab === '全體通知'"> -->
                <div v-for="noti in currentNotifications" :key="noti.notificationId" class="notification-item">
                    <div class="notification-header" @click="toggleNotification(noti.notificationId)">
                    <span class="notification-title">收件人：{{ noti.userName }}</span>
                    <span class="notification-title">{{ noti.notificationTitle }}</span>
                    <span class="notification-time">{{ formatDate(noti.notificationTime) }}</span>
                    </div>
                    <div v-show="expandedNotifications.includes(noti.notificationId)" class="notification-content">
                    <p>{{ noti.notificationContent }}</p>
                    <div class="notification-actions">
                        <router-link :to="{ name: 'editNotiPage-link', params: { id: noti.notificationId } }" class="ts-button is-small is-primary">
                        <i class="fa fa-edit"></i> 編輯
                        </router-link>
                        <button @click="deleteNoti(noti.notificationId)" class="ts-button is-small is-negative">
                        <i class="fa fa-trash"></i> 刪除
                        </button>
                    </div>
                    </div>
                </div>
                <!-- </template> -->

                <!-- <template v-if="activeTab === '所有通知' || activeTab === '個人通知'">
                <div v-for="noti in personalNotiList" :key="noti.notificationId" class="notification-item">
                    <div class="notification-header" @click="toggleNotification(noti.notificationId)">
                    <span class="notification-title">收件人：{{ noti.userName }}</span>
                    <span class="notification-title">{{ noti.notificationTitle }}</span>
                    <span class="notification-time">{{ formatDate(noti.notificationTime) }}</span>
                    </div>
                    <div v-show="expandedNotifications.includes(noti.notificationId)" class="notification-content">
                    <p>{{ noti.notificationContent }}</p>
                    <div class="notification-actions">
                        <router-link :to="{ name: 'editNotiPage-link', params: { id: noti.notificationId } }" class="ts-button is-small is-primary">
                        <i class="fa fa-edit"></i> 編輯
                        </router-link>
                        <button @click="deleteNoti(noti.notificationId)" class="ts-button is-small is-negative">
                        <i class="fa fa-trash"></i> 刪除
                        </button>
                    </div>
                    </div>
                </div>
                </template> -->
            </div>
        </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import instance from '@/plugins/axios';

const notiList = ref([]);
const activeTab = ref('所有通知');
const expandedNotifications = ref([]);

const sortedNotiList = computed(() => {
    return [...notiList.value].sort((a, b) => new Date(b.notificationTime) - new Date(a.notificationTime));
});

const globalNotiList = computed(() => {
    // return notiList.value.filter(noti => noti.isGlobal === '1');
    return sortedNotiList.value.filter(noti => noti.isGlobal === '1');
});

const personalNotiList = computed(() => {
    // return notiList.value.filter(noti => noti.isGlobal === '0');
    return sortedNotiList.value.filter(noti => noti.isGlobal === '0');
});

const currentNotifications = computed(() => {
    switch (activeTab.value) {
        case '所有通知':
        return sortedNotiList.value;
        case '全體通知':
        return globalNotiList.value;
        case '個人通知':
        return personalNotiList.value;
        default:
        return [];
    }
});

const fetchNotifications = async () => {
    try {
        const response = await instance.get('/notification/list');
        // notiList.value = response.data.sort((a, b) => new Date(b.notificationTime) - new Date(a.notificationTime));
        notiList.value = response.data;
    } catch (error) {
        console.error('獲取通知時出錯:', error);
    }
};

const deleteNoti = async (id) => {
    try {
        await instance.delete(`/notification/delete/${id}`);
        await fetchNotifications();
    } catch (error) {
        console.error('刪除通知時出錯:', error);
    }
};

const formatDate = (date) => {
    return new Date(date).toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const toggleNotification = (id) => {
    const index = expandedNotifications.value.indexOf(id);
    if (index === -1) {
        expandedNotifications.value.push(id);
    } else {
        expandedNotifications.value.splice(index, 1);
    }
};

onMounted(fetchNotifications);

</script>

<style scoped>
.content-wrapper {
    padding: 20px;
    background-color: #f3f6f9;
    min-height: 100vh;
}

.notification-container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.page-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: #86b817;
    font-size: 28px;
}

.add-noti-link {
    color: #86b817;
    font-size: 30px;
}

.notification-item {
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    margin-bottom: 15px;
    overflow: hidden;
}

.notification-header {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    background-color: #f8f9fa;
    cursor: pointer;
}

.notification-title {
    font-weight: bold;
    color: #86b817;
}

.notification-time {
    color: #6c757d;
    font-size: 0.9em;
}

.notification-content {
    padding: 15px;
    border-top: 1px solid #e0e0e0;
}

.notification-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

.ts-button {
    margin-left: 10px;
}

</style>