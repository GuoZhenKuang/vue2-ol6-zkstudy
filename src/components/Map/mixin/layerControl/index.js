/*
 * @Author: 阿匡
 * @Date: 2022-01-17 17:45:14
 * @LastEditTime: 2022-01-17 17:58:13
 * @LastEditors: 阿匡
 * @Description: 控制图层
 * @FilePath: \vue2-ol-zkstudy\src\components\Map\mixin\layerControl\index.js
 * @仅为学习使用
 */
export default {
    data() {
        return {
            
        }
    },
    methods: {
        clear(){
            let _this = this
            if(_this.drawSource){
                _this.drawSource.clear()
            // let drawLayer = _this.ol2dmap.getLayers().getArray().filter(item=>item.getProperties().id=="lineAndArea")[0]
            // _this.ol2dmap.removeLayer(drawLayer)
            }
        }
    },
}