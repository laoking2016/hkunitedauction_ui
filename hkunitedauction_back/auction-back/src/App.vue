<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 80px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">退出</MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu theme="light" width="auto">
                        <Submenu name="1">
                            <template slot="title">主数据</template>
                            <MenuItem name="1-1" to="/main-data/product">产品</MenuItem>
                            <MenuItem name="1-2" to="/main-data/catalog">类目</MenuItem>
                            <MenuItem name="1-3" to="/main-data/image">图片</MenuItem>
                            <MenuItem name="1-4" to="/main-data/user">用户</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">竞买</template>
                            <MenuItem name="2-1" to="/auction/lot">拍品</MenuItem>
                            <MenuItem name="2-2">竞买会</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">商城</template>
                            <MenuItem name="3-1" to="/mall/good">商品</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">订单</template>
                            <MenuItem name="4-1" to="/order/order">订单</MenuItem>
                        </Submenu>
                        <Submenu name="5">
                            <template slot="title">会员</template>
                            <MenuItem name="5-1">会员</MenuItem>
                        </Submenu>
                        <Submenu name="6">
                            <template slot="title">消息</template>
                            <MenuItem name="6-1">提醒</MenuItem>
                            <MenuItem name="6-2">站内信</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{margin: '24px 0', padding: '24px', minHeight: '780px', background: '#fff'}">
                        <router-view />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        
    }
</script>