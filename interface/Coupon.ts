export default interface Coupon {
     url: string;
     data: string;
     couponList: Array<object>;
     method: string;
     get(): void;
     list(): void;
     send(outputTextarea: HTMLTextAreaElement): void;
}