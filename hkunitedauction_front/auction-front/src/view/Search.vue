<template>
    <div>
        <van-search placeholder="请输入搜索关键词" background="black"/>
        <van-tabs>
            <van-tab title="竞买">
                <van-cell-group>
                    <van-cell v-for="(item, index) in result" :key="index" :title="item.catalog" :value="`${item.count}项`"  is-link to="/search/result"/>
                </van-cell-group>
            </van-tab>
            <van-tab title="商城"></van-tab>
        </van-tabs>
        
        <main-menu selectedItem="search" />
    </div>
</template>
<script>
export default {
    data(){
        return {
            result: [
                {
                    catalog: '邮品',
                    count: 32918,
                },
                {
                    catalog: '钱币',
                    count: 476,
                },
                {
                    catalog: '书画',
                    count: 2,
                },
                {
                    catalog: '名酒',
                    count: 1,
                }
            ]
        }
    }
}
</script>
<style scoped>
</style>