<template>
  <div class="main-todo">
    <input
      class="add-todo"
      type="text"
      placeholder="写入心中所想"
      v-model="title"
      @keyup.enter="Addlist"
    />

    <todo-item
      v-for="item in filtertodos"
      :key="item.id"
      :todos="item"
      @taggle="changeLabel"
      @gouxuan="gouxuan"
      @dellabel="dellabel"
    ></todo-item>
    <todo-info :todos="todos" @Atab="Atab" @taggle="deleteAll"></todo-info>
  </div>
</template>

<script>
// 导入子组件
import TodoInfo from "./coms/TodoInfo";
import TodoItem from "./coms/TodoItem";

export default {
  name: "MainTodo",
  components: {
    TodoItem,
    TodoInfo,
  },
  data() {
    return {
      todos: [],
      title: "",
      stodo: "",
    };
  },
  created() {
    this.geyData();
  },
  computed: {
    filtertodos() {
      switch (this.stodo) {
        case "全部":
          return this.todos;
          break;

        case "完成":
          return this.todos.filter((item) => {
            return item.completed == 1;
          });
          break;

        case "代办":
          return this.todos.filter((item) => {
            return item.completed == 0;
          });
          break;

        default:
          return this.todos;
      }
    },
  },
  methods: {
    // 页面初始值 获取数据库数据渲染页面
    geyData() {
      // 1.MainTodo组件被创建时,自动执行
      console.log("MainTodo组件被创建");
      // 2.发送ajax请求
      // 此时res中的data属性中的result属性中：数据库所有代办以数组形式存放在此
      this.$http.get("http://localhost:3000/todos").then((res) => {
        console.log(res);
        // 3.将接收到的数据库的数据--解构赋值出来--渲染到页面上
        const { code, message, result } = res.data;
        if (code == 0) {
          this.todos = result;
        }
      });
    },

    // 添加代办功能
    Addlist() {
      // 1.获取写入的信息数据
      console.log(this.title);
      // 2.将数据添加到数据库中--并在首端显示
      this.$http
        .post("http://localhost:3000/todos", { content: this.title })
        .then((res) => {
          console.log(res);
          const { code, message, result } = res.data;
          if (code == 0) {
            this.todos = result;
            // 3.添加成功后--将输入框的信息清空
            this.title = "";
            // 4.清空输入框后--刷新页面
            this.geyData();
          }
        });
    },

    // 修改功能
    changeLabel(id, content) {
      // 1. 根据id查找需要修改的todo对象
      const todo = this.todos.find((item) => item.id == id);
      // 2. 更新todo对象的content的值
      todo.content = content;
      // 3. 发送ajax请求, 调用put接口更新
      this.$http.put("http://localhost:3000/todos/" + id, todo).then((res) => {
        const { code, message, result } = res.data;
        if (code == 0) {
          this.geyData();
        }
      });
    },

    // 复选框的勾选功能--改变数据的completed值
    gouxuan(id) {
      //1.检验是否传输成功
      console.log(id);
      //2.根据id值--找到对应的代办对象--将其completed值改变反值
      //过滤整个数组--按照条件过滤--形成新的数组)
      const todos = this.todos.filter((item) => {
        return item.id == id;
      });
      todos[0].completed == 0? (todos[0].completed = 1) : (todos[0].completed = 0);
      // 3.发送ajax请求
      this.$http
        .put("http://localhost:3000/todos/" + id, todos[0])
        .then((res) => {
          const { code, result } = res.data;
          if (code == 0) {
            // 重新渲染页面
            // this.todos = result
            this.geyData();
          }
        });
    },

    // 删除单个代办功能
    dellabel(id) {
      this.$http.delete("http://localhost:3000/todos/" + id).then((res) => {
        const { code, result } = res.data;
        if (code == 0) {
          // 刷新页面
          this.geyData();
        }
      });
    },

    // 切换tab栏--接收子元素数据
    Atab(stodo) {
      // 1.将子组件传递的数据--赋值给新建的属性
      this.stodo = stodo;
      // 2.父组件根据此值--作为不同渲染页面的条件
      // console.log(this.stodo);
    },


    deleteAll() {
       this.$http.delete('http://localhost:3000/todos?completed=1')
        .then((res) => {
          const { code } = res.data
          if (code == 0) {
            this.geyData()
          }
        })
    },
  },
};
</script>

<style lang="stylus">

@import '~styles/mixins.styl'
// MainTodo组件
.main-todo
     margin 0 1000px 0 50px
     width 550px
     background-color rgba(255,255,255,0.1)
     border-radius: 5px
     // 盒子阴影
     box-shadow: 5px 5px 5px #666
     background: rgba(255,255,255,0.6)

// input
.add-todo
    // 美化输入框
    //  1.input边框 2.鼠标点击出现的外部边框 3.input框-圆角
    width 100%
    background-color rgba(255,255,255,0.2)
    padding: 15px 15px 15px 180px
    // 自动消减元素的内外边距
    box-sizing: border-box
    font-size: 24px
    // 字体继承父元素
    font-family: inherits
    font-weight: 700
    // 点击input--外边框消失
    outline: none
    // input框周边圆角
    border-radius: 5px 5px 0 0
    // input-边框消除
    border: none

// input输入框--place属性文字
::-webkit-input-placeholder
  // 艺术字体
  font-family:LRRL
  font-size: 28px
  color:black
</style>
