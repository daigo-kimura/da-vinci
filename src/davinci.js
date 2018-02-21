var DavinciLayer = cc.Layer.extend({
  sprite:null,
  ctor:function () {
    this._super();
    var size = cc.winSize;
    var LEVEL = 5;
    var V_PAD = 60; // px
    var H_PAD = 60; // px
    var STONE_R = 16; // px

    var board = {}
    for (var i = 0; i < LEVEL; i++) {
      for (var j = 0; j < i + 1; j++) {
        board[[i, j]] = 1;
      }
    }

    var stones = [];
    for (var i = 0; i < LEVEL; i++) {
      for (var j = 0; j < i + 1; j++) {
        var x = (size.width - i * H_PAD) / 2 + j * V_PAD;
        var y = V_PAD * (i + 1);
        var stone = new cc.DrawNode();

        if (board[[i, j]] == 1) {
          stone.drawDot(cc.p(x, y), STONE_R, cc.color.RED);
        } else {
          stone.drawDot(cc.p(x, y), STONE_R / 2, cc.color.BLUE);
        }
        stones.push(stone)
        this.addChild(stone);
      }
    }
    return true;
  }
});

var DavinciScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var backgroundLayer = new cc.LayerColor(cc.color.WHITE);
    this.addChild(backgroundLayer);
    var davinciLayer= new DavinciLayer();
    this.addChild(davinciLayer);
  }
});
