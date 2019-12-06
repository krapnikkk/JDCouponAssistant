import Coupon from "./interface/Coupon";
import BabelAwardCollection from "./coupons/newBabelAwardCollection";
import Utils from "./utils/utils";
import WhiteCoupon from "./coupons/whtieCoupon";
enum couponType {
    none,
    receiveCoupons,
    newBabelAwardCollection = "newBabelAwardCollection",
    whiteCoupon = "whiteCoupon",

}
let coupon: Coupon,
    url = window.location.href,
    couponFlag = false,
    startTime = 0,
    getTimeSpan = 500,
    t1 = window.setInterval(getTime, getTimeSpan),
    time,
    localeTime;

const container: HTMLDivElement = document.createElement("div"),
    title: HTMLDivElement = document.createElement("div"),
    timerTittleDiv: HTMLDivElement = document.createElement("div"),
    timerDiv: HTMLDivElement = document.createElement("div"),
    timerTextInput: HTMLInputElement = document.createElement("input"),
    timerResetBtn: HTMLButtonElement = document.createElement("button"),
    receiveDiv: HTMLDivElement = document.createElement("div"),
    receiveTextInput: HTMLInputElement = document.createElement("input"),
    receiveAreaDiv: HTMLDivElement = document.createElement("div"),
    receiveAllBtn: HTMLButtonElement = document.createElement("button"),
    receiveTimerBtn: HTMLButtonElement = document.createElement("button"),
    outputTextArea: HTMLTextAreaElement = document.createElement("textarea"),
    operateAreaDiv: HTMLDivElement = document.createElement("div"),
    loginMsgDiv: HTMLDivElement = document.createElement("div");

function buildHTML() {
    document.body.innerHTML = "";
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.textAlign = "center";
    container.setAttribute("style", "border: 1px solid #000;padding: 5px;margin: 5px;");
    title.innerHTML = `<h2>京东领券助手V0.1</h2>
                        <h3>author:krapnik</h3>
                        <div style="display: flex;flex-direction: row;justify-content: center;">
                        <iframe src="https://ghbtns.com/github-btn.html?user=krapnikkk&repo=JDCouponAssistant&type=star&count=true" frameborder="0" scrolling="0" width="80px" height="21px"></iframe>
                        <a href="tencent://message/?uin=708873725Menu=yes" target="_blank" title="发起QQ聊天"><img src="http://bizapp.qq.com/webimg/01_online.gif" alt="QQ" style="margin:0px;"></a>
                        </div>`;
    operateAreaDiv.setAttribute("style", "border: 1px solid #000;");
    operateAreaDiv.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin: 5px;padding: 0 37.5vw 5px;'>操作区</h3>";
    loginMsgDiv.innerHTML = "当前帐号：未登录";
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
        const time = Utils.formateTime(receiveTextInput.value);
        if (!time || time < 0) {
            alert("请检查定时领券时间的格式是否有误！");
            return false;
        } else {
            couponFlag = !couponFlag;
            startTime = time;
            receiveTextInput.disabled = couponFlag;
            if (couponFlag) {
                receiveTimerBtn.innerHTML = "取消全部领取";
            } else {
                receiveTimerBtn.innerHTML = "定时全部领取";
            }
        }

    });
    receiveAllBtn.addEventListener("click", () => {
        if (coupon) {
            coupon.send(outputTextArea);
        }
    });

    receiveTimerBtn.setAttribute("style", "width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px;");
    receiveAllBtn.innerHTML = "一键全部领取";

    receiveAllBtn.setAttribute("style", "width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px;");
    outputTextArea.setAttribute("style", "width: 90vw;height: 40vw;border: 1px solid #868686;border-radius: 10px;overflow-y: scroll;margin:5px auto;display:none");
    outputTextArea.setAttribute("disabled", "disabled");
    document.body.append(container);
    container.append(title);
    container.append(operateAreaDiv);
    operateAreaDiv.append(loginMsgDiv);
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
}

let getLoginMsg = function (res: any) {
    if (res.base.nickname) {
        loginMsgDiv.innerHTML = "当前帐号：" + res.base.nickname;
    }
};

Object.assign(window, { "getLoginMsg": getLoginMsg });

function getCouponType(): couponType {
    let type: couponType = couponType.none;
    if (!window.location.host.includes("jd.com")) {
        return type;
    }

    if ((window as any).__react_data__) {
        type = couponType.newBabelAwardCollection;
    } else if ((window as any).Queries) {
        type = couponType.whiteCoupon;
    }

    return type;
}

function getCouponDesc(type: couponType) {
    let args = {};
    switch (type) {
        case couponType.none:
            break;
        case couponType.newBabelAwardCollection:
            args = url.match(/active\/(\S*)\/index/)![1];
            coupon = new BabelAwardCollection({ "activityId": args }, container);
            break;
        case couponType.whiteCoupon:
            args = Utils.GetQueryString("couponBusinessId");
            coupon = new WhiteCoupon({ "couponBusinessId": args }, container);
            break;
        default:
            break;
    }
    if (coupon) {
        buildHTML();
        Utils.createJsonp('getLoginMsg');
        coupon.get();
    }

}

function getTime() {
    fetch('https://api.m.jd.com/client.action?functionId=babelActivityGetShareInfo&client=wh5')
        .then(function (response) { return response.json() })
        .then(function (res) {
            time = Utils.formatDate(res.time);
            localeTime = new Date(+res.time).toLocaleString() + ":" + time.substr(-3, 3);
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

getCouponDesc(getCouponType());
copyRights();



