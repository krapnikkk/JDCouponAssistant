import Game from "../interface/Game";
import Utils, { _$ } from "../utils/utils";
import Config from "../config/config";
import CookieManager from "../cookie/CookieManager";
import CookieHandler from "../cookie/CookieHandler";


export default class Cloudpig implements Game {
    rootURI: string = "https://ms.jr.jd.com/gw/generic/uc/h5/m/";
    baseReqData: Object = { "source": 0, "channelLV": "yqs", "riskDeviceParam": "{\"fp\":\"\",\"eid\":\"\",\"sdkToken\":\"\",\"sid\":\"\"}" };
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
        // fetch(this.rootURI + "pigPetLogin", {
        //     method: "POST",
        //     mode: "cors",
        //     credentials: "include",
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     body: "reqData=" + JSON.stringify(this.baseReqData)
        // }).then(function (response) {
        //     return response.json()
        // }).then((res) => {
        //     if (res.resultCode == 0) {
        //         this.data = res.resultData;
        //         Utils.outPutLog(this.outputTextarea, this.data?.resultData?.cote?.pig?.pigName);
        //     }
        // })
        this.list();
    }

    openBoxFlag: boolean = false;
    list(): void {
        const content = document.createElement("div");
        let msg = `
        <div style="margin:10px;">
        <button class="pigPetOpenBox" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">一键开箱子</button>
        </div>`;
        content.innerHTML = msg;
        this.container.appendChild(content);
        const o = _$('.pigPetOpenBox');


        o!.addEventListener('click', async () => {
            this.openBoxFlag = true;
            Utils.outPutLog(this.outputTextarea, `开始一键开箱子`);
            if (Config.multiFlag) {
                CookieManager.cookieArr.map((item) => {
                    item["flag"] = true;
                })
                do {
                    await this.sendMulti("pigPetOpenBox", this.openBoxFlag);
                    if (CookieManager.cookieArr.every((i) => {
                        return !i["flag"];
                    })) {
                        this.openBoxFlag = false;
                    }
                }
                while (this.openBoxFlag);
            } else {
                await this.send("pigPetOpenBox", this.openBoxFlag);
            }
        });
    }

    async sendMulti(url: string, flag: boolean) {
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
                                    Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                                }
                                resolve();
                            })
                        }
                    }, (Config.timeoutSpan + Utils.random(300, 500)));
                })
            })
        );
    }

    async send(url: string, flag: boolean) {
        do {
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
                                flag = !flag;
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
        while (flag);
    }


}