import Coupon from "./interface/Coupon";
import BabelAwardCollection from "./coupons/newBabelAwardCollection"
enum couponType {
    none,
    receiveCoupons,
    newBabelAwardCollection = "newBabelAwardCollection",

}
let container:HTMLDivElement = document.createElement("div");
container.style.textAlign = "center";
document.body.innerHTML = "";
document.body.style.backgroundColor = "#ffffff";
document.body.append(container);
container.innerHTML="<h2>京东领券助手V0.1</h2><h3>author:krapnik</h2>";
let coupon: Coupon,url = window.location.href;
function getCouponType(): couponType {
    let type: couponType = couponType.none;
    if (!window.location.host.includes("jd.com")) {
        return type;
    }

    if ((window as any).__react_data__) {
        type = couponType.newBabelAwardCollection;
    } else {

    }

    return type;
}

function getCouponDesc(type: couponType) {
    switch (type) {
        case couponType.none:
            break;
        case couponType.newBabelAwardCollection:
            const args = url.match(/active\/(\S*)\/index/)![1];
            coupon = new BabelAwardCollection({ "activityId": args });
            break;
        default:
            break;
    }
    coupon.get();
}
getCouponDesc(getCouponType());
