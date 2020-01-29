import Coupon from "../interface/Coupon";
import Utils, { _$ } from "../utils/utils";
type couponDetails = {
    couponKey: string
    title: string
    detail: string
    couponStatus: string
    time: string
    flag: boolean
}

export default class ReceiveCoupons implements Coupon {
    url: string = `https://ms.jr.jd.com/gw/generic/bt/h5/m/receiveCoupons?reqData={"couponKey":"{couponKey}","eid":"1"}}`;
    detailurl: string = "https://ms.jr.jd.com/gw/generic/bt/h5/m/queryLimitedInfo?callback=";
    couponList: couponDetails[] = [];
    container: HTMLDivElement;
    couponParams: any;
    outputTextarea: HTMLTextAreaElement;
    constructor(couponParams: any, containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        window.addEventListener("message", this.jsonp.bind(this), false);
    }
    get(): void {
        Utils.createJsonp(this.detailurl, true);
    }

    jsonp(response: any): void {
        // console.log(response.data);
        const json = JSON.parse(response.data), data = json["resultData"]["limitedResult"];
        if (data) {
            this.couponList = [];
            if (json.resultCode == 0) {
                for (let i = 0; i < data.length; i++) {
                    const item = data[i]["floorInfo"];
                    for (let j = 0; j < 3; j++) {
                        let coupon = item[j];
                        this.couponList.push({
                            couponKey: coupon.couponKey,
                            title: coupon.text1,
                            detail: coupon.number,
                            couponStatus: coupon.couponStatus == 5 ? "已领光" : coupon.couponStatus == 1 ? "未开始" : "已领取",
                            time: data[i]["time"],
                            flag: false
                        });
                    }

                }
                this.list();
            } else {
                alert("请检查该页面优惠券的有效性！");
            }
        }
    }

    list(): void {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>请先点击列表项选择领取的券</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i],
                itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', ';margin-top:5px;padding:10px 0;border:1px solid #999');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `
                    <p style="margin-bottom:10px">类型：${item.title}<br>详情：${item.detail}<br>状态：${item.couponStatus}<br>开始时间：${item.time}</p>
                    <button  data-id=${i} style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0; color:#fff">直接领取</button>`
            content.appendChild(itemDiv);
            itemDiv.addEventListener("click", (evt) => {
                const target = evt.target as HTMLElement;
                if (target.getAttribute('data-item') || (target.parentNode == itemDiv && target.tagName != "BUTTON")) {
                    if (!item.flag) {
                        itemDiv.style.border = "3px solid red";
                    } else {
                        itemDiv.style.border = "1px solid gray";
                    }
                    item.flag = !item.flag;
                } else if (target.getAttribute("data-id")) {
                    this.singleSend(+target.getAttribute("data-id")!);
                }
            });
        }
        this.container.appendChild(content);
    }
    send(): void {
        this.outputTextarea.style.display = "block";
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = this.url.replace("{couponKey}", item["couponKey"]);
            if (item.flag) {
                fetch(url, { credentials: "include" })
                    .then((res) => { return res.json() })
                    .then((json) => {
                        Utils.outPutLog(this.outputTextarea,`领券结果:${JSON.stringify(json.resultData)}`);
                    });
            }

        }
    }

    singleSend(index: number): void {
        this.outputTextarea.style.display = "block";
        let item = this.couponList[index],
            url = this.url.replace("{couponKey}", item["couponKey"]);
        fetch(url, { credentials: "include" })
            .then((res) => { return res.json() })
            .then((json) => {
                Utils.outPutLog(this.outputTextarea,`领券结果:${JSON.stringify(json.resultData)}`);
            });
    }
}