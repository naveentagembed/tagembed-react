// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import {dataUpdate} from '../../../utils'
// import {FILE_PATH} from '../../../constants'
// import {getDataNextSteps, preRenderDataUpdateToParent} from '../../../actions/themeActions'
// import PopupData from '../../popup';
// import '../../../scss/theme/sliderCarousel.scss'
// import {convertHtmlStringToRender} from '../customFunction'
// import { browserName, isMobile } from "react-device-detect";


// const SampleNextArrow = (props) => {
//     const {classNameCustom, onClick, hasMoreData, loader} = props;

//     if (onClick == null && hasMoreData && !loader.isShowMoreLoader) props.onUpdateData()
//     return (
//         <div
//             className={`${onClick == null && hasMoreData && !loader.isShowMoreLoader ? 'tb_mo_slider_next_arrow-loader' : 'tb_mo_slider_next_arrow-next'} ${classNameCustom}`}
//             onClick={onClick}
//         >
//             {(onClick == null && hasMoreData && !loader.isShowMoreLoader) ?
//                 <svg width='26px' height='26px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
//                      preserveAspectRatio="xMidYMid" class="uil-ring-alt">
//                     <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
//                     <circle cx="50" cy="50" r="40" stroke="#afafb7" fill="none" stroke-width="10"
//                             stroke-linecap="round"></circle>
//                     <circle cx="50" cy="50" r="40" stroke="#000000" fill="none" stroke-width="6" stroke-linecap="round">
//                         <animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" from="0"
//                                  to="502"></animate>
//                         <animate attributeName="stroke-dasharray" dur="2s" repeatCount="indefinite"
//                                  values="150.6 100.4;1 250;150.6 100.4"></animate>
//                     </circle>
//                 </svg>
//                 :
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 11.71 20.448">
//                     <path id="Path_5609" data-name="Path 5609"
//                           d="M9.464,25.487a1.463,1.463,0,0,1-1.039-2.5l7.753-7.74L8.425,7.5A1.469,1.469,0,0,1,10.5,5.426l8.777,8.78a1.463,1.463,0,0,1,0,2.063L10.5,25.048a1.462,1.462,0,0,1-1.039.439Z"
//                           transform="translate(-7.995 -5.039)" fill="#ffffff"/>
//                 </svg>
//             }
//         </div>
//     );
// }

// const SamplePrevArrow = (props) => {
//     const {classNameCustom, onClick} = props;
//     return (
//         <div className={`${classNameCustom}`}
//              onClick={onClick}
//         >
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 11.71 20.448">
//                 <path id="Path_5609" data-name="Path 5609"
//                       d="M18.238,25.487a1.463,1.463,0,0,0,1.039-2.5l-7.755-7.74L19.277,7.5A1.469,1.469,0,0,0,17.2,5.426L8.42,14.206a1.463,1.463,0,0,0,0,2.063L17.2,25.048a1.463,1.463,0,0,0,1.039.439Z"
//                       transform="translate(-7.994 -4.996)" fill="#ffffff"></path>
//             </svg>
//         </div>
//     );
// }

// class SliderCarouselExtend extends Component {
//     constructor(props) {
//         super(props);
//         this.myRef = React.createRef();
//         this.state = {
//             windowWidth: document.getElementById('root').clientWidth - `${browserName == "Firefox" ? 18 : 6}`,
//             hideContent: true,
//             popupStatus: true,
//         };
//     }

//     componentDidMount() {
//         let hostUrl = window.location.origin
//         let appUrl = `https://app.tagembed.com`
//         if (window.location.search === '?wix' || hostUrl === appUrl || window.location.search.match('view') && window.location.search.match('view')[0] === 'view') {
//             this.setState({popupStatus: false});
//         }
//         const {onUpdateHeight} = this.props;
//         var getData = document.querySelector("#eThemePosts");
//         if (getData && window.wallId) {
//             onUpdateHeight(getData.clientHeight)
//         }
//         window.addEventListener("message", this.onEventReceived);
//         this.slider.slickPause();
//         setTimeout(() => {
//             this.play()
//         }, 5000);
//     }

//     play() {
//         if (this.props.wall.Personalization.autoSlide === 1) {
//             this.slider.slickPlay();
//         } else this.pause()
//     }

//     handleCloseModal = () => {
//         const {wall} = this.props;
//         this.setState({setModalShow: false});
//         if (wall.Personalization.autoSlide == 1) {
//             this.play()
//         }
//     }

//     onLoadHotSpotData = (item) => event => {
//         const HOT_ID = `#hotspot-section${item.id}`;
//         const IMG_ID = `#hotspot${item.id}`;
//         let hotspot = document.querySelector(HOT_ID);
//         let hotspotImg = document.querySelector(IMG_ID);
//         const width = event.target.clientWidth;
//         const height = event.target.clientHeight;
//         hotspotImg.setAttribute("width", `${width}`)
//         hotspotImg.setAttribute("height", `${height}`)
//         if (event.target.clientHeight && event.target.clientWidth && hotspot) {
//             const width = event.target.clientWidth;
//             const height = event.target.clientHeight;
//             if (width && height) hotspot.setAttribute("style", `height:${height}px;width:${width}px`)
//         }
//     }

//     onLoadTagembedPopup = (itemIndex, item) => event => {
//         const {wall, appendData, postData, languageSetting, completeDataObject} = this.props;
//         this.pause()
//         if (wall.Personalization.mobilePopup === 1) window.open(item.link, '_blank')
//         else {
//             if (appendData.heightEvent != null && wall.Personalization.postFeatured === 1) {
//                 var obj = {
//                     type: 'showPopUp',
//                     data: {
//                         card: item,
//                         idArray: postData.postData.map(item => completeDataObject[item]),
//                         index: itemIndex,
//                         viewOnText: languageSetting.viewOnText,
//                         shareText: languageSetting.shareText,
//                         personalization: wall.Personalization,
//                         themeRule:wall.ThemeRule,
//                         iframeID: this.props.startEmbed.heightEvent.data.id
//                     },
//                 }
//                 appendData.heightEvent.source.postMessage(obj, appendData.heightEvent.origin);
//             }
//         }
//     }

//     handleOpenModal = (itemIndex, item) => event => {
//         const {wall, postData, languageSetting, completeDataObject} = this.props;
//         this.pause()
//         if (wall.Personalization.mobilePopup === 1) {
//             window.open(item.link, '_blank')
//         } else {
//             if (wall.Personalization.postFeatured === 1) {
//                 let dataPopup = {
//                     card: item,
//                     idArray: postData.postData.map(item => completeDataObject[item]),
//                     index: itemIndex,
//                     viewOnText: languageSetting.viewOnText,
//                     shareText: languageSetting.shareText,
//                     personalization: wall.Personalization,
//                     themeRule:wall.ThemeRule,
//                     onClose: 'this.slider.slickPlay()'
//                 }
//                 this.setState({setModalShow: true, dataPopup: dataPopup});
//             }
//         }
//     }

