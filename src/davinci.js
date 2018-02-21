var DavinciLayer = cc.Layer.extend({
  sprite:null,
  ctor:function () {
    this._super();
    var size = cc.winSize;

    this.stone = new cc.DrawNode();
    stone.drawCircle(100, 5);
    var lastElement = node._buffer[node._buffer.length - 1];
    lastElement.isFill = true;
    lastElement.fillColor = cc.color.BLACK; // the fill color
    return true;
  }
});

var DavinciScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    // 背景のレイヤを追加
    var backgroundLayer = new cc.LayerColor(cc.color(170, 202, 222, 255));
    this.addChild(backgroundLayer);
    //DolphinLayerのインスタンスを追加
    var davinciLayer= new DolphinLayer();
    this.addChild(davinciLayer);
  }
});
