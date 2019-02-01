import {AxiosRequest} from "./AxiosRequest";
import SignLogic from "./sign_in/SignLogic";
import TipTemplate from "./TipTemplate";
import RegLogic from "./register/RegLogic";
import FPWLogic from "./forgetPassWord/FPWLogic";
import Manager from "./candyNet/Manager";
import Dispatch from "./candyNet/Dispatch";
import FreeLogic from "./freeMode/FreeLogic";
import ConLogic from "./container/ConLogic";
import PopLogic from "./pops/PopLogic";
import CPLogic from "./checkPoint/CPLogic";
import IntoLogic from "./intoGame/IntoLogic";
import GameLogic from "./playGame/GameLogic";
import CandyState from "./CandyState";

class MiddleKeys {
    axiosRequest: AxiosRequest = null;
    signLogic: SignLogic = null;
    registerLogic: RegLogic = null;
    tips: TipTemplate = null;
    forgetPWord: FPWLogic = null;
    candyManager: Manager = null;
    candyDispatch: Dispatch = null;
    freeLogic: FreeLogic = null;
    container: ConLogic = null;
    popLogic: PopLogic = null;
    checkPointLogic: CPLogic = null;
    intoGameLogic: IntoLogic = null;
    gameLogic: GameLogic = null;
    candyState:CandyState = null;
}

const MK = new MiddleKeys();
export default MK;
