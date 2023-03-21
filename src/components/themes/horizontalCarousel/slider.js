import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { reactStringReplace } from '../../../constants'
import { getDataNextSteps, preRenderDataUpdateToParent } from '../../../actions/themeActions'
import PostAuthor from '../../cardPost/postAuthor'
import PopupData from '../../popup';
import { decode } from 'html-entities';
import '../../../scss/theme/horizontalCarousel.scss'
import { FILE_PATH, FILE_PATHWAY } from '../../../constants'
import { dataUpdate } from '../../../utils';
import ShareWrapper from '../../cardPost/themeContentPost/shareWrapper'

const styles = {
    postImg: {
        backgroundSize: 'cover!important',
        backgroundPosition: 'center center!important',
        opacity: 1,
        height: 'inherit',
        width: '100%'
    },
    displayInline: {
        display: 'inline-block'
    }
}
const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        /* Slick slider navigation controls Start */
        <div className="slick-nav">
            <div
                className={`tryHorizontalStyle tryHorizontalStyle-next slick-next ${className}`}
                style={{ ...style }}
                onClick={onClick}
            />
        </div>
        /* Slick slider navigation controls End */
    );
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className="slick-nav">
            <div
                className={`tryHorizontalStyle tryHorizontalStyle-pre ${className}`}
                style={{ ...style, display: "block", zIndex: 9 }}
                onClick={onClick}
            />
        </div>
    );
}

