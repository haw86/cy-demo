<style lang="less">
    @import 'styles/common.css';
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
        min-width: 1000px;
        overflow-x:auto;
        .logo{
            height: 49px;
            text-align: center;
            img{
                padding-top:10px;
            }
        }
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
</style>


<template>

    <div class="layout" :style="{height:fullHeight+'px'}">
        <Layout>
            <Sider ref="sidebar" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed":style="{height:fullHeight+'px'}">
                <div class="logo">
                    <img src="./images/logo.png" />
                </div>
                <Menu ref="sideMenu" theme="dark" width="auto" :class="menuitemClasses" :open-names="['2']" @on-select="onSelectFn">
                    <MenuItem name="/">
                        <Icon type="home"></Icon>
                        <span>首页</span>
                    </MenuItem>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="briefcase"></Icon>
                            商品
                        </template>
                        <MenuItem name="/Goods">
                                商品
                        </MenuItem>
                        <MenuItem name="/GoodsType">
                                分类
                        </MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="person-stalker"></Icon>
                            会员
                        </template>
                        <MenuItem name="/Member">
                                会员
                        </MenuItem>
                        <MenuItem name="/MemberGrade">
                                等级
                        </MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0,height:'49px',background:'#f5f5f5'}" class="layout-header-bar">
                    <!--<Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>-->
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

            this.open = ["2"];
            this.active = [window.fullPath];
            this.$nextTick(function() {
                this.$refs.sideMenu.updateOpened();
                this.$refs.sideMenu.updateActiveName();
            })
        }
    }
</script>
