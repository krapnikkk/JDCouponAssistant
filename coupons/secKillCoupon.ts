import Coupon from "../interface/Coupon";
import Utils from "../utils/utils";
type couponDetails = {
    putKey: string
    name: string
    quota: string
    skuImage: string
    discount: string
    skuId: string
    batchId: string
    time: string
    flag: boolean
}

export default class SecKillCoupon implements Coupon {
    url: string = "https://api.m.jd.com/client.action?functionId=newBabelAwardCollection";
    detailurl: string = "https://api.m.jd.com/client.action?functionId=getBillionSubsidyInfo&body=%7B%22source%22:%22home_subsidy%22%7D&appid=XPMSGC2019";
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
        this.couponList = [];
        fetch(this.detailurl, { credentials: "include" })
            .then(res => { return res.json() })
            .then(json => {
                const data = json["data"]["hotFloor"]["resultList"];
                for (let j = 0; j < data.length; j++) {
                    let coupon = data[j],
                        name = coupon["name"],
                        discount = coupon["disCount"],
                        quota = coupon["quota"],
                        skuImage = coupon["skuImage"],
                        skuId = coupon["skuId"],
                        time = coupon["time"],
                        putKey = coupon["putKey"],
                        batchId = coupon["batchId"];
                    this.couponList.push({
                        "name": name,
                        "putKey": putKey,
                        "skuImage": skuImage,
                        "discount": discount,
                        "quota": quota,
                        "skuId": skuId,
                        "batchId": batchId,
                        "time": time,
                        "flag": false
                    });
                }
                this.list();
            });
    }


    list(): void {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3><p style='margin: 5px 0;color:red'>请先点击列表项选择领取的券</p>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i],
                itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'display:flex;flex-direction:row;padding:10px 0;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `<img style="user-select: none;pointer-events:none;width:120px;height:100%;padding-right:10vw;display: block;" src="${item.skuImage}" />
                                <div style="text-align: left">
                                <h4 style="user-select: none;pointer-events:none;">${item.name}</h4>
                                <p style="user-select: none;pointer-events:none;margin-bottom:10px">折扣：${item.quota}-${item.discount}<br/>下场时间：${item.time}</p>
                                <button  class="receive" data-id=${i} style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;">直接领取</button>
                                </div>`
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
            let item = this.couponList[i];
            if (item.flag) {
                const url = `https://api.m.jd.com/client.action?functionId=receiveSeckillCoupon&body=%7B"roleId"%3A"${encodeURIComponent(item["putKey"])}"%2C"source"%3A"home_subsidy"%2C"floorType"%3A0%2C"skuId"%3A"${item.skuId}"%2C"quota"%3A"${item.quota}"%2C"disCount"%3A"${item.discount}"%2C"batchId"%3A"${item.batchId}"%7D&client=m&appid=XPMSGC2019`;
                fetch(url, { method: "POST", mode: "cors", credentials: "include", headers: { "Content-Type": "application/x-www-form-urlencoded" } })
                    .then((res) => { return res.json() })
                    .then((json) => {
                        Utils.outPutLog(this.outputTextarea, `${item.quota}-${item.discount} 领券结果:${json.resultMsg}`);
                    });
            }

        }
    }

    singleSend(index: number): void {
        this.outputTextarea.style.display = "block";
        let item = this.couponList[index],
            url = `https://api.m.jd.com/client.action?functionId=receiveSeckillCoupon&body=%7B"roleId"%3A"${encodeURIComponent(item["putKey"])}"%2C"source"%3A"home_subsidy"%2C"floorType"%3A0%2C"skuId"%3A"${item.skuId}"%2C"quota"%3A"${item.quota}"%2C"disCount"%3A"${item.discount}"%2C"batchId"%3A"${item.batchId}"%7D&client=m&appid=XPMSGC2019`;
        fetch(url, { method: "POST", mode: "cors", credentials: "include", headers: { "Content-Type": "application/x-www-form-urlencoded" } })
            .then((res) => { return res.json() })
            .then((json) => {
                Utils.outPutLog(this.outputTextarea, `${item.quota}-${item.discount} 领券结果:${json.resultMsg}`);
            });

    }
}