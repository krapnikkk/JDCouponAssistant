(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NewBabelAwardCollection {
    constructor(paramsObj, containerDiv) {
        this.url = "https://api.m.jd.com/client.action?functionId=newBabelAwardCollection";
        this.couponList = [];
        this.method = "POST";
        this.data = 'body={"activityId":"{activityId}","scene":{scene},"args":"{args}"}&client=wh5';
        this.paramsObj = paramsObj.activityId;
        this.container = containerDiv;
    }
    get() {
        this.couponList = [];
        const activityData = window.__react_data__.activityData.floorList;
        for (let i = 0; i < activityData.length; i++) {
            const item = activityData[i];
            if (item.template == "free_coupon" || item.template == "finance_coupon") {
                for (let j = 0; j < item.couponList.length; j++) {
                    const coupon = item.couponList[j], scene = coupon["scene"], args = coupon["args"] || coupon["cpId"], cid = coupon["jsonSrv"] ? JSON.parse(coupon["jsonSrv"])["cid"] : "", discount = coupon["discount"], picUrl = coupon["picUrl"] || coupon["picture"], status = coupon["status"], details = `${coupon["limit"]},${coupon["scope"]}`;
                    this.couponList.push({
                        "discount": discount,
                        "details": details,
                        "scene": scene,
                        "args": args,
                        "status": status,
                        "couponbatch": cid,
                        "picUrl": picUrl
                    });
                }
            }
        }
        this.list();
    }
    list() {
        const content = document.createElement("div");
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin: 5px;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'display:flex;flex-direction:row;padding:10px 0;border-bottom:1px solid #999');
            if (item.scene == "1") {
                itemDiv.innerHTML = `<img style="width:120px;height:100%;padding-right:10vw;" src="${item.picUrl}" />
                <div>
                    <p style="margin-bottom:10px">状态：${item.status == "0" ? "可领取" : item.status == "1" ? "已领取" : "已领光"}<br/>说明：${item.details}</p>
                    <button style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                        <a href='https://so.m.jd.com/list/couponSearch.action?couponbatch=${item.couponbatch}' target="_blank" style="color: #fff;text-decoration: none;">可用商品</a>
                    </button>
                    <button style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                        <a href='https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":"${this.paramsObj}","scene":${item.scene},"args":"${item.args}"}&client=wh5' target="_blank" style="color: #fff;text-decoration: none;">直接领取</a>
                    </button>
                </div>`;
            }
            else if (item.scene == "3") {
                itemDiv.innerHTML = `<img style="width:120px;height:100%;padding-right:10vw;" src="${item.picUrl}" />
                <div>
                <p style="margin-bottom:10px">状态：${item.status == "0" ? "可领取" : item.status == "1" ? "已领取" : "已领光"}</p>
                <button style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                    <a href='https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":"${this.paramsObj}","scene":${item.scene},"actKey":"${item.args}"}&client=wh5' target="_blank" style="color: #fff;text-decoration: none;">直接领取</a>
                </button>
                </div>`;
            }
            content.appendChild(itemDiv);
        }
        this.container.appendChild(content);
    }
    send(outputTextarea) {
        outputTextarea.style.display = "block";
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = "";
            if (item.scene == "1") {
                url = `https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":"${this.paramsObj}","scene":${item.scene},"args":"${item.args}"}&client=wh5`;
            }
            else if (item.scene == "3") {
                url = `https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":"${this.paramsObj}","scene":${item.scene},"actKey":"${item.args}"}&client=wh5`;
            }
            fetch(url, { credentials: "include" })
                .then((res) => { return res.json(); })
                .then((json) => {
                if (json.errmsg) {
                    outputTextarea.value = `第${i + 1}张 领券结果:${json.errmsg}\n` + outputTextarea.value;
                }
                else {
                    outputTextarea.value = `第${i + 1}张 领券结果:${json.subCodeMsg}\n` + outputTextarea.value;
                }
            });
        }
    }
}
exports.default = NewBabelAwardCollection;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newBabelAwardCollection_1 = require("./coupons/newBabelAwardCollection");
const utils_1 = require("./utils/utils");
var couponType;
(function (couponType) {
    couponType[couponType["none"] = 0] = "none";
    couponType[couponType["receiveCoupons"] = 1] = "receiveCoupons";
    couponType["newBabelAwardCollection"] = "newBabelAwardCollection";
})(couponType || (couponType = {}));
let coupon, url = window.location.href, couponFlag = false, startTime = 0;
const container = document.createElement("div"), title = document.createElement("div"), timerTittleDiv = document.createElement("div"), timerDiv = document.createElement("div"), timerTextInput = document.createElement("input"), timerResetBtn = document.createElement("button"), receiveDiv = document.createElement("div"), receiveTextInput = document.createElement("input"), receiveAreaDiv = document.createElement("div"), receiveAllBtn = document.createElement("button"), receiveTimerBtn = document.createElement("button"), outputTextArea = document.createElement("textarea"), operateAreaDiv = document.createElement("div");
document.body.innerHTML = "";
document.body.style.backgroundColor = "#ffffff";
document.body.style.textAlign = "center";
container.setAttribute("style", "border: 1px solid #000;padding: 5px;margin: 5px;");
title.innerHTML = `<h2>京东领券助手V0.1</h2>
                        <h3>author:krapnik</h3>
                        <div>
                        <iframe src="https://ghbtns.com/github-btn.html?user=krapnikkk&repo=JDCouponAssistant&type=star&count=true" frameborder="0" scrolling="0" width="80px" height="21px"></iframe>
                        <a href="tencent://message/?uin=708873725Menu=yes" target="_blank" title="发起QQ聊天"><img src="http://bizapp.qq.com/webimg/01_online.gif" alt="QQ" style="margin:0px;"></a>
                        </div>`;
