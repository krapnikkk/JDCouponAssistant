import Coupon from "../interface/Coupon";
import Utils from "../utils/utils";
type couponDetails = {
    groupId: string
    priceRuleId: string
    actId: string
    detail: string
    title: string
}

export default class Exchange implements Coupon {
    url: string = "https://vip.m.jd.com/fuli/exchange.html";
    detailurl: string = "https://vip.m.jd.com/fuli/detail.html?itemId={itemId}";
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
        let url = this.detailurl.replace("{itemId}", this.couponParams.itemId);
        fetch(url, { credentials: "include" })
            .then((res) => { return res.json() })
            .then((json) => {
                if (json.success) {
                    const data = json.result.fuliAct, actPriceScoreMap = data["actPriceScoreMap"], score = json.result.userInfo.userScore.score;
                    let priceRuleId;
                    for (let key in actPriceScoreMap) {
                        let price = key,
                            priceArr = JSON.parse(price);
                        if (priceArr[0] < score && priceArr[1] > score) {
                            priceRuleId = actPriceScoreMap[key][0]["id"];
                            break;
                        }
                    }
                    this.couponList.push({
                        actId: this.couponParams["itemId"],
                        priceRuleId: priceRuleId,
                        groupId: data.actCodeGroups[0].id,
                        title: data.name,
                        detail: data.detail,
                    });
                    this.list();
                } else {
                    alert("请检查该页面优惠券的有效性！");
                }
            });
    }


    list(): void {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i],
                itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'padding:10px 0;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `<h4 style="user-select: none;pointer-events:none;">${item.title}</h4>
                                <p style="user-select: none;pointer-events:none;margin-bottom:10px">详情：${item.detail}</p>
                                <button data="coupon" style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;color:#fff;">直接领取</button>`
            content.appendChild(itemDiv);
            itemDiv.addEventListener("click", (evt) => {
                const target = evt.target as HTMLElement;
                if (target.getAttribute("data")) {
                    this.send();
                }
            });
        }
        this.container.appendChild(content);

    }

    send(): void {
        this.outputTextarea.style.display = "block";
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i];
            fetch(this.url, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }, 
                body: `actId=${item.actId}&groupId=${item.groupId}&priceRuleId=${item.priceRuleId}&client=m`
            })
                .then((res) => { return res.json() })
                .then((json) => {
                    Utils.outPutLog(this.outputTextarea, ` 领券结果：${JSON.stringify(json)}`);
                });
        }
    }

}