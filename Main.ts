import Coupon from "./interface/Coupon";
import Activity from "./interface/Activity";
import BabelAwardCollection from "./coupons/newBabelAwardCollection";
import Utils from "./utils/utils";
import WhiteCoupon from "./coupons/whtieCoupon";
import Purchase from "./coupons/purchase";
import ReceiveDayCoupon from "./coupons/receiveDayCoupon";
import SecKillCoupon from "./coupons/secKillCoupon";
import Mfreecoupon from "./coupons/mfreecoupon";
import CoinPurchase from "./coupons/coinPurchase";
import GcConvert from "./coupons/gcConvert";
import MonsterNian from "./activitys/MonsterNian";
import Config from "./config/config";
import BrandCitySpring from "./activitys/brandCitySpring";
enum couponType {
    none,
    receiveCoupons = "receiveCoupons",
    newBabelAwardCollection = "newBabelAwardCollection",
    whiteCoupon = "whiteCoupon",
    purchase = "purchase",
    receiveDayCoupon = "receiveDayCoupon",
    secKillCoupon = "secKillCoupon",
    mfreecoupon = "mfreecoupon",
    coinPurchase = "coinPurchase",
    GcConvert = "GcConvert",
}

enum activityType {
    none,
    monsterNian = "monsterNian",
    brandCitySpring = "brandCitySpring",
}

let coupon: Coupon,
    activity: Activity,
    startTime = 0,
    time;

const container: HTMLDivElement = document.createElement("div"),
    title: HTMLDivElement = document.createElement("div"),
    timerTittleDiv: HTMLDivElement = document.createElement("div"),
    receiveTextInput: HTMLInputElement = document.createElement("input"),
    receiveTimerBtn: HTMLButtonElement = document.createElement("button"),
    outputTextArea: HTMLTextAreaElement = document.createElement("textarea"),
    loginMsgDiv: HTMLDivElement = document.createElement("div");

let getLoginMsg = function (res: any) {
    if (res.base.nickname) {
        loginMsgDiv.innerHTML = "当前帐号：" + res.base.nickname;
    }
},
    krapnik = function (res: any) {
    };

Object.assign(window, { "getLoginMsg": getLoginMsg, "krapnik": krapnik, "Utils": Utils, "Config": Config });

function buildOperate() {
    const operateAreaDiv: HTMLDivElement = document.createElement("div");
    if (coupon) {
        const receiveDiv: HTMLDivElement = document.createElement("div"),
            receiveAreaDiv: HTMLDivElement = document.createElement("div"),
            receiveAllBtn: HTMLButtonElement = document.createElement("button"),
            timerTextInput: HTMLInputElement = document.createElement("input"),
            timerResetBtn: HTMLButtonElement = document.createElement("button"),
            timerDiv: HTMLDivElement = document.createElement("div");
        operateAreaDiv.setAttribute("style", "border: 1px solid #000;");
        operateAreaDiv.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin: 5px;padding: 0 37.5vw 5px;'>操作区</h3>";
        timerTextInput.type = "text";
        timerTextInput.placeholder = "请输入获取时间的刷新频率【毫秒】";
        timerTextInput.setAttribute("style", "width:80vw;height: 25px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;");
        timerResetBtn.innerHTML = "重置频率";
        timerResetBtn.setAttribute("style", "width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;");
        timerResetBtn.addEventListener("click", () => {
            const span = Math.trunc(+timerTextInput.value);
            if (!Config.intervalSpan) {
                alert("请检查输入的刷新频率是否有误！(只能为大于0的数字)");
                return false;
            }
            Config.intervalSpan = span;
            window.clearInterval(Config.intervalId);
            Config.intervalId = window.setInterval(getTime, Config.intervalSpan);
        });
        receiveTextInput.type = "text";
        receiveTextInput.placeholder = "定时领券时间【格式:13:59:59:950】";
        receiveTextInput.setAttribute("style", "width:80vw;height: 25px;border: solid 1px #000;border-radius: 5px;margin: 10px;");
        receiveTimerBtn.innerHTML = "定时指定领取";
        receiveTimerBtn.addEventListener("click", () => {
            const time = Utils.formateTime(receiveTextInput.value);
            if (!time || time < 0) {
                alert("请检查定时领券时间的格式是否有误！");
                return false;
            } else {
                Config.timingFlag = !Config.timingFlag;
                startTime = time;
                outputTextArea.style.display = "block";
                receiveTextInput.disabled = Config.timingFlag;
                if (Config.timingFlag) {
                    receiveTimerBtn.innerHTML = "取消指定领取";
                    Utils.outPutLog(outputTextArea, `已开启定时领取`);
                } else {
                    receiveTimerBtn.innerHTML = "定时指定领取";
                    Utils.outPutLog(outputTextArea, `已关闭定时领取`);
                }
            }

        });
        receiveAllBtn.addEventListener("click", () => {
            if (coupon) {
                coupon.send(outputTextArea);
            }
        });
        receiveTimerBtn.setAttribute("style", "width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px;");
        receiveAllBtn.innerHTML = "一键指定领取";
        receiveAllBtn.setAttribute("style", "width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px;");
        outputTextArea.setAttribute("style", "width: 90vw;height: 40vw;border: 1px solid #868686;border-radius: 10px;overflow-y: scroll;margin:5px auto;display:none");
        outputTextArea.setAttribute("disabled", "disabled");
        operateAreaDiv.append(timerDiv);
        timerDiv.append(timerTittleDiv);
        timerDiv.append(timerTextInput);
        timerDiv.append(timerResetBtn);
        operateAreaDiv.append(receiveDiv);
        receiveDiv.append(receiveTextInput);
        receiveDiv.append(receiveAreaDiv);
        receiveAreaDiv.append(receiveAllBtn);
        receiveAreaDiv.append(receiveTimerBtn);
    } else {
        outputTextArea.setAttribute("style", "width: 90vw;height: 40vw;border: 1px solid #868686;border-radius: 10px;overflow-y: scroll;margin:5px auto;");
        outputTextArea.setAttribute("disabled", "disabled");
    }
    loginMsgDiv.innerHTML = "当前帐号：未登录";
    operateAreaDiv.append(loginMsgDiv);
    container.append(operateAreaDiv);
    operateAreaDiv.append(outputTextArea);
}

