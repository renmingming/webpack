/**
 * Created by Administrator on 2017/2/17 0017.
 */
import Layer from './components/layer/layer.js'
import './css/common.css'

const App = function () {
    var dom = document.getElementById('app');
    var layer = new Layer();
    dom.innerHTML = layer.tpl
}
new App()