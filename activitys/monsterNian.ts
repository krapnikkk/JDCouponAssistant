import Activity from "../interface/Activity";
import Utils from "../utils/utils";
import Config from "../config/config";


export default class MonsterNian implements Activity {
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
        this.outputTextarea.value = `当你看到这行文字时，说明你还没有配置好浏览器UA！`;
    }
    get(): void {
        var postData = "functionId=bombnian_getTaskDetail&body={}&client=wh5&clientVersion=1.0.0";
        fetch(this.detailurl, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: postData
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            this.data = res.data.result;
            this.taskToken = this.data.taskVos[1]["shoppingActivityVos"][0]["taskToken"];
            this.outputTextarea.value = `获取数据成功\n已加购物车：${this.data.taskVos[2]["times"]}/${this.data.taskVos[2]["productInfoVos"].length}\n已逛店铺：${this.data.taskVos[3]["times"]}/${this.data.taskVos[3]["browseShopVo"].length}\n已逛会场：${this.data.taskVos[1]["times"]}/${this.data.taskVos[1]["shoppingActivityVos"].length}\n已参与互动：${this.data.taskVos[4]["times"]}/${this.data.taskVos[4]["shoppingActivityVos"].length}\n已看直播：${this.data.taskVos[5]["times"]}/${this.data.taskVos[5]["shoppingActivityVos"].length}\n已LBS定位：${this.data.taskVos[7]["times"]}/1`;
            this.list();
        })
    }

    list(): void {
        const content = document.createElement("div");
        let msg = `
        <div style="margin:10px;">
        <button class="shop" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">逛逛好店</button>
        <button class="browser" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">逛逛主会场</button>
        <button class="product" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">好物加购</button>
        <button class="shopping" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">逛逛会场</button>
        <button class="activity" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">好玩互动</button>
        <button class="video" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">视频直播</button>
        <button class="record" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">LBS定位</button>
        <button class="raise" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">炸年兽</button>
        <button class="invite" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">获取邀请链接</button>
        <button class="help" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">帮助作者队伍助力</button>
        <button class="auto" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">一键完成任务</button>
        </div>`;

        // <button class="help" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">帮作者助力</button>
        // <button class="join" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">加入作者战队</button>
        content.innerHTML = msg;
        this.container.appendChild(content);
        const o = document.querySelector('.shop'),
            h = document.querySelector('.help'),
            a = document.querySelector('.activity'),
            v = document.querySelector('.video'),
            r = document.querySelector('.record'),
            s = document.querySelector('.shopping'),
            i = document.querySelector('.invite'),
            // j = document.querySelector('.join'),
            b = document.querySelector('.raise'),
            u = document.querySelector('.auto'),
            browser = document.querySelector('.browser'),

            l = document.querySelector('.product');


        o!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始自动逛逛好店任务`)
            this.send(this.data.taskVos[3]["browseShopVo"], this.data.taskVos[3]["taskId"]);
        });
        l!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始自动好物加购任务`)
            this.send(this.data.taskVos[2]["productInfoVos"], this.data.taskVos[2]["taskId"]);
        });
        s!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始自动逛逛会场任务`)
            this.send(this.data.taskVos[4]["shoppingActivityVos"], this.data.taskVos[4]["taskId"]);
        });
        a!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始自动好玩互动任务`)
            this.send(this.data.taskVos[5]["shoppingActivityVos"], this.data.taskVos[5]["taskId"]);
        });
        v!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始自动视频直播任务`)
            this.send(this.data.taskVos[6]["shoppingActivityVos"], this.data.taskVos[6]["taskId"]);
        });
        r!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始自动LBS定位任务`)
            this.send([this.data.taskVos[7]["simpleRecordInfoVo"]], this.data.taskVos[7]["taskId"]);
        });
        browser!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始自动逛主会场任务`)
            this.doTask();
        });
        h!.addEventListener('click', () => {
            this.help();
        });

        i!.addEventListener('click', () => {
            Utils.copyText(`https://bunearth.m.jd.com/babelDiy/SGFJVMOZADGTQCZWGEYU/4PWgqmrFHunn8C38mJA712fufguU/index.html?shareType=taskHelp&inviteId=${this.data["inviteId"]}&taskId=1&itemId=${this.data["taskVos"][0]["assistTaskDetailVo"]["itemId"]}&shareFrom=key`);
        })
        // h!.addEventListener('click', () => {
        //     this.invite();
        // })
        // j!.addEventListener('click', () => {
        //     this.join();
        // })
        b!.addEventListener('click', () => {
            this.raise();
        })
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        u!.addEventListener('click', async () => {
            Utils.outPutLog(this.outputTextarea, `一键自动开始任务！`);
            Utils.outPutLog(this.outputTextarea, `开始自动逛逛好店任务`)
            await this.send(this.data.taskVos[3]["browseShopVo"], this.data.taskVos[3]["taskId"]);
            Utils.outPutLog(this.outputTextarea, `开始自动好物加购任务`)
            await this.send(this.data.taskVos[2]["productInfoVos"], this.data.taskVos[2]["taskId"]);
            Utils.outPutLog(this.outputTextarea, `开始自动逛逛会场任务`)
            await this.send(this.data.taskVos[4]["shoppingActivityVos"], this.data.taskVos[4]["taskId"]);
            Utils.outPutLog(this.outputTextarea, `开始自动好玩互动任务`)
            await this.send(this.data.taskVos[5]["shoppingActivityVos"], this.data.taskVos[5]["taskId"]);
            Utils.outPutLog(this.outputTextarea, `开始自动视频直播任务`)
            await this.send(this.data.taskVos[6]["shoppingActivityVos"], this.data.taskVos[6]["taskId"]);
            Utils.outPutLog(this.outputTextarea, `全部任务完成`)
            // o!.dispatchEvent(e);
            // a!.dispatchEvent(e);
            // v!.dispatchEvent(e);
            // s!.dispatchEvent(e);
            // l!.dispatchEvent(e);
        })
    }

    async send(data: any, taskId: number) {
        let self = this, length = data.length;
        for (let i = 0; i < length; i++) {
            var postData = `functionId=bombnian_collectScore&body={"taskId":${taskId},"itemId":"${data[i]["itemId"]}"}&client=wh5&clientVersion=1.0.0`;
            // (function (index, data, len) {
            await new Promise(resolve => {
                setTimeout(async () => {
                    await fetch("https://api.m.jd.com/client.action?functionId=bombnian_collectScore", {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: postData
                    }).then(function (response) {
                        return response.json()
                    }).then((res) => {
                        Utils.outPutLog(self.outputTextarea, `${new Date().toLocaleString()} 操作成功！任务序号：${i + 1}/${length}`);
                        if (i + 1 >= length) {
                            Utils.outPutLog(self.outputTextarea, `${new Date().toLocaleString()} 当前任务已完成!`);
                        }
                        resolve();
                    })
                }, (Config.timeoutSpan + Utils.random(300, 500)));
            })
            // })(i, postData, length)
        }
    }

    invite() {
        // var postData =`functionId=bombnian_collectScore&body={"inviteId":"T0kkDJUmGX0Sdet46x7KGSqKNI-klg18GVA8f5s","taskId":1,"itemId":"ASHYV3O7TlGlOXSI"}&client=wh5&clientVersion=1.0.0`;
        var postData = `functionId=bombnian_collectScore&body={"inviteId":"DgxlSNRnRyNRPa01oWqgYGmh6fowp7KSdvYh_P9xeptD0UnvN0zMq6o","taskId":1,"itemId":"ACTNUmK-SyjcNFWT523lDlA"}&client=wh5&clientVersion=1.0.0`;
        fetch("https://api.m.jd.com/client.action?functionId=bombnian_collectScore", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: postData
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            Utils.outPutLog(this.outputTextarea, `${new Date().toLocaleString()} 操作成功！谢谢你的助力！`);
        })
    }
    join() {
        fetch("https://api.m.jd.com/client.action?functionId=bombnian_pk_joinGroup", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `functionId=bombnian_pk_joinGroup&body={"inviteId":"VlU-EZopQidWJ6s2oG2sfIHInYsPApTbtntxKA1MAWPJSGYsX6Se6Dv3","confirmFlag":1}&client=wh5&clientVersion=1.0.0`
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.data.bizCode == 0) {
                Utils.outPutLog(this.outputTextarea, `${new Date().toLocaleString()} 操作成功！加入成功！`);
            } else {
                Utils.outPutLog(this.outputTextarea, `${new Date().toLocaleString()} 操作失败，好像满人了哦`);
            }
        })
    }

    doTask() {
        fetch(" https://api.m.jd.com/client.action?functionId=tc_doTask_mongo", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `functionId=tc_doTask_mongo&body={"taskToken":${this.taskToken},"actionType":1}&client=wh5&clientVersion=1.0.0`
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            Utils.outPutLog(this.outputTextarea, `${new Date().toLocaleString()} 任务领取成功！`);
            this.broswer();
        })
    }

    broswer() {
        fetch(`https://api.m.jd.com/client.action?functionId=tc_doTask_mongo&body=%7B%22taskToken%22%3A%22${this.taskToken}%22%2C%22actionType%22%3A0%7D&area=&networkType=&t=1578487649503&appid=publicUseApi&client=wh5&clientVersion=1.0.0`, {
            credentials: "include",
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.data.bizCode == 0) {
                Utils.outPutLog(this.outputTextarea, `${new Date().toLocaleString()} 操作成功！`);
            }
        })
    }

    raise() {
        fetch("https://api.m.jd.com/client.action?functionId=bombnian_raise", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `functionId=bombnian_raise&body={}&client=wh5&clientVersion=1.0.0`
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.data.bizCode == 0) {
                Utils.outPutLog(this.outputTextarea, `${new Date().toLocaleString()} 操作成功！获取奖励如下:${JSON.stringify(res.data.result.levelUpAward)}`);
            } else {
                Utils.outPutLog(this.outputTextarea, `${new Date().toLocaleString()} 操作失败！${res.data.bizMsg}`);
            }
        })
    }

    help() {
        fetch('https://api.m.jd.com/client.action?functionId=bombnian_pk_assistGroup',
            {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `functionId=bombnian_pk_assistGroup&body={"confirmFlag":1,"inviteId":"XUkkFpUhDG0XY-p35CzwPZgzlWgNooCLIHRgCJ6uCcsnnwdlBg"}&client=wh5&clientVersion=1.0.0`
            }
        ).then((res) => res.json())
            .then((json) => {
            });

        fetch('https://api.m.jd.com/client.action?functionId=bombnian_pk_assistGroup',
            {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `functionId=bombnian_pk_assistGroup&body={"confirmFlag":1,"inviteId":"XUkkFpUhDG1WJqszpW2uY-4mR3ZvVGMfViX3iMWdE4FeIvO3rYjOC-K6cox9Eh0"}&client=wh5&clientVersion=1.0.0`
            }
        ).then((res) => res.json())
            .then((json) => {
                Utils.outPutLog(this.outputTextarea, `${new Date().toLocaleString()} 谢谢你的助力！`);
            });
    }
}