function buildTips() {
    const tips = document.createElement('h4');
    tips.innerHTML = '<h4>页面地址暂未被扩展或者有误！</h4><p>本插件只能在指定活动地址或领券地址使用！</p><p>如果这是个活动地址或领券地址，可以<a href="tencent://message/?uin=708873725Menu=yes" target="_blank" title="发起QQ聊天">联系作者</a>扩展~</p>'
    title.append(tips);
}

function buildTitle() {
    const html: HTMLElement = document.querySelector('html') as HTMLElement;
    html.style.fontSize = "18px";
    document.body.innerHTML = "";
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.textAlign = "center";
    document.body.style.maxWidth = "100vw";
    container.setAttribute("style", "border: 1px solid #000;padding: 5px;margin: 5px;");
    title.innerHTML = `<h1 style="font-weight:700">${Config.title} ${Config.version}</h1>
                        <h3>author:${Config.author}</h3>
                        <div style="display: flex;flex-direction: row;justify-content: center;">
                        <iframe src="https://ghbtns.com/github-btn.html?user=krapnikkk&repo=JDCouponAssistant&type=star&count=true" frameborder="0" scrolling="0" width="90px" height="21px"></iframe>
                        <a href="tencent://message/?uin=708873725Menu=yes" target="_blank" title="发起QQ聊天"><img src="http://bizapp.qq.com/webimg/01_online.gif" alt="QQ" style="margin:0px;"></a>
                        </div>`;
    container.append(title);
    document.body.append(container);
}

function buildActivity() {
    const activityArea: HTMLDivElement = document.createElement("div");
    activityArea.setAttribute("style", "border: 1px solid #000;margin:10px");
    activityArea.innerHTML = `<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin: 5px;'>活动推荐</h3>
    <p style="color:red;font-weight:bold;"><a style="color:red" href="https://bunearth.m.jd.com/babelDiy/Zeus/4PWgqmrFHunn8C38mJA712fufguU/index.html#/wxhome" target="_blank">全民炸年兽</a></p>
    <p style="color:red;font-weight:bold;"><a style="color:red" href="https://bunearth.m.jd.com/babelDiy/Zeus/w6y8PYbzhgHJc8Lu1weihPReR2T/index.html#/home" target="_blank">十二生肖来送福</a></p>`;
    container.append(activityArea);
}

