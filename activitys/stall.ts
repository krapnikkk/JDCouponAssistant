import Activity from "../interface/Activity";
import Utils, { _$ } from "../utils/utils";
import Config from "../config/config";


declare var smashUtils: any;

export default class Stall implements Activity {
    data: any = [];
    taskVos: Array<any> = [];
    timer: number = 1000;
    container: HTMLDivElement;
    outputTextarea: HTMLTextAreaElement;
    secretp = "";
    inviteUrl: string = 'https://bunearth.m.jd.com/babelDiy/Zeus/4SJUHwGdUQYgg94PFzjZZbGZRjDd/index.html?shareType=homeTask&inviteId=';
    groupInvitedUrl: string = 'https://bunearth.m.jd.com/babelDiy/Zeus/4SJUHwGdUQYgg94PFzjZZbGZRjDd/index.html?shareType=cbdDay&inviteId=';

    constructor(containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get(): void {
        Utils.outPutLog(this.outputTextarea, `当你看到这行文字时，说明你还没有配置好浏览器UA或者还没有登录京东帐号！`);
        Promise.all([
            Utils.request("stall_getHomeData"),
            new Promise((resolve) => {
                setTimeout(() => {
                    Utils.request("stall_getTaskDetail").then(resolve);
                }, 1000);
            }),
        ]).then(([homeData, taskData]) =>
            Promise.all([(<any>homeData), (<any>taskData)])
        )
            .then(([homeData, taskData]) => {
                this.secretp = homeData.data.result.homeMainInfo.secretp;
                this.data = taskData.data.result;
                if (this.data) {
                    this.taskVos = this.data.taskVos;
                    let value = "";
                    for (let j = 0; j < this.data.taskVos.length; j++) {
                        value += `\n${this.taskVos[j]["taskName"]}：${this.data.taskVos[1]["status"] == 2 ? "已完成" : "未完成"}(${this.taskVos[j]["times"]}/${this.taskVos[j]["maxTimes"]})`
                    }
                    Utils.outPutLog(this.outputTextarea, value, true, true);
                    this.list();
                }
            });
    }

    updateTask() {
        return new Promise(reslove => {
            Utils.request("stall_getTaskDetail").then((res: any) => {
                this.data = res.data.result;
                if (this.data) {
                    this.taskVos = this.data.taskVos;
                    let value = '任务数据更新成功';
                    for (let j = 0; j < this.data.taskVos.length; j++) {
                        value += `\n${this.taskVos[j]["taskName"]}：${this.data.taskVos[1]["status"] == 2 ? "已完成" : "未完成"}(${this.taskVos[j]["times"]}/${this.taskVos[j]["maxTimes"]})`
                    }
                    Utils.outPutLog(this.outputTextarea, value);
                }
                reslove();
            }).catch(() => {
                Utils.outPutLog(this.outputTextarea, "数据获取失败，请稍后再试");
            });
        })
    }

    list(): void {
        let hours = new Date().getHours();
        if (hours >= 20 && hours < 22) {
            this.helpGroup(false);
        }
        // let UATipsDiv = _$('#UATipsDiv');
        // if (this.container && UATipsDiv) {
        //     this.container.removeChild(UATipsDiv);
        // }
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
        const signIn = _$('.signIn'),
            others = _$('.others'),
            group = _$('.group'),
            master = _$('.master'),
            steal = _$('.steal'),
            help = _$('.help'),
            funny = _$('.funny'),
            viewProduct = _$('.viewProduct'),
            city = _$('.city'),
            shopping = _$('.shopping'),
            invite = _$('.invite'),
            goodShopping = _$('.goodShopping'),
            timer = _$('.timer'),
            deliver = _$('.deliver'),
            raise = _$('.raise'),
            collect = _$(".collect"),
            browser = _$('.browser'),
            assistGroup = _$('.assistGroup'),
            helpGroup = _$('.helpGroup'),
            assist = _$('.assist'),
            auto = _$('.auto'),
            treasure = _$('.treasure'),
            addproduct = _$('.addproduct');
        auto.addEventListener('click', () => {
            this.autoDoTask();
        })

        signIn!.addEventListener('click', async () => {
            this.signInEvent();
        });

        deliver!.addEventListener('click', async () => {
            this.deliverEvent()
        });

        treasure!.addEventListener('click', async () => {
            this.openTreasure()
        });

        master!.addEventListener('click', async () => {
            this.doTask(3, `开始每天主会场任务`, "shoppingActivityVos");
        });
        addproduct!.addEventListener('click', async () => {
            this.addproductEvent();
        });
        shopping!.addEventListener('click', async () => {
            this.doTask(9, `开始自动逛逛会场任务`, "shoppingActivityVos");
        });
        goodShopping!.addEventListener('click', async () => {
            this.doTask(16, `开始自动逛逛好物会场任务`, "shoppingActivityVos");
        });
        funny!.addEventListener('click', async () => {
            this.doTask(14, `开始自动好玩互动任务`, "shoppingActivityVos");
        });
        others!.addEventListener('click', async () => {
            this.doTask(15, `开始自动好玩互动任务`, "shoppingActivityVos");
        });
        viewProduct!.addEventListener('click', async () => {
            this.viewProductEvent();
        });

        browser!.addEventListener('click', async () => {
            this.browserEvent();
        });

        steal!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始抢夺红包`)
            if (new Date().getHours() < 20) {
                alert('不在使用时间范围内！')
            } else {
                this.steal();
            }
        });

        collect!.addEventListener('click', async () => {
            Utils.outPutLog(this.outputTextarea, `开始收取金币`)
            await this.collect();
        });

        group!.addEventListener('click', () => {
            this.group();
        });
        timer!.addEventListener('click', () => {
            this.switchTimer();
        });
        helpGroup!.addEventListener('click', () => {
            this.helpGroup();
        });
        help!.addEventListener('click', () => {
            this.help();
        });

        invite!.addEventListener('click', () => {
            this.getInvite();
        })
        assistGroup!.addEventListener('click', () => {
            const link = _$('.groupLink') as HTMLInputElement;
            this.assistGroup(link.value);
        })
        assist!.addEventListener('click', () => {
            const link = _$('.inviteLink') as HTMLInputElement;
            this.assist(link.value);
        })
        raise!.addEventListener('click', () => {
            this.raise();
        })
        city!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始城市版图任务`)
            this.visit();
        })
        let e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
    }

    async signInEvent() {
        return new Promise(async reslove => {
            let taskVo = this.getTaskById(1);
            Utils.outPutLog(this.outputTextarea, `开始每天签到任务`)
            if (!taskVo || taskVo["status"] == 2) {
                Utils.outPutLog(this.outputTextarea, `系统尚未分配到该任务或者任务已完成，先去完成其他任务吧~`)
            } else {
                await this.single(1, "1");
            }
            reslove();
        })
    }

    async deliverEvent() {
        return new Promise(async reslove => {
            let taskVo = this.getTaskById(24);
            Utils.outPutLog(this.outputTextarea, `开始快递小哥送快递任务`);
            if (!taskVo || taskVo["status"] == 2) {
                Utils.outPutLog(this.outputTextarea, `系统尚未分配到该任务或者任务已完成，先去完成其他任务吧~`)
            } else {
                await this.multi(24, "1", 5);
                await this.updateTask();
            }
            reslove()
        })
    }

    async addproductEvent() {
        return new Promise(async reslove => {
            let taskVo = this.getTaskById(101);
            if (!taskVo || taskVo["status"] == 2) {
                Utils.outPutLog(this.outputTextarea, `系统尚未分配到该任务或者任务已完成，先去完成其他任务吧~`)
            } else {
                Utils.outPutLog(this.outputTextarea, `开始自动加购好物任务`)
                await this.add(taskVo["productInfoVos"], taskVo["taskId"]);
                await this.updateTask();
            }
            reslove()
        })
    }

    async viewProductEvent() {
        return new Promise(async reslove => {
            let taskVo = this.getTaskById(100);
            if (!taskVo || taskVo["status"] == 2) {
                Utils.outPutLog(this.outputTextarea, `系统尚未分配到该任务或者任务已完成，先去完成其他任务吧~`)
            } else {
                Utils.outPutLog(this.outputTextarea, `开始自动浏览好物任务`)
                await this.view(taskVo["productInfoVos"], taskVo["taskId"]);
                await this.updateTask();
            }
            reslove()
        })
    }

    async browserEvent() {
        return new Promise(async reslove => {
            Utils.outPutLog(this.outputTextarea, `开始自逛逛商店任务`)
            let taskVo = this.getTaskById(10);
            if (!taskVo || taskVo["status"] == 2) {
                Utils.outPutLog(this.outputTextarea, `系统尚未分配到该任务或者任务已完成，先去完成其他任务吧~`)
            } else {
                await this.browser(taskVo["browseShopVo"], taskVo["taskId"]);
                await this.updateTask();
            }
            reslove()
        })
    }

    async doTask(taskId: number, title: string, key: string, once: boolean = false) {
        let taskVo = this.getTaskById(taskId);
        Utils.outPutLog(this.outputTextarea, title)
        if (!taskVo || taskVo["status"] == 2) {
            Utils.outPutLog(this.outputTextarea, `系统尚未分配到该任务或者任务已完成，先去完成其他任务吧~`)
        } else {
            await this.send(taskVo[key], taskVo["taskId"]);
            await this.updateTask();
        }
    }

    async autoDoTask() {
        Utils.outPutLog(this.outputTextarea, '开始自动一键执行任务');
        await this.updateTask();
        this.helpGroup();
        this.help();
        await this.signInEvent();
        await this.deliverEvent();
        await this.browserEvent();
        await this.viewProductEvent();
        await this.doTask(3, `开始每天主会场任务`, "shoppingActivityVos");
        await this.doTask(9, `开始自动逛逛会场任务`, "shoppingActivityVos");
        await this.doTask(14, `开始自动好玩互动任务`, "shoppingActivityVos");
        await this.doTask(16, `开始自动逛逛好物会场任务`, "shoppingActivityVos");
        await this.doTask(15, `开始自动好玩互动任务`, "shoppingActivityVos");
        await this.addproductEvent();
        await this.visit();
        await this.openTreasure();
        Utils.outPutLog(this.outputTextarea, '所有任务已完成');
    }

    getTaskById(id: number) {
        return this.taskVos.filter((value) => {
            return value['taskId'] == id;
        })[0]
    }

    single(taskId: number, itemId: string) {
        return new Promise(reslove => {
            let extraData = {
                id: "homeWorldCityCourierSmashId0",
                data: {
                    inviteId: "-1",
                    stealId: "-1",
                    rnd:this.getRnd(),
                    taskId: taskId
                }
            };
            let postData = { "taskId": taskId, "itemId": itemId, "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":${taskId},\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "shopSign": "" };
            Utils.request("stall_collectScore", postData).then((res) => {
                Utils.outPutLog(this.outputTextarea, res.data.bizMsg);
                reslove();
            }).catch(() => {
                reslove();
            })
        })
    }

    async multi(taskId: number, itemId: string, count: number) {
        for (let i = 0; i < count; i++) {
            await this.single(taskId, itemId);
            await Utils.sleep(8000)
        }
    }

    collect() {
        return new Promise(reslove => {
            let extraData = {
                id: "jmdd-react-smash_0",
                data: {
                    inviteId: "-1",
                    stealId: "-1",
                    rnd:this.getRnd(),
                    taskId: "collectProducedCoin"
                }
            };
            let postData = {
                "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":\"collectProducedCoin\",\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`
            };
            Utils.request('stall_collectProduceScore', postData).then(res => {
                Utils.outPutLog(this.outputTextarea, "领取金币:" + res.data.result.produceScore);
                reslove();
            })
        })
    }

    switchFlag: boolean = true;
    switchtimer: number = 0;
    switchTimer() {
        if (this.switchFlag) {
            let span = +(<HTMLInputElement>_$('.timerSpan')).value;
            if (span <= 60000) {
                alert(`当前领取时间间隔太短了！建议调整一下！`)
                return;
            }
            Utils.outPutLog(this.outputTextarea, "开启定时器");
            (_$('.timer') as HTMLButtonElement).innerText = '取消定时收取';
            this.switchtimer = window.setInterval(() => {
                this.collect();
            }, span)
        } else {
            Utils.outPutLog(this.outputTextarea, "停止定时器");
            (_$('.timer') as HTMLButtonElement).innerText = '定时收取金币';
            window.clearInterval(this.switchtimer);
            this.timer = 0;
        }
        this.switchFlag = !this.switchFlag;

    }
    async visit() {
        return new Promise(async next => {
            Utils.request('stall_myShop', {}).then(async res => {
                let shopList = res.data.result.shopList;
                let self = this, length = shopList.length;
                for (let i = 0; i < length; i++) {
                    let city = shopList[i], shopSign = city['shopId'];
                    Utils.outPutLog(self.outputTextarea, `任务城市进度：${i + 1}/${length}当前任务城市：${city['name']}`);
                    await Utils.sleep(3000);
                    let postData = { "shopSign": shopSign };
                    await new Promise(resolve => {
                        Utils.request('stall_getTaskDetail', postData).then(async (result) => {
                            let taskVos = result.data.result.taskVos;
                            for (let j = 0; j < taskVos.length; j++) {
                                let taskVo = taskVos[j];
                                if (taskVo['status'] == 2) {
                                    Utils.outPutLog(self.outputTextarea, `当前任务已完成!跳过~`);
                                } else {
                                    await new Promise(resolveFn => {
                                        Utils.outPutLog(self.outputTextarea, `定时模拟等待任务结束!`);
                                        setTimeout(async () => {
                                            let extraData = {
                                                id: "domainAutoSignSmashId",
                                                data: {
                                                    inviteId: "-1",
                                                    stealId: "-1",
                                                    rnd:this.getRnd(),
                                                    taskId: taskVo['taskId']
                                                }
                                            };
                                            let postData = { "taskId": taskVo['taskId'], "itemId": this.getItemIdByName(taskVo, taskVo['taskName'], taskVo['taskId']), "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":${taskVo['taskId']},\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "shopSign": shopSign };
                                            await Utils.request("stall_collectScore", postData).then(() => {
                                                Utils.outPutLog(self.outputTextarea, `当前任务已完成!`);
                                                resolveFn();

                                            })
                                        }, (Config.timeoutSpan + Utils.random(300, 500)));
                                    })
                                }
                            }
                            Utils.outPutLog(self.outputTextarea, `任务已完成${i + 1}/${length}`);
                            resolve();
                        }).catch(() => {
                            resolve();
                        })
                    })
                }
                next();
            }).catch(() => {
                next();
            })
        })
    }

    getVoNameById(id: number): string {
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

    getItemIdByName(task: any, name: string, taskId: number) {
        let VoName = this.getVoNameById(taskId);
        if (taskId == 1) {
            return task[VoName]['itemId']
        } else {
            let shop = task[VoName].filter((shopVo: any) => {
                return shopVo['shopName'] == task['taskName'] || shopVo['subtitle'] == task['taskName'];
            })[0];
            return shop ? shop['itemId'] : task[VoName][0]['itemId'];
        }
    }

    async browser(data: any, taskId: number) {
        return new Promise(async next => {
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
                await new Promise(async resolve => {
                    await Utils.sleep(Config.timeoutSpan + Utils.random(300, 500));
                    await Utils.request("stall_collectScore", postData).then(() => {
                        Utils.outPutLog(self.outputTextarea, `模拟关注店铺中!`);
                        Utils.request('followShop', { "shopId": data[i]['shopId'], "follow": true, "type": "0" }).then(async () => {
                            Utils.outPutLog(self.outputTextarea, `等待8s任务完成后再领取奖励中`);
                            await Utils.sleep(8000 + Utils.random(300, 500));
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
                            Utils.request('stall_collectScore', postData).then((res) => {
                                Utils.outPutLog(self.outputTextarea, `${res?.data?.result?.successToast}`);
                                Utils.outPutLog(self.outputTextarea, `操作成功！任务序号：${i + 1}/${length}`);
                                if (i + 1 >= length) {
                                    Utils.outPutLog(self.outputTextarea, `当前任务已完成!`);
                                }
                                resolve();
                            }).catch(() => {
                                resolve();
                            })
                        })
                    }).catch(() => {
                        resolve();
                    })
                })
            }
            next();
        })
    }



    async view(data: any, taskId: number) {
        return new Promise(async next => {
            let length = data.length;
            for (let i = 0; i < length; i++) {
                let postData = { "taskId": taskId };
                await new Promise(async resolve => {
                    await Utils.sleep(Config.timeoutSpan + Utils.random(300, 500));
                    await Utils.request("stall_getFeedDetail", postData).then(async (res) => {
                        Utils.outPutLog(this.outputTextarea, `模拟浏览商品中!`);
                        let totalCounter = 5;
                        for (let j = 0; j < totalCounter; j++) {
                            let productInfoVos = res.data.result.viewProductVos[i].productInfoVos,
                                productInfoVo = productInfoVos[j],
                                taskId = res.data.result.viewProductVos[i]['taskId'];
                            await new Promise(async resolveFn => {
                                await Utils.sleep(5000 + Utils.random(300, 500));
                                let extraData = {
                                    id: "jmdd-react-smash_77",
                                    data: {
                                        inviteId: "-1",
                                        stealId: "-1",
                                        rnd:this.getRnd(),
                                        taskId: taskId
                                    }
                                };
                                let postData = { "taskId": taskId, "itemId": productInfoVo['itemId'], "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":${taskId},\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "shopSign": "" };
                                Utils.request('stall_collectScore', postData).then(() => {
                                    resolveFn();
                                    Utils.outPutLog(this.outputTextarea, `浏览商品完成!`);
                                    if (j >= totalCounter - 1) {
                                        Utils.outPutLog(this.outputTextarea, `操作成功！任务序号：${i + 1}/${length}`);
                                        if (i + 1 >= length) {
                                            Utils.outPutLog(this.outputTextarea, `当前任务已完成!`);
                                        }
                                        resolve();
                                    }
                                }).catch(() => {
                                    resolveFn();
                                })
                            })
                        }
                    }).catch(() => {
                        resolve();
                    })
                })
            }
            next();
        })
    }

    add(data: any, taskId: number) {
        return new Promise(async next => {
            let self = this, length = data.length;
            for (let i = 0; i < length; i++) {
                let postData = { "taskId": taskId };
                await new Promise(async resolve => {
                    await Utils.sleep(Config.timeoutSpan + Utils.random(300, 500));
                    await Utils.request("stall_getFeedDetail", postData).then(async (res) => {
                        Utils.outPutLog(self.outputTextarea, `模拟加购商品中!`);
                        let totalCounter = 5;
                        for (let j = 0; j < totalCounter; j++) {
                            let productInfoVos = res.data.result.addProductVos[i].productInfoVos,
                                productInfoVo = productInfoVos[j],
                                taskId = res.data.result.addProductVos[i]['taskId'];
                            await new Promise(async resolveFn => {
                                await Utils.sleep(5000 + Utils.random(300, 500));
                                let extraData = {
                                    id: "jmdd-react-smash_174",
                                    data: {
                                        inviteId: "-1",
                                        stealId: "-1",
                                        rnd:this.getRnd(),
                                        taskId: taskId
                                    }
                                };
                                let postData = { "taskId": taskId, "itemId": productInfoVo['itemId'], "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":${taskId},\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "shopSign": "" };
                                Utils.request('stall_collectScore', postData).then(() => {
                                    resolveFn();
                                    Utils.outPutLog(self.outputTextarea, `加购商品完成!`);
                                    if (j >= totalCounter - 1) {
                                        Utils.outPutLog(self.outputTextarea, `操作成功！任务序号：${i + 1}/${length}`);
                                        if (i + 1 >= length) {
                                            Utils.outPutLog(self.outputTextarea, `当前任务已完成!`);
                                        }
                                        resolve();
                                    }
                                }).catch(() => {
                                    resolveFn();
                                })
                            })
                        }
                    }).catch(() => {
                        resolve();
                    })
                })
            }
            next();
        })
    }

    async steal() {
        Utils.request('stall_pk_getStealForms', {}).then(async (res) => {
            let stealGroups = res.data.result.stealGroups;
            let self = this, length = stealGroups.length;
            for (let i = 0; i < length; i++) {
                let steal = stealGroups[i];
                let extraData = {
                    id: "jmdd-react-smash_74",
                    data: {
                        inviteId: "-1",
                        stealId: steal['id'],
                        rnd:this.getRnd(),
                        taskId: `BUSINESSID_${this.getRnd()}`
                    }
                };
                let postData = { "stealId": steal['id'], "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":\"${extraData.data.taskId}\",\"rnd\":\"${extraData.data.rnd}\",\"inviteId\":\"-1\",\"stealId\":\"${steal['id']}\"},\"secretp\":\"${this.secretp}\"}` };
                await new Promise(resolve => {
                    setTimeout(async () => {
                        Utils.request("stall_pk_doSteal", postData).then(async (res) => {
                            Utils.outPutLog(self.outputTextarea, `夺取红包中!`);
                            Utils.outPutLog(self.outputTextarea, res.data.bizMsg);
                            resolve();
                        })
                    }, (5000 + Utils.random(300, 500)));
                })
            }
            Utils.outPutLog(self.outputTextarea, '已偷取所有可以偷取的用户的红包');
        })
    }

    async openTreasure() {
        Utils.outPutLog(this.outputTextarea,'开始自动寻宝箱领金币任务');
        Utils.request('qryCompositeMaterials', { "qryParam": "[{\"type\":\"advertGroup\",\"mapTo\":\"homeFeedBanner\",\"id\":\"04891279\"},{\"type\":\"advertGroup\",\"mapTo\":\"homeBottomBanner\",\"id\":\"04888981\"},{\"type\":\"advertGroup\",\"mapTo\":\"homeBottomBanner2\",\"id\":\"04958033\"}]", "activityId": "4SJUHwGdUQYgg94PFzjZZbGZRjDd", "pageId": "", "reqSrc": "", "applyKey": "raiders_venue_lite" }).then(async (res) => {
            let homeBottomBanner = res.data.homeBottomBanner2.list;
            for (let i = 0; i < 10; i++) {
                let shop = homeBottomBanner[i];
                let extraData = {
                    id: "domainAutoSignSmashId",
                    data: {
                        inviteId: "-1",
                        stealId: "-1",
                        rnd:this.getRnd(),
                        taskId: shop['link']
                    }
                };
                let postData = { "shopSign": shop['link'], "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":\"${shop['link']}\",\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}` };
                await new Promise(resolve => {
                    setTimeout(async () => {
                        Utils.request("stall_shopSignInWrite", postData).then(async (res) => {
                            Utils.outPutLog(this.outputTextarea, `(${i + 1}/10)寻宝箱领金币中`);
                            Utils.outPutLog(this.outputTextarea, res.data.bizMsg);
                            resolve();
                        })
                    }, (5000 + Utils.random(300, 500)));
                })
            }
            Utils.outPutLog(this.outputTextarea, '已领取所有可以寻宝箱的金币');
        })
    }

    send(data: any, taskId: number, once: boolean = false) {
        return new Promise(async next => {
            let self = this, length = data.length;
            for (let i = 0; i < length; i++) {
                await new Promise(async resolve => {//循环使用
                    await Utils.sleep(Config.timeoutSpan + Utils.random(300, 500));
                    let extraData = {
                        id: "jmdd-react-smash_73",
                        data: {
                            inviteId: "-1",
                            stealId: "-1",
                            rnd:this.getRnd(),
                            taskId: taskId
                        }
                    };
                    let postData = { "taskId": taskId, "itemId": data[i]['itemId'], "actionType": "1", "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":${taskId},\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"-1\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "shopSign": "" };    
                    await Utils.request('stall_collectScore', postData).then(async (res) => {
                        if (once) {//立即完成
                            resolve();
                        } else {
                            if (res.data.result) {
                                await Utils.sleep(8000);
                                Utils.outPutLog(self.outputTextarea, `等待8s任务完成后再领取奖励中`);
                                Utils.request('qryViewkitCallbackResult', { "clientLanguage": "zh", "dataSource": "newshortAward", "method": "getTaskAward", "reqParams": `{\"taskToken\":\"${res.data.result.taskToken}\"}`, "taskSDKVersion": "1.0.3", "vkVersion": "1.0.0" }).then(() => {
                                    Utils.outPutLog(self.outputTextarea, `操作成功！任务序号：${i + 1}/${length}`);
                                    if (i + 1 >= length) {
                                        Utils.outPutLog(self.outputTextarea, `当前任务已完成!`);
                                    }
                                    resolve();
                                }).catch(() => {
                                    resolve();
                                })
                            } else {
                                Utils.outPutLog(self.outputTextarea, `操作成功！任务序号：${i + 1}/${length}`);
                                resolve();
                            }
                        }
                    }).catch(() => {
                        resolve();
                    })
                })
            }
            next();
        })
    }

    raise() {
        Utils.request('stall_raise').then((res: any) => {
            if (res.data.bizCode == 0) {
                Utils.outPutLog(this.outputTextarea, `操作成功！获取奖励如下:${JSON.stringify(res.data.result.levelUpAward)}`);
            } else {
                Utils.outPutLog(this.outputTextarea, `操作失败！${res.data.bizMsg}`);
            }
        })
    }

    getInvite() {
        Utils.request('stall_getTaskDetail', { "shopSign": "" }).then((res) => {
            const inviteId = res.data.result.inviteId.replace("#/", "");
            if (inviteId) {
                Utils.outPutLog(this.outputTextarea, `获取到邀请地址:${this.inviteUrl}${inviteId}`);
                Utils.copyText(`${this.inviteUrl}${inviteId}`);
            } else {
                Utils.outPutLog(this.outputTextarea, `数据异常`);
            }
        })
    }

    help() {
        Utils.outPutLog(this.outputTextarea, `操作成功！谢谢你的助力！`);
        // let InviteIdArr = [
        // ];
        // this.assist(this.inviteUrl + InviteIdArr[Utils.random(0, InviteIdArr.length - 1)]);
    }

    helpGroup(flag: boolean = true) {
        if (new Date().getHours() >= 9) {
            let InviteIdArr: string | any[] = [
                "标记",
            ];
            if (InviteIdArr.length == 0 || InviteIdArr[0] == "标记") {
                return;
            }
            let inviteUrl = this.groupInvitedUrl + InviteIdArr[Utils.random(0, InviteIdArr.length - 1)];
            this.assistGroup(inviteUrl, flag);
        }
    }

    group() {
        Utils.request('stall_pk_getHomeData').then((res) => {
            const groupAssistInviteId = res.data.result.groupInfo.groupAssistInviteId;
            if (groupAssistInviteId) {
                Utils.outPutLog(this.outputTextarea, `获取到邀请地址:${this.groupInvitedUrl}${groupAssistInviteId}`);
                Utils.copyText(`${this.groupInvitedUrl}${groupAssistInviteId}`);
            } else {
                Utils.outPutLog(this.outputTextarea, `请先创建商圈！`);
            }
        });
    }

    assistGroup(url: string, flag: boolean = true) {
        if (!url || !url.includes('inviteId')) {
            alert("请输入要助力的商圈分享链接或输入正确的商圈分享地址！");
            return;
        }
        const inviteId = Utils.getSearchString(url, "inviteId").replace("#/", "");
        let extraData = {
            id: "jmdd-react-smash_0",
            data: {
                inviteId: inviteId,
                stealId: "-1",
                rnd:this.getRnd(),
                taskId: `BUSINESSID_${this.getRnd()}`
            }
        };
        let postData = { "confirmFlag": 1, "inviteId": `${inviteId}`, "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":\"${extraData['data']['taskId']}\",\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"${inviteId}\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}` };
        Utils.request('stall_pk_assistGroup', postData)
            .then((res) => {
                if (flag) {
                    Utils.outPutLog(this.outputTextarea, `操作成功！谢谢你为我的商圈助力！`);
                    Utils.outPutLog(this.outputTextarea, `助力结果：${res.data.bizMsg}`);
                }
            });
    }

    assist(url: string) {
        if (!url && !url.includes('inviteId')) {
            alert("请输入要助力的分享链接或输入正确的分享地址！");
            return;
        }
        const inviteId = Utils.getSearchString(url, "inviteId").replace("#/", "");
        Utils.request('stall_getHomeData', { "inviteId": inviteId }).then((res: any) => {
            let extraData = {
                id: "jmdd-react-smash_0",
                data: {
                    inviteId: inviteId,
                    stealId: "-1",
                    rnd:this.getRnd(),
                    taskId: `2`
                }
            };
            const itemId = res.data.result.homeMainInfo.guestInfo.itemId;
            let postData = { "taskId": "2", "itemId": itemId, "ss": `{\"extraData\":${this.getExtraData(extraData)},\"businessData\":{\"taskId\":\"2\",\"rnd\":\"${extraData['data']['rnd']}\",\"inviteId\":\"${inviteId}\",\"stealId\":\"-1\"},\"secretp\":\"${this.secretp}\"}`, "inviteId": inviteId };
            Utils.request('stall_collectScore', postData).then((res: any) => {
                Utils.outPutLog(this.outputTextarea, `助力结果：${res.data.bizMsg}`);
            })
        })
    }

    getExtraData(args: any) {
        return JSON.stringify(Object.assign(smashUtils.get_info(args)['data'],{"buttonid":args['id'],"sceneid":"homePageh5","appid":"50073"}));

    }

    getRnd():string{
        return Math.floor(1e6 * Math.random()).toString();
    }

}