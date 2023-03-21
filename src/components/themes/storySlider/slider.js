import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dataUpdate, loopUpdateDataVideo } from '../../../utils';
import { FILE_PATH, FILE_PATHWAY } from '../../../constants'
import { getDataNextSteps, preRenderDataUpdateToParent } from '../../../actions/themeActions';
import PopupData from '../../popup';
import '../../../scss/theme/storyslider.scss';
import { convertHtmlStringToRender } from '../customFunction';
import moment from 'moment';
import Iframe from 'react-iframe';
import ReactPlayer from 'react-player/youtube';



const SampleNextArrow = (props) => {
    const { onClick, hasMoreData, loader } = props;

    if (onClick == null && hasMoreData && !loader.isShowMoreLoader) props.onUpdateData()
    return (
        <div
            className={`arrowRight`}
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
                        transform="translate(-7.995 -5.039)" fill="#ffffff" />
                </svg>
            }
        </div>
    );
}

const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className={`arrowLeft`}
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

class StorySliderExtend extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            hideContent: true,
            popupStatus: true,
            imageIndex: 0
        };
    }

    componentDidMount() {
        let hostUrl = window.location.origin
        let appUrl = `https://app.tagembed.com`
        // if (window.location.search === '?wix' || hostUrl === appUrl || window.location.search.match('view') && window.location.search.match('view')[0] === 'view') {
        //     this.setState({ popupStatus: true });
        // }
        // if (window.location.search === '?wix' || window.location.href.includes("")  || hostUrl === appUrl) {
        //     this.setState({ popupStatus: true });
        // }

        if (window.location.href.includes("viewURL"))
        { this.setState({ popupStatus: false })}
       

        const { onUpdateHeight } = this.props;
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
        const { wall } = this.props;
        this.setState({ setModalShow: false });
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
        this.setState({ postHeight: width })
        hotspotImg.setAttribute("width", `${width}`)
        hotspotImg.setAttribute("height", `${height}`)
        if (event.target.clientHeight && event.target.clientWidth && hotspot) {
            const width = event.target.clientWidth;
            const height = event.target.clientHeight;
            if (width && height) hotspot.setAttribute("style", `height:${height}px;width:${width}px`)
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



    render() {
        const { wall, postData, loader, completeDataObject, wallId } = this.props;
        const { imageIndex } = this.state;
        $('.slick-center.slick-cloned video').removeAttr("autoplay");
        // new added
        $('.slick-slide.slick-cloned video').removeAttr("src");
        // end 
        $('.slick-slide.slick-cloned iframe').removeAttr("src");
        $('.slick-center.slick-cloned iframe').removeAttr("src");
        // $('.slick-slide.slick-center.slick-cloned iframe').removeAttr("src");
        window.onload = (event) => {
            $('.slick-slide.slick-center.slick-cloned iframe').removeAttr("src");
          };

       



        const settings = {
            centerPadding: 0,
            centerMode: true,
            //autoplay: wall.Personalization.autoSlide === 1 ? true : wall.Personalization.autoSlide,
            pauseOnHover: true,
            //autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
            className: "center",
            infinite: postData.postData.length <= 2 ? false : true,
            slidesToShow: postData.postData.length <= 5 ? 3 : 5,
            slidesToScroll: 1,

            // for scroll on mobile
            swipeToSlide: true,
            draggable: true,
            touchMove: true,

            nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData}
                loader={loader} />,
            prevArrow: <SamplePrevArrow classNameCustom={'tb_mo_slider_pre_arrow'} />,
            beforeChange: (current, next) => this.setState({ imageIndex: next }),
             afterChange: (current,next) => this.setState({imageIndex:current}),
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        //autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        centerMode: true,
                        pauseOnHover: true,
                        slidesToShow: postData.postData.length <= 5 ? 3 : 5,
                        slidesToScroll: 1,
                        //autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        infinite: postData.postData.length <= 2 ? false : true,


                    }
                },
                {
                    breakpoint: 1300,
                    settings: {
                        //autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        centerMode: true,
                        pauseOnHover: true,
                        //autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: postData.postData.length <= 2 ? false : true,


                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        centerMode: false,
                        //autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        pauseOnHover: true,
                        //autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        slidesToScroll: 1,
                        infinite: postData.postData.length <= 2 ? false : true,
                        slidesToShow: 1,
                        // for scroll on mobile
                        swipeToSlide: true,
                        draggable: true,
                        touchMove: true,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        centerMode: false,
                        //autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        pauseOnHover: true,
                        //autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        slidesToScroll: 1,
                        infinite: postData.postData.length <= 2 ? false : true,
                        slidesToShow: 1,
                        // for scroll on mobile
                        swipeToSlide: true,
                        draggable: true,
                        touchMove: true,

                    }
                }
            ]

        };
        return <div style={{ display: 'block' }}>
            <Slider ref={c => (this.slider = c)} {...settings}>{
                !loader.webFilterLoader && postData && postData.postData && postData.postData.length && postData.postData.map((itemData, index) => {

                    let item = completeDataObject[itemData];
                    let onErrorImg = `https://ui-avatars.com/api/?name=${item.author.username}&background=112333&color=fff&rounded=true`

                    return <div id={`postId${item.id}`} key={index} className="slider"
                        style={{
                            borderRadius: 10,
                        }}>
                        <div className="postAuthorStory postAuthporofilePic"
                            style={{ bottom: ((item.cta || item.socialAction) && item.type === 1) ? '30px' : '' }}>
                            <div className={`authorInfo font${wall.ThemeRule.font}`} style={{
                                display: item.instaHash == 0 ? 'none' : '',
                                marginTop: item.postAuthor == 0 ? 0 : ''
                            }}>
                                <img style={{
                                    display: item.postAuthor == 0 ? 'none' : '',
                                    borderColor: wall.ThemeRule.cardColor
                                }} src={item.author.picture} alt=""
                                    className={`${(item.network.id !== 4) ? 'roundedCircle' : 'shadowNone'}`}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = (item.author.errorPic) ? item.author.errorPic : onErrorImg;
                                    }} />
                            </div>
                            <div className="clearfix"></div>

                        </div>
                        {item.file != null && item.file !== "" ?
                            <div className='Image' style={{ borderRadius: 10 }}>

                                {item.type === 1 ? <div className={"postImg completeLazyLoad"} style={{
                                    backgroundImage: `url(${item.file})`,
                                    transition: `all 0s ease-in-out 2s`,
                                    display: ''
                                }}>
                                </div> : (item.type === 3 || item.type === 5) && (index === imageIndex) ? <div className="postImg postVideo" style={{
                                    position: "relative", backgroundColor: 'coral',
                                    background: `url(${item.file})`
                                }}>
                                    {
                                        item.network.id === 7 ?
                                            // <Iframe
                                            //     src={`${item.mediaUrl}&controls=1`}
                                            //     // playsinline= "1"
                                            //     playing
                                            //     loop
                                            //     controls
                                            //     allow="autoplay; encrypted-media"
                                            //     styles={{ maxHeight: '100%' }}
                                            //     className="videoMax" />
                                            <ReactPlayer
                                                className='ReactPlayer'
                                                loop={false}
                                                controls={true}
                                                playing
                                                // light={true}
                                                width={"100%"}
                                                height={"inherit"}
                                                playsinline={true}
                                                url={`${item.mediaUrl}`}
                                            />
                                            :
                                            item.network.id === 8 ? 
                                            <Iframe
                                                src={`${item.mediaUrl}&controls=1`}
                                                 playsinline= "1"
                                                playing
                                                loop
                                                controls
                                                //allow="autoplay; encrypted-media"
                                                style={{ maxHeight: '100%' }}
                                                className="videoMax" />
                                                :

                                            <video
                                                id="video"
                                                className="videoMax100"
                                                autoPlay
                                                controls
                                                controlsList="nofullscreen"
                                                // given for tiktok and instagram reels
                                                // muted
                                                preload="none"
                                                src={`${item.mediaUrl}`}
                                                poster={`${item.file}`}
                                                style={{
                                                    maxHeight: '100%',
                                                    borderRadius: 10,
                                                }}
                                                data-network={item.network.id}
                                                data-item-id={item.id}
                                                data-feed-id={item.feedId}
                                                data-wall-id={wallId}
                                                data-plan-id={wall.UserDetail.planId}
                                                onError={(e) => {
                                                    if (e.target.src !== 'https://cdn.tagembed.com/app/image/blur-img.jpg') {
                                                        loopUpdateDataVideo(e)
                                                    }
                                                }}
                                            />


                                    }
                                     {item.cta ? convertHtmlStringToRender(item.cta) : null}   
                                </div> : <div className="postImg">
                                    <img id={`hotspot${item.id}`}
                                        style={{
                                            borderRadius: 10,
                                            height: "100%",
                                            width: '100%'
                                        }}
                                        className="tb_hs_slider_post_img"
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
                                     {item.cta ? convertHtmlStringToRender(item.cta) : null}   
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
                                    {item.network.id === 7 ? <img style={{ display: 'inline-block' }}
                                        src="https://cdn.tagembed.com/app/img/youtube.png"
                                        alt="" /> :
                                        <img style={{ display: 'inline-block', height: "60px" }}
                                            src={`${FILE_PATH}img/play.svg`} alt="" />}
                                </div> : null}
                            </div> : (item.type == 3 || item.type == 5) && !item.file ?
                                <div className="tb_post_vid_ico" style={{ backgroundImage:`url(${FILE_PATHWAY}img/blank.jpg)` }}>
                                    <div className="videoIcon">
                                        {item.network.id === 7 ?
                                            <img style={{ display: 'inline-block' }} src="https://cdn.tagembed.com/app/img/youtube.png" alt="" />
                                            :
                                            <img style={{ display: 'inline-block' }} src={`${FILE_PATH}img/play.svg`}
                                                alt="" />

                                        }
                                    </div>
                                </div>
                                : null
                        }

                        {(item.type === 3 || item.type === 5) ? <div className="postCardContent"
                            style={{ paddingBottom: (item.cta && item.type === 1) ? '178px' : '' }}>

                         
                            <div className="postNetwork" data-network={item.network.name}
                                data-network-color={item.network.color}>
                                <i className={`fa ${(item.network.id === 7) ? 'fa-youtube-play' : item.network.icon}`}
                                    style={{ color: item.iconColor }}>
                                </i>
                            </div>


                            <div className="postAuthorStory"
                                style={{ bottom: ((item.cta || item.socialAction) && item.type === 1) ? '30px' : '' }}>
                                <div className={`authorInfo font${wall.ThemeRule.font}`} style={{
                                    display: item.instaHash == 0 ? 'none' : '',
                                    marginTop: item.postAuthor == 0 ? 0 : ''
                                }}>
                                    <div className="postAuthorName font-weight-bold" style={{
                                        display: item.postAuthor == 0 ? 'none' : '',
                                        color: wall.ThemeRule.authorColor
                                    }}>
                                        {item.author.name}
                                    </div>
                                    <div className="authrHandleTime">
                                        <span className="authrHandle" style={{
                                            display: item.postAuthor == 0 ? 'none' : '',
                                            color: wall.ThemeRule.authorColor
                                        }} target="_blank">
                                            @{item.author.username}
                                        </span>
                                        <div className="sepratedot"
                                            style={{
                                                display: item.postAuthor == 0 || item.timePost == 0 ? 'none' : '',
                                                color: wall.ThemeRule.authorColor
                                            }}
                                        ></div>
                                        <span className="timePost"
                                            style={{
                                                display: item.timePost == 0 ? 'none' : '',
                                                color: wall.ThemeRule.authorColor
                                            }}

                                            data-livestamp={item.createdAt}>
                                            {moment(new Date(item.createdAt * 1000)).fromNow()}
                                        </span>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                              
                            </div>

                        </div>
                            :
                            <div className="postCardContent postImageContent"
                                style={{ paddingBottom: (item.cta && item.type === 1) ? '178px' : '' }}>

                              
                                <div className="postNetwork" data-network={item.network.name}
                                    data-network-color={item.network.color}>
                                    <i className={`fa ${(item.network.id === 7) ? 'fa-youtube-play' : item.network.icon}`}
                                        style={{ color: item.iconColor }}>
                                    </i>
                                </div>


                                <div className="postAuthorStory"
                                    style={{ bottom: ((item.cta || item.socialAction) && item.type === 1) ? '30px' : '' }}>
                                    <div className={`authorInfo font${wall.ThemeRule.font}`} style={{
                                        display: item.instaHash == 0 ? 'none' : '',
                                        marginTop: item.postAuthor == 0 ? 0 : ''
                                    }}>
                                        <div className="postAuthorName font-weight-bold" style={{
                                            display: item.postAuthor == 0 ? 'none' : '',
                                            color: wall.ThemeRule.authorColor
                                        }}>
                                            {item.author.name}
                                        </div>
                                        <div className="authrHandleTime">
                                            <span className="authrHandle" style={{
                                                display: item.postAuthor == 0 ? 'none' : '',
                                                color: wall.ThemeRule.authorColor
                                            }} target="_blank">
                                                @{item.author.username}
                                            </span>
                                            <div className="sepratedot"
                                                style={{
                                                    display: item.postAuthor == 0 || item.timePost == 0 ? 'none' : '',
                                                    color: wall.ThemeRule.authorColor
                                                }}
                                            ></div>
                                            <span className="timePost"
                                                style={{
                                                    display: item.timePost == 0 ? 'none' : '',
                                                    color: wall.ThemeRule.authorColor
                                                }}

                                                data-livestamp={item.createdAt}>
                                                {moment(new Date(item.createdAt * 1000)).fromNow()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                       
                                </div>

                            </div>}

                    </div>
                })
            }
            </Slider>
            {
                this.state.setModalShow &&
                <PopupData
                    wall={wall}
                    show={this.state.setModalShow}
                    onHide={this.handleCloseModal}
                    data={(this.state.dataPopup) ? this.state.dataPopup : null}
                />
            }
        </div>
    }

}

const mapStateToProps = state => {
    const { wallId, wall, postData, loader } = state
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
export default connect(mapStateToProps, mapDispatchToProps)(StorySliderExtend);