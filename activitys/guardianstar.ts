import Config from "../config/config";
import Activity from "../interface/Activity";
import Utils, { _$ } from "../utils/utils";

export default class Guardianstar implements Activity {
    data: any = [];
    token: string = "jd6df03bd53f0f292f";
    starIdArr: Array<string> = ['meiditongliya', 'bolangwutiaoren', 'quechaozhuyilong', 'haierchenxiao', 'oulebyangzi', 'haiermaoxiaotong', 'changhongsongyi', 'skgwangyibo'];
    container: HTMLDivElement;
    outputTextarea: HTMLTextAreaElement;
    constructor(containerDiv: HTMLDivElement, outputTextarea: HTMLTextAreaElement) {
        this.container = containerDiv;
        this.outputTextarea = outputTextarea;
    }
    async get(): Promise<void> {
        this.doTask()
    }

    async doTask() {
        for (let i = 0; i < this.starIdArr.length; i++) {
            await new Promise(resolve => {
                let starId = this.starIdArr[i];
                Utils.outPutLog(this.outputTextarea, `当前明星：${starId}`)
                fetch(`https://urvsaggpt.m.jd.com/guardianstar/getHomePage?t=${new Date().getTime()}&starId=${starId}`).then(res => res.json()).then(async (json) => {
                    let data: any = json.data;
                    let { shopList, venueList, productList } = data[0];
                    await Utils.sleep(1000);
                    Utils.outPutLog(this.outputTextarea, '开始商店任务');
                    for (let i = 0; i < shopList.length; i++) {
                        // await Utils.sleep(1000);
                        let shop = shopList[i];
                        await new Promise(async resolveFn => {
                            Utils.outPutLog(this.outputTextarea, `商店任务${i + 1}/${shopList.length}`);
                            if (shop.shopStatus != 3 && shop.shopStatus != 4) {
                                let body = { starId: starId, id: shop.shopId, type: "shop", status: shop.shopStatus };
                                if (shop.shopStatus == 1) {
                                    this.doTaskPost(body).then((res) => {
                                        Utils.outPutLog(this.outputTextarea, res.msg)
                                    });
                                    Utils.outPutLog(this.outputTextarea, '模拟浏览任务等待10s')
                                    await Utils.sleep(11000);
                                }
                                body.status = 2;
                                this.doTaskPost(body).then((res) => {
                                    Utils.outPutLog(this.outputTextarea, res.msg)
                                });
                            } else {
                                Utils.outPutLog(this.outputTextarea, `任务已完成`);
                            }
                            await Utils.sleep(1000);
                            resolveFn();
                        })
                    }
                    Utils.outPutLog(this.outputTextarea, '商店任务已完成~');
                    await Utils.sleep(1000);
                    Utils.outPutLog(this.outputTextarea, '开始会场任务');
                    for (let i = 0; i < venueList.length; i++) {
                        let venue = venueList[i];
                        await new Promise(async resolveFn => {
                            Utils.outPutLog(this.outputTextarea, `会场任务:${i + 1}/${venueList.length}`);
                            let body = { starId: starId, id: venue.venueId, type: "venue", status: venue.venueStatus };
                            if (venue.venueStatus != 3 && venue.venueStatus != 4) {
                                if (venue.venueStatus == 1) {
                                    this.doTaskPost(body).then((res) => {
                                        Utils.outPutLog(this.outputTextarea, res.msg)
                                    });
                                    Utils.outPutLog(this.outputTextarea, '模拟浏览任务等待10s')
                                    await Utils.sleep(11000);
                                }
                                body.status = 2;
                                this.doTaskPost(body).then((res) => {
                                    Utils.outPutLog(this.outputTextarea, res.msg)
                                });
                            } else {
                                Utils.outPutLog(this.outputTextarea, `任务已完成`);
                            }
                            await Utils.sleep(1000);
                            resolveFn();
                        })
                    }

                    Utils.outPutLog(this.outputTextarea, '商品任务已完成~');
                    await Utils.sleep(1000);
                    Utils.outPutLog(this.outputTextarea, '开始商品任务');
                    for (let i = 0; i < productList.length; i++) {
                        let product = productList[i];
                        await new Promise(async resolveFn => {
                            Utils.outPutLog(this.outputTextarea, `商品任务:${i + 1}/${productList.length}`);
                            let body = { starId: starId, id: product.productId, type: "product", status: product.productStatus };
                            if (product.productStatus != 3 && product.productStatus != 4) {
                                if (product.productStatus == 1) {
                                    this.doTaskPost(body).then((res) => {
                                        Utils.outPutLog(this.outputTextarea, res.msg)
                                    });
                                    Utils.outPutLog(this.outputTextarea, '模拟浏览任务等待10s')
                                    await Utils.sleep(11000);
                                }
                                body.status = 2;
                                this.doTaskPost(body).then((res) => {
                                    Utils.outPutLog(this.outputTextarea, res.msg)
                                });
                            } else {
                                Utils.outPutLog(this.outputTextarea, `任务已完成`);
                            }
                            await Utils.sleep(1000);
                            resolveFn();
                        })
                    }
                    Utils.outPutLog(this.outputTextarea, '商品任务已完成~');
                    resolve();
                })
            })
        }
    }

    list() {
        const content = document.createElement("div");
        content.innerHTML = `<h1 style="color:red;font-weight: 700;font-size: 18px;">本活动页脚本自动执行,请留意控制台输出</h1>`
        this.container.appendChild(content);
    }

    doTaskPost(data: any): Promise<any> {
        let { starId, id, type, status } = data;
        return fetch('https://urvsaggpt.m.jd.com/guardianstar/doTask',
            {
                body: `starId=${starId}&type=${type}&id=${id}&status=${status}`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
                method: "POST",
                credentials: "include"
            }).then(res => res.json())

    }

}