<style scoped lang="less">

</style>
<template>
   <div class="GoodsType-area">
       <div class="top-box">
            <div class="op-box">
                <div class="list">
                    <Button type="primary" @click="editFn('add','新增分类')">新增</Button>
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
                        <FormItem label="分类名" prop="name">
                            <Input v-model="vAdd.formData.name" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="排序" prop="sort">
                            <Input v-model="vAdd.formData.sort" placeholder="请输入"></Input>
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
                        name: '热销菜品',
                        sort: "100",
                        status: true
                    },
                    {
                        name: '炒菜系列',
                        sort: "90",
                        status: true
                    },
                    {
                        name: '火锅系列',
                        sort: "80",
                        status: false
                    },
                ],


                //编辑弹窗
                vAdd:{
                    isEdit:false,
                    loading:true,
                    title:"",
                    publicItem:{},
                    formData: {
                        name: '',
                        sort: '',
                        status: true
                    },
                    ruleValidate: {
                        name: [
                            { required: true, message: '不能为空', trigger: 'blur' }
                        ],
                        sort: [
                            { required: true, message: '不能为空', trigger: 'blur' }
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
                        sort: '',
                        status: true
                    }
                }else if(t.vAdd.type=="edit"){
                    t.vAdd.publicItem = item;
                    t.vAdd.formData = {
                        id: t.vAdd.publicItem.id,
                        name: t.vAdd.publicItem.name,
                        sort: t.vAdd.publicItem.sort,
                        status: t.vAdd.publicItem.status
                    }
                }
            },

            //删除
            removeFn (item){
                var t = this;
                this.$Message.success('删除成功!');
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
                var t = this;
                var data = qs.stringify(t.vAdd.formData);
                this.$ajax.post('test', data).then(response => {
                    
                });
            },
        }
    }
</script>