function buildRecommend() {
    const recommandArea: HTMLDivElement = document.createElement("div");
    recommandArea.setAttribute("style", "border: 1px solid #000;margin:10px");
    recommandArea.innerHTML = `<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin: 5px;'>好券推荐</h3>
    <p style="color:red;font-weight:bold;">
    <a style="color:red" href="https://m.jr.jd.com/member/9GcConvert/?channel=01-shouye-191214" target="_blank">9金币抢兑</a>
    </p>
    <p style="color:red;font-weight:bold;">
    <a style="color:red" href="https://coupon.m.jd.com/coupons/show.action?key=26ef0709795d4fb793d41e7a8b0acac2&roleId=26885907&to=https://shop.m.jd.com/?shopId=1000132921&sceneval=2&time=1577796913938" target="_blank">自营键鼠199-100</a>
    </p>
    <p style="color:red;font-weight:bold;">
    <a style="color:red" href="https://pro.m.jd.com/wq/active/FYXPxE3J9bnJ5LHvRMBNf4gJxMb/index.html" target="_blank">零食满99-88</a>
    </p>`;
    container.append(recommandArea);
}

function buildPromotion() {
    const promotionArea: HTMLDivElement = document.createElement("div");
    promotionArea.setAttribute("style", "border: 1px solid #000;margin:10px");
    promotionArea.innerHTML = `<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin: 5px;'>推广区</h3>
    <p style="color:red;font-weight:bold;"><a  style="color:red" href="http://krapnik.cn/project/jd/dayTask.html" target="_blank">每日京东红包汇总</a></p>`;
    container.append(promotionArea);
}

function buildUAarea() {
    let UATipsDiv: HTMLDivElement = document.createElement("div");
    UATipsDiv.innerHTML = `<div style="border: 1px solid #000;margin:10px"><h2>该活动需要设置user-Agent为京东APP</h2><p><a style="color:red" href="https://jingyan.baidu.com/article/20095761d41761cb0621b46f.html" target="_blank">点击查看教程</a></p><p>部分浏览器插件会覆盖UA设置，请自行排查并关闭</p><button style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block" onclick=Utils.copyText(Config.JDAppUA)>复制user-Agent</button></div>`;
    container.append(UATipsDiv);
}

function buildTimeoutArea() {
    let timeoutDiv: HTMLDivElement = document.createElement("div"),
        timeoutInput: HTMLInputElement = document.createElement("input");
    timeoutInput.setAttribute("style", "width:80vw;height: 25px;font-size:14px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;");
    timeoutInput.placeholder = "请输入任务的提交间隔时间【默认:1500毫秒】";
    timeoutDiv.innerHTML = `<p style="font-size:14px;">任务提交时间将会在设置提交间隔时间的基础上随机增加300~500毫秒</p>`;
    timeoutDiv.append(timeoutInput);
    timeoutInput.onchange = () => {
        if (Utils.isNumber(+timeoutInput!.value)) {
            Config.timeoutSpan = +timeoutInput!.value || 1500;
        }
    }
    container.append(timeoutDiv);
}

function getCouponType(): couponType | activityType {
    let type: couponType | activityType = couponType.none;
    if (!window.location.host.includes("jd.com")) {
        return type;
    }

    if ((window as any).__react_data__) {
        type = couponType.newBabelAwardCollection;
    } else if ((window as any).Queries) {
        type = couponType.whiteCoupon;
    } else if (Config.locationHref.includes('gcmall/index.html#/details?pid=')) {
        type = couponType.purchase;
    } else if (Config.locationHref.includes('member/gcmall/index.html#/details?gid')) {
        type = couponType.coinPurchase;
    } else if (Config.locationHref.includes("plus.m.jd.com/coupon/")) {
        type = couponType.receiveDayCoupon
    } else if (Config.locationHref.includes("9GcConvert")) {
        type = couponType.GcConvert
    } else if ((/babelDiy\/(\S*)\/index/).test(Config.locationHref)) {
        type = couponType.secKillCoupon
    } else if (/coupons\/show.action\?key=(\S*)&roleId=(\S*)/.test(Config.locationHref)) {
        type = couponType.mfreecoupon
    }
    if (Config.locationHref.includes("bunearth.m.jd.com")) {
        if (Config.locationHref.includes("4PWgqmrFHunn8C38mJA712fufguU")) {
            type = activityType.monsterNian;
        } else if (Config.locationHref.includes("w6y8PYbzhgHJc8Lu1weihPReR2T")) {
            type = activityType.brandCitySpring;
        }
    }
    return type;
}

