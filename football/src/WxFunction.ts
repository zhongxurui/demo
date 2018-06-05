
namespace game {
    type SuccessCallBack = (data: any) => void;
    type FailCallBack = (data: any) => void;

    export class Util {

        public constructor() {

        }
        public static instance: Util;

        public static getInstance(): Util {
            if (Util.instance == null) {
                Util.instance = new Util();
            }
            return Util.instance;
        }

        public ShowLoading(title: string = "加载中"): void {
            wx.showLoading({
                title: title,
                success: () => { },
                fail: () => { },
                complete: res => { },
                mask: true
            })
        }

        public HideLoading(): void {
            wx.hideLoading({
                success: res => { },
                fail: res => { },
                complete: res => { }
            })
        }

        public shareAppMessage(title: string, imageUrl: string, query?: any, onSuccess?: SuccessCallBack): void {
            wx.shareAppMessage({
                title: title,
                imageUrl: imageUrl,
                query: null,
                success: () => { },
                fail: res => {

                },
                complete: res => {

                }
            })
        }
        public showShareMenu(): void {
            wx.showShareMenu({
                withShareTicket: false,
                success: res => {

                },
                fail: res => {

                },
                complete: res => {

                }
            })
        }
    }
}