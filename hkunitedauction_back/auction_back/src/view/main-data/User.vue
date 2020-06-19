<template>
    <div>
        <h1>用户列表</h1>
        <Button type="primary" @click="edit(-1)">创建用户</Button>
        <div style="margin-top:1rem;">
            <Table border :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
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
    import axios from 'axios';

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
                        title: '用户',
                        key: 'name'
                    },
                    {
                        title: '真实名',
                        key: 'trueName'
                    },
                    {
                        title: '角色',
                        key: 'role'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data: [],
                index: null,
                id: null,
                name: null,
                trueName: null,
                contact: null,
                role: 1,
                page: 1,
                pageSize: 20,
                totalCount: 0
            }
        },
        methods: {
            changePage(pageIndex){
                this.page = pageIndex;
                this.reload();
            },
            edit (index) {
                this.index = index;
                var title = null;
                if(index == -1){
                    this.id = null;
                    this.name = null;
                    this.trueName = null;
                    this.contact = null;
                    this.role= 'SUPPLIER';
                    title = "创建用户";
                }else{
                    this.id = this.data[index].id;
                    this.name = this.data[index].name;
                    this.trueName = this.data[index].trueName;
                    this.contact = this.data[index].contact;
                    this.role = this.data[index].role;
                    title = "修改用户";
                }

                this.$Modal.confirm({
                    title: title,
                    width: '50%',
                    onOk: () => {
                        
                        if(index == -1){
                            axios.post(`/main-data/user`, {
                                id: this.id,
                                name: this.name,
                                trueName: this.trueName,
                                contact: this.contact,
                                role: this.role
                            }).then(() => {
                                this.reload();
                            });
                        }else{
                            axios.put(`/main-data/user/${this.id}`, {
                                id: this.id,
                                name: this.name,
                                trueName: this.trueName,
                                contact: this.contact,
                                role: this.role
                            }).then(() => {
                                this.reload();
                            });
                        }
                        
                    },
                    render: (h) => {
                        return h('Form', {
                            props: {
                                labelPosition: 'right',
                                labelWidth: '100'
                            }
                        },
                        [
                            h('FormItem', {
                                props: {
                                    label: '编号'
                                }
                            }, 
                            [
                                h('Input', { 
                                    props: {
                                        value: this.id,
                                        disabled: true
                                    }
                                })
                            ]),
                            h('FormItem', {
                                props: {
                                    label: '用户名'
                                }
                            }, 
                            [
                                h('Input', { 
                                    props: {
                                        value: this.name,
                                    },
                                    on: {
                                        input: (val) => {
                                            this.name = val;
                                        }
                                    }
                                })
                            ]),
                            h('FormItem', {
                                props: {
                                    label: '真实名'
                                }
                            }, 
                            [
                                h('Input', { 
                                    props: {
                                        value: this.trueName,
                                    },
                                    on: {
                                        input: (val) => {
                                            this.trueName = val;
                                        }
                                    }
                                })
                            ]),
                            h('FormItem', {
                                props: {
                                    label: '联系方式'
                                }
                            }, 
                            [
                                h('Input', { 
                                    props: {
                                        value: this.contact,
                                    },
                                    on: {
                                        input: (val) => {
                                            this.contact = val;
                                        }
                                    }
                                })
                            ]),
                            h('FormItem', {
                                props: {
                                    label: '角色'
                                }
                            }, 
                            [
                                h('RadioGroup', {
                                    props: {
                                        value: this.role
                                    },
                                    on: {
                                        input: (val) => {
                                            this.role = val;
                                        }
                                    }
                                }, 
                                [
                                    h('Radio', {
                                        props: {
                                            label: 'ADMIN'
                                        }
                                    }, 'ADMIN'),
                                    h('Radio', {
                                        props: {
                                            label: 'SUPPLIER'
                                        }
                                    }, 'SUPPLIER')
                                ])
                            ])
                        ])
                    }
                })
            },
            remove (index) {
                var id = this.data[index].id;
                this.$Modal.confirm({
                    title: '删除确认',
                    content: '确定要删除该记录？',
                    onOk: () => {
                        axios.delete(`/main-data/user/${id}`).then(() => {
                            this.page = 1;
                            this.reload();
                        });
                    }
                });
                
            },
            reload(){
                axios.get(`/main-data/user?page=${this.page}&pagesize=${this.pageSize}`).then((response) => {
                    var i = 0;
                    this.data = response.data.list.map((item) => {
                        i++;
                        return {
                            num: (this.page - 1) * this.pageSize + i,
                            id: item.id,
                            name: item.name,
                            trueName: item.trueName,
                            contact: item.contact,
                            role: item.role
                        }
                    });
                    this.totalCount = response.data.totalCount;
                });
            }
        },
        mounted() {
            this.reload();
        }
    }
</script>