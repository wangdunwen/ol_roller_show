// 加载js
window.onload = function () {
  // 初始化地图
  initMap();

  // 绑定卷帘轴监听事件
  bindMoveEvent();
};

/*
* 初始化地图
*/
function initMap() {
  window.olMap = new window.ol.Map({
    target: 'map',
    layers: [
      new window.ol.layer.Tile({
        source: new window.ol.source.TileArcGISRest({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
          wrapX: true,
          tileSize: [256, 256]
        }),
        zIndex: 1
      }),
      new window.ol.layer.Tile({
        source: new window.ol.source.XYZ({
          url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=6',
          wrapX: true,
          tileSize: [256, 256]
        }),
        zIndex: 1
      })
    ],
    view: new window.ol.View({
      center: window.ol.proj.fromLonLat([120.16, 32.71]),
      zoom: 13,
      enableRotation: true
    }),

    pixelRatio: typeof window.devicePixelRatio !== 'undefined' ? window.devicePixelRatio : 1
  });

  // 初始化设置 两张地图 各占一半
  setTimeout(() => {
    updateMapExtent({
      x: window.document.documentElement.clientWidth / 2,
      y: 0
    });
  })
}

/*
* 绑定事件
*/
function bindMoveEvent () {
  window.document.addEventListener('mousemove', function (e) {
    document.getElementById('line').style.left = (e.x - 4) + 'px';
    updateMapExtent({
      x: e.x,
      y: 0
    });
  })
}

/*
* 调用方法更新 地图 范围
*/
function updateMapExtent (windowPostion) {
  // 将屏幕坐标 转换为 地图坐标
  let pos = window.olMap.getCoordinateFromPixel([windowPostion.x, windowPostion.y])

  // 修改第二个地图的范围
  window.olMap.getLayers().getArray()[1].setExtent([0, 0, pos[0], pos[1]])
}
