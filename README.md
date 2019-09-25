# 使用
## 启动数据库服务器
```sh
cd server
npm i
npm start
```

## 启动静态服务器
```sh
cd web
npm i
npm start
```

# 功能
- [x] 用户一次性可购买1-5张票
- [x] 系统随机为用户分配座位
- [x] 用户单次购买多张票时，尽量分配连续的座位
- [x] 票编码：区号字母+行号字母+列号数字   例:  AE34, AZ100
- [x] 使用 sqlite 做数据库， Sequelize 操作数据库，graphQl 作前后端接口格式，apollo 管理前端数据和请求
