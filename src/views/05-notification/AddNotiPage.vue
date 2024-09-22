<template>
    <div class="content-wrapper">
        <div class="add-notification-container">
          <h1>新增通知</h1>
          <div class="card">
            <div class="card-header">請填入新訊息</div>
            <div class="card-body">
              <form @submit.prevent="addNotification">
                <div class="mb-3">
                  <label class="form-label">接收人</label>
                  <select class="form-select" v-model="notification.notificationUserId">
                    <option value="">請選擇接收人</option>
                    <option value="all">All Users</option>
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
                <button type="submit" class="btn btn-primary ms-1 px-4 rounded-pill">送出</button>
                <router-link to="/notification/list" class="btn btn-secondary ms-2 px-4 is-primary rounded-pill">取消</router-link>
              </form>
              <button @click="doInputAll" style="margin-left: 20px;"> 一鍵輸入(All)</button>
              <button @click="doInputUser" style="margin-left: 20px;"> 一鍵輸入(User)</button>
            </div>
          </div>
      </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import instance from '@/plugins/axios';
import Swal from 'sweetalert2';

const router = useRouter();

const notification = reactive({
  notificationUserId: '',
  notificationTitle: '',
  notificationContent: ''
});

const usersList = ref([]);

const addNotification = async () => {
  try {
    const formData = new FormData();
    if (notification.notificationUserId !== 'all') {
      formData.append('notificationUserId', notification.notificationUserId);
    }
    formData.append('notificationTitle', notification.notificationTitle);
    formData.append('notificationContent', notification.notificationContent);

    let response;
    if (notification.notificationUserId === 'all') {
      response = await instance.post('/notification/addAll', formData);
    } else {
      response = await instance.post('/notification/add', formData);
    }

    if (response.status === 200) {
      // alert('通知已成功發送！');
      await Swal.fire('寄送成功', '', 'success');
      router.push('/notification/list');
    } else {
      // alert('發送通知時出現問題，請稍後再試。');
      await Swal.fire('寄送失敗', '', 'error');
    }
  } catch (error) {
    console.error('Error adding notification:', error);
    // alert('發送通知時出現錯誤，請檢查您的輸入並稍後再試。');
  }
};

const fetchUsers = async () => {
  try {
    const { data } = await instance.get('/notification/users');
    usersList.value = data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

function doInputAll(){
  notification.notificationTitle = '華安縣"才子佳人"文化節';
  notification.notificationContent = '時間：本月15日，午時三刻（下午1:30），地點：縣衙大堂，活動：才藝比拼古裝秀，尋找"唐伯虎"。備註：入場可獲贈迷你秋香圖一幅歡迎參加！華安縣文化處'
}

function doInputUser(){
  notification.notificationTitle = '秋香小姐台鑒：';
  notification.notificationContent = '近日有一名自稱唐寅的男子四處遊蕩，小姐務必小心提防。若遇可疑人士，可用鴨蛋檢驗真偽。武狀元 代筆'
}

onMounted(fetchUsers);
</script>

<style scoped>
.content-wrapper {
    padding: 20px;
    background-color: #f3f6f9;
    min-height: 100vh;
}

.add-notification-container{
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}
</style>