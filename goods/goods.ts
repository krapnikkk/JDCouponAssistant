import Utils from "../utils/utils";
import Config from "../config/config";

type goodsDetails = {
    skuid: string
    name: string
    src: string
    cat: string
    venderId: string
    pType: number //1:上架 2:下架
}

export default class Goods {
    areaId: string = "19_1607_3155_0";
    goodsIdArr: Array<string> = ["100011199522"];
    goodsMsgArr: Array<goodsDetails> = [];
    container: HTMLDivElement;
    outputTextarea: HTMLTextAreaElement;
    detailURL: string = "https://item.jd.com/{skuid}.html";
    stockURL: string = "https://c0.3.cn/stock?skuId=100005290843&area=19_1607_3155_0&venderId=1000000225&cat=670,677,688";
    constructor(containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement, goodsId?: string) {
        if (goodsId) {
            this.goodsIdArr.push(goodsId);
        }
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }

    get() {
        this.goodsMsgArr = [];
        Promise.all(this.goodsIdArr.map((item: string) => { return this.getMsg(item) })).then((data) => {
            this.goodsMsgArr = data;
            console.log(this.goodsMsgArr);
            this.list();
        })
    }

    getMsg(skuid: string): Promise<goodsDetails> {
        let url = this.detailURL.replace("{skuid}", skuid);
        return new Promise((resolve, reject) => {
            Utils.loadiFrame(url)
                .then((iframe) => {
                    let window: any = iframe!.contentWindow,
                        product = window.pageConfig!.product,
                        goods: goodsDetails = {
                            skuid: skuid,
                            name: product.name,
                            src: product.src,
                            cat: product.cat,
                            venderId: product.venderId,
                            pType: product.pType,
                        };
                    // document.body.removeChild(iframe);
                    resolve(goods);
                });
        })
    }

    push() {
        let id = "1";
        this.goodsIdArr.push(id);
    }

    list() {
        const content = document.createElement("div");
        for (let i = 0; i < this.goodsMsgArr.length; i++) {
            const item = this.goodsMsgArr[i],
                itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'padding:10px 0;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.setAttribute('data-item', "coupon");
            itemDiv.innerHTML = `<img style="user-select: none;pointer-events:none;width:120px;height:100%;padding-right:10vw;display: block;" src="${Config.JDIMGSOURCESURL}${item.src}" />
            <div">
                <h2>商品名称：${item.name}</h2>
                <p style="user-select: none;pointer-events:none;margin-bottom:10px">状态：${item.pType == 1 ? "上架中" : "已下架"}</p>
                <button style="width: 100px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                    <a href='https://so.m.jd.com/list/couponSearch.action?couponbatch=${item.skuid}' target="_blank" style="color: #fff;text-decoration: none;">可用商品</a>
                </button>
                <button style="width: 100px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                    <a href='' target="_blank" style="color: #fff;text-decoration: none;">提取链接</a>
                </button>
            </div>`
            content.appendChild(itemDiv);
        }
        this.container.appendChild(content);
    }

    buildOperate() {
        //area
        //timer
        //
    }
}