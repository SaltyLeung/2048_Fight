// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var Bomb = cc.Class({
    extends: cc.Component,

    properties: {
        /*bombPrefab:{
            default: null,
            type:cc.Prefab
        },
        bombIns:{
            default:null,
            type:cc.Node
        },
        */
        selectedIndex: -1
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

   onLoad () {console.log("bombshow");},

    start () {
        //console.log("bombshow");
        //this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        //this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        //this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.release,this);
    },
    update(dt) {
        //console.log("created");
    },

    onTouchEnd(event) {
        //this.game.destroyIndex(selectedIndex);
    },
    
    onCollisionStay(other, self) {
        console.log("collision "+other.getComponent(cc.Collider).tag);
        this.selectedIndex = other.getComponent(cc.Collider).tag; 
    },
    release(event) {
        
    }
    
});
module.exports = Bomb;