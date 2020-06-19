<template>
    <div>
        <van-nav-bar left-arrow id="nav-bar" :border="false" @click-left="$router.back(-1)">
            <span style="color:white" slot="title">注册</span>
        </van-nav-bar>  
        <van-form @submit="submit">
        <van-cell-group>
            <van-field v-model="name" required label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]"/>
            <van-field v-model="trueName" label="真实名字" placeholder="真实姓名" />
            <van-field v-model="email" label="邮箱" placeholder="邮箱"/>
            <van-field v-model="contact" type="tel" label="手机" placeholder="手机"/>
            <van-field v-model="address" label="收货地址" autosize type="textarea"/>
        </van-cell-group>
        <van-cell-group style="margin-top:10px;">
            <van-field v-model="password" type="password" label="密码" placeholder="密码" />
            <van-field v-model="passworConfirm" type="password" label="确认密码" placeholder="确认密码" />
        </van-cell-group>
        <div style="position:fixed;bottom:0px;width:100%;">
            <van-button type="danger" size="large" native-type="submit">保存</van-button>
        </div>
        </van-form>  
    </div>    
</template>
<script>
import axios from 'axios'
import { Toast } from 'vant'

export default {
    methods: {
        submit(values){
            axios.post(`/member/member/register`, {
                name: this.name,
                trueName: this.trueName,
                email: this.email,
                contact: this.contact,
                address: this.address,
                password: this.password
            }).then((response) => {
                Toast.success('注册成功');
                this.$router.back(-1);
            });
        }
    },
    data(){
        return {
            name: null,
            trueName: null,
            contact: null,
            address: null,
            email: null,
            password: null,
            passworConfirm: null
        }
    }
}
</script>
<style scoped>
#nav-bar{
    background-color:black;
}
</style>