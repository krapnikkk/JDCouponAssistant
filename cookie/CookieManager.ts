import Utils from "../utils/utils";
import Config from "../config/config";

type CookieType = {
    ck: string
    mark: string
    flag?:boolean
}
export default class CookieManager {
    constructor(container: HTMLDivElement) {

    }
    static cookieArr: Array<CookieType> = [];
    static parseCK(str: string) {
        try {
            this.cookieArr = this.splitCookies(str);
            if (this.cookieArr.length == 0) {
                alert("导入的文本文档格式内容有误或者读取识别！");
            }else{
                Config.multiFlag = true;
            }
        } catch (err) {
            console.log(err);
            alert("导入CK文本文档有误！");
        }
    }

    static splitCookies(ck: string): Array<CookieType> {
        const str = ck.split('\n');
        let o: Array<CookieType> = [];
        str.map((item) => {
            let result = item.split('----');
            o.push({
                mark: result[0],
                ck: result[1]
            });
        })
        return o;
    }

    static outPutLog(output: HTMLTextAreaElement) {
        if (this.cookieArr.length > 0) {
            let str = "";
             this.cookieArr.map((item) => {
                str+=`\n【${item["mark"]}】导入成功!`
            })
            Utils.outPutLog(output,str);
        }
    }

}
