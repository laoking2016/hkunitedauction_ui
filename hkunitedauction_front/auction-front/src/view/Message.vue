<template>
    <div>
        <van-nav-bar fixed id="nav-bar" left-arrow :border="false" @click-left="$router.back(-1)">
            <span style="color:white" slot="title">消息</span>
        </van-nav-bar>
        <van-list style="margin-top:46px;">
            <van-panel :title="item.subject" style="margin:0.5rem;" v-for="(item, index) in messages" :key="index">
                <van-cell :title="item.body" :label="item.date"></van-cell>
            </van-panel>
        </van-list>
    </div>
</template>
<script>
export default {
    data() {
        return {
            messages: [
                {
                    subject: '结标提醒',
                    body: '您关注的藏品马上要结标了，快去看看吧',
                    date: '2020-3-7'
                },
                {
                    subject: '结标提醒',
                    body: '您关注的藏品马上要结标了，快去看看吧',
                    date: '2020-3-7'
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