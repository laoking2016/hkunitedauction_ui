<template>
    <div>
        <van-nav-bar left-arrow id="nav-bar" :border="false" @click-left="$router.back(-1)">
            <span style="color:white" slot="title">登录</span>
        </van-nav-bar>
        <div style="margin:60px 10px 0px;">
            <van-field v-model="name" placeholder="用户名" />
            <van-field v-model="password" type="password" placeholder="密码"/>
        </div>
        <div style="margin:10px;">
            <van-button type="danger" block @click="login">登录</van-button>
        </div>
        <div style="margin:10px;display:flex;justify-content:space-between">
            <router-link to="/register">我要注册</router-link>
            <router-link to="/home">忘记密码</router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { Toast } from 'vant'
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions({
            storeToken: 'user/storeToken',
            storeUser: 'user/storeUser'
        }),
        login(){
            axios.post('/member/member/login', {
                name: this.name,
                password: this.password
            }).then((response) => {
                var data = response.data;
                this.storeUser(data.name);
                this.storeToken(data.token);
                this.$router.replace('/my');
            });
        }
    },
    date(){
        return {
            name: null,
            password: null
        }
    }
}
</script>
<style scoped>
#nav-bar{
    background-color:black;
}
</style>