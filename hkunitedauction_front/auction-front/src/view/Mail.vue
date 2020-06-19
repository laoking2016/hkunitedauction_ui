<template>
    <div>
        <van-nav-bar fixed id="nav-bar" left-arrow :border="false" @click-left="$router.back(-1)" @click-right="$router.push('/mail/create')">
            <span style="color:white" slot="title">站内信</span>
            <van-icon name="edit" slot="right" size="1.2rem" color="white"/>
        </van-nav-bar>
        <van-tabs v-model="active" style="margin-top:46px;">
            <van-tab title="收件箱">
                <van-list>
                    <van-cell v-for="(item, index) in mails" :key="index" :title="item.subject">
                        <span slot="right-icon">{{item.date}}</span>
                    </van-cell>
                </van-list>
            </van-tab>
            <van-tab title="发件箱">
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            mails: [
                {
                    subject: '二月风清民邮特卖今晚结标',
                    date: '2020-2-14'
                },
                {
                    subject: '二月风清民邮特卖今晚结标',
                    date: '2020-2-14'
                },
                {
                    subject: '二月风清民邮特卖今晚结标',
                    date: '2020-2-14'
                },
                {
                    subject: '二月风清民邮特卖今晚结标',
                    date: '2020-2-14'
                },
                {
                    subject: '二月风清民邮特卖今晚结标',
                    date: '2020-2-14'
                },
                {
                    subject: '二月风清民邮特卖今晚结标',
                    date: '2020-2-14'
                },
                {
                    subject: '二月风清民邮特卖今晚结标',
                    date: '2020-2-14'
                }
            ]
        }
    }    
}
</script>
<style scoped>
#nav-bar{
    background-color:black;
}
</style>