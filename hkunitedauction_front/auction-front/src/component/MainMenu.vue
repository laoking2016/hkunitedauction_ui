<template>
    <div>
        <div style="height:50px;width:100%"></div>   
        <van-tabbar route>
            <van-tabbar-item to="/my" v-show="selectedItem != 'my'">我的</van-tabbar-item>
            <van-tabbar-item v-show="selectedItem == 'my'"><h2>我的</h2></van-tabbar-item>
            <van-tabbar-item to="/" v-show="selectedItem != 'auction'">拍卖</van-tabbar-item>
            <van-tabbar-item v-show="selectedItem == 'auction'"><h2>拍卖</h2></van-tabbar-item>
            <van-tabbar-item to="/catalog" v-show="selectedItem != 'catalog'">分类</van-tabbar-item>
            <van-tabbar-item v-show="selectedItem == 'catalog'"><h2>分类</h2></van-tabbar-item>
            <van-tabbar-item to="/mall" v-show="selectedItem != 'mall'">商城</van-tabbar-item>
            <van-tabbar-item v-show="selectedItem == 'mall'"><h2>商城</h2></van-tabbar-item>
            <van-tabbar-item to="/search" v-show="selectedItem != 'search'">搜索</van-tabbar-item>
            <van-tabbar-item v-show="selectedItem == 'search'"><h2>搜索</h2></van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    name: 'main-menu',
    props: ['selectedItem']
}
</script>
<style scoped>
</style>