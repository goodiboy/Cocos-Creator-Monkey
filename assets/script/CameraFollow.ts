import PlatformLayer from "./PlatformLayer";
import Utils from "./Ulits";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraFollow extends cc.Component {

    // 猴子节点
    @property(cc.Node)
    PlayerNode: cc.Node = null;

    // 背景1
    @property(cc.Node)
    Bg1: cc.Node = null;

    // 背景2
    @property(cc.Node)
    Bg2: cc.Node = null;

    // 背景3
    @property(cc.Node)
    Bg3: cc.Node = null;

    // 左右边缘的碰撞组件
    @property(cc.Node)
    Bounds: cc.Node = null;

    // 平台层的组件this
    public PlatformLayerThis: PlatformLayer = null;


    public static getThis: CameraFollow;
    constructor() {
        super();
        CameraFollow.getThis = this;
    }

    protected start(): void {
        this.PlatformLayerThis = PlatformLayer.getThis;
    }


    protected update(dt: number): void {
        if (this.PlayerNode.y > this.node.y) {
            this.node.y = this.PlayerNode.y;
            this.Bounds.position = cc.v2(0,0)
        }
        if (this.node.y >= this.Bg2.y) {
            let temp: cc.Node = this.Bg1;
            this.Bg1 = this.Bg2;
            this.Bg2 = this.Bg3;
            this.Bg3 = temp;
            this.Bg3.y = this.Bg2.y + Utils.SCREEN_HEIGHT;
            this.PlatformLayerThis.createPlatForm();
        }
    }
}
