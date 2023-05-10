<template>
   <div :class="['todo-item', todos.completed ? 'completed' : '']">
    <input type="checkbox" :checked='todos.completed' @click='checkClick(todos.id)'>
    <label v-if='flag' @click='labelClick' :class="todos.completed? 'completed':''">{{todos.content}}</label>
    <input v-else @keyup.enter='KeyEnter' @keyup.esc='KeyEsc' v-todo-focus type="text">
    <button @click="dellabel(todos.id)"></button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props:['todos'],
  data(){
    return{
      flag:'true'
    }
  },
  // 自定义指令--input输入框自动获取焦点：即单击获取焦点
  directives: {
    'todo-focus': {
      inserted: function (el) {
        el.focus()
      },
    },
  },
  methods:{
    // 修改功能--点击label变为input
    labelClick(){
      // 原理：点击事件-改变flag的布尔值
      this.flag=false
    },

    // 修改功能--键盘事件Enter-将修改的数据发送给数据库，并接受数据库数据渲染页面
    KeyEnter(e){
      // 原理：1.获取input框中修改的数据
      console.log(e.target.value);
      // 2.数据在哪--增删改查在哪--通知父组件修改数据内容
      //   传输参数：id确认对象 e.target.value修改后的内容
      this.$emit('taggle',this.todos.id,e.target.value)
      // 3.修改flag属性值--input框变为label
      this.flag=true
    },
    // 修改功能--键盘事件Esc-不修改时--退出修改功能
    KeyEsc(){
      this.flag=true
    },
    // 复选框点击勾选功能
    checkClick(id){
        this.$emit('gouxuan',id)
    },

    // 删除单个代办功能
    dellabel(id){
      alert('请确认是否要删除')
      this.$emit('dellabel',id)
    },
  },
}
</script>

<style lang="stylus">
@import '~styles/theme.styl'
@import '~styles/mixins.styl'

.todo-item
    //记录页面--flex布局
    display:flex
    justify-content: space-between
    padding: 10px
    border-top: 1px solid rgba(0,0,0,0.3)
    font-size:24px



    //属性选择器
    input[type='checkbox']
     // 表单元素美化的原则：去掉浏览器自带的样式--使用自定义样式
     width:40px
     clearDefault()

     // &表示父元素
     // 未点击确认时---图标
     &::after
       content: url('../../../assets/image/unchecked.svg')
     // 点击确认时----图标
     &:checked::after
       content: url('../../../assets/image/checked.svg')

     //label
    label
       // 让label子元素, 独占剩余的宽度
       flex: 1
       margin-left: 30px
       line-height: 40px
       transition: all 0.4s

     //button
    button
       width: 40px
       height: 40px
       background-color: transparent
       appearance: none
       clearDefault()
       // ???
       cursor: pointer

     // 当鼠标经过todo-item时, 显示button的伪元素
    &:hover
       button::after
         content: url('../../../assets/image/delete.svg')
         font-size: 30px
         color: $lightred

    input[type='text']
     width:100%
     background-color: #999
     font-size: 20px
     clearDefault()

    //  勾选--添加中划线
    &.completed
      label
        text-decoration: line-through
        color: #999
</style>
