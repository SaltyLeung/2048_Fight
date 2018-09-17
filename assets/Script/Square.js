// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var Square = cc.Class({
    extends: cc.Component,

    properties: {
        number: 0,  //所拥有的数字
        numLabel: {
            default: null,
            type:cc.Label   
        },
        gameNode: {
            default: null,
            type: cc.Node
        },
        gameScript: {
            default: null,
            type: require("Game")
        },
        gameScriptP2: {
            default: null,
            type: require("Game")
        },
        tempTarget:0,
        toDouble: false,
        toDestroyed: false,
        moveSpeed:0.4
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:
    move(thatGameScript) {
        var action = cc.moveTo(this.moveSpeed, thatGameScript.positionList[this.tempTarget].getPosition());
// 执行动作
        this.node.runAction(action);
    },

    onLoad () {
        //console.log("create");
        this.numLabel = this.node.getChildByName("Number");
        this.gameScript = cc.find("Game").getComponent("Game");
        this.gameScriptP2 = cc.find("GameP2").getComponent("Game");
    },

    start () {
        
        //console.log(this.numLabel.getComponent(cc.Label));
        
    },
    /*down(currIndex) {
        var targetIndex = currIndex;
        for(var i = currIndex - 4; i > 0; i-= 4) 
        if(gameScript.positionList[i].number == 0) targetIndex = i;
        else if((this.number == this.gameScript.positionList[i].number) && this.gameScript.eatableList[i] == true)  {
            this.gameScript.eat(currIndex, i, this.node);
        }
    },*/

    update (dt) {
        //console.log("create");
        this.numLabel.getComponent(cc.Label).string = this.number.toString();
    },
});
module.exports = Square;
