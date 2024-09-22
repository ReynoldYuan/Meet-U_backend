<template>
  <div class="container-fluid position-relative bg-white d-flex p-0">
    <Sidebar :is-collapsed="!isSidebarOpen"></Sidebar>
    <div class="content" :class="{ 'sidebar-collapsed': !isSidebarOpen }">
      <Navbar @toggle-sidebar="toggleSidebar"></Navbar>
      <div class="main-content">
        <RouterView></RouterView>
      </div>
      <!-- <Footer></Footer> -->
    </div>
    <BackToTop></BackToTop>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './views/Navbar.vue';
import Sidebar from './views/Sidebar.vue';
import Footer from './views/Footer.vue';
import BackToTop from './views/BackToTop.vue';
import { RouterView } from 'vue-router';
import 'tocas/dist/tocas.min.css'


const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};


</script>

<style>

/* .content {
  transition: margin-left 0.3s;
  margin-left: 250px;
}

.content.open {
  margin-left: 0;
} */

.container-fluid {
  padding: 0;
  overflow-x: hidden;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s;
  margin-left: 260px;
}

.content.sidebar-collapsed {
  margin-left: 0px;
}

.main-content {
  flex-grow: 1;
}

</style>