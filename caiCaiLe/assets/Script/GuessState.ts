const {ccclass, property} = cc._decorator;
import MK from "./MiddleKey";

@ccclass
export default class GuessState extends cc.Component {

    /**
     * 0为不可用，1为可用
     * */

    //自动下注状态
    auto_bet_guess: boolean = false;

    //取消自动下注状态
    auto_cancel_guess: boolean = false;

    //是否开始游戏
    is_start_game:boolean = false;

    //开奖历史
    prix_history:Array<any> = new Array<any>();

    //下注金额状态
    // bet_count_guess: number = 0;

    //重复投注状态
    bet_repeat_guess: number = 0;

    //下注类型状态
    bet_style_guess: number = 0;

    //当前下注
    bet_cur_guess:Array<any> = [0,0,0,0,0,0];

    //上局下注
    bet_pre_guess:Array<any> = [0,0,0,0,0,0];

    /*//自动下注次数选项
    bet_autoSelect_guess:Array<any> = [10,30,50,100];

    //自动下注金额选项
    bet_countSelect_guess:Array<any> = [2000,50000,500000,5000000];*/

    //控制消息发送次数
    control_send_count:Array<any> = new Array<any>();

    onLoad() {
        MK.GuessState = this;
    }


}
