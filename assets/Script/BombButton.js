// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var BombButton = cc.Class({
    extends: cc.Component,

    properties: {
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
        VSController:{
            default:null,
            type:require("VSController")
        },
        bombPrefab:{
            default:null,
            type:cc.Prefab
        },
        bombIns:{
            default:null,
            type:cc.Node
        },
        press:false,
        label:{
            default:null,
            type:cc.Label
        },
        bombIsOK:false,
        game:{
            default:null,
            type:require("Game")
        }
    },
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        

    },
    onTouchStart(event) {
        if(this.bombIsOK == false) return;
        //cc.instantiate(this.bombPrefab);
        //console.log("touchbutton");
        if(this.press == false) {
            console.log("instantiate"); 
            this.bombIns = cc.instantiate(this.bombPrefab); 
            this.bombIns.parent = cc.director.getScene();
            this.bombIns.setPosition(event.touch.getLocation());
           /* this.bombIns.getComponent(require("Bomb")).start();*/
            this.press = true;
            this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.release,this);
            this.node.on(cc.Node.EventType.TOUCH_END,this.cancel,this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        }
    },
    onTouchMove(event) {
        //console.log("movebomb");
        this.bombIns.setPosition(event.touch.getLocation());
    },
    release(event) {
        //console.log("releasebutton");
        if(this.bombIns.getComponent(require("Bomb")).selectedIndex == -1) this.cancel(event);
        this.VSController.unschedule(this.VSController.timeInterval);
        console.log(event.touch.getLocation());
        this.VSController.destroyIndex(this.bombIns.getComponent(require("Bomb")).selectedIndex);
        this.bombIns.getComponent(cc.Animation).play("bomb_explosion");
        var temp = this.bombIns;
        this.bombIns = null;
        setTimeout(()=>{
            temp.destroy();
            this.VSController.switchSide();
            if(this.game.gameOver == true) this.game.gameOver = false;
        },800);
        this.press = false;
        //this.bombIsOK = false;
        this.VSController.clearStepCount();
        this.node.off(cc.Node.EventType.TOUCH_CANCEL,this.release,this);
        this.node.off(cc.Node.EventType.TOUCH_END,this.cancel,this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
    },
    cancel(event) {
        console.log("cancle");
        var temp = this.bombIns;
        this.bombIns = null;
        if(temp!=null)temp.destroy();
        this.press = false;
        this.node.off(cc.Node.EventType.TOUCH_CANCEL,this.release,this);
        this.node.off(cc.Node.EventType.TOUCH_END,this.cancel,this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
    },
    
    update (dt) {
        if(this.VSController.stepCount  >= 5) { this.label.string = "OK";this.bombIsOK = true; }
        else this.label.string = this.VSController.stepCount;
    },
});
module.exports = BombButton;