class HorizontalCarouselTheme extends PureComponent {
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
        //setTimeout(() => this.requestData(), 1000)
    }

    requestData = () => {
        const { appendData, wall, postData, wallId } = this.props;
        const tstamp = Math.floor(Date.now() / 1000);
        let postCount = wall.ThemeRule.numberOfPosts;

        if (appendData.networkID && appendData.networkID !== 0) {
            const filteredArr = Object.keys(postData.preRender).filter(item => postData.preRender[item].network.id === appendData.networkID);
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

    /* To Open the popup on click Start */
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
    /* To Open the popup on click End */

    /* To Show the popup on modal Start */
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

    /* To Show the popup on modal End */

    /* To Close the popup on Modal Start */
    handleCloseModal = () => {
        this.setState({ setModalShow: false });
    }

    /* To Close the popup on Modal End  */

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
        const { wallId, wall, postData, loader, completeDataObject, hasMoreData, loaderData, imageList } = this.props;

        const { popupStatus, themeOpacity } = this.state;
        var settings = {
            autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
            autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
            className: "center",
            //infinite: false,
            infinite: wall.Personalization.rowCount <= 1 && postData.postData.length > 3 ? true : wall.Personalization.rowCount == 2 && postData.postData.length > 10 ? true : false,
            slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 3,
            slidesToScroll: 1,
            rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,
            swipeToSlide: true,
            nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} />,
            prevArrow: <SamplePrevArrow />,
            afterChange: (current) => {
                if (parseInt(current) + 1 === parseInt(postData.postData.length) - 4) this.onUpdateData()
            },
            responsive: [
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 3,
                        infinite: wall.Personalization.rowCount <= 1 && postData.postData.length > 3 ? true : wall.Personalization.rowCount == 2 && postData.postData.length > 10 ? true : false,
                        rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,
                        nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} />,
                        prevArrow: <SamplePrevArrow />,
                        afterChange: (current) => {
                            if (parseInt(current) + 1 === parseInt(postData.postData.length) - 4) this.onUpdateData()
                        },

                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,

                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 3,
                        infinite: wall.Personalization.rowCount <= 1 && postData.postData.length > 3 ? true : wall.Personalization.rowCount == 2 && postData.postData.length > 10 ? true : false,
                        rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,
                        nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} />,
                        prevArrow: <SamplePrevArrow />,
                        afterChange: (current) => {
                            if (parseInt(current) + 1 === parseInt(postData.postData.length) - 3) this.onUpdateData()
                        },
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,

                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        slidesToShow: wall.Personalization.columnCountMobile === 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 1 : wall.Personalization.columnCountMobile),
                        initialSlide: 2,
                        infinite: wall.Personalization.rowCount <= 1 && postData.postData.length > 1 ? true : wall.Personalization.rowCount == 2 && postData.postData.length > 4 ? true : false,
                        rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,
                        nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} />,
                        prevArrow: <SamplePrevArrow />,
                        afterChange: (current) => {
                            if (parseInt(current) + 1 === parseInt(postData.postData.length) - 2) this.onUpdateData()
                        },
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,

                        autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
                        slidesToShow: wall.Personalization.columnCountMobile === 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 1 : wall.Personalization.columnCountMobile),
                        infinite: wall.Personalization.rowCount <= 1 && postData.postData.length > 1 ? true : wall.Personalization.rowCount === 2 && postData.postData.length > 4 ? true : false,
                        rows: wall.Personalization.rowCount == 2 && postData.postData.length !== 1 ? wall.Personalization.rowCount : 1,
                        nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} />,
                        prevArrow: <SamplePrevArrow />,
                        afterChange: (current) => {
                            if (parseInt(current) + 1 === parseInt(postData.postData.length) - 2) this.onUpdateData()
                        },
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
                //(postData.postData.length % 2 == 0 ? postData.postData : postData.postData.pop()) 
                (wall.Personalization.rowCount > 1 && postData.postData.length !== 1 && postData.postData.length % 2 !== 0 ? postData.postData.pop() : postData.postData)
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
                    return <Fragment>
                        <div className="tabIndexinline">
                            <div
                                style={{ padding: wall.Personalization.padding + "px" }}
                                id={`postId${item.id}`}
                                key={index}
                                className={`feedId${item.feedId} owl-lazy horizontalSlider postItem item flatThemeCard ${item.type === 1 ? 'onlyTextCard' : ''}`}
                                data-post-id={item.id}
                                data-highlight={item.highlight}
                                data-pin={item.pin}
                                data-created={item.createdAt}>
                                <div className="post" style={{
                                    backgroundColor: (wall.Personalization.columnCount === 1 ? 'transparent' : wall.ThemeRule.cardColor),
                                    // before it was 400px by default
                                    //height: (wall.Personalization.columnCount === 1 ? (wall.ThemeRule.aspectRatio === 1) ? '' : '95vh' : (wall.ThemeRule.aspectRatio === 1) ? '' : `calc(350px - (${wall.Personalization.padding + "px"} + ${wall.Personalization.padding + "px"}))`),
                                    height: (wall.Personalization.columnCount === 1 ? (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ?'95vh' : '' : (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? `calc(350px - (${wall.Personalization.padding + "px"} + ${wall.Personalization.padding + "px"}))` :'' ),
                                    borderRadius: wall.ThemeRule.cardCurve + 'px', overflow: 'hidden',
                                    cursor: wall.Personalization.mobilePopup === 1 ? 'pointer' : '',
                                }}>
                                    {
                                        item.file != null && item.file !== "" ? <div className="image">

                                            {item.type === 1 ? <div
                                                className={(wall.Personalization.columnCount === 1 ? "postImg column1" : "postImg completeLazyLoad")}
                                                style={{
                                                    backgroundImage: `url(${item.file})`,
                                                    transition: `all 0s ease-in-out 2s`
                                                }}>
                                            </div> : <div
                                                className={(wall.Personalization.columnCount === 1 ? "postImg column1" : "postImg completeLazyLoad")}>
                                                <img
                                                    src={item.file}
                                                    data-plan-id={wall.UserDetail.planId}
                                                    data-network={item.network.id} data-wall-id={wallId} data-load="0" data-feed-id={item.feedId}
                                                    data-item-id={item.id} onError={(e) => dataUpdate(e)} alt="1" style={{  
                                                        //aspectRatio: wall.ThemeRule.aspectRatio === 1 ? wall.ThemeRule.aspectImageRatio : ''
                                                        aspectRatio: (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? '' : wall.ThemeRule.aspectImageRatio
                                                         }} />
                                            </div>}
                                            {(item.type == 3 || item.type == 5) ? <img className="postVideoIcon" src="https://cdn.tagembed.com/common/images/feeds/video-icon.png" alt="" /> : null}

                                            {(item.embed || item.spotifyUserType) ? <div className="videoIcon" style={{
                                                position: 'absolute',
                                                left: 0,
                                                right: 0,
                                                top: '50%',
                                                textAlign: 'center',
                                                transform: 'translateY(-50%)'
                                            }}>
                                                {item.network.id === 7 ? <img style={styles.displayInline}
                                                    src="https://cdn.tagembed.com/app/img/youtube.png"
                                                    alt="" /> :
                                                    <img style={{ display: 'inline-block', height: "60px" }}
                                                        src={`${FILE_PATH}img/play.svg`} alt="" />}
                                            </div> : null}

                                            {/* -------------carousel icon------------------- */}
                                            {
                                                Object.keys(item.imageList).length > 0 ?
                                                    <div className="multipostIcon">
                                                        <img src={`${FILE_PATHWAY}img/svg-icon/multi-post.svg`} alt="" />
                                                    </div> : null
                                            }

                                        </div> : ((item.type === 3 || item.type === 5) && !item.file) ?
                                            <div className="image">
                                                <div className="postImg" style={{ backgroundImage: `url(${FILE_PATHWAY}img/blank.jpg)`}}>
                                                    <div className="videoIcon">
                                                        {item.network.id === 7 ?
                                                            <img style={styles.displayInline} src="https://cdn.tagembed.com/app/img/youtube.png" alt="" />
                                                            : <img style={styles.displayInline}
                                                                src={`${FILE_PATH}img/play.svg`} alt="" />}
                                                    </div>

                                                </div>


                                            </div> : null
                                    }
                                    <div className="postNetwork" data-network={item.network.name}
                                        data-network-color={item.network.color}>
                                        <i className={`fa ${(item.network.id === 7) ? 'fa-youtube-play' : item.network.icon}`}
                                            style={{ color: item.iconColor }}>

                                        </i>
                                    </div>

                                    <div className="postCardContent"
                                        onClick={(popupStatus) ? this.onLoadTagembedPopup(index, item) : this.handleOpenModal(index, item)}>
                                        {wall.ThemeRule.fontText !== null && wall.ThemeRule.fontText !== '' ? <link
                                            href={'https://fonts.googleapis.com/css2?family=' + wall.ThemeRule.fontText + '&display=swap'}
                                            rel="stylesheet" /> : null}
                                        {item.content ? <div
                                            className={wall.ThemeRule.fontText ? `postedText ${item.textDecoClass}` : `postedText ${item.textDecoClass} setFont font${wall.ThemeRule.font}`}
                                            style={{
                                                display: (wall.ThemeRule.hideContent === 1 && item.type !== 1) ? 'none' : 'block',
                                                fontSize: wall.ThemeRule.fontSize,
                                                color: wall.ThemeRule.fontColor,
                                                fontFamily: `${wall.ThemeRule.fontText ? wall.ThemeRule.fontText : " "}`
                                            }}>
                                            {item.contentTitle ?
                                                <h1 style={{ color: wall.ThemeRule.fontColor }}>{item.contentTitle}</h1> : null}


                                            <p className={`horizontal_text_trim chtrLimits emojiApplied line` +wall.ThemeRule.lineTrim} style={{textAlign: wall.ThemeRule.textAlignment }}>{
                                                wall.Personalization.hashtag_highlight !== 0 ?
                                                    wall.Personalization.hashtag_all === 1 ? reactStringReplace(decode(item.content), /#(\w+)/g, (match, i) => (
                                                        <span key={match + i} style={{
                                                            color: wall.Personalization.hashtag_color,
                                                            fontWeight: "bold"
                                                        }}>#{match}</span>
                                                    ))
                                                        : wall.Personalization.hashtag_feed === 1 ? reactStringReplace(decode(item.content), item.hash.hashString, (match, i) => (
                                                            <span key={match + i} style={{
                                                                color: wall.Personalization.hashtag_color,
                                                                fontWeight: "bold"
                                                            }}>{match}</span>
                                                        )) : decode(item.content)
                                                    : decode(item.content)
                                            }</p>
                                        </div>
                                            : null}
                                            <ShareWrapper network={item.network} item={item}/>
                                        <PostAuthor network={item.network} item={item} wall={wall} />
                                        
                                    </div>
                                </div>

                            </div>

                        </div>
                    </Fragment>
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
    const { wallId, wall, postData, loader } = state
    return {
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
export default connect(mapStateToProps, mapDispatchToProps)(HorizontalCarouselTheme);




// import React, { Fragment, PureComponent } from 'react';
// import { connect } from 'react-redux';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { reactStringReplace } from '../../../constants'
// import { getDataNextSteps, preRenderDataUpdateToParent } from '../../../actions/themeActions'
// import PostAuthor from '../../cardPost/postAuthor'
// import PopupData from '../../popup';
// import { decode } from 'html-entities';
// import '../../../scss/theme/horizontalCarousel.scss'
// import { FILE_PATH } from '../../../constants'
// import { dataUpdate } from '../../../utils';

// const styles = {
//     postImg: {
//         backgroundSize: 'cover!important',
//         backgroundPosition: 'center center!important',
//         opacity: 1,
//         height: 'inherit',
//         width: '100%'
//     },
//     displayInline: {
//         display: 'inline-block'
//     }
// }
// const SampleNextArrow = (props) => {
//     const { className, style, onClick } = props;
//     return (
//         /* Slick slider navigation controls Start */
//         <div className="slick-nav">
//             <div
//                 className={`tryHorizontalStyle tryHorizontalStyle-next slick-next ${className}`}
//                 style={{ ...style }}
//                 onClick={onClick}
//             />
//         </div>
//         /* Slick slider navigation controls End */
//     );
// }

// const SamplePrevArrow = (props) => {
//     const { className, style, onClick } = props;
//     return (
//         <div className="slick-nav">
//             <div
//                 className={`tryHorizontalStyle tryHorizontalStyle-pre ${className}`}
//                 style={{ ...style, display: "block", zIndex: 9 }}
//                 onClick={onClick}
//             />
//         </div>
//     );
// }

// class HorizontalCarouselTheme extends PureComponent {
//     constructor() {
//         super();
//         this.state = {
//             setModalShow: false,
//             dataPopup: {},
//             popupStatus: true
//         };

//         this.handleOpenModal = this.handleOpenModal.bind(this);
//         this.handleCloseModal = this.handleCloseModal.bind(this);
//     }

//     onUpdateData = () => {
//         //setTimeout(() => this.requestData(), 1000)
//     }

//     requestData = () => {
//         const { appendData, wall, postData, wallId } = this.props;
//         const tstamp = Math.floor(Date.now() / 1000);
//         let postCount = wall.ThemeRule.numberOfPosts;

//         if (appendData.networkID && appendData.networkID !== 0) {
//             const filteredArr = Object.keys(postData.preRender).filter(item => postData.preRender[item].network.id === appendData.networkID);
//             if (filteredArr.length > 0) {
//                 this.props.preRenderDataUpdateToParent(filteredArr);
//             }
//             if (filteredArr.length < postCount) {
//                 this.props.getDataNextSteps(wallId, tstamp, postCount - filteredArr.length, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent, true);
//             }
//             this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);


//         } else {
//             if (Object.keys(postData.preRender).length > 0) {
//                 this.props.preRenderDataUpdateToParent(postData.preRender);
//                 this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);

//             } else {
//                 this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);
//                 this.props.preRenderDataUpdateToParent(postData.preRender);
//                 this.props.getDataNextSteps(wallId, tstamp, postCount, appendData.networkID, appendData.after, postData.preRender, appendData.heightEvent);

//             }


//         }
//     }

//     /* To Open the popup on click Start */
//     onLoadTagembedPopup = (itemIndex, item) => event => {
//         const { wall, appendData, postData, languageSetting, completeDataObject } = this.props;
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
//                         themeRule: wall.ThemeRule
//                     },
//                 }
//                 appendData.heightEvent.source.postMessage(obj, appendData.heightEvent.origin);
//             }
//         }
//     }
//     /* To Open the popup on click End */

//     /* To Show the popup on modal Start */
//     handleOpenModal = (itemIndex, item) => event => {
//         const { wall, postData, languageSetting, completeDataObject } = this.props;
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
//                     themeRule:wall.ThemeRule

//                 }
//                 this.setState({ setModalShow: true, dataPopup: dataPopup });
//             }
//         }
//     }

//     /* To Show the popup on modal End */

//     /* To Close the popup on Modal Start */
//     handleCloseModal = () => {
//         this.setState({ setModalShow: false });
//     }

//     /* To Close the popup on Modal End  */

//     componentDidMount() {
//         let hostUrl = window.location.origin
//         let appUrl = `https://app.tagembed.com`
//         if (window.location.search === '?wix' || hostUrl === appUrl || window.location.search.match('view') && window.location.search.match('view')[0] === 'view') {
//             this.setState({ popupStatus: false });
//         }
//     }

//     render() {
//         const { wallId, wall, postData, loader, completeDataObject, hasMoreData } = this.props;

//         const { popupStatus } = this.state;
//         var settings = {
//             autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,
//             autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
//             className: "center",
//             infinite: true,
//             slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 3,
//             slidesToScroll: 1,

//             swipeToSlide: true,
//             nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} />,
//             prevArrow: <SamplePrevArrow />,
//             afterChange: (current) => {
//                 if (parseInt(current) + 1 === parseInt(postData.postData.length) - 4) this.onUpdateData()
//             },
//             responsive: [
//                 {
//                     breakpoint: 1300,
//                     settings: {
//                         slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 3,
//                         infinite: true,
//                         nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} />,
//                         prevArrow: <SamplePrevArrow />,
//                         afterChange: (current) => {
//                             if (parseInt(current) + 1 === parseInt(postData.postData.length) - 4) this.onUpdateData()
//                         },

//                     }
//                 },
//                 {
//                     breakpoint: 1024,
//                     settings: {
//                         autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,

//                         autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
//                         slidesToShow: wall.Personalization.columnCount > 0 ? wall.Personalization.columnCount : 3,
//                         infinite: true,
//                         nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} />,
//                         prevArrow: <SamplePrevArrow />,
//                         afterChange: (current) => {
//                             if (parseInt(current) + 1 === parseInt(postData.postData.length) - 3) this.onUpdateData()
//                         },
//                     }
//                 },
//                 {
//                     breakpoint: 700,
//                     settings: {
//                         autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,

//                         autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
//                         slidesToShow: wall.Personalization.columnCountMobile === 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 1 : wall.Personalization.columnCountMobile),
//                         initialSlide: 2,
//                         infinite: true,
//                         nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} />,
//                         prevArrow: <SamplePrevArrow />,
//                         afterChange: (current) => {
//                             if (parseInt(current) + 1 === parseInt(postData.postData.length) - 2) this.onUpdateData()
//                         },
//                     }
//                 },
//                 {
//                     breakpoint: 480,
//                     settings: {
//                         autoplay: wall.Personalization.autoSlide === 'undefined' ? '0' : wall.Personalization.autoSlide,

//                         autoplaySpeed: wall.Personalization.slideDelay === 'undefined' ? '' : wall.Personalization.slideDelay * 1000,
//                         slidesToShow: wall.Personalization.columnCountMobile === 'undefined' ? 1 : (wall.Personalization.columnCountMobile === 0 ? 1 : wall.Personalization.columnCountMobile),
//                         infinite: true,
//                         nextArrow: <SampleNextArrow onUpdateData={this.onUpdateData} />,
//                         prevArrow: <SamplePrevArrow />,
//                         afterChange: (current) => {
//                             if (parseInt(current) + 1 === parseInt(postData.postData.length) - 2) this.onUpdateData()
//                         },
//                     }
//                 }
//             ]
//         };
//         return <div>
//             <Slider ref={c => (this.slider = c)} {...settings}>{
//                 !loader.webFilterLoader && postData && postData.postData && postData.postData.length && postData.postData.map((itemData, index) => {
//                     let item = completeDataObject[itemData];
//                     return <Fragment>
//                         <div className="tabIndexinline">
//                             <div
//                                 style={{ padding: wall.Personalization.padding + "px" }}
//                                 id={`postId${item.id}`}
//                                 key={index}
//                                 className={`feedId${item.feedId} owl-lazy horizontalSlider postItem item flatThemeCard ${item.type === 1 ? 'onlyTextCard' : ''}`}
//                                 data-post-id={item.id}
//                                 data-highlight={item.highlight}
//                                 data-pin={item.pin}
//                                 data-created={item.createdAt}>
//                                 <div className="post" style={{
//                                     backgroundColor: (wall.Personalization.columnCount === 1 ? 'transparent' : wall.ThemeRule.cardColor),
//                                     height: (wall.Personalization.columnCount === 1 ? '95vh' : `calc(400px - (${wall.Personalization.padding + "px"} + ${wall.Personalization.padding + "px"}))`)
//                                 }}>
//                                     {
//                                         item.file != null && item.file !== "" ? <div className="image">

//                                             {item.type === 1 ? <div
//                                                 className={(wall.Personalization.columnCount === 1 ? "postImg column1" : "postImg completeLazyLoad")}
//                                                 style={{
//                                                     backgroundImage: `url(${item.file})`,
//                                                     transition: `all 0s ease-in-out 2s`
//                                                 }}>
//                                             </div> : <div
//                                                 className={(wall.Personalization.columnCount === 1 ? "postImg column1" : "postImg completeLazyLoad")}>
//                                                 <img src={item.file} data-plan-id={wall.UserDetail.planId}
//                                                     data-network={item.network.id} data-wall-id={wallId} data-load="0"
//                                                     data-item-id={item.id} onError={(e) => dataUpdate(e)} alt="1" />
//                                             </div>}

//                                             {(item.embed || item.spotifyUserType) ? <div className="videoIcon" style={{
//                                                 position: 'absolute',
//                                                 left: 0,
//                                                 right: 0,
//                                                 top: '50%',
//                                                 textAlign: 'center',
//                                                 transform: 'translateY(-50%)'
//                                             }}>
//                                                 {item.network.id === 7 ? <img style={styles.displayInline}
//                                                     src="https://app.tagembed.com/widget/img/youtube.png"
//                                                     alt="" /> :
//                                                     <img style={{ display: 'inline-block', height: "60px" }}
//                                                         src={`${FILE_PATH}img/play.svg`} alt="" />}
//                                             </div> : null}
//                                         </div> : ((item.type === 3 || item.type === 5) && !item.file) ?
//                                             <div className="image">
//                                                 <div className="postImg" style={{ backgroundImage: 'url(img/blank.jpg)' }}>
//                                                     <div className="videoIcon">
//                                                         {item.network.id === 7 ?
//                                                             <img style={styles.displayInline} src="img/youtube.png" alt="" />
//                                                             : <img style={styles.displayInline}
//                                                                 src={`${FILE_PATH}img/play.svg`} alt="" />}
//                                                     </div>
//                                                 </div>
//                                             </div> : null
//                                     }
//                                     <div className="postNetwork" data-network={item.network.name}
//                                         data-network-color={item.network.color}>
//                                         <i className={`fa ${(item.network.id === 7) ? 'fa-youtube-play' : item.network.icon}`}
//                                             style={{ color: item.iconColor }}>

//                                         </i>
//                                     </div>

//                                     <div className="postCardContent"
//                                         onClick={(popupStatus) ? this.onLoadTagembedPopup(index, item) : this.handleOpenModal(index, item)}>
//                                         {wall.ThemeRule.fontText !== null && wall.ThemeRule.fontText !== '' ? <link
//                                             href={'https://fonts.googleapis.com/css2?family=' + wall.ThemeRule.fontText + '&display=swap'}
//                                             rel="stylesheet"/> : null}
//                                         {item.content ? <div
//                                             className={wall.ThemeRule.fontText ? `postedText ${item.textDecoClass}` : `postedText ${item.textDecoClass} setFont font${wall.ThemeRule.font}`}
//                                             style={{
//                                                 display: (wall.ThemeRule.hideContent === 1 && item.type !== 1) ? 'none' : 'block',
//                                                 fontSize: wall.ThemeRule.fontSize,
//                                                 color: wall.ThemeRule.fontColor,
//                                                 fontFamily: `${wall.ThemeRule.fontText ? wall.ThemeRule.fontText : " "}`
//                                             }}>
//                                             {item.contentTitle ?
//                                                 <h1 style={{ color: wall.ThemeRule.fontColor }}>{item.contentTitle}</h1> : null}


//                                             <p className="horizontal_text_trim chtrLimits emojiApplied">{
//                                                 wall.Personalization.hashtag_highlight !== 0 ?
//                                                     wall.Personalization.hashtag_all === 1 ? reactStringReplace(decode(item.content), /#(\w+)/g, (match, i) => (
//                                                         <span key={match + i} style={{
//                                                             color: wall.Personalization.hashtag_color,
//                                                             fontWeight: "bold"
//                                                         }}>#{match}</span>
//                                                     ))
//                                                         : wall.Personalization.hashtag_feed === 1 ? reactStringReplace(decode(item.content), item.hash.hashString, (match, i) => (
//                                                             <span key={match + i} style={{
//                                                                 color: wall.Personalization.hashtag_color,
//                                                                 fontWeight: "bold"
//                                                             }}>{match}</span>
//                                                         )) : decode(item.content)
//                                                     : decode(item.content)
//                                             }</p>
//                                         </div>
//                                             : null}

//                                         <PostAuthor network={item.network} item={item} wall={wall} />
//                                     </div>
//                                 </div>

//                             </div>

//                         </div>
//                     </Fragment>
//                 })
//             }
//             </Slider>
//             {this.state.setModalShow &&
//                 <PopupData
//                     wall={wall}
//                     show={this.state.setModalShow}
//                     onHide={this.handleCloseModal}
//                     data={(this.state.dataPopup) ? this.state.dataPopup : null}
//                 />}

//         </div>
//     }

// }

// const mapStateToProps = state => {
//     const { wallId, wall, postData, loader } = state
//     return {
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
// export default connect(mapStateToProps, mapDispatchToProps)(HorizontalCarouselTheme);