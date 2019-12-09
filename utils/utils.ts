(window as any).jsonpBind = function (res: string) {
    Utils.jsonpBind(JSON.stringify(res));
}


// type attributes = {
//     innerHTML: string
// }

export default class Utils {
    static formateDate(date: string): string {
        let dateObj = new Date(+date),
            hours: string | number = dateObj.getHours(),
            mins: string | number = dateObj.getMinutes(),
            secs: string | number = dateObj.getSeconds(),
            msecs: string | number = dateObj.getMilliseconds();
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (mins < 10) {
            mins = "0" + mins;
        }
        if (secs < 10) {
            secs = "0" + secs;
        }
        if (msecs < 10) {
            msecs = "00" + msecs;
        } else if (msecs < 100 && msecs >= 10) {
            msecs = "0" + msecs;
        }
        return hours + "" + mins + "" + secs + "" + msecs;
    }

    static obtainLocal(ck: string): string {
        return ck.replace(/(?:(?:^|.*;\s*)3AB9D23F7A4B3C9B\s*=\s*([^;]*).*$)|^.*$/, "$1");
    };

    static getCookie(): string {
        return document.cookie;
    }

    static formatDate(date: string): string {
        let dateObj = new Date(+date),
            hours: string | number = dateObj.getHours(),
            mins: string | number = dateObj.getMinutes(),
            secs: string | number = dateObj.getSeconds(),
            msecs: string | number = dateObj.getMilliseconds();
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (mins < 10) {
            mins = "0" + mins;
        }
        if (secs < 10) {
            secs = "0" + secs;
        }
        if (msecs < 10) {
            msecs = "00" + msecs;
        } else if (msecs < 100 && msecs >= 10) {
            msecs = "0" + msecs;
        }
        return hours + "" + mins + "" + secs + "" + msecs;
    }

    static GetQueryString(name: string): string {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (!r) {
            let url = window.location.hash;
            r = url.substr(url.indexOf("?") + 1, url.length - url.indexOf("?")).match(reg);
        }
        if (r != null)
            return r[2];
        return "";
    }

    static getQueryStringByName(url: string) {
        url = url.replace(/#.*/, ''); //removes hash (to avoid getting hash query)
        var queryString = /\?[a-zA-Z0-9\=\&\%\$\-\_\.\+\!\*\'\(\)\,]+/.exec(url); //valid chars according to: http://www.ietf.org/rfc/rfc1738.txt
        return (queryString) ? decodeURIComponent(queryString[0]) : '';
    }

    static formateTime(time: string): number {
        return Math.trunc(+time.replace(/[:|：]+/ig, ""));
    }

    static createJsonp(url: string, bind: boolean = false) {
        var jsonpScript = document.createElement('script');
        if (bind) {
            url += "jsonpBind";
            document.getElementsByTagName('head')[0].appendChild(jsonpScript);
            jsonpScript.setAttribute('src', url);
        } else {
            document.getElementsByTagName('head')[0].appendChild(jsonpScript);
            jsonpScript.setAttribute('src', url);
        }

    }

    static jsonpBind(res: string) {
        postMessage(res, '*');
    }

    // static HTMLfactory(type: string, attributes: any, parent: HTMLElement): HTMLElement {
    //     let ele: any = document.createElement(type);
    //     for (let k in attributes) {
    //         ele[k] = attributes[k];
    //     }
    //     parent.append(ele);
    //     return ele;

    // }
}