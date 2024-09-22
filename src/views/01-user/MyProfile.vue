<template>
    <div class="container-fluid pt-4 px-4">
    <div class="bg-light rounded align-items-center mx-0">
        <div class="profile-container">
    <div class="profile-card">
      <div v-if="!isEditing">
        <h1 style="text-align: center;">個人資料</h1><br><br>
        <div class="profile-header">
          <img :src="managerJson.picture" alt="Profile Photo" class="profile-photo" />
          <h1>{{ managerJson.name }}</h1>
          <div class="action-buttons">
            <button class="edit-btn" @click="toggleEdit">編輯</button>
            <button class="delete-btn" @click="dodelete">刪除帳號</button>
          </div>
        </div>
        <hr>
        <div class="profile-details">
          <p style="font-size: large;"><strong>帳號 : </strong>{{ managerJson.email }}</p>
          <p style="font-size: large;"><strong>姓名 : </strong>{{ managerJson.name }}</p>
          <p style="font-size: large;" v-if="managerJson.gender === 'M'"><strong>性別 : </strong>男</p>
          <p style="font-size: large;" v-else><strong>性別 : 女</strong></p>
          <p style="font-size: large;"><strong>生日 : </strong>{{ managerJson.birth }}</p>
          <p style="font-size: large;"><strong>部門 : </strong>{{ managerJson.department }}</p>
          <p style="font-size: large;"><strong>職務 : </strong>{{ managerJson.position }}</p>
        </div>
      </div>
      <div v-else>
        <h1 style="text-align: center;">修改個人資料</h1>
        <form @submit.prevent="handleSave">
            <div class="form-group">
                <label for="username">帳號</label>
                <input type="text" id="username" v-model="managerJson.email" placeholder="請輸入帳號" />
            </div>
            
            <div class="form-group">
                <label for="password">密碼</label>
                <input type="password" id="password" v-model="managerJson.password" placeholder="請輸入密碼" />
            </div>
            
            <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" id="name" v-model="managerJson.name" placeholder="請輸入姓名" />
            </div>
            
            <div class="form-group">
                <label for="gender">性別</label>
                <select id="gender" v-model="managerJson.gender" >
                    <option value="M">男</option>
                    <option value="F">女</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="birthday">生日</label>
                <input type="date" id="birthday" v-model="managerJson.birth" />
            </div>
            
            <div class="form-group">
                <label for="department">部門</label>
                <input type="text" id="department" v-model="managerJson.department" placeholder="請輸入部門" />
            </div>
            
            <div class="form-group">
                <label for="position">職務</label>
                <input type="text" id="position" v-model="managerJson.position" placeholder="請輸入職位" />
            </div>
            
            <div class="form-group">
              <label for="photo">照片</label>
              <input type="file" id="photo" @change="handlePhotoChange" accept="image/*" />
              <div v-if="editManager.picture" class="photo-preview">
                <img :src="editManager.picture" alt="Photo Preview" />
              </div>
            </div>
          <div class="form-actions">
            <button type="submit" class="save-btn">儲存</button>
            <button @click="toggleEdit" type="button" class="cancel-btn">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
    </div>
    </div>
</template>
    
<script setup>
    import useManagerStore from "@/stores/manager.js"
    import { ref } from 'vue';
    import axiosapi from '@/plugins/axios.js';
    import Swal from "sweetalert2";
    import router from "@/router/router";

    const managerStore = useManagerStore();
    const managerJson = ref({
        managerId: managerStore.id,
        email: "",
        password: "",
        name: "",
        gender: "",
        birth: "",
        department: "",
        position: "",
        picture: ""
    })
    let request = {
        headers: {
            'Authorization': managerStore.token
        }
    }

    function fetchManager(){
        axiosapi.get(`/managers/profile/${managerStore.id}`, request).then(function(response){
            managerJson.value.name = response.data.name;
            managerJson.value.email = response.data.email;
            managerJson.value.password = response.data.password;
            managerJson.value.gender = response.data.gender;
            managerJson.value.birth = response.data.birth;
            managerJson.value.department = response.data.department;
            managerJson.value.position = response.data.position;
            managerJson.value.picture = response.data.picture;
        }).catch(function(error){
            console.error("查詢個人資料失敗: ", error.message);
        })
    }

    fetchManager();

    function dodelete(){
        Swal.fire({
        title: "確定要註銷帳號?",
        text: "刪除後將無法復原",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                text:"Loading......",
                allowOutsideClick:false,
                showConfirmButton:false
            });

            axiosapi.delete('/managers/profile/'+managerJson.value.managerId, request).then(function(response){
                managerStore.setId("");
                managerStore.setName("");
                managerStore.setpicture("");
                managerStore.setLogedin(false);
                managerStore.setToken("");
                Swal.fire({
                    title: "註銷成功!",
                    text: "帳號已註銷",
                    icon: "success"
                }).then(function(){
                    sessionStorage.removeItem("manager");
                    router.push('/');
                });
            }).catch(function(error){
                Swal.fire({
                    icon: "error",
                    title: "刪除失敗",
                    text: error.message
                });
            })
        }
    });
    }
    
    const isEditing = ref(false)
    
    const editManager = ref({ ...managerJson.value })
    
    const toggleEdit = () => {
      if (isEditing.value) {
        managerJson.value = { ...editManager.value }
      } else {
        editManager.value = { ...managerJson.value }
      }
      isEditing.value = !isEditing.value
    }
    
    const file = ref(null);
    const handlePhotoChange = (event) => {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            const selectedFile = input.files[0];
            if (selectedFile instanceof Blob) { // 檢查選擇的文件是否為 Blob 對象
                file.value = selectedFile;
                const reader = new FileReader();
                reader.onload = (e) => {
                    editManager.value.picture = e.target.result;
                };
                reader.readAsDataURL(selectedFile); // 使用 Blob 對象讀取數據
            } else {
                console.error('選擇的文件無效，請選擇一個有效的文件。');
            }
        }
    }
    
    const handleSave = () => {
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
                            isEditing.value = false,
                            fetchManager()
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

<style scoped>
    .profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background-color: #ffffff2d; /* 更淺的背景色 */
}

.profile-card {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  position: relative; /* 用於編輯和刪除按鈕的絕對定位 */
  transition: box-shadow 0.3s ease;
}

.profile-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.75rem;
  margin: 0;
  color: #333;
}

.action-buttons {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem;
}

.edit-btn,
.delete-btn {
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #86b817;
  color: #fff;
}

.edit-btn:hover {
  background-color: #78a31b;
}

.delete-btn {
  background-color: #dc3545;
  color: #fff;
}

.delete-btn:hover {
  background-color: #c82333;
}

.profile-details p {
  margin: 0.5rem 0;
}

.profile-details strong {
  display: inline-block;
  width: 80px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: #555;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #86b817;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.save-btn,
.cancel-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-btn {
  background-color: #86b817;
  color: #fff;
}

.save-btn:hover {
  background-color: #78a31b;
}

.cancel-btn {
  background-color: #6c757d;
  color: #fff;
}

.cancel-btn:hover {
  background-color: #5a6268;
}

.photo-preview {
  margin-top: 1rem;
}

.photo-preview img {
  width: 100px;  /* 調整為您希望的寬度 */
  height: 100px; /* 調整為您希望的高度 */
  border-radius: 6px;
  object-fit: cover;
}
</style>