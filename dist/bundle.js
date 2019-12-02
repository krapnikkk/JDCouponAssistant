(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NewBabelAwardCollection {
    constructor(paramsObj) {
        this.url = "https://api.m.jd.com/client.action?functionId=newBabelAwardCollection";
        this.couponList = [];
        this.method = "POST";
        this.data = 'body={"activityId":"{activityId}","scene":{scene},"args":"{args}"}&client=wh5';
        this.paramsObj = paramsObj.activityId;
    }
    get() {
        this.couponList = [];
        const activityData = window.__react_data__.activityData.floorList;
        for (let i = 0; i < activityData.length; i++) {
            const item = activityData[i];
            if (item.template == "free_coupon") {
                for (let j = 0; j < item.couponList.length; j++) {
                    const coupon = item.couponList[j], scene = coupon["scene"], args = coupon["args"], cid = JSON.parse(coupon["jsonSrv"])["cid"], discount = coupon["discount"], details = `${coupon["limit"]},${coupon["scope"]}`;
                    this.couponList.push({
                        "discount": discount,
                        "details": details,
                        "scene": scene,
                        "args": args,
                        "couponbatch": cid
                    });
                }
            }
        }
        console.log(this.couponList);
        this.list();
    }
    list() {
    }
    send() {
    }
}
exports.default = NewBabelAwardCollection;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newBabelAwardCollection_1 = require("./coupons/newBabelAwardCollection");
var couponType;
(function (couponType) {
    couponType[couponType["none"] = 0] = "none";
    couponType[couponType["receiveCoupons"] = 1] = "receiveCoupons";
    couponType["newBabelAwardCollection"] = "newBabelAwardCollection";
})(couponType || (couponType = {}));
let dom = document.createElement("div");
document.body.innerHTML = "";
document.body.style.backgroundColor = "#ffffff";
document.body.append(dom);
dom.innerHTML = "<h2>用户信息</h2>";
let coupon, url = window.location.href;
function getCouponType() {
    let type = couponType.none;
    if (!window.location.host.includes("jd.com")) {
        return type;
    }
    if (window.__react_data__) {
        type = couponType.newBabelAwardCollection;
    }
    else {
    }
    return type;
}
function getCouponDesc(type) {
    switch (type) {
        case couponType.none:
            break;
        case couponType.newBabelAwardCollection:
            const args = url.match(/active\/(\S*)\/index/)[1];
            coupon = new newBabelAwardCollection_1.default({ "activityId": args });
            break;
        default:
            break;
    }
    coupon.get();
}
getCouponDesc(getCouponType());

},{"./coupons/newBabelAwardCollection":1}]},{},[2]);
