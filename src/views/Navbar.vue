<template>
    <nav class="navbar navbar-expand qbg-light navbar-light sticky-top px-4 py-0">
                <a href="#" class="sidebar-toggler flex-shrink-0" @click.prevent="toggleSidebar">
                    <i class="fa fa-bars"></i>
                </a>
                <form class="d-none d-md-flex ms-4">
                    <input class="form-control border-0" type="search" placeholder="Search">
                </form>

                <div class="navbar-nav align-items-center ms-auto">
                    <RouterLink to="/login" class="btn btn-primary rounded-pill py-2 px-4" v-if="!managerStore.isLogedin" style="margin-top: 10px;">
                        登入</RouterLink>
                    <div class="nav-item dropdown" v-else>
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img class="rounded-circle me-lg-2" :src="managerStore.picture" alt="" style="width: 40px; height: 40px;">
                            <span class="d-none d-lg-inline-flex">{{ managerStore.name }}</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <RouterLink to="/myprofile" class="dropdown-item">個人資料</RouterLink>
                            <button class="dropdown-item" @click="logout">Log Out</button>
                        </div>
                    </div>
                </div>
            </nav>
</template>
    
<script setup>
import router from "@/router/router.js";
import useManagerStore from "@/stores/manager.js"
import Swal from "sweetalert2";

const managerStore = useManagerStore();
const emit = defineEmits(['toggle-sidebar']);

const toggleSidebar = () => {
    emit('toggle-sidebar');
};

function logout(){
    Swal.fire({
        title: "確定要登出?",
        showCancelButton: true,
        icon: "question"
    }).then((result) => {
        if (result.isConfirmed){
            managerStore.setToken("");
            managerStore.setId("");
            managerStore.setName("");
            managerStore.setpicture("");
            managerStore.setLogedin(false);
            Swal.fire({
                    icon:"success",
                    title: "登出成功",
                    allowOutsideClick: false
            }).then(function(){
                sessionStorage.removeItem("manager");
                router.push("/");
            });
        }
    });
}

</script>
    
<style>
.navbar {
  height: 60px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  background-color: rgb(63, 63, 63)
}

.sidebar-toggler {
  cursor: pointer;
  color: #86b817;
}

.form-control {
  border: 1px solid #e0e0e0 !important;
  border-radius: 20px;
}

.btn-primary {
  background-color: #86b817;
  border-color: #86b817;
}

.btn-primary:hover {
  background-color: #86b817;
  border-color: #86b817;
}

.nav-link {
  color: #86b817 !important;
}

.dropdown-menu {
  border: 1px solid #e8f6e9 !important;
}

.dropdown-item:hover {
  background-color: #e8f6e9;
}

.rounded-circle {
  border: 2px solid #86b817;
}
</style>