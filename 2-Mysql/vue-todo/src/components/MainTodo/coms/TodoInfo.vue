<template>
  <div class="todo-info">
    <span>完成{{ dateTodo }}项/全部{{ AllTodo }}项</span>
    <div class="tab">
      <a
        href="#"
        v-for="(item, index) in stodos"
        :key="index"
        @click="Aclick"
        :class="stodo == item ? 'currout' : ''"
        >{{ item }}</a
      >
    </div>
    <button @click="deleAll">清除完成</button>
  </div>
</template>

<script>
export default {
  name: "TodoInfo",
  data() {
    return {
      stodos: ["全部", "完成", "代办"],
      stodo: "全部",
    };
  },
  props: ["todos"],
  computed: {
    // 完成代办数量
    dateTodo() {
      // 判断状态为1的对象
      let j = 0;
      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed == 1) {
          j++;
        }
      }
      return j;
    },
    // 全部代办数量
    AllTodo() {
      return this.todos.length;
    },
  },
  methods: {
    // 点击tab栏--1.切换样式 2.将stodo值传递给父元素
    Aclick(e) {
      // 1.点击不同链接-获取其名
      // console.dir(e.target); //得知其链接值--在outerText
      // console.log(e.target.outerText);
      // 2.将链接的名字动态的赋值给stodo
      this.stodo = e.target.outerText;

      // 3.自定义事件--传递stodo值
      this.$emit("Atab", this.stodo);
    },

    // 删除完成代办的功能
    deleAll() {
      alert("请确认是否要删除");
      this.$emit("taggle");
    },
  },
};
</script>

<style lang="stylus">
.todo-info
  display:flex
  border-top:1px solid black
  width 100%
  height 40px
  background: rgba(255,255,255,0.3)
  input[type='checkbox']
    margin-left:15px
  span
    color:black
    font-size: 15px
    font-weight: 700
    line-height: 40px
    padding-left:10px
  .tab
    width: 200px
    padding-left: 105px
    line-height: 40px
    flex:1
    a
      text-decoration:none
      font-size:15px
      font-weight:700
      color:black
      margin-left:10px
      border: 1px solid black
      &.currout
        color:#fff
        background-color: #999
  button
    border:1px solid black
    width: 65px
    height: 30px
    margin-top:5px
    margin-right: 15px
    background-color: #999
</style>
