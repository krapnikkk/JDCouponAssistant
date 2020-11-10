import Config from "../config/config";
import Activity from "../interface/Activity";
import Utils, { _$ } from "../utils/utils";

export default class StarMall implements Activity {
    data: any = [];
    token: string = "jd6df03bd53f0f292f";
    container: HTMLDivElement;
    outputTextarea: HTMLTextAreaElement;
    constructor(containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    async get(): Promise<void> {
        Utils.clientPost("mcxhd_starmall_getStarShopPage", { "token": this.token }).then((res) => {
            let shopId = res.result.shopId;
            this.doTask(shopId)
        })
    }

     doTask(shopId: string) {
        Utils.clientPost("mcxhd_starmall_taskList", { "shopId": shopId, "token": this.token }).then(async (res: any) => {
            this.data = res.result.tasks;
                await Utils.sleep(Config.timeoutSpan);
                Utils.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[0].subItem[0].itemId, "taskType": "1", "shopId": shopId, "token": this.token }).then((json)=>{Utils.outPutLog(this.outputTextarea, json.retMessage)})
                await Utils.sleep(Config.timeoutSpan);
                Utils.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[1].subItem[0].itemId, "taskType": "2", "shopId": shopId, "token": this.token }).then((json)=>{Utils.outPutLog(this.outputTextarea, json.retMessage)})
                await Utils.sleep(Config.timeoutSpan);
                Utils.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[2].subItem[0].itemId, "taskType": "4", "shopId": shopId, "token": this.token }).then((json)=>{Utils.outPutLog(this.outputTextarea, json.retMessage)})
                await Utils.sleep(Config.timeoutSpan);
                Utils.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[2].subItem[1].itemId, "taskType": "4", "shopId": shopId, "token": this.token }).then((json)=>{Utils.outPutLog(this.outputTextarea, json.retMessage)})
                await Utils.sleep(Config.timeoutSpan);
                Utils.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[2].subItem[2].itemId, "taskType": "4", "shopId": shopId, "token": this.token }).then((json)=>{Utils.outPutLog(this.outputTextarea, json.retMessage)})
                await Utils.sleep(Config.timeoutSpan);
                Utils.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[2].subItem[3].itemId, "taskType": "4", "shopId": shopId, "token": this.token }).then((json)=>{Utils.outPutLog(this.outputTextarea, json.retMessage)})
                await Utils.sleep(Config.timeoutSpan);
                Utils.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[2].subItem[4].itemId, "taskType": "4", "shopId": shopId, "token": this.token }).then((json)=>{Utils.outPutLog(this.outputTextarea, json.retMessage)})
                await Utils.sleep(Config.timeoutSpan);
                Utils.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[3].subItem[0].itemId, "taskType": "4", "shopId": shopId, "token": this.token }).then((json)=>{Utils.outPutLog(this.outputTextarea, json.retMessage)})
                await Utils.sleep(Config.timeoutSpan);
                Utils.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[4].subItem[0].itemId, "taskType": "6", "shopId": shopId, "token": this.token }).then((json)=>{Utils.outPutLog(this.outputTextarea, json.retMessage)})
                await Utils.sleep(Config.timeoutSpan);
                Utils.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[5].subItem[0].itemId, "taskType": "5", "shopId": shopId, "token": this.token }).then((json)=>{Utils.outPutLog(this.outputTextarea, json.retMessage)})
                await Utils.sleep(Config.timeoutSpan);
                Utils.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[6].subItem[0].itemId, "taskType": "5", "shopId": shopId, "token": this.token }).then((json)=>{Utils.outPutLog(this.outputTextarea, json.retMessage)})
                await Utils.sleep(Config.timeoutSpan);
                Utils.clientPost("mcxhd_starmall_doTask", { "itemId": this.data[7].subItem[0].itemId, "taskType": "3", "shopId": shopId, "token": this.token }).then((json)=>{Utils.outPutLog(this.outputTextarea, json.retMessage)})
                await Utils.sleep(Config.timeoutSpan);
                Utils.outPutLog(this.outputTextarea, '所有任务已完成~')
            
        })
    }

    list(){
        const content = document.createElement("div");
        content.innerHTML = `<h1 style="color:red;font-weight: 700;font-size: 18px;">本活动页脚本自动执行,请留意控制台输出</h1>`
        this.container.appendChild(content);
    }

}