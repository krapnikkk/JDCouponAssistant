import Game from "../interface/Game";
import Utils, { _$ } from "../utils/utils";
import Config from "../config/config";
import { CookieType, CookieHandler } from "../cookie/CookieHandler";
import CookieManager from "../cookie/CookieManager";


export default class BTGoose implements Game {
    rootURI: string = "https://ms.jr.jd.com/gw/generic/uc/h5/m/";
    baseReqData: Object = { "timeSign": 0, "environment": "jrApp", "riskDeviceInfo": "{}" };
    // baseReqData: Object = { "source": 0, "channelLV": "yqs", "riskDeviceParam": "{\"fp\":\"\",\"eid\":\"\",\"sdkToken\":\"\",\"sid\":\"\"}" };
    // {"source":0,"skuId":"1001003004","channelLV":"yqs","riskDeviceParam":"{\"eid\":\"\",\"fp\":\"\",\"token\":\"\"}"}
    detailurl: string = "https://api.m.jd.com/client.action?functionId=bombnian_getTaskDetail";
    data: any = [];
    timer: number = 1000;
    container: HTMLDivElement;
    params: any;
    taskToken: string = "";
    outputTextarea: HTMLTextAreaElement;
    favFoodMap: { [key: string]: string } = { "南瓜": "1001003004", "胡萝卜": "1001003002", "白菜": "1001003001", "普通猪粮": "1001003003" };
    constructor(params: any, containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.params = params;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get(): void {
        // this.login();
        this.list();
    }

    openBoxFlag: boolean = false;
    foodskuId: string = "1001003004";
    toWithdrawSpan: number = 1800000;
    autoToWithdrawTimer: number = 0;
    signNo: number = 1;
    favoriteFood: string = "";
    list(): void {
        const content = document.createElement("div");
        let msg = `
        <div>
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
        <div>
        </div>`;
        content.innerHTML = msg;
        this.container.appendChild(content);
        const d = _$(".toDailyHome"),
            g = _$(".toGoldExchange"),
            autoToWithdraw = _$(".autoToWithdraw"),
            cancelautoToWithdraw = _$(".cancelautoToWithdraw"),
            t = _$(".toWithdraw");

        t!.addEventListener('click', async () => {
            Utils.outPutLog(this.outputTextarea, `开始提鹅收蛋`);
            if (Config.multiFlag) {
                this.toWithdrawMulti();
            } else {
                this.toWithdraw();
            }
        });

        d!.addEventListener('click', async () => {
            Utils.outPutLog(this.outputTextarea, `开始查看鹅鹅详情`);
            if (Config.multiFlag) {
                this.homeMulti();
            } else {
                this.home();
            }
        });

        g!.addEventListener('click', async () => {
            Utils.outPutLog(this.outputTextarea, `开始兑换金币`);
            if (Config.multiFlag) {
                this.toGoldExchangeMulti();
            } else {
                this.toGoldExchange();
            }
        });

        autoToWithdraw.addEventListener("click", () => {
            autoToWithdraw.style.display = "none";
            cancelautoToWithdraw.style.display = "block";
            Utils.outPutLog(this.outputTextarea, `自动定时收蛋已开启！`);
            this.autoToWithdrawTimer = window.setInterval(() => {
                Utils.outPutLog(this.outputTextarea, `自动定时收蛋任务开启！`);
                t.click();
            }, this.toWithdrawSpan)
        })

        cancelautoToWithdraw.addEventListener('click', () => {
            autoToWithdraw.style.display = "block";
            cancelautoToWithdraw.style.display = "none";
            Utils.outPutLog(this.outputTextarea, `自动定时收蛋已关闭！`);
            window.clearInterval(this.autoToWithdrawTimer);
        })
    }

    toWithdraw(ckObj?: CookieType) {
        fetch(this.rootURI + "toWithdraw", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.code == "0000") {
                    let eggTotal = data.data.eggTotal;
                    if (Config.multiFlag && ckObj) {
                        Utils.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 收蛋成功！当前鹅蛋数量：${eggTotal}`);
                    } else {
                        Utils.outPutLog(this.outputTextarea, `收蛋成功！当前鹅蛋数量：${eggTotal}`);
                    }

                } else {
                    Utils.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            } else {
                Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        })
    }

    toWithdrawMulti() {
        CookieManager.cookieArr.map((item: CookieType) => {
            setTimeout(() => {
                CookieHandler.coverCookie(item);
                this.toWithdraw(item);
            }, item.index * 750)
        });
    }

    home(ckObj?: CookieType) {
        fetch(this.rootURI + "toDailyHome", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData.data;
                let { shareUuid, grassEggTotal, basketSize, availableTotal } = data;
                if (Config.multiFlag && ckObj) {
                    Utils.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 可兑换：${availableTotal} 未收取：${grassEggTotal} 可容纳：${basketSize} `);
                } else {

                    Utils.outPutLog(this.outputTextarea, ` 可兑换：${availableTotal} 未收取：${grassEggTotal} 可容纳：${basketSize} `);
                }
            } else {
                Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        })
    }

    homeMulti() {
        CookieManager.cookieArr.map((item: CookieType) => {
            setTimeout(() => {
                CookieHandler.coverCookie(item);
                this.home(item);
            }, item.index * 500)
        });
    }

    toGoldExchange(ckObj?: CookieType) {
        fetch(this.rootURI + "toGoldExchange", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.resultCode == 0) {
                if (res.resultData.code == "0000") {
                    let data = res.resultData.data;
                    let { cnumber, rate, goldTotal } = data;
                    if (Config.multiFlag && ckObj) {
                        Utils.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 已兑换:${cnumber} 比例：${rate} 总金币：${goldTotal}`);
                    } else {
                        Utils.outPutLog(this.outputTextarea, `已兑换:${cnumber} 比例：${rate} 总金币：${goldTotal}`);
                    }
                } else {
                    Utils.outPutLog(this.outputTextarea, `${res.resultData.msg}`);
                }
            } else {
                if (Config.multiFlag && ckObj) {
                    Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        })
    }

    toGoldExchangeMulti() {
        CookieManager.cookieArr.map((item: CookieType) => {
            setTimeout(() => {
                CookieHandler.coverCookie(item);
                this.toGoldExchange(item);
            }, item.index * 500)
        });
    }

    lotteryIndex(ckObj?: CookieType) {
        fetch(this.rootURI + "pigPetLotteryIndex", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (res.resultData.resultCode == 0) {
                    let currentCount = data?.currentCount,
                        coinCount = data?.coinCount,
                        price = data?.price,
                        nextFreeTime = data?.nextFreeTime;
                    if (Config.multiFlag && ckObj) {
                        Utils.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 当前可抽奖次数：${currentCount} 距下一次免费抽奖时间：${nextFreeTime}毫秒 金币抽奖次数：${coinCount} 需花费金币：${price}`);
                    } else {
                        Utils.outPutLog(this.outputTextarea, `当前可抽奖次数：${currentCount} 距下一次免费抽奖时间：${nextFreeTime}毫秒 金币抽奖次数：${coinCount} 需花费金币：${price}`);
                    }
                } else {
                    Utils.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                }
            } else {
                if (Config.multiFlag && ckObj) {
                    Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        })
    }

    lotteryIndexMulti() {
        CookieManager.cookieArr.map((item: CookieType) => {
            setTimeout(() => {
                CookieHandler.coverCookie(item);
                this.lotteryIndex(item);
            }, item.index * 500)
        });
    }

    signOne(ckObj?: CookieType) {
        fetch(this.rootURI + "pigPetSignOne?_=" + Utils.getTimestamp(), {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(Object.assign(this.baseReqData, { "no": ckObj ? ckObj.signNo : this.signNo }))
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (res.resultData.resultCode == 0) {
                    let today = data?.today,
                        name = data?.award?.name;
                    if (Config.multiFlag && ckObj) {
                        Utils.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 已签到${today}天 获得奖励：${name}`);
                    } else {
                        Utils.outPutLog(this.outputTextarea, `已签到${today}天 获得奖励：${name}`);
                    }
                } else {
                    Utils.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                }
            } else {
                if (Config.multiFlag && ckObj) {
                    Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        })
    }

    // signOneMulti() {
    //     CookieManager.cookieArr.map((item: CookieType) => {
    //         setTimeout(() => {
    //             CookieHandler.coverCookie(item);
    //             this.signOne(item);
    //         }, item.index * 500)
    //     });
    // }

    signIndex(ckObj?: CookieType) {
        fetch(this.rootURI + "pigPetSignIndex?_=" + Utils.getTimestamp(), {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData)
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (res.resultData.resultCode == 0) {
                    let today = data?.today;
                    if (Config.multiFlag && ckObj) {
                        ckObj.signNo = today;
                        Utils.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 已签到${today}天 `);
                        this.signOne(ckObj);
                    } else {
                        this.signNo = today;
                        Utils.outPutLog(this.outputTextarea, `已签到${today}天`);
                        this.signOne()
                    }
                } else {
                    Utils.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                }
            } else {
                if (Config.multiFlag && ckObj) {
                    Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        })
    }

    signIndexMulti() {
        CookieManager.cookieArr.map((item: CookieType) => {
            setTimeout(() => {
                CookieHandler.coverCookie(item);
                this.signIndex(item);
            }, item.index * 500)
        });

    }

    userBag(ckObj?: CookieType) {
        fetch(this.rootURI + "pigPetUserBag?_=" + Utils.getTimestamp(), {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(Object.assign(this.baseReqData, { "category": "1001" }))
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData.resultData;
                if (res.resultData.resultCode == 0) {
                    let goods = data?.goods, goodStr = "";
                    if (Config.multiFlag && ckObj) {
                        goodStr += goods.map((good: any) => {
                            return `\n名称:${good.goodsName} 数量：${good.count}g`;
                        })
                        Utils.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 ----食物背包一览----${goodStr}`);
                    } else {
                        goodStr += goods.map((good: any) => {
                            return `\n名称:${good.goodsName} 数量：${good.count}g`;
                        })
                        Utils.outPutLog(this.outputTextarea, `----食物背包一览----${goodStr}`);
                    }
                } else {
                    Utils.outPutLog(this.outputTextarea, `${res.resultData.resultMsg}`);
                }
            } else {
                if (Config.multiFlag && ckObj) {
                    Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            }
        })
    }

    userBagMulti() {
        CookieManager.cookieArr.map((item: CookieType) => {
            setTimeout(() => {
                CookieHandler.coverCookie(item);
                this.userBag(item);
            }, item.index * 500)
        });
    }

}