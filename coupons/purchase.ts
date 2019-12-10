import Coupon from "../interface/Coupon";
import Utils from "../utils/utils";
type couponDetails = {
    pid: string
    title: string
    detail: string
    imgUrl: string
}

export default class Purchase implements Coupon {
    url: string = "https://vip.jr.jd.com/goldcoin/purchase?id={pid}&callback=";
    detailurl: string = "https://vip.jr.jd.com/goldcoin/product/{pid}?callback=";
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
        let url = this.detailurl.replace("{pid}", this.couponParams.pid);
        Utils.createJsonp(url, true);
    }

    jsonp(response: any): void {
        console.log(response);
        const json = JSON.parse(response.data), data = json["data"];
        if (data) {
            this.couponList = [];
            if (json.success) {
                this.couponList.push({
                    pid: data.productId,
                    title: data.name,
                    detail: data.description,
                    imgUrl: data.imgUrl
                });
                this.list();
            } else {
                alert("请检查该页面优惠券的有效性！");
            }
        }else{
            this.outputTextarea.value = `领券结果:${response.data}\n` + this.outputTextarea.value;
        }

    }

    list(): void {
        const content = document.createElement("div");
        content.innerHTML = "<h3 style='border-bottom: 1px solid #2196F3;display: inline-block;margin-top: 5px;padding: 0 37.5vw 5px;'>优惠券</h3>";
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.couponList.length; i++) {
            const item = this.couponList[i],
                itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'display:flex;flex-direction:row;padding:10px 0;border-bottom:1px solid #999');
            itemDiv.innerHTML = `<img style="width:120px;height:100%;margin-right:10vw;display: block;" src="${item.imgUrl}" />
                <div>
                    <h3 style="margin-bottom:10px">${item.title}</h3><p style="margin-bottom:10px">${item.detail}</p>
                    <button class="receive" style="width: 80px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                        <a style="color: #fff;text-decoration: none;">直接领取</a>
                    </button>
                </div>`
            content.appendChild(itemDiv);
        }
        this.container.appendChild(content);
        document.querySelector('.receive')!.addEventListener('click', () => { this.send() });
    }
    send(): void {
        this.outputTextarea.style.display = "block";
        for (let i = 0; i < this.couponList.length; i++) {
            let item = this.couponList[i], url = this.url.replace("{pid}", item.pid);
            Utils.createJsonp(url, true);
        }
    }


}