//     pause() {
//         this.slider.slickPause();
//     }

//     onEventReceived = event => {
//         if (event.data.type === "playSlick") {
//             this.play()
//         }
//     }

//     // shouldComponentUpdate(nextProps, nextState){
//     //     if(nextProps.value !== this.props.value) {return true;}
//     //     else{
//     //         return false;
//     //     }
//     // }

//     render() {
//         const {wall, postData, loader, completeDataObject, wallId} = this.props;
//         const {popupStatus, windowWidth, themeOpacity} = this.state;
//         let postheight = (windowWidth) / (wall.Personalization.columnCount ? wall.Personalization.columnCount : 6)
//         let mobheight = (windowWidth) / (wall.Personalization.columnCountMobile === 0 ? 1 : 2)
        
//         const settings = {
//             autoplay: wall.Personalization.autoSlide === 1 ? true : wall.Personalization.autoSlide,
//             pauseOnHover: true,
//             autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
//             className: "center",
//             rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,

//             //infinite: postData.postData.length <= 5 ? false : true,
//             //infinite : postData.postData.length <= 5 || wall.Personalization.columnCount === 0  || wall.Personalization.rowCount === 2 ? false : true,
            
//             infinite: (wall.Personalization.columnCount === 0 || wall.Personalization.columnCount === 5) ? postData.postData.length <= 5 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 10 ? false : true : wall.Personalization.columnCount === 4 ? postData.postData.length <= 4 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 8 ? false : true : wall.Personalization.columnCount === 3 ? postData.postData.length <= 3 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 6 ? false : true : wall.Personalization.columnCount === 2 ? postData.postData.length <= 2 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 4 ? false : true : wall.Personalization.rowCount === 2 && postData.postData.length <= 2 ? false : true,
             
//             // slidesToShow: wall.Personalization.columnCount > 0  && wall.Personalization.rowCount > 0 ? wall.Personalization.columnCount && wall.Personalization.rowCount : 6,
//              slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 6,



//             swipeToSlide: true,
//             slidesToScroll: wall.Personalization.columnCount > 0 && wall.Personalization.rowCount >= 1 ? wall.Personalization.columnCount  : 2,
            


//             nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData}
//                                         loader={loader}/>,
//             prevArrow: <SamplePrevArrow classNameCustom={'tb_mo_slider_pre_arrow'}/>,
//             // afterChange: (current) => {
//             //     if (parseInt(current) + 1 === parseInt(postData.postData.length) - 4) this.onUpdateData()
//             // },
            
//             responsive: [
//                 {
                    
//                     breakpoint: 1400,
//                     settings: {
//                         autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
//                         pauseOnHover: true,
//                         rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,
//                         slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 6,

//                         //slidesToScroll: wall.Personalization.columnCount > 0 && wall.Personalization.rowCount > 1 ? wall.Personalization.columnCount && wall.Personalization.rowCount : 2,
//                         slidesToScroll: wall.Personalization.columnCount > 0 && wall.Personalization.rowCount >= 1 ? wall.Personalization.columnCount  : 2,

//                         autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,

//                         infinite: (wall.Personalization.columnCount === 0 || wall.Personalization.columnCount === 5) ? postData.postData.length <= 5 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 10 ? false : true : wall.Personalization.columnCount === 4 ? postData.postData.length <= 4 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 8 ? false : true : wall.Personalization.columnCount === 3 ? postData.postData.length <= 3 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 6 ? false : true : wall.Personalization.columnCount === 2 ? postData.postData.length <= 2 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 4 ? false : true : wall.Personalization.rowCount === 2 && postData.postData.length <= 2 ? false : true,

//                         nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData} />,
//                         prevArrow: <SamplePrevArrow classNameCustom={'tb_mo_slider_pre_arrow'}/>,
//                         // afterChange: (current) => {
//                         //     if (parseInt(current) + 1 === parseInt(postData.postData.length) - 4) this.onUpdateData()
//                         // },
//                     }
//                 },
               
//                 {
//                     breakpoint: 1300,
//                     settings: {
//                         autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
//                         pauseOnHover: true,
//                         rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,
//                         slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 6,

//                         slidesToScroll: wall.Personalization.columnCount > 0 && wall.Personalization.rowCount >= 1 ? wall.Personalization.columnCount  : 2,

//                         autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,

//                         infinite: (wall.Personalization.columnCount === 0 || wall.Personalization.columnCount === 5) ? postData.postData.length <= 5 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 10 ? false : true : wall.Personalization.columnCount === 4 ? postData.postData.length <= 4 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 8 ? false : true : wall.Personalization.columnCount === 3 ? postData.postData.length <= 3 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 6 ? false : true : wall.Personalization.columnCount === 2 ? postData.postData.length <= 2 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 4 ? false : true : wall.Personalization.rowCount === 2 && postData.postData.length <= 2 ? false : true,
//                         nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData} />,
//                         prevArrow: <SamplePrevArrow  classNameCustom={'tb_mo_slider_pre_arrow'}/>,
//                         // afterChange: (current) => {
//                         //     if (parseInt(current) + 1 === parseInt(postData.postData.length) - 4) this.onUpdateData()
//                         // },
//                     }
//                 },
//                 {
//                     breakpoint: 1024,
//                     settings: {
//                         autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
//                         pauseOnHover: true,
//                         rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,
//                         autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
//                         slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 6,
                        
//                         slidesToScroll: wall.Personalization.columnCount > 0 && wall.Personalization.rowCount >= 1 ? wall.Personalization.columnCount  : 2,

//                         infinite: (wall.Personalization.columnCount === 0 || wall.Personalization.columnCount === 5) ? postData.postData.length <= 5 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 10 ? false : true : wall.Personalization.columnCount === 4 ? postData.postData.length <= 4 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 8 ? false : true : wall.Personalization.columnCount === 3 ? postData.postData.length <= 3 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 6 ? false : true : wall.Personalization.columnCount === 2 ? postData.postData.length <= 2 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 4 ? false : true : wall.Personalization.rowCount === 2 && postData.postData.length <= 2 ? false : true,
//                         nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData} />,
//                         prevArrow: <SamplePrevArrow classNameCustom={'tb_mo_slider_pre_arrow'} />,
//                         // afterChange: (current) => {
//                         //     if (parseInt(current) + 1 === parseInt(postData.postData.length) - 3) this.onUpdateData()
//                         // },
//                     }
//                 },
//                 {
//                     breakpoint: 700,
//                     settings: {
//                         autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
//                         pauseOnHover: true,
//                         rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,

