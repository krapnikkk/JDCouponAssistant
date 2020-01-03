import Coupon from "../interface/Coupon";
import Utils from "../utils/utils";
type couponDetails = {
    limitStr: string
    discount: string
    quota: string
    constraintBeginTime: string
    constraintEndTime: string
    flag: boolean
}

export default class Mfreecoupon implements Coupon {
    url: string = "https://s.m.jd.com/activemcenter/mfreecoupon/getcoupon?key={key}&roleId={roleId}";
    couponList: couponDetails[] = [];
    couponParams: any;
    container: HTMLDivElement;
    outputTextarea: HTMLTextAreaElement;
    constructor(couponParams: any, containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.couponParams = couponParams;
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        (window as any).getcoupon = this.jsonp.bind(this);
    }


    get(): void {
        this.couponList = [];
        let batchinfo = (window as any)._couponData.batchinfo, batchArr = [];
        for (let item in batchinfo) {
            if (batchArr && batchArr instanceof Array) {
                batchArr = batchinfo[item];
            }
        }
        for (let i = 0; i < batchArr.length; i++) {
            const coupon = batchArr[i],
                limitStr = coupon["limitStr"],
                discount = coupon["discount"],
                quota = coupon["quota"],
                constraintBeginTime = coupon["constraintBeginTime"],
                constraintEndTime = coupon["constraintEndTime"];
            this.couponList.push({
                "limitStr": limitStr,
                "discount": discount,
                "constraintEndTime": constraintEndTime,
                "constraintBeginTime": constraintBeginTime,
                "quota": quota,
                "flag": false
            });
        }
        this.list();
    }


    list(): void {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>请先点击列表项选择领取的券</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i],
                itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'padding:10px 0;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `<h4 style="user-select: none;pointer-events:none;">${item.quota}-${item.discount}</h4>
                                <p style="user-select: none;pointer-events:none;margin-bottom:10px">范围：${item.limitStr}<br/>时间：${item.constraintBeginTime}-${item.constraintEndTime}</p>
                                <button data="coupon" style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;">直接领取</button>`
            content.appendChild(itemDiv);
            itemDiv.addEventListener("click", (evt) => {
                const target = evt.target as HTMLElement;
                if (target.getAttribute('data-item') || (target.parentNode == itemDiv && target.tagName != "BUTTON")) {
                    if (!item.flag) {
                        itemDiv.style.border = "1px solid red";
                    } else {
                        itemDiv.style.border = "1px solid gray";
                    }
                    item.flag = !item.flag;
                } else if (target.getAttribute("data")) {
                    this.send();
                }
            });
        }
        this.container.appendChild(content);

    }


    send(): void {
        this.outputTextarea.style.display = "block";
        let url = this.url.replace("{key}", this.couponParams["key"]).replace("{roleId}", this.couponParams["roleId"]);
        Utils.createJsonp(url, false);
    }

    jsonp(response: any): void {
        Utils.outPutLog(this.outputTextarea, `领券结果:${JSON.stringify(response)}`);
    }
}