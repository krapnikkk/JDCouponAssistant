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
        if (r != null)
            return r[2];
        return "";
    }

    static formateTime(time: string): number {
        return Math.trunc(+time.replace(/[:|：]+/ig, ""));
    }

    static createJsonp(callback: string) {
        var jsonpScript = document.createElement('script');
        document.getElementsByTagName('head')[0].appendChild(jsonpScript);
        jsonpScript.setAttribute('src', `https://wq.jd.com/user/info/QueryJDUserInfo?sceneid=11110&sceneval=2&g_login_type=1&callback=${callback}`);
    }
}