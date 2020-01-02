export default interface Coupon {
    params:any;
    data: Array<object>;
    container: HTMLDivElement;
    get(): void;
    list(): void;
}