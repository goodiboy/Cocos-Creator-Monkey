export default class Utils {
    // 左边平台X最小值
    public static PLATFORM_LEFT_MIN: number = -360;
    // 左边平台X最大值
    public static PLATFORM_LEFT_MAX: number = -120;
    // 右边平台X最小值
    public static PLATFORM_RIGHT_MIN: number = 120;
    // 右边平台X最大值
    public static PLATFORM_RIGHT_MAX: number = 360;

    // 屏幕画布高度
    public static SCREEN_HEIGHT: number = 960;

    // 获取平台Y轴随机间距
    public static PLATFORM_MARGIN(): number {
        return 300 + Math.floor(Math.random() * 80);
    };


    // 获得两个数之间的随机值
    public static randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}