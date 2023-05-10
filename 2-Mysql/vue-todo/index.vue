<template>
  <div class="main-todo">
    
    <input class="add-todo" 
    type="text" 
    placeholder="写入心中所想" 
    v-model='title' @keyup.enter="Addlist">
    
    <todo-item 
    v-for='item in flterdata' 
    :key='item.id' 
    :todos='item'
    @toggle='handDel'
    @goucheck='goucheck'></todo-item>
    
    <todo-info :todos='todos' 
               @taggle='gouChecked' 
               @changeAn='changeAn'
               @dellabel='dellabel'></todo-info>
  </div>
</template>
 
<script>
// 导入MainTodo-子组件
import TodoInfo from "./coms/TodoInfo";
import TodoItem from "./coms/TodoItem";
import {nanoid} from 'nanoid';
// 创建点击时间
function getTime(){
        var date = new Date()
        //日期格式化
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        return year + '-' + month + '-' + day
}

export default {
  name: "MainTodo",
  components:{
    TodoInfo,
    TodoItem,
  },
  data(){
    return{
      todos:[
        {id:'001',name:'代办事项1',date:'2022-10-2',done:0},
        {id:'002',name:'代办事项2',date:'2022-10-2',done:1},
        {id:'003',name:'代办事项3',date:'2022-10-2',done:0}
        ],
      title:'',
      state:'全部'
    }
  },
computed:{
  flterdata(){
    switch(this.state){
      case '全部': return this.todos 
      break

      case '完成': return this.todos.filter((ele)=>{return ele.done==1})
      break

      case '代办': return this.todos.filter((ele)=>{return ele.done==0})
      break

      default: return  this.todos
    }
  }
},
methods:{

  // input输入框--键盘事件--按下回车键--信息添加到list表顶部
  Addlist(){
    // 1.获取input输入框信息--方式1：通过事件对象-e- e.target 所指DOM--input输入框 
    //                       方式2：通过data-属性值与input输入框双向绑定
        // console.log(e.target.value);
    // 2.将获取的信息--转为对象型数据--通过nonaid()函数
    const obj = { id:nanoid(), name:this.title, date:getTime(), done:0 }
    // 3.将转好的数据类型--添加到list表顶部--添加到数组首位
    this.todos.unshift(obj)
    // 4.数据添加到list表顶部--清空input输入框
    this.title=''
  },

  // 作用：根据子组件传来的参数--删除指定id对应的代办
  // 原理：通过过滤filter数组方法：将不符合条件的元素剔除-重新创建新数组
  handDel(id){
  // 提示用户确定删除
  alert('确定是否要删除')
  // 产生新数组进行接收 = 
  this.todos = this.todos.filter((ele)=>{
      return ele.id !== id
 })
  },

  // 作用:根据子组件传递id值--确认对应的代办对象--修改其done值
  goucheck(id){
    this.todos.find((ele)=>{
      if(ele.id==id){
        ele.done=ele.done? 0:1
      }
    })
  },

  // 作用：根据子组件传来的false/true值--改变全部代办的done值--实现全选/全不选
  gouChecked(done){
    this.todos.forEach(ele => {
       ele.done=done
    });
  },

  // 根据子组件传输的参数 即具体链接功能---渲染不同的页面
  changeAn(s){
    this.state = s
  },

  //作用: 点击按钮--删除全部代办
  dellabel(){
    alert('是否全部删除代办')
    // 原理：filter方法--过滤条件：done为1的--选择done=0的数组元素 反之同理
     this.todos=this.todos.filter((ele)=>{ele.done? 0 :1})
  }
}
};
</script>

<style lang="stylus">

@import '~styles/mixins.styl'
// MainTodo组件
.main-todo
     margin 0 100px 0 10px
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
  font-size: 25px
  color:black
</style>
