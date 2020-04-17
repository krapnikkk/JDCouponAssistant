(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class feedBag {
    // shareLink: object = { "shareRandom": "1587146063292JtfbSwE6ct05RxB_AvGf5g", "shareId": "JtfbSwE6ct05RxB_AvGf5g" };
    constructor(params, containerDiv, outputTextarea) {
        this.rootURI = "https://ms.jr.jd.com/gw/generic/uc/h5/m/";
        this.baseReqData = { "channelLv": null, "source": "0", "riskDeviceParam": "{\"eid\":\"\",\"fp\":\"\",\"sdkToken\":\"\",\"token\":\"\",\"jstub\":\"\"}" };
        this.userTotalScore = 0;
        this.shareId = "";
        this.shareRandom = "";
        this.shareLink = { "shareRandom": "1587139212990lQpOJD2ANodhfTtc592rN8AdoUJQ3Dik", "shareId": "lQpOJD2ANodhfTtc592rN8AdoUJQ3Dik" };
        this.params = params;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        this.content = document.createElement("div");
    }
    get() {
        this.list();
    }
    list() {
        let msg = `
            <div>
                <button class="login1" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">查看金贴详情</button>
                <button class="getMainMission" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">每天主线任务</button>
                <button class="getMainMission1" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">每天支线任务</button>
                <button class="userFeedAction" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">投喂金贴</button>
                <button class="share" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">获取我的助力链接</button>
                <button class="help" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">给作者助力</button>
            </div>
        <div>`;
        this.content.innerHTML = msg;
        this.container.appendChild(this.content);
        const l = utils_1._$(".login1"), u = utils_1._$(".userFeedAction"), s = utils_1._$(".share"), h = utils_1._$(".help"), g = utils_1._$(".getMainMission");
        g.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, `每天主线任务`);
            this.getMainMission();
        }));
        u.addEventListener('click', () => {
            utils_1.default.outPutLog(this.outputTextarea, `投喂金贴`);
            this.userFeedAction();
        });
        l.addEventListener('click', () => {
            utils_1.default.outPutLog(this.outputTextarea, `查看金贴详情`);
            this.login1();
        });
        s.addEventListener('click', () => {
            alert("邀请链接每天都会变动！！");
            utils_1.default.copyText(`https://u.jr.jd.com/uc-fe-wxgrowing/feedbag/cover/channelLv=syfc/?channelLv=&sourceID=326&actflag=FE0AD3214D&isPay=N&shareId=${this.shareId}&shareRandom=${this.shareRandom}&jrcontainer=h5&jrlogin=true#/pages/home/index?id=2&type=test`);
        });
        h.addEventListener('click', () => {
            this.login1(this.shareLink);
        });
        this.login1();
    }
    login1(options = {}) {
        fetch(this.rootURI + "login1", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: options == {} ? "reqData=" + JSON.stringify(this.baseReqData) : "reqData=" + JSON.stringify(Object.assign(options, this.baseReqData))
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.code == "0") {
                    let { userGrade, currentLevelRewardName, upGradeFeedNum, userTotalScore, nowGradeFeedingNum, shareId, shareRandom, popupType, assistanceReward } = data.data;
                    this.userTotalScore = (userTotalScore > nowGradeFeedingNum) && nowGradeFeedingNum > 0 ? nowGradeFeedingNum : userTotalScore;
                    this.shareId = shareId;
                    this.shareRandom = shareRandom;
                    if (popupType.length > 0 && popupType[0] == 1) {
                        utils_1.default.outPutLog(this.outputTextarea, `谢谢你, 助力成功啦~ 获得金币:${assistanceReward}`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `等级:${userGrade} ${currentLevelRewardName} 可用金币:${userTotalScore} 当前进度:${nowGradeFeedingNum}/${upGradeFeedNum}`);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        });
    }
    getMainMission() {
        fetch(this.rootURI + "getMainMission", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.code == "0") {
                    let allMissionDone = data.data.allMissionDone;
                    if (allMissionDone) {
                        utils_1.default.outPutLog(this.outputTextarea, `当天的主线任务已经完成啦~`);
                    }
                    else {
                        let awrad = data.data.bigAwardList;
                        let { workName, prizeAmount, mid } = awrad;
                        utils_1.default.outPutLog(this.outputTextarea, `任务名称：${workName} 任务奖励：${prizeAmount}`);
                        this.setBrowserAward(mid, prizeAmount, workName);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        });
    }
    setBrowserAward(missionId, prizeAmount, workName) {
        fetch(this.rootURI + "setBrowserAward", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(Object.assign({ "missionId": missionId, "prizeAmount": prizeAmount, "channelType": 2 }, this.baseReqData))
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.code == "0") {
                    let opMsg = data.data.opMsg;
                    utils_1.default.outPutLog(this.outputTextarea, `任务名称：${workName} ${opMsg}`);
                    this.browserAwardInit();
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        });
    }
    browserAwardInit() {
        fetch(this.rootURI + "browserAwardInit", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.code == "0") {
                    let { awardNum, userScore, opMsg } = data.data;
                    utils_1.default.outPutLog(this.outputTextarea, `任务:${opMsg} 已获得金币:${awardNum} 可用金币:${userScore}`);
                    this.userTotalScore = userScore;
                    setTimeout(() => {
                        this.getMainMission();
                    }, 1000);
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        });
    }
    userFeedAction() {
        if (this.userTotalScore <= 0) {
            utils_1.default.outPutLog(this.outputTextarea, `可用金币不足！！`);
            return;
        }
        fetch(this.rootURI + "userFeedAction", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(Object.assign({ "userTotalScore": this.userTotalScore }, this.baseReqData))
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.code == "0") {
                    let { userGrade, currentLevelRewardName, upGradeFeedingNum, upGradeExtraReward, nowGradeFeedingNum } = data.data;
                    this.userTotalScore = upGradeExtraReward;
                    utils_1.default.outPutLog(this.outputTextarea, `等级:${userGrade} ${currentLevelRewardName} 可用金币:${upGradeExtraReward} 当前进度:${nowGradeFeedingNum}/${upGradeFeedingNum}`);
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        });
    }
}
exports.default = feedBag;

},{"../utils/utils":26}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
}
exports.default = Config;
Config.title = "京东领券助手";
Config.version = "v0.4.2";
Config.author = "krapnik";
Config.timingFlag = false;
Config.UAFlag = false;
Config.locationHref = window.location.href;
Config.postCount = 1;
Config.localeTime = "";
Config.serverTime = "";
Config.startTime = 0;
Config.intervalId = 0;
Config.intervalSpan = 500;
Config.postSpan = 500;
Config.timeoutSpan = 1500;
Config.JDAppUA = "jdapp;android;8.4.2;8.0.0;;network/wifi;model/Mi Note 2;osVer/26;appBuild/71043;psn/|7;psq/1;uid/;adk/;ads/;pap/JA2015_311210|8.4.2|ANDROID 8.0.0;osv/8.0.0;pv/2.23;jdv/;ref/com.jingdong.app.mall.WebActivity;partner/huawei;apprpd/Home_Main;Mozilla/5.0 (Linux; Android 8.0.0; Mi Note 2 Build/OPR1.170623.032; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/71.0.3578.99 Mobile Safari/537.36";
Config.JDUserInfoURL = "https://wq.jd.com/user/info/QueryJDUserInfo?sceneid=11110&sceneval=2&g_login_type=1";
Config.JDTimeInfoURL = "https://api.m.jd.com/client.action?functionId=babelActivityGetShareInfo&client=wh5";
Config.JDIMGSourcesURL = "https://img13.360buyimg.com/n1/s450x450_";
Config.NetdiskURL = "链接：https://pan.baidu.com/s/17eyRRSrFUQVSKdYwIcDsHg 提取码：jddk ";
Config.multiFlag = false;
Config.importFlag = false;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CookieHandler {
    static getCookie() {
        return document.cookie;
    }
    static getCookieObj(str) {
        if (!str) {
            alert('ck内容格式有误！');
            return;
        }
        var obj = {};
        var ca = str.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            var idx = c.indexOf("="), key = c.substring(0, idx), value = c.substring(idx + 1, c.length);
            obj[key] = value;
        }
        return obj;
    }
    static setCookie(cname, cvalue, domain = ".jd.com", path = "/") {
        var d = new Date();
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = `${cname}=${cvalue};${expires};domain=${domain};path=${path}`;
    }
    static clearAllCookie(domain = ".jd.com", path = "/") {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() + `;domain=${domain};path=${path}`;
        }
    }
    static coverCookie(item) {
        this.clearAllCookie();
        let ckObj = this.getCookieObj(item.ck);
        for (let key in ckObj) {
            let cname = key, cvalue = ckObj[key];
            this.setCookie(cname, cvalue);
        }
    }
}
exports.CookieHandler = CookieHandler;

},{}],4:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const config_1 = require("../config/config");
const fetch_jsonp_1 = require("../utils/fetch-jsonp");
const CookieHandler_1 = require("./CookieHandler");
class CookieManager {
    constructor(container) {
    }
    static parseCK(str) {
        try {
            this.cookieArr = this.splitCookies(str);
            if (this.cookieArr.length == 0) {
                alert("导入的文本文档格式内容有误或者读取识别！");
            }
            else {
                config_1.default.importFlag = true;
            }
        }
        catch (err) {
            console.log(err);
            alert("导入CK文本文档有误！");
        }
    }
    static splitCookies(ck) {
        const str = ck.split('\n');
        let o = [];
        str.map((item, index) => {
            let result = item.split('----');
            o.push({
                mark: result[0],
                ck: result[1],
                index: index,
                favoriteFood: "南瓜"
            });
        });
        return o;
    }
    static outPutLog(output) {
        if (this.cookieArr.length > 0) {
            let str = "";
            this.cookieArr.map((item) => {
                str += `\n【${item["mark"]}】导入成功!`;
            });
            utils_1.default.outPutLog(output, str);
        }
    }
    static checkLogin(output, ckObj) {
        return new Promise((resolve, reject) => {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                CookieHandler_1.CookieHandler.coverCookie(ckObj);
                yield fetch_jsonp_1.default.fetchJsonp(config_1.default.JDUserInfoURL).then(function (response) {
                    return response.json();
                }).then((res) => {
                    if (res.base.nickname) {
                        utils_1.default.outPutLog(output, `【${ckObj.mark}】:京东账号->${res.base.nickname}`);
                        resolve(true);
                    }
                    else {
                        utils_1.default.outPutLog(output, `【${ckObj.mark}】:该ck校验失败，请检查有效性!`);
                        resolve(false);
                    }
                });
            }), 500 * ckObj.index);
        });
    }
}
exports.default = CookieManager;
CookieManager.cookieArr = [];

},{"../config/config":2,"../utils/fetch-jsonp":25,"../utils/utils":26,"./CookieHandler":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class CoinPurchase {
    constructor(couponParams, containerDiv, outputTextarea) {
        this.url = "https://vip.jr.jd.com/goldcoin/purchase?id={pid}&callback=";
        this.detailurl = "https://vip.jr.jd.com/goldcoin/goods/{pid}?callback=";
        this.couponList = [];
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        window.addEventListener("message", this.jsonp.bind(this), false);
    }
    get() {
        let url = this.detailurl.replace("{pid}", this.couponParams.pid);
        utils_1.default.createJsonp(url, true);
    }
    jsonp(response) {
        console.log(response);
        const json = JSON.parse(response.data), data = json["data"];
        if (data) {
            this.couponList = [];
            if (json.success) {
                this.couponList.push({
                    pid: data.productId,
                    title: data.name,
                    detail: data.description,
                    imgUrl: data.imgUrl
                });
                this.list();
            }
            else {
                alert("请检查该页面优惠券的有效性！");
            }
        }
        else {
            utils_1.default.outPutLog(this.outputTextarea, `领券结果:${response.data}`);
        }
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'display:flex;flex-direction:row;padding:10px 0;border-bottom:1px solid #999');
            itemDiv.innerHTML = `<img style="width:120px;height:100%;margin-right:10vw;display: block;" src="${item.imgUrl}" />
                <div>
                    <h3 style="margin-bottom:10px">${item.title}</h3><p style="margin-bottom:10px">${item.detail}</p>
                    <button class="receive" style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                        <a style="color: #fff;text-decoration: none;">直接领取</a>
                    </button>
                </div>`;
            content.appendChild(itemDiv);
        }
        this.container.appendChild(content);
        utils_1._$('.receive').addEventListener('click', () => { this.send(); });
    }
    send() {
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = this.url.replace("{pid}", item.pid);
            utils_1.default.createJsonp(url, true);
        }
    }
}
exports.default = CoinPurchase;

},{"../utils/utils":26}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class Exchange {
    constructor(couponParams, containerDiv, outputTextarea) {
        this.url = "https://vip.m.jd.com/fuli/exchange.html";
        this.detailurl = "https://vip.m.jd.com/fuli/detail.html?itemId={itemId}";
        this.couponList = [];
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get() {
        this.couponList = [];
        let url = this.detailurl.replace("{itemId}", this.couponParams.itemId);
        fetch(url, { credentials: "include" })
            .then((res) => { return res.json(); })
            .then((json) => {
            if (json.success) {
                const data = json.result.fuliAct, actPriceScoreMap = data["actPriceScoreMap"], score = json.result.userInfo.userScore.score;
                let priceRuleId;
                for (let key in actPriceScoreMap) {
                    let price = key, priceArr = JSON.parse(price);
                    if (priceArr[0] < score && priceArr[1] > score) {
                        priceRuleId = actPriceScoreMap[key][0]["id"];
                        break;
                    }
                }
                this.couponList.push({
                    actId: this.couponParams["itemId"],
                    priceRuleId: priceRuleId,
                    groupId: data.actCodeGroups[0].id,
                    title: data.name,
                    detail: data.detail,
                });
                this.list();
            }
            else {
                alert("请检查该页面优惠券的有效性！");
            }
        });
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'padding:10px 0;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `<h4 style="user-select: none;pointer-events:none;">${item.title}</h4>
                                <p style="user-select: none;pointer-events:none;margin-bottom:10px">详情：${item.detail}</p>
                                <button data="coupon" style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;">直接领取</button>`;
            content.appendChild(itemDiv);
            itemDiv.addEventListener("click", (evt) => {
                const target = evt.target;
                if (target.getAttribute("data")) {
                    this.send();
                }
            });
        }
        this.container.appendChild(content);
    }
    send() {
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i];
            fetch(this.url, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `actId=${item.actId}&groupId=${item.groupId}&priceRuleId=${item.priceRuleId}&client=m`
            })
                .then((res) => { return res.json(); })
                .then((json) => {
                utils_1.default.outPutLog(this.outputTextarea, ` 领券结果：${JSON.stringify(json)}`);
            });
        }
    }
}
exports.default = Exchange;

},{"../utils/utils":26}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class GcConvert {
    constructor(couponParams, containerDiv, outputTextarea) {
        this.url = "https://vip.jr.jd.com/goldcoin/purchase?id={pid}&callback=";
        this.detailurl = "https://ms.jr.jd.com/gw/generic/hy/h5/m/gateFloorById?reqData={%22floorId%22:44,%22pageChannel%22:%22spike%22}";
        this.couponList = [];
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        window.addEventListener("message", this.jsonp.bind(this), false);
    }
    get() {
        fetch(this.detailurl, { credentials: "include" })
            .then((res) => { return res.json(); })
            .then((json) => {
            this.couponList = [];
            if (json.resultCode == 0) {
                const data = json["resultData"]["data"]["data"];
                for (let i = 0; i < data.length; i++) {
                    let coupon = data[i];
                    if (coupon) {
                        this.couponList.push({
                            pid: coupon.productId,
                            exchangeStatus: coupon.exchangeStatus == 3 ? "已抢光" : coupon.exchangeStatus == 2 ? "已领取" : "可领取",
                            detail: coupon.description,
                            startDate: new Date(coupon.startDate).toLocaleString(),
                            discountAmount: coupon.discountAmount,
                            imgUrl: coupon.imgUrl,
                            flag: false
                        });
                    }
                }
                this.list();
            }
            else {
                alert("请检查该页面优惠券的有效性！");
            }
        });
    }
    jsonp(response) {
        const json = JSON.parse(response.data), data = json["data"];
        utils_1.default.outPutLog(this.outputTextarea, `领券结果:${response.data}`);
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>请先点击列表项选择领取的券</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'display:flex;flex-direction:row;text-align:left;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `<img style="width:120px;height:100%;margin-right:10vw;display: block;" src="${item.imgUrl}" />
                <div>
                    <h3 style="margin-bottom:10px user-select: none;pointer-events:none;">${item.detail}</h3><p style="user-select: none;pointer-events:none;margin-bottom:10px">消耗金币：${item.discountAmount}<br>开始时间：${item.startDate}<br>状态：${item.exchangeStatus}</p>
                    <button class="receive" data-id=${i} style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                        <a style="color: #fff;text-decoration: none;user-select: none;pointer-events:none;">直接领取</a>
                    </button>
                </div>`;
            content.appendChild(itemDiv);
            itemDiv.addEventListener('click', (evt) => {
                const target = evt.target;
                if (target.getAttribute('data-item') || (target.parentNode == itemDiv && target.tagName != "BUTTON")) {
                    if (!item.flag) {
                        itemDiv.style.border = "3px solid red";
                    }
                    else {
                        itemDiv.style.border = "1px solid gray";
                    }
                    item.flag = !item.flag;
                }
                else if (target.getAttribute("data-id")) {
                    this.singleSend(+target.getAttribute("data-id"));
                }
            });
        }
        this.container.appendChild(content);
    }
    send() {
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = this.url.replace("{pid}", item.pid);
            if (item.flag) {
                utils_1.default.createJsonp(url, true);
            }
        }
    }
    singleSend(i) {
        let item = this.couponList[i], url = this.url.replace("{pid}", item.pid);
        utils_1.default.createJsonp(url, true);
    }
}
exports.default = GcConvert;

},{"../utils/utils":26}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const fetch_jsonp_1 = require("../utils/fetch-jsonp");
class getCouponCenter {
    constructor(couponParams, containerDiv, outputTextarea) {
        this.url = "https://s.m.jd.com/activemcenter/mcouponcenter/receivecoupon?coupon={actId},{ckey}&batchid={batchid}&sceneval=2&g_login_type=1";
        this.detailurl = "https://api.m.jd.com/client.action?functionId=getCcFeedInfo&clientVersion=8.4.6&client=android&uuid=869782023101754-c40bcb2a081c&st=1580274952976&sign=5e8edb6a1063a25d2a8d98b537974329&sv=120";
        this.couponList = [];
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get() {
        this.couponList = [];
        fetch(this.detailurl, {
            method: "POST",
            body: "body=" + encodeURIComponent(`{"categoryId":118,"childActivityUrl":"openapp.jdmobile://virtual?params={\\"category\\":\\"jump\\",\\"des\\":\\"couponCenter\\"}","eid":"eidA34d08122basezJhsrmQRRxmKprHoj2C/qsyYbh5TyzlV40H/a8UVc9Mwqf5fJ3ez02Ja/n0hNrG4CqlQNZ5J5VyfpzABj6gCzqhlaRbPfZI81+d1","monitorRefer":"appClient","monitorSource":"ccfeed_android_index_feed","pageClickKey":"Coupons_GetCenter","pageNum":1,"pageSize":20,"shshshfpb":"hJFvGjgPo+Yfm06tQPQBhVa8JMvNh0ofLojzHNpvuXWBm0H7FUSxeyfZMVsrL7YOK"}`),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((res) => { return res.json(); })
            .then((json) => {
            if (json.success) {
                const data = json["result"]["couponList"];
                for (let i = 0; i < data.length; i++) {
                    let coupon = data[i];
                    this.couponList.push({
                        ckey: coupon.ckey,
                        title: coupon.title,
                        quota: coupon.quota,
                        discount: coupon.discount,
                        actId: coupon.actId,
                        batchId: coupon["batchId"],
                        flag: false
                    });
                }
                this.list();
            }
            else {
                alert("请检查该页面优惠券的有效性！");
            }
        });
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>请先点击列表项选择领取的券<br>【接口数据来自APP端-为你推荐】</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', ';margin-top:5px;padding:10px 0;border:1px solid #999');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `
                    <p style="margin-bottom:10px">标题：${item.title}<br>详情：${item.quota}<br>折扣：${item.discount}<br></p>
                    <button  data-id=${i} style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0; color:#fff">直接领取</button>`;
            content.appendChild(itemDiv);
            itemDiv.addEventListener("click", (evt) => {
                const target = evt.target;
                if (target.getAttribute('data-item') || (target.parentNode == itemDiv && target.tagName != "BUTTON")) {
                    if (!item.flag) {
                        itemDiv.style.border = "3px solid red";
                    }
                    else {
                        itemDiv.style.border = "1px solid gray";
                    }
                    item.flag = !item.flag;
                }
                else if (target.getAttribute("data-id")) {
                    this.singleSend(+target.getAttribute("data-id"));
                }
            });
        }
        this.container.appendChild(content);
    }
    send() {
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = this.url.replace("{actId}", item.actId).replace("{ckey}", item.ckey).replace("{batchid}", item.batchId);
            if (item.flag) {
                fetch_jsonp_1.default.fetchJsonp(url).then(function (response) {
                    return response.json();
                }).then((res) => {
                    utils_1.default.outPutLog(this.outputTextarea, `领券结果:${JSON.stringify(res)}`);
                });
            }
        }
    }
    singleSend(i) {
        let item = this.couponList[i], url = this.url.replace("{actId}", item.actId).replace("{ckey}", item.ckey).replace("{batchid}", item.batchId);
        fetch_jsonp_1.default.fetchJsonp(url).then(function (response) {
            return response.json();
        }).then((res) => {
            utils_1.default.outPutLog(this.outputTextarea, `领券结果:${JSON.stringify(res)}`);
        });
    }
}
exports.default = getCouponCenter;

},{"../utils/fetch-jsonp":25,"../utils/utils":26}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class Mfreecoupon {
    constructor(couponParams, containerDiv, outputTextarea) {
        this.url = "https://s.m.jd.com/activemcenter/mfreecoupon/getcoupon?key={key}&roleId={roleId}";
        this.couponList = [];
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        window.getcoupon = this.jsonp.bind(this);
    }
    get() {
        this.couponList = [];
        let batchinfo = window._couponData.batchinfo, batchArr = [];
        for (let item in batchinfo) {
            if (batchArr && batchArr instanceof Array) {
                batchArr = batchinfo[item];
            }
        }
        for (let i = 0; i < batchArr.length; i++) {
            const coupon = batchArr[i], limitStr = coupon["limitStr"], discount = coupon["discount"], quota = coupon["quota"], constraintBeginTime = coupon["constraintBeginTime"], constraintEndTime = coupon["constraintEndTime"];
            this.couponList.push({
                "limitStr": limitStr,
                "discount": discount,
                "constraintEndTime": constraintEndTime,
                "constraintBeginTime": constraintBeginTime,
                "quota": quota,
                "flag": false
            });
        }
        this.list();
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>请先点击列表项选择领取的券</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'padding:10px 0;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `<h4 style="user-select: none;pointer-events:none;">${item.quota}-${item.discount}</h4>
                                <p style="user-select: none;pointer-events:none;margin-bottom:10px">范围：${item.limitStr}<br/>时间：${item.constraintBeginTime}-${item.constraintEndTime}</p>
                                <button data="coupon" style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;">直接领取</button>`;
            content.appendChild(itemDiv);
            itemDiv.addEventListener("click", (evt) => {
                const target = evt.target;
                if (target.getAttribute('data-item') || (target.parentNode == itemDiv && target.tagName != "BUTTON")) {
                    if (!item.flag) {
                        itemDiv.style.border = "3px solid red";
                    }
                    else {
                        itemDiv.style.border = "1px solid gray";
                    }
                    item.flag = !item.flag;
                }
                else if (target.getAttribute("data")) {
                    this.send();
                }
            });
        }
        this.container.appendChild(content);
    }
    send() {
        let url = this.url.replace("{key}", this.couponParams["key"]).replace("{roleId}", this.couponParams["roleId"]);
        utils_1.default.createJsonp(url, false);
    }
    jsonp(response) {
        utils_1.default.outPutLog(this.outputTextarea, `领券结果:${JSON.stringify(response)}`);
    }
}
exports.default = Mfreecoupon;

},{"../utils/utils":26}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class NewBabelAwardCollection {
    constructor(couponParams, containerDiv, outputTextarea) {
        this.url = "https://api.m.jd.com/client.action?functionId=newBabelAwardCollection";
        this.couponList = [];
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get() {
        this.couponList = [];
        const activityData = window.__react_data__.activityData.floorList;
        for (let i = 0; i < activityData.length; i++) {
            const item = activityData[i];
            if (item.template == "free_coupon" || item.template == "finance_coupon" || item.template == "combine_coupon") {
                for (let j = 0; j < item.couponList.length; j++) {
                    const coupon = item.couponList[j], scene = coupon["scene"], args = coupon["args"] || coupon["cpId"], cid = coupon["jsonSrv"] ? JSON.parse(coupon["jsonSrv"])["cid"] : "", discount = coupon["discount"], picUrl = coupon["picUrl"] || coupon["picture"], status = coupon["status"], details = `${coupon["limit"]},${coupon["scope"]}`;
                    this.couponList.push({
                        "discount": discount,
                        "details": details,
                        "scene": scene,
                        "args": args,
                        "status": status,
                        "couponbatch": cid,
                        "picUrl": picUrl,
                        "flag": false
                    });
                }
            }
        }
        this.list();
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>请先点击列表项选择领取的券</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'display:flex;flex-direction:row;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.setAttribute('data-item', "coupon");
            if (item.scene == "1") {
                itemDiv.innerHTML = `<img style="user-select: none;pointer-events:none;width:120px;height:100%;padding-right:10vw;display: block;" src="${item.picUrl}" />
                <div">
                    <p style="user-select: none;pointer-events:none;margin-bottom:10px">状态：${item.status == "0" ? "可领取" : item.status == "1" ? "已领取" : "已领光"}<br/>说明：${item.details}</p>
                    <button style="width: 100px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                        <a href='https://so.m.jd.com/list/couponSearch.action?couponbatch=${item.couponbatch}' target="_blank" style="color: #fff;text-decoration: none;">可用商品</a>
                    </button>
                    <button style="width: 100px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                        <a href='https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":"${this.couponParams.activityId}","scene":${item.scene},"args":"${item.args}"}&client=wh5' target="_blank" style="color: #fff;text-decoration: none;">提取链接</a>
                    </button>
                </div>`;
            }
            else if (item.scene == "3") {
                itemDiv.innerHTML = `<img style="user-select: none;pointer-events:none;width:120px;height:100%;padding-right:10vw;display: block;" src="${item.picUrl}" />
                <div">
                <p style="user-select: none;pointer-events:none;margin-bottom:10px">状态：${item.status == "0" ? "可领取" : item.status == "1" ? "已领取" : "已领光"}</p>
                <button style="width: 100px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                    <a href='https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":"${this.couponParams.activityId}","scene":${item.scene},"actKey":"${item.args}"}&client=wh5' target="_blank" style="color: #fff;text-decoration: none;">提取链接</a>
                </button>
                </div>`;
            }
            content.appendChild(itemDiv);
            itemDiv.addEventListener("click", (evt) => {
                const target = evt.target;
                if (target.getAttribute('data-item') || (target.parentNode == itemDiv && target.tagName != "BUTTON")) {
                    if (!item.flag) {
                        itemDiv.style.border = "3px solid red";
                    }
                    else {
                        itemDiv.style.border = "1px solid gray";
                    }
                    item.flag = !item.flag;
                }
            });
        }
        this.container.appendChild(content);
    }
    send() {
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = "";
            if (item.scene == "1") {
                url = `https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":"${this.couponParams.activityId}","scene":${item.scene},"args":"${item.args}"}&client=wh5`;
            }
            else if (item.scene == "3") {
                url = `https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":"${this.couponParams.activityId}","scene":${item.scene},"actKey":"${item.args}"}&client=wh5`;
            }
            if (item.flag) {
                fetch(url, { credentials: "include" })
                    .then((res) => { return res.json(); })
                    .then((json) => {
                    if (json.errmsg) {
                        utils_1.default.outPutLog(this.outputTextarea, `第${i + 1}张 领券结果:${json.errmsg}`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `第${i + 1}张 领券结果:${json.subCodeMsg}`);
                    }
                });
            }
        }
    }
}
exports.default = NewBabelAwardCollection;

},{"../utils/utils":26}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class Purchase {
    constructor(couponParams, containerDiv, outputTextarea) {
        this.url = "https://vip.jr.jd.com/goldcoin/purchase?id={pid}&callback=";
        this.detailurl = "https://vip.jr.jd.com/goldcoin/product/{pid}?callback=";
        this.couponList = [];
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        window.addEventListener("message", this.jsonp.bind(this), false);
    }
    get() {
        let url = this.detailurl.replace("{pid}", this.couponParams.pid);
        utils_1.default.createJsonp(url, true);
    }
    jsonp(response) {
        console.log(response);
        const json = JSON.parse(response.data), data = json["data"];
        if (data) {
            this.couponList = [];
            if (json.success) {
                this.couponList.push({
                    pid: data.productId,
                    title: data.name,
                    detail: data.description,
                    imgUrl: data.imgUrl
                });
                this.list();
            }
            else {
                alert("请检查该页面优惠券的有效性！");
            }
        }
        else {
            utils_1.default.outPutLog(this.outputTextarea, `领券结果:${response.data}`);
        }
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'display:flex;flex-direction:row;padding:10px 0;border-bottom:1px solid #999');
            itemDiv.innerHTML = `<img style="width:120px;height:100%;margin-right:10vw;display: block;" src="${item.imgUrl}" />
                <div>
                    <h3 style="margin-bottom:10px">${item.title}</h3><p style="margin-bottom:10px">${item.detail}</p>
                    <button class="receive" style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                        <a style="color: #fff;text-decoration: none;">直接领取</a>
                    </button>
                </div>`;
            content.appendChild(itemDiv);
        }
        this.container.appendChild(content);
        utils_1._$('.receive').addEventListener('click', () => { this.send(); });
    }
    send() {
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = this.url.replace("{pid}", item.pid);
            utils_1.default.createJsonp(url, true);
        }
    }
}
exports.default = Purchase;

},{"../utils/utils":26}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class ReceiveCoupon {
    constructor(couponParams, containerDiv, outputTextarea) {
        this.url = `https://ms.jr.jd.com/gw/generic/bt/h5/m/receiveCoupons?reqData=%7B%22couponKey%22:%22{couponKey}%22,%22eid%22:%22170.0.0.1%22,%22appId%22:%22btm%22%7D`;
        this.detailurl = "https://ms.jr.jd.com/gw/generic/bt/h5/m/queryBtmLimitedInfo";
        this.couponList = [];
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get() {
        this.couponList = [];
        fetch(this.detailurl, { credentials: "include" })
            .then((res) => { return res.json(); })
            .then((json) => {
            if (json.resultCode == 0) {
                const data = json["resultData"]["jtLimitedResults"];
                for (let i = 0; i < data.length; i++) {
                    const item = data[i]["floorInfo"];
                    for (let j = 0; j < item.length; j++) {
                        let coupon = item[j];
                        this.couponList.push({
                            couponKey: coupon.activeId,
                            title: coupon.text2,
                            detail: coupon.number,
                            couponStatus: coupon.couponStatus == 5 ? "已领光" : coupon.couponStatus == 1 ? "未开始" : "已领取",
                            time: coupon["time"],
                            flag: false
                        });
                    }
                }
                this.list();
            }
            else {
                alert("请检查该页面优惠券的有效性！");
            }
        });
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>请先点击列表项选择领取的券</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', ';margin-top:5px;padding:10px 0;border:1px solid #999');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `
                    <p style="margin-bottom:10px">类型：${item.title}<br>详情：${item.detail}<br>状态：${item.couponStatus}<br>开始时间：${item.time}</p>
                    <button  data-id=${i} style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0; color:#fff">直接领取</button>`;
            content.appendChild(itemDiv);
            itemDiv.addEventListener("click", (evt) => {
                const target = evt.target;
                if (target.getAttribute('data-item') || (target.parentNode == itemDiv && target.tagName != "BUTTON")) {
                    if (!item.flag) {
                        itemDiv.style.border = "3px solid red";
                    }
                    else {
                        itemDiv.style.border = "1px solid gray";
                    }
                    item.flag = !item.flag;
                }
                else if (target.getAttribute("data-id")) {
                    this.singleSend(+target.getAttribute("data-id"));
                }
            });
        }
        this.container.appendChild(content);
    }
    send() {
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = this.url.replace("{couponKey}", item["couponKey"]);
            if (item.flag) {
                fetch(url, { credentials: "include" })
                    .then((res) => { return res.json(); })
                    .then((json) => {
                    utils_1.default.outPutLog(this.outputTextarea, `领券结果:${JSON.stringify(json.resultData)}`);
                });
            }
        }
    }
    singleSend(index) {
        let item = this.couponList[index], url = this.url.replace("{couponKey}", item["couponKey"]);
        fetch(url, { credentials: "include" })
            .then((res) => { return res.json(); })
            .then((json) => {
            utils_1.default.outPutLog(this.outputTextarea, `领券结果:${JSON.stringify(json.resultData)}`);
        });
    }
}
exports.default = ReceiveCoupon;

},{"../utils/utils":26}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class ReceiveCoupons {
    constructor(couponParams, containerDiv, outputTextarea) {
        this.url = `https://ms.jr.jd.com/gw/generic/bt/h5/m/receiveCoupons?reqData={"couponKey":"{couponKey}","eid":"1"}}`;
        this.detailurl = "https://ms.jr.jd.com/gw/generic/bt/h5/m/queryLimitedInfo?callback=";
        this.couponList = [];
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        window.addEventListener("message", this.jsonp.bind(this), false);
    }
    get() {
        utils_1.default.createJsonp(this.detailurl, true);
    }
    jsonp(response) {
        // console.log(response.data);
        const json = JSON.parse(response.data), data = json["resultData"]["limitedResult"];
        if (data) {
            this.couponList = [];
            if (json.resultCode == 0) {
                for (let i = 0; i < data.length; i++) {
                    const item = data[i]["floorInfo"];
                    for (let j = 0; j < 3; j++) {
                        let coupon = item[j];
                        this.couponList.push({
                            couponKey: coupon.couponKey,
                            title: coupon.text1,
                            detail: coupon.number,
                            couponStatus: coupon.couponStatus == 5 ? "已领光" : coupon.couponStatus == 1 ? "未开始" : "已领取",
                            time: data[i]["time"],
                            flag: false
                        });
                    }
                }
                this.list();
            }
            else {
                alert("请检查该页面优惠券的有效性！");
            }
        }
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>请先点击列表项选择领取的券</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', ';margin-top:5px;padding:10px 0;border:1px solid #999');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `
                    <p style="margin-bottom:10px">类型：${item.title}<br>详情：${item.detail}<br>状态：${item.couponStatus}<br>开始时间：${item.time}</p>
                    <button  data-id=${i} style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0; color:#fff">直接领取</button>`;
            content.appendChild(itemDiv);
            itemDiv.addEventListener("click", (evt) => {
                const target = evt.target;
                if (target.getAttribute('data-item') || (target.parentNode == itemDiv && target.tagName != "BUTTON")) {
                    if (!item.flag) {
                        itemDiv.style.border = "3px solid red";
                    }
                    else {
                        itemDiv.style.border = "1px solid gray";
                    }
                    item.flag = !item.flag;
                }
                else if (target.getAttribute("data-id")) {
                    this.singleSend(+target.getAttribute("data-id"));
                }
            });
        }
        this.container.appendChild(content);
    }
    send() {
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = this.url.replace("{couponKey}", item["couponKey"]);
            if (item.flag) {
                fetch(url, { credentials: "include" })
                    .then((res) => { return res.json(); })
                    .then((json) => {
                    utils_1.default.outPutLog(this.outputTextarea, `领券结果:${JSON.stringify(json.resultData)}`);
                });
            }
        }
    }
    singleSend(index) {
        let item = this.couponList[index], url = this.url.replace("{couponKey}", item["couponKey"]);
        fetch(url, { credentials: "include" })
            .then((res) => { return res.json(); })
            .then((json) => {
            utils_1.default.outPutLog(this.outputTextarea, `领券结果:${JSON.stringify(json.resultData)}`);
        });
    }
}
exports.default = ReceiveCoupons;

},{"../utils/utils":26}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class ReceiveDayCoupon {
    constructor(couponParams, containerDiv, outputTextarea) {
        this.url = "https://rsp.jd.com/coupon/receiveDayCoupon/v1?locationCode=10002&lt=m&an=plus.mobile&getType=1&discount=10&couponKey=&platform=3&eventId=MPlusCoupon_Get&eid=&fp=&getType=1&activityId={activityId}";
        this.detailurl = "https://rsp.jd.com/coupon/dayCouponList/v1/?lt=m&an=plus.mobile&couponType=0_1";
        this.couponList = [];
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get() {
        this.couponList = [];
        fetch(this.detailurl, { credentials: "include" })
            .then(res => { return res.json(); })
            .then(json => {
            const data = json["rs"]["wholeCategoryCoupon"];
            for (let j = 0; j < data.length; j++) {
                let coupon = data[j], giftAmount = coupon["giftAmount"], discount = coupon["discount"], quota = coupon["quota"], couponState = coupon["couponState"], activityId = coupon["activtyId"], limitStr = coupon["limitStr"], hour = coupon["hour"];
                this.couponList.push({
                    "giftAmount": giftAmount,
                    "activityId": activityId,
                    "discount": discount,
                    "quota": quota,
                    "hour": hour,
                    "limitStr": limitStr,
                    "couponState": couponState,
                    "flag": false
                });
            }
            this.list();
        });
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>点击列表项选择要领取的券</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'text-align:left;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `<h3 style="user-select: none;pointer-events:none;">折扣：${item.quota}-${item.discount}</h3>
                                    <p style="margin-bottom:10px;user-select: none;pointer-events:none;">状态：${item.couponState == 1 ? "可领取" : item.couponState == 6 ? "已领光" : "不可领取"}<br/>说明：${item.limitStr}<br/>兑换礼金：${item.giftAmount}<br/>领取时间：${item.hour || "现在可领"}</p>
                                    <button class="receive" data-id=${i} style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;">直接领取</button>`;
            content.appendChild(itemDiv);
            itemDiv.addEventListener("click", (evt) => {
                const target = evt.target;
                if (target.getAttribute('data-item') || (target.parentNode == itemDiv && target.tagName != "BUTTON")) {
                    if (!item.flag) {
                        itemDiv.style.border = "3px solid red";
                    }
                    else {
                        itemDiv.style.border = "1px solid gray";
                    }
                    item.flag = !item.flag;
                }
                else if (target.getAttribute("data-id")) {
                    this.singleSend(+target.getAttribute("data-id"));
                }
            }, false);
        }
        this.container.appendChild(content);
    }
    send() {
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = this.url.replace("{activityId}", item["activityId"]);
            if (item.flag) {
                fetch(url, { credentials: "include" })
                    .then((res) => { return res.json(); })
                    .then((json) => {
                    utils_1.default.outPutLog(this.outputTextarea, `${item.quota}-${item.discount} 领券结果:${json.msg}`);
                });
            }
        }
    }
    singleSend(index) {
        let item = this.couponList[index], url = this.url.replace("{activityId}", item["activityId"]);
        fetch(url, { credentials: "include" })
            .then((res) => { return res.json(); })
            .then((json) => {
            utils_1.default.outPutLog(this.outputTextarea, `${item.quota}-${item.discount} 领券结果:${json.msg}`);
        });
    }
}
exports.default = ReceiveDayCoupon;

},{"../utils/utils":26}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class SecKillCoupon {
    constructor(couponParams, containerDiv, outputTextarea) {
        this.url = "https://api.m.jd.com/client.action?functionId=newBabelAwardCollection";
        this.detailurl = "https://api.m.jd.com/client.action?functionId=getBillionSubsidyInfo&body=%7B%22source%22:%22home_subsidy%22%7D&appid=XPMSGC2019";
        this.couponList = [];
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get() {
        this.couponList = [];
        fetch(this.detailurl, { credentials: "include" })
            .then(res => { return res.json(); })
            .then(json => {
            const data = json["data"]["hotFloor"]["resultList"];
            for (let j = 0; j < data.length; j++) {
                let coupon = data[j], name = coupon["name"], discount = coupon["disCount"], quota = coupon["quota"], skuImage = coupon["skuImage"], skuId = coupon["skuId"], time = coupon["time"], putKey = coupon["putKey"], batchId = coupon["batchId"];
                this.couponList.push({
                    "name": name,
                    "putKey": putKey,
                    "skuImage": skuImage,
                    "discount": discount,
                    "quota": quota,
                    "skuId": skuId,
                    "batchId": batchId,
                    "time": time,
                    "flag": false
                });
            }
            this.list();
        });
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>请先点击列表项选择领取的券</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'display:flex;flex-direction:row;padding:10px 0;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `<img style="user-select: none;pointer-events:none;width:120px;height:100%;padding-right:10vw;display: block;" src="${item.skuImage}" />
                                <div style="text-align: left">
                                <h4 style="user-select: none;pointer-events:none;">${item.name}</h4>
                                <p style="user-select: none;pointer-events:none;margin-bottom:10px">折扣：${item.quota}-${item.discount}<br/>下场时间：${item.time}</p>
                                <button  class="receive" data-id=${i} style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;">直接领取</button>
                                </div>`;
            content.appendChild(itemDiv);
            itemDiv.addEventListener("click", (evt) => {
                const target = evt.target;
                if (target.getAttribute('data-item') || (target.parentNode == itemDiv && target.tagName != "BUTTON")) {
                    if (!item.flag) {
                        itemDiv.style.border = "3px solid red";
                    }
                    else {
                        itemDiv.style.border = "1px solid gray";
                    }
                    item.flag = !item.flag;
                }
                else if (target.getAttribute("data-id")) {
                    this.singleSend(+target.getAttribute("data-id"));
                }
            });
        }
        this.container.appendChild(content);
    }
    send() {
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i];
            if (item.flag) {
                const url = `https://api.m.jd.com/client.action?functionId=receiveSeckillCoupon&body=%7B"roleId"%3A"${encodeURIComponent(item["putKey"])}"%2C"source"%3A"home_subsidy"%2C"floorType"%3A0%2C"skuId"%3A"${item.skuId}"%2C"quota"%3A"${item.quota}"%2C"disCount"%3A"${item.discount}"%2C"batchId"%3A"${item.batchId}"%7D&client=m&appid=XPMSGC2019`;
                fetch(url, { method: "POST", mode: "cors", credentials: "include", headers: { "Content-Type": "application/x-www-form-urlencoded" } })
                    .then((res) => { return res.json(); })
                    .then((json) => {
                    utils_1.default.outPutLog(this.outputTextarea, `${item.quota}-${item.discount} 领券结果:${json.resultMsg}`);
                });
            }
        }
    }
    singleSend(index) {
        let item = this.couponList[index], url = `https://api.m.jd.com/client.action?functionId=receiveSeckillCoupon&body=%7B"roleId"%3A"${encodeURIComponent(item["putKey"])}"%2C"source"%3A"home_subsidy"%2C"floorType"%3A0%2C"skuId"%3A"${item.skuId}"%2C"quota"%3A"${item.quota}"%2C"disCount"%3A"${item.discount}"%2C"batchId"%3A"${item.batchId}"%7D&client=m&appid=XPMSGC2019`;
        fetch(url, { method: "POST", mode: "cors", credentials: "include", headers: { "Content-Type": "application/x-www-form-urlencoded" } })
            .then((res) => { return res.json(); })
            .then((json) => {
            utils_1.default.outPutLog(this.outputTextarea, `${item.quota}-${item.discount} 领券结果:${json.resultMsg}`);
        });
    }
}
exports.default = SecKillCoupon;

},{"../utils/utils":26}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class WhiteCoupon {
    constructor(couponParams, containerDiv, outputTextarea) {
        this.url = "https://opencredit.jd.com/act/get/coupon?couponBusinessId={couponBusinessId}&actId=004";
        this.detailurl = "https://opencredit.jd.com/act/get/couponInfo?couponBusinessId={couponBusinessId}";
        this.couponList = [];
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get() {
        this.couponList = [];
        let url = this.detailurl.replace("{couponBusinessId}", this.couponParams.couponBusinessId);
        fetch(url)
            .then((res) => { return res.json(); })
            .then((json) => {
            const data = JSON.parse(json["data"])["baiCouponInfo"];
            if (json.isSuccess) {
                this.couponList.push({
                    couponBusinessId: JSON.parse(json["data"])["baiCouponDetailsNext"].couponBusinessId,
                    platform: data.platform,
                    title: data.title,
                    detail: data.detail,
                });
                this.list();
            }
            else {
                alert("请检查该页面优惠券的有效性！");
            }
        });
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>默认领取单张券，无须选定</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'padding:10px 0;border-bottom:1px solid #999');
            itemDiv.innerHTML = `<h3>${item.title}</h3><p>${item.detail}</p><p>可用范围：${item.platform}</p>
                                <button style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                                    <a href='http://opencredit.jd.com/act/get/coupon?couponBusinessId=${item.couponBusinessId}&actId=004' target="_blank" style="color: #fff;text-decoration: none;">直接领取</a>
                                </button>`;
            content.appendChild(itemDiv);
        }
        this.container.appendChild(content);
    }
    send() {
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = this.url.replace("{couponBusinessId}", item.couponBusinessId);
            fetch(url)
                .then((res) => { return res.json(); })
                .then((json) => {
                if (json.isSuccess) {
                    utils_1.default.outPutLog(this.outputTextarea, `第${i + 1}张 领券结果:领取成功！}`);
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `第${i + 1}张 领券结果:领取失败！`);
                }
            });
        }
    }
}
exports.default = WhiteCoupon;

},{"../utils/utils":26}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var activityType;
(function (activityType) {
    activityType[activityType["none"] = 0] = "none";
    activityType["monsterNian"] = "monsterNian";
    activityType["brandCitySpring"] = "brandCitySpring";
    activityType["palace"] = "palace";
    activityType["receiveBless"] = "ReceiveBless";
    activityType["feedBag"] = "feedBag";
})(activityType = exports.activityType || (exports.activityType = {}));

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var couponType;
(function (couponType) {
    couponType[couponType["none"] = 0] = "none";
    couponType["receiveCoupons"] = "receiveCoupons";
    couponType["newBabelAwardCollection"] = "newBabelAwardCollection";
    couponType["whiteCoupon"] = "whiteCoupon";
    couponType["purchase"] = "purchase";
    couponType["receiveDayCoupon"] = "receiveDayCoupon";
    couponType["secKillCoupon"] = "secKillCoupon";
    couponType["mfreecoupon"] = "mfreecoupon";
    couponType["coinPurchase"] = "coinPurchase";
    couponType["GcConvert"] = "GcConvert";
    couponType["ReceiveCoupons"] = "ReceiveCoupons";
    couponType["ReceiveCoupon"] = "ReceiveCoupon";
    couponType["getCouponCenter"] = "getCouponCenter";
    couponType["exchange"] = "exchange";
})(couponType = exports.couponType || (exports.couponType = {}));

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var goodsType;
(function (goodsType) {
    goodsType["goods"] = "goods";
})(goodsType = exports.goodsType || (exports.goodsType = {}));

},{}],20:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const config_1 = require("../config/config");
const CookieHandler_1 = require("../cookie/CookieHandler");
const CookieManager_1 = require("../cookie/CookieManager");
class BTGoose {
    constructor(params, containerDiv, outputTextarea) {
        this.rootURI = "https://ms.jr.jd.com/gw/generic/uc/h5/m/";
        this.baseReqData = { "timeSign": 0, "environment": "jrApp", "riskDeviceInfo": "{}" };
        this.data = [];
        this.timer = 1000;
        this.taskToken = "";
        this.toWithdrawSpan = 1800000;
        this.autoToWithdrawTimer = 0;
        this.params = params;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        this.content = document.createElement("div");
    }
    get() {
        // this.login();
        this.list();
    }
    list() {
        let msg = `
            <div>
                <button class="toDailyHome" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">查看详情</button>
                <button class="toWithdraw" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">提鹅收蛋</button>
            </div>
        <p>自动收蛋间隔：<select class="toWithdrawSpan" name="toWithdrawSpan" style="border: 1px solid #333;padding: 2px;">
            <option value ="1800000">30分钟</option>
            <option value ="3600000">60分钟</option>
            <option value ="5400000">90分钟</option>
        </select>
        </p>
        <button class="autoToWithdraw" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">自动定时收蛋</button>
        <button class="cancelautoToWithdraw" style="display:none;width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">取消定时收蛋</button>
        <button class="toGoldExchange" style="display:display;width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">兑换金币</button>
        <div>`;
        this.content.innerHTML = msg;
        this.container.appendChild(this.content);
        const d = utils_1._$(".toDailyHome"), g = utils_1._$(".toGoldExchange"), autoToWithdraw = utils_1._$(".autoToWithdraw"), cancelautoToWithdraw = utils_1._$(".cancelautoToWithdraw"), t = utils_1._$(".toWithdraw");
        t.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, `开始提鹅收蛋`);
            if (config_1.default.multiFlag) {
                this.toWithdrawMulti();
            }
            else {
                this.toWithdraw();
            }
        }));
        d.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, `开始查看鹅鹅详情`);
            if (config_1.default.multiFlag) {
                this.homeMulti();
            }
            else {
                this.home();
            }
        }));
        g.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, `开始兑换金币`);
            if (config_1.default.multiFlag) {
                this.toGoldExchangeMulti();
            }
            else {
                this.toGoldExchange();
            }
        }));
        autoToWithdraw.addEventListener("click", () => {
            autoToWithdraw.style.display = "none";
            cancelautoToWithdraw.style.display = "block";
            utils_1.default.outPutLog(this.outputTextarea, `自动定时收蛋已开启！`);
            this.autoToWithdrawTimer = window.setInterval(() => {
                utils_1.default.outPutLog(this.outputTextarea, `自动定时收蛋任务开启！`);
                t.click();
            }, this.toWithdrawSpan);
        });
        cancelautoToWithdraw.addEventListener('click', () => {
            autoToWithdraw.style.display = "block";
            cancelautoToWithdraw.style.display = "none";
            utils_1.default.outPutLog(this.outputTextarea, `自动定时收蛋已关闭！`);
            window.clearInterval(this.autoToWithdrawTimer);
        });
    }
    toWithdraw(ckObj) {
        fetch(this.rootURI + "toWithdraw", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.code == "0000") {
                    let eggTotal = data.data.eggTotal;
                    if (config_1.default.multiFlag && ckObj) {
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 收蛋成功！当前鹅蛋数量：${eggTotal}`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `收蛋成功！当前鹅蛋数量：${eggTotal}`);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        });
    }
    toWithdrawMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.toWithdraw(item);
            }, item.index * 750);
        });
    }
    home(ckObj) {
        fetch(this.rootURI + "toDailyHome", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData.data;
                let { shareUuid, grassEggTotal, basketSize, availableTotal } = data;
                if (config_1.default.multiFlag && ckObj) {
                    utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 可兑换：${availableTotal} 未收取：${grassEggTotal} 可容纳：${basketSize} `);
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, ` 可兑换：${availableTotal} 未收取：${grassEggTotal} 可容纳：${basketSize} `);
                }
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        });
    }
    homeMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.home(item);
            }, item.index * 500);
        });
    }
    toGoldExchange(ckObj) {
        fetch(this.rootURI + "toGoldExchange", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                if (res.resultData.code == "0000") {
                    let data = res.resultData.data;
                    let { cnumber, rate, goldTotal } = data;
                    if (config_1.default.multiFlag && ckObj) {
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 已兑换:${cnumber} 比例：${rate} 总金币：${goldTotal}`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `已兑换:${cnumber} 比例：${rate} 总金币：${goldTotal}`);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultData.msg}`);
                }
            }
            else {
                if (config_1.default.multiFlag && ckObj) {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        });
    }
    toGoldExchangeMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.toGoldExchange(item);
            }, item.index * 500);
        });
    }
}
exports.default = BTGoose;

},{"../config/config":2,"../cookie/CookieHandler":3,"../cookie/CookieManager":4,"../utils/utils":26}],21:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const config_1 = require("../config/config");
const CookieHandler_1 = require("../cookie/CookieHandler");
const CookieManager_1 = require("../cookie/CookieManager");
class Cloudpig {
    constructor(params, containerDiv, outputTextarea) {
        this.rootURI = "https://ms.jr.jd.com/gw/generic/uc/h5/m/";
        this.baseReqData = { "source": 0, "channelLV": "yqs", "riskDeviceParam": "{}" };
        // baseReqData: Object = { "source": 0, "channelLV": "yqs", "riskDeviceParam": "{\"fp\":\"\",\"eid\":\"\",\"sdkToken\":\"\",\"sid\":\"\"}" };
        // {"source":0,"skuId":"1001003004","channelLV":"yqs","riskDeviceParam":"{\"eid\":\"\",\"fp\":\"\",\"token\":\"\"}"}
        this.detailurl = "https://api.m.jd.com/client.action?functionId=bombnian_getTaskDetail";
        this.data = [];
        this.timer = 1000;
        this.taskToken = "";
        this.favFoodMap = { "南瓜": "1001003004", "胡萝卜": "1001003002", "白菜": "1001003001", "普通猪粮": "1001003003" };
        this.openBoxFlag = false;
        this.foodskuId = "1001003004";
        this.foodSpan = 1800000;
        this.autoAddFoodTimer = 0;
        this.signNo = 1;
        this.favoriteFood = "";
        this.params = params;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        this.content = document.createElement("div");
    }
    get() {
        // this.login();
        this.list();
    }
    list() {
        let msg = `
        <div><button class="Login" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">查看猪猪详情</button>
        <button class="Achievements" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">可提现红包</button>
        </div>
        <div>
        <button class="SignOne" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">一键每日签到</button>
        <button class="OpenBox" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">一键开箱子</button>
        </div>
        <button class="UserBag" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">查看食物背包</button>
        <p>喂养食物:<select class="food" name="food" style="border: 1px solid #333;padding: 2px;">
            <option value ="1001003003">普通猪粮</option>
            <option value ="1001003001">白菜</option>
            <option value="1001003002">胡萝卜</option>
            <option value="1001003004">南瓜</option>
        </select>
        </p>
        <button class="AddFood" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">喂养食物</button>
        <button class="AddFavoriteFood" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:none">喂养喜爱食物</button>
        <p>自动喂养间隔：<select class="foodSpan" name="foodSpan" style="border: 1px solid #333;padding: 2px;">
            <option value ="1800000">30分钟</option>
            <option value ="3600000">60分钟</option>
            <option value ="5400000">90分钟</option>
        </select>
        </p>
        <button class="AutoAddFood" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">自动定时喂养</button>
        <button class="cancelAutoAddFood" style="display:none;width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">取消定时喂养</button>
        <div>
        <button class="pigPetLotteryIndex" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto">大转盘情况</button>
        <button class="LotteryPlay" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto">一键大转盘</button>
        </div>`;
        this.content.innerHTML = msg;
        this.container.appendChild(this.content);
        const o = utils_1._$('.OpenBox'), lotteryIndex = utils_1._$('.pigPetLotteryIndex'), achievements = utils_1._$('.Achievements'), foodSelect = utils_1._$('.food'), foodSpanSelect = utils_1._$('.foodSpan'), lotteryPlay = utils_1._$('.LotteryPlay'), autoAddFood = utils_1._$('.AutoAddFood'), cancelAutoAddFood = utils_1._$('.cancelAutoAddFood'), a = utils_1._$('.AddFood'), signOne = utils_1._$('.SignOne'), UserBag = utils_1._$('.UserBag'), l = utils_1._$('.Login');
        this.AddFavoriteFood = utils_1._$('.AddFavoriteFood');
        foodSelect.onchange = (event) => {
            this.foodskuId = foodSelect.value;
        };
        foodSpanSelect.onchange = (event) => {
            this.foodSpan = +foodSpanSelect.value;
        };
        UserBag.addEventListener("click", () => {
            utils_1.default.outPutLog(this.outputTextarea, `查看我的背包`);
            if (config_1.default.multiFlag) {
                this.userBagMulti();
            }
            else {
                this.userBag();
            }
        });
        signOne.addEventListener("click", () => {
            utils_1.default.outPutLog(this.outputTextarea, `开始每日签到`);
            if (config_1.default.multiFlag) {
                this.signIndexMulti();
            }
            else {
                this.signIndex();
            }
        });
        lotteryIndex.addEventListener("click", () => {
            utils_1.default.outPutLog(this.outputTextarea, `开始查看当天大转盘记录`);
            if (config_1.default.multiFlag) {
                this.lotteryIndexMulti();
            }
            else {
                this.lotteryIndex();
            }
        });
        achievements.addEventListener("click", () => {
            utils_1.default.outPutLog(this.outputTextarea, `开始查看待提现红包`);
            if (config_1.default.multiFlag) {
                this.achievementsMulti();
            }
            else {
                this.achievements();
            }
        });
        a.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, `开始喂养猪猪`);
            if (config_1.default.multiFlag) {
                this.addFoodMulti();
            }
            else {
                this.addFood();
            }
        }));
        this.AddFavoriteFood.addEventListener("click", () => {
            utils_1.default.outPutLog(this.outputTextarea, `开始喂养喜爱食物给猪猪`);
            if (config_1.default.multiFlag) {
                this.addFoodMulti(true);
            }
            else {
                this.addFood(true);
            }
        });
        o.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.openBoxFlag = true;
            utils_1.default.outPutLog(this.outputTextarea, `开始一键开箱子`);
            if (config_1.default.multiFlag) {
                CookieManager_1.default.cookieArr.map((item) => {
                    item["flag"] = true;
                });
            }
            do {
                if (config_1.default.multiFlag) {
                    yield this.openBoxMulti("pigPetOpenBox");
                    if (CookieManager_1.default.cookieArr.every((i) => {
                        return !i["flag"];
                    })) {
                        this.openBoxFlag = false;
                        utils_1.default.outPutLog(this.outputTextarea, `所有账号今天已经木有开盒子机会了~`);
                    }
                }
                else {
                    yield this.openBox("pigPetOpenBox");
                }
            } while (this.openBoxFlag);
        }));
        l.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, `开始查看猪猪详情`);
            if (config_1.default.multiFlag) {
                this.loginMulti();
            }
            else {
                this.login();
            }
        }));
        autoAddFood.addEventListener("click", () => {
            autoAddFood.style.display = "none";
            cancelAutoAddFood.style.display = "block";
            utils_1.default.outPutLog(this.outputTextarea, `自动定时喂养已开启！`);
            this.autoAddFoodTimer = window.setInterval(() => {
                utils_1.default.outPutLog(this.outputTextarea, `自动定时喂养任务开启！`);
                a.click();
            }, this.foodSpan);
        });
        cancelAutoAddFood.addEventListener('click', () => {
            autoAddFood.style.display = "block";
            cancelAutoAddFood.style.display = "none";
            utils_1.default.outPutLog(this.outputTextarea, `自动定时喂养已关闭！`);
            window.clearInterval(this.autoAddFoodTimer);
        });
        lotteryPlay.addEventListener('click', () => {
            utils_1.default.outPutLog(this.outputTextarea, `开始大转盘抽奖`);
            if (config_1.default.multiFlag) {
                this.lotteryPlayMulti();
            }
            else {
                this.lotteryPlay();
            }
        });
    }
    lotteryPlay(ckObj) {
        fetch(this.rootURI + "pigPetLotteryPlay", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.resultCode == 0) {
                    let award = data.resultData.award;
                    if (award) {
                        let name = award.name, count = award.count;
                        if (config_1.default.multiFlag && ckObj) {
                            utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 获得【${name} * ${count}】！`);
                        }
                        else {
                            utils_1.default.outPutLog(this.outputTextarea, `获得【${name} * ${count}】！`);
                        }
                    }
                    else {
                        if (config_1.default.multiFlag && ckObj) {
                            utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 什么也木有抽到~`);
                        }
                        else {
                            utils_1.default.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                        }
                    }
                }
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        });
    }
    lotteryPlayMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.lotteryPlay(item);
            }, item.index * 750);
        });
    }
    openBoxMulti(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(CookieManager_1.default.cookieArr.map((item) => __awaiter(this, void 0, void 0, function* () {
                yield new Promise(resolve => {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        CookieHandler_1.CookieHandler.coverCookie(item);
                        if (!item["flag"]) {
                            resolve();
                            return;
                        }
                        else {
                            yield fetch(`${this.rootURI}${url}`, {
                                method: "POST",
                                mode: "cors",
                                credentials: "include",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                body: "reqData=" + JSON.stringify(Object.assign(this.baseReqData, { "t": utils_1.default.getTimestamp() }))
                            }).then(function (response) {
                                return response.json();
                            }).then((res) => {
                                var _a, _b, _c, _d;
                                if (res.resultCode == 0) {
                                    let resultCode = res.resultData.resultCode;
                                    if (resultCode == 0) {
                                        let result = res.resultData.resultData;
                                        utils_1.default.outPutLog(this.outputTextarea, `【${item["mark"]}】:获得【"${((_b = (_a = result) === null || _a === void 0 ? void 0 : _a.award) === null || _b === void 0 ? void 0 : _b.name) ? (_d = (_c = result) === null || _c === void 0 ? void 0 : _c.award) === null || _d === void 0 ? void 0 : _d.name : "空箱子"}】`);
                                    }
                                    else if (resultCode == 420) {
                                        item["flag"] = false;
                                        utils_1.default.outPutLog(this.outputTextarea, `【${item["mark"]}】:今天已经木有开盒子机会了~`);
                                    }
                                }
                                else {
                                    utils_1.default.outPutLog(this.outputTextarea, `【${item["mark"]}】:${res.resultMsg}`);
                                }
                                resolve();
                            });
                        }
                    }), (config_1.default.timeoutSpan + utils_1.default.random(300, 500)));
                });
            })));
        });
    }
    openBox(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield fetch(`${this.rootURI}${url}`, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "reqData=" + JSON.stringify(Object.assign(this.baseReqData, { "t": utils_1.default.getTimestamp() }))
                    }).then(function (response) {
                        return response.json();
                    }).then((res) => {
                        var _a, _b, _c, _d;
                        if (res.resultCode == 0) {
                            if (res.resultData.resultCode == 0) {
                                let result = res.resultData.resultData;
                                utils_1.default.outPutLog(this.outputTextarea, `${((_b = (_a = result) === null || _a === void 0 ? void 0 : _a.award) === null || _b === void 0 ? void 0 : _b.name) ? "获得:" + ((_d = (_c = result) === null || _c === void 0 ? void 0 : _c.award) === null || _d === void 0 ? void 0 : _d.name) : "这是个空箱子"}`);
                            }
                            else {
                                this.openBoxFlag = !this.openBoxFlag;
                                utils_1.default.outPutLog(this.outputTextarea, `今天已经木有开盒子机会了~`);
                            }
                        }
                        else {
                            utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                        }
                        resolve();
                    });
                }), (config_1.default.timeoutSpan + utils_1.default.random(300, 500)));
            });
        });
    }
    addFood(favBool = false, ckObj) {
        let skuId = ckObj ? favBool ? ckObj.favoriteFood : this.foodskuId : favBool ? this.favFoodMap[this.favoriteFood] : this.foodskuId;
        fetch(this.rootURI + "pigPetAddFood", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(Object.assign(this.baseReqData, { "skuId": skuId }))
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.resultCode == 0) {
                    if (config_1.default.multiFlag && ckObj) {
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 喂养成功！`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `喂养成功！`);
                    }
                }
                else if (data.resultCode == 406) {
                    if (config_1.default.multiFlag && ckObj) {
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 猪猪现在还有粮食哦~`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                    }
                }
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        });
    }
    addFoodMulti(favBool = false) {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.addFood(favBool, item);
            }, item.index * 750);
        });
    }
    login(ckObj) {
        fetch(this.rootURI + "pigPetLogin", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            var _a, _b, _c;
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (data.hasPig) {
                    this.AddFavoriteFood.style.display = "block";
                    let pig = (_b = (_a = data) === null || _a === void 0 ? void 0 : _a.cote) === null || _b === void 0 ? void 0 : _b.pig, pigName = (_c = pig) === null || _c === void 0 ? void 0 : _c.pigName, percent = pig.percent, weight = pig.weight, favFood = pig.favFood;
                    if (config_1.default.multiFlag && ckObj) {
                        ckObj.favoriteFood = this.favFoodMap[favFood];
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 猪猪：${pigName} 价值：${percent}% 体重：${weight} 喜欢：${favFood}`);
                    }
                    else {
                        this.favoriteFood = favFood;
                        utils_1.default.outPutLog(this.outputTextarea, `猪猪：${pigName} 价值：${percent}% 体重：${weight} 喜欢：${favFood}`);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `该账号尚未领养猪猪哦！`);
                }
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        });
    }
    loginMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.login(item);
            }, item.index * 500);
        });
    }
    achievements(ckObj) {
        fetch(this.rootURI + "pigPetAchievements", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            var _a, _b;
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (res.resultData.resultCode == 0) {
                    let currentCash = (_a = data) === null || _a === void 0 ? void 0 : _a.currentCash, limitCash = (_b = data) === null || _b === void 0 ? void 0 : _b.limitCash;
                    if (config_1.default.multiFlag && ckObj) {
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 待提现红包：${currentCash / 100}元 满${limitCash / 100}元提现`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `待提现红包：${currentCash / 100}元 满${limitCash}元提现`);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                }
            }
            else {
                if (config_1.default.multiFlag && ckObj) {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        });
    }
    achievementsMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.achievements(item);
            }, item.index * 500);
        });
    }
    lotteryIndex(ckObj) {
        fetch(this.rootURI + "pigPetLotteryIndex", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            var _a, _b, _c, _d;
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (res.resultData.resultCode == 0) {
                    let currentCount = (_a = data) === null || _a === void 0 ? void 0 : _a.currentCount, coinCount = (_b = data) === null || _b === void 0 ? void 0 : _b.coinCount, price = (_c = data) === null || _c === void 0 ? void 0 : _c.price, nextFreeTime = (_d = data) === null || _d === void 0 ? void 0 : _d.nextFreeTime;
                    if (config_1.default.multiFlag && ckObj) {
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 当前可抽奖次数：${currentCount} 距下一次免费抽奖时间：${nextFreeTime}毫秒 金币抽奖次数：${coinCount} 需花费金币：${price}`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `当前可抽奖次数：${currentCount} 距下一次免费抽奖时间：${nextFreeTime}毫秒 金币抽奖次数：${coinCount} 需花费金币：${price}`);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                }
            }
            else {
                if (config_1.default.multiFlag && ckObj) {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        });
    }
    lotteryIndexMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.lotteryIndex(item);
            }, item.index * 500);
        });
    }
    signOne(ckObj) {
        fetch(this.rootURI + "pigPetSignOne?_=" + utils_1.default.getTimestamp(), {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(Object.assign(this.baseReqData, { "no": ckObj ? ckObj.signNo : this.signNo }))
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            var _a, _b, _c;
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (res.resultData.resultCode == 0) {
                    let today = (_a = data) === null || _a === void 0 ? void 0 : _a.today, name = (_c = (_b = data) === null || _b === void 0 ? void 0 : _b.award) === null || _c === void 0 ? void 0 : _c.name;
                    if (config_1.default.multiFlag && ckObj) {
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 已签到${today}天 获得奖励：${name}`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `已签到${today}天 获得奖励：${name}`);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                }
            }
            else {
                if (config_1.default.multiFlag && ckObj) {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        });
    }
    // signOneMulti() {
    //     CookieManager.cookieArr.map((item: CookieType) => {
    //         setTimeout(() => {
    //             CookieHandler.coverCookie(item);
    //             this.signOne(item);
    //         }, item.index * 500)
    //     });
    // }
    signIndex(ckObj) {
        fetch(this.rootURI + "pigPetSignIndex?_=" + utils_1.default.getTimestamp(), {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            var _a;
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (res.resultData.resultCode == 0) {
                    let today = (_a = data) === null || _a === void 0 ? void 0 : _a.today;
                    if (config_1.default.multiFlag && ckObj) {
                        ckObj.signNo = today;
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 已签到${today}天 `);
                        this.signOne(ckObj);
                    }
                    else {
                        this.signNo = today;
                        utils_1.default.outPutLog(this.outputTextarea, `已签到${today}天`);
                        this.signOne();
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                }
            }
            else {
                if (config_1.default.multiFlag && ckObj) {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        });
    }
    signIndexMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.signIndex(item);
            }, item.index * 500);
        });
    }
    userBag(ckObj) {
        fetch(this.rootURI + "pigPetUserBag?_=" + utils_1.default.getTimestamp(), {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(Object.assign(this.baseReqData, { "category": "1001" }))
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            var _a;
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (res.resultData.resultCode == 0) {
                    let goods = (_a = data) === null || _a === void 0 ? void 0 : _a.goods, goodStr = "";
                    if (config_1.default.multiFlag && ckObj) {
                        goodStr += goods.map((good) => {
                            return `\n名称:${good.goodsName} 数量：${good.count}g`;
                        });
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 ----食物背包一览----${goodStr}`);
                    }
                    else {
                        goodStr += goods.map((good) => {
                            return `\n名称:${good.goodsName} 数量：${good.count}g`;
                        });
                        utils_1.default.outPutLog(this.outputTextarea, `----食物背包一览----${goodStr}`);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                }
            }
            else {
                if (config_1.default.multiFlag && ckObj) {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        });
    }
    userBagMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.userBag(item);
            }, item.index * 500);
        });
    }
}
exports.default = Cloudpig;

},{"../config/config":2,"../cookie/CookieHandler":3,"../cookie/CookieManager":4,"../utils/utils":26}],22:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const config_1 = require("../config/config");
const CookieHandler_1 = require("../cookie/CookieHandler");
const CookieManager_1 = require("../cookie/CookieManager");
class MoneyTree {
    constructor(params, containerDiv, outputTextarea) {
        this.rootURI = "https://ms.jr.jd.com/gw/generic/uc/h5/m/";
        this.baseReqData = { "sharePin": "", "shareType": 1, "source": 2, "riskDeviceInfo": "{}" };
        // baseReqData: Object = { "source": 0, "channelLV": "yqs", "riskDeviceParam": "{\"fp\":\"\",\"eid\":\"\",\"sdkToken\":\"\",\"sid\":\"\"}" };
        // {"source":0,"skuId":"1001003004","channelLV":"yqs","riskDeviceParam":"{\"eid\":\"\",\"fp\":\"\",\"token\":\"\"}"}
        this.data = [];
        this.timer = 1000;
        this.taskToken = "";
        this.openBoxFlag = false;
        this.foodskuId = "1001003004";
        this.harvestSpan = 1800000;
        this.autoToWithdrawTimer = 0;
        this.signNo = 1;
        this.favoriteFood = "";
        this.params = params;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        this.content = document.createElement("div");
    }
    get() {
        this.list();
    }
    list() {
        let msg = `
            <div>
                <button class="login" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">查看详情</button>
                <button class="harvest" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">一键收金果</button>
            </div>
        <p>自动收蛋间隔：<select class="harvestSpan" name="harvestSpan" style="border: 1px solid #333;padding: 2px;">
            <option value ="1800000">30分钟</option>
            <option value ="3600000">60分钟</option>
            <option value ="5400000">90分钟</option>
        </select>
        </p>
        <button class="autoToWithdraw" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">自动定时收蛋</button>
        <button class="cancelautoToWithdraw" style="display:none;width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">取消定时收蛋</button>
        <button class="toGoldExchange" style="display:display;width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">兑换金币</button>
        <div>`;
        this.content.innerHTML = msg;
        this.container.appendChild(this.content);
        const d = utils_1._$(".login"), g = utils_1._$(".toGoldExchange"), autoToWithdraw = utils_1._$(".autoToWithdraw"), cancelautoToWithdraw = utils_1._$(".cancelautoToWithdraw"), t = utils_1._$(".harvest");
        t.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, `开始收取金果`);
            if (config_1.default.multiFlag) {
                this.harvestMulti();
            }
            else {
                this.harvest();
            }
        }));
        d.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, `开始查看金果树详情`);
            if (config_1.default.multiFlag) {
                this.homeMulti();
            }
            else {
                this.home();
            }
        }));
        g.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, `开始兑换金币`);
            if (config_1.default.multiFlag) {
                this.toGoldExchangeMulti();
            }
            else {
                this.toGoldExchange();
            }
        }));
        autoToWithdraw.addEventListener("click", () => {
            autoToWithdraw.style.display = "none";
            cancelautoToWithdraw.style.display = "block";
            utils_1.default.outPutLog(this.outputTextarea, `自动定时收蛋已开启！`);
            this.autoToWithdrawTimer = window.setInterval(() => {
                utils_1.default.outPutLog(this.outputTextarea, `自动定时收蛋任务开启！`);
                t.click();
            }, this.harvestSpan);
        });
        cancelautoToWithdraw.addEventListener('click', () => {
            autoToWithdraw.style.display = "block";
            cancelautoToWithdraw.style.display = "none";
            utils_1.default.outPutLog(this.outputTextarea, `自动定时收蛋已关闭！`);
            window.clearInterval(this.autoToWithdrawTimer);
        });
    }
    harvest(ckObj) {
        fetch(this.rootURI + "harvest", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.code == "0000") {
                    let eggTotal = data.data.eggTotal;
                    if (config_1.default.multiFlag && ckObj) {
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 收蛋成功！当前鹅蛋数量：${eggTotal}`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `收蛋成功！当前鹅蛋数量：${eggTotal}`);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        });
    }
    harvestMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.harvest(item);
            }, item.index * 750);
        });
    }
    home(ckObj) {
        fetch(this.rootURI + "login", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData.data;
                let { sharePin, treeInfo, firstLogin } = data;
                if (firstLogin) {
                    //首次登录
                }
                else {
                    if (config_1.default.multiFlag && ckObj) {
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 等级：${treeInfo.level} 升级还差：${treeInfo.progressLeft}% 可兑换：${treeInfo.fruit} 未收取：${treeInfo.fruitOnTree}`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, ` 等级：${treeInfo.level} 升级还差：${treeInfo.progressLeft}% 可兑换：${treeInfo.fruit} 未收取：${treeInfo.fruitOnTree}`);
                    }
                }
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        });
    }
    homeMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.home(item);
            }, item.index * 500);
        });
    }
    toGoldExchange(ckObj) {
        fetch(this.rootURI + "toGoldExchange", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                if (res.resultData.code == "0000") {
                    let data = res.resultData.data;
                    let { cnumber, rate, goldTotal } = data;
                    if (config_1.default.multiFlag && ckObj) {
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 已兑换:${cnumber} 比例：${rate} 总金币：${goldTotal}`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `已兑换:${cnumber} 比例：${rate} 总金币：${goldTotal}`);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultData.msg}`);
                }
            }
            else {
                if (config_1.default.multiFlag && ckObj) {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        });
    }
    toGoldExchangeMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.toGoldExchange(item);
            }, item.index * 500);
        });
    }
    lotteryIndex(ckObj) {
        fetch(this.rootURI + "pigPetLotteryIndex", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            var _a, _b, _c, _d;
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (res.resultData.resultCode == 0) {
                    let currentCount = (_a = data) === null || _a === void 0 ? void 0 : _a.currentCount, coinCount = (_b = data) === null || _b === void 0 ? void 0 : _b.coinCount, price = (_c = data) === null || _c === void 0 ? void 0 : _c.price, nextFreeTime = (_d = data) === null || _d === void 0 ? void 0 : _d.nextFreeTime;
                    if (config_1.default.multiFlag && ckObj) {
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 当前可抽奖次数：${currentCount} 距下一次免费抽奖时间：${nextFreeTime}毫秒 金币抽奖次数：${coinCount} 需花费金币：${price}`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `当前可抽奖次数：${currentCount} 距下一次免费抽奖时间：${nextFreeTime}毫秒 金币抽奖次数：${coinCount} 需花费金币：${price}`);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                }
            }
            else {
                if (config_1.default.multiFlag && ckObj) {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        });
    }
    lotteryIndexMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.lotteryIndex(item);
            }, item.index * 500);
        });
    }
    signOne(ckObj) {
        fetch(this.rootURI + "pigPetSignOne?_=" + utils_1.default.getTimestamp(), {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(Object.assign(this.baseReqData, { "no": ckObj ? ckObj.signNo : this.signNo }))
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            var _a, _b, _c;
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (res.resultData.resultCode == 0) {
                    let today = (_a = data) === null || _a === void 0 ? void 0 : _a.today, name = (_c = (_b = data) === null || _b === void 0 ? void 0 : _b.award) === null || _c === void 0 ? void 0 : _c.name;
                    if (config_1.default.multiFlag && ckObj) {
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 已签到${today}天 获得奖励：${name}`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `已签到${today}天 获得奖励：${name}`);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                }
            }
            else {
                if (config_1.default.multiFlag && ckObj) {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        });
    }
    // signOneMulti() {
    //     CookieManager.cookieArr.map((item: CookieType) => {
    //         setTimeout(() => {
    //             CookieHandler.coverCookie(item);
    //             this.signOne(item);
    //         }, item.index * 500)
    //     });
    // }
    signIndex(ckObj) {
        fetch(this.rootURI + "pigPetSignIndex?_=" + utils_1.default.getTimestamp(), {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            var _a;
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (res.resultData.resultCode == 0) {
                    let today = (_a = data) === null || _a === void 0 ? void 0 : _a.today;
                    if (config_1.default.multiFlag && ckObj) {
                        ckObj.signNo = today;
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 已签到${today}天 `);
                        this.signOne(ckObj);
                    }
                    else {
                        this.signNo = today;
                        utils_1.default.outPutLog(this.outputTextarea, `已签到${today}天`);
                        this.signOne();
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                }
            }
            else {
                if (config_1.default.multiFlag && ckObj) {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        });
    }
    signIndexMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.signIndex(item);
            }, item.index * 500);
        });
    }
    userBag(ckObj) {
        fetch(this.rootURI + "pigPetUserBag?_=" + utils_1.default.getTimestamp(), {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(Object.assign(this.baseReqData, { "category": "1001" }))
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            var _a;
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (res.resultData.resultCode == 0) {
                    let goods = (_a = data) === null || _a === void 0 ? void 0 : _a.goods, goodStr = "";
                    if (config_1.default.multiFlag && ckObj) {
                        goodStr += goods.map((good) => {
                            return `\n名称:${good.goodsName} 数量：${good.count}g`;
                        });
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 ----食物背包一览----${goodStr}`);
                    }
                    else {
                        goodStr += goods.map((good) => {
                            return `\n名称:${good.goodsName} 数量：${good.count}g`;
                        });
                        utils_1.default.outPutLog(this.outputTextarea, `----食物背包一览----${goodStr}`);
                    }
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                }
            }
            else {
                if (config_1.default.multiFlag && ckObj) {
                    utils_1.default.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        });
    }
    userBagMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.userBag(item);
            }, item.index * 500);
        });
    }
}
exports.default = MoneyTree;

},{"../config/config":2,"../cookie/CookieHandler":3,"../cookie/CookieManager":4,"../utils/utils":26}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const config_1 = require("../config/config");
const fetch_jsonp_1 = require("../utils/fetch-jsonp");
class Goods {
    constructor(containerDiv, outputTextarea, goodsId) {
        this.areaId = "1_72_0_0"; //北京 朝阳区
        this.areaIdArr = [{ id: "1_72_0_0", dec: "北京 朝阳区" }];
        this.goodsIdArr = [];
        this.goodsMsgArr = [];
        this.detailURL = "https://item.jd.com/{skuid}.html";
        this.stockURL = "https://c0.3.cn/stock?skuId={skuId}&area={area}&venderId={venderId}&cat={cat}";
        if (goodsId) {
            this.goodsIdArr.push(goodsId);
        }
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        //获取默认地址
        fetch_jsonp_1.default.fetchJsonp('https://cd.jd.com/usual/address').then((res) => { return res.json(); }).then((json) => {
            if (Object.keys(json).length !== 0) {
                this.areaIdArr = [];
                Object.keys(json).map((key, idx) => {
                    let item = json[key];
                    let id = `${item.provinceId}_${item.cityId}_${item.countyId ? item.countyId : 0}_${item.townId ? item.townId : 0}`, dec = item.areaName;
                    if (idx == 0) {
                        this.areaId = id;
                    }
                    this.areaIdArr.push({
                        id: id,
                        dec: dec
                    });
                });
            }
        });
    }
    get() {
        this.goodsMsgArr = [];
        Promise.all(this.goodsIdArr.map((item) => { return this.getMsg(item); })).then((data) => {
            this.goodsMsgArr = data;
            Promise.all(this.goodsMsgArr.map((item) => {
                return this.getStock(item);
            })).then((goods) => {
                this.goodsMsgArr = goods;
                this.list();
            });
        });
    }
    getMsg(skuid) {
        let url = this.detailURL.replace("{skuid}", skuid);
        return new Promise((resolve, reject) => {
            utils_1.default.loadiFrame(url)
                .then((iframe) => {
                let window = iframe.contentWindow, product = window.pageConfig.product, goods = {
                    skuid: skuid,
                    name: product.name,
                    src: product.src,
                    cat: product.cat,
                    venderId: product.venderId,
                };
                document.body.removeChild(iframe);
                resolve(goods);
            });
        });
    }
    getStock(goods) {
        let url = this.stockURL.replace("{skuId}", goods.skuid).replace("{venderId}", goods.venderId).replace("{cat}", goods.cat).replace("{area}", this.areaId);
        return new Promise((resolve, reject) => {
            fetch_jsonp_1.default.fetchJsonp(url).then(function (response) {
                return response.json();
            }).then((res) => {
                let stock = res.stock, area = stock.area;
                goods.stockState = stock.StockStateName;
                goods.area = `${area.provinceName}-${area.cityName}-${area.countyName}`;
                resolve(goods);
            });
        });
    }
    push() {
        let id = "1";
        this.goodsIdArr.push(id);
    }
    list() {
        const content = document.createElement("div");
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.goodsMsgArr.length; i++) {
            const item = this.goodsMsgArr[i], itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'display:flex;flex-direction:row;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.innerHTML = `<img style="user-select: none;pointer-events:none;width:120px;height:120px;display: block;" src="${config_1.default.JDIMGSourcesURL}${item.src}" />
            <div">
                <h2 width="60vw">商品名称：${item.name}</h2>
                <p style="font-weight:700;margin-bottom:10px">状态：<span style="color:red">${item.stockState}</span>
                <br>地区：<span style="color:red">${item.area}</span></p>
                <button style="width: 100px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                    <a href='https://skunotify.jd.com/storenotify.html?skuId=${item.skuid}' target="_blank" style="color: #fff;text-decoration: none;">预约自动下单</a>
                </button>
                <button style="width: 100px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                    <a href='//cart.jd.com/gate.action?pid=${item.skuid}&pcount=1&ptype=1' target="_blank" style="color: #fff;text-decoration: none;">加入购物车</a>
                </button>
                <br>
                <button style="width: 100px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                    <a href='https://p.m.jd.com/norder/order.action?wareId=${item.skuid}&wareNum=1&enterOrder=true' target="_blank" style="color: #fff;text-decoration: none;">订单结算</a>
                </button>
            </div>`;
            content.appendChild(itemDiv);
        }
        this.container.appendChild(content);
    }
    buildOperate() {
    }
}
exports.default = Goods;

},{"../config/config":2,"../utils/fetch-jsonp":25,"../utils/utils":26}],24:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const goods_1 = require("./goods/goods");
const utils_1 = require("./utils/utils");
const config_1 = require("./config/config");
const CookieManager_1 = require("./cookie/CookieManager");
const CookieHandler_1 = require("./cookie/CookieHandler");
const newBabelAwardCollection_1 = require("./coupons/newBabelAwardCollection");
const whtieCoupon_1 = require("./coupons/whtieCoupon");
const purchase_1 = require("./coupons/purchase");
const receiveDayCoupon_1 = require("./coupons/receiveDayCoupon");
const secKillCoupon_1 = require("./coupons/secKillCoupon");
const mfreecoupon_1 = require("./coupons/mfreecoupon");
const coinPurchase_1 = require("./coupons/coinPurchase");
const gcConvert_1 = require("./coupons/gcConvert");
const receiveCoupons_1 = require("./coupons/receiveCoupons");
const receiveCoupon_1 = require("./coupons/receiveCoupon");
const getCouponCenter_1 = require("./coupons/getCouponCenter");
const exchange_1 = require("./coupons/exchange");
// import MonsterNian from "./activitys/MonsterNian";
// import BrandCitySpring from "./activitys/brandCitySpring";
// import Palace from "./activitys/palace";
// import ReceiveBless from "./activitys/receiveBless";
const feedBag_1 = require("./activitys/feedBag");
const activityType_1 = require("./enum/activityType");
const couponType_1 = require("./enum/couponType");
const goodsType_1 = require("./enum/goodsType");
const btgoose_1 = require("./game/btgoose");
const moneyTree_1 = require("./game/moneyTree");
const cloudpig_1 = require("./game/cloudpig");
let coupon, goods, game, activity, gameMap = {}, isJDcontext = true;
const container = document.createElement("div"), title = document.createElement("div"), timerTittleDiv = document.createElement("div"), receiveTextInput = document.createElement("input"), receiveCountInput = document.createElement("input"), receiveTimerBtn = document.createElement("button"), operateAreaDiv = document.createElement("div"), outputTextArea = document.createElement("textarea"), outputTextAreaDiv = document.createElement("div"), loginMsgDiv = document.createElement("div");
let getLoginMsg = function (res) {
    if (res.base.nickname) {
        loginMsgDiv.innerHTML = "当前登录京东帐号：" + res.base.nickname;
    }
}, krapnik = function (res) {
};
function buildOperate() {
    operateAreaDiv.setAttribute("style", "border: 1px solid #000;margin: 10px 0;");
    operateAreaDiv.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin: 5px;padding: 0 25vw 5px;'>操作区</h3>";
    if (coupon) {
        buildTimerControl();
    }
    loginMsgDiv.innerHTML = "当前京东帐号：<a href='https://plogin.m.jd.com/login/login' target='_blank'>点击登录</a>";
    operateAreaDiv.append(loginMsgDiv);
    container.append(operateAreaDiv);
    buildOutput();
}
function buildOutput() {
    outputTextAreaDiv.style.display = "none";
    outputTextArea.setAttribute("style", "width: 90vw;height: 40vw;border: 1px solid #868686;border-radius: 10px;overflow-y: scroll;margin:5px auto;");
    outputTextArea.setAttribute("disabled", "disabled");
    let clearOutLogBtn = document.createElement("button");
    clearOutLogBtn.innerHTML = "清空日志";
    clearOutLogBtn.setAttribute("style", "width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px;");
    clearOutLogBtn.addEventListener("click", () => {
        outputTextArea.value = "";
    });
    outputTextAreaDiv.append(outputTextArea);
    outputTextAreaDiv.append(clearOutLogBtn);
    operateAreaDiv.append(outputTextAreaDiv);
}
function buildTimerControl() {
    const receiveDiv = document.createElement("div"), receiveAreaDiv = document.createElement("div"), receiveTipsDiv = document.createElement("div"), receiveAllBtn = document.createElement("button"), timerTextInput = document.createElement("input"), timerResetBtn = document.createElement("button"), spanTextInput = document.createElement("input"), spanResetBtn = document.createElement("button"), timerDiv = document.createElement("div");
    timerTextInput.type = "text";
    timerTextInput.placeholder = "请输入获取时间的刷新频率【毫秒】";
    timerTextInput.setAttribute("style", "width:80vw;height: 25px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;");
    timerResetBtn.innerHTML = "重置刷新频率";
    timerResetBtn.setAttribute("style", "width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;");
    timerResetBtn.addEventListener("click", () => {
        const span = Math.trunc(+timerTextInput.value);
        if (!span) {
            alert("请检查输入的刷新频率是否有误！(只能为大于0的数字)");
            return false;
        }
        config_1.default.intervalSpan = span;
        window.clearInterval(config_1.default.intervalId);
        config_1.default.intervalId = window.setInterval(getTime, config_1.default.intervalSpan);
    });
    receiveTipsDiv.innerHTML = `<h3>定时时间使用年月日+24小时制</h3><p style="color:red">零点领券设置参考<br>刷新频率:500 | 定时时间：2020-01-01 23:59:59:490<br>tips:部分券其实是提前发放的</p>`;
    receiveTextInput.type = "text";
    receiveTextInput.placeholder = "定时领券时间【格式:2020-01-01 09:59:59:950】";
    receiveTextInput.setAttribute("style", "width:80vw;height: 25px;border: solid 1px #000;border-radius: 5px;margin: 10px;");
    receiveCountInput.type = "text";
    receiveCountInput.placeholder = "领券提交次数【默认：1次】";
    receiveCountInput.setAttribute("style", "width:80vw;height: 25px;border: solid 1px #000;border-radius: 5px;margin: 10px;");
    spanTextInput.type = "text";
    spanTextInput.placeholder = "请输入重复领券的提交频率【默认：500毫秒】";
    spanTextInput.setAttribute("style", "width:80vw;height: 25px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;");
    receiveTimerBtn.innerHTML = "定时指定领取";
    receiveTimerBtn.addEventListener("click", () => {
        config_1.default.postSpan = parseInt(spanTextInput.value) > 0 ? parseInt(spanTextInput.value) : 500;
        config_1.default.postCount = parseInt(receiveCountInput.value) > 0 ? parseInt(receiveCountInput.value) : 1;
        const time = utils_1.default.formateTime(receiveTextInput.value);
        if (!time || time < 0) {
            alert("请检查定时领券时间的格式是否有误！");
            return false;
        }
        else {
            config_1.default.timingFlag = !config_1.default.timingFlag;
            config_1.default.startTime = time;
            receiveTextInput.disabled = config_1.default.timingFlag;
            receiveCountInput.disabled = config_1.default.timingFlag;
            if (config_1.default.timingFlag) {
                receiveTimerBtn.innerHTML = "取消定时领取";
                utils_1.default.outPutLog(outputTextArea, `已开启定时领取！定时领取时间：${receiveTextInput.value}`);
            }
            else {
                receiveTimerBtn.innerHTML = "定时指定领取";
                utils_1.default.outPutLog(outputTextArea, `已关闭定时领取`);
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
    operateAreaDiv.append(timerDiv);
    timerDiv.append(timerTittleDiv);
    timerDiv.append(timerTextInput);
    timerDiv.append(timerResetBtn);
    timerDiv.append(spanTextInput);
    timerDiv.append(spanResetBtn);
    operateAreaDiv.append(receiveDiv);
    receiveDiv.append(receiveTipsDiv);
    receiveDiv.append(receiveTextInput);
    receiveDiv.append(receiveCountInput);
    receiveDiv.append(spanTextInput);
    receiveDiv.append(receiveAreaDiv);
    receiveAreaDiv.append(receiveAllBtn);
    receiveAreaDiv.append(receiveTimerBtn);
}
function buildTips() {
    const tips = document.createElement('h4');
    tips.innerHTML = '<h4>页面地址暂未被扩展或者有误！</h4><p>本插件只能在指定活动地址或领券地址使用！</p><p>如果这是个活动地址或领券地址，<a href="tencent://message/?uin=708873725Menu=yes" target="_blank" title="发起QQ聊天">联系作者</a>扩展~</p><a style="color:red" href="https://gitee.com/krapnik/res/raw/master/tutorial.mp4" target="_blank">点击下载教程视频</a>';
    title.append(tips);
}
function buildTitle() {
    const html = utils_1._$('html');
    html.style.fontSize = "18px";
    document.body.innerHTML = "";
    document.body.style.overflow = "scroll";
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.textAlign = "center";
    document.body.style.maxWidth = "100vw";
    container.setAttribute("style", "border: 1px solid #000;margin: 10px 0;padding: 5px;margin: 5px;");
    title.innerHTML = `<h1 style="font-weight:700">${config_1.default.title} ${config_1.default.version}</h1>
                        <h3>author:${config_1.default.author}</h3>
                        <div style="display: flex;flex-direction: row;justify-content: center;">
                        <iframe src="https://ghbtns.com/github-btn.html?user=krapnikkk&repo=JDCouponAssistant&type=star&count=true" frameborder="0" scrolling="0" width="90px" height="21px"></iframe>
                        <a href="tencent://message/?uin=708873725Menu=yes" target="_blank" title="发起QQ聊天"><img src="http://bizapp.qq.com/webimg/01_online.gif" alt="QQ" style="margin:0px;"></a>
                        </div>
                        <button style="font-size:18px;font-weight:bold;color:#000;position:relative;width: 200px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">
                            把按钮拖动到书签栏
                            <a style="font-size:0px;width:200px;height:30px;display:inline-block;position:absolute;left:0;top:0;" href="javascript:!function(){function c(){var d=document.getElementById("loadJs"),e=document.createElement("script");d&&document.getElementsByTagName("head")[0].removeChild(d),e.id="loadJs",e.type="text/javascript",e.onerror=function(){return b==a.length-1?(alert("%E6%89%80%E6%9C%89%E6%95%B0%E6%8D%AE%E6%BA%90%E4%BB%A3%E7%A0%81%E5%8A%A0%E8%BD%BD%E5%BC%82%E5%B8%B8%EF%BC%81%E8%AF%B7%E6%A3%80%E6%9F%A5%E7%BD%91%E7%BB%9C%E6%83%85%E5%86%B5%EF%BC%81"),void 0):(b++,c(),void 0)},e.src=a[b],document.getElementsByTagName("head")[0].appendChild(e)}var a=["https://krapnik.coding.net/p/JD/d/JDCouponAssistant/git/raw/master/bundle.js","https://gitee.com/krapnik/codes/o9nwsxjuy6crftdi824aq79/raw?blob_name=JDCouponAssistant.js","https://raw.githubusercontent.com/krapnikkk/JDCouponAssistant/master/dist/bundle.js"],b=0;c()}();">
                                京东领券助手
                            </a>
                        </button>`;
    container.append(title);
    document.body.append(container);
}
function buildActivity() {
    const activityArea = document.createElement("div");
    activityArea.setAttribute("style", "border: 1px solid #000");
    activityArea.innerHTML = `<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin: 5px;'>活动推荐</h3>
    <p style="color:red;font-weight:bold;"><a style="color:red" href="https://u.jr.jd.com/uc-fe-wxgrowing/feedbag/cover/channelLv=syfc/" target="_blank">全民养京贴</a></p>`;
    container.append(activityArea);
}
function buildRecommend() {
    const recommandArea = document.createElement("div");
    recommandArea.setAttribute("style", "border: 1px solid #000;margin: 10px 0;");
    recommandArea.innerHTML = `<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin: 5px;'>好券推荐</h3>
    <p style="color:red;font-weight:bold;">
    <a style="color:red" href="https://m.jr.jd.com/member/9GcConvert/?channel=01-shouye-191214" target="_blank">9金币抢兑</a>
    <br><a style="color:red" href="https://m.jr.jd.com/member/rightsCenter/#/white" target="_blank">12期免息券</a>
    </p>`;
    container.append(recommandArea);
}
function buildPromotion() {
    const promotionArea = document.createElement("div");
    promotionArea.setAttribute("style", "border: 1px solid #000;margin: 10px 0;");
    promotionArea.innerHTML = `<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin: 5px;'>推广区</h3>
    <p style="color:red;font-weight:bold;"><a style="color:red" href="http://krapnik.cn/project/jd/dayTask.html" target="_blank">每日京东红包汇总</a></p>`;
    container.append(promotionArea);
}
function buildUAarea() {
    let UATipsDiv = document.createElement("div");
    UATipsDiv.innerHTML = `<div style="border: 1px solid #000;margin: 10px 0;font-weight:bold"><h2>该活动需要设置user-Agent为京东APP</h2><p><a style="color:red" href="https://gitee.com/krapnik/res/raw/master/tutorial.mp4" target="_blank">点击下载教程视频</a></p><p>部分浏览器插件会覆盖UA设置，请自行排查并关闭</p><p>【比如：京价保】</p><button style="width: 200px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block" onclick=Utils.copyText(Config.JDAppUA)>点击一键复制User-Agent</button></div>`;
    container.append(UATipsDiv);
}
function buildSensorArea() {
    let sensorArea = document.createElement("div");
    sensorArea.innerHTML = `<div style="border: 1px solid #000;margin: 10px 0;font-weight:bold"><h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin: 5px;padding: 0 25vw 5px;'>扩展功能区</h3>
    <p style="color:red;font-weight:bold;">使用本栏目功能前请查看教程</p>
    <div><button style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;" onclick="Utils.copyText(Config.NetdiskURL)">下载教程</button>
    <button class="toggle" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">展开栏目</button></div>
    <div class="sensorAreaTabDiv" style="display:none"><ul class="list" style="display:flex;justify-content: space-around;list-style:none;margin-bottom: 10px;"><li class="account">帐号管理</li><li class="activity">日常辅助</li></ul>
    <hr style="margin: 10px;">
    <div class="extensionDiv"></div></div>`;
    container.append(sensorArea);
    let account = document.createElement("div");
    account.innerHTML = `<p>导入ck格式：备注----ck</p><p style="color:red;">暂时只对扩展功能区有效</p>
    <button style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block" onclick="Utils.copyText(document.cookie)">复制Cookie</button>
    <button id="import" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">导入多帐号</button></div>`;
    let activity = document.createElement("div");
    activity.innerHTML = `<ul class="activity-list" style="display:flex;justify-content: space-around;list-style:none;margin-bottom: 10px;">
    <li class="pig">养猪猪</li>
    <li class="goose">提鹅</li>
    <li class="moneyTree">金果树</li>
    <li class="signInCenter">签到中心</li>
    </ul>
    <hr style="margin: 10px;"><div class="activityExtensionDiv"></div>`;
    let extensionDiv = utils_1._$(".extensionDiv"), sensorAreaTabDiv = utils_1._$(".sensorAreaTabDiv");
    extensionDiv.append(account);
    extensionDiv.append(activity);
    activity.style.display = "none";
    utils_1._$(".list").addEventListener("click", (e) => {
        let target = e.target;
        if (target.getAttribute("class") == "account") {
            account.style.display = "block";
            activity.style.display = "none";
        }
        else {
            account.style.display = "none";
            activity.style.display = "block";
        }
    });
    utils_1._$(".toggle").addEventListener("click", (e) => {
        let target = e.target;
        if (sensorAreaTabDiv.style.display == "block") {
            sensorAreaTabDiv.style.display = "none";
            target.innerHTML = "展开栏目";
        }
        else {
            sensorAreaTabDiv.style.display = "block";
            target.innerHTML = "收起栏目";
        }
    });
    utils_1._$("#import").addEventListener('click', () => {
        utils_1.default.importFile("text/plain").then((ck) => __awaiter(this, void 0, void 0, function* () {
            config_1.default.multiFlag = false;
            config_1.default.importFlag = false;
            CookieManager_1.default.parseCK(ck);
            if (config_1.default.importFlag) {
                CookieManager_1.default.outPutLog(outputTextArea);
                Promise.all(CookieManager_1.default.cookieArr.map((item) => {
                    return CookieManager_1.default.checkLogin(outputTextArea, item);
                })).then((data) => {
                    if (data.every((res) => {
                        return res;
                    })) {
                        utils_1.default.outPutLog(outputTextArea, "所有ck校验成功，开启多账号模式成功!");
                        config_1.default.multiFlag = true;
                    }
                    else {
                        CookieHandler_1.CookieHandler.clearAllCookie();
                        utils_1.default.outPutLog(outputTextArea, "部分ck校验失败,开启多账号模式失败!请检查ck有效性!");
                    }
                });
            }
        }));
    });
    let activityExtensionDiv = utils_1._$(".activityExtensionDiv");
    utils_1._$(".activity-list").addEventListener("click", (e) => {
        let target = e.target;
        let nodes = activityExtensionDiv.childNodes;
        nodes.forEach((node) => {
            node.style.display = "none";
        });
        if (target.getAttribute("class") == "pig") {
            if (!gameMap.Cloudpig) {
                gameMap.Cloudpig = new cloudpig_1.default(null, activityExtensionDiv, outputTextArea);
                gameMap.Cloudpig.get();
            }
            else {
                gameMap.Cloudpig.content.style.display = "block";
            }
        }
        else if (target.getAttribute("class") == "goose") {
            if (!gameMap.BTGoose) {
                gameMap.BTGoose = new btgoose_1.default(null, activityExtensionDiv, outputTextArea);
                gameMap.BTGoose.get();
            }
            else {
                gameMap.BTGoose.content.style.display = "block";
            }
        }
        else if (target.getAttribute("class") == "moneyTree") {
            if (!gameMap.MoneyTree) {
                gameMap.MoneyTree = new moneyTree_1.default(null, activityExtensionDiv, outputTextArea);
                gameMap.MoneyTree.get();
            }
            else {
                gameMap.MoneyTree.content.style.display = "block";
            }
        }
        else {
            alert("该功能正在开发中，晚点再来吧~");
        }
    });
}
function buildTimeoutArea() {
    let timeoutDiv = document.createElement("div"), timeoutInput = document.createElement("input");
    timeoutInput.setAttribute("style", "width:80vw;height: 25px;font-size:14px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;");
    timeoutInput.placeholder = `请输入任务的提交间隔时间【默认:${config_1.default.timeoutSpan}毫秒】`;
    timeoutDiv.innerHTML = `<p style="font-size:14px;">任务提交时间将会在设置提交间隔时间的基础上随机增加300~500毫秒</p>`;
    timeoutDiv.append(timeoutInput);
    timeoutInput.onchange = () => {
        if (utils_1.default.isNumber(+timeoutInput.value)) {
            config_1.default.timeoutSpan = +timeoutInput.value || 1500;
        }
    };
    operateAreaDiv.append(timeoutDiv);
}
function getEntryType() {
    let type = couponType_1.couponType.none;
    if (!window.location.host.includes("jd.com")) {
        isJDcontext = false;
        return type;
    }
    if (config_1.default.locationHref.includes("item.jd.com/") || config_1.default.locationHref.includes("item.m.jd.com/product/")) {
        type = goodsType_1.goodsType.goods;
    }
    if (window.__react_data__) {
        type = couponType_1.couponType.newBabelAwardCollection;
    }
    else if (window.Queries) {
        type = couponType_1.couponType.whiteCoupon;
    }
    else if (config_1.default.locationHref.includes('gcmall/index.html#/details?pid=')) {
        type = couponType_1.couponType.purchase;
    }
    else if (config_1.default.locationHref.includes('member/gcmall/index.html#/details?gid')) {
        type = couponType_1.couponType.coinPurchase;
    }
    else if (config_1.default.locationHref.includes("plus.m.jd.com/coupon/")) {
        type = couponType_1.couponType.receiveDayCoupon;
    }
    else if (config_1.default.locationHref.includes("9GcConvert")) {
        type = couponType_1.couponType.GcConvert;
    }
    else if ((/babelDiy\/(\S*)\/index/).test(config_1.default.locationHref)) {
        type = couponType_1.couponType.secKillCoupon;
    }
    else if (/coupons\/show.action\?key=(\S*)&roleId=(\S*)/.test(config_1.default.locationHref)) {
        type = couponType_1.couponType.mfreecoupon;
    }
    else if (config_1.default.locationHref.includes("4PN6NLSX1vyp8xibC5sk7WZEFF5U")) {
        type = couponType_1.couponType.secKillCoupon;
    }
    else if (config_1.default.locationHref.includes("m.jr.jd.com/member/rightsCenter/#/white")) {
        type = couponType_1.couponType.ReceiveCoupons;
    }
    else if (config_1.default.locationHref.includes("m.jr.jd.com/consumer/baitiaom/index.html")) {
        type = couponType_1.couponType.ReceiveCoupon;
    }
    else if (config_1.default.locationHref.includes("coupon.m.jd.com/center/getCouponCenter.action")) {
        type = couponType_1.couponType.getCouponCenter;
    }
    else if (config_1.default.locationHref.includes("vip.m.jd.com/index.html?appName=fuli&id=")) {
        type = couponType_1.couponType.exchange;
    }
    //京东APP节假日营销活动
    if (config_1.default.locationHref.includes("bunearth.m.jd.com")) {
        if (config_1.default.locationHref.includes("4PWgqmrFHunn8C38mJA712fufguU")) {
            type = activityType_1.activityType.monsterNian;
        }
        else if (config_1.default.locationHref.includes("w6y8PYbzhgHJc8Lu1weihPReR2T")) {
            type = activityType_1.activityType.brandCitySpring;
        }
        else if (config_1.default.locationHref.includes("21tFbS6Xm4tpon3oJnwzbnCJBo1Z")) {
            type = activityType_1.activityType.receiveBless;
        }
    }
    if (config_1.default.locationHref.includes("palace")) {
        type = activityType_1.activityType.palace;
    }
    //京东金融APP节假日营销活动
    if (config_1.default.locationHref.includes("u.jr.jd.com")) {
        //https://u.jr.jd.com/uc-fe-wxgrowing/feedbag/cover/channelLv=syfc/
        if (config_1.default.locationHref.includes("feedbag")) {
            type = activityType_1.activityType.feedBag;
        }
    }
    //调整为全局主动切换
    // if (Config.locationHref.includes("uc-fe-wxgrowing")) {
    //     if (Config.locationHref.includes("moneytree")) {
    //         // type = gameType.moneytree;
    //     } else if (Config.locationHref.includes("cloudpig")) {
    //         type = gameType.cloudpig;
    //     }
    // }
    return type;
}
function getEntryDesc(type) {
    buildTitle();
    // buildPromotion();
    switch (type) {
        case goodsType_1.goodsType.goods:
            const goodsId = config_1.default.locationHref.match(/jd.com\/(\S*).html/)[1];
            goods = new goods_1.default(container, outputTextArea, goodsId);
            break;
        case couponType_1.couponType.newBabelAwardCollection:
            const activityId = config_1.default.locationHref.match(/active\/(\S*)\/index/)[1];
            coupon = new newBabelAwardCollection_1.default({ "activityId": activityId }, container, outputTextArea);
            break;
        case couponType_1.couponType.whiteCoupon:
            const couponBusinessId = utils_1.default.GetQueryString("couponBusinessId");
            coupon = new whtieCoupon_1.default({ "couponBusinessId": couponBusinessId }, container, outputTextArea);
            break;
        case couponType_1.couponType.purchase:
            const pid = utils_1.default.GetQueryString("pid");
            coupon = new purchase_1.default({ "pid": pid }, container, outputTextArea);
            break;
        case couponType_1.couponType.coinPurchase:
            const gid = utils_1.default.GetQueryString("gid");
            coupon = new coinPurchase_1.default({ "pid": gid }, container, outputTextArea);
            break;
        case couponType_1.couponType.receiveDayCoupon:
            coupon = new receiveDayCoupon_1.default(null, container, outputTextArea);
            break;
        case couponType_1.couponType.secKillCoupon:
            coupon = new secKillCoupon_1.default(null, container, outputTextArea);
            break;
        case couponType_1.couponType.GcConvert:
            coupon = new gcConvert_1.default(null, container, outputTextArea);
            break;
        case couponType_1.couponType.mfreecoupon:
            const roleId = utils_1.default.GetQueryString("roleId"), key = utils_1.default.GetQueryString("key");
            coupon = new mfreecoupon_1.default({ "roleId": roleId, "key": key }, container, outputTextArea);
            break;
        case couponType_1.couponType.ReceiveCoupons:
            coupon = new receiveCoupons_1.default(null, container, outputTextArea);
            break;
        case couponType_1.couponType.ReceiveCoupon:
            coupon = new receiveCoupon_1.default(null, container, outputTextArea);
            break;
        case couponType_1.couponType.getCouponCenter:
            coupon = new getCouponCenter_1.default(null, container, outputTextArea);
            break;
        case couponType_1.couponType.exchange:
            const itemId = utils_1.default.GetQueryString("id");
            coupon = new exchange_1.default({ "itemId": itemId }, container, outputTextArea);
            break;
        // case activityType.monsterNian:
        //     activity = new MonsterNian(null, container, outputTextArea);
        //     Config.UAFlag = true;
        //     break;
        // case activityType.brandCitySpring:
        //     activity = new BrandCitySpring(null, container, outputTextArea);
        //     break;
        // case activityType.palace:
        //     activity = new Palace(null, container, outputTextArea);
        //     break;
        // case activityType.receiveBless:
        //     activity = new ReceiveBless(null, container, outputTextArea);
        //     Config.UAFlag = true;
        //     break;
        case activityType_1.activityType.feedBag:
            activity = new feedBag_1.default(null, container, outputTextArea);
            break;
        default:
            break;
    }
    if (config_1.default.UAFlag) {
        buildUAarea();
    }
    buildRecommend();
    buildActivity();
    if (isJDcontext) {
        buildSensorArea();
        buildOperate();
        // buildExtensionTab();
        utils_1.default.createJsonp(`${config_1.default.JDUserInfoURL}&callback=getLoginMsg`);
    }
    if (coupon) {
        config_1.default.intervalId = window.setInterval(getTime, config_1.default.intervalSpan);
        coupon.get();
    }
    else if (activity) {
        // buildActivity();
        // buildTimeoutArea();
        activity.get();
    }
    else if (goods) {
        goods.get();
    }
    else if (game) {
        game.get();
    }
    else {
        utils_1.default.loadCss("https://meyerweb.com/eric/tools/css/reset/reset200802.css");
        buildTips();
    }
}
function getTime() {
    fetch(config_1.default.JDTimeInfoURL)
        .then(function (response) { return response.json(); })
        .then(function (res) {
        config_1.default.serverTime = utils_1.default.formatDate(res.time);
        config_1.default.localeTime = new Date(+res.time).toLocaleString() + ":" + config_1.default.serverTime.substr(-3, 3);
        timerTittleDiv.innerHTML = `京东时间：${config_1.default.localeTime}<br/>当前获取时间的间隔频率：${config_1.default.intervalSpan}毫秒`;
        if (config_1.default.timingFlag) {
            if (config_1.default.startTime <= +config_1.default.serverTime) {
                utils_1.default.outPutLog(outputTextArea, `定时领取开始！`);
                utils_1.default.outPutLog(outputTextArea, `当前京东服务器时间：${config_1.default.localeTime}`);
                config_1.default.timingFlag = !config_1.default.timingFlag;
                if (coupon) {
                    for (let i = 0; i < config_1.default.postCount; i++) {
                        (function (index) {
                            setTimeout(() => {
                                utils_1.default.outPutLog(outputTextArea, `第${index + 1}次提交！`);
                                coupon.send(outputTextArea);
                            }, index * config_1.default.postSpan);
                        })(i);
                    }
                }
                receiveTextInput.disabled = config_1.default.timingFlag;
                receiveCountInput.disabled = config_1.default.timingFlag;
                receiveTimerBtn.innerHTML = "定时指定领取";
                utils_1.default.outPutLog(outputTextArea, `定时领取已结束！`);
            }
        }
    });
}
function copyRights() {
    console.clear();
    if (window.console) {
        console.group('%c京东领券助手', 'color:#009a61; font-size: 36px; font-weight: 400');
        console.log('%c本插件仅供学习交流使用\n作者:krapnik \n既然按了F12，为何不去GitHub顺便给个star\ngithub:https://github.com/krapnikkk/JDCouponAssistant', 'color:#009a61');
        console.groupEnd();
    }
}
var _hmt = _hmt || [];
function statistical() {
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?d86d4ff3f6d089df2b41eb0735194c0d";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
}
copyRights();
getEntryDesc(getEntryType());
statistical();
Object.assign(window, { "getLoginMsg": getLoginMsg, "krapnik": krapnik, "Utils": utils_1.default, "Config": config_1.default });

},{"./activitys/feedBag":1,"./config/config":2,"./cookie/CookieHandler":3,"./cookie/CookieManager":4,"./coupons/coinPurchase":5,"./coupons/exchange":6,"./coupons/gcConvert":7,"./coupons/getCouponCenter":8,"./coupons/mfreecoupon":9,"./coupons/newBabelAwardCollection":10,"./coupons/purchase":11,"./coupons/receiveCoupon":12,"./coupons/receiveCoupons":13,"./coupons/receiveDayCoupon":14,"./coupons/secKillCoupon":15,"./coupons/whtieCoupon":16,"./enum/activityType":17,"./enum/couponType":18,"./enum/goodsType":19,"./game/btgoose":20,"./game/cloudpig":21,"./game/moneyTree":22,"./goods/goods":23,"./utils/utils":26}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FetchJsonp {
    static generateCallbackFunction() {
        return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
    }
    static clearFunction(functionName) {
        try {
            delete window[functionName];
        }
        catch (e) {
            window[functionName] = undefined;
        }
    }
    static removeScript(scriptId) {
        const script = document.getElementById(scriptId);
        if (script) {
            document.getElementsByTagName('head')[0].removeChild(script);
        }
    }
    static fetchJsonp(_url, options = {}) {
        // to avoid param reassign
        let url = _url;
        const timeout = options.timeout || FetchJsonp.defaultOptions.timeout;
        const jsonpCallback = options.jsonpCallback || FetchJsonp.defaultOptions.jsonpCallback;
        let timeoutId;
        return new Promise((resolve, reject) => {
            const callbackFunction = options.jsonpCallbackFunction || FetchJsonp.generateCallbackFunction();
            const scriptId = `${jsonpCallback}_${callbackFunction}`;
            window[callbackFunction] = (response) => {
                resolve({
                    ok: true,
                    // keep consistent with fetch API
                    json: () => Promise.resolve(response),
                });
                if (timeoutId)
                    clearTimeout(timeoutId);
                FetchJsonp.removeScript(scriptId);
                FetchJsonp.clearFunction(callbackFunction);
            };
            // Check if the user set their own params, and if not add a ? to start a list of params
            url += (url.indexOf('?') === -1) ? '?' : '&';
            const jsonpScript = document.createElement('script');
            jsonpScript.setAttribute('src', `${url}${jsonpCallback}=${callbackFunction}`);
            if (options.charset) {
                jsonpScript.setAttribute('charset', options.charset);
            }
            jsonpScript.id = scriptId;
            document.getElementsByTagName('head')[0].appendChild(jsonpScript);
            timeoutId = setTimeout(() => {
                reject(new Error(`JSONP request to ${_url} timed out`));
                FetchJsonp.clearFunction(callbackFunction);
                FetchJsonp.removeScript(scriptId);
                window[callbackFunction] = () => {
                    FetchJsonp.clearFunction(callbackFunction);
                };
            }, timeout);
            // Caught if got 404/500
            jsonpScript.onerror = () => {
                reject(new Error(`JSONP request to ${_url} failed`));
                FetchJsonp.clearFunction(callbackFunction);
                FetchJsonp.removeScript(scriptId);
                if (timeoutId)
                    clearTimeout(timeoutId);
            };
        });
    }
}
exports.default = FetchJsonp;
FetchJsonp.defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null,
};

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.jsonpBind = function (res) {
    Utils.jsonpBind(JSON.stringify(res));
};
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
        let dateObj = new Date(+date), year = dateObj.getFullYear(), month = dateObj.getMonth() + 1, day = dateObj.getDate(), hours = dateObj.getHours(), mins = dateObj.getMinutes(), secs = dateObj.getSeconds(), msecs = dateObj.getMilliseconds();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
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
        return year + "" + month + "" + day + "" + hours + "" + mins + "" + secs + "" + msecs;
    }
    static GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (!r) {
            let url = window.location.hash;
            r = url.substr(url.indexOf("?") + 1, url.length - url.indexOf("?")).match(reg);
        }
        if (r != null)
            return r[2];
        return "";
    }
    static getSearchString(str, key) {
        str = str.substring(1, str.length);
        var arr = str.split("&");
        var obj = new Object();
        for (var i = 0; i < arr.length; i++) {
            var tmp_arr = arr[i].split("=");
            obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
        }
        return obj[key];
    }
    static getQueryStringByName(url) {
        url = url.replace(/#.*/, ''); //removes hash (to avoid getting hash query)
        var queryString = /\?[a-zA-Z0-9\=\&\%\$\-\_\.\+\!\*\'\(\)\,]+/.exec(url); //valid chars according to: http://www.ietf.org/rfc/rfc1738.txt
        return (queryString) ? decodeURIComponent(queryString[0]) : '';
    }
    static formateTime(time) {
        return Math.trunc(+(time.replace(/\s+/ig, "").replace(/[:|：]+/ig, "").replace(/[-|——]+/ig, "")));
    }
    static createJsonp(url, bind = false) {
        var jsonpScript = document.createElement('script');
        document.getElementsByTagName('head')[0].appendChild(jsonpScript);
        if (bind) {
            url += "jsonpBind";
        }
        jsonpScript.setAttribute('src', url);
        jsonpScript.onload = () => {
            document.getElementsByTagName('head')[0].removeChild(jsonpScript);
        };
    }
    static jsonpBind(res) {
        postMessage(res, '*');
    }
    static outPutLog(output, log, timeFlag = true) {
        if (output.parentElement.style.display == 'none') {
            output.parentElement.style.display = 'block';
        }
        if (timeFlag) {
            if (output.value) {
                output.value = `${output.value}\n${new Date().toLocaleString()}\n${log}`;
            }
            else {
                output.value = new Date().toLocaleString() + log;
            }
        }
        else {
            output.value = `${output.value}\n${log}`;
        }
    }
    static random(n, m) {
        return Math.floor(Math.random() * (m - n + 1) + n);
    }
    static getTimestamp() {
        return new Date().getTime();
    }
    static copyText(text) {
        if (text === "") {
            alert("好像没有需要复制的内容哦！");
            return;
        }
        var oInput = document.querySelector('.oInput');
        if (!oInput) {
            oInput = document.createElement('input');
            oInput.className = 'oInput';
            document.body.appendChild(oInput);
        }
        oInput.value = text;
        oInput.select();
        document.execCommand("Copy");
        oInput.style.display = 'none';
        alert('内容已经复制到黏贴板啦');
    }
    static importFile(ext) {
        return new Promise((resolve, reject) => {
            let fInput = document.createElement('input');
            fInput.className = 'fInput';
            fInput.type = "file";
            document.body.appendChild(fInput);
            fInput.onchange = function (e) {
                const file = e.target.files[0], reader = new FileReader();
                if (file && file.type.includes(ext)) {
                    reader.readAsText(file);
                }
                else {
                    alert("不支持的文件格式!");
                    return;
                }
                reader.onabort = function () {
                    //读取中断
                    document.body.removeChild(fInput);
                };
                reader.onerror = function () {
                    //读取发生错误
                    document.body.removeChild(fInput);
                };
                reader.onload = function () {
                    if (reader.readyState == 2) {
                        const result = reader.result;
                        resolve(result);
                        document.body.removeChild(fInput);
                    }
                };
            };
            fInput.click();
            fInput.style.display = "none";
        });
    }
    static loadiFrame(url) {
        return new Promise(resolve => {
            var iframe = document.createElement('iframe');
            document.body.appendChild(iframe);
            iframe.width = "1";
            iframe.height = "1";
            iframe.onload = () => {
                resolve(iframe);
            };
            iframe.src = url;
            iframe.style.display = 'none';
        });
    }
    static loadCss(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
    ;
    static stringify(params) {
        return Object.keys(params).map((key) => {
            console.log();
            return `${key}=${this.isObject(params[key]) ? JSON.stringify(params[key]) : encodeURIComponent(params[key])}`;
        }).join("&");
    }
    static isObject(value) {
        let type = typeof value;
        return value != null && (type == 'object' || type == 'function');
    }
    static isNumber(obj) {
        return typeof obj === 'number' && !isNaN(obj);
    }
    // static HTMLfactory(type: string, attributes: any, parent: HTMLElement): HTMLElement {
    //     let ele: any = document.createElement(type);
    //     for (let k in attributes) {
    //         ele[k] = attributes[k];
    //     }
    //     parent.append(ele);
    //     return ele;
    // }
    static querySelector(dom) {
        return document.querySelector(dom);
    }
}
exports.default = Utils;
exports._$ = Utils.querySelector;

},{}]},{},[24]);
