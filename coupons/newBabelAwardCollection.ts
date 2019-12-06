import Coupon from "../interface/Coupon";
type couponDetails = {
    args: string
    couponbatch: string
    details: string
    discount: string
    scene: string
    picUrl: string
    status: string
}

export default class NewBabelAwardCollection implements Coupon {
    url: string = "https://api.m.jd.com/client.action?functionId=newBabelAwardCollection";
    couponList: couponDetails[] = [];
    couponParams: any;
    container: HTMLDivElement;
    constructor(couponParams: any, containerDiv: HTMLDivElement) {
        this.couponParams = couponParams;
        this.container = containerDiv;
    }


    get(): void {
        this.couponList = [];
        const activityData = (window as any).__react_data__.activityData.floorList;
        for (let i = 0; i < activityData.length; i++) {
            const item = activityData[i];
            if (item.template == "free_coupon" || item.template == "finance_coupon") {
                for (let j = 0; j < item.couponList.length; j++) {
                    const coupon = item.couponList[j],
                        scene = coupon["scene"],
                        args = coupon["args"] || coupon["cpId"],
                        cid = coupon["jsonSrv"] ? JSON.parse(coupon["jsonSrv"])["cid"] : "",
                        discount = coupon["discount"],
                        picUrl = coupon["picUrl"] || coupon["picture"],
                        status = coupon["status"],
                        details = `${coupon["limit"]},${coupon["scope"]}`;
                    this.couponList.push({
                        "discount": discount,
                        "details": details,
                        "scene": scene,
                        "args": args,
                        "status": status,
                        "couponbatch": cid,
                        "picUrl": picUrl
                    });
                }
            }
        }
        this.list();
    }


    list(): void {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i],
                itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'display:flex;flex-direction:row;padding:10px 0;border-bottom:1px solid #999');
            if (item.scene == "1") {
                itemDiv.innerHTML = `<img style="width:120px;height:100%;padding-right:10vw;display: block;" src="${item.picUrl}" />
                <div>
                    <p style="margin-bottom:10px">状态：${item.status == "0" ? "可领取" : item.status == "1" ? "已领取" : "已领光"}<br/>说明：${item.details}</p>
                    <button style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                        <a href='https://so.m.jd.com/list/couponSearch.action?couponbatch=${item.couponbatch}' target="_blank" style="color: #fff;text-decoration: none;">可用商品</a>
                    </button>
                    <button style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                        <a href='https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":"${this.couponParams.activityId}","scene":${item.scene},"args":"${item.args}"}&client=wh5' target="_blank" style="color: #fff;text-decoration: none;">直接领取</a>
                    </button>
                </div>`
            } else if (item.scene == "3") {
                itemDiv.innerHTML = `<img style="width:120px;height:100%;padding-right:10vw;display: block;" src="${item.picUrl}" />
                <div>
                <p style="margin-bottom:10px">状态：${item.status == "0" ? "可领取" : item.status == "1" ? "已领取" : "已领光"}</p>
                <button style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                    <a href='https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":"${this.couponParams.activityId}","scene":${item.scene},"actKey":"${item.args}"}&client=wh5' target="_blank" style="color: #fff;text-decoration: none;">直接领取</a>
                </button>
                </div>`
            }
            content.appendChild(itemDiv);
        }
        this.container.appendChild(content);
    }

    send(outputTextarea: HTMLTextAreaElement): void {
        outputTextarea.style.display = "block";
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = "";
            if (item.scene == "1") {
                url = `https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":"${this.couponParams.activityId}","scene":${item.scene},"args":"${item.args}"}&client=wh5`;
            } else if (item.scene == "3") {
                url = `https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":"${this.couponParams.activityId}","scene":${item.scene},"actKey":"${item.args}"}&client=wh5`;
            }
            fetch(url,{credentials: "include"})
                .then((res) => { return res.json() })
                .then((json) => {
                    if (json.errmsg) {
                        outputTextarea.value = `第${i+1}张 领券结果:${json.errmsg}\n` + outputTextarea.value;
                    } else {
                        outputTextarea.value = `第${i+1}张 领券结果:${json.subCodeMsg}\n` +outputTextarea.value;
                    }

                });
        }
    }
}