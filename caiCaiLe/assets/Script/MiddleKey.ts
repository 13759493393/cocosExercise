import GDispatch from "./guessNet/GDispatch";
import GManager from "./guessNet/GManager";
import GHandler from "./guessNet/GHandler";
import RECLogic from "./guessRecord/RECLogic";
import RANLogic from "./guessRank/RANLogic";
import CDLogic from "./guessCountDown/CDLogic";
import OpenPrixLogic from "./openPrix/OpenPrixLogic"
import PPLogic from "./prixPool/PPLogic";
import {guessGetInfo} from "./axiosRequest";
import FirstLogic from "./guessFirst/FirstLogic";
import BetLogic from "./guessBet/BetLogic";
import HistoryLogic from "./guessHistory/HistoryLogic";
import GuessState from "./GuessState";
import ETLogic from "./guessErrorTips/ETLogic";
import PlayerEnter from "./PlayerEnter";


class MiddleKey{
    //管理类
    GDispatch:GDispatch = null;
    GHandler:GHandler = null;
    GManager:GManager = null;
    RECLogic:RECLogic = null;
    RANLogic:RANLogic = null;
    CDLogic:CDLogic = null;
    OpenPrixLogic:OpenPrixLogic= null;
    PPLogic:PPLogic = null;
    guessGetInfo:guessGetInfo = null;
    FirstLogic:FirstLogic = null;
    BetLogic:BetLogic = null;
    HistoryLogic:HistoryLogic = null;
    GuessState:GuessState = null;
    ErrorTips:ETLogic = null;
    PlayerEnter:PlayerEnter = null;
}

const MK = new MiddleKey();
export default MK;
