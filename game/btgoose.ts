import Game from "../interface/Game";
import Utils, { _$ } from "../utils/utils";
import Config from "../config/config";
import { CookieType, CookieHandler } from "../cookie/CookieHandler";
import CookieManager from "../cookie/CookieManager";


export default class BTGoose implements Game {
    rootURI: string = "https://ms.jr.jd.com/gw/generic/uc/h5/m/";
    baseReqData: Object = { "timeSign": 0, "environment": "jrApp", "riskDeviceInfo": "{}" };
    data: any = [];
    timer: number = 1000;
    container: HTMLDivElement;
    params: any;
    taskToken: string = "";
    outputTextarea: HTMLTextAreaElement;
    content:HTMLDivElement;
    constructor(params: any, containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.params = params;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        this.content = document.createElement("div");
    }
    get(): void {
        // this.login();
        this.list();
    }

    toWithdrawSpan: number = 1800000;
    autoToWithdrawTimer: number = 0;
    list(): void {
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

}