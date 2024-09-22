<template>
    <div class="container-fluid pt-4 px-4">
    <div class="bg-light rounded align-items-center mx-0">
    <h3>註冊</h3>
    <form @submit.prevent="callCreate">
        <!-- 表單輸入字段 -->
        <div class="mb-3">
            <label for="InputEmail1" class="form-label">帳號</label>
            <input type="email" v-model="managerJson.email" required class="form-control" id="InputEmail1">
        </div>
        <div class="mb-3">
            <label for="InputPassword1" class="form-label">密碼</label>
            <input type="password" v-model="managerJson.password" required class="form-control" id="InputPassword1">
        </div>
        <div class="mb-3">
            <label for="InputName1" class="form-label">姓名</label>
            <input type="text" v-model="managerJson.name" required class="form-control" id="InputName1">
        </div>
        <div class="mb-3">
            <label class="form-label">性別</label>
            <label><input type="radio" v-model="managerJson.gender" required value="M">男</label>
            <label><input type="radio" v-model="managerJson.gender" required value="F">女</label>
        </div>
        <div class="mb-3">
            <label for="InputBirth1" class="form-label">生日</label>
            <input type="date" v-model="managerJson.birth" required class="form-control" id="InputBirth1">
        </div>
        <div class="mb-3">
            <label for="InputDepartment1" class="form-label">部門</label>
            <input type="text" v-model="managerJson.department" class="form-control" id="InputDepartment1">
        </div>
        <div class="mb-3">
            <label for="Inputposition1" class="form-label">職位</label>
            <input type="text" v-model="managerJson.position" class="form-control" id="Inputposition1">
        </div>
        <div class="mb-3">
            <label for="InputPhoto1" class="form-label">個人照片</label>
            <input type="file" @change="handleFileUpload" accept="image/*" class="form-control" id="InputPhoto1">
        </div>
        
        <button type="submit" class="btn btn-primary rounded-pill py-2 px-4">送出</button>
        <RouterLink to="/login" class="btn btn-primary rounded-pill py-2 px-4">返回</RouterLink>
    </form>
    </div>
    </div>
</template>
    
<script setup>
    import { ref } from 'vue';
    import axiosapi from '@/plugins/axios.js';
    import Swal from 'sweetalert2';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    // 用於保存表單數據的 ref
    const managerJson = ref({
        email: '',
        password: '',
        name: '',
        gender: '',
        birth: '',
        department: '',
        position: '',
    });

    const file = ref(null);

    function handleFileUpload(event) {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            file.value = input.files[0];
        }
    }

    async function callCreate() {
        // 準備發送表單數據
        // 將表單數據轉換為 JSON 字串
        const jsonPart = JSON.stringify(managerJson.value);
        const formDataToSend = new FormData();

        // 添加 JSON 字串和文件到 FormData
        formDataToSend.append('managerJson', jsonPart);
        if (file.value) {
            formDataToSend.append('picture', file.value);
        }

        try {
            // 發送 POST 請求到後端
            const response = await axiosapi.post('/managers/profile', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response);
            // 顯示成功提示
            Swal.fire({
                icon: 'success',
                title: '成功',
                text: '註冊成功！'
            }).then(router.push({ name: 'login-link' }));
        } catch (error) {
            // 顯示錯誤提示
            console.error('錯誤信息:', error.response?.data || error.message);
            Swal.fire({
                icon: 'error',
                title: '錯誤',
                text: '註冊失敗，請重試。'
            });
        }
    }
</script>
    
<style>
    
</style>