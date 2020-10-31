import Vue from 'vue';
import constant2 from './../vuex/const2'
import goodStatusall from './good-ui/editAll';
import Radio from './good-ui/Radio';
import goodCheckbox from './good-ui/Radio2';
import goodRadio from './good-ui/Radio3';
import goodBreadcrumb from './good-ui/breadBar/'
import goodTag from './good-ui/tag/'
import goodDialog from './good-ui/modelBox/'
import productCheckResult from "./good-ui/loading2/productCheckResult";
import goodStatus from './good-ui/Status/'
import goodSwitch from './good-ui/Switch/'
import goodBox from './good-ui/table/'
import goodButton from './good-ui/button/'
import goodButton2 from './good-ui/button2/'
import goodTotal from './good-ui/total/'
import goodInput from './good-ui/input/'
import tdsLabel from './good-ui/td/'
import goodPage from './good-ui/page/'
import goodMenu from './good-ui/menu/'
import goodInfo from './good-ui/info/'
import goodLabel from './good-ui/label/'
import goodTextarea from './good-ui/textarea/'
import goodWord from './good-ui/word/'
import goodSearch from './good-ui/search/'
import goodLogo from './good-ui/logo/'
import tdsQueue from './good-ui/queue/'
import goodPagination from './good-ui/pagination/'
import goodTime from './good-ui/time/'
import goodUpload from './good-ui/upload/'
import goodPaper from './good-ui/paper/'
import goodKey from './good-ui/key/'
import goodConfig from './good-ui/config/'

const components = {
	constant2,
	goodStatusall,
	Radio,
	goodCheckbox,
	goodRadio,
	goodBreadcrumb,
	goodTag,
	goodDialog,
	productCheckResult,
	goodStatus,
	goodSwitch,
	goodBox,
	goodButton,
	goodButton2,
	goodTotal,
	goodInput,
	tdsLabel,
	goodPage,
	goodMenu,
	goodInfo,
	goodLabel,
	goodTextarea,
	goodWord,
	goodSearch,
	goodLogo,
	tdsQueue,
	goodPagination,
	goodTime,
	goodUpload,
	goodPaper,
	goodKey,
	goodConfig,
};

Vue.prototype.constant2 = constant2;
Vue.use(components.goodStatusall)
Vue.use(components.Radio)
Vue.use(components.goodCheckbox)
Vue.use(components.goodRadio)
Vue.use(components.goodBreadcrumb)
Vue.use(components.goodTag)
Vue.use(components.goodDialog)
Vue.use(components.productCheckResult)
Vue.use(components.goodStatus)
Vue.use(components.goodSwitch)
Vue.use(components.goodBox)
Vue.use(components.goodButton)
Vue.use(components.goodButton2)
Vue.use(components.goodTotal)
Vue.use(components.goodInput)
Vue.use(components.tdsLabel)
Vue.use(components.goodInput)
Vue.use(components.goodPage)
Vue.use(components.goodMenu)
Vue.use(components.goodInfo)
Vue.use(components.goodLabel)
Vue.use(components.goodTextarea)
Vue.use(components.goodWord)
Vue.use(components.goodSearch)
Vue.use(components.goodLogo)
Vue.use(components.tdsQueue)
Vue.use(components.goodPagination)
Vue.use(components.goodTime)
Vue.use(components.goodUpload)
Vue.use(components.goodPaper)
Vue.use(components.goodKey)
Vue.use(components.goodConfig)


export default components;