//                         autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,

//                         slidesToShow: wall.Personalization.columnCountMobile === 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 2 : wall.Personalization.columnCountMobile),

//                         slidesToScroll: wall.Personalization.columnCountMobile > 0 && wall.Personalization.rowCount > 1 ? wall.Personalization.columnCountMobile : 1,

                        

//                         //initialSlide: 2,

//                         //infinite : postData.postData.length <= 5 || wall.Personalization.columnCountMobile === 0  || wall.Personalization.rowCount === 2 ? false : true, 

//                         infinite: (wall.Personalization.columnCountMobile === 0 || wall.Personalization.columnCountMobile === 5) ? postData.postData.length <= 5 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 10 ? false : true : wall.Personalization.columnCountMobile === 4 ? postData.postData.length <= 4 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 8 ? false : true : wall.Personalization.columnCountMobile === 3 ? postData.postData.length <= 3 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 6 ? false : true : wall.Personalization.columnCountMobile === 2 ? postData.postData.length <= 2 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 4 ? false : true : wall.Personalization.rowCount === 2 && postData.postData.length <= 2 ? false : true,

//                         nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData} />,
//                         prevArrow: <SamplePrevArrow classNameCustom={'tb_mo_slider_pre_arrow'} />,
//                         // afterChange: (current) => {
//                         //     if (parseInt(current) + 1 === parseInt(postData.postData.length) - 2) this.onUpdateData()
//                         // },
//                     }
//                 },
//                 {
//                     breakpoint: 480,
//                     settings: {
//                         autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
//                         pauseOnHover: true,

//                         rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,

//                         autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,

//                         slidesToShow: wall.Personalization.columnCountMobile === 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 1 : wall.Personalization.columnCountMobile),

//                         slidesToScroll: wall.Personalization.columnCountMobile > 0 && wall.Personalization.rowCount > 1 ? wall.Personalization.columnCountMobile : 1,

                       

//                         //infinite : postData.postData.length <= 5 || wall.Personalization.columnCountMobile === 0  || wall.Personalization.rowCount === 2 ? false : true, 

//                         infinite: (wall.Personalization.columnCountMobile === 0 || wall.Personalization.columnCountMobile === 5) ? postData.postData.length <= 5 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 10 ? false : true : wall.Personalization.columnCountMobile === 4 ? postData.postData.length <= 4 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 8 ? false : true : wall.Personalization.columnCountMobile === 3 ? postData.postData.length <= 3 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 6 ? false : true : wall.Personalization.columnCountMobile === 2 ? postData.postData.length <= 2 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 4 ? false : true : wall.Personalization.rowCount === 2 && postData.postData.length <= 2 ? false : true,

//                         nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData} />,
//                         prevArrow: <SamplePrevArrow  classNameCustom={'tb_mo_slider_pre_arrow'}/>,
//                         // afterChange: (current) => {
//                         //     if (parseInt(current) + 1 === parseInt(postData.postData.length) - 2) this.onUpdateData()
//                         // },
//                     }
//                 }
//             ]
//         };

//         {
//             // NEW CODE START

//             setTimeout(() => {
//                 let dataUpdateImage = document.querySelectorAll("img[data-is-optmized='0']");
//                 if (dataUpdateImage && dataUpdateImage.length > 0) {
//                     dataUpdateImage.forEach((item) => {
//                         item.setAttribute("src", item.getAttribute("data-src"))
//                         item.setAttribute("data-is-optmized", "1")
//                     })
//                 }
//             }, 100)

//             // NEW CODE END

//         }

      
//         return <div>
//             <Slider ref={c => (this.slider = c)} {...settings}>{
//                 !loader.webFilterLoader && postData && 
//                 (wall.Personalization.rowCount > 1 && postData.postData.length !== 1 && postData.postData.length % 2 !== 0 ? postData.postData.pop() :  postData.postData) 
//                  && postData.postData.length && postData.postData.map((itemData, index) => {

//                      // NEW CODE START
//                      if (index == (postData.length - 1)) {
//                         if (themeOpacity == 0) setTimeout(() => this.setState({ themeOpacity: 1 }), 100)
//                     }
                   
//                     if (postData && ((postData.length - 1) == index)) {
//                         setTimeout(() => {
//                             let dataUpdateImage = document.querySelectorAll("img[data-is-optmized='0']");
                           
//                             if (dataUpdateImage && dataUpdateImage.length > 0) {
//                                 dataUpdateImage.forEach((item) => {
//                                     item.setAttribute("src", item.getAttribute("data-src"))
//                                     item.setAttribute("data-is-optmized", "0")
//                                 })
//                             }
//                         }, 500)
                       
//                     }
//                  // NEW CODE END


//                     let item = completeDataObject[itemData];
//                     


//                     return <div className='rowBlock' onClick={(popupStatus) ? this.onLoadTagembedPopup(index, item) : this.handleOpenModal(index, item)}>
//                         <div id={`postId${item.id}`} key={index} className="tb-mo_slider-item flatThemeCard"
//                              onLoad={(e) => {
//                                  if (e.target.clientWidth && e.target.clientWidth < 180) {
//                                      let updateTarget = document.querySelector(`#postId${item.id}`);
//                                      if (updateTarget) {
//                                          //updateTarget.classList.add(`tb_hotspot_small__`)
//                                      }
//                                      document.body.classList.add('tb_hotspot_small__');
//                                  }
//                              }} style={{
//                             borderRadius: wall.ThemeRule.edgeCurve == 1 ? 15 : null,
//                             padding:"1px",
//                             height: (isMobile) ? mobheight : postheight , 
//                             //minHeight:200
//                         }}>
//                             {item.file != null && item.file !== "" ?
//                                 <div className='Image' style={{borderRadius: wall.ThemeRule.edgeCurve == 1 ? 15 : null}}>

