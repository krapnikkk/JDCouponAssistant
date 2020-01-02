import Coupon from "../interface/Coupon";
import Utils from "../utils/utils";
type couponDetails = {
    startDate: string
    discountAmount: number
    exchangeStatus: string
    pid: string
    detail: string
    imgUrl: string
    flag:boolean
}

export default class GcConvert implements Coupon {
    url: string = "https://vip.jr.jd.com/goldcoin/purchase?id={pid}&callback=";
    detailurl: string = "https://ms.jr.jd.com/gw/generic/hy/h5/m/gateFloorById?reqData={%22floorId%22:44,%22pageChannel%22:%22spike%22}";
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
        fetch(this.detailurl, { credentials: "include" })
            .then((res) => { return res.json() })
            .then((json) => {
                this.couponList = [];
                if (json.resultCode == 0) {
                    const data = json["resultData"]["data"]["data"];
                    for (let i = 0; i < data.length; i++) {
                        let coupon = data[i];
                        if (coupon) {
                            this.couponList.push({
                                pid: coupon.productId,
                                exchangeStatus: coupon.exchangeStatus == 3 ? "已抢光" : coupon.exchangeStatus == 2 ? "已领取" : "可领取",
                                detail: coupon.description,
                                startDate: new Date(coupon.startDate).toLocaleString(),
                                discountAmount: coupon.discountAmount,
                                imgUrl: coupon.imgUrl,
                                flag:false
                            });
                        }
                    }
                    this.list();
                } else {
                    alert("请检查该页面优惠券的有效性！");
                }
            });
    }

    jsonp(response: any): void {
        const json = JSON.parse(response.data), data = json["data"];
        Utils.outPutLog(this.outputTextarea,`领券结果:${response.data}`);
    }

    list(): void {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>请先点击列表项选择领取的券</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i],
                itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'display:flex;flex-direction:row;text-align:left;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `<img style="width:120px;height:100%;margin-right:10vw;display: block;" src="${item.imgUrl}" />
                <div>
                    <h3 style="margin-bottom:10px user-select: none;pointer-events:none;">${item.detail}</h3><p style="user-select: none;pointer-events:none;margin-bottom:10px">消耗金币：${item.discountAmount}<br>开始时间：${item.startDate}<br>状态：${item.exchangeStatus}</p>
                    <button class="receive" data-id=${i} style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                        <a style="color: #fff;text-decoration: none;user-select: none;pointer-events:none;">直接领取</a>
                    </button>
                </div>`
            content.appendChild(itemDiv);
            itemDiv.addEventListener('click', (evt) => {
                const target = evt.target as HTMLElement;
                if (target.getAttribute('data-item')||target.parentNode == itemDiv) {
                    if (!item.flag) {
                        itemDiv.style.border = "1px solid red";
                    } else {
                        itemDiv.style.border = "1px solid gray";
                    }
                    item.flag = !item.flag;
                }else if (target.getAttribute("data-id")){
                    this.singleSend(+target.getAttribute("data-id")!);
                }
                
            });
        }
        this.container.appendChild(content);
        
    }
    send(): void {
        this.outputTextarea.style.display = "block";
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = this.url.replace("{pid}", item.pid);
            if(item.flag){
                Utils.createJsonp(url, true);
            }
        }
    }
    singleSend(i: number): void {
        this.outputTextarea.style.display = "block";
        let item = this.couponList[i], url = this.url.replace("{pid}", item.pid);
        Utils.createJsonp(url, true);
    }


}