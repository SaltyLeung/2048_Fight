"use strict";
cc._RF.push(module, '7e928F/vw9KB6TQE+u5s1Rs', 'VSController');
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

    start: function start() {},
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
    }

    // update (dt) {},

});

module.exports = VSController;

cc._RF.pop();