//                                     {item.type === 1 ? <div className={"postImg completeLazyLoad"} style={{
//                                         backgroundImage: `url(${item.file})`,
//                                         transition: `all 0s ease-in-out 2s`,
//                                         display: ''
//                                     }}>
//                                     </div> : item.type == 3 || item.type == 5 ? <div className="postImg" style={{position:"relative"}}>
//                                         <img id={`hotspot${item.id}`}
//                                              style={{
//                                                  borderRadius: wall.ThemeRule.edgeCurve == 1 ? 15 : null,
//                                                  height: (isMobile) ? mobheight : postheight,
//                                                  width: '100%',
//                                                  transition: 'opacity 0.25s ease-in 0.5s'
//                                              }}
//                                              className="tb_hs_slider_post_img"
//                                              data-src={item.file}
//                                              src={`https://cdn.tagembed.com/website/assets/media/transparent.gif`}
//                                              data-is-optmized="0"
//                                              onLoad={this.onLoadHotSpotData(item)}
//                                              data-network={item.network.id}
//                                              data-wall-id={wallId}
//                                              data-load="0"
//                                              data-item-id={item.id}
//                                              data-plan-id={wall.UserDetail.planId}
//                                              onError={(e) => {
//                                                  dataUpdate(e)
//                                              }}
//                                              ref={this.myRef}
//                                              alt=""
//                                         />
//                                          <img className="postVideoIcon" src="https://cdn.tagembed.com/common/images/feeds/video-icon.png" alt=""/>
//                                     </div> : <div className="postImg">
//                                         <img id={`hotspot${item.id}`}
//                                              style={{
//                                                  borderRadius: wall.ThemeRule.edgeCurve == 1 ? 15 : null,
//                                                  height:(isMobile) ? mobheight : postheight,
//                                                  width: '100%',
//                                                  transition: 'opacity 0.25s ease-in 0.5s'
//                                              }}
//                                              className="tb_hs_slider_post_img"
//                                              data-src={item.file}
//                                              src={`https://cdn.tagembed.com/website/assets/media/transparent.gif`}
//                                              data-is-optmized="0"
//                                              onLoad={this.onLoadHotSpotData(item)}
//                                              data-network={item.network.id}
//                                              data-wall-id={wallId}
//                                              data-load="0"
//                                              data-item-id={item.id}
//                                              data-plan-id={wall.UserDetail.planId}
//                                              onError={(e) => {
//                                                  dataUpdate(e)
//                                              }}
//                                              ref={this.myRef}
//                                              alt=""
//                                         />
//                                     </div>
//                                     }
//                                     {(item.embed || item.spotifyUserType) ? <div className="videoIcon" style={{
//                                         position: 'absolute',
//                                         left: 0,
//                                         right: 0,
//                                         top: '50%',
//                                         textAlign: 'center',
//                                         transform: 'translateY(-50%)'
//                                     }}>
//                                         {item.network.id === 7 ? <img style={{display: 'inline-block'}}
//                                                                       src="https://app.tagembed.com/widget/img/youtube.png"
//                                                                       alt=""/> :
//                                             <img style={{display: 'inline-block', height: "60px"}}
//                                                  src={`${FILE_PATH}img/play.svg`} alt=""/>}
//                                     </div> : null}
//                                 </div> : (item.type == 3 || item.type == 5) && !item.file ?
//                                     <div className="tb_post_vid_ico" style={{backgroundImage: 'url(img/blank.jpg)'}}>
//                                         <div className="videoIcon">
//                                             {item.network.id === 7 ?
//                                                 <img style={{display: 'inline-block'}} src="img/youtube.png" alt=""/>
//                                                 : <img style={{display: 'inline-block'}} src={`${FILE_PATH}img/play.svg`}
//                                                        alt=""/>}
//                                         </div>
//                                     </div>
//                                     : null
//                             }
//                             <div className="postNetwork" data-network={item.network.name}
//                                  data-network-color={item.network.color}>
//                                 <i className={`fa ${(item.network.id === 7) ? 'fa-youtube-play' : item.network.icon}`}
//                                    style={{color: item.iconColor}}>

//                                 </i>
//                             </div>

//                             <div className="postCardContent"
//                                  style={{borderRadius: wall.ThemeRule.edgeCurve == 1 ? 15 : null}}>
//                                 <div className="sliderCta" onClick={e => e.stopPropagation()}>
//                                     {item.cta ? convertHtmlStringToRender(item.cta) : null}
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 })
//             }
//             </Slider>
//             {
//                 this.state.setModalShow &&
//                 <PopupData
//                     wall={wall}
//                     show={this.state.setModalShow}
//                     onHide={this.handleCloseModal}
//                     data={(this.state.dataPopup) ? this.state.dataPopup : null}
//                 />
//             }
//         </div>
//     }

// }

// const mapStateToProps = state => {
//     const {wallId, wall, postData, loader} = state
//     return {
//         startEmbed: state.startEmbed,
//         wallId: wallId.wallID,
//         wall: wall.wallData,
//         languageSetting: state.languageSetting,
//         appendData: postData.appendData,
//         loader: loader,
//         postData: postData,
//         completeDataObject: postData.completeDataObject,
//         networkId: postData.appendData.networkID,
//         hasMoreData: state.postData.hasMoreData[0] ? state.postData.hasMoreData[0].hasMoreData === false ? false : state.postData.hasMoreData[state.postData.appendData.networkID] ? state.postData.hasMoreData[state.postData.appendData.networkID].hasMoreData : true : true
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         getDataNextSteps: (wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInStateNow) => dispatch(getDataNextSteps(wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInStateNow)),
//         preRenderDataUpdateToParent: (postData) => dispatch(preRenderDataUpdateToParent(postData))
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(SliderCarouselExtend);









import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {dataUpdate} from '../../../utils'
import {FILE_PATH, FILE_PATHWAY} from '../../../constants'
import {getDataNextSteps, preRenderDataUpdateToParent} from '../../../actions/themeActions'
import PopupData from '../../popup';
import '../../../scss/theme/sliderCarousel.scss'
import {convertHtmlStringToRender} from '../customFunction'


const SampleNextArrow = (props) => {
    const {classNameCustom, onClick, hasMoreData, loader} = props;

    if (onClick == null && hasMoreData && !loader.isShowMoreLoader) props.onUpdateData()
    return (
        <div
            className={`${onClick == null && hasMoreData && !loader.isShowMoreLoader ? 'tb_mo_slider_next_arrow-loader' : 'tb_mo_slider_next_arrow-next'} ${classNameCustom}`}
            onClick={onClick}
        >
            {(onClick == null && hasMoreData && !loader.isShowMoreLoader) ?
                <svg width='26px' height='26px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                     preserveAspectRatio="xMidYMid" class="uil-ring-alt">
                    <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
                    <circle cx="50" cy="50" r="40" stroke="#afafb7" fill="none" stroke-width="10"
                            stroke-linecap="round"></circle>
                    <circle cx="50" cy="50" r="40" stroke="#000000" fill="none" stroke-width="6" stroke-linecap="round">
                        <animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" from="0"
                                 to="502"></animate>
                        <animate attributeName="stroke-dasharray" dur="2s" repeatCount="indefinite"
                                 values="150.6 100.4;1 250;150.6 100.4"></animate>
                    </circle>
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 11.71 20.448">
                    <path id="Path_5609" data-name="Path 5609"
                          d="M9.464,25.487a1.463,1.463,0,0,1-1.039-2.5l7.753-7.74L8.425,7.5A1.469,1.469,0,0,1,10.5,5.426l8.777,8.78a1.463,1.463,0,0,1,0,2.063L10.5,25.048a1.462,1.462,0,0,1-1.039.439Z"
                          transform="translate(-7.995 -5.039)" fill="#ffffff"/>
                </svg>
            }
        </div>
    );
}

