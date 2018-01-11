<style scoped lang="less">

</style>
<template>
   <div class="GoodsType-area">
       <div class="top-box">
            <div class="op-box">
                <div class="list">
                    <Button type="primary" @click="editFn('add','新增会员')">新增</Button>
                </div>
           </div>
       </div>
        
        <div class="content-box">
            <Table border ref="selection" :columns="tableCol" :data="tableData"></Table>
        </div>
        <div class="page-box">
            <Page :total="3" show-total></Page>
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
                        <FormItem label="姓名" prop="name">
                            <Input v-model="vAdd.formData.name" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="会员编码" prop="code">
                            <Input v-model="vAdd.formData.code" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="会员等级" prop="typeId">
                            <Select v-model="vAdd.formData.gradeId">
                                <Option v-for="item in vAdd.gradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="备注" prop="remark">
                            <Input v-model="vAdd.formData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
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
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '会员编码',
                        key: 'code'
                    },
                    {
                        title: '会员等级',
                        key: 'gradeName'
                    },
                    {
                        title: '备注',
                        key: 'remark'
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
                                            this.editFn('edit','编辑会员',params.row)
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
                        name: '刘德华',
                        code: "hy1252525",
                        gradeId:"1",
                        gradeName:"普通会员",
                        remark:"明星会员",
                        status: true
                    },
                    {
                        name: '奥巴马',
                        code: "hy111110",
                        gradeId:"2",
                        gradeName:"高级会员",
                        remark:"总统会员",
                        status: true
                    },
                    {
                        name: '王小二',
                        code: "hy23232663",
                        gradeId:"2",
                        gradeName:"高级会员",
                        remark:"草根会员",
                        status: true
                    }
                ],


                //编辑弹窗
                vAdd:{
                    isEdit:false,
                    loading:true,
                    title:"",
                    publicItem:{},
                    gradeList:[
                        {label:"普通会员",value:'1'},
                        {label:"高级会员",value:'2'}
                    ],
                    formData: {
                        name: '',
                        code: '',
                        remark: '',
                        gradeId: '',
                        status: true
                    },
                    ruleValidate: {
                        name: [
                            { required: true, message: '不能为空', trigger: 'blur' }
                        ],
                        code: [
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
                        code: '',
                        remark: '',
                        gradeId: '',
                        status: true
                    }
                }else if(t.vAdd.type=="edit"){
                    t.vAdd.publicItem = item;
                    t.vAdd.formData = {
                        id: t.vAdd.publicItem.id,
                        name: t.vAdd.publicItem.name,
                        code: t.vAdd.publicItem.code,
                        remark: t.vAdd.publicItem.remark,
                        gradeId: t.vAdd.publicItem.gradeId,
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
