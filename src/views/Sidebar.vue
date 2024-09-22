<!-- <template>
    <div class="sidebar pe-4 pb-3" :class="{ 'open': !isOpen }">
      <nav class="navbar bg-light navbar-light">
        <router-link to="/" class="navbar-brand mx-4 mb-3">
          <h3 class="text-primary">
            <img src="../assets/images/MeetU.png" style="width: 80px" />MeetU
          </h3>
        </router-link>
        <div class="navbar-nav w-100">
          <p class="text-primary" style="font-size: 24px; text-align: center;">
            <i class="fa fa-cog me-2"></i>後台管理
          </p>
          <router-link :to="{ name: 'users-link' }" class="nav-item nav-link">
            <i class="fa fa-user-circle me-2"></i>會員管理
          </router-link>
          <router-link :to="{ name: 'analysis-link' }" class="nav-item nav-link">
            <i class="fa fa-chart-bar me-2"></i>活動分析
          </router-link>
          <div class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <i class="fa fa-exclamation-triangle me-2"></i>檢舉管理
            </a>
            <div class="dropdown-menu bg-transparent border-0">
              <router-link :to="{ name: 'userReportsList-link' }" class="dropdown-item">會員檢舉</router-link>
              <router-link :to="{ name: 'activityReportsList-link' }" class="dropdown-item">活動檢舉</router-link>
              <router-link :to="{ name: 'commentReportsList-link' }" class="dropdown-item">留言檢舉</router-link>
            </div>
          </div>
          <router-link :to="{ name: 'showNotiPage-link' }" class="nav-item nav-link">
            <i class="fa fa-paper-plane me-2"></i>系統通知
          </router-link>
        </div>
      </nav>
    </div>
  </template>
  
<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: true
  }
});

</script>

<style>

.sidebar {
  width: 250px;
  transition: margin-left 0.3s;
}

.sidebar.open {
  margin-left: -250px;
}

</style> -->

<template>
  <div class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="sidebar-content">
      <div class="logo-container">
        <router-link :to="homeRoute" class="logo-wrapper">
          <span><font-awesome-icon icon="champagne-glasses"/> MeetU</span>
        </router-link>
      </div>

      <nav class="navbar navbar-light">
        <div class="navbar-nav w-100">
          <p class="text-light" style="font-size: 24px; text-align: center;">
            <i class="fa fa-cog me-2"></i>
            <span v-if="!isCollapsed">後台管理</span>
          </p>
          <!-- <router-link v-for="item in menuItems" :key="item.name" :to="item.route" class="nav-item nav-link"> -->
            <router-link 
            v-for="item in menuItems" 
            :key="item.name" 
            :to="item.route" 
            class="nav-item nav-link"
            @click.native.prevent="handleNavigation(item.route)"
          >
            <i :class="item.icon"></i>
            <span v-if="!isCollapsed">{{ item.name }}</span>
          </router-link>
        </div>
      </nav>
    </div>
    <div class="sidebar-background"></div>
  </div>
</template>

<script setup>

import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useManagerStore from "@/stores/manager.js";

const managerStore = useManagerStore();
const router = useRouter();

const homeRoute = computed(() => {
  return managerStore.isLogedin ? '/loginIndex' : '/';
});

defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
});

const menuItems = [
  { name: '會員管理', icon: 'fa fa-user-circle me-2', route: '/users' },
  { name: '系統通知', icon: 'fa fa-paper-plane me-2', route: '/notification/list' },
  { name: '檢舉管理', icon: 'fa fa-exclamation-triangle me-2', route: '/report/list' },
  { name: '活動分析', icon: 'fa fa-chart-bar me-2', route: '/analysis' },
];

const handleNavigation = (route) => {
  if (managerStore.isLogedin) {
    router.push(route);
  } else {
    router.push('/login');
  }
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.2s;
  z-index: 1000;
  background-color: rgb(63, 63, 63)
}

.sidebar.collapsed {
  width: 0px;
}

.sidebar-content {
  height: 100%;
  overflow-y: auto;
  position: relative;
  z-index: 2;
}

.logo-container {
  background-color: rgb(63, 63, 63);
  padding: 7px 0;
  text-align: center;
}

.logo-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #86b817;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
}

.sidebar-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/sidebar.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.4;
  z-index: 1;
}

.navbar {
  padding: 15px;
}

.navbar-nav .nav-link {
  padding: 10px 15px;
  color: #2c3e50;
  transition: all 0.3s;
}

.navbar-nav .nav-link:hover {
  background-color: rgba(44, 62, 80, 0.1);
}

.text-primary {
  color: #86b817 !important;
}

</style>