<template>
    <div>
        <h1>图片列表</h1>
        <Row>
            <Col span="3" v-for="(item, index) in data" :key="index">
                <Card style="100%;margin:5px;">
                    <div style="text-align:center">
                        <div class="img-item" :style="{backgroundImage: `url(${toImageUrl(item.iconVpath, item.iconName)})`}"></div>
                        <div style="margin-top:5px;">
                            <Button type="primary" style="margin-right:5px;" @click="preview(index)">预览</Button>
                            <Button @click="remove(index)">删除</Button>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
        <div style="margin-top:1rem;">
            <Page :total="totalCount" :pageSize="pageSize" show-total @on-change="changePage"/>
        </div>
        <Divider />
        <Row>
            <Col>
                <Upload name="file" ref="upload"
                    :action="`${API_BASEURL}/main-data/image`" :on-success="uploadFinish">
                    <Button icon="ios-cloud-upload-outline">上传图片</Button>
                </Upload>
            </Col>
        </Row>
        <Modal title="预览" v-model="visible">
            <img :src="this.toImageUrl(previewVpath, previewName)" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
import axios from 'axios';
import { toImageUrl } from '../../util/image';
import { API_BASEURL } from '../../util/const';

export default {
    mounted(){
        console.log(API_BASEURL);
        this.reload();
    },
    data(){
        return {
            page: 1,
            pageSize: 16,
            totalCount: 0,
            data: [],
            visible: false,
            previewVpath: null,
            previewName: null,
            API_BASEURL: API_BASEURL
        }
    },
    methods: {
        toImageUrl: toImageUrl,
        changePage(pageIndex){
            this.page = pageIndex;
            this.reload();
        },
        reload(){
            axios.get(`/main-data/image?page=${this.page}&pagesize=${this.pageSize}&order=desc&sortby=createdTime`).then((response) => {
                this.data = response.data.list.map((item) => {
                    return {
                        id: item.id,
                        vpath: item.vpath,
                        name: item.name,
                        iconVpath: item.iconVpath,
                        iconName: item.iconName
                    }
                });
                this.totalCount = response.data.totalCount;
            });
        },
        uploadFinish(res, file) {
            this.reload();
            this.$refs.upload.clearFiles();
        },
        remove(index){
            var id = this.data[index].id;
            this.$Modal.confirm({
                title: '删除确认',
                content: '确定要删除该记录？',
                onOk: () => {
                    axios.delete(`/main-data/image/${id}`).then(() => {
                        this.page = 1;
                        this.reload();
                    });
                }
            });
        },
        preview(index){
            this.previewVpath = this.data[index].vpath;
            this.previewName = this.data[index].name;
            this.visible = true;
        }
    }
}
</script>
<style scoped>
.img-item{
    width: 100%;
    height: 100px;
    background-repeat: no-repeat;
    background-size: 100% auto;
}
</style>