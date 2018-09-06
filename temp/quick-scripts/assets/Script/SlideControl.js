(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SlideControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '258c5409KZKUpwQRZ/XFZu4', 'SlideControl', __filename);
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
        },
        touchStartLocation: {
            default: null,
            type: cc.v2
        },
        minMoveDisSqr: 100
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

    onLoad: function onLoad() {
        //this.gameScript = game.getComponent(require("Game"));
        //console.log(this.gameScript);
    },
    start: function start() {
        var that = this;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },
    onTouchStart: function onTouchStart(event) {
        this.touchStartLocation = event.touch.getLocation();
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        /*    if(Math.abs(delta.x) >= Math.abs(delta.y)) {
                if(delta.x > 0) { this.gameScript_1.onSlide("right"); this.gameScript_2.onSlide("right"); }
                else { this.gameScript_1.onSlide("left"); this.gameScript_2.onSlide("left"); }
            } else {
                if(delta.y > 0) {this.gameScript_1.onSlide("up");this.gameScript_2.onSlide("up"); }
                else {this.gameScript_1.onSlide("down");this.gameScript_2.onSlide("down"); }
            }*/
    },
    onTouchMove: function onTouchMove(event) {
        var moveVec = new cc.v2();
        //var nowLocation;
        //nowLocation = event.touch.getLocation();
        //console.log(event.touch.getLocation());
        var nowLocation = new cc.v2(event.touch.getLocationX(), event.touch.getLocationY());
        nowLocation.sub(this.touchStartLocation, moveVec);
        console.log(moveVec.magSqr());
        if (moveVec.magSqr() > this.minMoveDisSqr) {
            if (Math.abs(moveVec.x) > Math.abs(moveVec.y)) {
                if (moveVec.x > 0) {
                    this.gameScript_1.onSlide("right");this.gameScript_2.onSlide("right");this.touchStartLocation = nowLocation;
                } else {
                    this.gameScript_1.onSlide("left");this.gameScript_2.onSlide("left");
                }
            } else {
                if (moveVec.y > 0) {
                    this.gameScript_1.onSlide("up");this.gameScript_2.onSlide("up");this.touchStartLocation = nowLocation;
                } else {
                    this.gameScript_1.onSlide("down");this.gameScript_2.onSlide("down");this.touchStartLocation = nowLocation;
                }
            }
        }
    },
    onTouchEnd: function onTouchEnd() {
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    // update (dt) {},

});

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
        //# sourceMappingURL=SlideControl.js.map
        