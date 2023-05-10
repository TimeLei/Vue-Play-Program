<template>
  <div class='main-header'>
    <h1>TodoList</h1>
  </div>
</template>

<script>
export default {
  name: 'MainHeader',
}
</script>

<style lang="stylus">
  //导入颜色文件 
  // @import '~styles/theme.styl'
  .main-header
    text-align: center
    h1
      margin: 80px 1000px 0 100px
      font-size: 100px
      font-weight: 200
      color: black
      // 给文字阴影
      text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1)
      // 艺术字体
      font-family:Speedo
      font-size:100px
</style>