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


# 算法说明
- 输入变量：座位的Map对象（remainingSeatsMap）和用户购买的票数（applyCount）
- 返回值：分配给用户的座位号编码数组，数据库操作副作用

- 座位Map对象结构说明
- - key，是空余的连续座位数量，是length。比如一开始值是50，52...100
- - value, 是以每一组空余连续座位的第一个座位编码为单元的数组，比如，初始化时是：`[AA1, BA1, CA1, DA1]`
- - k-v, 总结就是：`50 -> [AA1, BA1, CA1, DA1]`

- 主要逻辑：
- 如果刚好有剩余连续座位数**等于**申请座位数（随机分配有同等数量的连续座位号）
- - 随机从该key对应的value中，选择一个座位编码
- - 根据申请座位数和第一个座位编码，生成分配结果座位编码
- - 从座位Map对应的key中删除该选中的座位编码，将分配结果和数据库操作返回
- 否则，如果有剩余连续座位数**大于**申请座位数（从大于的里面随机抽取分配给申请数）
- - 将所有大于申请座位数的key都插入数组，然后从该数组中随机抽取一个key
- - 再随机从该key对应的value中，选择一个座位编码
- - 根据选择的座位编码，然后用申请座位数去随机截取一段连续的座位号，如果产生左边或右边新连续座位号，则更新到Map中
- - 根据申请座位数和截取到的第一个座位编码，生成分配结果座位编码
- - 从座位Map对应的key中删除该选中的座位编码，将分配结果和数据库操作返回
- 否则，如果有剩余连续座位数**小于**申请座位数（排序，优先分配剩余大的给申请数，递归分配）
- - 将key都插入数组，然后排序
- - 递归开始，在最大的key对应的value中，随机选择一个座位编码
- - 根据选择的座位编码和剩余长度，生成一段连续座位号，返回现在分配结合递归结果的结果
- - 从座位Map对应的key中删除该选中的座位编码，将分配结果和数据库操作返回
- - 递归上面的分配

- 技巧
- - 利用引用数据，在各个函数执行域存储数据库副作用dbEffects，操作全局座位Map对象