const SamplePrevArrow = (props) => {
    const {classNameCustom, onClick} = props;
    return (
        <div className={`${classNameCustom}`}
             onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 11.71 20.448">
                <path id="Path_5609" data-name="Path 5609"
                      d="M18.238,25.487a1.463,1.463,0,0,0,1.039-2.5l-7.755-7.74L19.277,7.5A1.469,1.469,0,0,0,17.2,5.426L8.42,14.206a1.463,1.463,0,0,0,0,2.063L17.2,25.048a1.463,1.463,0,0,0,1.039.439Z"
                      transform="translate(-7.994 -4.996)" fill="#ffffff"></path>
            </svg>
        </div>
    );
}

class SliderCarouselExtend extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            hideContent: true,
            popupStatus: true,
            postHeight: 0,
        };
    }

    componentDidMount() {
        let hostUrl = window.location.origin
        let appUrl = `https://app.tagembed.com`
        // if (window.location.search === '?wix' || hostUrl === appUrl || window.location.search.match('view') && window.location.search.match('view')[0] === 'view') {
        //     this.setState({popupStatus: false});
        // }
        // if (window.location.search === '?wix' || window.location.href.includes("")  || hostUrl === appUrl) {
        //     this.setState({ popupStatus: false });
        // }

        const { appendData } = this.props;
        if (window.location.href.includes("viewURL") && appendData.heightEvent != null) this.setState({ popupStatus: true })
        else this.setState({ popupStatus: false });

        const {onUpdateHeight} = this.props;
        var getData = document.querySelector("#eThemePosts");
        if (getData && window.wallId) {
            onUpdateHeight(getData.clientHeight)
        }
        window.addEventListener("message", this.onEventReceived);
        this.slider.slickPause();
        setTimeout(() => {
            this.play()
        }, 5000);
    }

    play() {
        if (this.props.wall.Personalization.autoSlide === 1) {
            this.slider.slickPlay();
        } else this.pause()
    }

    handleCloseModal = () => {
        const {wall} = this.props;
        this.setState({setModalShow: false});
        if (wall.Personalization.autoSlide == 1) {
            this.play()
        }
    }

    onLoadHotSpotData = (item) => event => {
        const HOT_ID = `#hotspot-section${item.id}`;
        const IMG_ID = `#hotspot${item.id}`;
        let hotspot = document.querySelector(HOT_ID);
        let hotspotImg = document.querySelector(IMG_ID);
        const width = event.target.clientWidth;
        const height = event.target.clientHeight;
        this.setState({postHeight: width})
        hotspotImg.setAttribute("width", `${width}`)
        hotspotImg.setAttribute("height", `${height}`)
        if (event.target.clientHeight && event.target.clientWidth && hotspot) {
            const width = event.target.clientWidth;
            const height = event.target.clientHeight;
            if (width && height) hotspot.setAttribute("style", `height:${height}px;width:${width}px`)
        }
    }

    onLoadTagembedPopup = (itemIndex, item) => event => {
        const {wall, appendData, postData, languageSetting, completeDataObject} = this.props;
        this.pause()
        if (wall.Personalization.mobilePopup === 1) window.open(item.link, '_blank')
        else {
            if (appendData.heightEvent != null && wall.Personalization.postFeatured === 1) {
                var obj = {
                    type: 'showPopUp',
                    data: {
                        card: item,
                        idArray: postData.postData.map(item => completeDataObject[item]),
                        index: itemIndex,
                        viewOnText: languageSetting.viewOnText,
                        shareText: languageSetting.shareText,
                        personalization: wall.Personalization,
                        themeRule:wall.ThemeRule,
                        userDetail: wall.UserDetail,
                        wall: wall.Wall, 
                        iframeID: this.props.startEmbed.heightEvent.data.id
                    },
                }
                appendData.heightEvent.source.postMessage(obj, appendData.heightEvent.origin);
                axios.post(
                    "https://web.tagembed.com/app/api/postClick",
                     {wallId: wall.Wall.id, userId: wall.Wall.owner, feedId: item.feedId, postId: item.id}
                ).then(result => {
                    // Work here with the result
                    //console.log(result.data);
                    // res.send(result.data);
                }).catch(error => {
                    if (error.response) {
                        // If server responded with a status code for a request
                        // console.log("Data", error.response.data);
                        // console.log("Status", error.response.status);
                        // console.log("Headers", error.response.headers);
                    } else if (error.request) {
                        // Client made a request but response is not received
                        // console.log("<<<<<<<Response Not Received>>>>>>>>");
                        // console.log(error.request);
                    } else {
                        // Other case
                        // console.log("Error", error.message);
                    }
                    
                });
            }
        }
    }

    handleOpenModal = (itemIndex, item) => event => {
        const {wall, postData, languageSetting, completeDataObject} = this.props;
        this.pause()
        if (wall.Personalization.mobilePopup === 1) {
            window.open(item.link, '_blank')
        } else {
            if (wall.Personalization.postFeatured === 1) {
                let dataPopup = {
                    card: item,
                    idArray: postData.postData.map(item => completeDataObject[item]),
                    index: itemIndex,
                    viewOnText: languageSetting.viewOnText,
                    shareText: languageSetting.shareText,
                    personalization: wall.Personalization,
                    themeRule:wall.ThemeRule,
                    userDetail: wall.UserDetail,
                    wall: wall.Wall, 
                    onClose: 'this.slider.slickPlay()'
                }
                this.setState({setModalShow: true, dataPopup: dataPopup});

                axios.post(
                    "https://web.tagembed.com/app/api/postClick",
                    {wallId: wall.Wall.id, userId: wall.Wall.owner, feedId : item.feedId, postId: item.id}
                    ).then(result => {
                    // Work here with the result
                    //console.log(result.data);
                    //this.setState({data: result.data})
                    // res.send(result.data);
                }).catch(error => {
                    if (error.response) {
                        // If server responded with a status code for a request
                        // console.log("Data", error.response.data);
                        // console.log("Status", error.response.status);
                        // console.log("Headers", error.response.headers);
                    } else if (error.request) {
                        // Client made a request but response is not received
                        // console.log("<<<<<<<Response Not Received>>>>>>>>");
                        // console.log(error.request);
                    } else {
                        // Other case
                        // console.log("Error", error.message);
                    }
                    
                });
            }
        }
    }

    pause() {
        this.slider.slickPause();
    }

    onEventReceived = event => {
        if (event.data.type === "playSlick") {
            this.play()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        return prevProps.postData.postData !== this.props.postData.postData;
    }

    render() {
        const {wall, postData, loader, completeDataObject, wallId, imageList} = this.props;
        const {popupStatus, postHeight, themeOpacity} = this.state;
        const settings = {
            autoplay: wall.Personalization.autoSlide === 1 ? true : wall.Personalization.autoSlide,
            pauseOnHover: true,
            autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
            className: "center",
            //infinite: postData.postData.length <= 5 ? false : true,
            //slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 6,
            swipeToSlide: true,
            //slidesToScroll: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 3,
            nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData}
                                        loader={loader}/>,
            prevArrow: <SamplePrevArrow classNameCustom={'tb_mo_slider_pre_arrow'}/>,
            rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,
            infinite: (wall.Personalization.columnCount === 0 || wall.Personalization.columnCount === 5) ? postData.postData.length <= 5 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 10 ? false : true : wall.Personalization.columnCount === 4 ? postData.postData.length <= 4 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 8 ? false : true : wall.Personalization.columnCount === 3 ? postData.postData.length <= 3 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 6 ? false : true : wall.Personalization.columnCount === 2 ? postData.postData.length <= 2 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 4 ? false : true : wall.Personalization.rowCount === 2 && postData.postData.length <= 2 ? false : true,
            slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 6,
            slidesToScroll: wall.Personalization.columnCount > 0 && wall.Personalization.rowCount >= 1 ? wall.Personalization.columnCount  : 2,

            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        // autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        // pauseOnHover: true,
                        // slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 5,
                        // slidesToScroll: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 3,
                        // autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        // infinite: postData.postData.length < 5 ? false : true,
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        pauseOnHover: true,
                        rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,
                        slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 4,

                        //slidesToScroll: wall.Personalization.columnCount > 0 && wall.Personalization.rowCount > 1 ? wall.Personalization.columnCount && wall.Personalization.rowCount : 2,
                        slidesToScroll: wall.Personalization.columnCount > 0 && wall.Personalization.rowCount >= 1 ? wall.Personalization.columnCount  : 2,

                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,

                        infinite: (wall.Personalization.columnCount === 0 || wall.Personalization.columnCount === 5) ? postData.postData.length <= 5 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 10 ? false : true : wall.Personalization.columnCount === 4 ? postData.postData.length <= 4 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 8 ? false : true : wall.Personalization.columnCount === 3 ? postData.postData.length <= 3 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 6 ? false : true : wall.Personalization.columnCount === 2 ? postData.postData.length <= 2 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 4 ? false : true : wall.Personalization.rowCount === 2 && postData.postData.length <= 2 ? false : true,

                        nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData} />,
                        prevArrow: <SamplePrevArrow classNameCustom={'tb_mo_slider_pre_arrow'}/>,
                        // afterChange: (current) => {
                        //     if (parseInt(current) + 1 === parseInt(postData.postData.length) - 4) this.onUpdateData()
                        // },
                    }
                },
                {
                    breakpoint: 1300,
                    settings: {
                        // autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        // pauseOnHover: true,
                        // slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 4,
                        // slidesToScroll: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 2,
                        // autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        // infinite: postData.postData.length < 5 ? false : true,
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        pauseOnHover: true,
                        rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,
                        slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 4,

                        slidesToScroll: wall.Personalization.columnCount > 0 && wall.Personalization.rowCount >= 1 ? wall.Personalization.columnCount  : 2,

                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,

                        infinite: (wall.Personalization.columnCount === 0 || wall.Personalization.columnCount === 5) ? postData.postData.length <= 5 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 10 ? false : true : wall.Personalization.columnCount === 4 ? postData.postData.length <= 4 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 8 ? false : true : wall.Personalization.columnCount === 3 ? postData.postData.length <= 3 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 6 ? false : true : wall.Personalization.columnCount === 2 ? postData.postData.length <= 2 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 4 ? false : true : wall.Personalization.rowCount === 2 && postData.postData.length <= 2 ? false : true,
                        nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData} />,
                        prevArrow: <SamplePrevArrow  classNameCustom={'tb_mo_slider_pre_arrow'}/>,
                        // afterChange: (current) => {
                        //     if (parseInt(current) + 1 === parseInt(postData.postData.length) - 4) this.onUpdateData()
                        // },
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        // autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        // pauseOnHover: true,
                        // autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        // slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 3,
                        // slidesToScroll: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 1,
                        // infinite: postData.postData.length < 5 ? false : true
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        pauseOnHover: true,
                        rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,
                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 4,
                        
                        slidesToScroll: wall.Personalization.columnCount > 0 && wall.Personalization.rowCount >= 1 ? wall.Personalization.columnCount  : 2,

                        infinite: (wall.Personalization.columnCount === 0 || wall.Personalization.columnCount === 5) ? postData.postData.length <= 5 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 10 ? false : true : wall.Personalization.columnCount === 4 ? postData.postData.length <= 4 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 8 ? false : true : wall.Personalization.columnCount === 3 ? postData.postData.length <= 3 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 6 ? false : true : wall.Personalization.columnCount === 2 ? postData.postData.length <= 2 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 4 ? false : true : wall.Personalization.rowCount === 2 && postData.postData.length <= 2 ? false : true,
                        nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData} />,
                        prevArrow: <SamplePrevArrow classNameCustom={'tb_mo_slider_pre_arrow'} />,
                        // afterChange: (current) => {
                        //     if (parseInt(current) + 1 === parseInt(postData.postData.length) - 3) this.onUpdateData()
                        // },
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        // autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        // pauseOnHover: true,
                        // autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        // slidesToShow: wall.Personalization.columnCountMobile === 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 2 : wall.Personalization.columnCountMobile),
                        // slidesToScroll: wall.Personalization.columnCountMobile > 0 ? wall.Personalization.columnCountMobile : 2,
                        // initialSlide: 2,
                        // infinite: postData.postData.length < 5 ? false : true,
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        pauseOnHover: true,
                        rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,

                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,

                        slidesToShow: wall.Personalization.columnCountMobile === 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 2 : wall.Personalization.columnCountMobile),

                        slidesToScroll: wall.Personalization.columnCountMobile > 0 && wall.Personalization.rowCount > 1 ? wall.Personalization.columnCountMobile : 1,

                        

                        //initialSlide: 2,

                        //infinite : postData.postData.length <= 5 || wall.Personalization.columnCountMobile === 0  || wall.Personalization.rowCount === 2 ? false : true, 

                        infinite: (wall.Personalization.columnCountMobile === 0 || wall.Personalization.columnCountMobile === 5) ? postData.postData.length <= 5 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 10 ? false : true : wall.Personalization.columnCountMobile === 4 ? postData.postData.length <= 4 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 8 ? false : true : wall.Personalization.columnCountMobile === 3 ? postData.postData.length <= 3 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 6 ? false : true : wall.Personalization.columnCountMobile === 2 ? postData.postData.length <= 2 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 4 ? false : true : wall.Personalization.rowCount === 2 && postData.postData.length <= 2 ? false : true,

                        nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData} />,
                        prevArrow: <SamplePrevArrow classNameCustom={'tb_mo_slider_pre_arrow'} />,
                        // afterChange: (current) => {
                        //     if (parseInt(current) + 1 === parseInt(postData.postData.length) - 2) this.onUpdateData()
                        // },
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        // autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        // pauseOnHover: true,
                        // autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        // slidesToShow: wall.Personalization.columnCountMobile === 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 1 : wall.Personalization.columnCountMobile),
                        // slidesToScroll: wall.Personalization.columnCountMobile > 0 ? wall.Personalization.columnCountMobile : 1,
                        // infinite: postData.postData.length < 5 ? false : true,
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        pauseOnHover: true,

                        rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,

                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,

                        slidesToShow: wall.Personalization.columnCountMobile === 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 1 : wall.Personalization.columnCountMobile),

                        slidesToScroll: wall.Personalization.columnCountMobile > 0 && wall.Personalization.rowCount > 1 ? wall.Personalization.columnCountMobile : 1,

                       

                        //infinite : postData.postData.length <= 5 || wall.Personalization.columnCountMobile === 0  || wall.Personalization.rowCount === 2 ? false : true, 

                        infinite: (wall.Personalization.columnCountMobile === 0 || wall.Personalization.columnCountMobile === 5) ? postData.postData.length <= 5 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 10 ? false : true : wall.Personalization.columnCountMobile === 4 ? postData.postData.length <= 4 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 8 ? false : true : wall.Personalization.columnCountMobile === 3 ? postData.postData.length <= 3 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 6 ? false : true : wall.Personalization.columnCountMobile === 2 ? postData.postData.length <= 2 && (wall.Personalization.rowCount === 0 || wall.Personalization.rowCount === 1) ? false : wall.Personalization.rowCount === 2 && postData.postData.length <= 4 ? false : true : wall.Personalization.rowCount === 2 && postData.postData.length <= 2 ? false : true,

                        nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData} />,
                        prevArrow: <SamplePrevArrow  classNameCustom={'tb_mo_slider_pre_arrow'}/>,
                        // afterChange: (current) => {
                        //     if (parseInt(current) + 1 === parseInt(postData.postData.length) - 2) this.onUpdateData()
                        // },
                    }
                }
            ]
        };

        {
            // NEW CODE START

            // setTimeout(() => {
            //     let dataUpdateImage = document.querySelectorAll("img[data-is-optmized='0']");
            //     if (dataUpdateImage && dataUpdateImage.length > 0) {
            //         dataUpdateImage.forEach((item) => {
            //             item.setAttribute("src", item.getAttribute("data-src"))
            //             item.setAttribute("data-is-optmized", "1")
            //         })
            //     }
            // }, 100)

            // NEW CODE END

        }

        return <div>
            <Slider ref={c => (this.slider = c)} {...settings}>{
               !loader.webFilterLoader && postData && 
               (wall.Personalization.rowCount > 1 && postData.postData.length !== 1 && postData.postData.length % 2 !== 0 ? postData.postData.pop() :  postData.postData) 
                && postData.postData.length && postData.postData.map((itemData, index) => {

                     // NEW CODE START
                    //  if (index == (postData.length - 1)) {
                    //     if (themeOpacity == 0) setTimeout(() => this.setState({ themeOpacity: 1 }), 100)
                    // }
                   
                    // if (postData && ((postData.length - 1) == index)) {
                    //     setTimeout(() => {
                    //         let dataUpdateImage = document.querySelectorAll("img[data-is-optmized='0']");
                           
                    //         if (dataUpdateImage && dataUpdateImage.length > 0) {
                    //             dataUpdateImage.forEach((item) => {
                    //                 item.setAttribute("src", item.getAttribute("data-src"))
                    //                 item.setAttribute("data-is-optmized", "0")
                    //             })
                    //         }
                    //     }, 500)
                       
                    // }
                 // NEW CODE END

                    let item = completeDataObject[itemData];

                    return <div
                        onClick={(popupStatus) ? this.onLoadTagembedPopup(index, item) : this.handleOpenModal(index, item)}>
                        <div id={`postId${item.id}`} key={index} className="tb-mo_slider-item flatThemeCard"
                             onLoad={(e) => {
                                 if (e.target.clientWidth && e.target.clientWidth < 180) {
                                     let updateTarget = document.querySelector(`#postId${item.id}`);
                                     if (updateTarget) {
                                         //updateTarget.classList.add(`tb_hotspot_small__`)
                                     }
                                     document.body.classList.add('tb_hotspot_small__');
                                 }
                             }} style={{
                            borderRadius: wall.ThemeRule.edgeCurve == 1 ? 8 : wall.ThemeRule.cardCurve + 'px',
                            padding:"1px",
                            /* commented due to bug related to hover background color */
                            //height: wall.ThemeRule.aspectRatio === 1 ? '' : postHeight, 
                            cursor: wall.Personalization.mobilePopup === 1 ? 'pointer' : '',
                            //minHeight:200
                        }}>
                            {item.file != null && item.file !== "" ?
                                <div className='Image' style={{borderRadius: wall.ThemeRule.edgeCurve == 1 ? 8 : wall.ThemeRule.cardCurve + 'px'}}>

                                    {item.type === 1 ? <div className={"postImg completeLazyLoad"} style={{
                                        backgroundImage: `url(${item.file})`,
                                        transition: `all 0s ease-in-out 2s`,
                                        display: ''
                                    }}>
                                    </div> : item.type == 3 || item.type == 5 ? <div className="postImg" style={{position:"relative"}}>
                                        <img id={`hotspot${item.id}`}
                                             style={{
                                                 borderRadius: wall.ThemeRule.edgeCurve == 1 ? 8 : wall.ThemeRule.cardCurve + 'px',
                                                 //height: postHeight,
                                                 //height: wall.ThemeRule.aspectRatio === 1 ? '' : postHeight,
                                                 height: (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? postHeight : '',
                                                 width: '100%',
                                                 transition: 'opacity 0.25s ease-in 0.5s',
                                                 //aspectRatio: wall.ThemeRule.aspectRatio === 1 ? wall.ThemeRule.aspectImageRatio : ''
                                                 aspectRatio: (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? '' : wall.ThemeRule.aspectImageRatio 
                                             }}
                                             className="tb_hs_slider_post_img"
                                            //  data-src={item.file}
                                            //  src={`https://cdn.tagembed.com/website/assets/media/transparent.gif`}
                                            //  data-is-optmized="0"
                                            src={item.file}
                                             onLoad={this.onLoadHotSpotData(item)}
                                             data-network={item.network.id}
                                             data-wall-id={wallId}
                                             data-load="0"
                                             data-item-id={item.id}
                                             data-feed-id={item.feedId}
                                             data-plan-id={wall.UserDetail.planId}
                                             onError={(e) => {
                                                 dataUpdate(e)
                                             }}
                                             ref={this.myRef}
                                             alt=""
                                        />
                                         <img className="postVideoIcon" src="https://cdn.tagembed.com/common/images/feeds/video-icon.png" alt=""/>
                                    </div> : <div className="postImg">
                                        <img id={`hotspot${item.id}`}
                                             style={{
                                                 borderRadius: wall.ThemeRule.edgeCurve == 1 ? 8 : wall.ThemeRule.cardCurve + 'px',
                                                 //height: postHeight,
                                                 //height: wall.ThemeRule.aspectRatio === 1 ? '' : postHeight,
                                                 height: (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? postHeight : '',
                                                 width: '100%',
                                                 transition: 'opacity 0.25s ease-in 0.5s',
                                                 //aspectRatio: wall.ThemeRule.aspectRatio === 1 ? wall.ThemeRule.aspectImageRatio : ''
                                                 aspectRatio: (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? '' : wall.ThemeRule.aspectImageRatio
                                             }}
                                             className="tb_hs_slider_post_img"
                                            //  data-src={item.file}
                                            //  src={`https://cdn.tagembed.com/website/assets/media/transparent.gif`}
                                            //  data-is-optmized="0"
                                            src={item.file}
                                             onLoad={this.onLoadHotSpotData(item)}
                                             data-network={item.network.id}
                                             data-wall-id={wallId}
                                             data-load="0"
                                             data-item-id={item.id}
                                             data-feed-id={item.feedId}
                                             data-plan-id={wall.UserDetail.planId}
                                             onError={(e) => {
                                                 dataUpdate(e)
                                             }}
                                             ref={this.myRef}
                                             alt=""
                                        />
                                    </div>
                                    }
                                    {(item.embed || item.spotifyUserType) ? <div className="videoIcon" style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: '50%',
                                        textAlign: 'center',
                                        transform: 'translateY(-50%)'
                                    }}>
                                        {item.network.id === 7 ? <img style={{display: 'inline-block'}}
                                                                      src="https://cdn.tagembed.com/app/img/youtube.png"
                                                                      alt=""/> :
                                            <img style={{display: 'inline-block', height: "60px"}}
                                                 src={`${FILE_PATH}img/play.svg`} alt=""/>}
                                    </div> : null}

                                       {/* -------------carousel icon------------------- */}
                                       {
                                                Object.keys(item.imageList).length > 0 ?
                                                    <div className="multipostIcon">
                                                        <img src={`${FILE_PATHWAY}img/svg-icon/multi-post.svg`} alt="" />
                                                    </div> : null
                                            }

                                </div> : (item.type == 3 || item.type == 5) && !item.file ?
                                    <div className="tb_post_vid_ico"  style={{backgroundImage: `url(${FILE_PATHWAY}img/blank.jpg)`, width: '100%',height: (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? postHeight : '', borderRadius: wall.ThemeRule.edgeCurve == 1 ? 8 : wall.ThemeRule.cardCurve + 'px'}}>
                                        <div className="videoIcon">
                                            {item.network.id === 7 ?
                                                <img style={{display: 'inline-block'}} src="https://cdn.tagembed.com/app/img/youtube.png" alt=""/>
                                                : <img style={{display: 'inline-block'}} src={`${FILE_PATH}img/play.svg`}
                                                       alt=""/>}
                                        </div>
                                    </div>
                                    : null
                            }
                            <div className="postNetwork" data-network={item.network.name}
                                 data-network-color={item.network.color}>
                                <i className={`fa ${(item.network.id === 7) ? 'fa-youtube-play' : item.network.icon}`}
                                   style={{color: item.iconColor}}>

                                </i>
                            </div>

                            <div className="postCardContent"
                                 style={{borderRadius: wall.ThemeRule.edgeCurve == 1 ? 8 : wall.ThemeRule.cardCurve + 'px'}}>
                                <div className="sliderCta" onClick={e => e.stopPropagation()}>
                                    {item.cta ? convertHtmlStringToRender(item.cta) : null}
                                </div>
                            </div>

                        </div>
                    </div>
                })
            }
            </Slider>
            {
                this.state.setModalShow &&
                <PopupData
                    wall={wall}
                    wallId={wallId}
                    show={this.state.setModalShow}
                    onHide={this.handleCloseModal}
                    data={(this.state.dataPopup) ? this.state.dataPopup : null}
                />
            }
        </div>
    }

}

const mapStateToProps = state => {
    const {wallId, wall, postData, loader} = state
    return {
        startEmbed: state.startEmbed,
        wallId: wallId.wallID,
        wall: wall.wallData,
        languageSetting: state.languageSetting,
        appendData: postData.appendData,
        loader: loader,
        postData: postData,
        completeDataObject: postData.completeDataObject,
        networkId: postData.appendData.networkID,
        hasMoreData: state.postData.hasMoreData[0] ? state.postData.hasMoreData[0].hasMoreData === false ? false : state.postData.hasMoreData[state.postData.appendData.networkID] ? state.postData.hasMoreData[state.postData.appendData.networkID].hasMoreData : true : true
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getDataNextSteps: (wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInStateNow) => dispatch(getDataNextSteps(wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInStateNow)),
        preRenderDataUpdateToParent: (postData) => dispatch(preRenderDataUpdateToParent(postData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SliderCarouselExtend);