import PileModel from "./pile.class";
import {PileTypeEnum} from "../enums/pile-type.enum";
import {PlayerEnum} from "../enums/player.enum";

export class PlayerModel {
    constructor(playerType) {
        this.playerType = playerType;
        const owner = playerType === PlayerEnum.Human ? PileTypeEnum.HumanPile : PileTypeEnum.BotPile;
        this.pile = new PileModel(owner, true);
    }
}
