"use strict";
cc._RF.push(module, '258c5409KZKUpwQRZ/XFZu4', 'SlideControl');
// Script/SlideControl.js

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

cc.Class({
    extends: cc.Component,

    properties: {
        vsController: {
            default: null,
            type: require("VSController")
        },
        gameScript_1: {
            default: null,
            type: require("Game")
        },
        gameScript_2: {
            default: null,
            type: require("Game")
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
        } },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        //this.gameScript = game.getComponent(require("Game"));
        //console.log(this.gameScript);
    },
    start: function start() {
        var that = this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            //console.log("touch");
            //console.log(that.gameScript);
            var delta = event.getDelta();
            if (Math.abs(delta.x) >= Math.abs(delta.y)) {
                if (delta.x > 0) {
                    that.gameScript_1.onSlide("right");that.gameScript_2.onSlide("right");
                } else {
                    that.gameScript_1.onSlide("left");that.gameScript_2.onSlide("left");
                }
            } else {
                if (delta.y > 0) {
                    that.gameScript_1.onSlide("up");that.gameScript_2.onSlide("up");
                } else {
                    that.gameScript_1.onSlide("down");that.gameScript_2.onSlide("down");
                }
            }
        }, this);
    }
}

// update (dt) {},
);

cc._RF.pop();