# 安装编译依赖库
```sh
  npm install
```

# 构建命令
```sh
  gulp
```

# 使用方法
```
  编译成功后，打开对应的领券页面，将dist目录生成的bundle.js添加到浏览器控制台运行即可。
```


# 支持优惠券类型&地址

- [x] 日常优惠券 地址格式：https://pro.m.jd.com/mall/active/{activityId}/index.html
- [x] 小白信用专属优惠券 地址格式：http://credit.jd.com/channel/coupon.html?couponBusinessId={couponBusinessId}&actId=004
- [x] 金币权益 地址格式：https://m.jr.jd.com/member/gcmall/index.html#/details?pid={pid}
- [x] 金币权益v2 地址格式：https://m.jr.jd.com/member/gcmall/index.html#/details?gid={gid}
- [x] PLUS尊享券 地址格式：https://plus.m.jd.com/coupon/index#/
- [x] 拼购优惠券 地址格式：https://h5.m.jd.com/babelDiy/Zeus/{activityId}/index.html
- [x] 日常优惠券 地址格式：https://coupon.m.jd.com/coupons/show.action?key={key}&roleId={roleId}
- [ ] 京豆兑换 地址格式：https://vip.m.jd.com/index.html?appName=fuli&id={id}
- [ ] 白条优惠券 地址格式：https://jrmkt.jd.com/ptp/wl/vouchers.html?activityId={activityId}
- [x] 白条优惠券 权益中心：https://m.jr.jd.com/member/rightsCenter/#/white
- [ ] 白条优惠券 京东白条：https://m.jr.jd.com/consumer/baitiaom/#/index

# TODO list
- [ ] 内置每日好券推荐接口
- [ ] 商品库存监听
- [ ] 增加导入cookie的多账号模式
- [ ] 京东平行商品查询
- [ ] 京东商城日常活动助手【京东农场、京东爱宠等】
- [ ] 京东商城日常签到助手
- [ ] 京东金融日常活动助手【养猪猪，金果树等】
- [ ] 京东金融日常签到助手

![pro.m.jd.com_mall_active](./assets/pro.m.jd.com_mall_active.png)
  

