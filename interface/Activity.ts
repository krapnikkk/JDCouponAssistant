export default interface Coupon {
    url: string;
    params:any;
    data: Array<object>;
    container: HTMLDivElement;
    get(): void;
    list(): void;
}