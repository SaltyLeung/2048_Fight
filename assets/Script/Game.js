// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var Game = cc.Class({
    extends: cc.Component,

    properties: {
        gameOver: false,
        win:false,
        slideCount:-1,
        isP2: false,
        destroySpeed: 2,
        //fadeSpeed: 0.4,
        timeOut : true,
       
        vsController: {
            default: null,
            type: require("VSController")
        },
        squarePrefab: {
            default: null,
            type: cc.Prefab
        },
        positionList: {   //不动，最下面一行为0 1 2 3 倒数第二行为 4 5 6 7 以此类推  具有子属性number
            default: [],
            type:[cc.Node]
        },
        eatableList: {  //该节点位置是否可吞
            default: [],
            type:[cc.Boolean]
        },
        moveableList: {   //管理可移动方框
            default: [],
            type:[cc.Node]
        },stepCount:0

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

    onLoad () {
        for(var i = 0; i < 16; ++i) {
            this.positionList[i].number = 0;
            this.moveableList[i] = null;
            this.eatableList[i] = false;
        }
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        
    },

    start () {
        this.randomCreate();
        
        //console.log("aaaaa");
    },
    update(dt) {
        //if(this.slideCount >= 6) {this.slideCount = 0; this.vsController.switchSide();} 
    },

    randomCreate() {
        if(this.gameOver == true) return;
        //this.slideCount += 1;
        //找随机空位
        var emptyPos = new Array();
        for(var i = 0; i < 16; ++i) { 
            if(this.positionList[i].number == 0) emptyPos.push(i); 
            if((this.positionList[i].number >= 2048) && (this.isP2 == false)) { this.vsController.p1Win(); return; }
            else if((this.positionList[i].number >= 2048) && (this.isP2 == true)) { this.vsController.p2Win(); return; }
        }
       
        var index = Math.floor(Math.random() * emptyPos.length);
        
        //随机生成2或4
        var newValue = (1 + Math.floor(Math.random() * 2)) * 2;

        var newSquare = cc.instantiate(this.squarePrefab);
        //console.log(newSquare);
        newSquare.setPosition(this.positionList[emptyPos[index]].getPosition());

        newSquare.getComponent(require("Square")).number = newValue;
        newSquare.getComponent(require("Square")).gameScript = this;
        //newSquare.setGlobalZOrder(1000);
        this.node.addChild(newSquare);
        newSquare.getComponent(cc.Animation).play("2048Show");

        this.positionList[emptyPos[index]].number = newValue;
        this.moveableList[emptyPos[index]] = newSquare;
        console.log("----------");
        console.log(this.gameOver);
        if(emptyPos.length == 1) {if(!(this.checkAlive())) {this.gameOver = true; console.log("GameOver");}else console.log("Game Continue");}
        //console.log(emptyPos[index]);
        //for(var i = 0; i < 16; ++i) { if(this.moveableList[i]!=null) console.log("moveableNum"+i+": "+this.moveableList[i].getPosition());}
        //for(var i = 0; i < 16; ++i) {console.log("position"+i+": "+this.positionList[i].number);}
        
    },
    moveDown() {
        var hasBeenMove = false;
        /*for(var i = 0; i < 16; ++i) {
            this.eatableList[i] = true;
        }
        for(var i = 4; i < 16; ++i) {
            if(this.moveableList[i] != null) this.moveableList[i].down(i);
        }*///标记已经合并的并且挪出空位
        for(var i = 0; i < 4; ++i) {  //列
            for(var j = i; j < 16; j += 4) {   //每列中每个
                if(this.moveableList[j] == null)  continue;
               // var hasHole = [false, false, false, false];
                var hasMerge = [false, false, false, false];
                var targetIndex = j;
                var isMerge = false;
                for(var k = j - 4; k >= 0; k -= 4) {    //计算目标
                    if(this.positionList[k].number == 0) { 
                        hasBeenMove = true;
                        targetIndex = k; 
                        //hasHole[Math.floor(j/4)] = true; 
                        //this.positionList[k].number = this.positionList[j].number; 
                        //this.positionList[j].number = 0;  
                        continue; 
                    }
                   // else if(hasHole[Math.floor(k/4)] == true) { targetIndex = k; hasHole[Math.floor(j/4)] = true; continue; }
                    else if((this.positionList[k].number == this.positionList[j].number) && (hasMerge[Math.floor(k/4)] == false)) { 
                        hasBeenMove = true;
                        targetIndex = k;  
                       // hasHole[Math.floor(j/4)] = true; 
                        hasMerge[Math.floor(k/4)] = true; 
                        this.moveableList[j].getComponent(require("Square")).toDestroyed = true;
                        //this.moveableList[k].getComponent(require("Square")).toDouble = true;
                        isMerge = true;
                        //this.positionList[j].number = 0;
                        //this.positionList[k].number *= 2;
                        break; 
                    }
                    else break;   
                }
                //console.log(i+ " " +j +"targetIndex "+targetIndex);
                this.moveableList[j].getComponent(require("Square")).tempTarget = targetIndex;
                var temp = this.positionList[j].number;
                this.positionList[j].number = 0;
                this.positionList[targetIndex].number = temp;
                if(isMerge == true) this.positionList[targetIndex].number *= 2;
            }
        }

        for(var i = 4; i < 16; ++i) {
            if(this.moveableList[i] != null)  this.moveableList[i].getComponent(require("Square")).move(this);   
        }  //物理移动（逻辑上还没移动），移动后下标为source，target为目标
        for(var i = 0; i < 16; ++i) {
            if((this.moveableList[i] != null) && (this.moveableList[i].getComponent(require("Square")).toDestroyed == true)) {  
                this.moveableList[i].getComponent(cc.Animation).play("2048Fade"); this.moveableList[i] = null; 
            }
        }    //删除多余卡片 
        
        var tempList = new Array(); 
        for(var j = 0; j < 16; ++j) tempList[j] = this.moveableList[j]; 
        //for(var j = 0; j < 16; ++j)console.log("TempList"+j+" : "+tempList[j]);
        //for(var j = 0; j < 16; ++j)console.Log
        for(var j = 0; j < 16; ++j) this.moveableList[j] = null; 
        for(var i = 0; i < 16; ++i) {
            if(tempList[i] != null) {
                //console.log("TYpe"+typeof(tempList[i].getComponent(require("Square")).tempTarget));
                this.moveableList[tempList[i].getComponent(require("Square")).tempTarget] = tempList[i];
             }
        }   //moveableList复位
        //for(var j = 0; j < 16; ++j)console.log("mList(aftertemp)"+j+" : "+this.moveableList[j]);
        for(var i = 0; i < 16; ++i) {
            /*if(this.moveableList[i] == null) this.positionList[i].number = 0;
            else if(this.moveableList[i].getComponent(require("Square")).toDouble == true) {
                this.moveableList[i].getComponent(require("Square")).number *= 2; 
                this.positionList[i].number = this.moveableList[i].getComponent(require("Square")).number;
                this.moveableList[i].getComponent(require("Square")).toDouble = false;
            }else  this.positionList[i].number = this.moveableList[i].getComponent(require("Square")).number;*/
            if(this.moveableList[i] != null) this.moveableList[i].getComponent(require("Square")).number = this.positionList[i].number; 
        }   //维护positionList
        return hasBeenMove;
    },
    /*onKeyDown (event) {
        // set a flag when key pressed
        if(this.timeOut == false) return;  //屏蔽输入
        switch(event.keyCode) {
            case cc.KEY.s:
                if(this.moveDown() == false) return;
                this.timeOut = false;
                this.scheduleOnce(function() {this.timeOut = true;this.randomCreate();console.log("sca");},0.5);
                //for(var i = 0; i < 16; ++i) console.log(this.moveableList[i]);
                break;
        }
    },*/
    moveUp() {
        var hasBeenMove = false;
        for(var i = 12; i < 16; ++i) {  //列
            for(var j = i; j >= 0; j -= 4) {   //每列中每个
                if(this.moveableList[j] == null)  continue;
                var hasMerge = [false, false, false, false];
                var targetIndex = j;
                var isMerge = false;
                for(var k = j + 4; k < 16; k += 4) {    //计算目标
                    if(this.positionList[k].number == 0) { 
                        hasBeenMove = true;
                        targetIndex = k; 
                        continue; 
                    }
                    else if((this.positionList[k].number == this.positionList[j].number) && (hasMerge[Math.floor(k/4)] == false)) { 
                        hasBeenMove = true;
                        targetIndex = k;  
                        hasMerge[Math.floor(k/4)] = true; 
                        this.moveableList[j].getComponent(require("Square")).toDestroyed = true;
                        isMerge = true;
                        break; 
                    }
                    else break;   
                }
                this.moveableList[j].getComponent(require("Square")).tempTarget = targetIndex;
                var temp = this.positionList[j].number;
                this.positionList[j].number = 0;
                this.positionList[targetIndex].number = temp;
                if(isMerge == true) this.positionList[targetIndex].number *= 2;
            }
        }

        for(var i = 0; i < 16; ++i) {
            if(this.moveableList[i] != null)  this.moveableList[i].getComponent(require("Square")).move(this);   
        }  //物理移动（逻辑上还没移动），移动后下标为source，target为目标
        for(var i = 0; i < 16; ++i) {
            if((this.moveableList[i] != null) && (this.moveableList[i].getComponent(require("Square")).toDestroyed == true))   {  
                this.moveableList[i].getComponent(cc.Animation).play("2048Fade"); 
                this.moveableList[i] = null;  
            }
        }    //删除多余卡片 
        
        var tempList = new Array(); 
        for(var j = 0; j < 16; ++j) tempList[j] = this.moveableList[j]; 
        for(var j = 0; j < 16; ++j) this.moveableList[j] = null; 
        for(var i = 0; i < 16; ++i) {
            if(tempList[i]!=null) {
                //console.log("TYpe"+typeof(tempList[i].getComponent(require("Square")).tempTarget));
                this.moveableList[tempList[i].getComponent(require("Square")).tempTarget] = tempList[i];
           }
        }   //moveableList复位
        for(var i = 0; i < 16; ++i) {
            if(this.moveableList[i] != null) this.moveableList[i].getComponent(require("Square")).number = this.positionList[i].number; 
        }   //维护positionList
        return hasBeenMove;
    },
    moveLeft() {
        var hasBeenMove = false;
        for(var i = 0; i <= 12 ; i += 4) {  //列
            for(var j = i; j < i + 4; ++j) {   //每列中每个
                if(this.moveableList[j] == null)  continue;
                var hasMerge = [false, false, false, false];
                var targetIndex = j;
                var isMerge = false;
                for(var k = j - 1; k >= i; --k) {    //计算目标
                    if(this.positionList[k].number == 0) { 
                        hasBeenMove = true;
                        targetIndex = k; 
                        continue; 
                    }
                    else if((this.positionList[k].number == this.positionList[j].number) && (hasMerge[Math.floor(k/4)] == false)) { 
                        hasBeenMove = true;
                        targetIndex = k;  
                        hasMerge[Math.floor(k/4)] = true; 
                        this.moveableList[j].getComponent(require("Square")).toDestroyed = true;
                        isMerge = true;
                        break; 
                    }
                    else break;   
                }
                this.moveableList[j].getComponent(require("Square")).tempTarget = targetIndex;
                var temp = this.positionList[j].number;
                this.positionList[j].number = 0;
                this.positionList[targetIndex].number = temp;
                if(isMerge == true) this.positionList[targetIndex].number *= 2;
            }
        }

        for(var i = 0; i < 16; ++i) {
            if(this.moveableList[i] != null)  this.moveableList[i].getComponent(require("Square")).move(this);   
        }  //物理移动（逻辑上还没移动），移动后下标为source，target为目标
        for(var i = 0; i < 16; ++i) {
            if((this.moveableList[i] != null) && (this.moveableList[i].getComponent(require("Square")).toDestroyed == true)) {  
                this.moveableList[i].getComponent(cc.Animation).play("2048Fade"); 
                this.moveableList[i] = null; 
            }
        }    //删除多余卡片 
        
        var tempList = new Array(); 
        for(var j = 0; j < 16; ++j) tempList[j] = this.moveableList[j]; 
        for(var j = 0; j < 16; ++j) this.moveableList[j] = null; 
        for(var i = 0; i < 16; ++i) {
            if(tempList[i]!=null) {
                //console.log("TYpe"+typeof(tempList[i].getComponent(require("Square")).tempTarget));
                this.moveableList[tempList[i].getComponent(require("Square")).tempTarget] = tempList[i]; 
        }
        }   //moveableList复位
        for(var i = 0; i < 16; ++i) {
            if(this.moveableList[i] != null) this.moveableList[i].getComponent(require("Square")).number = this.positionList[i].number; 
        }   //维护positionList
        return hasBeenMove;
    },
    moveRight() {
        var hasBeenMove = false;
        for(var i = 3; i <= 15; i += 4) {  //列
            for(var j = i; j > i - 4; --j) {   //每列中每个
                if(this.moveableList[j] == null)  continue;
                var hasMerge = [false, false, false, false];
                var targetIndex = j;
                var isMerge = false;
                for(var k = j + 1; k <= i; ++k) {    //计算目标
                    if(this.positionList[k].number == 0) { 
                        hasBeenMove = true;
                        targetIndex = k; 
                        continue; 
                    }
                    else if((this.positionList[k].number == this.positionList[j].number) && (hasMerge[Math.floor(k/4)] == false)) { 
                        hasBeenMove = true;
                        targetIndex = k;  
                        hasMerge[Math.floor(k/4)] = true; 
                        this.moveableList[j].getComponent(require("Square")).toDestroyed = true;
                        isMerge = true;
                        break; 
                    }
                    else break;   
                }
                this.moveableList[j].getComponent(require("Square")).tempTarget = targetIndex;
                var temp = this.positionList[j].number;
                this.positionList[j].number = 0;
                this.positionList[targetIndex].number = temp;
                if(isMerge == true) this.positionList[targetIndex].number *= 2;
            }
        }

        for(var i = 0; i < 16; ++i) {
            if(this.moveableList[i] != null)  this.moveableList[i].getComponent(require("Square")).move(this);   
        }  //物理移动（逻辑上还没移动），移动后下标为source，target为目标
        for(var i = 0; i < 16; ++i) {
            if((this.moveableList[i] != null) && (this.moveableList[i].getComponent(require("Square")).toDestroyed == true)) {  
                this.moveableList[i].getComponent(cc.Animation).play("2048Fade"); 
                this.moveableList[i] = null;
             }
        }    //删除多余卡片 
        
        var tempList = new Array(); 
        for(var j = 0; j < 16; ++j) tempList[j] = this.moveableList[j]; 
        for(var j = 0; j < 16; ++j) this.moveableList[j] = null; 
        for(var i = 0; i < 16; ++i) {
            if(tempList[i]!=null) {
                //console.log("TYpe"+typeof(tempList[i].getComponent(require("Square")).tempTarget));
                this.moveableList[tempList[i].getComponent(require("Square")).tempTarget] = tempList[i]; 
            }
        }   //moveableList复位
        for(var i = 0; i < 16; ++i) {
            if(this.moveableList[i] != null) this.moveableList[i].getComponent(require("Square")).number = this.positionList[i].number; 
        }   //维护positionList
        return hasBeenMove;
    },
    onKeyDown (event) {
        // set a flag when key pressed
        if(this.timeOut == false) return;  //屏蔽输入
        switch(event.keyCode) {
            case cc.KEY.s:
                if(this.moveDown() == false) return;
                this.timeOut = false;this.stepCount += 1;
                this.scheduleOnce(function() {this.timeOut = true;this.randomCreate();console.log("sca");},0.3);
                //for(var i = 0; i < 16; ++i) console.log(this.moveableList[i]);
                break;
            case cc.KEY.w:
                if(this.moveUp() == false) return;
                this.timeOut = false;this.stepCount += 1;
                this.scheduleOnce(function() {this.timeOut = true;this.randomCreate();console.log("sca");},0.3);
                break;  
            case cc.KEY.d:
                if(this.moveRight() == false) return;
                this.timeOut = false;this.stepCount += 1;
                this.scheduleOnce(function() {this.timeOut = true;this.randomCreate();console.log("sca");},0.3);
                break;
            case cc.KEY.a:
                if(this.moveLeft() == false) return;
                this.timeOut = false;this.stepCount += 1;
                this.scheduleOnce(function() {this.timeOut = true;this.randomCreate();console.log("sca");},0.3);
                break;  
            default:
                break;  
        }
    },
    onSlide (direction) {    //1下 2上 3右 4左
        // set a flag when key pressed
        if(this.timeOut == false) return false;  //屏蔽输入
        switch(direction) {
            case "down":
                if(this.moveDown() == false) return false;
                this.timeOut = false;this.stepCount += 1;
                this.scheduleOnce(function() { this.timeOut = true;this.randomCreate();},0.3);
                //for(var i = 0; i < 16; ++i) console.log(this.moveableList[i]);
                break;
            case "up":
                if(this.moveUp() == false) return false;
                this.timeOut = false;this.stepCount += 1;
                this.scheduleOnce(function() { this.timeOut = true;this.randomCreate();},0.3);
                break;  
            case "right":
                if(this.moveRight() == false) return false;
                this.timeOut = false;this.stepCount += 1; 
                this.scheduleOnce(function() {this.timeOut = true; this.randomCreate();},0.3);
                break;
            case "left":
                if(this.moveLeft() == false) return false;
                this.timeOut = false;this.stepCount += 1; 
                this.scheduleOnce(function() {this.timeOut = true;this.randomCreate();},0.3);
                break;  
            default:
                break;  
        } return true;
    },
    checkAlive() {
        //var isAlive = false;
        for(var i = 0; i < 16; ++i) {
            if((i % 4 == 3)) continue;
            if((this.positionList[i+1] != undefined) && (this.positionList[i+1].number == this.positionList[i].number)) return true;
            //if((this.positionList[i-1] != undefined) && (this.positionList[i-1].number == this.positionList[i].number)) return true;
            //if((this.positionList[i-4] != undefined) && (this.positionList[i-4].number == this.positionList[i].number)) return true;
            if((this.positionList[i+4] != undefined) && (this.positionList[i+4].number == this.positionList[i].number)) return true;
        } 
        for(var i = 3; i <= 11; i+=4) if(this.positionList[i].number == this.positionList[i+4].number) return true;
        return false;
    },

    destroyIndex(index) {
        this.positionList[index].number = 0;
        this.moveableList[index].destroy();
        this.moveableList[index] = null;
    }
    /*eat(source, target, newNode) {
        this.moveableList[target].destroy();
        this.moveableList[target] = this.moveableList[source];
        this.moveableList[source] = null;

        this.eatableList[target] = false;

        this.positionList[source].number = 0;
        this.positionList[target].number *= 2;
        
    },*/

    /*gameOver() {
        
    }*/

    // update (dt) {},
});

module.exports = Game;
