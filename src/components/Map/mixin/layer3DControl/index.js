/*
 * @Author: 阿匡
 * @Date: 2022-01-26 14:40:47
 * @LastEditTime: 2022-01-26 16:03:17
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
           const Cesium = this.cesium
           //消除上一次的点位
            this.viewer.entities.removeAll()
            //循环加载新的点位数据
            this.simulatePointData.forEach(pointObj=>{
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
        }
    },
}
