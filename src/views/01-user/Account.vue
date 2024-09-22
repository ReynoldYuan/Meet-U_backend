<template>
    <div class="container-fluid pt-4 px-4">
    <div class="bg-light rounded align-items-center mx-0">
    <div class="change-password-page">
        <div class="ts-divider"></div>
        <div class="ts-content is-tertiary is-vertically-padded">
            <div class="ts-container is-very-narrow has-vertically-spaced">
                <div class="ts-header is-big is-heavy">修改密碼</div>
                <div class="ts-text is-secondary">請輸入您的帳號</div>
            </div>
        </div>
        <div class="ts-divider"></div>
        <div class="ts-container is-very-narrow has-vertically-padded-big">
            <div class="ts-text is-label has-top-spaced-large">帳號</div>
            <div class="ts-input is-underlined has-top-spaced">
                <input type="email" v-model="username"/>
            </div>
            <div class="ts-text is-description has-top-spaced-small">僅能是英文字母和數字，且最少 8 字，最多 80 字。</div>
            <button class="ts-button is-fluid has-top-spaced-large" @click="next">下一步</button>
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

    const router = useRouter();
    const username = ref("");

    function next(){
        axiosapi.defaults.headers.authorization = "";

        Swal.fire({
            text:"Loading......",
            allowOutsideClick:false,
            showConfirmButton:false
        });

        if(username.value == ""){
            username.value = null;
        }
        let request = {
            email: username.value
        }
        axiosapi.post("/managers/checkMail", request).then(function(response){
            if(response.data.success){
                Swal.fire({
                        icon:"success",
                        text: response.data.message,
                        allowOutsideClick: false
                }).then(function(result){
                    router.push({path: "/updatePwd", query: { email: username.value } });
                })
            }
            else{
                Swal.fire({
                    icon:"error",
                    text: response.data.message
                })
            }
        }).catch(function(error){
            Swal.fire({
                icon:"error",
                text:"失敗:"+error.message
            })
        })
    }
</script>
    
<style>
    
</style>