function getCouponDesc(type: couponType | activityType) {
    buildTitle();
    buildPromotion();
    switch (type) {
        case couponType.none:
            break;
        case couponType.newBabelAwardCollection:
            const activityId = Config.locationHref.match(/active\/(\S*)\/index/)![1];
            coupon = new BabelAwardCollection({ "activityId": activityId }, container, outputTextArea);
            break;
        case couponType.whiteCoupon:
            const couponBusinessId = Utils.GetQueryString("couponBusinessId");
            coupon = new WhiteCoupon({ "couponBusinessId": couponBusinessId }, container, outputTextArea);
            break;
        case couponType.purchase:
            const pid = Utils.GetQueryString("pid");
            coupon = new Purchase({ "pid": pid }, container, outputTextArea);
            break;
        case couponType.coinPurchase:
            const gid = Utils.GetQueryString("gid");
            coupon = new CoinPurchase({ "pid": gid }, container, outputTextArea);
            break;
        case couponType.receiveDayCoupon:
            coupon = new ReceiveDayCoupon(null, container, outputTextArea);
            break;
        case couponType.secKillCoupon:
            coupon = new SecKillCoupon(null, container, outputTextArea);
            break;
        case couponType.GcConvert:
            coupon = new GcConvert(null, container, outputTextArea);
            break;
        case couponType.mfreecoupon:
            const roleId = Utils.GetQueryString("roleId"),
                key = Utils.GetQueryString("key");
            coupon = new Mfreecoupon({ "roleId": roleId, "key": key }, container, outputTextArea);
            break;
        case activityType.monsterNian:
            activity = new MonsterNian(null, container, outputTextArea);
            Config.UAFlag = true;
            break;
        case activityType.brandCitySpring:
            activity = new BrandCitySpring(null, container, outputTextArea);
        default:
            break;
    }
    if (Config.UAFlag) {
        buildUAarea();
    }
    if (coupon) {
        Config.intervalId = window.setInterval(getTime, Config.intervalSpan);
        buildOperate();
        coupon.get();
    } else if (activity) {
        buildOperate();
        buildTimeoutArea();
        buildActivity();
        activity.get();
    } else {
        Utils.loadCss("https://meyerweb.com/eric/tools/css/reset/reset200802.css");
        buildTips();
        buildRecommend();
        buildActivity();
    }
    Utils.createJsonp(`${Config.JDUserInfoURL}&callback=getLoginMsg`);

}

function getTime() {
    fetch(Config.JDTimeInfoURL)
        .then(function (response) { return response.json() })
        .then(function (res) {
            time = Utils.formatDate(res.time);
            Config.localeTime = new Date(+res.time).toLocaleString() + ":" + time.substr(-3, 3);
            timerTittleDiv.innerHTML = `京东时间：${Config.localeTime}<br/>当前获取时间的间隔频率：${Config.intervalSpan}毫秒`;
            if (Config.timingFlag) {
                if (startTime <= +time) {
                    Utils.outPutLog(outputTextArea, `定时领取开始！当前时间：${Config.localeTime}`);
                    Config.timingFlag = !Config.timingFlag;
                    if (coupon) {
                        coupon.send(outputTextArea);
                    }
                    receiveTextInput.disabled = Config.timingFlag;
                    receiveTimerBtn.innerHTML = "定时指定领取";
                    Utils.outPutLog(outputTextArea, `定时领取已结束！`);
                }
            }
        });
}

function copyRights() {
    console.clear();
    if (window.console) {
        console.group('%c京东领券助手', 'color:#009a61; font-size: 36px; font-weight: 400');
        console.log('%c本插件仅供学习交流使用\n作者:krapnik \ngithub:https://github.com/krapnikkk/JDCouponAssistant', 'color:#009a61');
        console.groupEnd();
    }
}

var _hmt: any = _hmt || [];
function statistical() {
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?d86d4ff3f6d089df2b41eb0735194c0d";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode!.insertBefore(hm, s);
    })();
}

getCouponDesc(getCouponType());
copyRights();
statistical();
