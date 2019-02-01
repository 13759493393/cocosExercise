const {ccclass, property} = cc._decorator;
import MK from "./MiddleKey";

@ccclass
export default class PlayerEnter extends cc.Component {

    @property(cc.Node)
    startGame: cc.Node = null;

    @property(cc.Node)
    content:cc.Node = null;

    onLoad(){
        MK.PlayerEnter = this;
        //点击开始游戏
        this.clickStart();

    }

    /**
     *点击开始游戏发送消息
     **/
    clickStart(){
        this.startGame.on(cc.Node.EventType.TOUCH_START,()=>{
            //先清除消息队列
            MK.GDispatch.clear();
            MK.GuessState.is_start_game = true;
            this.content.active = true;
            MK.GManager.sendEnter();
        })
    }

    /**
     * 玩家进入初始化展示消息
     *"topOneUser","seconds","bonusPoll","autoBetting","count","totalCount","bettingIndexLists","userBetting","gameHasStart"
     * */
    initPlayerEnter(msg) {

        if (msg != null && msg != undefined) {
            //初始化奖金池
            //初始化奖金池金额
            MK.PPLogic.prixNumber(msg.bonusPoll);
            //初始化上次三条时间
            MK.PPLogic.getLast(msg.seconds);

            //初始化上轮大赢家
            MK.FirstLogic.getFirst(msg.topOneUser);

            //初始化下注类型和金额按钮
            //初始化自动下注和取消自动下注按钮
            MK.BetLogic.getAutoBetting(msg);
            //初始结算倒计时
            MK.CDLogic.prixCountDown(msg.count);
            //初始化下注分类
            MK.BetLogic.showBetPeople(msg.bettingIndexLists);

            //初始化开奖历史记录
            MK.HistoryLogic.getHistory(msg.guessHistory);

            //玩家进入展示下注信息
            MK.BetLogic.showBets(msg.userBetting);

            //存储历史开奖记录
            msg.guessHistory.forEach((prix,idx)=>{
                MK.GuessState.prix_history.push(prix);
            })

        }

    }

}
