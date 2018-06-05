
/**
 * 封装wxRequest function
 * zhongxurui
 */

namespace game {

    type SuccessCallBack = (data: any) => void;
    type FailCallBack = (data: any) => void;

    export class HTTPCLI {

        private onSuccess: SuccessCallBack = null;
        private onFailed: FailCallBack = null;

        public constructor() {

        }
        public static wxHttpRequest(url: string, data: any, onsuccess?: SuccessCallBack, onFailed?: FailCallBack): void {
            let client = new HTTPCLI();
            client.wxRequest(url, data, onsuccess, onFailed);
        }

        private wxRequest(url: string, data: any, onsuccess?: SuccessCallBack, onFailed?: FailCallBack): void {

            Util.getInstance().ShowLoading();
            wx.request({
                url: url,
                data: data,
                method: "GET",
                dataType: "json",
                header: { 'content-type': 'application/json' },
                success: res => {
                    Util.getInstance().HideLoading();
                    if (res.statusCode == 200) {
                        onsuccess(res);
                    } else {
                        onFailed(res);
                    }
                },
                fail: res => {
                    Util.getInstance().HideLoading();
                    onFailed(res);
                },
                complete: res => {

                }
            })
        }
    }
}