<template>
        <div class="container-fluid pt-4 px-4">
        <div class="bg-light rounded align-items-center mx-0">
        <div class="login-container">
        <div class="login-box">
        <h1>登入</h1>
        <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">帳號</label>
          <input type="text" id="email" v-model="email" :class="{ 'is-invalid': errors.email }" placeholder="請輸入帳號" />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">密碼</label>
          <input type="password" id="password" v-model="password" :class="{ 'is-invalid': errors.password }" placeholder="請輸入密碼" />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <button class="login" type="submit">登入</button>
        </form>
        <RouterLink to="/account">忘記密碼?</RouterLink><br>
        <button class="btn btn-outline-success" @click="doInput">Manager1</button>
        </div>
        </div>
        </div>
        </div>

</template>
    
<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axiosapi from '@/plugins/axios.js';
    import Swal from 'sweetalert2';
    import useManagerStore from '@/stores/manager.js';

    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const errors = ref({})
    const managerStore = useManagerStore();

    function login(){
        errors.value = {} // 清除舊的錯誤
        managerStore.setToken("");
        managerStore.setId("");
        managerStore.setName("");
        managerStore.setLogedin(false);
        axiosapi.defaults.headers.authorization = "";
        
        if(!email.value){
                errors.value.email = '帳號是必填的'
        }
        if(!password.value){
                errors.value.password = '密碼是必填的'
        }
        else{
                Swal.fire({
                        text:"Loading......",
                        allowOutsideClick:false,
                        showConfirmButton:false
                });
                let request = {
                        email: email.value,
                        password: password.value
                }
                axiosapi.post("/managers/login", request).then(function(response){
                        if(response.data.success){
                                Swal.fire({
                                        icon:"success",
                                        text: response.data.message,
                                        allowOutsideClick: false
                                }).then(function(result){
                                        axiosapi.defaults.headers.authorization = "Bearer " + response.data.token;
                                        managerStore.setToken(axiosapi.defaults.headers.authorization);
                                        managerStore.setId(response.data.managerId);
                                        managerStore.setName(response.data.name);
                                        managerStore.setpicture(response.data.picture);
                                        managerStore.setLogedin(true);
                                        router.push("/loginIndex");
                                })
                        }
                        else{
                                message.value = response.data.message;
                                Swal.fire({
                                        icon:"error",
                                        text: response.data.message
                                })
                        }
                }).catch(function(error){
                        Swal.fire({
                                icon:"error",
                                text:"登入失敗:"+error.message
                        })
                })
        }
    }

    function doInput(){
        email.value = 'manager1@example.com';
        password.value = '1234';
    }
</script>
    
<style scoped>
    .login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: #f5f5f5; /* 單一背景顏色 */
}

.login-box {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
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

input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #86b817;
  outline: none;
}

.is-invalid {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.login {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #86b817;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login:hover {
  background-color: #86b817;
}
</style>