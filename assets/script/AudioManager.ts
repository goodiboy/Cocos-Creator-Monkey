const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    // 背景音乐
    @property(cc.AudioSource)
    BgMusic: cc.AudioSource = null;

    // 游戏音乐
    @property(cc.AudioSource)
    PlayerMusic: cc.AudioSource = null;

    // 跳跃音乐
    @property({type: cc.AudioClip})
    JumpMusic: cc.AudioClip = null;

    // 游戏结束
    @property({type: cc.AudioClip})
    GameOverMusic: cc.AudioClip = null;

    // AudioManager组件的this
    public static getThis: AudioManager = null;
    public constructor() {
        super();
        AudioManager.getThis = this;
    }

    /**
     * 跳或者游戏结束的音乐
     * @param name 播放的音乐名称
     */
    public playGameMusic(name: string): void {
        if (name === 'jump') {
            this.PlayerMusic.clip = this.JumpMusic;
        } else {
            this.PlayerMusic.volume = 0.15;
            this.PlayerMusic.clip = this.GameOverMusic;
        }
        this.PlayerMusic.play();
    }

}
