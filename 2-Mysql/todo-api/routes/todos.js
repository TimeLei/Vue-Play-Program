// 一. 导入express包
const express = require("express");
const { getAll, getOne, exec } = require("../db");
// 二. 创建router路由对象
const router = express.Router();
// 三. 编写路由规则

// GET /todos 返回 [{}, {}]
router.get("/", async (req, res) => {
  // 操作数据库
  // 1. 编写sql语句
  let sql = `select * from vue_todos`;
  const data = await getAll(sql);
  res.send({
    code: 0,
    message: "获取待办成功",
    result: data,
  });
});

// GET /todos/1 返回{}
router.get("/:id", async (req, res) => {
  // 一. 解析请求参数
  const { id } = req.params;
  // 二. 操作数据库
  let sql = `select * from vue_todos where id=${id}`;
  const data = await getOne(sql);
  // 三. 返回结果
  res.send({
    code: 0,
    message: "获取单个待办成功",
    result: data,
  });
});

// POST /todos {content: 'test'} 返回(新增的数据) {}
router.post("/", async (req, res) => {
  // 一. 解析请求参数
  const { content } = req.body;
  // 二. 操作数据库
  let sql = `insert into vue_todos (content) values ('${content}')`;
  const data = await exec(sql);
  // 三. 返回结果
  res.send({
    code: 0,
    message: "新增待办成功",
    result: {
      id: data.insertId,
      content,
      completed: 0,
    },
  });
});

// PUT /todos/1 {content: 'test-new'} 返回(修改的数据) {}
router.put("/:id", async (req, res) => {
  // 一. 解析请求参数
  const { id } = req.params;
  const { content, completed } = req.body;
  // 二. 操作数据库
  let sql = `update vue_todos set content='${content}', completed=${completed} where id=${id}`;
  await exec(sql);
  // 三. 返回结果
  res.send({
    code: 0,
    message: "修改待办成功",
    result: {
      id,
      content,
      completed,
    },
  });
});

// DELETE /todos/1
router.delete("/:id", async (req, res) => {
  // 一. 解析请求参数
  const { id } = req.params;
  // 二. 操作数据库
  let sql = `delete from vue_todos where id=${id}`;
  await exec(sql);
  // 三. 返回结果
  res.send({
    code: 0,
    message: "删除待办成功",
    result: "",
  });
});

// DELETE /todos?completed=1
router.delete("/", async (req, res) => {
  // 一. 解析请求参数
  const { completed } = req.query;
  console.log(completed);

  // 二. 操作数据库
  let sql = `delete from vue_todos where completed=${completed}`;
  await exec(sql);
  res.send({
    code: 0,
    message: "清除已完成的待办",
    result: "",
  });
});
// 四. 导出路由对象
module.exports = router;
