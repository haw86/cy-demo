<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
<template>
   <div class="GoodsType-area">
       <div class="top-box">
            <div class="op-box">
                <div class="list">
                    <Button type="primary">新增</Button>
                </div>
           </div>
            <div class="search-box">
            </div>
       </div>
        
        <div class="content-box">
            <Table border ref="selection" :columns="tableCol" :data="tableData"></Table>
            
        </div>
        <div class="page-box">
            <Page :total="100" show-total></Page>
        </div>
        <Modal
                v-model="isEdit"
                title="Common Modal dialog box title"
                :mask-closable="false"
                @on-ok="okFn"
                @on-cancel="cancelFn">
                <p>Content of dialog</p>
                <p>Content of dialog</p>
                <p>Content of dialog</p>
            </Modal>
   </div>
</template>
<script>
    export default {
        data () {
            return {
                goodsType:"",
                tableCol: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '类别名',
                        key: 'name'
                    },
                    {
                        title: '排序',
                        key: 'sort'
                    },
                    {
                        title: '是否为酒水',
                        key: 'isDrinks'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '操作',
                        key: '',
                        width: 150,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editFn(params.index)
                                        }
                                    }
                                }, 'Edit'),
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeFn(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                tableData: [
                    {
                        name: '热销菜品',
                        sort: "100",
                        status: 1
                    },
                    {
                        name: '炒菜系列',
                        sort: "90",
                        status: 1
                    },
                    {
                        name: '火锅系列',
                        sort: "80",
                        status: 1
                    }
                ],

                //编辑弹窗
                isEdit:false
            }
        },
        methods: {
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },

            //编辑
            editFn (item){
                var t = this;
                t.isEdit = true;
            },

            //删除
            removeFn (item){
                var t = this;
            },
            
            //确定回调
            okFn () {
                this.$Message.info('Clicked ok');
            },

            //取消回调
            cancelFn () {
                this.$Message.info('Clicked cancel');
            }
        }
    }
</script>