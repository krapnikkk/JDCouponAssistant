import Activity from "../interface/Activity";
import Utils from "../utils/utils";
import Config from "../config/config";
export default class BrandCitySpring implements Activity {
    url: string = "https://api.m.jd.com/client.action";
    params: any;
    container: HTMLDivElement;
    outputTextarea: HTMLTextAreaElement;
    constructor(params: any, containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.params = params;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get(): void {
        this.list();
    }
    list(): void {
        const content = document.createElement("div");
        let msg = `
        <div style="margin:10px;">
        <button class="visit" style="width: 200px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">一键浏览店铺</button>
        <button class="linkgame" style="width: 200px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">一键小游戏</button>
        <button class="exchange" style="width: 200px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">一键福币兑换</button>
        <button class="auto" style="width: 200px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">一键自动完成</button></div>`;

        content.innerHTML = msg;
        this.container.appendChild(content);
        const e = document.querySelector('.exchange'),
            v = document.querySelector('.visit'),
            g = document.querySelector('.linkgame'),
            a = document.querySelector('.auto');

        e!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始自动福币兑换`)
            this.lottery();
        });
        v!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始自动浏览店铺`)
            this.visit();
        });
        g!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始自动小游戏`)
            this.game();
        });
        a!.addEventListener('click', async () => {
            Utils.outPutLog(this.outputTextarea, `开始自动全部任务`)
            Utils.outPutLog(this.outputTextarea, `开始自动浏览店铺`)
            await this.send("brandcity_spring_randomVisit", null, 80);
            Utils.outPutLog(this.outputTextarea, `开始自动小游戏`)
            await this.send("brandcity_spring_getLottery", 4, 6);
            Utils.outPutLog(this.outputTextarea, `开始自动福币兑换`)
            await this.send("brandcity_spring_getLottery", 2, 12);
            Utils.outPutLog(this.outputTextarea, `全部任务完成`)
            // this.visit();
            // this.game();
        });
    }

    async send(functionId: string, actionType: number | null, taskCnt: number) {
        let self = this;
        for (let i = 0; i < taskCnt; i++) {
            await new Promise(resolve => {
                // (function (index, len) {
                let postData = {
                    "clientVersion": "1.0.0",
                    "client": "wh5",
                    "uuid": "15727505818691431184273",
                    "area": "",
                    "appid": "publicUseApi",
                    "functionId": functionId,
                    "body": actionType ? { "actionType": actionType, "taskId": `${i + 1}` } : { "uuid": "15727505818691431184273" }
                };
                setTimeout(async () => {
                    fetch(`${self.url}?${Utils.stringify(postData)}`, { credentials: "include" }).then(function (response) {
                        return response.json()
                    }).then((res) => {
                        Utils.outPutLog(self.outputTextarea, `操作成功！任务序号：${i + 1}/${taskCnt}`);
                        if (i + 1 >= taskCnt) {
                            Utils.outPutLog(self.outputTextarea, `当前任务已完成!`);
                        }
                        resolve()
                    })
                }, (Config.timeoutSpan + Utils.random(300, 500)));
            })
            // })(i, 12)
        }
    }

    lottery(): void {
        let self = this;
        for (let i = 0; i < 12; i++) {
            (function (index, len) {
                let postData = {
                    "clientVersion": "1.0.0",
                    "client": "wh5",
                    "uuid": "15727505818691431184273",
                    "area": "",
                    "appid": "publicUseApi",
                    "functionId": "brandcity_spring_getLottery",
                    "body": { "actionType": 2, "taskId": `${i + 1}` }
                };
                setTimeout(() => {
                    fetch(`${self.url}?${Utils.stringify(postData)}`, { credentials: "include" }).then(function (response) {
                        return response.json()
                    }).then((res) => {
                        Utils.outPutLog(self.outputTextarea, `操作成功！任务序号：${index + 1}/${len}`);
                        if (index + 1 >= len) {
                            Utils.outPutLog(self.outputTextarea, `当前任务已完成!`);
                        }
                    })
                }, (Config.timeoutSpan + Utils.random(300, 500)) * index);
            })(i, 12)
        }
    }

    visit(): void {
        let self = this;
        for (let i = 0; i < 80; i++) {
            (function (index, len) {
                let postData = {
                    "clientVersion": "1.0.0",
                    "client": "wh5",
                    "uuid": "15727505818691431184273",
                    "area": "",
                    "appid": "publicUseApi",
                    "functionId": "brandcity_spring_randomVisit",
                    "body": { "actionType": 2, "taskId": `${i + 1},`, "uuid": "15727505818691431184273" }
                };
                setTimeout(() => {
                    fetch(`${self.url}?${Utils.stringify(postData)}`, { credentials: "include" }).then(function (response) {
                        return response.json()
                    }).then((res) => {
                        Utils.outPutLog(self.outputTextarea, `操作成功！任务序号：${index + 1}/${len}`);
                        if (index + 1 >= len) {
                            Utils.outPutLog(self.outputTextarea, `当前任务已完成!`);
                        }
                    })
                }, (Config.timeoutSpan + Utils.random(300, 500)) * index);
            })(i, 80)
        }
    }

    game(): void {
        let self = this;
        for (let i = 0; i < 6; i++) {
            (function (index, len) {
                let postData = {
                    "clientVersion": "1.0.0",
                    "client": "wh5",
                    "uuid": "15727505818691431184273",
                    "area": "",
                    "appid": "publicUseApi",
                    "functionId": "brandcity_spring_getLottery",
                    "body": { "actionType": 4, "taskId": i + 1 }
                };
                setTimeout(() => {
                    fetch(`${self.url}?${Utils.stringify(postData)}`, { credentials: "include" }).then(function (response) {
                        return response.json()
                    }).then((res) => {
                        Utils.outPutLog(self.outputTextarea, `操作成功！任务序号：${index + 1}/${len}`);
                        if (index + 1 >= len) {
                            Utils.outPutLog(self.outputTextarea, `当前任务已完成!`);
                        }
                    })
                }, (Config.timeoutSpan + Utils.random(300, 500)) * index);
            })(i, 6)
        }
    }

}