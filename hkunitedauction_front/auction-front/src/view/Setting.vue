<template>
    <div>
        <van-nav-bar id="nav-bar" left-arrow :border="false" @click-left="$router.back(-1)" right-text="退出" @click-right="quit">
            <span style="color:white" slot="title">设置</span>
        </van-nav-bar>
        <van-cell-group>
            <van-cell>
                <b slot="title" style="margin-left:0.5rem;">{{name}}</b>
                <van-image :src="avatar" width="1.5rem" height="1.5rem" round slot="icon" />
            </van-cell>
        </van-cell-group>
        <van-cell-group>
            <van-field label="联系电话"></van-field>
            <van-panel title="收货地址">
                <van-field></van-field>
            </van-panel>
        </van-cell-group>
        <div style="position:fixed;bottom:0px;width:100%;">
            <van-button type="danger" size="large">保存</van-button>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions({
            storeToken: 'user/storeToken'
        }),
        quit(){
            this.$router.replace('/my');
            this.storeToken('');
        }
    },
    data(){
        return {
            avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLiadm9EnZUsLmst6oRyYRjIt5CnM4X6gyLmFQutjfYuLsV0ictLVdmgKwjM9JxhqbbZDYSN8eYCwQ/132',
            name: '文治'
        }
    }
}
</script>
<style scoped>
#nav-bar{
    background-color:black;
}
</style>