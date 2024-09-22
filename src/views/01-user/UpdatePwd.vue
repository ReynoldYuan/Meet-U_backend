<template>
    <div class="container-fluid pt-4 px-4">
    <div class="bg-light rounded align-items-center mx-0">
    <div class="change-password-page">
        <div class="ts-divider"></div>
        <div class="ts-content is-tertiary is-vertically-padded">
            <div class="ts-container is-very-narrow has-vertically-spaced">
                <div class="ts-header is-big is-heavy">修改密碼</div>
                <div class="ts-text is-secondary">忘記密碼了嗎?那就建立新的密碼取代舊的密碼吧!</div>
            </div>
        </div>
        <div class="ts-divider"></div>
        <div class="ts-container is-very-narrow has-vertically-padded-big">
            <div class="ts-text is-label has-top-spaced-large">密碼</div>
            <div class="ts-input is-underlined has-top-spaced">
                <input type="password" v-model="newPwd"/>
            </div>
            <div class="ts-text is-label has-top-spaced-large">確認密碼</div>
            <div class="ts-input is-underlined has-top-spaced">
                <input type="password" v-model="checkPwd"/>
            </div>
            <div class="ts-text is-description has-top-spaced-small">僅能是英文字母和數字，最多 100 字。</div>
            <button class="ts-button is-fluid has-top-spaced-large" @click="confirm">確認修改</button>
        </div>
    </div>
    </div>
    </div>
</template>
    
<script setup>
    import { ref } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import axiosapi from '@/plugins/axios.js';
    import Swal from 'sweetalert2';

    const router = useRouter();
    const route = useRoute();
    const email = route.query.email;
    const newPwd = ref("");
    const checkPwd = ref("");

    function confirm(){
        axiosapi.defaults.headers.authorization = "";

        Swal.fire({
            text:"Loading......",
            allowOutsideClick:false,
            showConfirmButton:false
        });

        if(newPwd.value == checkPwd.value){
            let request = {
                email: email,
                password: checkPwd.value
            }

            axiosapi.put("/managers/checkPassword", request).then(function(response){
                if(response.data.success){
                    Swal.fire({
                            icon:"success",
                            text: response.data.message,
                            allowOutsideClick: false
                    }).then(function(result){
                        router.push("/login");
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

    }
</script>
    
<style>
    
</style>