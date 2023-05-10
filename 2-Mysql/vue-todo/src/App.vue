<template>
  <div id="app">
    <main-header></main-header>
    <main-todo></main-todo>
    <main-footer></main-footer>
  </div>
</template>

<script>
// 导入组件
// 打包工具允许不写后缀名(.vue .js).
import MainHeader from './components/MainHeader'
import MainTodo from './components/MainTodo'
import MainFooter from './components/MainFooter'

export default {
  name: 'App',
  components: {
    MainHeader,
    MainTodo,
    MainFooter,
  },
}
</script>

<style lang="stylus">
@import './assets/styles/rest.styl'
</style>
