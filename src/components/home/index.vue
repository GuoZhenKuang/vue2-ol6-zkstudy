<!--
 * @Author: 阿匡
 * @Date: 2022-02-16 16:00:34
 * @LastEditTime: 2022-02-16 16:45:43
 * @LastEditors: 阿匡
 * @Description: 首页展示
 * @FilePath: \vue2-ol-zkstudy\src\components\home\index.vue
 * 仅为学习使用
-->
<template>
    <div class="home">
        <video-bg :sources="[require('../../assets/homeImg/movie.mp4')]">
        </video-bg>
        <div class="nav_info">
            <ul>
                <li v-for="item in navItemList" :key="item.id" >
                    <div class="bc_icon" @click="openSystem(item.url)">
                        <i :class="item.icon"></i>
                    </div>
                    <div class="bg_icon"></div>
                    <div class="bc_name">
                        <font>{{item.label}}</font>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import VideoBg from 'vue-videobg'
    export default {
        name: 'homeComponent',
        data() {
            return {
                navItemList: [{
                    id: 1,
                    url: 'Screen',
                    label: 'zk-二三维大屏',
                    icon: 'el-icon-platform-eleme'
                },{
                    id:2,
                    url:'xfTest',
                    label:'xf-Test',
                    icon:'el-icon-eleme'
                }]
            }
        },
        components: {
            VideoBg
        },
        methods:{
            openSystem(url){
                this.$router.push(url)
            }
        }

    }
</script>

<style lang="scss" scoped>
    .VideoBg video {
        position: absolute;
        top: 50%;
        left: 50%;
        visibility: hidden;
        z-index: -11;
    }

    .nav_info {
        position: absolute;
        top: 30%;
        left: 15%;
        right: 15%;
        bottom: 10%;
        box-sizing: border-box;
        padding: 2% 5% 2% 5%;
        background: url('../../assets/homeImg/login_bg.png') center center;
        background-size: 100% 100%;

        ul {
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;

            li {
                list-style:none;/*去除无序列表前面的符号*/
                // width: 11.25rem
                    /* 180/16 */
                ;
                // height: 6.5rem
                    /* 200/16 */
                ;
                margin-right: 3.125rem /* 50/16 */;
                

                .bc_icon {
                    background: url(../../assets/homeImg/nav_icon_bg.png) center center;
                    background-size: 100% 100%;
                    text-align: center;
                    height: 4.375rem
                        /* 70/16 */
                    ;
                    width: 4.375rem
                        /* 70/16 */
                    ;
                    line-height: 5rem
                        /* 80/16 */
                    ;
                    margin-left: 1.25rem
                        /* 20/16 */
                    ;
                    z-index: 9;
                    position: absolute;
                    cursor: pointer;
                }

                .bg_icon {
                    background: url(../../assets/homeImg/nav_icon_bg1.png) center center;
                    background-size: 100% 100%;
                    width: 6.875rem
                        /* 110/16 */
                    ;
                    height: 4.375rem
                        /* 70/16 */
                    ;
                    margin-top: 1.875rem
                        /* 30/16 */
                    ;
                }

                i {
                    font-size: 1.75rem
                        /* 28/16 */
                    ;
                    color: #00eeff;
                }

                .bc_name {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    font {
                        font-size: .875rem
                            /* 14/16 */
                        ;
                        color: #fff;
                    }
                }

            }
        }
    }
</style>