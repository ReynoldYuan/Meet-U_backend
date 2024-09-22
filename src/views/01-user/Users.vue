<template>
    <div class="container-fluid pt-4 px-4">
    <div class="row bg-light rounded align-items-center mx-0">
      <div class="card user-card" v-for="obj in users" :key="obj.userMail">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="obj.usersProfile.userPics" class="img-fluid rounded-start" alt="沒有頭貼">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">帳號 : {{ obj.userMail }}</h5>
              <h5 class="card-text">姓名 : {{ obj.usersProfile.userName }}</h5>
              <h5 class="card-text" v-if="obj.usersProfile.userGender === 'M'">性別 : 男</h5>
              <h5 class="card-text" v-else>性別 : 女</h5>
              <h5 class="card-text" v-if="obj.userIsBan === 'N'">停權狀態 : 未停權</h5>
              <h5 class="card-text" v-else-if="obj.userIsBan === 'R'">停權狀態 : 已停權</h5>
              <h5 class="card-text" v-else>停權狀態 : 帳號已刪除</h5>
              <h5 class="card-text" v-if="obj.deleteState === 0">註銷狀態 : 未註銷</h5>
              <h5 class="card-text" v-else>註銷狀態 : 已註銷</h5>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-secondary" disabled @click="ondelete(obj.userMail)" v-if="obj.deleteState === 0 && obj.userIsBan != 'R'">恢復帳號</button>
                <button type="button" class="btn btn-success" @click="ondelete(obj.userMail)" v-else>恢復帳號</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import axiosapi from 'axios';
    import Swal from 'sweetalert2';
    import useManagerStore from '@/stores/manager.js'
    
    const managerStore = useManagerStore();
    const users = ref([]);

    onMounted(function(){
        fetchUsers();
    })

    function fetchUsers() {
        axiosapi.get("http://localhost:8080/meetu/users/profile").then(function(response){
            users.value = response.data;
            //雖然寫法正確，但不能用for迴圈給值，標籤會抓不到陣列內的值
            // for(let i = 0; i < length.value; i++){
            //     users[i] = response.data[i];
            //     console.log(users[i]);
            // }
        }).catch(function(error){
            console.log("callFindAll Error : " + error);
        })
    }

    function ondelete(userMail){
        Swal.fire({
            title: "確定要恢復此帳號?",
            text: "恢復後該使用者就能繼續使用",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "確定"
        }).then((result) => {
            if (result.isConfirmed) {
                let request = {
                    headers: {
                        'Authorization': managerStore.token
                    }
                }
                axiosapi.delete(`http://localhost:8080/meetu/users/profile/recover/${userMail}`, request).then(function(response){
                    if(response.data == "恢復成功") {
                        Swal.fire("已恢復", "該使用者已成功恢復", "success");
                        // 重新獲取用戶列表以更新畫面
                        fetchUsers();
                    } else {
                        Swal.fire("錯誤", "無法恢復，此使用者並無註銷或被停權", "error");
                    }
                }).catch(function(error){
                    if(error.response.status == 403){
                        Swal.fire("無法恢復", "你沒有權限", "error");
                    }
                    else{
                        console.log("Delete user error:", error);
                        Swal.fire("錯誤", "恢復使用者時發生錯誤", "error");
                    }
                });
            }
        });
    }
</script>

<style scoped>
.user-card {
  max-width: 540px;
  margin: 1em auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.user-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 1rem;
  color: #555;
}

img {
  max-width: 100%;
  height: auto;
}

.col-md-4 {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>