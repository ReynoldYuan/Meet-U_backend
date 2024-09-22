<template>
        <div class="home-container">
                <div class="content">
                <font-awesome-icon icon="champagne-glasses" bounce class="logo" />
                <h1 class="title">
                <span class="meetu-text"> MeetU</span>
                </h1>
                <h2 class="subtitle">管理後台</h2>
                <p class="login-text">請先登入</p>
                <router-link to="/login" class="login-button">登入</router-link>
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
        max-width: 300px;
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.title {
        font-size: 2rem;
        margin-bottom: 0.5rem;
}

.meetu-text {
        color: #86b817;
        font-weight: bold;
}

.logo{
        color: #86b817;
        font-size: 3rem;
        margin-bottom: 0.5rem;
        font-weight: bold;
}

.subtitle {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #ffffff;
}

.login-text {
        font-size: 1rem;
        margin-bottom: 1.5rem;
}

.login-button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #86b817;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 1.2rem;
        transition: background-color 0.3s, transform 0.2s;
}

.login-button:hover {
        background-color: #689012;
        transform: translateY(-2px);
}
</style>