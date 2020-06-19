<template>
    <div>
        <van-nav-bar fixed id="nav-bar" left-arrow :border="false" @click-left="$router.back(-1)" >
            <span style="color:white" slot="title">出价记录</span>
        </van-nav-bar>
        <van-list style="margin-top:46px;">
            <van-cell v-for="(item, index) in quotes" :key="index">
                <van-row  justify="space-between">
                    <van-col span="6">{{item.quoter}}</van-col>
                    <van-col span="6">{{item.price}}</van-col>
                    <van-col span="12" style="text-align:right;">{{item.date}}</van-col>
                </van-row>
            </van-cell>
        </van-list>
    </div>
</template>
<script>
export default {
    data() {
        return {
            quotes: [
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
                },
                {
                    quoter: 'sea***',
                    price: 2200,
                    date: '20-03-07 15:50:06'
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
