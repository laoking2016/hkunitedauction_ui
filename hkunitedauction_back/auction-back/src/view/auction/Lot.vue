<template>
    <div>
        <h1>拍品列表</h1>
        <Button type="primary" to="/auction/lot/-1">新建拍品</Button>
        <div style="margin-top:1rem;">
            <Table border :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="action">
                    <Button v-show="data[index].status == 'DRAFT'" type="primary" size="small" style="margin-right: 5px" @click="publish(index)">上架</Button>
                    <Button v-show="data[index].status == 'PUBLISHED'" type="primary" size="small" style="margin-right: 5px" @click="unPublish(index)">下架</Button>
                    <Button type="primary" size="small" style="margin-right: 5px" :to="`/auction/lot/${data[index].id}`">
                        <span v-show="data[index].status == 'DRAFT'">编辑</span>
                        <span v-show="data[index].status != 'DRAFT'">查看</span>
                    </Button>
                    <Button type="error" size="small" @click="remove(index)">删除</Button>
                </template>
            </Table>
            <div style="margin-top:1rem;">
                <Page :total="totalCount" :pageSize="pageSize" show-total @on-change="changePage"/>
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
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '状态',
                        slot: 'action',
                        width: 180,
                        align: 'center'
                    }
                ],
                data: [],
                index: null,
                id: null,
                name: null,
                description: null,
                l1: null,
                l2: null,
                l3: null,
                pageSize: 20,
                totalCount: 0
            }
        },
        computed: {
            ...mapGetters({
                page: 'lot/page'
            })
        },
        methods: {
            ...mapActions({
                storePage: 'lot/storePage'
            }),
            changePage(pageIndex){
                this.storePage(pageIndex);
                this.reload();
            },
            remove (index) {
                var id = this.data[index].id;
                this.$Modal.confirm({
                    title: '删除确认',
                    content: '确定要删除该记录？',
                    onOk: () => {
                        axios.delete(`/auction/lot/${id}`).then(() => {
                            this.storePage(1);
                            this.reload();
                        });
                    }
                });
                
            },
            reload(){
                axios.get(`/auction/lot?page=${this.page}&pagesize=${this.pageSize}`).then((response) => {
                    var i = 0;
                    this.data = response.data.list.map((item) => {
                        i++;
                        return {
                            num: (this.page - 1) * this.pageSize + i,
                            id: item.id,
                            name: item.name,
                            description: item.description,
                            status: item.status
                        }
                    });
                    this.totalCount = response.data.data.totalCount;
                });
            },
            publish(index){
                axios.post(`/auction/lot/${this.data[index].id}/publish`).then((response) => {
                    if(response.data.status == 0){
                        this.reload();
                        this.$Message.success('上架成功');
                    }else{
                        this.$Message.error(response.data.message);
                    }
                });
            },
            unPublish(index){
                axios.post(`/auction/lot/${this.data[index].id}/unpublish`).then((response) => {
                    this.reload();
                    this.$Message.success('下架成功');
                });
            }
        },
        mounted() {
            this.storePage(1);
            this.reload();
        }
    }
</script>