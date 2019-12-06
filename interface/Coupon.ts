export default interface Coupon {
     url: string;
     couponParams:any;
     couponList: Array<object>;
     container: HTMLDivElement;
     get(): void;
     list(): void;
     send(outputTextarea: HTMLTextAreaElement): void;
}