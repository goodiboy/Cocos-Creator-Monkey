import GameControl from "./GameControl";
import AudioManager from "./AudioManager";

const {ccclass, property} = cc._decorator;


@ccclass
export default class Player extends cc.Component {

    @property({
        tooltip: '世界坐标的线性速度'
    })
    speed1: number = 650;
    speed2: number = 800;
    // 刚体组件
    RigidBody: cc.RigidBody = null;

    /**
     * 最后一次吃的是什么香蕉
     * 0 => 1个
     * 1 => 3个
     */
    private lastSpeed: number = 0;

    // 是否游戏结束
    public isGameOver: boolean = false;

    // GameControl组件的this
    public GameControlTS: GameControl;

    protected onLoad(): void {
        this.RigidBody = this.getComponent(cc.RigidBody);
        this.GameControlTS = GameControl.getThis;
    }

    // 碰撞检测
    protected onCollisionEnter = (other, self): void => {
        console.log(other);
        if (other.node.group === 'Banana') {
            this.jump(other, self);
            AudioManager.getThis.playGameMusic('jump');
        } else {
            this.gameOver();
            AudioManager.getThis.BgMusic.pause();
            AudioManager.getThis.playGameMusic('gameOver');
        }

    };

    /**
     * 猴子碰到香蕉进行跳跃
     * @param other 碰撞的其他节点的组件
     * @param self 碰撞的当前节点的组件
     */
    private jump(other, self): void {
        const v: cc.Vec2 = this.RigidBody.linearVelocity;
        let currentSpeed: number;
        if (other.tag === 0) {
            if (v.y < 0) {
                currentSpeed = this.speed1;
            } else {
                v.y += this.speed1;
                // 限制最大加速度
                if (this.lastSpeed === 0) {
                    currentSpeed = v.y > this.speed1 + this.speed1 ? this.speed1 + this.speed1 : v.y;
                } else {
                    currentSpeed = v.y > this.speed1 + this.speed2 ? this.speed1 + this.speed2 : v.y;
                }
            }
            this.lastSpeed = 0;
        } else {
            if (v.y < 0) {
                currentSpeed = this.speed2
            } else {
                v.y += this.speed2;
                // 限制最大加速度
                if (this.lastSpeed === 0) {
                    currentSpeed = v.y > this.speed2 + this.speed1 ? this.speed2 + this.speed1 : v.y;
                } else {
                    currentSpeed = v.y > this.speed2 + this.speed2 ? this.speed2 + this.speed2 : v.y;
                }
            }
            this.lastSpeed = 1;
        }
        v.y = currentSpeed;
        // 修改线性速度
        this.RigidBody.linearVelocity = v;
        other.node.active = false;
        switch (other.tag) {
            case 0:
                this.GameControlTS.setScore(10);
                break;
            case 1:
                this.GameControlTS.setScore(20);
                break;
        }
    }

    // 游戏结束
    private gameOver(): void {
        this.isGameOver = true;
        this.getComponent(cc.BoxCollider).enabled = false;
        this.GameControlTS.gameOver();
    }


}
