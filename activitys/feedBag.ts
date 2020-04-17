import Activity from "../interface/Activity";
import Utils, { _$ } from "../utils/utils";
import Config from "../config/config";


export default class feedBag implements Activity {
    rootURI: string = "https://ms.jr.jd.com/gw/generic/uc/h5/m/";
    baseReqData: Object = { "channelLv": null, "source": "0", "riskDeviceParam": "{\"eid\":\"\",\"fp\":\"\",\"sdkToken\":\"\",\"token\":\"\",\"jstub\":\"\"}" };
    // baseReqData: Object = {"riskDeviceParam":"{\"eid\":\"\",\"fp\":\"\",\"sdkToken\":\"\",\"token\":\"\",\"jstub\":\"\"}","channelLv":null,"source":"0"};
    container: HTMLDivElement;
    params: any;
    userTotalScore: number = 0;
    shareId: string = "";
    shareRandom: string = "";
    outputTextarea: HTMLTextAreaElement;
    content: HTMLDivElement;
    shareLink: object = { "shareRandom": "1587139212990lQpOJD2ANodhfTtc592rN8AdoUJQ3Dik", "shareId": "lQpOJD2ANodhfTtc592rN8AdoUJQ3Dik" };
    // shareLink: object = { "shareRandom": "1587146063292JtfbSwE6ct05RxB_AvGf5g", "shareId": "JtfbSwE6ct05RxB_AvGf5g" };
    constructor(params: any, containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.params = params;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        this.content = document.createElement("div");
    }
    get(): void {
        this.list();
    }
    list(): void {
        let msg = `
            <div>
                <button class="login1" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">查看金贴详情</button>
                <button class="getMainMission" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">每天主线任务</button>
                <button class="getMainMission1" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">每天支线任务</button>
                <button class="userFeedAction" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">投喂金贴</button>
                <button class="share" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">获取我的助力链接</button>
                <button class="help" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">给作者助力</button>
            </div>
        <div>`;
        this.content.innerHTML = msg;
        this.container.appendChild(this.content);
        const l = _$(".login1"),
            u = _$(".userFeedAction"),
            s = _$(".share"),
            h = _$(".help"),
            g = _$(".getMainMission");

        g!.addEventListener('click', async () => {
            Utils.outPutLog(this.outputTextarea, `每天主线任务`);
            this.getMainMission();
        });
        u!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `投喂金贴`);
            this.userFeedAction();
        });
        l!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `查看金贴详情`);
            this.login1();
        });
        s!.addEventListener('click', () => {
            alert("邀请链接每天都会变动！！");
            Utils.copyText(`https://u.jr.jd.com/uc-fe-wxgrowing/feedbag/cover/channelLv=syfc/?channelLv=&sourceID=326&actflag=FE0AD3214D&isPay=N&shareId=${this.shareId}&shareRandom=${this.shareRandom}&jrcontainer=h5&jrlogin=true#/pages/home/index?id=2&type=test`);
        });
        h!.addEventListener('click', () => {
            this.login1(this.shareLink);
        });
        this.login1();
    }

    login1(options = {}) {
        fetch(this.rootURI + "login1", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: options == {} ? "reqData=" + JSON.stringify(this.baseReqData) : "reqData=" + JSON.stringify(Object.assign(options, this.baseReqData))
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.code == "0") {
                    let { userGrade, currentLevelRewardName, upGradeFeedNum, userTotalScore, nowGradeFeedingNum, shareId, shareRandom, popupType, assistanceReward } = data.data;
                    this.userTotalScore = (userTotalScore > nowGradeFeedingNum) && nowGradeFeedingNum > 0 ? nowGradeFeedingNum : userTotalScore;
                    this.shareId = shareId;
                    this.shareRandom = shareRandom;
                    if (popupType.length > 0 && popupType[0] == 1) {
                        Utils.outPutLog(this.outputTextarea, `谢谢你, 助力成功啦~ 获得金币:${assistanceReward}`);
                    } else {
                        Utils.outPutLog(this.outputTextarea, `等级:${userGrade} ${currentLevelRewardName} 可用金币:${userTotalScore} 当前进度:${nowGradeFeedingNum}/${upGradeFeedNum}`);
                    }

                } else {
                    Utils.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            } else {
                Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        })
    }

    getMainMission() {
        fetch(this.rootURI + "getMainMission", {
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
                if (data.code == "0") {
                    let allMissionDone = data.data.allMissionDone;
                    if (allMissionDone) {
                        Utils.outPutLog(this.outputTextarea, `当天的主线任务已经完成啦~`);
                    } else {
                        let awrad = data.data.bigAwardList;
                        let { workName, prizeAmount, mid } = awrad;
                        Utils.outPutLog(this.outputTextarea, `任务名称：${workName} 任务奖励：${prizeAmount}`);
                        this.setBrowserAward(mid, prizeAmount, workName);
                    }
                } else {
                    Utils.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            } else {
                Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        })
    }

    setBrowserAward(missionId: string, prizeAmount: number, workName: string) {
        fetch(this.rootURI + "setBrowserAward", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(Object.assign({ "missionId": missionId, "prizeAmount": prizeAmount, "channelType": 2 }, this.baseReqData))
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.code == "0") {
                    let opMsg = data.data.opMsg;
                    Utils.outPutLog(this.outputTextarea, `任务名称：${workName} ${opMsg}`);
                    this.browserAwardInit();
                } else {
                    Utils.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            } else {
                Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        })
    }

    browserAwardInit() {
        fetch(this.rootURI + "browserAwardInit", {
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
                if (data.code == "0") {
                    let { awardNum, userScore, opMsg } = data.data;
                    Utils.outPutLog(this.outputTextarea, `任务:${opMsg} 已获得金币:${awardNum} 可用金币:${userScore}`);
                    this.userTotalScore = userScore;
                    setTimeout(() => {
                        this.getMainMission();
                    }, 1000);
                } else {
                    Utils.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            } else {
                Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        })
    }

    userFeedAction() {
        if (this.userTotalScore <= 0) {
            Utils.outPutLog(this.outputTextarea, `可用金币不足！！`);
            return;
        }
        fetch(this.rootURI + "userFeedAction", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "reqData=" + JSON.stringify(Object.assign({ "userTotalScore": this.userTotalScore }, this.baseReqData))
        }).then(function (response) {
            return response.json()
        }).then((res) => {
            if (res.resultCode == 0) {
                let data = res.resultData;
                if (data.code == "0") {
                    let { userGrade, currentLevelRewardName, upGradeFeedingNum, upGradeExtraReward, nowGradeFeedingNum } = data.data;
                    this.userTotalScore = upGradeExtraReward;
                    Utils.outPutLog(this.outputTextarea, `等级:${userGrade} ${currentLevelRewardName} 可用金币:${upGradeExtraReward} 当前进度:${nowGradeFeedingNum}/${upGradeFeedingNum}`);
                } else {
                    Utils.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            } else {
                Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        })
    }
}