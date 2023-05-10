<template>
   <div class='todo-info' v-show='AllTodo'>
    <input type="checkbox" :checked='Allgou' @click="checkclick">
    <span>完成{{DateTodo}}项 / 共计{{AllTodo}}项</span>
    <div class="tab">
      <a v-for='(item,index) in stodos' :key='index'
         @click='Aclick(item)'
         :class="stodo==item? 'currout':''">{{item}}</a>
    </div>
    <button @click='DelLabel'>清除全部</button>
   </div>
</template>

<script>
export default {
  name: 'TodoInfo',
  data(){
    return{
      stodos:['全部','完成','代办'],
      stodo:'全部'
    }
  },
  // 接收父组件传递的本地数组数据
  props:['todos'],
  computed:{
    // 作用：计算完成的代办的总数
    DateTodo(){
      // 原理：遍历整个数组--通过对象done--计算完成代办的数量
      // 方式一：
      // let i = 0
      // for(var j=0;j<this.todos.length;j++){
      //   if(this.todos[j].done == 1){
      //     i++
      //   }
      // }
      // return i

      // 方式二：
      let i = 0
      this.todos.forEach(ele => {
        if(ele.done == 1){ i++ }
      });
      return i

      // 方式三：数组randce()函数
    },

    // 作用：计算全部代办
    AllTodo(){
      // 原理：数据是通过数组进行存储--每一个数组元素即为一个代办-
      // 所以数组的长度 即为代办的总数
      return this.todos.length
    },

    Allgou(){
      // 全选/全不选勾选框-checked属性初始值：当完成个数=全部个数 复选框勾选
      // 发生：所有代办已完成--全部被勾选==全选 
      // 发生：所有代办未完成--全部没勾选==全不选
      // 特例：若所有的代办被删除--则此时完成数量=全部数量--复选框被勾选
      // 解决特例措施：添加条件AllTodo数量>0                        
      return this.DateTodo == this.AllTodo & this.AllTodo > 0
    }
  },
  methods:{
    // 作用：点击 全部勾选/全部取消勾选
    checkclick(e){
      // 关键点：通过e.target.checked 获取input-checkbox复选框的属性值：true/false
      // 若：点击复选框-其e.target.checked值为true----全选-----改变全部代办的done为true
      // 若：点击复选框-其e.target.checked值为false---全不选---改变全部代办的done为false
      
      // 1.获取复选框的checked值--true/false
       console.log(e.target.checked);
      // 2.通知父组件---修改list表中所有代办的done值
      this.$emit('taggle',e.target.checked) 
    },

    Aclick(s){
      // 新建点击事件--传输数据：item(列表渲染后的item)
      // 点击事件作用：将参数赋值给stodo------结果呈现：每次点击事件-stodo保存是点到的链接a
      this.stodo=s

      // 2.通知父组件--根据传输的参数 即具体链接功能---渲染不同的页面
      this.$emit('changeAn',s)
    },

    DelLabel(){
      this.$emit('dellabel')
    },
  },
}
</script>

<style lang='stylus'>
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
    padding-left:20px
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