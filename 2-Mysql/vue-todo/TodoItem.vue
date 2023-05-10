<template>
  <div :class='["todo-item",todos.done? "completed":""]'>
    <input type="checkbox" :checked='todos.done' @change='checkedChange(todos.id)'/>

    <label v-if="flag" @click="labelClick">{{ todos.name }} {{todos.date}}</label>
    <input
      v-else
      type="text"
      @keyup.enter="inputKeyenter"
      @keyup.esc="inputKeyesc"
      v-todo-focus
    />

    <button @click="Dellabel(todos.id)"></button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  data() {
    return {
      flag: true,
    };
  },
  props: ["todos"],
  directives: {
    "todo-focus": {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  methods: {
    // 作用：修改功能 切换label为input
    labelClick() {
      // 点击后-修改flag属性：将label隐藏 展示input框
      this.flag = false;
    },

    // 作用：1.获取修改的属性值 2.按下回车键--修改功能结束
    inputKeyenter(e) {
      //1.监测是否可收到修改后的属性值
      console.log(e.target.value);

      // 2.获取修改后的属性值-并替换掉原来的属性值
      this.todos.name = e.target.value;

      // 3.改变flag值
      this.flag = true;
    },
    // 作用：不修改属性值--按下Esc键--退出修改功能
    inputKeyesc() {
      this.flag = true;
    },

    // 作用：点击事件--删除list表中代办
    Dellabel(id) {
      // 1.获取代办的id值
       console.log(id);
      // 2.通知父组件--删除id多对应的代办--自定义事件
      this.$emit('toggle',id)
    },

    // 作用：修改数组元素对象的done值
    checkedChange(id){
      // 修改数据---数据在哪-在哪修改--通知父组件：自定义事件
      this.$emit('goucheck',id)  
    }
  },
};
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
    
    input[type='text']
     width:100%
     background-color: #999
     font-size: 20px
     clearDefault()

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

    //  勾选--添加中划线
    &.completed
      label
        text-decoration: line-through
        color: #999
</style>
