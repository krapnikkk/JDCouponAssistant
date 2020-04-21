import Game from "../interface/Game";
import Utils, { _$ } from "../utils/utils";
import Config from "../config/config";
import { CookieType, CookieHandler } from "../cookie/CookieHandler";
import CookieManager from "../cookie/CookieManager";


export default class signInCenter implements Game {
    rootURI: string = "https://ms.jr.jd.com/gw/generic/hy/h5/m/";
    baseReqData: Object = { "actKey": "AbeQry" };
    // baseReqData: {"actKey":"AbeQry","t":1587359500448}
    data: any = [];
    timer: number = 1000;
    container: HTMLDivElement;
    params: any;
    taskToken: string = "";
    outputTextarea: HTMLTextAreaElement;
    content: HTMLDivElement;
    constructor(params: any, containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.params = params;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        this.content = document.createElement("div");
    }
    get(): void {
        this.list();
    }

    openBoxFlag: boolean = false;
    foodskuId: string = "1001003004";
    harvestSpan: number = 1800000;
    autoToWithdrawTimer: number = 0;
    signNo: number = 1;
    favoriteFood: string = "";
    list(): void {
        let msg = `
            <div>
                <button class="lottery" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">金币天天抽奖</button>
                <button class="harvest" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">一键收金果</button>
            </div>`;
        this.content.innerHTML = msg;
        this.container.appendChild(this.content);
        const l = _$(".lottery");

        l!.addEventListener('click', async () => {
            Utils.outPutLog(this.outputTextarea, `开始金币天天抽奖`);
            if (Config.multiFlag) {
                this.lotteryMulti();
            } else {
                this.lottery();
            }
        });
    }

    lottery(ckObj?: CookieType) {
        fetch(this.rootURI + "lottery?reqData=" + encodeURI(JSON.stringify(Object.assign({ "t": new Date().getTime() }, this.baseReqData))),
            {
                mode: "no-cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                return response.json()
            }).then((res) => {
                if (res.resultCode == 0) {
                    let data = res.resultData;
                    if (data.code == "0000") {
                        let { awardName } = data.data;
                        if (Config.multiFlag && ckObj) {
                            Utils.outPutLog(this.outputTextarea, `【${ckObj["mark"]}】 获得奖品：${awardName}`);
                        } else {
                            Utils.outPutLog(this.outputTextarea, `获得奖品：${awardName}`);
                        }

                    } else {
                        Utils.outPutLog(this.outputTextarea, `${data.msg}`);
                    }
                } else {
                    Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
                }
            })
    }

    lotteryMulti() {
        CookieManager.cookieArr.map((item: CookieType) => {
            setTimeout(() => {
                CookieHandler.coverCookie(item);
                this.lottery(item);
            }, item.index * 750)
        });
    }

}