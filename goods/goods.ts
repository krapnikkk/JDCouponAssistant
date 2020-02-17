import Utils from "../utils/utils";
import Config from "../config/config";
import fj from "../utils/fetch-jsonp";
type goodsDetails = {
    skuid: string
    name: string
    src: string
    cat: string
    venderId: string
    stockState?: string
    area?: string
}

type addressDetails = {
    id: string
    dec: string
}

export default class Goods {
    areaId: string = "1_72_0_0";//北京 朝阳区
    areaIdArr: Array<addressDetails> = [{ id: "1_72_0_0", dec: "北京 朝阳区" }];
    goodsIdArr: Array<string> = [];
    goodsMsgArr: Array<goodsDetails> = [];
    container: HTMLDivElement;
    outputTextarea: HTMLTextAreaElement;
    detailURL: string = "https://item.jd.com/{skuid}.html";
    stockURL: string = "https://c0.3.cn/stock?skuId={skuId}&area={area}&venderId={venderId}&cat={cat}";
    constructor(containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement, goodsId?: string) {
        if (goodsId) {
            this.goodsIdArr.push(goodsId);
        }
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
        //获取默认地址
        fj.fetchJsonp('https://cd.jd.com/usual/address').then((res) => { return res.json() }).then((json) => {
            if (Object.keys(json).length !== 0) {
                this.areaIdArr = [];
                Object.keys(json).map((key, idx) => {
                    let item = json[key];
                    let id = `${item.provinceId}_${item.cityId}_${item.countyId ? item.countyId : 0}_${item.townId ? item.townId : 0}`,
                        dec = item.areaName;
                    if (idx == 0) {
                        this.areaId = id;
                    }
                    this.areaIdArr.push({
                        id: id,
                        dec: dec
                    })
                })
                console.log(this.areaIdArr);
            }

        });
    }

    get() {
        this.goodsMsgArr = [];
        Promise.all(this.goodsIdArr.map((item: string) => { return this.getMsg(item) })).then((data) => {
            this.goodsMsgArr = data;
            Promise.all(this.goodsMsgArr.map((item) => {
                return this.getStock(item);
            })).then((goods) => {
                this.goodsMsgArr = goods;
                this.list();
            })
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
                        };
                    document.body.removeChild(iframe);
                    resolve(goods);
                });
        })
    }

    getStock(goods: goodsDetails): Promise<goodsDetails> {
        let url = this.stockURL.replace("{skuId}", goods.skuid).replace("{venderId}", goods.venderId).replace("{cat}", goods.cat).replace("{area}", this.areaId);
        return new Promise((resolve, reject) => {
            fj.fetchJsonp(url).then(function (response) {
                return response.json()
            }).then((res) => {
                let stock = res.stock, area = stock.area;
                goods.stockState = stock.StockStateName;
                goods.area = `${area.provinceName}-${area.cityName}-${area.countyName}`;
                resolve(goods);
            })
        })
    }

    push() {
        let id = "1";
        this.goodsIdArr.push(id);
    }

    list() {
        const content = document.createElement("div");
        content.setAttribute('style', 'display:flex;flex-direction:column;padding: 5px;margin-top: 5px;border: 1px solid #000;');
        for (let i = 0; i < this.goodsMsgArr.length; i++) {
            const item = this.goodsMsgArr[i],
                itemDiv = document.createElement("div");
            itemDiv.setAttribute('style', 'display:flex;flex-direction:row;border:1px solid gray;border-radius: 10px;margin-top:5px;padding: 5px');
            itemDiv.innerHTML = `<img style="user-select: none;pointer-events:none;width:120px;height:120px;display: block;" src="${Config.JDIMGSourcesURL}${item.src}" />
            <div">
                <h2 width="60vw">商品名称：${item.name}</h2>
                <p style="font-weight:700;margin-bottom:10px">状态：<span style="color:red">${item.stockState}</span>
                <br>地区：<span style="color:red">${item.area}</span></p>
                <button style="width: 100px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                    <a href='https://skunotify.jd.com/storenotify.html?skuId=${item.skuid}' target="_blank" style="color: #fff;text-decoration: none;">预约自动下单</a>
                </button>
                <button style="width: 100px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                    <a href='//cart.jd.com/gate.action?pid=${item.skuid}&pcount=1&ptype=1' target="_blank" style="color: #fff;text-decoration: none;">加入购物车</a>
                </button>
                <br>
                <button style="width: 100px;height:30px;background-color: #2196F3;border-radius: 5px;border: 0;">
                    <a href='https://p.m.jd.com/norder/order.action?wareId=${item.skuid}&wareNum=1&enterOrder=true' target="_blank" style="color: #fff;text-decoration: none;">订单结算</a>
                </button>
            </div>`
            content.appendChild(itemDiv);
        }
        this.container.appendChild(content);
    }

    buildOperate() {

    }
}