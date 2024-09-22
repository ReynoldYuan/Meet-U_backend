<template>
    <div class="container-fluid pt-4 px-4">
    <div class="bg-light rounded align-items-center mx-0">
    <h3>修改個人資料</h3>
    <form @submit.prevent="callUpdate"> <!-- 可能要加enctype="multipart/form-data" -->
        <input type="hidden" name="managerId" :value="managerStore.id"/>
        
        <div class="mb-3">
            <label for="InputEmail1" class="form-label">帳號</label>
            <input type="email" readonly class="form-control form-control-plaintext" id="InputEmail1" v-model="managerJson.email">
        </div>
        <div class="mb-3">
            <label for="InputPassword1" class="form-label">密碼</label>
            <input type="password" required class="form-control" id="InputPassword1" v-model="managerJson.password">
        </div>
        <div class="mb-3">
            <label for="InputName1" class="form-label">姓名</label>
            <input type="text" required class="form-control" id="InputName1" v-model="managerJson.name">
        </div>
        <div class="mb-3">
            <label class="form-label">性別</label>
            <div v-if="managerJson.gender.includes('M')">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" id="inlineRadio1" type="radio" checked required value="M" v-model="managerJson.gender">
                    <label class="form-check-label" for="inlineRadio1">男</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" id="inlineRadio2" type="radio" required value="F" v-model="managerJson.gender">
                    <label class="form-check-label" for="inlineRadio2">女</label>
                </div>
            </div>
            <div v-else>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" id="inlineRadio1" type="radio" required value="M" v-model="managerJson.gender">
                    <label class="form-check-label" for="inlineRadio1">男</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" id="inlineRadio2" type="radio" checked required value="F" v-model="managerJson.gender">
                    <label class="form-check-label" for="inlineRadio2">女</label>
                </div>
            </div>
        </div>
        <div class="mb-3">
            <label for="InputBirth1" class="form-label">生日</label>
            <input type="date" required class="form-control" id="InputBirth1" v-model="managerJson.birth">
        </div>
        <div class="mb-3">
            <label for="InputJob1" class="form-label">部門</label>
            <input type="text" class="form-control" id="InputJob1" v-model="managerJson.department">
        </div>
        <div class="mb-3">
            <label for="InputJobPosi1" class="form-label">職務</label>
            <input type="text" class="form-control" id="InputJobPosi1" v-model="managerJson.position">
        </div>
        <div class="mb-3">
            <label for="InputPhoto1" class="form-label">個人照片</label>
            <input type="file" @change="handleFileUpload" accept="image/*" class="form-control" id="InputPhoto1">
        </div>
        
        <button type="submit" class="btn btn-primary rounded-pill py-2 px-4">送出</button>
        <RouterLink to="/myprofile" class="btn btn-primary rounded-pill py-2 px-4">返回</RouterLink>
    </form>
    </div>
    </div>
</template>
    
<script setup>
    import useManagerStore from "@/stores/manager.js"
    import { ref, onMounted } from 'vue';
    import axiosapi from '@/plugins/axios.js';
    import Swal from 'sweetalert2';
    import { useRoute } from "vue-router";
    import { useRouter } from 'vue-router';

    const route = useRoute();
    const security = ref(true);

    onMounted(function(){
        console.log("讀取到頁面了");
        let request = {
            headers: {
                "Authorization": managerStore.token
            }
        }
        axiosapi.get(`/managers/profile/${managerStore.id}`, request).then(function(response){
            managerJson.value.name = response.data.name;
            managerJson.value.email = response.data.email;
            managerJson.value.password = response.data.password;
            managerJson.value.gender = response.data.gender;
            managerJson.value.birth = response.data.birth;
            managerJson.value.department = response.data.department;
            managerJson.value.position = response.data.position;
        }).catch(function(error){
            console.error("查詢個人資料失敗: ", error.message);
        })
    });

    const managerStore = useManagerStore();

    // 用於保存表單數據的 ref
    const managerJson = ref({
        managerId: managerStore.id,
        email: "",
        password: "",
        name: "",
        gender: "",
        birth: "",
        department: "",
        position: ""
    });

    const file = ref(null);

    function handleFileUpload(event) {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            file.value = input.files[0];
        }
    }

    const router = useRouter();

    async function callUpdate() {
        Swal.fire({
            icon: "warning",
            title: "確定要修改資料嗎?",
            showDenyButton: true,
            confirmButtonText: "確定",
            denyButtonText: `取消`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
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
                    axiosapi.put('/managers/profile', formDataToSend, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(function(response){
                        console.log(response);
                        // 顯示成功提示
                        Swal.fire({
                            icon: 'success',
                            title: '成功',
                            text: '修改成功！'
                        }).then(
                            router.push("/myprofile")
                        );
                    })
                } catch (error) {
                    // 顯示錯誤提示
                    console.error('錯誤信息:', error.response?.data || error.message);
                    Swal.fire({
                        icon: 'error',
                        title: '修改失敗',
                        text: error.message
                    });
                }
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }
</script>
    
<style>
    
</style>