operateAreaDiv.setAttribute("style", "border: 1px solid #000;");
operateAreaDiv.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin: 5px;padding: 0 37.5vw 5px;'>操作区</h3>";
timerTextInput.type = "text";
timerTextInput.placeholder = "请输入获取时间的刷新频率【毫秒】";
timerTextInput.setAttribute("style", "width:80vw;height: 25px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;");
timerResetBtn.innerHTML = "重置频率";
timerResetBtn.setAttribute("style", "width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;");
timerResetBtn.addEventListener("click", () => {
    const span = Math.trunc(+timerTextInput.value);
    if (!getTimeSpan) {
        alert("请检查输入的刷新频率是否有误！(只能为大于0的数字)");
        return false;
    }
    getTimeSpan = span;
    window.clearInterval(t1);
    t1 = window.setInterval(getTime, getTimeSpan);
});
receiveTextInput.type = "text";
receiveTextInput.placeholder = "定时领券时间【格式:9:59:59:950】";
receiveTextInput.setAttribute("style", "width:80vw;height: 25px;border: solid 1px #000;border-radius: 5px;margin: 10px;");
receiveTimerBtn.innerHTML = "定时全部领取";
receiveTimerBtn.addEventListener("click", () => {
    const time = utils_1.default.formateTime(receiveTextInput.value);
    if (!time || time < 0) {
        alert("请检查定时领券时间的格式是否有误！");
        return false;
    }
    else {
        couponFlag = !couponFlag;
        startTime = time;
        if (couponFlag) {
            receiveTimerBtn.innerHTML = "取消全部领取";
        }
        else {
            receiveTimerBtn.innerHTML = "定时全部领取";
        }
    }
});
receiveAllBtn.addEventListener("click", () => {
    if (coupon) {
        coupon.send(outputTextArea);
    }
});
receiveTimerBtn.setAttribute("style", "width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:10px;");
receiveAllBtn.innerHTML = "一键全部领取";
receiveAllBtn.setAttribute("style", "width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:10px;");
outputTextArea.setAttribute("style", "width: 90vw;height: 40vw;border: 1px solid #868686;border-radius: 10px;overflow-y: scroll;display:none");
outputTextArea.setAttribute("disabled", "disabled");
document.body.append(container);
container.append(title);
container.append(operateAreaDiv);
operateAreaDiv.append(timerDiv);
timerDiv.append(timerTittleDiv);
timerDiv.append(timerTextInput);
timerDiv.append(timerResetBtn);
operateAreaDiv.append(receiveDiv);
receiveDiv.append(receiveTextInput);
receiveDiv.append(receiveAreaDiv);
receiveAreaDiv.append(receiveAllBtn);
receiveAreaDiv.append(receiveTimerBtn);
operateAreaDiv.append(outputTextArea);
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
            coupon = new newBabelAwardCollection_1.default({ "activityId": args }, container);
            break;
        default:
            break;
    }
    coupon.get();
}
getCouponDesc(getCouponType());
let getTimeSpan = 500, t1 = window.setInterval(getTime, getTimeSpan), time, localeTime;
function getTime() {
    fetch('https://api.m.jd.com/client.action?functionId=babelActivityGetShareInfo&client=wh5')
        .then(function (response) { return response.json(); })
        .then(function (res) {
        time = utils_1.default.formatDate(res.time);
        localeTime = new Date(+res.time).toLocaleString() + "" + time.substr(-3, 3);
        timerTittleDiv.innerHTML = `京东时间：${localeTime}<br/>当前获取时间的间隔频率：${getTimeSpan}毫秒`;
        if (couponFlag) {
            if (startTime <= +time) {
                outputTextArea.value += `当前时间：${localeTime}\n`;
                couponFlag = !couponFlag;
                if (coupon) {
                    coupon.send(outputTextArea);
                }
            }
        }
    });
}
function copyRights() {
    console.clear();
    if (window.console) {
        console.group('%c京东领券助手', 'color:#009a61; font-size: 28px; font-weight: 200');
        console.log('%c本插件仅供学习交流使用\n作者:krapnik \ngithub:https://github.com/krapnikkk/JDCouponAssistant', 'color:#009a61');
        console.groupEnd();
    }
}
copyRights();
getTime();

},{"./coupons/newBabelAwardCollection":1,"./utils/utils":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static formateDate(date) {
        let dateObj = new Date(+date), hours = dateObj.getHours(), mins = dateObj.getMinutes(), secs = dateObj.getSeconds(), msecs = dateObj.getMilliseconds();
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (mins < 10) {
            mins = "0" + mins;
        }
        if (secs < 10) {
            secs = "0" + secs;
        }
        if (msecs < 10) {
            msecs = "00" + msecs;
        }
        else if (msecs < 100 && msecs >= 10) {
            msecs = "0" + msecs;
        }
        return hours + "" + mins + "" + secs + "" + msecs;
    }
    static obtainLocal(ck) {
        return ck.replace(/(?:(?:^|.*;\s*)3AB9D23F7A4B3C9B\s*=\s*([^;]*).*$)|^.*$/, "$1");
    }
    ;
    static getCookie() {
        return document.cookie;
    }
    static formatDate(date) {
        let dateObj = new Date(+date), hours = dateObj.getHours(), mins = dateObj.getMinutes(), secs = dateObj.getSeconds(), msecs = dateObj.getMilliseconds();
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (mins < 10) {
            mins = "0" + mins;
        }
        if (secs < 10) {
            secs = "0" + secs;
        }
        if (msecs < 10) {
            msecs = "00" + msecs;
        }
        else if (msecs < 100 && msecs >= 10) {
            msecs = "0" + msecs;
        }
        return hours + "" + mins + "" + secs + "" + msecs;
    }
    static GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return r[2];
        return "";
    }
    static formateTime(time) {
        return Math.trunc(+time.replace(/[:|：]+/ig, ""));
    }
}
exports.default = Utils;

},{}]},{},[2]);
