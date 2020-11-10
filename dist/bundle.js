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
class Guardianstar {
    constructor(containerDiv, outputTextarea) {
        this.data = [];
        this.token = "jd6df03bd53f0f292f";
        this.starIdArr = ['meiditongliya', 'bolangwutiaoren', 'quechaozhuyilong', 'haierchenxiao', 'oulebyangzi', 'haiermaoxiaotong', 'changhongsongyi', 'skgwangyibo'];
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            this.doTask();
        });
    }
    doTask() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.starIdArr.length; i++) {
                yield new Promise(resolve => {
                    let starId = this.starIdArr[i];
                    utils_1.default.outPutLog(this.outputTextarea, `当前明星：${starId}`);
                    fetch(`https://urvsaggpt.m.jd.com/guardianstar/getHomePage?t=${new Date().getTime()}&starId=${starId}`).then(res => res.json()).then((json) => __awaiter(this, void 0, void 0, function* () {
                        let data = json.data;
                        let { shopList, venueList, productList } = data[0];
                        yield utils_1.default.sleep(1000);
                        utils_1.default.outPutLog(this.outputTextarea, '开始商店任务');
                        for (let i = 0; i < shopList.length; i++) {
                            // await Utils.sleep(1000);
                            let shop = shopList[i];
                            yield new Promise((resolveFn) => __awaiter(this, void 0, void 0, function* () {
                                utils_1.default.outPutLog(this.outputTextarea, `商店任务${i + 1}/${shopList.length}`);
                                if (shop.shopStatus != 3 && shop.shopStatus != 4) {
                                    let body = { starId: starId, id: shop.shopId, type: "shop", status: shop.shopStatus };
                                    if (shop.shopStatus == 1) {
                                        this.doTaskPost(body).then((res) => {
                                            utils_1.default.outPutLog(this.outputTextarea, res.msg);
                                        });
                                        utils_1.default.outPutLog(this.outputTextarea, '模拟浏览任务等待10s');
                                        yield utils_1.default.sleep(11000);
                                    }
                                    body.status = 2;
                                    this.doTaskPost(body).then((res) => {
                                        utils_1.default.outPutLog(this.outputTextarea, res.msg);
                                    });
                                }
                                else {
                                    utils_1.default.outPutLog(this.outputTextarea, `任务已完成`);
                                }
                                yield utils_1.default.sleep(1000);
                                resolveFn();
                            }));
                        }
                        utils_1.default.outPutLog(this.outputTextarea, '商店任务已完成~');
                        yield utils_1.default.sleep(1000);
                        utils_1.default.outPutLog(this.outputTextarea, '开始会场任务');
                        for (let i = 0; i < venueList.length; i++) {
                            let venue = venueList[i];
                            yield new Promise((resolveFn) => __awaiter(this, void 0, void 0, function* () {
                                utils_1.default.outPutLog(this.outputTextarea, `会场任务:${i + 1}/${venueList.length}`);
                                let body = { starId: starId, id: venue.venueId, type: "venue", status: venue.venueStatus };
                                if (venue.venueStatus != 3 && venue.venueStatus != 4) {
                                    if (venue.venueStatus == 1) {
                                        this.doTaskPost(body).then((res) => {
                                            utils_1.default.outPutLog(this.outputTextarea, res.msg);
                                        });
                                        utils_1.default.outPutLog(this.outputTextarea, '模拟浏览任务等待10s');
                                        yield utils_1.default.sleep(11000);
                                    }
                                    body.status = 2;
                                    this.doTaskPost(body).then((res) => {
                                        utils_1.default.outPutLog(this.outputTextarea, res.msg);
                                    });
                                }
                                else {
                                    utils_1.default.outPutLog(this.outputTextarea, `任务已完成`);
                                }
                                yield utils_1.default.sleep(1000);
                                resolveFn();
                            }));
                        }
                        utils_1.default.outPutLog(this.outputTextarea, '商品任务已完成~');
                        yield utils_1.default.sleep(1000);
                        utils_1.default.outPutLog(this.outputTextarea, '开始商品任务');
                        for (let i = 0; i < productList.length; i++) {
                            let product = productList[i];
                            yield new Promise((resolveFn) => __awaiter(this, void 0, void 0, function* () {
                                utils_1.default.outPutLog(this.outputTextarea, `商品任务:${i + 1}/${productList.length}`);
                                let body = { starId: starId, id: product.productId, type: "product", status: product.productStatus };
                                if (product.productStatus != 3 && product.productStatus != 4) {
                                    if (product.productStatus == 1) {
                                        this.doTaskPost(body).then((res) => {
                                            utils_1.default.outPutLog(this.outputTextarea, res.msg);
                                        });
                                        utils_1.default.outPutLog(this.outputTextarea, '模拟浏览任务等待10s');
                                        yield utils_1.default.sleep(11000);
                                    }
                                    body.status = 2;
                                    this.doTaskPost(body).then((res) => {
                                        utils_1.default.outPutLog(this.outputTextarea, res.msg);
                                    });
                                }
                                else {
                                    utils_1.default.outPutLog(this.outputTextarea, `任务已完成`);
                                }
                                yield utils_1.default.sleep(1000);
                                resolveFn();
                            }));
                        }
                        utils_1.default.outPutLog(this.outputTextarea, '商品任务已完成~');
                        resolve();
                    }));
                });
            }
        });
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = `<h1 style="color:red;font-weight: 700;font-size: 18px;">本活动页脚本自动执行,请留意控制台输出</h1>`;
        this.container.appendChild(content);
    }
    doTaskPost(data) {
        let { starId, id, type, status } = data;
        return fetch('https://urvsaggpt.m.jd.com/guardianstar/doTask', {
            body: `starId=${starId}&type=${type}&id=${id}&status=${status}`,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            credentials: "include"
        }).then(res => res.json());
    }
}
exports.default = Guardianstar;

},{"../utils/utils":30}],2:[function(require,module,exports){
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
class Stall {
    constructor(containerDiv, outputTextarea) {
        this.data = [];
        this.taskVos = [];
        this.timer = 1000;
        this.secretp = "";
        this.inviteUrl = 'https://bunearth.m.jd.com/babelDiy/Zeus/4SJUHwGdUQYgg94PFzjZZbGZRjDd/index.html?shareType=homeTask&inviteId=';
        this.groupInvitedUrl = 'https://bunearth.m.jd.com/babelDiy/Zeus/4SJUHwGdUQYgg94PFzjZZbGZRjDd/index.html?shareType=cbdDay&inviteId=';
        this.switchFlag = true;
        this.switchtimer = 0;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get() {
        utils_1.default.outPutLog(this.outputTextarea, `当你看到这行文字时，说明你还没有配置好浏览器UA或者还没有登录京东帐号！`);
        // 获取基础信息
        Promise.all([
            utils_1.default.request("stall_getHomeData"),
            new Promise((resolve) => {
                setTimeout(() => {
                    utils_1.default.request("stall_getTaskDetail").then(resolve);
                }, 1000);
            }),
        ]).then(([homeData, taskData]) => Promise.all([homeData, taskData]))
            .then(([homeData, taskData]) => {
            this.secretp = homeData.data.result.homeMainInfo.secretp;
            this.data = taskData.data.result;
            if (this.data) {
                this.taskVos = this.data.taskVos;
                let value = "";
                for (let j = 0; j < this.data.taskVos.length; j++) {
                    value += `\n${this.taskVos[j]["taskName"]}：${this.data.taskVos[1]["status"] == 2 ? "已完成" : "未完成"}(${this.taskVos[j]["times"]}/${this.taskVos[j]["maxTimes"]})`;
                }
                utils_1.default.outPutLog(this.outputTextarea, value, true, true);
                this.list();
            }
        });
    }
    updateTask() {
        return new Promise(reslove => {
            utils_1.default.request("stall_getTaskDetail").then((res) => {
                this.data = res.data.result;
                if (this.data) {
                    this.taskVos = this.data.taskVos;
                    let value = '任务数据更新成功';
                    for (let j = 0; j < this.data.taskVos.length; j++) {
                        value += `\n${this.taskVos[j]["taskName"]}：${this.data.taskVos[1]["status"] == 2 ? "已完成" : "未完成"}(${this.taskVos[j]["times"]}/${this.taskVos[j]["maxTimes"]})`;
                    }
                    utils_1.default.outPutLog(this.outputTextarea, value);
                }
                reslove();
            }).catch(() => {
                utils_1.default.outPutLog(this.outputTextarea, "数据获取失败，请稍后再试");
            });
        });
    }
    list() {
        let hours = new Date().getHours();
        if (hours >= 20 && hours < 22) {
            this.helpGroup(false);
        }
        let UATipsDiv = utils_1._$('#UATipsDiv');
        if (this.container && UATipsDiv) {
            this.container.removeChild(UATipsDiv);
        }
        const content = document.createElement("div");
        let msg = `
        <div style="margin:10px;">
        <button class="help" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">帮作者助力</button>
        <button class="helpGroup" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">帮助作者商圈助力</button>
        <button class="invite" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">获取助力链接</button>
        <input class="inviteLink" type="text" style="width:80vw;height: 25px;font-size:14px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;" placeholder="请输入需要助力的分享链接">
        <button class="assist" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">为TA助力</button>
        <button class="group" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">获取商圈分享链接</button>
        <input class="groupLink" type="text" style="width:80vw;height: 25px;font-size:14px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;" placeholder="请输入需要助力的商圈的分享链接">
        <button class="assistGroup" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">为这个商圈助力</button>
        <button class="steal" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">抢夺商圈红包</button>
        <button class="raise" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">解锁升级</button>
        <button class="collect" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">收取金币</button>
        <input class="timerSpan" type="text" style="width:80vw;height: 25px;font-size:14px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;" placeholder="请输入定时时间间隔（毫秒）">
        <button class="timer" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">定时收取金币</button>
        <button class="auto" style="width: 120px;height:30px;background-color: red;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">一键完成任务</button>
        <hr>
        <p style="text-align:center;font-weight:700;color:red;">一键完成任务将会默认为作者助力<br>操作的时候不要执行其他任务</p>
        <hr>
        <button class="deliver" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">快递小哥送货</button>
        <button class="signIn" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">每天签到</button>
        <button class="master" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">逛逛主会场</button>
        <button class="browser" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">逛逛商铺</button>
        <button class="shopping" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">逛逛会场</button>
        <button class="funny" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">好玩互动</button>
        <button class="viewProduct" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">浏览好物</button>
        <button class="addproduct" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">好物加购</button>
        <button class="goodShopping" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">逛逛好物会场</button>
        <button class="others" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">浏览其他活动</button>
        <button class="treasure" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">寻宝箱领金币</button>
        <button class="city" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">城市版图任务</button>
        
        </div>`;
        // <button class="" disabled style="width: 120px;height:30px;background-color: gray;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">开通联合会员任务</button>
        // <button class="join" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">加入作者战队</button>
        content.innerHTML = msg;
        this.container.appendChild(content);
        const signIn = utils_1._$('.signIn'), others = utils_1._$('.others'), group = utils_1._$('.group'), master = utils_1._$('.master'), steal = utils_1._$('.steal'), help = utils_1._$('.help'), funny = utils_1._$('.funny'), viewProduct = utils_1._$('.viewProduct'), city = utils_1._$('.city'), shopping = utils_1._$('.shopping'), invite = utils_1._$('.invite'), goodShopping = utils_1._$('.goodShopping'), timer = utils_1._$('.timer'), deliver = utils_1._$('.deliver'), raise = utils_1._$('.raise'), collect = utils_1._$(".collect"), browser = utils_1._$('.browser'), assistGroup = utils_1._$('.assistGroup'), helpGroup = utils_1._$('.helpGroup'), assist = utils_1._$('.assist'), auto = utils_1._$('.auto'), treasure = utils_1._$('.treasure'), addproduct = utils_1._$('.addproduct');
        auto.addEventListener('click', () => {
            this.autoDoTask();
        });
        signIn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.signInEvent();
        }));
        deliver.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.deliverEvent();
        }));
        treasure.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.openTreasure();
        }));
        master.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.doTask(3, `开始每天主会场任务`, "shoppingActivityVos");
        }));
        addproduct.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.addproductEvent();
        }));
        shopping.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.doTask(9, `开始自动逛逛会场任务`, "shoppingActivityVos");
        }));
        goodShopping.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.doTask(16, `开始自动逛逛好物会场任务`, "shoppingActivityVos");
        }));
        funny.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.doTask(14, `开始自动好玩互动任务`, "shoppingActivityVos");
        }));
        others.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.doTask(15, `开始自动好玩互动任务`, "shoppingActivityVos");
        }));
        viewProduct.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.viewProductEvent();
        }));
        browser.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.browserEvent();
        }));
        steal.addEventListener('click', () => {
            utils_1.default.outPutLog(this.outputTextarea, `开始抢夺红包`);
            if (new Date().getHours() < 20) {
                alert('不在使用时间范围内！');
            }
            else {
                this.steal();
            }
        });
        collect.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, `开始收取金币`);
            yield this.collect();
        }));
        group.addEventListener('click', () => {
            this.group();
        });
        timer.addEventListener('click', () => {
            this.switchTimer();
        });
        helpGroup.addEventListener('click', () => {
            this.helpGroup();
        });
        help.addEventListener('click', () => {
            this.help();
        });
        invite.addEventListener('click', () => {
            this.getInvite();
        });
        assistGroup.addEventListener('click', () => {
            const link = utils_1._$('.groupLink');
            this.assistGroup(link.value);
        });
        assist.addEventListener('click', () => {
            const link = utils_1._$('.inviteLink');
            this.assist(link.value);
        });
        raise.addEventListener('click', () => {
            this.raise();
        });
        city.addEventListener('click', () => {
            utils_1.default.outPutLog(this.outputTextarea, `开始城市版图任务`);
            this.visit();
        });
        let e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
    }
    signInEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((reslove) => __awaiter(this, void 0, void 0, function* () {
                let taskVo = this.getTaskById(1);
                utils_1.default.outPutLog(this.outputTextarea, `开始每天签到任务`);
                if (!taskVo || taskVo["status"] == 2) {
                    utils_1.default.outPutLog(this.outputTextarea, `系统尚未分配到该任务或者任务已完成，先去完成其他任务吧~`);
                }
                else {
                    yield this.single(1, "1");
                }
                reslove();
            }));
        });
    }
    deliverEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((reslove) => __awaiter(this, void 0, void 0, function* () {
                let taskVo = this.getTaskById(24);
                utils_1.default.outPutLog(this.outputTextarea, `开始快递小哥送快递任务`);
                if (!taskVo || taskVo["status"] == 2) {
                    utils_1.default.outPutLog(this.outputTextarea, `系统尚未分配到该任务或者任务已完成，先去完成其他任务吧~`);
                }
                else {
                    yield this.multi(24, "1", 5);
                    yield this.updateTask();
                }
                reslove();
            }));
        });
    }
    addproductEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((reslove) => __awaiter(this, void 0, void 0, function* () {
                let taskVo = this.getTaskById(101);
                if (!taskVo || taskVo["status"] == 2) {
                    utils_1.default.outPutLog(this.outputTextarea, `系统尚未分配到该任务或者任务已完成，先去完成其他任务吧~`);
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `开始自动加购好物任务`);
                    yield this.add(taskVo["productInfoVos"], taskVo["taskId"]);
                    yield this.updateTask();
                }
                reslove();
            }));
        });
    }
    viewProductEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((reslove) => __awaiter(this, void 0, void 0, function* () {
                let taskVo = this.getTaskById(100);
                if (!taskVo || taskVo["status"] == 2) {
                    utils_1.default.outPutLog(this.outputTextarea, `系统尚未分配到该任务或者任务已完成，先去完成其他任务吧~`);
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, `开始自动浏览好物任务`);
                    yield this.view(taskVo["productInfoVos"], taskVo["taskId"]);
                    yield this.updateTask();
                }
                reslove();
            }));
        });
    }
    browserEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((reslove) => __awaiter(this, void 0, void 0, function* () {
                utils_1.default.outPutLog(this.outputTextarea, `开始自逛逛商店任务`);
                let taskVo = this.getTaskById(10);
                if (!taskVo || taskVo["status"] == 2) {
                    utils_1.default.outPutLog(this.outputTextarea, `系统尚未分配到该任务或者任务已完成，先去完成其他任务吧~`);
                }
                else {
                    yield this.browser(taskVo["browseShopVo"], taskVo["taskId"]);
                    yield this.updateTask();
                }
                reslove();
            }));
        });
    }
    doTask(taskId, title, key, once = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskVo = this.getTaskById(taskId);
            utils_1.default.outPutLog(this.outputTextarea, title);
            if (!taskVo || taskVo["status"] == 2) {
                utils_1.default.outPutLog(this.outputTextarea, `系统尚未分配到该任务或者任务已完成，先去完成其他任务吧~`);
            }
            else {
                yield this.send(taskVo[key], taskVo["taskId"]);
                yield this.updateTask();
            }
        });
    }
    autoDoTask() {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, '开始自动一键执行任务');
            yield this.updateTask();
            this.helpGroup();
            this.help();
            yield this.signInEvent();
            yield this.deliverEvent();
            yield this.browserEvent();
            yield this.viewProductEvent();
            yield this.doTask(3, `开始每天主会场任务`, "shoppingActivityVos");
            yield this.doTask(9, `开始自动逛逛会场任务`, "shoppingActivityVos");
            yield this.doTask(14, `开始自动好玩互动任务`, "shoppingActivityVos");
            yield this.doTask(16, `开始自动逛逛好物会场任务`, "shoppingActivityVos");
            yield this.doTask(15, `开始自动好玩互动任务`, "shoppingActivityVos");
            yield this.addproductEvent();
            yield this.visit();
            yield this.openTreasure();
            utils_1.default.outPutLog(this.outputTextarea, '所有任务已完成');
        });
    }
    getTaskById(id) {
        return this.taskVos.filter((value) => {
            return value['taskId'] == id;
        })[0];
    }
    single(taskId, itemId) {
        return new Promise(reslove => {
            let extraData = {
                id: "homeWorldCityCourierSmashId0",
                data: {
                    inviteId: "-1",
                    stealId: "-1",
                    rnd: this.getRnd(),
                    taskId: taskId
                }
            };
            let postData = { "taskId": taskId, "itemId": itemId, "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":${taskId},\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "shopSign": "" };
            utils_1.default.request("stall_collectScore", postData).then((res) => {
                utils_1.default.outPutLog(this.outputTextarea, res.data.bizMsg);
                reslove();
            }).catch(() => {
                reslove();
            });
        });
    }
    multi(taskId, itemId, count) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < count; i++) {
                yield this.single(taskId, itemId);
                yield utils_1.default.sleep(8000);
            }
        });
    }
    collect() {
        return new Promise(reslove => {
            let extraData = {
                id: "jmdd-react-smash_0",
                data: {
                    inviteId: "-1",
                    stealId: "-1",
                    rnd: this.getRnd(),
                    taskId: "collectProducedCoin"
                }
            };
            let postData = {
                "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":\"collectProducedCoin\",\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`
            };
            utils_1.default.request('stall_collectProduceScore', postData).then(res => {
                utils_1.default.outPutLog(this.outputTextarea, "领取金币:" + res.data.result.produceScore);
                reslove();
            });
        });
    }
    switchTimer() {
        if (this.switchFlag) {
            let span = +utils_1._$('.timerSpan').value;
            if (span <= 60000) {
                alert(`当前领取时间间隔太短了！建议调整一下！`);
                return;
            }
            utils_1.default.outPutLog(this.outputTextarea, "开启定时器");
            utils_1._$('.timer').innerText = '取消定时收取';
            this.switchtimer = window.setInterval(() => {
                this.collect();
            }, span);
        }
        else {
            utils_1.default.outPutLog(this.outputTextarea, "停止定时器");
            utils_1._$('.timer').innerText = '定时收取金币';
            window.clearInterval(this.switchtimer);
            this.timer = 0;
        }
        this.switchFlag = !this.switchFlag;
    }
    visit() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((next) => __awaiter(this, void 0, void 0, function* () {
                utils_1.default.request('stall_myShop', {}).then((res) => __awaiter(this, void 0, void 0, function* () {
                    let shopList = res.data.result.shopList;
                    let self = this, length = shopList.length;
                    for (let i = 0; i < length; i++) {
                        let city = shopList[i], shopSign = city['shopId'];
                        utils_1.default.outPutLog(self.outputTextarea, `任务城市进度：${i + 1}/${length}当前任务城市：${city['name']}`);
                        yield utils_1.default.sleep(3000);
                        let postData = { "shopSign": shopSign };
                        yield new Promise(resolve => {
                            utils_1.default.request('stall_getTaskDetail', postData).then((result) => __awaiter(this, void 0, void 0, function* () {
                                let taskVos = result.data.result.taskVos;
                                for (let j = 0; j < taskVos.length; j++) {
                                    let taskVo = taskVos[j];
                                    if (taskVo['status'] == 2) {
                                        utils_1.default.outPutLog(self.outputTextarea, `当前任务已完成!跳过~`);
                                    }
                                    else {
                                        yield new Promise(resolveFn => {
                                            utils_1.default.outPutLog(self.outputTextarea, `定时模拟等待任务结束!`);
                                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                                let extraData = {
                                                    id: "domainAutoSignSmashId",
                                                    data: {
                                                        inviteId: "-1",
                                                        stealId: "-1",
                                                        rnd: this.getRnd(),
                                                        taskId: taskVo['taskId']
                                                    }
                                                };
                                                let postData = { "taskId": taskVo['taskId'], "itemId": this.getItemIdByName(taskVo, taskVo['taskName'], taskVo['taskId']), "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":${taskVo['taskId']},\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "shopSign": shopSign };
                                                yield utils_1.default.request("stall_collectScore", postData).then(() => {
                                                    utils_1.default.outPutLog(self.outputTextarea, `当前任务已完成!`);
                                                    resolveFn();
                                                });
                                            }), (config_1.default.timeoutSpan + utils_1.default.random(300, 500)));
                                        });
                                    }
                                }
                                utils_1.default.outPutLog(self.outputTextarea, `任务已完成${i + 1}/${length}`);
                                resolve();
                            })).catch(() => {
                                resolve();
                            });
                        });
                    }
                    next();
                })).catch(() => {
                    next();
                });
            }));
        });
    }
    getVoNameById(id) {
        let voName = '';
        switch (id) {
            case 1:
                voName = 'simpleRecordInfoVo';
                break;
            case 2:
                voName = 'followShopVo';
                break;
            case 3:
                voName = 'shoppingActivityVos';
                break;
            default:
                voName = 'shoppingActivityVos';
                break;
        }
        return voName;
    }
    getItemIdByName(task, name, taskId) {
        let VoName = this.getVoNameById(taskId);
        if (taskId == 1) {
            return task[VoName]['itemId'];
        }
        else {
            let shop = task[VoName].filter((shopVo) => {
                return shopVo['shopName'] == task['taskName'] || shopVo['subtitle'] == task['taskName'];
            })[0];
            return shop ? shop['itemId'] : task[VoName][0]['itemId'];
        }
    }
    browser(data, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((next) => __awaiter(this, void 0, void 0, function* () {
                let self = this, length = data.length;
                for (let i = 0; i < length; i++) {
                    let extraData = {
                        id: "jmdd-react-smash_74",
                        data: {
                            inviteId: "-1",
                            stealId: "-1",
                            rnd: this.getRnd(),
                            taskId: taskId
                        }
                    };
                    let postData = { "taskId": taskId, "itemId": data[i]['itemId'], "actionType": "1", "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":${taskId},\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "shopSign": "" };
                    yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                        yield utils_1.default.sleep(config_1.default.timeoutSpan + utils_1.default.random(300, 500));
                        yield utils_1.default.request("stall_collectScore", postData).then(() => {
                            utils_1.default.outPutLog(self.outputTextarea, `模拟关注店铺中!`);
                            utils_1.default.request('followShop', { "shopId": data[i]['shopId'], "follow": true, "type": "0" }).then(() => __awaiter(this, void 0, void 0, function* () {
                                utils_1.default.outPutLog(self.outputTextarea, `等待8s任务完成后再领取奖励中`);
                                yield utils_1.default.sleep(8000 + utils_1.default.random(300, 500));
                                let extraData = {
                                    id: "jmdd-react-smash_74",
                                    data: {
                                        inviteId: "-1",
                                        stealId: "-1",
                                        rnd: this.getRnd(),
                                        taskId: taskId
                                    }
                                };
                                let postData = { "taskId": taskId, "itemId": data[i]['itemId'], "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":${taskId},\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "shopSign": "" };
                                utils_1.default.request('stall_collectScore', postData).then((res) => {
                                    var _a, _b, _c;
                                    utils_1.default.outPutLog(self.outputTextarea, `${(_c = (_b = (_a = res) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.result) === null || _c === void 0 ? void 0 : _c.successToast}`);
                                    utils_1.default.outPutLog(self.outputTextarea, `操作成功！任务序号：${i + 1}/${length}`);
                                    if (i + 1 >= length) {
                                        utils_1.default.outPutLog(self.outputTextarea, `当前任务已完成!`);
                                    }
                                    resolve();
                                }).catch(() => {
                                    resolve();
                                });
                            }));
                        }).catch(() => {
                            resolve();
                        });
                    }));
                }
                next();
            }));
        });
    }
    view(data, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((next) => __awaiter(this, void 0, void 0, function* () {
                let length = data.length;
                for (let i = 0; i < length; i++) {
                    let postData = { "taskId": taskId };
                    yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                        yield utils_1.default.sleep(config_1.default.timeoutSpan + utils_1.default.random(300, 500));
                        yield utils_1.default.request("stall_getFeedDetail", postData).then((res) => __awaiter(this, void 0, void 0, function* () {
                            utils_1.default.outPutLog(this.outputTextarea, `模拟浏览商品中!`);
                            let totalCounter = 5;
                            for (let j = 0; j < totalCounter; j++) {
                                let productInfoVos = res.data.result.viewProductVos[i].productInfoVos, productInfoVo = productInfoVos[j], taskId = res.data.result.viewProductVos[i]['taskId'];
                                yield new Promise((resolveFn) => __awaiter(this, void 0, void 0, function* () {
                                    yield utils_1.default.sleep(5000 + utils_1.default.random(300, 500));
                                    let extraData = {
                                        id: "jmdd-react-smash_77",
                                        data: {
                                            inviteId: "-1",
                                            stealId: "-1",
                                            rnd: this.getRnd(),
                                            taskId: taskId
                                        }
                                    };
                                    let postData = { "taskId": taskId, "itemId": productInfoVo['itemId'], "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":${taskId},\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "shopSign": "" };
                                    utils_1.default.request('stall_collectScore', postData).then(() => {
                                        resolveFn();
                                        utils_1.default.outPutLog(this.outputTextarea, `浏览商品完成!`);
                                        if (j >= totalCounter - 1) {
                                            utils_1.default.outPutLog(this.outputTextarea, `操作成功！任务序号：${i + 1}/${length}`);
                                            if (i + 1 >= length) {
                                                utils_1.default.outPutLog(this.outputTextarea, `当前任务已完成!`);
                                            }
                                            resolve();
                                        }
                                    }).catch(() => {
                                        resolveFn();
                                    });
                                }));
                            }
                        })).catch(() => {
                            resolve();
                        });
                    }));
                }
                next();
            }));
        });
    }
    add(data, taskId) {
        return new Promise((next) => __awaiter(this, void 0, void 0, function* () {
            let self = this, length = data.length;
            for (let i = 0; i < length; i++) {
                let postData = { "taskId": taskId };
                yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    yield utils_1.default.sleep(config_1.default.timeoutSpan + utils_1.default.random(300, 500));
                    yield utils_1.default.request("stall_getFeedDetail", postData).then((res) => __awaiter(this, void 0, void 0, function* () {
                        utils_1.default.outPutLog(self.outputTextarea, `模拟加购商品中!`);
                        let totalCounter = 5;
                        for (let j = 0; j < totalCounter; j++) {
                            let productInfoVos = res.data.result.addProductVos[i].productInfoVos, productInfoVo = productInfoVos[j], taskId = res.data.result.addProductVos[i]['taskId'];
                            yield new Promise((resolveFn) => __awaiter(this, void 0, void 0, function* () {
                                yield utils_1.default.sleep(5000 + utils_1.default.random(300, 500));
                                let extraData = {
                                    id: "jmdd-react-smash_174",
                                    data: {
                                        inviteId: "-1",
                                        stealId: "-1",
                                        rnd: this.getRnd(),
                                        taskId: taskId
                                    }
                                };
                                let postData = { "taskId": taskId, "itemId": productInfoVo['itemId'], "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":${taskId},\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "shopSign": "" };
                                utils_1.default.request('stall_collectScore', postData).then(() => {
                                    resolveFn();
                                    utils_1.default.outPutLog(self.outputTextarea, `加购商品完成!`);
                                    if (j >= totalCounter - 1) {
                                        utils_1.default.outPutLog(self.outputTextarea, `操作成功！任务序号：${i + 1}/${length}`);
                                        if (i + 1 >= length) {
                                            utils_1.default.outPutLog(self.outputTextarea, `当前任务已完成!`);
                                        }
                                        resolve();
                                    }
                                }).catch(() => {
                                    resolveFn();
                                });
                            }));
                        }
                    })).catch(() => {
                        resolve();
                    });
                }));
            }
            next();
        }));
    }
    steal() {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.default.request('stall_pk_getStealForms', {}).then((res) => __awaiter(this, void 0, void 0, function* () {
                let stealGroups = res.data.result.stealGroups;
                let self = this, length = stealGroups.length;
                for (let i = 0; i < length; i++) {
                    let steal = stealGroups[i];
                    let extraData = {
                        id: "jmdd-react-smash_74",
                        data: {
                            inviteId: "-1",
                            stealId: steal['id'],
                            rnd: this.getRnd(),
                            taskId: `BUSINESSID_${this.getRnd()}`
                        }
                    };
                    let postData = { "stealId": steal['id'], "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":\"${extraData.data.taskId}\",\"rnd\":\"${extraData.data.rnd}\",\"inviteId\":\"-1\",\"stealId\":\"${steal['id']}\"},\"secretp\":\"${this.secretp}\"}` };
                    yield new Promise(resolve => {
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            utils_1.default.request("stall_pk_doSteal", postData).then((res) => __awaiter(this, void 0, void 0, function* () {
                                utils_1.default.outPutLog(self.outputTextarea, `夺取红包中!`);
                                utils_1.default.outPutLog(self.outputTextarea, res.data.bizMsg);
                                resolve();
                            }));
                        }), (5000 + utils_1.default.random(300, 500)));
                    });
                }
                utils_1.default.outPutLog(self.outputTextarea, '已偷取所有可以偷取的用户的红包');
            }));
        });
    }
    openTreasure() {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, '开始自动寻宝箱领金币任务');
            utils_1.default.request('qryCompositeMaterials', { "qryParam": "[{\"type\":\"advertGroup\",\"mapTo\":\"homeFeedBanner\",\"id\":\"04891279\"},{\"type\":\"advertGroup\",\"mapTo\":\"homeBottomBanner\",\"id\":\"04888981\"},{\"type\":\"advertGroup\",\"mapTo\":\"homeBottomBanner2\",\"id\":\"04958033\"}]", "activityId": "4SJUHwGdUQYgg94PFzjZZbGZRjDd", "pageId": "", "reqSrc": "", "applyKey": "raiders_venue_lite" }).then((res) => __awaiter(this, void 0, void 0, function* () {
                let homeBottomBanner = res.data.homeBottomBanner2.list;
                for (let i = 0; i < 10; i++) {
                    let shop = homeBottomBanner[i];
                    let extraData = {
                        id: "domainAutoSignSmashId",
                        data: {
                            inviteId: "-1",
                            stealId: "-1",
                            rnd: this.getRnd(),
                            taskId: shop['link']
                        }
                    };
                    let postData = { "shopSign": shop['link'], "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":\"${shop['link']}\",\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}` };
                    yield new Promise(resolve => {
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            utils_1.default.request("stall_shopSignInWrite", postData).then((res) => __awaiter(this, void 0, void 0, function* () {
                                utils_1.default.outPutLog(this.outputTextarea, `(${i + 1}/10)寻宝箱领金币中`);
                                utils_1.default.outPutLog(this.outputTextarea, res.data.bizMsg);
                                resolve();
                            }));
                        }), (5000 + utils_1.default.random(300, 500)));
                    });
                }
                utils_1.default.outPutLog(this.outputTextarea, '已领取所有可以寻宝箱的金币');
            }));
        });
    }
    send(data, taskId, once = false) {
        return new Promise((next) => __awaiter(this, void 0, void 0, function* () {
            let self = this, length = data.length;
            for (let i = 0; i < length; i++) {
                yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    yield utils_1.default.sleep(config_1.default.timeoutSpan + utils_1.default.random(300, 500));
                    let extraData = {
                        id: "jmdd-react-smash_73",
                        data: {
                            inviteId: "-1",
                            stealId: "-1",
                            rnd: this.getRnd(),
                            taskId: taskId
                        }
                    };
                    let postData = { "taskId": taskId, "itemId": data[i]['itemId'], "actionType": "1", "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":${taskId},\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "shopSign": "" };
                    yield utils_1.default.request('stall_collectScore', postData).then((res) => __awaiter(this, void 0, void 0, function* () {
                        if (once) { //立即完成
                            resolve();
                        }
                        else {
                            if (res.data.result) {
                                yield utils_1.default.sleep(8000);
                                utils_1.default.outPutLog(self.outputTextarea, `等待8s任务完成后再领取奖励中`);
                                utils_1.default.request('qryViewkitCallbackResult', { "clientLanguage": "zh", "dataSource": "newshortAward", "method": "getTaskAward", "reqParams": `{\"taskToken\":\"${res.data.result.taskToken}\"}`, "taskSDKVersion": "1.0.3", "vkVersion": "1.0.0" }).then(() => {
                                    utils_1.default.outPutLog(self.outputTextarea, `操作成功！任务序号：${i + 1}/${length}`);
                                    if (i + 1 >= length) {
                                        utils_1.default.outPutLog(self.outputTextarea, `当前任务已完成!`);
                                    }
                                    resolve();
                                }).catch(() => {
                                    resolve();
                                });
                            }
                            else {
                                utils_1.default.outPutLog(self.outputTextarea, `操作成功！任务序号：${i + 1}/${length}`);
                                resolve();
                            }
                        }
                    })).catch(() => {
                        resolve();
                    });
                }));
            }
            next();
        }));
    }
    raise() {
        utils_1.default.request('stall_raise').then((res) => {
            if (res.data.bizCode == 0) {
                utils_1.default.outPutLog(this.outputTextarea, `操作成功！获取奖励如下:${JSON.stringify(res.data.result.levelUpAward)}`);
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `操作失败！${res.data.bizMsg}`);
            }
        });
    }
    getInvite() {
        utils_1.default.request('stall_getTaskDetail', { "shopSign": "" }).then((res) => {
            const inviteId = res.data.result.inviteId.replace("#/", "");
            if (inviteId) {
                utils_1.default.outPutLog(this.outputTextarea, `获取到邀请地址:${this.inviteUrl}${inviteId}`);
                utils_1.default.copyText(`${this.inviteUrl}${inviteId}`);
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `数据异常`);
            }
        });
    }
    help() {
        utils_1.default.outPutLog(this.outputTextarea, `操作成功！谢谢你的助力！`);
        let InviteIdArr = [
            '2YbXmX7Kla3k9gGb6yPYYofPF9MRBzEqhb6qz9ahKg',
            '2ZzBmkDDlbfy9T-ScMEdLdPvdqRU9KDJdhTj-t1jUuzmATGdKow',
            'T0kkDJUmGX0Sdet46x7KGSqKNI-klg18GVA8f5s',
            'DgxlSNRnRyNRPa01oWqgYGmh6fowp7KSdvYh_P9xeptD0UnvN0zMq6o',
            'Vl4ISd5jEiEFcvpmp26qZav87uKzPCWcwKvhRo7eBzfAk5ohP8TK9SY',
            "f182DIcnSSUYbNhh0B7RYr5TIRvyOQ",
            "CwllT95jQidJIakxpWehLWP9nOSuyQ3OUHt8DKuuejFiiyA6WyQ"
        ];
        this.assist(this.inviteUrl + InviteIdArr[utils_1.default.random(0, InviteIdArr.length - 1)]);
    }
    helpGroup(flag = true) {
        if (new Date().getHours() >= 9) {
            let InviteIdArr = [
                "标记",
            ];
            if (InviteIdArr.length == 0 || InviteIdArr[0] == "标记") {
                return;
            }
            let inviteUrl = this.groupInvitedUrl + InviteIdArr[utils_1.default.random(0, InviteIdArr.length - 1)];
            this.assistGroup(inviteUrl, flag);
        }
    }
    group() {
        utils_1.default.request('stall_pk_getHomeData').then((res) => {
            const groupAssistInviteId = res.data.result.groupInfo.groupAssistInviteId;
            if (groupAssistInviteId) {
                utils_1.default.outPutLog(this.outputTextarea, `获取到邀请地址:${this.groupInvitedUrl}${groupAssistInviteId}`);
                utils_1.default.copyText(`${this.groupInvitedUrl}${groupAssistInviteId}`);
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `请先创建商圈！`);
            }
        });
    }
    assistGroup(url, flag = true) {
        if (!url || !url.includes('inviteId')) {
            alert("请输入要助力的商圈分享链接或输入正确的商圈分享地址！");
            return;
        }
        const inviteId = utils_1.default.getSearchString(url, "inviteId").replace("#/", "");
        let extraData = {
            id: "jmdd-react-smash_0",
            data: {
                inviteId: inviteId,
                stealId: "-1",
                rnd: this.getRnd(),
                taskId: `BUSINESSID_${this.getRnd()}`
            }
        };
        let postData = { "confirmFlag": 1, "inviteId": `${inviteId}`, "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":\"${extraData['data']['taskId']}\",\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"${inviteId}\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}` };
        utils_1.default.request('stall_pk_assistGroup', postData)
            .then((res) => {
            if (flag) {
                utils_1.default.outPutLog(this.outputTextarea, `操作成功！谢谢你为我的商圈助力！`);
                utils_1.default.outPutLog(this.outputTextarea, `助力结果：${res.data.bizMsg}`);
            }
        });
    }
    assist(url) {
        if (!url && !url.includes('inviteId')) {
            alert("请输入要助力的分享链接或输入正确的分享地址！");
            return;
        }
        const inviteId = utils_1.default.getSearchString(url, "inviteId").replace("#/", "");
        utils_1.default.request('stall_getHomeData', { "inviteId": inviteId }).then((res) => {
            let extraData = {
                id: "jmdd-react-smash_0",
                data: {
                    inviteId: inviteId,
                    stealId: "-1",
                    rnd: this.getRnd(),
                    taskId: `2`
                }
            };
            const itemId = res.data.result.homeMainInfo.guestInfo.itemId;
            let postData = { "taskId": "2", "itemId": itemId, "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":\"2\",\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"${inviteId}\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "inviteId": inviteId };
            utils_1.default.request('stall_collectScore', postData).then((res) => {
                utils_1.default.outPutLog(this.outputTextarea, `助力结果：${res.data.bizMsg}`);
            });
        });
    }
    getExtraData(args) {
        return JSON.stringify(Object.assign(smashUtils.get_info(args)['data'], { "buttonid": args['id'], "sceneid": "homePageh5", "appid": "50073" }));
    }
    getRnd() {
        return Math.floor(1e6 * Math.random()).toString();
    }
}
exports.default = Stall;

},{"../config/config":5,"../utils/utils":30}],3:[function(require,module,exports){
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
const config_1 = require("../config/config");
const utils_1 = require("../utils/utils");
class StarMall {
    constructor(containerDiv, outputTextarea) {
        this.data = [];
        this.token = "jd6df03bd53f0f292f";
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.default.clientPost("mcxhd_starmall_getStarShopPage", { "token": this.token }).then((res) => {
                let shopId = res.result.shopId;
                this.doTask(shopId);
            });
        });
    }
    doTask(shopId) {
        utils_1.default.clientPost("mcxhd_starmall_taskList", { "shopId": shopId, "token": this.token }).then((res) => __awaiter(this, void 0, void 0, function* () {
            this.data = res.result.tasks;
            yield utils_1.default.sleep(config_1.default.timeoutSpan);
            utils_1.default.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[0].subItem[0].itemId, "taskType": "1", "shopId": shopId, "token": this.token }).then((json) => { utils_1.default.outPutLog(this.outputTextarea, json.retMessage); });
            yield utils_1.default.sleep(config_1.default.timeoutSpan);
            utils_1.default.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[1].subItem[0].itemId, "taskType": "2", "shopId": shopId, "token": this.token }).then((json) => { utils_1.default.outPutLog(this.outputTextarea, json.retMessage); });
            yield utils_1.default.sleep(config_1.default.timeoutSpan);
            utils_1.default.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[2].subItem[0].itemId, "taskType": "4", "shopId": shopId, "token": this.token }).then((json) => { utils_1.default.outPutLog(this.outputTextarea, json.retMessage); });
            yield utils_1.default.sleep(config_1.default.timeoutSpan);
            utils_1.default.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[2].subItem[1].itemId, "taskType": "4", "shopId": shopId, "token": this.token }).then((json) => { utils_1.default.outPutLog(this.outputTextarea, json.retMessage); });
            yield utils_1.default.sleep(config_1.default.timeoutSpan);
            utils_1.default.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[2].subItem[2].itemId, "taskType": "4", "shopId": shopId, "token": this.token }).then((json) => { utils_1.default.outPutLog(this.outputTextarea, json.retMessage); });
            yield utils_1.default.sleep(config_1.default.timeoutSpan);
            utils_1.default.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[2].subItem[3].itemId, "taskType": "4", "shopId": shopId, "token": this.token }).then((json) => { utils_1.default.outPutLog(this.outputTextarea, json.retMessage); });
            yield utils_1.default.sleep(config_1.default.timeoutSpan);
            utils_1.default.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[2].subItem[4].itemId, "taskType": "4", "shopId": shopId, "token": this.token }).then((json) => { utils_1.default.outPutLog(this.outputTextarea, json.retMessage); });
            yield utils_1.default.sleep(config_1.default.timeoutSpan);
            utils_1.default.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[3].subItem[0].itemId, "taskType": "4", "shopId": shopId, "token": this.token }).then((json) => { utils_1.default.outPutLog(this.outputTextarea, json.retMessage); });
            yield utils_1.default.sleep(config_1.default.timeoutSpan);
            utils_1.default.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[4].subItem[0].itemId, "taskType": "6", "shopId": shopId, "token": this.token }).then((json) => { utils_1.default.outPutLog(this.outputTextarea, json.retMessage); });
            yield utils_1.default.sleep(config_1.default.timeoutSpan);
            utils_1.default.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[5].subItem[0].itemId, "taskType": "5", "shopId": shopId, "token": this.token }).then((json) => { utils_1.default.outPutLog(this.outputTextarea, json.retMessage); });
            yield utils_1.default.sleep(config_1.default.timeoutSpan);
            utils_1.default.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[6].subItem[0].itemId, "taskType": "5", "shopId": shopId, "token": this.token }).then((json) => { utils_1.default.outPutLog(this.outputTextarea, json.retMessage); });
            yield utils_1.default.sleep(config_1.default.timeoutSpan);
            utils_1.default.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[7].subItem[0].itemId, "taskType": "3", "shopId": shopId, "token": this.token }).then((json) => { utils_1.default.outPutLog(this.outputTextarea, json.retMessage); });
            yield utils_1.default.sleep(config_1.default.timeoutSpan);
            utils_1.default.outPutLog(this.outputTextarea, '所有任务已完成~');
        }));
    }
    list() {
        const content = document.createElement("div");
        content.innerHTML = `<h1 style="color:red;font-weight: 700;font-size: 18px;">本活动页脚本自动执行,请留意控制台输出</h1>`;
        this.container.appendChild(content);
    }
}
exports.default = StarMall;

},{"../config/config":5,"../utils/utils":30}],4:[function(require,module,exports){
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
class TimeMachine {
    constructor(containerDiv, outputTextarea) {
        this.data = [];
        this.taskVos = [];
        this.timer = 1000;
        this.plusAdvertList = [];
        this.t1AdvertList = [];
        this.nearbyShopList = [];
        this.sendHomeShopList = [];
        this.inviteUrl = 'https://h5.m.jd.com/babelDiy/Zeus/3DDunaJMLDamrmGwu73QbqtGtbX1/index.html?babelChannel=ttt4&inviteId=';
        this.ePin = '';
        this.position = { lat: "22.578764099999997", lng: "113.9463329" };
        this.switchFlag = true;
        this.switchtimer = 0;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            // alert('请允许浏览器获取地理位置扩展任务');
            // await this.getLocation().then((location) => {
            //     console.log(location);
            // });
            // console.log(this.position);
            Promise.all([
                utils_1.default.publicRequest("bc_getHome", this.position),
                this.updateTask(),
            ]).then(([homeData, taskData]) => Promise.all([homeData, taskData])).then(([homeData]) => {
                let homeAdvertVO = homeData.data.result.homeAdvertVO;
                this.plusAdvertList = homeAdvertVO.plusAdvertList;
                this.t1AdvertList = homeAdvertVO.t1AdvertList;
                this.nearbyShopList = homeAdvertVO.nearbyShopList;
                this.sendHomeShopList = homeAdvertVO.sendHomeShopList;
                this.ePin = homeData.data.result.ePin;
                this.list();
            });
        });
    }
    updateTask() {
        return new Promise(reslove => {
            utils_1.default.publicRequest("bc_taskList", this.position).then((res) => {
                this.data = res.data.result;
                if (this.data) {
                    this.taskVos = this.data.taskList;
                    let value = '任务数据更新成功';
                    for (let j = 0; j < this.taskVos.length; j++) {
                        value += `\n${this.taskVos[j]["mainTitle"]}：${this.taskVos[j]["isCompleted"] ? "已完成" : "未完成"}(${this.taskVos[j]["taskProgress"]})`;
                    }
                    utils_1.default.outPutLog(this.outputTextarea, value);
                }
                reslove();
            });
        });
    }
    list() {
        const content = document.createElement("div");
        let msg = `
        <div style="margin:10px;">
        <button class="help" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">帮作者助力</button>
        <button class="invite" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">获取助力链接</button>
        <input class="inviteLink" type="text" style="width:80vw;height: 25px;font-size:14px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;" placeholder="请输入需要助力的分享链接">
        <button class="assist" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">为TA助力</button>
        <button class="raise" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">寻找碎片</button>
        <button class="collect" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">领取能量</button>
        <input class="timerSpan" type="text" style="width:80vw;height: 25px;font-size:14px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;" placeholder="请输入定时时间间隔（毫秒）">
        <button class="timer" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">定时收取能量</button>
        <button class="auto" style="width: 120px;height:30px;background-color: red;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">一键完成任务</button>
        <hr>
        <p style="text-align:center;font-weight:700;color:red;">一键完成任务将会默认为作者助力<br>操作的时候不要执行其他任务</p>
        <hr>
        <button class="signIn" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">每天签到</button>
        <button class="shopping_super" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">逛“超级”品牌</button>
        <button class="shopping_big" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">逛“大牌”品牌</button>
        <button class="shopping" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">逛"精选"品牌店铺</button>
        <button class="place" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">逛逛会场</button>
        <button class="market" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">逛同城好店</button>
        <button class="funny" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">体验热爱空间</button>
        <button class="visit" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">采集能量包</button>
        <button class="play" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">套圈圈领能量</button>
        </div>`;
        content.innerHTML = msg;
        this.container.appendChild(content);
        const signIn = utils_1._$('.signIn'), shopping_big = utils_1._$('.shopping_big'), help = utils_1._$('.help'), funny = utils_1._$('.funny'), collect = utils_1._$('.collect'), place = utils_1._$('.place'), shopping = utils_1._$('.shopping'), shopping_super = utils_1._$('.shopping_super'), invite = utils_1._$('.invite'), timer = utils_1._$('.timer'), raise = utils_1._$('.raise'), visit = utils_1._$('.visit'), play = utils_1._$('.play'), assist = utils_1._$('.assist'), market = utils_1._$('.market'), auto = utils_1._$('.auto');
        auto.addEventListener('click', () => {
            this.autoDoTask();
        });
        signIn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.signInEvent();
        }));
        shopping.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.doTask(3, `开始逛“精选”品牌店铺任务`);
        }));
        market.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.doTask(4, `开始逛同城好店任务`);
        }));
        funny.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.doTask(5, `开始体验AR热爱空间任务`);
        }));
        place.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.doTask(6, `开始逛11.11精选会场任务`);
        }));
        shopping_super.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.doTask(1, `开始逛“超级”品牌店铺任务`);
        }));
        shopping_big.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.doTask(2, `开始逛“大牌”品牌店铺任务`);
        }));
        visit.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.doTask(7, `开始浏览会场采集能量包任务`);
        }));
        play.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, `开始套圈圈游戏任务`);
            yield this.repeatTask({}, 10, 'bc_getGameReward', { "score": 200 });
        }));
        collect.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.collect();
        }));
        timer.addEventListener('click', () => {
            this.switchTimer();
        });
        help.addEventListener('click', () => {
            this.help();
        });
        invite.addEventListener('click', () => {
            this.getInvite();
        });
        assist.addEventListener('click', () => {
            const link = utils_1._$('.inviteLink');
            this.assist(link.value);
        });
        raise.addEventListener('click', () => {
            this.raise();
        });
    }
    signInEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, `开始签到任务`);
            return new Promise((reslove) => __awaiter(this, void 0, void 0, function* () {
                let postData = { "taskType": 0 };
                yield utils_1.default.publicRequest('bc_doTask', postData).then((res) => __awaiter(this, void 0, void 0, function* () {
                    if (res.data.result) {
                        utils_1.default.outPutLog(this.outputTextarea, `操作成功！获得能量${res.data.result.energy || res.data.result.rewardEnergy}`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `${res.data.bizMsg}`);
                    }
                }));
                reslove();
            }));
        });
    }
    doTask(taskId, title) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskVo = this.getTaskById(taskId);
            utils_1.default.outPutLog(this.outputTextarea, title);
            if (!taskVo || taskVo["isCompleted"]) {
                utils_1.default.outPutLog(this.outputTextarea, `任务已完成，先去完成其他任务吧~`);
            }
            else {
                if (taskId == 1) {
                    yield this.singleDoTask(taskVo, this.t1AdvertList);
                }
                else if (taskId == 2) {
                    yield this.singleDoTask(taskVo, this.t1AdvertList);
                }
                else if (taskId == 3) {
                    yield this.repeatTask(taskVo, taskVo.timesLimit);
                }
                else if (taskId == 4) {
                    yield this.singleDoTask(taskVo, this.nearbyShopList);
                }
                else if (taskId == 5) {
                    yield this.repeatTask(taskVo, taskVo.timesLimit);
                }
                else if (taskId == 6) {
                    yield this.repeatTask(taskVo, taskVo.timesLimit);
                }
                else if (taskId == 7) {
                    yield this.doSubTask(taskVo);
                }
            }
        });
    }
    autoDoTask() {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, '开始自动一键执行任务');
            yield this.signInEvent();
            yield this.doTask(3, `开始逛“精选”品牌店铺任务`);
            yield this.doTask(5, `开始体验AR热爱空间任务`);
            yield this.doTask(6, `开始逛11.11精选会场任务`);
            yield this.doTask(1, `开始逛“超级”品牌店铺任务`);
            yield this.doTask(2, `开始逛“大牌”品牌店铺任务`);
            yield this.doTask(7, `开始浏览会场采集能量包任务`);
            yield this.doTask(4, `开始逛同城好店任务`);
            yield this.updateTask();
            utils_1.default.outPutLog(this.outputTextarea, `开始套圈圈游戏任务`);
            yield this.repeatTask({}, 10, 'bc_getGameReward', { "score": 200 });
            utils_1.default.outPutLog(this.outputTextarea, '所有任务已完成');
        });
    }
    getTaskById(id) {
        return this.taskVos.filter((value) => {
            return value['taskType'] == id;
        })[0];
    }
    collect() {
        return new Promise(reslove => {
            utils_1.default.publicRequest('bc_collectEnergyBall', {}).then(res => {
                if (res.data.success) {
                    utils_1.default.outPutLog(this.outputTextarea, "领取能量:" + res.data.result.energy);
                }
                else {
                    utils_1.default.outPutLog(this.outputTextarea, "领取能量:" + res.data.bizMsg);
                }
                reslove();
            });
        });
    }
    switchTimer() {
        if (this.switchFlag) {
            let span = +utils_1._$('.timerSpan').value;
            if (span <= 60000) {
                alert(`当前领取时间间隔太短了！建议调整一下！`);
                return;
            }
            utils_1.default.outPutLog(this.outputTextarea, "开启定时器");
            utils_1._$('.timer').innerText = '取消定时收取';
            this.switchtimer = window.setInterval(() => {
                this.collect();
            }, span);
        }
        else {
            utils_1.default.outPutLog(this.outputTextarea, "停止定时器");
            utils_1._$('.timer').innerText = '定时收取能量';
            window.clearInterval(this.switchtimer);
            this.timer = 0;
        }
        this.switchFlag = !this.switchFlag;
    }
    getVoNameById(id) {
        let voName = '';
        switch (id) {
            case 1:
                voName = 'simpleRecordInfoVo';
                break;
            case 2:
                voName = 'followShopVo';
                break;
            case 3:
                voName = 'shoppingActivityVos';
                break;
            default:
                voName = 'shoppingActivityVos';
                break;
        }
        return voName;
    }
    getItemIdByName(task, name, taskId) {
        let VoName = this.getVoNameById(taskId);
        if (taskId == 1) {
            return task[VoName]['itemId'];
        }
        else {
            let shop = task[VoName].filter((shopVo) => {
                return shopVo['shopName'] == task['taskName'] || shopVo['subtitle'] == task['taskName'];
            })[0];
            return shop ? shop['itemId'] : task[VoName][0]['itemId'];
        }
    }
    singleDoTask(data, args) {
        return new Promise((next) => __awaiter(this, void 0, void 0, function* () {
            let length = data.timesLimit;
            for (let i = 0; i < length; i++) {
                yield utils_1.default.sleep(config_1.default.timeoutSpan + utils_1.default.random(300, 500));
                let item = args[i];
                let postData = {};
                if (data.taskType == 4) {
                    let type = 1;
                    if (i >= 4) {
                        type = 2;
                    }
                    postData = { "taskType": data['taskType'], "storeId": item['storeid'], "storeType": type, "lat": this.position.lat };
                }
                else {
                    postData = { "taskType": data['taskType'], "shopId": item['comments0'] };
                }
                yield utils_1.default.publicRequest('bc_doTask', postData).then((res) => __awaiter(this, void 0, void 0, function* () {
                    utils_1.default.outPutLog(this.outputTextarea, `操作成功！任务序号：${i + 1}/${length}`);
                    if (res.data.result) {
                        utils_1.default.outPutLog(this.outputTextarea, `操作成功！获得能量${res.data.result.energy}`);
                    }
                })).catch(() => {
                    next();
                });
            }
            next();
        }));
    }
    doSubTask(data) {
        return new Promise((next) => __awaiter(this, void 0, void 0, function* () {
            let subTaskList = data.subTaskList;
            let length = subTaskList.length;
            let ballNos = ['A', 'B', 'C'];
            for (let i = 0; i < length; i++) {
                let task = subTaskList[i];
                for (let j = 0; j < task.timesLimit; j++) {
                    yield utils_1.default.sleep(config_1.default.timeoutSpan + utils_1.default.random(300, 500));
                    let postData = { "taskType": data.taskType, "channel": task.channel, "babelChannel": "ttt1", "ballno": ballNos[j] };
                    yield utils_1.default.publicRequest('bc_doTask', postData).then((res) => __awaiter(this, void 0, void 0, function* () {
                        if (res.data.result) {
                            utils_1.default.outPutLog(this.outputTextarea, `操作成功！获得能量${res.data.result.energy}`);
                        }
                    }));
                }
            }
            next();
        }));
    }
    repeatTask(data, times, url, args) {
        return new Promise((next) => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < times; i++) {
                yield utils_1.default.sleep(config_1.default.timeoutSpan + utils_1.default.random(300, 500));
                let postData = args || { "taskType": data['taskType'] };
                yield utils_1.default.publicRequest(url || 'bc_doTask', postData).then((res) => __awaiter(this, void 0, void 0, function* () {
                    utils_1.default.outPutLog(this.outputTextarea, `操作成功！任务序号：${i + 1}/${times}`);
                    if (res.data.result) {
                        utils_1.default.outPutLog(this.outputTextarea, `操作成功！获得能量${res.data.result.energy || res.data.result.rewardEnergy}`);
                    }
                }));
            }
            next();
        }));
    }
    raise() {
        utils_1.default.publicRequest('bc_fragmentCharge').then((res) => {
            if (res.data.bizCode == 0) {
                utils_1.default.outPutLog(this.outputTextarea, `操作成功！返回信息:${JSON.stringify(res.data.result)}`);
            }
            else {
                utils_1.default.outPutLog(this.outputTextarea, `操作成功！返回信息:${JSON.stringify(res.data.bizMsg)}`);
            }
        });
    }
    getInvite() {
        utils_1.default.outPutLog(this.outputTextarea, `获取到邀请地址:${this.inviteUrl}${this.ePin}`);
        utils_1.default.copyText(`${this.inviteUrl}${this.ePin}`);
    }
    help() {
        utils_1.default.outPutLog(this.outputTextarea, `操作成功！谢谢你的助力！`);
        let InviteIdArr = [
            'sfV-pa1Vgoaknh9Vq3k5bw',
            'Zn_MdAf4UAgRVbP7',
            '8LA_4ewU3Njn1lk',
            'ZmXadznxUBIHVo3yetKE'
        ];
        this.assist(this.inviteUrl + InviteIdArr[utils_1.default.random(0, InviteIdArr.length - 1)]);
    }
    assist(url) {
        if (!url && !url.includes('inviteId')) {
            alert("请输入要助力的分享链接或输入正确的分享地址！");
            return;
        }
        const inviteId = utils_1.default.getSearchString(url, "inviteId").replace("#/", "");
        utils_1.default.publicRequest('bc_doTask', { "taskType": 8, "invitePin": inviteId }).then((res) => {
            utils_1.default.outPutLog(this.outputTextarea, `助力结果：${res.data.bizMsg}`);
        });
    }
    getExtraData(args) {
        return JSON.stringify({ "buttonid": args['id'], "sceneid": "homePageh5", "appid": "50073" });
    }
    getRnd() {
        return Math.floor(1e6 * Math.random()).toString();
    }
    getLocation() {
        return new Promise((reslove) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            }
            else {
                alert("浏览器不支持地理定位。");
                reslove();
            }
            function showPosition(position) {
                var lat = position.coords.latitude; //纬度
                var lag = position.coords.longitude; //经度
                reslove({ lat, lag });
            }
            function showError(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("定位失败,用户拒绝请求地理定位");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("定位失败,位置信息是不可用");
                        break;
                    case error.TIMEOUT:
                        alert("定位失败,请求获取用户位置超时");
                        break;
                    case error.UNKNOWN_ERROR:
                        alert("定位失败,定位系统失效");
                        break;
                }
                reslove();
            }
        });
    }
}
exports.default = TimeMachine;

},{"../config/config":5,"../utils/utils":30}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
}
exports.default = Config;
Config.title = "京东领券助手";
Config.version = "v0.4.5";
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"../config/config":5,"../utils/fetch-jsonp":29,"../utils/utils":30,"./CookieHandler":6}],8:[function(require,module,exports){
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

},{"../utils/utils":30}],9:[function(require,module,exports){
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

},{"../utils/utils":30}],10:[function(require,module,exports){
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

},{"../utils/utils":30}],11:[function(require,module,exports){
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

},{"../utils/fetch-jsonp":29,"../utils/utils":30}],12:[function(require,module,exports){
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

},{"../utils/utils":30}],13:[function(require,module,exports){
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

},{"../utils/utils":30}],14:[function(require,module,exports){
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

},{"../utils/utils":30}],15:[function(require,module,exports){
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

},{"../utils/utils":30}],16:[function(require,module,exports){
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

},{"../utils/utils":30}],17:[function(require,module,exports){
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

},{"../utils/utils":30}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class ReceiveSeckillReward {
    constructor(couponParams, containerDiv, outputTextarea) {
        this.getInfoURL = "https://ms.jr.jd.com/gw/generic/uc/h5/m/getSeckillInfo";
        this.url = "https://ms.jr.jd.com/gw/generic/uc/h5/m/getSeckillInfo";
        this.detailurl = "https://rsp.jd.com/coupon/dayCouponList/v1/?lt=m&an=plus.mobile&couponType=0_1";
        this.couponList = [];
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get() {
        Promise.all([
            utils_1.default.post(this.getInfoURL, {}),
            new Promise((resolve) => {
                setTimeout(() => {
                    utils_1.default.request("stall_getTaskDetail").then(resolve);
                }, 1000);
            }),
        ]).then(([homeData, taskData]) => Promise.all([homeData, taskData]))
            .then(([homeData, taskData]) => {
        });
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
exports.default = ReceiveSeckillReward;

},{"../utils/utils":30}],19:[function(require,module,exports){
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

},{"../utils/utils":30}],20:[function(require,module,exports){
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

},{"../utils/utils":30}],21:[function(require,module,exports){
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
    activityType["stall"] = "stall";
    activityType["timeMachine"] = "timeMachine";
    activityType["starMall"] = "starMall";
    activityType["guardianstar"] = "guardianstar";
})(activityType = exports.activityType || (exports.activityType = {}));

},{}],22:[function(require,module,exports){
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
    couponType["receiveSeckillReward"] = "receiveSeckillReward";
})(couponType = exports.couponType || (exports.couponType = {}));

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var goodsType;
(function (goodsType) {
    goodsType["goods"] = "goods";
})(goodsType = exports.goodsType || (exports.goodsType = {}));

},{}],24:[function(require,module,exports){
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

},{"../config/config":5,"../cookie/CookieHandler":6,"../cookie/CookieManager":7,"../utils/utils":30}],25:[function(require,module,exports){
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

},{"../config/config":5,"../cookie/CookieHandler":6,"../cookie/CookieManager":7,"../utils/utils":30}],26:[function(require,module,exports){
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
class signInCenter {
    constructor(params, containerDiv, outputTextarea) {
        this.rootURI = "https://ms.jr.jd.com/gw/generic/hy/h5/m/";
        this.baseReqData = { "actKey": "AbeQry" };
        // baseReqData: {"actKey":"AbeQry","t":1587359500448}
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
                <button class="lottery" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">金币天天抽奖</button>
                <button class="harvest" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">一键收金果</button>
            </div>`;
        this.content.innerHTML = msg;
        this.container.appendChild(this.content);
        const l = utils_1._$(".lottery");
        l.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            utils_1.default.outPutLog(this.outputTextarea, `开始金币天天抽奖`);
            if (config_1.default.multiFlag) {
                this.lotteryMulti();
            }
            else {
                this.lottery();
            }
        }));
    }
    lottery(ckObj) {
        fetch(this.rootURI + "lottery?reqData=" + encodeURI(JSON.stringify(Object.assign({ "t": new Date().getTime() }, this.baseReqData))), {
            mode: "no-cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.code == "0000") {
                    let { awardName } = data.data;
                    if (config_1.default.multiFlag && ckObj) {
                        utils_1.default.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 获得奖品：${awardName}`);
                    }
                    else {
                        utils_1.default.outPutLog(this.outputTextarea, `获得奖品：${awardName}`);
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
    lotteryMulti() {
        CookieManager_1.default.cookieArr.map((item) => {
            setTimeout(() => {
                CookieHandler_1.CookieHandler.coverCookie(item);
                this.lottery(item);
            }, item.index * 750);
        });
    }
}
exports.default = signInCenter;

},{"../config/config":5,"../cookie/CookieHandler":6,"../cookie/CookieManager":7,"../utils/utils":30}],27:[function(require,module,exports){
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

},{"../config/config":5,"../utils/fetch-jsonp":29,"../utils/utils":30}],28:[function(require,module,exports){
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
// import FeedBag from "./activitys/feedBag";
const activityType_1 = require("./enum/activityType");
const couponType_1 = require("./enum/couponType");
const goodsType_1 = require("./enum/goodsType");
const btgoose_1 = require("./game/btgoose");
// import MoneyTree from "./game/moneyTree";
const cloudpig_1 = require("./game/cloudpig");
const signInCenter_1 = require("./game/signInCenter");
const stall_1 = require("./activitys/stall");
const timeMachine_1 = require("./activitys/timeMachine");
const receiveSeckillReward_1 = require("./coupons/receiveSeckillReward");
const starMall_1 = require("./activitys/starMall");
const guardianstar_1 = require("./activitys/guardianstar");
let coupon, goods, game, activity, gameMap = {}, isJDcontext = true;
const container = document.createElement("div"), UATipsDiv = document.createElement("div"), title = document.createElement("div"), timerTittleDiv = document.createElement("div"), receiveTextInput = document.createElement("input"), receiveCountInput = document.createElement("input"), receiveTimerBtn = document.createElement("button"), operateAreaDiv = document.createElement("div"), outputTextArea = document.createElement("textarea"), outputTextAreaDiv = document.createElement("div"), loginMsgDiv = document.createElement("div");
UATipsDiv.setAttribute('id', "UATipsDiv");
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
    const receiveDiv = document.createElement("div"), receiveAreaDiv = document.createElement("div"), receiveTipsDiv = document.createElement("div"), receiveAllBtn = document.createElement("button"), timerTextInput = document.createElement("input"), timerResetBtn = document.createElement("button"), spanTextInput = document.createElement("input"), 
    // spanResetBtn: HTMLButtonElement = document.createElement("button"),
    timerDiv = document.createElement("div");
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
    // timerDiv.append(spanResetBtn);
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
    tips.innerHTML = '<h4>页面地址暂未被扩展或者有误！</h4><p>本插件只能在指定活动地址或领券地址使用！</p><p>如果这是个活动地址或领券地址，<a href="tencent://message/?uin=708873725Menu=yes" target="_blank" title="发起QQ聊天">联系作者</a>扩展~</p><a style="color:red" onclick=Utils.copyText(Config.NetdiskURL)>点击下载教程视频</a>';
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
    activityArea.setAttribute("style", "padding: 5px;border: 1px solid #000");
    activityArea.innerHTML = `<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin: 5px;'>推荐活动</h3>
    <p style="padding: 5px;color:red;font-weight:bold;">
    <a style="color:red" href="https://bunearth.m.jd.com/babelDiy/Zeus/4SJUHwGdUQYgg94PFzjZZbGZRjDd/index.html#/land" target="_blank">全民营业，瓜分十亿</a>
    <br>
    <a style="color:red" href="https://bunearth.m.jd.com/babelDiy/Zeus/3DDunaJMLDamrmGwu73QbqtGtbX1/index.html" target="_blank">热爱时光机</a>
    <br>
    <a style="color:red" href="https://urvsaggpt.m.jd.com/static/index.html#/?starId=meiditongliya" target="_blank">家电星推官</a>
    <br>
    <a style="color:red" href="https://bunearth.m.jd.com/babelDiy/Zeus/4DEZi5iUgrNLD9EWknrGZhCjNv7V/index.html#/" target="_blank">星店长热爱行动</a>
    <br>
    <a style="color:red" onclick=Utils.copyText("https://u.jd.com/tbFM0kn")>每天领取三个京东红包</a>
    </p>`;
    // https://u.jd.com/toUGpaC
    container.append(activityArea);
}
function buildRecommend() {
    const recommandArea = document.createElement("div");
    recommandArea.setAttribute("style", "border: 1px solid #000;margin: 10px 0;");
    recommandArea.innerHTML = `<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin: 5px;'>活动推荐</h3>
    <p style="color:red;font-weight:bold;">
    <a style="color:red" href="https://bunearth.m.jd.com/babelDiy/Zeus/4SJUHwGdUQYgg94PFzjZZbGZRjDd/index.html#/land" target="_blank">全民营业，瓜分十亿</a>
    <br>
    <a style="color:red" href="https://bunearth.m.jd.com/babelDiy/Zeus/3DDunaJMLDamrmGwu73QbqtGtbX1/index.html" target="_blank">热爱时光机</a>
    <br>
    <a style="color:red" href="https://urvsaggpt.m.jd.com/static/index.html#/?starId=meiditongliya" target="_blank">家电星推官</a>
    <br>
    <a style="color:red" href="https://bunearth.m.jd.com/babelDiy/Zeus/4DEZi5iUgrNLD9EWknrGZhCjNv7V/index.html#/" target="_blank">星店长热爱行动</a>
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
    UATipsDiv.innerHTML = `<div style="border: 1px solid #000;margin: 10px 0;font-weight:bold"><h2>该活动需要设置user-Agent为京东APP</h2><p><a style="color:red" onclick=Utils.copyText(Config.NetdiskURL)>点击下载教程视频</a></p><p>部分浏览器插件会覆盖UA设置，请自行排查并关闭</p><p>【比如：京价保】</p><button style="width: 200px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block" onclick=Utils.copyText(Config.JDAppUA)>点击一键复制User-Agent</button></div>`;
    container.append(UATipsDiv);
}
function hideUAArea() {
    if (container && UATipsDiv) {
        container.removeChild(UATipsDiv);
    }
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
            alert("该功能正在开发中，晚点再来吧~");
            // if (!gameMap.MoneyTree) {
            //     gameMap.MoneyTree = new MoneyTree(null, activityExtensionDiv, outputTextArea);
            //     gameMap.MoneyTree.get();
            // } else {
            //     gameMap.MoneyTree.content.style.display = "block";
            // }
        }
        else if (target.getAttribute("class") == "signInCenter") {
            if (!gameMap.signInCenter) {
                gameMap.signInCenter = new signInCenter_1.default(null, activityExtensionDiv, outputTextArea);
                gameMap.signInCenter.get();
            }
            else {
                gameMap.signInCenter.content.style.display = "block";
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
    if (config_1.default.locationHref.includes("9dkC9G9avZsJoKSvqw7EbmY8pCM")) { //全民掘金大会
        type = couponType_1.couponType.receiveSeckillReward;
    }
    else if (config_1.default.locationHref.includes("4PN6NLSX1vyp8xibC5sk7WZEFF5U")) {
        type = couponType_1.couponType.secKillCoupon;
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
        else if (config_1.default.locationHref.includes("4SJUHwGdUQYgg94PFzjZZbGZRjDd")) {
            type = activityType_1.activityType.stall;
        }
        else if (config_1.default.locationHref.includes("3DDunaJMLDamrmGwu73QbqtGtbX1")) {
            type = activityType_1.activityType.timeMachine;
        }
        else if (config_1.default.locationHref.includes("4DEZi5iUgrNLD9EWknrGZhCjNv7V")) {
            type = activityType_1.activityType.starMall;
        }
    }
    if (config_1.default.locationHref.includes("3gSzKSnvrrhYushciUpzHcDnkYE3")) {
        type = activityType_1.activityType.guardianstar;
    }
    if (config_1.default.locationHref.includes("urvsaggpt.m.jd.com")) {
        type = activityType_1.activityType.guardianstar;
    }
    //京东金融APP节假日营销活动
    // if (Config.locationHref.includes("u.jr.jd.com")) {
    //     //https://u.jr.jd.com/uc-fe-wxgrowing/feedbag/cover/channelLv=syfc/
    //     if (Config.locationHref.includes("feedbag")) {
    //         type = activityType.feedBag;
    //     }
    // }
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
        case couponType_1.couponType.receiveSeckillReward:
            coupon = new receiveSeckillReward_1.default(null, container, outputTextArea);
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
        case activityType_1.activityType.stall:
            activity = new stall_1.default(container, outputTextArea);
            config_1.default.UAFlag = true;
            break;
        case activityType_1.activityType.timeMachine:
            activity = new timeMachine_1.default(container, outputTextArea);
            break;
        case activityType_1.activityType.starMall:
            config_1.default.UAFlag = true;
            activity = new starMall_1.default(container, outputTextArea);
            break;
        case activityType_1.activityType.guardianstar:
            config_1.default.UAFlag = true;
            activity = new guardianstar_1.default(container, outputTextArea);
            break;
        default:
            break;
    }
    if (config_1.default.UAFlag) {
        buildUAarea();
    }
    // buildRecommend();//活动推荐
    buildActivity();
    if (isJDcontext) {
        // buildSensorArea();
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
        buildTimeoutArea();
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

},{"./activitys/guardianstar":1,"./activitys/stall":2,"./activitys/starMall":3,"./activitys/timeMachine":4,"./config/config":5,"./cookie/CookieHandler":6,"./cookie/CookieManager":7,"./coupons/coinPurchase":8,"./coupons/exchange":9,"./coupons/gcConvert":10,"./coupons/getCouponCenter":11,"./coupons/mfreecoupon":12,"./coupons/newBabelAwardCollection":13,"./coupons/purchase":14,"./coupons/receiveCoupon":15,"./coupons/receiveCoupons":16,"./coupons/receiveDayCoupon":17,"./coupons/receiveSeckillReward":18,"./coupons/secKillCoupon":19,"./coupons/whtieCoupon":20,"./enum/activityType":21,"./enum/couponType":22,"./enum/goodsType":23,"./game/btgoose":24,"./game/cloudpig":25,"./game/signInCenter":26,"./goods/goods":27,"./utils/utils":30}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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
    static outPutLog(output, log, timeFlag = true, isClear = false) {
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
        if (isClear) {
            console.clear();
            output.value = new Date().toLocaleString() + log;
        }
        console.log(log);
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
        var oInput = document.createElement('input');
        oInput.className = 'oInput';
        document.body.appendChild(oInput);
        oInput.value = text;
        oInput.select();
        document.execCommand("Copy");
        oInput.style.display = 'none';
        alert('内容已经复制到黏贴板啦');
        document.body.removeChild(oInput);
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
    static request(functionId, body = {}) {
        return fetch(`https://api.m.jd.com/client.action?functionId=${functionId}`, {
            body: `functionId=${functionId}&body=${JSON.stringify(body)}&client=wh5&clientVersion=1.0.0`,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            credentials: "include",
        }).then(res => res.json());
    }
    ;
    static publicRequest(functionId, body = { "lat": "", "lng": "" }) {
        return fetch(`https://api.m.jd.com/client.action`, {
            body: `functionId=${functionId}&body=${JSON.stringify(body)}&client=wh5&clientVersion=1.0.0&sid&t=${new Date().getTime()}&appid=publicUseApi`,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            credentials: "include",
        }).then(res => res.json());
    }
    static clientPost(functionId, body = {}) {
        return fetch(`https://api.m.jd.com/api`, {
            body: `functionId=${functionId}&body=${JSON.stringify(body)}&loginType=2&appid=jd_mp_h5`,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            credentials: "include",
        }).then(res => res.json());
    }
    static post(url, body = {}) {
        return fetch(url, {
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            credentials: "include",
        }).then(res => res.json());
    }
    static sleep(delay) {
        return new Promise(reslove => {
            setTimeout(reslove, delay);
        });
    }
}
exports.default = Utils;
exports._$ = Utils.querySelector;

},{}]},{},[28]);
