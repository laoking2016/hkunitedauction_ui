<template>
    <div>
        <van-nav-bar fixed id="nav-bar" :border="false" @click-right="$router.push('/setting')">
            <van-icon name="setting-o" slot="right" size="1.2rem" color="white" v-show="token != ''"/>
        </van-nav-bar>
        <div id="profile" v-show="token != ''">
            <div style="margin-left:3rem;">
                <img style="border-radius:50%;height:5rem;width:5rem;" :src="avatar"/>
            </div>
            <h4 style="color:white;margin-left:1rem;">{{trueName}}</h4>
        </div>
        <router-link to="/login">
            <div id="profile" v-show="token == ''">
                <div style="margin-left:3rem;">
                    <img style="border-radius:50%;height:5rem;width:5rem;" :src="avatar"/>
                </div>
                <h4 style="color:white;margin-left:1rem;">登录</h4>
            </div>
        </router-link>
        <div style="margin:0.5rem;" v-show="token != ''">
            <van-grid :column-num="3">
                <van-grid-item icon="photo-o" text="待支付" to="/order" />
                <van-grid-item icon="photo-o" text="待发货" to="/order"/>
                <van-grid-item icon="photo-o" text="待收货" to="/order" />
                <van-grid-item icon="photo-o" text="竞买中" to="/my/auction/getting" />
                <van-grid-item icon="photo-o" text="已得标" to="/my/auction/got"/>
                <van-grid-item icon="photo-o" text="未得标" to="/my/auction/failed"/>
                <van-grid-item icon="photo-o" text="关注的" />
                <van-grid-item icon="photo-o" text="购物车" to="/my/cart"/>
                <van-grid-item icon="photo-o" text="消息" to="/message"/>
                <van-grid-item icon="photo-o" text="站内信" to="/mail"/>
                <van-grid-item />
                <van-grid-item />
            </van-grid>
        </div>
        <main-menu selectedItem="my" />
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    mounted(){
        if(this.token != ''){
            axios.get(`/member/member?filter=${encodeURIComponent(`name=${this.user}`)}`).then((response) => {
                var data = response.data.list[0];
                this.trueName = data.trueName;
            });
        }
    },
    computed: {
        ...mapGetters({
            user: 'user/user',
            token: 'user/token'
        })
    },
    data(){
        return {
            avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLiadm9EnZUsLmst6oRyYRjIt5CnM4X6gyLmFQutjfYuLsV0ictLVdmgKwjM9JxhqbbZDYSN8eYCwQ/132',
            trueName: '文治'
        }
    }
}
</script>
<style scoped>
#profile{
    display: flex;
    width:100%;
    height:10rem;
    background-color:black;
    align-items: center;
    justify-content: flex-start;
}
#nav-bar{
    background-color:transparent;
}
</style>