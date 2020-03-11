import Utils from "./Ulits";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlatformLayer extends cc.Component {

    // 平台预制体
    @property(cc.Prefab)
    Platform: cc.Prefab = null;

    @property(cc.Node)
    PlatformLayer: cc.Node = null;

    // 敌人预制体
    @property(cc.Prefab)
    BirdPrefab: cc.Prefab = null;

    @property(cc.Node)
    BirdLayer: cc.Node = null;


    // 每次增加多少个平台
    private spawnCount: number = 5;

    // 当前的滚动高度
    private currentHeight: number = 0;

    // 当前实例的this
    public static getThis: PlatformLayer;
    public constructor() {
        super();
        PlatformLayer.getThis = this;
    }

    // 平台对象池
    public PlatFormPool: cc.NodePool = new cc.NodePool();

    // 敌人的对象池
    public BirdPool: cc.NodePool = new cc.NodePool();


    protected start(): void {
        this.createPlatForm();
    }


    // 创建平台
    public createPlatForm(): void {
        for (let i = 0; i < this.spawnCount; i++) {
            let node: cc.Node = null;
            if (this.PlatFormPool.size() > 0) {
                node = this.PlatFormPool.get();
            } else {
                node = cc.instantiate(this.Platform);
            }
            node.getComponent('Platform').init(this.PlatformLayer, this.currentHeight);
            this.currentHeight += Utils.PLATFORM_MARGIN();


            // 随机生成香蕉
            if (Math.random() < 0.25) {
                let bird: cc.Node = null;
                if (this.BirdPool.size() > 0) {
                    bird = this.BirdPool.get();
                }else{
                    bird = cc.instantiate(this.BirdPrefab);
                }
                const rndX = Utils.randomNumber(-200,200);
                bird.position = cc.v2(rndX, this.currentHeight);
                bird.parent = this.BirdLayer;
            }
        }

    }

}
