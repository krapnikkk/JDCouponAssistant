import Coupon from "../interface/Coupon";
import Utils from "../utils/utils";
type couponDetails = {
    giftAmount: string
    discount: string
    quota: string
    hour: string
    activityId: string
    couponState: number
    limitStr: string
    flag: boolean
}

export default class ReceiveSeckillReward implements Coupon {
    getInfoURL: string = "https://ms.jr.jd.com/gw/generic/uc/h5/m/getSeckillInfo";
    url: string = "https://ms.jr.jd.com/gw/generic/uc/h5/m/getSeckillInfo";
    detailurl: string = "https://rsp.jd.com/coupon/dayCouponList/v1/?lt=m&an=plus.mobile&couponType=0_1";
    couponList: couponDetails[] = [];
    couponParams: any;
    container: HTMLDivElement;
    outputTextarea: HTMLTextAreaElement;
    constructor(couponParams: any, containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }


    get(): void {
        Promise.all([
            Utils.post(this.getInfoURL,{}),
            new Promise((resolve) => {
                setTimeout(() => {
                    Utils.request("stall_getTaskDetail").then(resolve);
                }, 1000);
            }),
        ]).then(([homeData, taskData]) =>
            Promise.all([(<any>homeData), (<any>taskData)])
        )
            .then(([homeData, taskData]) => {

            })
        fetch(this.detailurl, { credentials: "include" })
            .then(res => { return res.json() })
            .then(json => {
                const data = json["rs"]["wholeCategoryCoupon"];
                for (let j = 0; j < data.length; j++) {
                    let coupon = data[j],
                        giftAmount = coupon["giftAmount"],
                        discount = coupon["discount"],
                        quota = coupon["quota"],
                        couponState = coupon["couponState"],
                        activityId = coupon["activtyId"],
                        limitStr = coupon["limitStr"],
                        hour = coupon["hour"];
                    this.couponList.push({
                        "giftAmount": giftAmount,
                        "activityId": activityId,
                        "discount": discount,
                        "quota": quota,
                        "hour": hour,
                        "limitStr": limitStr,
                        "couponState": couponState,
                        "flag": false
                    });
                }
                this.list();
            });
    }


    list(): void {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>点击列表项选择要领取的券</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i],
                itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'text-align:left;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `<h3 style="user-select: none;pointer-events:none;">折扣：${item.quota}-${item.discount}</h3>
                                    <p style="margin-bottom:10px;user-select: none;pointer-events:none;">状态：${item.couponState == 1 ? "可领取" : item.couponState == 6 ? "已领光" : "不可领取"}<br/>说明：${item.limitStr}<br/>兑换礼金：${item.giftAmount}<br/>领取时间：${item.hour || "现在可领"}</p>
                                    <button class="receive" data-id=${i} style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;">直接领取</button>`;

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
            }, false);
        }
        this.container.appendChild(content);
    }


    send(): void {

        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = this.url.replace("{activityId}", item["activityId"]);
            if (item.flag) {
                fetch(url, { credentials: "include" })
                    .then((res) => { return res.json() })
                    .then((json) => {
                        Utils.outPutLog(this.outputTextarea, `${item.quota}-${item.discount} 领券结果:${json.msg}`);
                    });
            }

        }
    }

    singleSend(index: number): void {

        let item = this.couponList[index],
            url = this.url.replace("{activityId}", item["activityId"]);
        fetch(url, { credentials: "include" })
            .then((res) => { return res.json() })
            .then((json) => {
                Utils.outPutLog(this.outputTextarea, `${item.quota}-${item.discount} 领券结果:${json.msg}`);
            });

    }
}