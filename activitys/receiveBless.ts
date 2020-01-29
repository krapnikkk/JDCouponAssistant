import Activity from "../interface/Activity";
import Utils, { _$ } from "../utils/utils";
import Config from "../config/config";

export default class ReceiveBless implements Activity {
    url: string = "https://api.m.jd.com/client.action";
    detailurl: string = "https://krapnik.cn/api/bless/list";
    sendUrl: string = "https://krapnik.cn/api/bless/register";
    params: any;
    data: any;
    container: HTMLDivElement;
    outputTextarea: HTMLTextAreaElement;
    shareLink: string = "";
    shareData: Array<string> = [];
    shareListDiv: HTMLDivElement;
    constructor(params: any, containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.params = params;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        this.outputTextarea.value = `当你看到这行文字时，说明你还没有登录京东帐号或者账号接口没有返回数据！`;
        this.shareListDiv = document.createElement("div");
        this.shareListDiv.setAttribute("style", "margin:10px; border:1px solid #000;font-size: 14px;");
        this.shareListDiv.setAttribute("class", "shareList");
    }
    get(): void {
        fetch("https://api.m.jd.com/client.action?functionId=getDefaultTpl&body={%22templateId%22:1001}&appid=content_ecology&clientVersion=1.0.0&client=wh5", { credentials: "include" })
            .then((res) => { return res.json() })
            .then((json) => {
                if (json.code !== "60001") {
                    this.data = json.result;
                    this.shareLink = `https://bunearth.m.jd.com/babelDiy/ZAEYNFNMBSWTXROQWKCR/21tFbS6Xm4tpon3oJnwzbnCJBo1Z/index.html?ad_od=1&DDid=${this.data.uuid}&ukey=${this.data.ukey}&modelid=${this.data.templateId}&go=CARD`;
                    this.list();
                    this.shareList();
                    this.container.appendChild(this.shareListDiv);
                    this.outputTextarea.value = "";
                }

            })
    }

    list(): void {
        const content = document.createElement("div");
        let msg = `
        <div style="margin:10px;">
        <a href="https://gitee.com/krapnik/res/raw/master/Bless.png" target="_blank">点击打开新窗口查看活动攻略</a>
        <button class="copy" style="width: 200px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">复制我的拜年链接</button>
        <button class="share" style="width: 200px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">提交我的拜年链接</button>
        <input class="inviteLink" type="text" style="width:80vw;height: 25px;font-size:14px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;" placeholder="请输入需要助力的拜年链接">
        <button class="assist" style="width: 200px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">为TA助力</button>
        <input class="inviteCnt" type="text" style="width:80vw;height: 25px;font-size:14px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;" placeholder="需要获取的拜年库数据数量【默认：50】">
        <button class="inviteGet" style="width: 200px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">获取拜年库数据</button>
        <button class="assistAll" style="width: 200px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">一键为拜年库数据拜年</button>
        <p style="font-size:14px;color:red;">一键为拜年库的前50个数据拜年<br>【提交时间倒序】<br>你也可以将你的拜年链接提交上去<br>复制拜年链接后设置京东UA再打开可查看活动首页</p>
        </div>`;
        content.innerHTML = msg;
        this.container.appendChild(content);
        const h = _$('.inviteGet'),
            c = _$('.copy'),
            s = _$('.share'),
            assist = _$('.assist'),
            a = _$('.assistAll');

        c!.addEventListener('click', () => {
            Utils.copyText(this.shareLink);
        });

        a!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `开始自动为拜年库数据拜年`)
            this.assistAll();
        });

        assist!.addEventListener('click', () => {
            const link = _$('.inviteLink') as HTMLInputElement;
            this.assist(link.value);
        })

        h!.addEventListener('click', () => {
            const cnt = _$('.inviteCnt') as HTMLInputElement;
            if(Utils.isNumber(cnt.value)){
                alert("该内容非数字！请检查无误后再输入！")
            }
            this.shareList(+cnt.value);
        })

        s!.addEventListener('click', () => {
            Utils.outPutLog(this.outputTextarea, `提交我的数据到拜年库`)
            this.send();
        });

    }

    async assist(url: string) {
        if (!url || !url.includes('modelid') || !url.includes('ukey') || !url.includes('DDid')) {
            alert("请输入要助力的分享链接或输入正确的分享地址！");
            return;
        }
        new Promise(resolve => {
            const modelid = Utils.getSearchString(url, "modelid"),
                ukey = Utils.getSearchString(url, "ukey"),
                uuid = Utils.getSearchString(url, "DDid"),
                data = `functionId=guestReceiveBlessing&appid=content_ecology&body={\"modelid\":${modelid},\"uuid\":\"${uuid}\",\"ukey\":\"${ukey}\"}&client=wh5&clientVersion=1.0.0`;
            fetch('https://api.m.jd.com/client.action?' + data,
                {
                    credentials: "include",
                }
            ).then((res) => res.json())
                .then((json) => {
                    if(json.code==0){
                        Utils.outPutLog(this.outputTextarea, `拜年结果：${JSON.stringify(json)}`);
                    }else{
                        Utils.outPutLog(this.outputTextarea, `拜年结果：你好像已经给这个人拜过年啦~`);
                    }
                    
                    resolve();
                });
        })
    }

    async assistAll() {
        for (let i = 0; i < this.shareData.length; i++) {
            let url = this.shareData[i];
            await new Promise(resolve => {
                setTimeout(async () => {
                    await this.assist(url);
                    resolve();
                }, (Config.timeoutSpan + Utils.random(300, 500)));
            })
        }
        Utils.outPutLog(this.outputTextarea, `自动拜年结束`);
    }

    shareList(limit:number = 50): void {
        this.shareData = [];
        let msg = "";
        fetch(`${this.detailurl}?limit=${limit}`).then((res) => { return res.json() })
            .then((json) => {
                if (json.success) {
                    let data = json["data"]["data"];
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i],
                            url = `https://bunearth.m.jd.com/babelDiy/ZAEYNFNMBSWTXROQWKCR/21tFbS6Xm4tpon3oJnwzbnCJBo1Z/index.html?ad_od=1&DDid=${item.DDid}&ukey=${item.ukey}&modelid=${item.modelid}&go=CARD`;
                        this.shareData.push(url);
                        msg += `<div style="margin:10px;border-bottom:1px solid #333"><p>id：${item["id"]}<br>DDid：${item["DDid"]}<br>ukey：${item["ukey"]}<br>提交时间：${item["create_time"]}</p>
                        <button class="help" value="${url}" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block"">手动拜年</button></div>`
                    }
                    this.shareListDiv.innerHTML = msg;
                    _$(".shareList")!.addEventListener("click", (evt) => {
                        const target = evt.target as HTMLElement;
                        if (target.tagName == "BUTTON") {
                            const dataUrl = target!.getAttribute("value")!;
                            this.assist(dataUrl);
                        }
                    })
                }
            })
    }

    send() {
        if (!this.data) {
            alert("获取活动数据失败！");
            return;
        }
        let data = `modelid=${this.data["templateId"]}&ukey=${this.data["ukey"]}&DDid=${this.data["uuid"]}`;
        fetch(this.sendUrl, {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            body: data
        }).then((res) => { return res.json() })
            .then((json) => {
                Utils.outPutLog(this.outputTextarea, JSON.stringify(json));
            })
    }

}