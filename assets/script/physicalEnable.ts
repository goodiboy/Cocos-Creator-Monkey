const {ccclass, property} = cc._decorator;
@ccclass
export default class GameManager extends cc.Component {

    // 是否开启碰撞调试
    @property
    collisionDebug: boolean = false;

    // 是否物理调试
    @property
    physicalDebug: boolean = false;


    protected onLoad(): void {
        // 打开碰撞检测
        const collisionManager: cc.CollisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;

        if (this.collisionDebug) {
            // 开启碰撞调试
            collisionManager.enabledDebugDraw = true;
        }

        // 打开物理引擎
        const physicsManager: cc.PhysicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        if (this.physicalDebug) {
            // 开启物理引擎调试
            physicsManager.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
                cc.PhysicsManager.DrawBits.e_pairBit |
                cc.PhysicsManager.DrawBits.e_centerOfMassBit |
                cc.PhysicsManager.DrawBits.e_jointBit |
                cc.PhysicsManager.DrawBits.e_shapeBit;
        }


    }




}
