import Game from "../interface/Game";
import Utils, { _$ } from "../utils/utils";
import Config from "../config/config";
import { CookieType, CookieHandler } from "../cookie/CookieHandler";
import CookieManager from "../cookie/CookieManager";


export default class Cloudpig implements Game {
    rootURI: string = "https://ms.jr.jd.com/gw/generic/uc/h5/m/";
    baseReqData: Object = { "source": 0, "skuId": "{skuId}", "channelLV": "yqs", "riskDeviceParam": "{}" };
    // baseReqData: Object = { "source": 0, "channelLV": "yqs", "riskDeviceParam": "{\"fp\":\"\",\"eid\":\"\",\"sdkToken\":\"\",\"sid\":\"\"}" };
    // {"source":0,"skuId":"1001003004","channelLV":"yqs","riskDeviceParam":"{\"eid\":\"\",\"fp\":\"\",\"token\":\"\"}"}
    detailurl: string = "https://api.m.jd.com/client.action?functionId=bombnian_getTaskDetail";
    data: any = [];
    timer: number = 1000;
    container: HTMLDivElement;
    params: any;
    taskToken: string = "";
    outputTextarea: HTMLTextAreaElement;
    constructor(params: any, containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.params = params;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get(): void {
        this.login();
        this.list();
    }

    openBoxFlag: boolean = false;
    foodskuId: string = "1001003004";
    foodSpan: number = 1800000;
    autoAddFoodTimer: number = 0;
    list(): void {
        const content = document.createElement("div");
        let msg = `
        <div style="margin:10px;">
        <button class="Login" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">查看猪猪详情</button>
        <button class="OpenBox" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">一键开箱子</button>
        <p>喂养食物:<select class="food" name="food" style="border: 1px solid #333;padding: 2px;">
            <option value ="1001003003">普通猪粮</option>
            <option value ="1001003001">白菜</option>
            <option value="1001003002">胡萝卜</option>
            <option value="1001003004">南瓜</option>
        </select>
        </p>
        <button class="AddFood" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">喂养食物</button>
        <p>自动喂养间隔：<select class="foodSpan" name="foodSpan" style="border: 1px solid #333;padding: 2px;">
            <option value ="1800000">30分钟</option>
            <option value ="3600000">60分钟</option>
            <option value ="5400000">90分钟</option>
        </select>
        </p>
        <button class="AutoAddFood" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">自动定时喂养</button>
        <button class="cancelAutoAddFood" style="display:none;width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">取消定时喂养</button>
        <button class="LotteryPlay" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">每天免费抽奖</button>
        </div>`;
        content.innerHTML = msg;
        this.container.appendChild(content);
        const o = _$('.OpenBox'),
            foodSelect = <HTMLSelectElement>_$('.food'),
            foodSpanSelect = <HTMLSelectElement>_$('.foodSpan'),
            lotteryPlay = _$('.LotteryPlay'),
            autoAddFood = _$('.AutoAddFood'),
            cancelAutoAddFood = _$('.cancelAutoAddFood'),
            a = _$('.AddFood'),
            l = _$('.Login');

        foodSelect.onchange = (event) => {
            this.foodskuId = foodSelect.value;
        }
        foodSpanSelect.onchange = (event) => {
            this.foodSpan = +foodSpanSelect.value;
        }
        a!.addEventListener('click', async () => {
            Utils.outPutLog(this.outputTextarea, `开始喂养猪猪`);
            if (Config.multiFlag) {
                this.addFoodMulti();
            } else {
                this.addFood();
            }
        });
        o!.addEventListener('click', async () => {
            this.openBoxFlag = true;
            Utils.outPutLog(this.outputTextarea, `开始一键开箱子`);
            if (Config.multiFlag) {
                CookieManager.cookieArr.map((item) => {
                    item["flag"] = true;
                })
            }
            do {
                if (Config.multiFlag) {
                    await this.openBoxMulti("pigPetOpenBox");
                    if (CookieManager.cookieArr.every((i) => {
                        return !i["flag"];
                    })) {
                        this.openBoxFlag = false;
                        Utils.outPutLog(this.outputTextarea, `所有账号今天已经木有开盒子机会了~`);
                    }
                } else {
                    await this.openBox("pigPetOpenBox");
                }
            }
            while (this.openBoxFlag);
        });
        l!.addEventListener('click', async () => {
            Utils.outPutLog(this.outputTextarea, `开始查看猪猪详情`);
            if (Config.multiFlag) {
                this.loginMulti();
            } else {
                this.login();
            }

        });
        autoAddFood.addEventListener("click", () => {
            autoAddFood.style.display = "none";
            cancelAutoAddFood.style.display = "block";
            Utils.outPutLog(this.outputTextarea, `自动定时喂养已开启！`);
            this.autoAddFoodTimer = window.setInterval(() => {
                Utils.outPutLog(this.outputTextarea, `自动定时喂养任务开启！`);
                a.click();
            }, this.foodSpan)
        })
        cancelAutoAddFood.addEventListener('click', () => {
            autoAddFood.style.display = "block";
            cancelAutoAddFood.style.display = "none";
            Utils.outPutLog(this.outputTextarea, `自动定时喂养已关闭！`);
            window.clearInterval(this.autoAddFoodTimer);
        })
        lotteryPlay.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始大转盘抽奖`);
            if (Config.multiFlag) {
                this.addFoodMulti();
            } else {
                this.lotteryPlay();
            }

        })
    }

    lotteryPlay(ckObj?: CookieType) {
        fetch(this.rootURI + "pigPetLotteryPlay", {
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
                if (data.resultCode == 0) {
                    let award = data.resultData.award;
                    if (award) {
                        let name = award.name,
                            count = award.count
                        if (Config.multiFlag && ckObj) {
                            Utils.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 获得【${name} * ${count}】！`);
                        } else {
                            Utils.outPutLog(this.outputTextarea, `获得【${name} * ${count}】！`);
                        }
                    } else {
                        if (Config.multiFlag && ckObj) {
                            Utils.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 什么也木有抽到~`);
                        } else {
                            Utils.outPutLog(this.outputTextarea, `什么也木有抽到~`);
                        }
                    }
                }
            } else {
                Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        })
    }

    lotteryPlayMulti() {
        CookieManager.cookieArr.map((item: CookieType) => {
            setTimeout(() => {
                CookieHandler.coverCookie(item);
                this.lotteryPlay(item);
            }, item.index * 750)
        });
    }

    async openBoxMulti(url: string) {
        await Promise.all(
            CookieManager.cookieArr.map(async (item) => {
                await new Promise(resolve => {
                    setTimeout(async () => {
                        CookieHandler.coverCookie(item);
                        if (!item["flag"]) {
                            resolve();
                            return;
                        } else {
                            await fetch(`${this.rootURI}${url}`, {
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
                                    let resultCode = res.resultData.resultCode;
                                    if (resultCode == 0) {
                                        let result = res.resultData.resultData;
                                        Utils.outPutLog(this.outputTextarea, `【${item["mark"]}】:获得【"${result?.award?.name ? result?.award?.name : "空箱子"}】`);
                                    } else if (resultCode == 420) {
                                        item["flag"] = false;
                                        Utils.outPutLog(this.outputTextarea, `【${item["mark"]}】:今天已经木有开盒子机会了~`);
                                    }
                                } else {
                                    Utils.outPutLog(this.outputTextarea, `【${item["mark"]}】:${res.resultMsg}`);
                                }
                                resolve();
                            })
                        }
                    }, (Config.timeoutSpan + Utils.random(300, 500)));
                })
            })
        );
    }

    async openBox(url: string) {
        await new Promise(resolve => {
            setTimeout(async () => {
                await fetch(`${this.rootURI}${url}`, {
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
                        if (res.resultData.resultCode == 0) {
                            let result = res.resultData.resultData;
                            Utils.outPutLog(this.outputTextarea, `${result?.award?.name ? "获得:" + result?.award?.name : "这是个空箱子"}`);
                        } else {
                            this.openBoxFlag = !this.openBoxFlag;
                            Utils.outPutLog(this.outputTextarea, `今天已经木有开盒子机会了~`);
                        }
                    } else {
                        Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                    }
                    resolve();
                })
            }, (Config.timeoutSpan + Utils.random(300, 500)));
        })
    }

    addFood(ckObj?: CookieType) {
        fetch(this.rootURI + "pigPetAddFood", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(this.baseReqData).replace("{skuId}", this.foodskuId)
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.resultCode == 0) {
                    if (Config.multiFlag && ckObj) {
                        Utils.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 喂养成功！`);
                    } else {
                        Utils.outPutLog(this.outputTextarea, `喂养成功！`);
                    }
                } else if (data.resultCode == 406) {
                    if (Config.multiFlag && ckObj) {
                        Utils.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 猪猪现在还有粮食哦~`);
                    } else {
                        Utils.outPutLog(this.outputTextarea, `猪猪现在还有粮食哦~`);
                    }
                }

            } else {
                Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        })
    }
    addFoodMulti() {
        CookieManager.cookieArr.map((item: CookieType) => {
            setTimeout(() => {
                CookieHandler.coverCookie(item);
                this.addFood(item);
            }, item.index * 750)
        });
    }

    login(ckObj?: CookieType) {
        fetch(this.rootURI + "pigPetLogin", {
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
                if (data.hasPig) {
                    let pig = data?.cote?.pig,
                        pigName = pig?.pigName,
                        percent = pig.percent,
                        weight = pig.weight;
                    if (Config.multiFlag && ckObj) {
                        Utils.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 猪猪：${pigName} 价值：${percent}% 体重：${weight}`);
                    } else {
                        Utils.outPutLog(this.outputTextarea, `猪猪：${pigName} 价值：${percent}% 体重：${weight}`);
                    }
                } else {
                    Utils.outPutLog(this.outputTextarea, `该账号尚未领养猪猪哦！`);
                }

            } else {
                Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        })
    }

    loginMulti() {
        CookieManager.cookieArr.map((item: CookieType) => {
            setTimeout(() => {
                CookieHandler.coverCookie(item);
                this.login(item);
            }, item.index * 500)
        });
    }


}