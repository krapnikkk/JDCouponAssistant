import Coupon from "../interface/Coupon";

export default class NewBabelAwardCollection implements Coupon {
    url: string = "https://api.m.jd.com/client.action?functionId=newBabelAwardCollection";
    couponList: object[] = [];
    paramsObj: any;
    method: string = "POST";
    data: string = 'body={"activityId":"{activityId}","scene":{scene},"args":"{args}"}&client=wh5';
    constructor(paramsObj: any) {
        this.paramsObj = paramsObj.activityId;
    }


    get(): void {
        this.couponList = [];
        const activityData = (window as any).__react_data__.activityData.floorList;
        for (let i = 0; i < activityData.length; i++) {
            const item = activityData[i];
            if (item.template == "free_coupon") {
                for (let j = 0; j < item.couponList.length; j++) {
                    const coupon = item.couponList[j],
                        scene = coupon["scene"],
                        args = coupon["args"],
                        cid = JSON.parse(coupon["jsonSrv"])["cid"],
                        discount = coupon["discount"],
                        details = `${coupon["limit"]},${coupon["scope"]}`;
                    this.couponList.push({
                        "discount": discount,//折扣
                        "details": details,
                        "scene": scene,
                        "args": args,
                        "couponbatch": cid
                    });
                }
            }
        }
        console.log(this.couponList);
        this.list();
    }

    
    list(): void {
        
    }

    send(): void {


    }

}