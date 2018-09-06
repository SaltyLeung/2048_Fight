(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/VSController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7e928F/vw9KB6TQE+u5s1Rs', 'VSController', __filename);
// Script/VSController.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var VSController = cc.Class({
    extends: cc.Component,

    properties: {
        isDown: true,
        sliceUp: {
            default: null,
            type: cc.Node
        },
        sliceDown: {
            default: null,
            type: cc.Node
        },
        buttonUp: {
            default: null,
            type: cc.Node
        },
        buttonDown: {
            default: null,
            type: cc.Node
        },
        blockWhite: {
            default: null,
            type: cc.Node
        },
        blockDark: {
            default: null,
            type: cc.Node
        },
        restart: {
            default: null,
            type: cc.Node
        },
        game1: {
            default: null,
            type: cc.Node
        },
        game2: {
            default: null,
            type: cc.Node
        },
        gameP1: {
            default: null,
            type: require("Game")
        },
        gameP2: {
            default: null,
            type: require("Game")
        },
        p1Label: {
            default: null,
            type: cc.Label
        },
        p2Label: {
            default: null,
            type: cc.Label
        }
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

    // onLoad () {},

    start: function start() {
        this.gameP1 = this.game1.getComponent(require("Game"));
        this.gameP2 = this.game2.getComponent(require("Game"));
    },
    switchSide: function switchSide() {
        if (this.isDown == true) {
            console.log("switchA");
            this.sliceDown.active = false;
            this.buttonUp.active = false;
            this.blockDark.active = true;
            this.isDown = false;
        } else {
            console.log("switchB");
            this.sliceUp.active = false;
            this.buttonDown.active = false;
            this.blockWhite.active = true;
            this.isDown = true;
        }
    },
    activeDark: function activeDark() {
        this.sliceUp.active = true;
        this.buttonDown.active = true;
        this.blockDark.active = false;
    },
    activeWhite: function activeWhite() {
        this.buttonUp.active = true;
        this.sliceDown.active = true;
        this.blockWhite.active = false;
    },
    p1Win: function p1Win() {
        //this.gameP2.node.active = false;
        //this.gameP1.dode.active = false;
        this.buttonUp.active = false;
        this.buttonDown.active = false;
        this.sliceDown.active = false;
        this.sliceUp.active = false;
        this.p2Label.string = "Black Lose!";
        this.p1Label.string = "White Win!";
        this.restart.active = true;
    },
    p2Win: function p2Win() {
        this.buttonUp.active = false;
        this.buttonDown.active = false;
        this.sliceDown.active = false;
        this.sliceUp.active = false;
        this.p2Label.string = "Black Win!";
        this.p1Label.string = "White Lose!";
        this.restart.active = true;
    },
    openP2: function openP2() {
        if (this.gameP2.gameOver == false) this.p2Win();else this.p1Win();
    },
    openP1: function openP1() {
        if (this.gameP1.gameOver == false) this.p1Win();else this.p2Win();
    },
    reloadScene: function reloadScene() {
        cc.director.loadScene("Game");
    }

    // update (dt) {},

});

module.exports = VSController;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=VSController.js.map
        