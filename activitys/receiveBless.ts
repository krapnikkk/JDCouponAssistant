import Activity from "../interface/Activity";
import Utils, { _$ } from "../utils/utils";
import Config from "../config/config";

export default class ReceiveBless implements Activity {
    url: string = "https://api.m.jd.com/client.action";
    params: any;
    data: any;
    container: HTMLDivElement;
    outputTextarea: HTMLTextAreaElement;
    shareLink: string = "";
    constructor(params: any, containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.params = params;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    get(): void {
        fetch("https://api.m.jd.com/client.action?functionId=getDefaultTpl&body={%22templateId%22:1001}&appid=content_ecology&clientVersion=1.0.0&client=wh5", { credentials: "include" })
            .then((res) => { return res.json() })
            .then((json) => {
                var data = json.result;
                this.shareLink = `https://bunearth.m.jd.com/babelDiy/ZAEYNFNMBSWTXROQWKCR/21tFbS6Xm4tpon3oJnwzbnCJBo1Z/index.html?ad_od=1&DDid=${data.uuid}&ukey=${data.ukey}&modelid=${data.templateId}&go=CARD`;
                this.list();
            })
    }

    list(): void {
        const content = document.createElement("div");
        let msg = `
        <div style="margin:10px;">
        <button class="copy" style="width: 200px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">复制我的分享链接</button>
        <button class="share" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">分享我的拜年链接</button>
        <input class="inviteLink" type="text" style="width:80vw;height: 25px;font-size:14px;border: solid 1px #000;border-radius: 5px;margin: 10px auto;display: block;" placeholder="请输入需要助力的分享链接">
        <button class="assist" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">为TA助力</button>
        <button class="assistAll" style="width: 120px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;margin:5px auto;display:block">一键为分享库助力</button>
        </div>`;

        content.innerHTML = msg;
        this.container.appendChild(content);
        const h = _$('.home'),
            c = _$('.copy'),
            g = _$('.browse'),
            invite = _$('.inviteLink'),
            assist = _$('.assist'),
            a = _$('.auto');

        c!.addEventListener('click', () => {
            Utils.copyText(this.shareLink);
        });

        assist!.addEventListener('click', () => {
            const link = _$('.inviteLink') as HTMLInputElement;
            this.assist(link.value);
        })

    }

    assist(url: string) {
        if (!url && url.includes('modelid') && url.includes('ukey') && url.includes('DDid')) {
            alert("请输入要助力的分享链接或输入正确的分享地址！");
            return;
        }
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
                Utils.outPutLog(this.outputTextarea, `助力结果：${json}`);
            });
    }

}