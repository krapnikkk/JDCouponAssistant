import Activity from "../interface/Activity";
import Utils, { _$ } from "../utils/utils";
import Config from "../config/config";

export default class TimeMachine implements Activity {
    data: any = [];
    taskVos: Array<any> = [];
    timer: number = 1000;
    container: HTMLDivElement;
    outputTextarea: HTMLTextAreaElement;
    plusAdvertList: Array<any> = [];
    t1AdvertList: Array<any> = [];
    nearbyShopList: Array<any> = [];
    sendHomeShopList: Array<any> = [];
    inviteUrl: string = 'https://h5.m.jd.com/babelDiy/Zeus/3DDunaJMLDamrmGwu73QbqtGtbX1/index.html?babelChannel=ttt4&inviteId=';
    ePin: string = '';
    position: any = { lat: "22.578764099999997", lng: "113.9463329" };
    constructor(containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    async get(): Promise<void> {
        // alert('请允许浏览器获取地理位置扩展任务');
        // await this.getLocation().then((location) => {
        //     console.log(location);
        // });

        // console.log(this.position);
        Promise.all([
            Utils.publicRequest("bc_getHome", this.position),
            this.updateTask(),
        ]).then(([homeData, taskData]) =>
            Promise.all([(<any>homeData), (<any>taskData)])
        ).then(([homeData]) => {
            let homeAdvertVO = homeData.data.result.homeAdvertVO;
            this.plusAdvertList = homeAdvertVO.plusAdvertList;
            this.t1AdvertList = homeAdvertVO.t1AdvertList;
            this.nearbyShopList = homeAdvertVO.nearbyShopList;
            this.sendHomeShopList = homeAdvertVO.sendHomeShopList;
            this.ePin = homeData.data.result.ePin;
            this.list();
        });
    }

    updateTask(): Promise<any> {
        return new Promise(reslove => {
            Utils.publicRequest("bc_taskList", this.position).then((res: any) => {
                this.data = res.data.result;
                if (this.data) {
                    this.taskVos = this.data.taskList;
                    let value = '任务数据更新成功';
                    for (let j = 0; j < this.taskVos.length; j++) {
                        value += `\n${this.taskVos[j]["mainTitle"]}：${this.taskVos[j]["isCompleted"] ? "已完成" : "未完成"}(${this.taskVos[j]["taskProgress"]})`
                    }
                    Utils.outPutLog(this.outputTextarea, value);
                    
                }
                reslove();
            })
        })
    }

    list(): void {
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
        const signIn = _$('.signIn'),
            shopping_big = _$('.shopping_big'),
            help = _$('.help'),
            funny = _$('.funny'),
            collect = _$('.collect'),
            place = _$('.place'),
            shopping = _$('.shopping'),
            shopping_super = _$('.shopping_super'),
            invite = _$('.invite'),
            timer = _$('.timer'),
            raise = _$('.raise'),
            visit = _$('.visit'),
            play = _$('.play'),
            assist = _$('.assist'),
            market = _$('.market'),
            auto = _$('.auto');

        auto.addEventListener('click', () => {
            this.autoDoTask();
        })

        signIn!.addEventListener('click', async () => {
            this.signInEvent();
        });


        shopping!.addEventListener('click', async () => {
            this.doTask(3, `开始逛“精选”品牌店铺任务`);
        });
        market!.addEventListener('click', async () => {
            this.doTask(4, `开始逛同城好店任务`);
        });

        funny!.addEventListener('click', async () => {
            this.doTask(5, `开始体验AR热爱空间任务`);
        });

        place!.addEventListener('click', async () => {
            this.doTask(6, `开始逛11.11精选会场任务`);
        });

        shopping_super!.addEventListener('click', async () => {
            this.doTask(1, `开始逛“超级”品牌店铺任务`);
        });

        shopping_big!.addEventListener('click', async () => {
            this.doTask(2, `开始逛“大牌”品牌店铺任务`);
        });

        visit!.addEventListener('click', async () => {
            this.doTask(7, `开始浏览会场采集能量包任务`);
        });

        play!.addEventListener('click', async () => {
            Utils.outPutLog(this.outputTextarea, `开始套圈圈游戏任务`)
            await this.repeatTask({}, 10, 'bc_getGameReward', { "score": 200 });
        });

        collect!.addEventListener('click', async () => {
            this.collect();
        });

        timer!.addEventListener('click', () => {
            this.switchTimer();
        });

        help!.addEventListener('click', () => {
            this.help();
        });

        invite!.addEventListener('click', () => {
            this.getInvite();
        })

        assist!.addEventListener('click', () => {
            const link = _$('.inviteLink') as HTMLInputElement;
            this.assist(link.value);
        })
        raise!.addEventListener('click', () => {
            this.raise();
        })
    }

    async signInEvent() {
        Utils.outPutLog(this.outputTextarea, `开始签到任务`)
        return new Promise(async reslove => {
            let postData = { "taskType": 0 }
            await Utils.publicRequest('bc_doTask', postData).then(async (res) => {
                if (res.data.result) {
                    Utils.outPutLog(this.outputTextarea, `操作成功！获得能量${res.data.result.energy || res.data.result.rewardEnergy}`);
                } else {
                    Utils.outPutLog(this.outputTextarea, `${res.data.bizMsg}`);
                }
            })
            reslove();
        })
    }

    async doTask(taskId: number, title: string) {
        let taskVo = this.getTaskById(taskId);
        Utils.outPutLog(this.outputTextarea, title)
        if (!taskVo || taskVo["isCompleted"]) {
            Utils.outPutLog(this.outputTextarea, `任务已完成，先去完成其他任务吧~`)
        } else {
            if (taskId == 1) {
                await this.singleDoTask(taskVo, this.t1AdvertList);
            } else if (taskId == 2) {
                await this.singleDoTask(taskVo, this.t1AdvertList);
            } else if (taskId == 3) {
                await this.repeatTask(taskVo, taskVo.timesLimit);
            } else if (taskId == 4) {
                await this.singleDoTask(taskVo, this.nearbyShopList);
            } else if (taskId == 5) {
                await this.repeatTask(taskVo, taskVo.timesLimit);
            } else if (taskId == 6) {
                await this.repeatTask(taskVo, taskVo.timesLimit);
            } else if (taskId == 7) {
                await this.doSubTask(taskVo);
            }
        }
    }

    async autoDoTask() {
        Utils.outPutLog(this.outputTextarea, '开始自动一键执行任务');
        await this.signInEvent();
        await this.doTask(3, `开始逛“精选”品牌店铺任务`);
        await this.doTask(5, `开始体验AR热爱空间任务`);
        await this.doTask(6, `开始逛11.11精选会场任务`);
        await this.doTask(1, `开始逛“超级”品牌店铺任务`);
        await this.doTask(2, `开始逛“大牌”品牌店铺任务`);
        await this.doTask(7, `开始浏览会场采集能量包任务`);
        await this.doTask(4, `开始逛同城好店任务`);
        await this.updateTask();
        Utils.outPutLog(this.outputTextarea, `开始套圈圈游戏任务`)
        await this.repeatTask({}, 10, 'bc_getGameReward', { "score": 200 });
        Utils.outPutLog(this.outputTextarea, '所有任务已完成');
    }

    getTaskById(id: number) {
        return this.taskVos.filter((value) => {
            return value['taskType'] == id;
        })[0]
    }

    collect() {
        return new Promise(reslove => {
            Utils.publicRequest('bc_collectEnergyBall', {}).then(res => {
                if (res.data.success) {
                    Utils.outPutLog(this.outputTextarea, "领取能量:" + res.data.result.energy);
                } else {
                    Utils.outPutLog(this.outputTextarea, "领取能量:" + res.data.bizMsg);
                }
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
            (_$('.timer') as HTMLButtonElement).innerText = '定时收取能量';
            window.clearInterval(this.switchtimer);
            this.timer = 0;
        }
        this.switchFlag = !this.switchFlag;

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

    singleDoTask(data: any, args?: any) {
        return new Promise(async next => {
            let length = data.timesLimit;
            for (let i = 0; i < length; i++) {
                await Utils.sleep(Config.timeoutSpan + Utils.random(300, 500));
                let item = args[i];
                let postData = {};
                if (data.taskType == 4) {
                    let type = 1;
                    if (i >= 4) {
                        type = 2;
                    }
                    postData = { "taskType": data['taskType'], "storeId": item['storeid'], "storeType": type, "lat": this.position.lat }
                } else {
                    postData = { "taskType": data['taskType'], "shopId": item['comments0'] }
                }

                await Utils.publicRequest('bc_doTask', postData).then(async (res) => {
                    Utils.outPutLog(this.outputTextarea, `操作成功！任务序号：${i + 1}/${length}`);
                    if (res.data.result) {
                        Utils.outPutLog(this.outputTextarea, `操作成功！获得能量${res.data.result.energy}`);
                    }
                }).catch(() => {
                    next();
                })
            }
            next();
        })
    }

    doSubTask(data: any) {
        return new Promise(async next => {
            let subTaskList = data.subTaskList;
            let length = subTaskList.length;
            let ballNos = ['A', 'B', 'C'];
            for (let i = 0; i < length; i++) {
                let task = subTaskList[i];
                for (let j = 0; j < task.timesLimit; j++) {
                    await Utils.sleep(Config.timeoutSpan + Utils.random(300, 500));
                    let postData = { "taskType": data.taskType, "channel": task.channel, "babelChannel": "ttt1", "ballno": ballNos[j] }
                    await Utils.publicRequest('bc_doTask', postData).then(async (res) => {
                        if (res.data.result) {
                            Utils.outPutLog(this.outputTextarea, `操作成功！获得能量${res.data.result.energy}`);
                        }
                    })
                }
            }
            next();
        })
    }

    repeatTask(data: any, times?: number, url?: string, args?: any) {
        return new Promise(async next => {
            for (let i = 0; i < times!; i++) {
                await Utils.sleep(Config.timeoutSpan + Utils.random(300, 500));
                let postData = args || { "taskType": data['taskType'] }
                await Utils.publicRequest(url! || 'bc_doTask', postData).then(async (res) => {
                    Utils.outPutLog(this.outputTextarea, `操作成功！任务序号：${i + 1}/${times}`);
                    if (res.data.result) {
                        Utils.outPutLog(this.outputTextarea, `操作成功！获得能量${res.data.result.energy || res.data.result.rewardEnergy}`);
                    }
                })
            }
            next();
        })
    }

    raise() {
        Utils.publicRequest('bc_fragmentCharge').then((res: any) => {
            if (res.data.bizCode == 0) {
                Utils.outPutLog(this.outputTextarea, `操作成功！返回信息:${JSON.stringify(res.data.result)}`);
            } else {
                Utils.outPutLog(this.outputTextarea, `操作成功！返回信息:${JSON.stringify(res.data.bizMsg)}`);
            }
        })
    }

    getInvite() {
        Utils.outPutLog(this.outputTextarea, `获取到邀请地址:${this.inviteUrl}${this.ePin}`);
        Utils.copyText(`${this.inviteUrl}${this.ePin}`);
    }

    help() {
        Utils.outPutLog(this.outputTextarea, `操作成功！谢谢你的助力！`);
        let InviteIdArr = [
            'sfV-pa1Vgoaknh9Vq3k5bw',
            'Zn_MdAf4UAgRVbP7',
            '8LA_4ewU3Njn1lk',
            'ZmXadznxUBIHVo3yetKE'
        ];
        this.assist(this.inviteUrl + InviteIdArr[Utils.random(0, InviteIdArr.length - 1)]);
    }

    assist(url: string) {
        if (!url && !url.includes('inviteId')) {
            alert("请输入要助力的分享链接或输入正确的分享地址！");
            return;
        }
        const inviteId = Utils.getSearchString(url, "inviteId").replace("#/", "");
        Utils.publicRequest('bc_doTask', { "taskType": 8, "invitePin": inviteId }).then((res: any) => {
            Utils.outPutLog(this.outputTextarea, `助力结果：${res.data.bizMsg}`);
        })
    }

    getExtraData(args: any) {
        return JSON.stringify({ "buttonid": args['id'], "sceneid": "homePageh5", "appid": "50073" });

    }

    getRnd(): string {
        return Math.floor(1e6 * Math.random()).toString();
    }

    getLocation() {
        return new Promise((reslove) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                alert("浏览器不支持地理定位。");
                reslove();
            }

            function showPosition(position: any) {
                var lat = position.coords.latitude; //纬度
                var lag = position.coords.longitude; //经度
                reslove({ lat, lag });
            }

            function showError(error: any) {
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
        })

    }

}