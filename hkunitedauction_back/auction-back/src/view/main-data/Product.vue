<template>
    <div>
        <h1>产品列表</h1>
        <Button type="primary" to="/main-data/product/-1">创建产品</Button>
        <div style="margin-top:1rem;">
            <Table border :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" :to="`/main-data/product/${data[index].id}`">编辑</Button>
                    <Button type="error" size="small" @click="remove(index)">删除</Button>
                </template>
            </Table>
            <div style="margin-top:1rem;">
                <Page :total="totalCount" :current="prdPage" :pageSize="pageSize" show-total @on-change="changePage"/>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                columns: [
                    {
                        title: '序号',
                        key: 'num',
                        width: 80
                    },
                    {
                        title: '编号',
                        key: 'id',
                        width: '200'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 130,
                        align: 'center'
                    }
                ],
                data: [],
                pageSize: 20,
                totalCount: 0
            }
        },
        computed: {
            ...mapGetters({
                page: 'product/page'
            })
        },
        methods: {
            ...mapActions({
                storePage: 'product/storePage'
            }),
            changePage(pageIndex){
                this.storePage(pageIndex);
                this.reload();
            },
            reload(){
                axios.get(`/main-data/product?page=${this.page}&pagesize=${this.pageSize}`).then((response) => {
                    var i = 0;
                    this.data = response.data.list.map((item) => {
                        i++;
                        return {
                            num: (this.page - 1) * this.pageSize + i,
                            id: item.id,
                            name: item.name,
                            description: item.description,
                            l1: item.l1,
                            l2: item.l2,
                            l3: item.l3
                        }
                    });
                    this.totalCount = response.data.totalCount;
                });
            }
        },
        mounted() {
            this.storePage(1);
            this.reload();
        }
    }
</script>