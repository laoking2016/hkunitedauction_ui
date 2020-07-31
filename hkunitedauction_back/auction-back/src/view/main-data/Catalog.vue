<template>
     <Layout>
         <h1>类目列表</h1>
        <Content>
            <Tree :data="data" :render="renderContent" class="demo-tree-render"></Tree>
        </Content>
         <Footer><Button type="primary" @click="save">保存</Button></Footer>
    </Layout>
</template>
<script>
    import axios from 'axios'
    export default {

        mounted() {
            this.reload();
        },
        data () {
            return {
                inputVal: null,
                data: [
                    {
                        title: '根节点',
                        expand: true,
                        render: (h, { rout, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            type: 'primary'
                                        }),
                                        style: {
                                            //width: '64px',
                                        },
                                        on: {
                                            click: () => { this.append(data) }
                                        }
                                    }, '创建新类目')
                                ])
                            ]);
                        },
                        children: []
                    }
                ],
                buttonProps: {
                    type: 'default',
                    size: 'small',
                }
            }
        },
        methods: {
            reload(){
                axios.get('/main-data/catalog').then((response) => {
                    this.data[0].children = 
                        response.data.children == null ? null :
                            response.data.children.map((item) => {
                                return {
                                    title: item.name,
                                    expand: true,
                                    children: item.children == null ? null : 
                                        item.children.map((subItem) => {
                                            return {
                                                title: subItem.name,
                                                expand: true,
                                                children: subItem.children == null ? null : 
                                                    subItem.children.map((ssubItem) => {
                                                        return {
                                                            title: ssubItem.name,
                                                            expand: true,
                                                            children: null
                                                        }
                                                    })
                                            }
                                        })
                                }
                            });
                });
            },
            save(){
                var children = this.data[0].children == null ? null : 
                    this.data[0].children.map((item) => {
                        return {
                            name: item.title,
                            children: item.children == null ? null : 
                                item.children.map((subItem) => {
                                    return {
                                        name: subItem.title,
                                        children: subItem.children == null ? null : 
                                            subItem.children.map((ssubItem) => {
                                                return {
                                                    name: ssubItem.title,
                                                    children: null
                                                }
                                            })
                                    }
                                })
                        }    
                });
                axios.put('/main-data/catalog', {
                    id: null,
                    children: children
                }).then((response) => {
                    this.reload();
                });
            },
            renderContent (h, { root, node, data }) {
                return h('Row', [
                    h('Col', {
                        props: {
                            span: 20
                        }
                    }, 
                    [
                        h('Input', {
                            props: {
                                value: data.editingVal
                            },
                            style: {
                                display: data.editable ? 'inline-block' : 'none'
                            },
                            on: {
                                input: (val) => {
                                    data.editingVal = val;
                                }
                            }
                        }),
                        h('span', {
                            style: {
                                display: data.editable ? 'none' : 'inline-block',
                                padding: '5px 12px 5px 0'
                            }
                        }, data.title)
                    ]),
                    h('Col', {
                        props: {
                            span: 4
                        }
                    }, 
                    [
                        h('Button', {
                            props: {
                                
                            },
                            style: {
                                display: data.editable ? 'none' : 'inline-block',
                                float: 'right'
                            },
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        }, '删除'),
                        h('Button', {
                            props: {
                                type: 'primary'
                            },
                            style: {
                                display: data.editable ? 'none' : 'inline-block',
                                float: 'right',
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    data.editingVal = data.title;
                                    data.editable = true;
                                }
                            }
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'primary'
                            },
                            style: {
                                display: data.editable ? 'none' : 'inline-block',
                                float: 'right',
                                marginRight: '5px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }, '创建子类目'),
                        h('Button', {
                            props: {
                                type: 'primary'
                            },
                            style: {
                                display: data.editable ? 'inline-block' : 'none',
                                float: 'right',
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    data.title = data.editingVal;
                                    data.editable = false;
                                }
                            }
                        }, '确定'),
                        h('Button', {
                            props: {

                            },
                            style: {
                                display: data.editable ? 'inline-block' : 'none',
                                float: 'right',
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    data.editable = false;
                                }
                            }
                        }, '取消')
                    ])
                ])
            },
            append (data) {
                const children = data.children || [];
                children.push({
                    title: `新类目`,
                    expand: true,
                    editable: false,
                    editingVal: null
                });
                this.$set(data, 'children', children);
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            }
        }
    }
</script>
<style>
    .demo-tree-render .ivu-tree-title{
        width: 100%;
    }
</style>