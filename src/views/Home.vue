<!--
 * @Author: 阿匡
 * @Date: 2022-02-16 15:48:05
 * @LastEditTime: 2022-02-16 16:03:04
 * @LastEditors: 阿匡
 * @Description: 新首页
 * @FilePath: \vue2-ol-zkstudy\src\views\Home.vue
 * 仅为学习使用
-->
<template>
    <div class="index_wrap">
        <HomeComponent/>
    </div>
</template>

<script>
    import HomeComponent from '@/components/home'
    export default {
        name: 'Home',
        components: {
            HomeComponent
        }

    }
</script>

<style lang="scss" scoped>

</style>