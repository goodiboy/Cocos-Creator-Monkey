import PlatformLayer from "./PlatformLayer";
import CameraFollow from "./CameraFollow";
import Utils from "./Ulits";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Platform extends cc.Component {

    // 香蕉节点
    @property(cc.Sprite)
    Banana: cc.Sprite = null;

    // 香蕉精灵帧数组
    @property(cc.SpriteFrame)
    BananaFrames: cc.SpriteFrame[] = [];

    // PlatformLayer组件的this
    public PlatformLayerThis: PlatformLayer = null;

    // CameraFollowThis组件的this
    public CameraFollowThis: CameraFollow = null;

    protected start(): void {
        this.PlatformLayerThis = PlatformLayer.getThis;
        this.CameraFollowThis = CameraFollow.getThis;
    }

    /**
     * 初始化精灵帧图片
     * @param parent 父节点
     * @param posY Y轴位置
     */
    public init(parent:cc.Node,posY:number): void {
        // 随机一个精灵下标
        const index: number = Utils.randomNumber(0, 1);
        // 随机一个x周位置
        let rndX: number;
        if (Utils.randomNumber(0, 1) === 0) {
            this.node.scaleX = 0.5;
            rndX = Utils.randomNumber(Utils.PLATFORM_LEFT_MIN, Utils.PLATFORM_LEFT_MAX);
        } else {
            rndX = Utils.randomNumber(Utils.PLATFORM_RIGHT_MIN, Utils.PLATFORM_RIGHT_MAX);
            this.node.scaleX = -0.5;
        }
        this.node.position = cc.v2(rndX, posY);
        this.node.parent = parent;
        this.Banana.node.active = true;
        this.Banana.spriteFrame = this.BananaFrames[index];
        this.Banana.getComponent(cc.BoxCollider).tag = index;
    }

    protected update(dt: number): void {
        if (this.node.y < this.CameraFollowThis.node.y - Utils.SCREEN_HEIGHT) {
            this.PlatformLayerThis.PlatFormPool.put(this.node);
        }
    }
}
