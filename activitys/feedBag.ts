import Activity from "../interface/Activity";
import Utils, { _$ } from "../utils/utils";
import Config from "../config/config";


export default class feedBag implements Activity {
    rootURI: string = "https://ms.jr.jd.com/gw/generic/uc/h5/m/";
    baseReqData: Object = { "channelLv": null, "source": "0", "riskDeviceParam": "{\"eid\":\"\",\"fp\":\"\",\"sdkToken\":\"\",\"token\":\"\",\"jstub\":\"\"}" };
    // baseReqData: Object = {"riskDeviceParam":"{\"eid\":\"\",\"fp\":\"\",\"sdkToken\":\"\",\"token\":\"\",\"jstub\":\"\"}","channelLv":null,"source":"0"};
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
    list(): void {
        let msg = `
            <div>
                <button class="login" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">查看详情</button>
                <button class="getMainMission" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;">每天主线任务</button>
            </div>
        <div>`;
        this.content.innerHTML = msg;
        this.container.appendChild(this.content);
        const l = _$(".login"),
            g = _$(".getMainMission");

        g!.addEventListener('click', async () => {
            Utils.outPutLog(this.outputTextarea, `每天主线任务`);
            this.getMainMission();
        });
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
                    let awrad = data.data.bigAwardList;
                    let { workName, prizeAmount, mid } = awrad;
                    Utils.outPutLog(this.outputTextarea, `任务名称：${workName} 任务奖励：${prizeAmount}`);
                    this.setBrowserAward(mid, prizeAmount, workName);
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

    browserAwardInit(){
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
                    Utils.outPutLog(this.outputTextarea, `任务${opMsg} 任务积分${awardNum} 用户积分${userScore}`);
                } else {
                    Utils.outPutLog(this.outputTextarea, `${data.msg}`);
                }
            } else {
                Utils.outPutLog(this.outputTextarea, `${res.resultMsg}`);
            }
        })
    }
}