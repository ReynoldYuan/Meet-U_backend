<template>
    <div class="home-container">
        <div class="content">
            <h1 class="title">
            <span class="meetu-text"><font-awesome-icon icon="champagne-glasses" /> Meet U</span>
            </h1>
            <h2 class="subtitle">管理後台</h2>
            <p class="welcome-text">歡迎登入，以下提供常用功能</p>
            <div class="button-container">
            <router-link to="/users" class="action-button">
                <font-awesome-icon icon="users" />
                查看所有用戶
            </router-link>
            <router-link to="/notification/add" class="action-button">
                <font-awesome-icon icon="bell" />
                建立系統通知
            </router-link>
            <router-link to="/report/list" class="action-button">
                <font-awesome-icon icon="flag" />
                查看檢舉內容
            </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.home-container {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('@/assets/images/indexBackground.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.home-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(63, 63, 63, 0.5);
}

.content {
    text-align: center;
    color: #ffffff;
    position: relative;
    z-index: 1;
    margin-right: 10em;
    padding: 3em;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    max-width: 500px;
    min-height: 600px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.meetu-text {
    color: #86b817;
    font-weight: bold;
}

.subtitle {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #ffffff;
}

.welcome-text {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.button-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    background-color: #86b817;
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1.2rem;
    transition: background-color 0.3s, transform 0.2s;
}

.action-button:hover {
    background-color: #689012;
    transform: translateY(-2px);
}

.action-button svg {
    margin-right: 10px;
}
</style>