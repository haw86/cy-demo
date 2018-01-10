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
   <div class="Member-area">
       <div class="top-box">
            <div class="op-box">
                <div class="list">
                    <Button type="primary">新增</Button>
                </div>
                <div class="list">
                    <Button type="ghost">导出</Button>
                </div>
           </div>
            <div class="search-box">
                <div class="list">
                    <Select v-model="goodsType" clearable style="width:200px" placeholder="商品分类">
                        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="list">
                    <Button type="primary">查询</Button>
                </div>
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
                typeList:[
                    {label:"热销菜品",value:1},
                    {label:"炒菜系列",value:2},
                    {label:"火锅系列",value:3},
                    {label:"汤",value:4},
                    {label:"蒸菜",value:5},
                    {label:"酒水",value:6}
                ],
                tableCol: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '商品名',
                        key: 'name'
                    },
                    {
                        title: '商品编码',
                        key: 'code'
                    },
                    {
                        title: '商品类别',
                        key: 'typeName'
                    },
                    {
                        title: '售价',
                        key: 'price'
                    },
                    {
                        title: '会员',
                        key: 'isMember'
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
                        name: '水煮鱼',
                        code: "43244456",
                        typeName: '火锅',
                        price: 115.00,
                        isMember: 1,
                        status: 1
                    },
                    {
                        name: '大白菜',
                        code: "23242345",
                        typeName: '小炒系列',
                        price: 15.50,
                        isMember: 1,
                        status: 0
                    },
                    {
                        name: '辣椒炒肉',
                        code: "098676889",
                        typeName: '爆炒系列',
                        price: 25.00,
                        isMember: 1,
                        status: 0
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