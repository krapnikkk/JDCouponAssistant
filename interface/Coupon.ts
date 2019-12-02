export default interface Coupon {
     url: string;
     data: string;
     couponList: Array<object>;
     method: string;
     get(): void;
     send(): void;
     list(): void;
}