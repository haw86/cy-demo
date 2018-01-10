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
   <div class="Goods-area">
       <div class="top-box">
            <div class="op-box">
                <div class="list">
                    <Button type="primary" @click="editFn('add','新增商品')">新增</Button>
                </div>
                <div class="list">
                    <Button type="ghost">导出</Button>
                </div>
           </div>
            <div class="search-box">
                <div class="list">
                    <Input v-model="searchParam" placeholder="商品名/编码"></Input>
                </div>
                <div class="list">
                    <Select v-model="goodsType" value="1" style="width:200px" placeholder="全部分类">
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
                ref="vAddLayer"
                v-model="vAdd.isEdit"
                :title="vAdd.title"
                :loading="vAdd.loading"
                :mask-closable="false"
                @on-ok="okFn('addFormData')"
                @on-cancel="cancelFn('addFormData')">
                <div class="layer-layout-box">
                    <Form ref="addFormData" :model="vAdd.formData" :rules="vAdd.ruleValidate" :label-width="80">
                        <FormItem label="商品名" prop="name">
                            <Input v-model="vAdd.formData.name" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="商品编码" prop="code">
                            <Input v-model="vAdd.formData.code" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="商品类别" prop="typeId">
                            <Select v-model="vAdd.formData.typeId">
                                <Option v-for="item in vAdd.typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="售价" prop="price">
                            <Input v-model="vAdd.formData.price" placeholder="格式如：1.00"></Input>
                        </FormItem>
                        <FormItem label="状态">
                            <Switch v-model="vAdd.formData.status" size="large">
                                <span slot="open">启用</span>
                                <span slot="close">禁用</span>
                            </Switch>
                        </FormItem>
                    </Form>
                </div>
            </Modal>
   </div>
</template>
<script>
    import qs from 'qs';
    export default {
        data () {
            return {
                searchParam:"",
                goodsType:"",
                typeList:[
                    {label:"全部分类",value:''},
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
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            var status = params.row.status;
                            var str = status==1 ? "启用" :"禁用";
                            return str;
                        }
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
                                            this.editFn('edit','编辑商品',params.row)
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
                        typeId: '3',
                        typeName: '火锅',
                        price: "115.00",
                        status: 1
                    },
                    {
                        name: '大白菜',
                        code: "23242345",
                        typeId: '2',
                        typeName: '小炒系列',
                        price: "15.50",
                        status: 0
                    },
                    {
                        name: '辣椒炒肉',
                        code: "098676889",
                        typeId: '2',
                        typeName: '爆炒系列',
                        price: "25.00",
                        status: 0
                    }
                ],

                //编辑弹窗
                vAdd:{
                    isEdit:false,
                    loading:true,
                    title:"",
                    typeList:[
                        {label:"热销菜品",value:'1'},
                        {label:"炒菜系列",value:'2'},
                        {label:"火锅系列",value:'3'},
                        {label:"汤",value:'4'},
                        {label:"蒸菜",value:'5'},
                        {label:"酒水",value:'6'}
                    ],
                    publicItem:{},
                    formData: {
                        name: '',
                        code: '',
                        typeId: '',
                        price: '',
                        status: 1
                    },
                    ruleValidate: {
                        name: [
                            { required: true, message: '不能为空', trigger: 'blur' }
                        ],
                        code: [
                            { required: true, message: '不能为空', trigger: 'blur' }
                        ],
                        price: [
                            { required: true, message: '不能为空', trigger: 'blur' },
                            { pattern:/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/ ,message: '格式不正确', trigger: 'blur' }
                        ],
                        typeId: [
                            { required: true, message: '必选', trigger: 'change' }
                        ]
                    }
                }
            }
        },
        methods: {
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },

            //编辑
            editFn (type,title,item){
                var t = this;
                t.vAdd.title = title;
                t.vAdd.isEdit = true;
                t.vAdd.type = type;
                if(t.vAdd.type=="add"){
                    t.vAdd.formData = {
                        name: '',
                        code: '',
                        typeId: '',
                        price: '',
                        status: 1
                    }
                }else if(t.vAdd.type=="edit"){
                    t.vAdd.publicItem = item;
                    t.vAdd.formData = {
                        name: t.vAdd.publicItem.name,
                        code: t.vAdd.publicItem.code,
                        typeId: t.vAdd.publicItem.typeId,
                        price: t.vAdd.publicItem.price,
                        status: t.vAdd.publicItem.status
                    }
                }
            },

            //删除
            removeFn (item){
                var t = this;

            },
            
            //确定回调
            okFn (name) {
                var t = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        t.vAdd.isEdit = false;
                        this.$Message.success('验证通过!');
                        t.saveFn();
                    } else {
                        this.$Message.error('验证失败!');
                        this.$refs["vAddLayer"].buttonLoading = false;
                    }
                })
            },

            //取消回调
            cancelFn (name) {
                this.$refs[name].resetFields();
            },

            //保存
            saveFn (){
                var data = qs.stringify({'id':12, name: 'dfd'});
                this.$ajax.post('test', data).then(response => {
                    
                });
            },
        }
    }
</script>