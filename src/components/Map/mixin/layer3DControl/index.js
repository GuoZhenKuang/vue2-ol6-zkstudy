/*
 * @Author: 阿匡
 * @Date: 2022-01-26 14:40:47
 * @LastEditTime: 2022-01-31 12:12:30
 * @LastEditors: 阿匡
 * @Description: 存放三维数据的方法
 * @FilePath: \vue2-ol-zkstudy\src\components\Map\mixin\layer3DControl\index.js
 * @仅为学习使用
 */


export default {
    data(){
        return{

        }
    },
    methods: {
        /******* 
         * @author: 阿匡
         * @description: 加载模拟点的数据
         * @param {*}
         * @return {*}
         */
        addSimulationPoint(){
          let _this = this
           const Cesium = _this.cesium
           //消除上一次的点位
           _this.viewer.entities.removeAll()
            //循环加载新的点位数据
            _this.simulatePointData.forEach(pointObj=>{
                this.viewer.entities.add({
                  name:pointObj.psName,
                  id:pointObj.id,
                  position:Cesium.Cartesian3.fromDegrees(
                    pointObj.x*1,
                    pointObj.y*1
                  ),
                  //方法一: 这种是自定义点的样式
                  // point:{
                  //   pixelSize:5,//获取或设置数字属性，以像素为单位指定大小。
                  //   color:Cesium.Color.RED,
                  //   outlineColor:Cesium.Color.WHITE,
                  //   outlineWidth:8
                  // }
        
                  //方法二：这种是图标加文字的形式展示
                  label:{
                    text:pointObj.psName,
                    font:'12px monospace',
                    style:Cesium.LabelStyle.FILL_AND_OUTLINE,
                    fillColor: Cesium.Color.LIME,
                    outlineWidth: 4,
                    erticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向以底部来计算标签的位置
                    pixelOffset: new Cesium.Cartesian2(0, -25), // 偏移量
                  },
                  //图标展示
                  billboard:{
                    image:require('@/assets/img/1poiPoint.png'),
                    width:30,
                    height:30
                  }
                })
              })
              //数据定位
              _this.viewer.zoomTo(_this.viewer.entities)
            //监听底图点击事件
            // const handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas)
            // //左侧单机事件
            // handler.setInputAction(click=>{
            //   // console.log("我是左侧点击事件",click)
            //   //屏幕坐标转世界坐标——关键点！！！
            //   const cartesian = _this.viewer.camera.pickEllipsoid(click.position,_this.viewer.scene.globe.ellipsoid)
            //   //将笛卡尔坐标转成地理坐标
            //   const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            //   //将弧度转为度的十进制表示，保留5位小数
            //   const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5)
            //   const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5)
            //   console.log("sssss",cartographic)
            //   console.log("我是经纬度",lon,lat)

            //   //获取地图上的点位实体
            //   //scene.pick--返回具有' primitive'属性的对象，该对象包含场景中的第一个（顶部）基本体在特定的窗口坐标处；如果位置不存在，则为undefined。其他属性可能可能根据图元的类型进行设置，并可用于进一步标识拾取的对象。
            //   const pick = _this.viewer.scene.pick(click.position)
            //   if(pick&&pick.id){
                
                
            //   }else{
            //     //说明没有相应的数据，此时把弹窗进行移出
            //   }
            // },Cesium.ScreenSpaceEventType.LEFT_CLICK)

        },
        addSimulationModel(){
            const Cesium = this.cesium
            //增加实体模型
            const blueBox = {
                name:'blueBox',
                position:Cesium.Cartesian3.fromDegrees(113.27599,23.11705, 50),
                box:{
                    // new Cesium.Cartesian3(长, width, height)
                    dimensions: new Cesium.Cartesian3(40.0, 100.0, 150.0),
                    material: Cesium.Color.BLUE, // 配置颜色
                    // material: Cesium.Color.RED.withAlpha(0.5), // 配置颜色透明度
                    // fill: false, // 配置 是否填满
                    // outline: true, // 配置 是否显示外边框线
                    // outlineColor: Cesium.Color.YELLOW, // 配置 设置外边框线颜色
                }
            }
            this.viewer.entities.add(blueBox)
            this.viewer.zoomTo(this.viewer.entities)
        },
        clearAllEntities(){
          this.viewer.entities.removeAll()
          this.$store.commit('clickAllClear',Math.random())
        }
    },
}
