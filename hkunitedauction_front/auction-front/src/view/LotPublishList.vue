<template>
    <div>
        <van-tabs>
            <van-tab title="未发布">
                <van-cell-group>
                    <van-cell :title="catalogs[index]" :value="`${item}项`"  is-link />
                </van-cell-group>
            </van-tab>
            <van-tab title="已发布">
                <van-cell-group>
                    <van-cell v-for="(item, index) in mallResult" :key="index" :title="catalogs[index]" :value="`${item}项`"  is-link :to="`/search/result/mall/${catalogs[index]}/${q}`"/>
                </van-cell-group>
            </van-tab>
        </van-tabs>
        
        <main-menu selectedItem="search" />
    </div>
</template>