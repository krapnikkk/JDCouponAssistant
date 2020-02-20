import Utils from "../utils/utils";
import Config from "../config/config";
import fj from "../utils/fetch-jsonp";
import  { CookieHandler,CookieType } from "./CookieHandler";


export default class CookieManager {
    constructor(container: HTMLDivElement) {

    }
    static cookieArr: Array<CookieType> = [];
    static parseCK(str: string) {
        try {
            this.cookieArr = this.splitCookies(str);
            if (this.cookieArr.length == 0) {
                alert("导入的文本文档格式内容有误或者读取识别！");
            } else {
                Config.importFlag = true;
            }
        } catch (err) {
            console.log(err);
            alert("导入CK文本文档有误！");
        }
    }

    static splitCookies(ck: string): Array<CookieType> {
        const str = ck.split('\n');
        let o: Array<CookieType> = [];
        str.map((item, index) => {
            let result = item.split('----');
            o.push({
                mark: result[0],
                ck: result[1],
                index: index
            });
        })
        return o;
    }

    static outPutLog(output: HTMLTextAreaElement) {
        if (this.cookieArr.length > 0) {
            let str = "";
            this.cookieArr.map((item) => {
                str += `\n【${item["mark"]}】导入成功!`
            })
            Utils.outPutLog(output, str);
        }
    }

    static checkLogin(output: HTMLTextAreaElement, ckObj: CookieType): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                CookieHandler.coverCookie(ckObj);
                await fj.fetchJsonp(Config.JDUserInfoURL).then(function (response) {
                    return response.json()
                }).then((res) => {
                    if (res.base.nickname) {
                        Utils.outPutLog(output, `【${ckObj.mark}】:京东账号->${res.base.nickname}`);
                        resolve(true);
                    } else {
                        Utils.outPutLog(output, `【${ckObj.mark}】:该ck校验失败，请检查有效性!`);
                        resolve(false);
                    }
                })
            }, 500 * ckObj.index)
        })
    }

}
