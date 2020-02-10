type defaultOptions = {
    timeout?: number,
    jsonpCallback?: string | null
    jsonpCallbackFunction?: string | null
    charset?: string
}
export default class FetchJsonp {
    static defaultOptions: defaultOptions = {
        timeout: 5000,
        jsonpCallback: 'callback',
        jsonpCallbackFunction: null,
    }

    static generateCallbackFunction() {
        return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
    }

    static clearFunction(functionName: string) {
        try {
            delete (<any>window)[functionName];
        } catch (e) {
            (<any>window)[functionName] = undefined;
        }
    }

    static removeScript(scriptId: string) {
        const script = document.getElementById(scriptId);
        if (script) {
            document.getElementsByTagName('head')[0].removeChild(script);
        }
    }

    static fetchJsonp(_url: string, options: defaultOptions = {}): Promise<any> {
        // to avoid param reassign
        let url = _url;
        const timeout = options!.timeout || FetchJsonp.defaultOptions.timeout;
        const jsonpCallback = options!.jsonpCallback || FetchJsonp.defaultOptions.jsonpCallback;

        let timeoutId: number;

        return new Promise((resolve, reject) => {
            const callbackFunction = options!.jsonpCallbackFunction || FetchJsonp.generateCallbackFunction();
            const scriptId = `${jsonpCallback}_${callbackFunction}`;
            (<any>window)[callbackFunction] = (response: any) => {
                resolve({
                    ok: true,
                    // keep consistent with fetch API
                    json: () => Promise.resolve(response),
                });

                if (timeoutId) clearTimeout(timeoutId);

                FetchJsonp.removeScript(scriptId);

                FetchJsonp.clearFunction(callbackFunction);
            };
            // Check if the user set their own params, and if not add a ? to start a list of params
            url += (url.indexOf('?') === -1) ? '?' : '&';

            const jsonpScript = document.createElement('script');
            jsonpScript.setAttribute('src', `${url}${jsonpCallback}=${callbackFunction}`);
            if (options!.charset) {
                jsonpScript.setAttribute('charset', options!.charset);
            }
            jsonpScript.id = scriptId;
            document.getElementsByTagName('head')[0].appendChild(jsonpScript);

            timeoutId = setTimeout(() => {
                reject(new Error(`JSONP request to ${_url} timed out`));

                FetchJsonp.clearFunction(callbackFunction);
                FetchJsonp.removeScript(scriptId);
                (<any>window)[callbackFunction] = () => {
                    FetchJsonp.clearFunction(callbackFunction);
                };
            }, timeout);

            // Caught if got 404/500
            jsonpScript.onerror = () => {
                reject(new Error(`JSONP request to ${_url} failed`));
                FetchJsonp.clearFunction(callbackFunction);
                FetchJsonp.removeScript(scriptId);
                if (timeoutId) clearTimeout(timeoutId);
            };
        });
    }
}