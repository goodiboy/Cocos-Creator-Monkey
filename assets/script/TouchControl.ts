import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchControl extends cc.Component {


    // 控制的移动速度
    @property
    moveSpeed: number = 200;

    // 猴子节点
    @property(cc.Node)
    PlayerNode: cc.Node = null;

    // 猴子刚体组件
    public RigidBody: cc.RigidBody = null;

    // 猴子的ts代码组件
    public PlayerTS: Player = null;


    public start(): void {
        // 猴子节点的刚体组件
        this.RigidBody = this.PlayerNode.getComponent(cc.RigidBody);
        // 猴子组件的this对象
        this.PlayerTS = this.PlayerNode.getComponent('Player');

        // 添加触摸事件
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    }

    private touchMove(e): void {
        if (this.PlayerTS.isGameOver) {
            // 游戏结束删除事件
            this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove);
            return;
        }
        const posX: number = e.getDelta().x;
        const v = this.RigidBody.linearVelocity;
        if (posX > 0) {
            v.x = this.moveSpeed;
        } else if (posX < 0) {
            v.x = -this.moveSpeed;
        }
        // 设置刚体的线性值
        this.RigidBody.linearVelocity = v;
    }

    // update (dt) {}
}
