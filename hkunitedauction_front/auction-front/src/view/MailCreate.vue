<template>
    <div>
        <van-nav-bar id="nav-bar" left-arrow :border="false" @click-left="$router.back(-1)" right-text="发送">
            <span style="color:white" slot="title">写信</span>
        </van-nav-bar>
        <van-cell-group>
            <van-cell>
                <b slot="icon">类型</b>
                <van-radio-group style="margin-left:0.5rem;">
                    <van-radio name="1" style="margin:0.2rem;">意见反馈</van-radio>
                    <van-radio name="2" style="margin:0.2rem;">藏品咨询</van-radio>
                </van-radio-group>
            </van-cell>
            <van-cell>
                <van-field type="textarea" autosize/>
            </van-cell>
        </van-cell-group>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
#nav-bar{
    background-color:black;
}
</style>