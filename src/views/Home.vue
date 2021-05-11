<template>
    <div>
        <div>
            <h1 class="h1"><strong>首页</strong></h1>
        </div>
        <router-link to="/login">
            <span id="user_login" class="h1">
                <strong>点击登录</strong>
            </span>
        </router-link>
    </div>

</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
    .h1{
        text-align: center;
    }
</style>