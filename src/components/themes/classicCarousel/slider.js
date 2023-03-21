import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from 'moment';
import { convertHtmlStringToRender } from '../../themes/customFunction'
import { getDataNextSteps, preRenderDataUpdateToParent } from '../../../actions/themeActions'
import { CLOUD_URL } from '../../../actions/api'
import { FILE_PATH, FILE_PATHWAY } from '../../../constants'
import ShareActions from '../../cardPost/shareActions'
import PopupData from '../../popup';
import { dataUpdate } from '../../../utils';
import '../../../scss/theme/classicCarousel.scss'
import ContentPostConversion from '../../cardPost/contentPostConversion'
import ShareWrapper from '../../cardPost/themeContentPost/shareWrapper'

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', color: 'rgb(0, 0, 0)' }}
            onClick={onClick}
        />
    );
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', color: 'rgb(0, 0, 0)' }}
            onClick={onClick}
        />
    );
}

class ClassicCarouselTheme extends PureComponent {
    constructor() {
        super();
        this.state = {
            setModalShow: false,
            dataPopup: {},
            popupStatus: true
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    onUpdateData = () => {
        // if(this.props.wall.Personalization.autoScrollStatus == 1 ) { setTimeout(() => this.requestData(), 500) }
    }

    requestData = () => {
        const { appendData, wall, postData, wallId } = this.props;
        const tstamp = Math.floor(Date.now() / 1000);
        let postCount = wall.ThemeRule.numberOfPosts;
        if (appendData.networkID && appendData.networkID != 0) {
            const filteredArr = Object.keys(postData.preRender).filter(item => postData.preRender[item].network.id == appendData.networkID);
            if (filteredArr.length > 0) {
                this.props.preRenderDataUpdateToParent(filteredArr);
            }
            if (filteredArr.length < postCount) {
                this.props.getDataNextSteps(wallId, tstamp, postCount - filteredArr.length, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent, true);
            }
            this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);


        } else {
            if (Object.keys(postData.preRender).length > 0) {
                this.props.preRenderDataUpdateToParent(postData.preRender);
                this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);

            } else {
                this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);
                this.props.preRenderDataUpdateToParent(postData.preRender);
                this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);
            }

        }
    }

    /* To load popup onclick event Start  */
    onLoadTagembedPopup = (itemIndex, item) => event => {
        const { wall, appendData, postData, languageSetting, completeDataObject } = this.props;
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
                        themeRule: wall.ThemeRule,
                        userDetail: wall.UserDetail,
                        wall: wall.Wall,
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
    /* To load popup onclick event End  */

    /* To open the popup modal Start */
    handleOpenModal = (itemIndex, item) => event => {
        const { wall, postData, languageSetting, completeDataObject } = this.props;
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
                    themeRule: wall.ThemeRule,
                    userDetail: wall.UserDetail,
                    wall: wall.Wall,
                }
                this.setState({ setModalShow: true, dataPopup: dataPopup });

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
    /* To open the popup modal End */

    /* To close the popup modal Start */
    handleCloseModal = () => {
        this.setState({ setModalShow: false });
    }

    /* To close the popup modal End */

    componentDidMount() {
        let hostUrl = window.location.origin
        let appUrl = `https://app.tagembed.com`

        // if (window.location.search === '?wix' || hostUrl === appUrl || window.location.search.match('view') && window.location.search.match('view')[0] === 'view') {
        //     this.setState({ popupStatus: false });
        // }
        // if (window.location.search === '?wix' || window.location.href.includes("")  || hostUrl === appUrl) {
        //     this.setState({ popupStatus: false });
        // }
        const { appendData } = this.props;
        if (window.location.href.includes("viewURL") && appendData.heightEvent != null) this.setState({ popupStatus: true })
        else this.setState({ popupStatus: false });

    }

    render() {
        const { wallId, wall, postData, loader, completeDataObject, hasMoreData, network, imageList } = this.props;
        const { popupStatus, themeOpacity } = this.state;
        var settings = {
            autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
            autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
            className: "center",
            infinite: postData.postData.length <= 4 ? false : true,
            slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 4,
            slidesToScroll: 1,
            swipeToSlide: true,
            nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} hasMoreData={hasMoreData} />,
            prevArrow: <SamplePrevArrow />,
            afterChange: (current) => {
                if (parseInt(current) + 1 == parseInt(postData.postData.length) - (window.innerWidth > 2000 ? 5 : 4)) this.onUpdateData()
            },
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 3,
                        slidesToScroll: 1,
                        infinite: postData.postData.length <= 4 ? false : true,
                        nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} hasMoreData={hasMoreData} />,
                        prevArrow: <SamplePrevArrow />,
                        afterChange: (current) => {
                            if (parseInt(current) + 1 == parseInt(postData.postData.length) - 3) this.onUpdateData()
                        },

                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        slidesToShow: wall.Personalization.columnCountMobile == 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 1 : wall.Personalization.columnCountMobile),
                        slidesToScroll: 1,
                        initialSlide: 0,
                        infinite: postData.postData.length <= 4 ? false : true,
                        nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} hasMoreData={hasMoreData} />,
                        prevArrow: <SamplePrevArrow />,
                        afterChange: (current) => {
                            if (parseInt(current) + 1 == parseInt(postData.postData.length) - 2) this.onUpdateData()
                        },
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        slidesToShow: wall.Personalization.columnCountMobile == 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 1 : wall.Personalization.columnCountMobile),
                        slidesToScroll: 1,
                        infinite: postData.postData.length <= 4 ? false : true,
                        nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} hasMoreData={hasMoreData} />,
                        prevArrow: <SamplePrevArrow />,
                        afterChange: (current) => {
                            if (parseInt(current) + 1 == parseInt(postData.postData.length) - 2) this.onUpdateData()
                        },
                    }
                }
            ]
        };




        return <div>
            <Slider ref={c => (this.slider = c)} {...settings}>{
                !loader.webFilterLoader && postData && postData.postData && postData.postData.length && postData.postData.map((itemData, index) => {
                    let item = completeDataObject[itemData];
                    let onErrorImg = `https://ui-avatars.com/api/?name=${item.author.username}&background=123&color=fff&rounded=true`
                    return <div id={`postId${item.id}`} key={index}
                        className={`feedId${item.feedId} horizontalColumn postItem item flatThemeCard ${item.type == 1 ? `onlyTextCard` : `objectCard`} ${item.postAuthor == 1 ? `onlyAuther` : 'hideAuther'}`}
                        data-post-id={item.id} data-highlight={item.highlight} data-pin={item.pin}
                        data-created={item.createdAt}>

                        <div className={`post ${item.customClass}`} style={{ backgroundColor: wall.ThemeRule.cardColor, borderRadius: wall.ThemeRule.cardCurve === 0 ? wall.ThemeRule.cardCurve + 'px' :  wall.ThemeRule.cardCurve + 'px', overflow: 'hidden',  cursor: wall.Personalization.mobilePopup === 1 ? 'pointer' : '' }}
                            onClick={(popupStatus) ? this.onLoadTagembedPopup(index, item) : this.handleOpenModal(index, item)}>
                            <div className={wall.Personalization.trimcontent == 0 ? '' : "trimContenTrue"}>
                                <div className='postContent'>
                                    {item.file ? <React.Fragment>
                                        <div className="image">
                                            <Suspense><img alt="" placeholdersrc={item.file}
                                                src={item.file}
                                                style={{ 
                                                    borderRadius: wall.Personalization.postTime == 0 && wall.Personalization.postAuthor == 0 && wall.ThemeRule.hideContent == 1 && !wall.ThemeRule.socialAction ? 10 : ' ', 
                                                    //maxHeight: wall.ThemeRule.aspectRatio === 1 ? '' : '400px', 
                                                    maxHeight: (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? '400px' : '',
                                                    //minHeight: wall.ThemeRule.aspectRatio === 1 ? '' : '400px',
                                                    minHeight: (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? '400px' : '',
                                                     //aspectRatio: wall.ThemeRule.aspectRatio === 1 ? wall.ThemeRule.aspectImageRatio : '' 
                                                     aspectRatio: (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? '' : wall.ThemeRule.aspectImageRatio
                                                    }}
                                                data-plan-id={wall.UserDetail.planId}
                                                data-network={item.network.id} data-wall-id={wallId}
                                                data-load="0" data-item-id={item.id} data-feed-id={item.feedId}
                                                onError={(e) => dataUpdate(e)} />
                                            </Suspense>

                                            {(item.type == 3 || item.type == 5) ? <img className="postVideoIcon" src="https://cdn.tagembed.com/common/images/feeds/video-icon.png" alt="" /> : null}

                                            {(item.embed || item.spotifyUserType) ? <div className="videoIcon">
                                                {item.network.id == 7 ? <img src={`${FILE_PATHWAY}img/youtube.png`} alt="" /> :
                                                    <img src={`${FILE_PATH}img/play.svg`} alt="" />}
                                            </div> : null}
                                            {/* -------------carousel icon------------------- */}
                                            {
                                                Object.keys(item.imageList).length > 0 ?
                                                    <div className="multipostIcon">
                                                        <img src={`${FILE_PATHWAY}img/svg-icon/multi-post.svg`} alt="" />
                                                    </div> : null
                                            }

                                        </div>
                                    </React.Fragment> : null}



                                    <div className="postCardContent"
                                        style={{ display: wall.Personalization.postTime == 0 && wall.Personalization.postAuthor == 0 && wall.ThemeRule.hideContent == 1 ? 'none' : ' ', paddingBottom: (item.cta && item.type === 1) ? '178px' : '' }}>

                                        {item.rating ? <div className="postRating" style={{ paddingBottom: !item.content ? 15 : '' }}>
                                            <img src={`${CLOUD_URL}/images/rating/${item.network.id}/${item.rating}.png`}
                                                alt="" />
                                        </div> : null}

                                        <div className="postAuthorClassic"
                                            style={{ bottom: ((item.cta || item.socialAction) && item.type === 1) ? '0px' : '' }}>
                                            <div className={`authorInfo font${wall.ThemeRule.font}`} style={{
                                                display: item.instaHash == 0 ? 'none' : '',
                                                marginTop: item.postAuthor == 0 ? 0 : '-45px'
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

                                            {item.cta ? convertHtmlStringToRender(item.cta) : null}
                                        </div>

                                        <div className="postNetwork" data-network={item.network.name}
                                            data-network-color={item.network.color}>
                                            <i className={`fa ${(item.network.id === 7) ? 'fa-youtube-play' : item.network.icon}`}
                                                style={{ color: item.iconColor }}>
                                            </i>
                                        </div>
                                        {wall.ThemeRule.fontText !== null && wall.ThemeRule.fontText !== '' ? <link
                                            href={'https://fonts.googleapis.com/css2?family=' + wall.ThemeRule.fontText + '&display=swap'}
                                            rel="stylesheet" /> : null}
                                        {item.content ?
                                            <div
                                                className={wall.ThemeRule.fontText ? `postedText ${item.textDecoClass}` : `postedText ${item.textDecoClass} setFont font${wall.ThemeRule.font}`}
                                                style={{
                                                    display: (wall.ThemeRule.hideContent === 1 && item.type !== 1) ? 'none' : 'block',
                                                    fontSize: wall.ThemeRule.fontSize,
                                                    color: wall.ThemeRule.fontColor,
                                                    fontFamily: `${wall.ThemeRule.fontText ? wall.ThemeRule.fontText : " "}`
                                                }}>
                                                <ContentPostConversion item={item} network={network} />
                                            </div> : null
                                        }
                                        <ShareWrapper network={item.network} item={item}/>
                                    </div>

                                </div>
                                {wall.ThemeRule.socialAction ? <ShareActions item={item} widgetTheme={wall.Personalization.widgetTheme} wall={wall} /> : null}
                            </div>
                        </div>
                    </div>
                })
            }
            </Slider>

            {this.state.setModalShow &&
                <PopupData
                    wall={wall}
                    wallId={wallId}
                    show={this.state.setModalShow}
                    onHide={this.handleCloseModal}
                    data={(this.state.dataPopup) ? this.state.dataPopup : null}
                />}

        </div>
    }

}

const mapStateToProps = state => {
    const { wallId, webFilters, 
        /*announcements,*/ 
        wall, postData, customPostData, loader } = state
    return {
        wallId: wallId.wallID,
        webFilters: webFilters.webFilters,
        /*announcements: announcements.announcements,*/
        wall: wall.wallData,
        languageSetting: state.languageSetting,
        customPostData: customPostData.customPostData,
        appendData: postData.appendData,
        loader: loader,
        postData: postData,
        completeDataObject: postData.completeDataObject,
        networkId: postData.appendData.networkID,
        hasMoreData: state.postData.hasMoreData[0] ? state.postData.hasMoreData[0].hasMoreData == false ? false : state.postData.hasMoreData[state.postData.appendData.networkID] ? state.postData.hasMoreData[state.postData.appendData.networkID].hasMoreData : true : true
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getDataNextSteps: (wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInStateNow) => dispatch(getDataNextSteps(wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInStateNow)),
        preRenderDataUpdateToParent: (postData) => dispatch(preRenderDataUpdateToParent(postData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClassicCarouselTheme);