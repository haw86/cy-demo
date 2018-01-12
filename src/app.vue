<style lang="less">
    @import 'styles/common.css';
    .layout{
        background: #f5f7f9;
        position: relative;
        min-height: 100%;
        overflow: hidden;
        overflow-x:auto;
        .logo{
            height: 49px;
            text-align: center;
            img{
                padding-top:10px;
            }
        }
    }
    .layout-sidebar{
        position: fixed!important;
    }
    .layout-main{
        margin-left:200px;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .top-box{
        display:flex;
        .op-box{
            display:flex;
            flex: auto;
            .list{
                margin-right:10px;
                margin-bottom:15px;
            }
        }
        .search-box{
            display: -ms-flexbox;
            display: -webkit-box;
            display: flex;
            .list{
                margin-left:10px;
                margin-bottom:10px;
                flex: auto;
            }
        }
    }
    .content-box{
        background: #ffffff;
    }
    .page-box{
        padding:15px 0px;
        text-align: right;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .layout .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{
        padding: 10px 0 10px 50px;
        font-size: 13px;
        color:#eeeeee;
    }

    //欢迎
    .hy-tips{
        line-height:49px;
        padding-left:20px;
        color:#999999;
    }
    //右侧用户中心
    .admin-user{
        position: absolute;
        top:0px;
        right:0px;
        padding:0 20px;
        .ivu-dropdown-rel{
            height: 49px;
            line-height: 49px;
            a{
                line-height: 49px;
            }
        }
        &:hover{
            
        }
    }

    //公用标题
    .public-title{
        line-height: 50px;
        font-size: 15px;
        font-weight: bold;
    }

    //卡片
    .public-card{
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        margin-bottom:15px;
        .card-title{
            height: 42px;
            line-height: 42px;
            padding: 0 15px;
            border-bottom: 1px solid #f6f6f6;
            color: #333;
            border-radius: 2px 2px 0 0;
            font-size: 14px;
        }
        .card-body{
            padding: 10px 15px;
            line-height: 222%;
        }
    }
</style>


<template>

    <div class="layout" :style="{'min-height':fullHeight+'px'}">
        <Layout>
            <Sider ref="sidebar" class="layout-sidebar" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed":style="{height:fullHeight+'px'}">
                <div class="logo">
                    <img src="./images/logo.png" />
                </div>
                <Menu ref="sideMenu" theme="dark" width="auto" :class="menuitemClasses" :open-names="openName" :active-name="activeName" @on-select="onSelectFn">
                    <MenuItem name="/">
                        <Icon type="home"></Icon>
                        <span>首页</span>
                    </MenuItem>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="briefcase"></Icon>
                            商品
                        </template>
                        <MenuItem ref="Goods" name="/Goods">
                                商品
                        </MenuItem>
                        <MenuItem ref="GoodsType" name="/GoodsType" p-name="2">
                                分类
                        </MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="person-stalker"></Icon>
                            会员
                        </template>
                        <MenuItem ref="Member" name="/Member">
                                会员
                        </MenuItem>
                        <MenuItem ref="MemberGrade" name="/MemberGrade">
                                等级
                        </MenuItem>
                    </Submenu>
                    <MenuItem name="/DataCount">
                        <Icon type="connection-bars"></Icon>
                        <span>数据报表</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout class="layout-main">
                <Header :style="{padding: 0,height:'49px',background:'#f5f5f5'}" class="layout-header-bar">
                    <!--<Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>-->
                    <div class="hy-tips">欢迎登录客来餐饮管理系统，这是一个Demo演示。</div>
                    <Dropdown trigger="click" class="admin-user">
                        <a href="javascript:void(0)">
                            admin
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem>用户中心</DropdownItem>
                            <DropdownItem>退出登录</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Header>
                <Content :style="{margin: '20px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                openName:[],
                activeName:"/",
                fullHeight: document.documentElement.clientHeight,
                isCollapsed: false
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.sidebar.toggleCollapse();
            },

            //选择颜色
            selectColorFn:function(val){
                console.log(val);
            },

            //选中菜单
            onSelectFn:function(name){
                this.$router.push({ path: name })
            }
        },
        watch: {
            route () {
                this.$refs.leftMenu.currentActiveName = '/'
            }
        },
        mounted:function(){
            var t = this;

            //布局自适应
            window.onresize = function(){
                t.fullHeight = document.documentElement.clientHeight;
            }

            //导航落点
            if(window.currentMenu.fullPath) t.activeName = window.currentMenu.fullPath;
            if(window.currentMenu.parentName) t.openName = [window.currentMenu.parentName];
            this.$nextTick(() => {
                this.$refs.sideMenu.updateOpened()
                this.$refs.sideMenu.updateActiveName()
            })
        }
    }
</script>
