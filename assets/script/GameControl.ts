import AudioManager from "./AudioManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameControl extends cc.Component {

    // 游戏开始节点
    @property(cc.Node)
    GameStartNode: cc.Node = null;

    // 游戏结束节点
    @property(cc.Node)
    GameOverNode: cc.Node = null;

    // 猴子的刚体组件
    @property(cc.RigidBody)
    MonkeyRigidBody: cc.RigidBody = null;

    // 游戏分数Label
    @property(cc.Label)
    GameScoreLabel: cc.Label = null;

    // 游戏分数变量
    private currentScore: number = 0;


    public static getThis: GameControl;
    constructor() {
        super();
        GameControl.getThis = this;
    }

    protected start() {
        cc.view.enableAutoFullScreen(true);
        this.init();
        this.GameStartNode.on(cc.Node.EventType.TOUCH_START, this.startGame, this);
    }

    //开始游戏
    public startGame(): void {
        this.MonkeyRigidBody.type = cc.RigidBodyType.Dynamic;
        this.GameStartNode.active = false;
        AudioManager.getThis.BgMusic.play();
    }

    // 初始化游戏
    public init(): void {
        this.GameOverNode.active = false;
        this.GameScoreLabel.string = 'score:' + this.currentScore;
        this.MonkeyRigidBody.type = cc.RigidBodyType.Static;
    }

    // 游戏结束
    public gameOver(): void {
        console.log(this);
        this.GameOverNode.active = true;
        this.GameOverNode.on('touchstart', GameControl.restartGame)
    }

    // 重新游戏
    public static restartGame(): void {
        cc.director.loadScene('game');
    }

    // 设置游戏的分数
    public setScore(score: number): void {
        this.currentScore += score;
        this.GameScoreLabel.string = 'score:' + this.currentScore;

    }

    // update (dt) {}
}
