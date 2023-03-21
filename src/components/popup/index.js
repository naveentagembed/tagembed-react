import React, { PureComponent, Suspense } from "react";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
/*import $ from "jquery"; */
import { isMobile } from "react-device-detect";
import ContentConversion from "./contentConversion";
import "./popup.scss";
import ReactPlayer from "react-player";
import Tiktoks from "./tiktok";
import Iframe from "react-iframe";
import Helmet from "react-helmet";
import { dataUpdate, dataUpdated, dataUpdates, loopUpdateDataVideo } from "../../utils";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const noVideoStyle = { alignSelf: "center", textAlign: "center" };

const SampleNextArrow = (props) => {
    const { classNameCustom, onClick, hasMoreData, loader } = props;

    if (onClick == null && hasMoreData && !loader.isShowMoreLoader)
        props.onUpdateData();
    return (
        <div
            className={`${onClick == null && hasMoreData && !loader.isShowMoreLoader
                ? "tb_mo_slider_next_arrow-loader"
                : "tb_mo_slider_next_arrow-next"
                } ${classNameCustom}`}
            onClick={onClick}
        >
            {onClick == null && hasMoreData && !loader.isShowMoreLoader ? (
                <svg
                    width="26px"
                    height="26px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                    class="uil-ring-alt"
                >
                    <rect
                        x="0"
                        y="0"
                        width="100"
                        height="100"
                        fill="none"
                        class="bk"
                    ></rect>
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#afafb7"
                        fill="none"
                        stroke-width="10"
                        stroke-linecap="round"
                    ></circle>
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#000000"
                        fill="none"
                        stroke-width="6"
                        stroke-linecap="round"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            dur="2s"
                            repeatCount="indefinite"
                            from="0"
                            to="502"
                        ></animate>
                        <animate
                            attributeName="stroke-dasharray"
                            dur="2s"
                            repeatCount="indefinite"
                            values="150.6 100.4;1 250;150.6 100.4"
                        ></animate>
                    </circle>
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="24"
                    viewBox="0 0 11.71 20.448"
                >
                    <path
                        id="Path_5609"
                        data-name="Path 5609"
                        d="M9.464,25.487a1.463,1.463,0,0,1-1.039-2.5l7.753-7.74L8.425,7.5A1.469,1.469,0,0,1,10.5,5.426l8.777,8.78a1.463,1.463,0,0,1,0,2.063L10.5,25.048a1.462,1.462,0,0,1-1.039.439Z"
                        transform="translate(-7.995 -5.039)"
                        fill="#ffffff"
                    />
                </svg>
            )}
        </div>
    );
};

const SamplePrevArrow = (props) => {
    const { classNameCustom, onClick } = props;
    return (
        <div className={`${classNameCustom}`} onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="24"
                viewBox="0 0 11.71 20.448"
            >
                <path
                    id="Path_5609"
                    data-name="Path 5609"
                    d="M18.238,25.487a1.463,1.463,0,0,0,1.039-2.5l-7.755-7.74L19.277,7.5A1.469,1.469,0,0,0,17.2,5.426L8.42,14.206a1.463,1.463,0,0,0,0,2.063L17.2,25.048a1.463,1.463,0,0,0,1.039.439Z"
                    transform="translate(-7.994 -4.996)"
                    fill="#ffffff"
                ></path>
            </svg>
        </div>
    );
};

const NetworkIconModal = ({ data, wall }) => {
    if (data.network.icon !== null) {
        var f = data.network.icon.substring(3);
        if (data.network.name !== "RSS") {
            if (
                (data.network.name !== "Workplace" &&
                    data.network.name !== "Google Review" &&
                    data.network.id !== 21 &&
                    data.network.id !== 28 &&
                    data.network.id !== 26) ||
                (data.network.id === 4 && wall.ThemeRule.fontColor === "#ffffff")
            ) {
                return (
                    <i
                        className={`fab fa-${f === "facebook" ? "facebook-f" : f} fa-2x`}
                        style={{ color: data.iconColor }}
                    ></i>
                );
            } else if (data.network.name === "SMS") {
                return (
                    <i
                        className={`fab fa-envelope fa-2x`}
                        style={{ color: data.iconColor }}
                    ></i>
                );
            } else if (data.network.name === "Workplace") {
                return (
                    <i
                        className="fa icon-taggbox-workplace-2 fa-2x"
                        style={{ color: data.iconColor }}
                    >
                        {" "}
                    </i>
                );
            } else if (data.network.name === "Slack") {
                return (
                    <i className="fab fa-slack fa-2x" style={{ color: data.iconColor }}>
                        {" "}
                    </i>
                );
            } else if (data.network.id === 21) {
                return (
                    <i className="fab fa-yammer fa-2x" style={{ color: data.iconColor }}>
                        {" "}
                    </i>
                );
            } else if (data.network.id === 26) {
                return (
                    <i className="fa fa-giphy fa-2x" style={{ color: data.iconColor }}>
                        {" "}
                    </i>
                );
            } else if (data.network.id === 28) {
                return (
                    <i className="fa fa-capterra fa-2x" style={{ color: data.iconColor }}>
                        {" "}
                    </i>
                );
            } else if (data.network.id === 4) {
                return (
                    <i
                        className="fab fa-google-new fa-2x"
                        style={{ color: data.iconColor }}
                    >
                        {" "}
                    </i>
                );
            } else if (data.network.id === 10) {
                return (
                    <i
                        className="fab fa-linkedin-in fa-2x"
                        style={{ color: data.iconColor }}
                    >
                        {" "}
                    </i>
                );
            } else return false;
        } else {
            return (
                <i className={`fa fa-rss fa-2x`} style={{ color: data.iconColor }}></i>
            );
        }
    } else {
        return null;
    }
};
const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const SocialPanel = ({ data, viewOnText, wall, imageList }) => {
    if (
        data.network.name === "SMS" ||
        data.network.name === "Whatsapp" ||
        data.network.icon === null ||
        data.link === null ||
        data.network.name === null
    ) {
        return null;
    } else {
        return (
            <a
                style={{
                    textTransform: "capitalize!important",
                    color: fontColorIfWhite(
                        "#ffffff",
                        wall.ThemeRule.fontColor,
                        "#333",
                        wall.Personalization.widgetTheme
                    ),
                }}
                className={`popupSocialLink ${data.network.name}`}
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                {`${data.network.name !== "Vimeo" &&
                    data.network.name != "Google Review" &&
                    data.network.name != "Giphy" &&
                    data.network.name != "Workplace"
                    ? capitalize(data.network.icon.substring(3))
                    : capitalize(data.network.name)
                    } `}{" "}
                <i className="fa fa-external-link"></i>
            </a>
        );
    }
};

const SocialIconPanel = ({ data, wall }) => {
    return (
        <>
            {data.network.name !== "Twitter" ? (
                <a
                    href={data.share.facebook}
                    style={{
                        color: fontColorIfWhite(
                            "#ffffff",
                            data.iconColor,
                            "#6a6a6a",
                            wall.Personalization.widgetTheme
                        ),
                    }}
                    className="fbPanel"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {" "}
                    <i className={`fa fa-facebook-f`}></i>
                </a>
            ) : (
                ""
            )}
            <a
                href={data.share.twitter}
                style={{
                    color: fontColorIfWhite(
                        "#ffffff",
                        data.iconColor,
                        "#6a6a6a",
                        wall.Personalization.widgetTheme
                    ),
                }}
                className="twPanel"
                target="_blank"
                rel="noopener noreferrer"
            >
                {" "}
                <i className={`fa fa-twitter`}></i>
            </a>
            <a
                href={data.share.linkedin}
                style={{
                    color: fontColorIfWhite(
                        "#ffffff",
                        data.iconColor,
                        "#6a6a6a",
                        wall.Personalization.widgetTheme
                    ),
                }}
                className="linkedinPanel"
                target="_blank"
                rel="noopener noreferrer"
            >
                {" "}
                <i className={`fa fa-linkedin`}></i>
            </a>
        </>
    );
};

const fontColorIfWhite = (white, color, defaultColor, theme) =>
    (white === color && theme === 4) ||
        (white === color && theme === 16) ||
        (white === color && theme === 50) ||
        (white === color && theme === 55)
        ? defaultColor
        : color;

var checkNull = false;

class popup extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            man: this.props.data,
            cond: 0,
            viewOnText: this.props.data.viewOnText,
            fam: this.props.data.idArray,
            personalization: this.props.data.personalization,
            currentIndex: this.props.data.index,
            isVideoError: false,
            getHeightContent: null,
            realHeight: null,
        };
        this.getHeightAfterChange.bind(this);
        this.slideWithArrowKeys.bind(this);
        this.onClickSlider.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { currentIndex, data } = nextProps;

        if (currentIndex === 0 && checkNull === false) {
            this.setState({
                currentIndex: currentIndex,
                data: data,
                isVideoError: false,
            });
            checkNull = false;
        } else {
            checkNull = true;
        }
    }

    /*To Display error video Start */
    onErrorVideo = (e) => {
        this.setState({ isVideoError: true });
    };
    /*To Display error video End */

    /* To scroll popup slider on click Start */
    onClickSlider = (j) => (event) => {
        const { man } = this.state;
        if (j === -1) {
            this.setState({ currentIndex: man.idArray.length - 1 });
        } else {
            this.setState({ currentIndex: man.idArray.length == j ? 0 : j });
        }
    };
    /* To scroll popup slider on click End */

    SliderWithKey = (j) => {
        const { man } = this.state;
        if (j === -1) this.setState({ currentIndex: man.idArray.length - 1 });
        else this.setState({ currentIndex: man.idArray.length == j ? 0 : j });
    };

    componentDidMount() {
        this.setState({ cond: 1 });
       /* $(document).keydown(
            function () {
                this.slideWithArrowKeys();
            }.bind(this)
        ); */
    }

    getHeightAfterChange = (h) => {
        let modalWrapper = document.querySelector(".modalWrapper");
        if (!isMobile) {
            this.setState({
                getHeightContent: h ? h - 130 : modalWrapper.offsetHeight - 130,
            });
        }
    };

    /* to slide popup with arrow keys Start */
    slideWithArrowKeys = (e) => {
        const { man } = this.state;

        if (
            man &&
            man.card &&
            man.personalization &&
            this.props.wall.Personalization.popupSlideShow === 1
        ) {
            e = e || window.event;
            let self = this;
            if (e && e.keyCode && e.keyCode != undefined) {
                if (e.keyCode == "37") {
                    self.SliderWithKey(self.state.currentIndex - 1);
                    this.setState({ getHeightContent: 0 });
                } else if (e.keyCode == "39") {
                    self.SliderWithKey(self.state.currentIndex + 1);
                    this.setState({ getHeightContent: 0 });
                }
            }
        }
    };

    convertObjectToArray = (obj) => {
        let result = Object.keys(obj).map((key) => obj[key]);
        return result;
    };

    multiImage = (imageList) => {
        const { wallId, wall, data } = this.props;

        const settings = {
            autoplay: false,
            pauseOnHover: true,
            dots: true,
            arrows: true,
            className: "center",
            infinite: false,
            slidesToShow: 1,
            swipeToSlide: true,
            slidesToScroll: 1,
            // nextArrow: <SampleNextArrow classNameCustom={'tb_mo_slider_next_arrow'} onUpdateData={this.onUpdateData}
            //     loader={loader} />,
            // prevArrow: <SamplePrevArrow classNameCustom={'tb_mo_slider_pre_arrow'} />,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        autoplay: false,
                        pauseOnHover: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: true,
                        infinite: false,
                    },
                },
                {
                    breakpoint: 1300,
                    settings: {
                        autoplay: false,
                        pauseOnHover: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: true,
                        infinite: false,
                    },
                },
                {
                    breakpoint: 1024,
                    settings: {
                        autoplay: false,
                        pauseOnHover: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: true,
                        infinite: false,
                    },
                },
                {
                    breakpoint: 700,
                    settings: {
                        autoplay: false,
                        pauseOnHover: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: true,
                        infinite: false,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        autoplay: false,
                        pauseOnHover: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: true,
                        infinite: false,
                    },
                },
            ],
        };

        return (
            <Slider {...settings}>
                 
               
                {imageList && imageList.map((imageList, index) => {
                    return (
                        <>
                            {(imageList.type === 2 || imageList.type === 4) ? (
                                <div
                                    className={`tagembedImageWrapper multifeaturepopup imageCardN${imageList.networkId}`}
                                >
                                    <div className="popupBlurimg">
                                    <Suspense>
                                        <img
                                            id={`img${imageList.id}`}
                                            style={{ maxHeight: "500px !important", opacity: 1 }}
                                            src={imageList.file}
                                            alt=""
                                            data-network={imageList.networkId}
                                            data-pop-id={imageList.id}
                                            data-feed-id={imageList.feedId}
                                            data-item-id={imageList.id}
                                            data-wall-id={wallId}
                                            data-plan-id={wall.UserDetail.planId}
                                            data-load="0"
                                            onError={dataUpdates}
                                            onLoad={(e) => {
                                                if (
                                                    e.target.src ==
                                                    "https://cdn.tagembed.com/app/image/blur-img.jpg"
                                                )
                                                // dataUpdates(e)
                                                this.getHeightAfterChange(e.target.height);
                                            }}
                                        />
                                        <img
                                            id={`img${imageList.id}`}
                                            style={{ maxHeight: "500px !important", opacity: 1 }}
                                            src={imageList.file}
                                            //src="https://cdn.tagembed.com/app/image/blur-img.jpg"
                                            alt=""
                                            data-network={imageList.networkId}
                                            data-item-id={imageList.id}
                                            data-pop-id={imageList.id}
                                            data-feed-id={imageList.feedId}
                                            data-wall-id={wallId}
                                            data-plan-id={wall.UserDetail.planId}
                                            data-load="0"
                                            //onError={dataUpdates}
                                            onLoad={(e) => {
                                                if (
                                                    e.target.src ==
                                                    "https://cdn.tagembed.com/app/image/blur-img.jpg"
                                                )
                                                // dataUpdates(e)
                                                this.getHeightAfterChange(e.target.height);
                                            }}
                                        />
                                    </Suspense>
                                    
                                    </div>
                                </div>
                            ) : (imageList.type === 3 || imageList.type === 5) ? (
                                <div
                                    className={`tagembedImageWrapper iframeVideo videoMax100 imageCardN${imageList.networkId
                                        }  ${imageList.networkId === 31 && imageList.media !== ""
                                            ? "modalHastagWrapperN31"
                                            : ""
                                        }`}
                                >
                                    <ReactPlayer
                                        className="ReactPlayer"
                                        loop={false}
                                        controls={true}
                                        //playing
                                        autoPlay={false}
                                        // light={true}
                                        width={"100%"}
                                        height={"inherit"}
                                        playsinline={true}
                                        url={`${imageList.media}`}
                                        data-network={imageList.networkId}
                                        data-item-id={imageList.id}
                                        data-feed-id={imageList.feedId}
                                        data-wall-id={wallId}
                                        data-plan-id={wall.UserDetail.planId}
                                        onError={(e) => loopUpdateDataVideo(e)}
                                    />
                                </div>
                            ) : null}
                        </>
                    );
                })}
            </Slider>
        );
    };

    /* to slide popup with arrow keys End */

    render() {
        const { show, onHide, wallId, wall } = this.props;
        let {
            isVideoError,
            fam,
            man,
            currentIndex,
            personalization,
            viewOnText,
            cond,
            getHeightContent,
            realHeight,
        } = this.state;
        
        let fontText = this.props.wall.ThemeRule.fontText;
        let data = this.props.data.card;
        /*-- incase we want to remove avatar | let onErrorImg = 'https://cdn.tagembed.com/app/img/author2.png'; -- */
        let onErrorImg = `https://ui-avatars.com/api/?name=${data.author.username}&background=123&color=fff&rounded=true`;

        if (currentIndex === -1) {
            data = fam[man.idArray.length - 1];
        } else {
            data = fam[currentIndex];
        }

        let imageList = {}
        if (Object.keys(data).pop() == "imageList") {
            imageList = this.convertObjectToArray(data.imageList);
        }
        /* for linkedIn youtube video url */ 
        var newURL = data.mediaUrl;
        var popactionURL = newURL.includes("youtube");

        
        return fam &&
            fam.length > 0 &&
            data &&
            Object.keys(data).length > 0 &&
            cond === 1 &&
            data !== "" ? (
            <React.Fragment>
                <Modal
                    key={data.id}
                    id="tagembedPopup"
                    show={show}
                    onHide={onHide}
                    className={`${isMobile ? "onMobileContent" : ""} tagembedModal ${wall.ThemeRule.hideContent == 1 &&
                        data.type != 1 &&
                        (data.type === 4 || data.type === 5)
                        ? `modal-only-image`
                        : (data.type === 4 || data.type === 5)
                        ? (data.network.id === 7 || data.network.id === 8) ? 'modal-text-image modal-text-image-vimeo-youtube' : `modal-text-image`
                            : data.type === 2 || data.type === 3
                                ? `modal-only-image`
                                : `modal-only-text`
                        } ${data.mediaUrl === ""
                            ? data.network.id === 31 && (data.type === 3 || data.type === 5)
                                ? "tiktopPopupwrap"
                                : ""
                            : ""
                        }`}
                    size="lg"
                    aria-labelledby="Tagembed Feature Popup"
                    centered
                    backdrop="static"
                    animation={false}
                    enforceFocus={true}
                    autoFocus={true}
                    restoreFocus={true}
                    keyboard={true}
                    onEnter={this.slideWithArrowKeys}
                >
                    {!isMobile ? (
                        <div
                            style={{
                                display:
                                    wall.Personalization.popupSlideShow !== 1 ? "none" : "",
                            }}
                            className={`popArrowSlide ${data.type === 4 || data.type === 5
                                ? `modal-text-image`
                                : data.type === 2 || data.type === 3
                                    ? `modal-only-image`
                                    : `modal-only-text`
                                }`}
                        >
                            <span
                                style={{ cursor: "pointer" }}
                                className="slideBtn preBtn"
                                onClick={this.onClickSlider(currentIndex - 1)}
                            >
                                <img
                                    src="https://cdn.tagembed.com/app/img/slider-right.svg"
                                    alt="Pre"
                                />
                            </span>
                            <span
                                style={{ cursor: "pointer" }}
                                className="slideBtn nextBtn"
                                onClick={this.onClickSlider(currentIndex + 1)}
                            >
                                <img
                                    src="https://cdn.tagembed.com/app/img/slider-right.svg"
                                    alt="Next"
                                />
                            </span>
                        </div>
                    ) : null}
                    <div
                        className={`modalWrapper ${data.network.id === 31 ? " modalHastagWrapperN31" : ""
                            }`}
                    >
                         <div className="topNav">
                        
                           
                        {wall.Personalization.popupSlideShow === 1 && isMobile ? (
                            <React.Fragment>
                                <span
                                    style={{ cursor: "pointer" }}
                                    className="slideBtn preBtn"
                                    onClick={this.onClickSlider(currentIndex - 1)}
                                >
                                    <img
                                        src="https://cdn.tagembed.com/app/img/slider-right.svg"
                                        alt="Pre"
                                    />
                                </span>
                                <span
                                    style={{ cursor: "pointer" }}
                                    className="slideBtn nextBtn"
                                    onClick={this.onClickSlider(currentIndex + 1)}
                                >
                                    <img
                                        src="https://cdn.tagembed.com/app/img/slider-right.svg"
                                        alt="Next"
                                    />
                                </span>
                            </React.Fragment>
                        ) : null}
                        <div className="modalCloseWrapper">
                            <button
                                type="button"
                                className="modalClose"
                                data-dismiss="modal"
                                onClick={onHide}
                                aria-label="Close"
                            ></button>
                        </div>

                            </div>
                        {/* IMAGE WRAPPER */}
                       
                        {Object.keys(data).pop() == "imageList" && imageList.length > 0 ? (
                            this.multiImage(imageList)
                        ) :
                            (data.type === 2 || data.type === 4 ? (
                                <div
                                    className={`tagembedImageWrapper imageCardN${data.network.id}`}
                                >
                                    <div className="popupBlurimg">
                                    <Suspense>
                                   
                                        <img
                                            id={`img${data.id}`}
                                            style={{ maxHeight: "500px !important", opacity: 1 }}
                                            src={data.file}
                                            alt=""
                                            data-network={data.network.id}
                                            data-item-id={data.id}
                                            data-pop-id={data.id}
                                            data-feed-id={data.feedId}
                                            data-wall-id={wallId}
                                            data-plan-id={wall.UserDetail.planId}
                                            data-load="0"
                                            onError={dataUpdates}
                                            onLoad={(e) => {
                                                if (
                                                    e.target.src ==
                                                    "https://cdn.tagembed.com/app/image/blur-img.jpg"
                                                ) 
                                                this.getHeightAfterChange(e.target.height);
                                            }}
                                        />
                                       
                                        <img
                                            id={`img${data.id}`}
                                            style={{ maxHeight: "500px !important", opacity: 1 }}
                                            src={data.file}
                                            //src="https://cdn.tagembed.com/app/image/blur-img.jpg"
                                            alt=""
                                            data-network={data.network.id}
                                            data-item-id={data.id}
                                            data-pop-id={data.id}
                                            data-feed-id={data.feedId}
                                            data-wall-id={wallId}
                                            data-plan-id={wall.UserDetail.planId}
                                            data-load="0"
                                            //onError={dataUpdates}
                                            onLoad={(e) => {
                                                if (
                                                    e.target.src ==
                                                    "https://cdn.tagembed.com/app/image/blur-img.jpg"
                                                ) 
                                                this.getHeightAfterChange(e.target.height);
                                            }}
                                        />
                                     </Suspense>
                                    </div>
                                </div>
                            ) : data.type === 1 ? (
                                <div
                                    className={`tagembedImageWrapper videoPost imageCardN${data.network.id}`}
                                ></div>
                            ) : (data.type === 3 || data.type === 5) &&
                                (data.link.indexOf("youtube") >= 0 ||
                                    data.mediaUrl.indexOf("youtube") >= 0 ||
                                    data.mediaUrl.indexOf("tiktok") >= 0 ||
                                    data.link.indexOf("tiktok") >= 0 ||
                                    data.link.indexOf("twitter") >= 0 ||
                                    data.mediaUrl.indexOf("twitter") >= 0 ||
                                    data.link.indexOf("youtu.be") >= 0 ||
                                    data.link.indexOf("vimeo") ||
                                    data.link.indexOf("Tumblr") >= 0) ? (
                                <div
                                    className={`tagembedImageWrapper iframeVideo videoMax100 imageCardN${data.network.id
                                        }  ${data.network.id === 31 && data.mediaUrl !== ""
                                            ? "modalHastagWrapperN31"
                                            : ""
                                        }`}
                                >
                                    {data.network.id === 31 && data.mediaUrl === "" ? (
                                        <Tiktoks data={data} key={data.id} />
                                    ) : data.network.id === 32 || data.network.id === 25 ? (
                                        <Iframe
                                            src={`${data.mediaUrl} allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"`}
                                            styles={"100%"}
                                            className="videoMax100"
                                        />
                                    ) : data.network.id === 2 ||
                                        data.network.id === 3 ||
                                        data.network.id === 18 ? (
                                        <video
                                            controls={true}
                                            className="videoMax100"
                                            autoPlay={true}
                                            preload="auto"
                                            src={`${data.mediaUrl}`}
                                            style={{ maxHeight: "100%" }}
                                            data-network={data.network.id}
                                            data-item-id={data.id}
                                             data-feed-id={data.feedId}
                                            //data-wall-id={wallId}
                                             // chnages done for video tag expiry post before it was wallId
                                             data-wall-id={wall.Personalization.wallId}
                                            data-plan-id={wall.UserDetail.planId}
                                            onError={(e) => {
                                                if (
                                                    e.target.src !=
                                                    "https://cdn.tagembed.com/app/image/blur-img.jpg"
                                                ) {
                                                    loopUpdateDataVideo(e);
                                                } else {
                                                    loopUpdateDataVideo(e);
                                                }
                                                this.getHeightAfterChange(e.target.height);
                                            }}
                                        ></video>
                                    ) : data.network.id === 7 || data.network.id === 8 ? (
                                        <ReactPlayer
                                            className="ReactPlayer"
                                            loop={false}
                                            controls={true}
                                            width={800}
                                            height={data.network.id === 8 ? '100%' : '100%'}
                                            playsinline={true}
                                            url={`${data.mediaUrl}`}
                                            data-network={data.network.id}
                                            data-item-id={data.id}
                                            data-wall-id={wallId}
                                            data-plan-id={wall.UserDetail.planId}
                                            onError={(e) => loopUpdateDataVideo(e)}
                                        />
                                    ) : (
                                         /* for linkedIn youtube video url */ 
                                        (newURL.includes("youtube") && data.network.id == 10)  ? <Iframe
                                        poster={data.link}
                                        src={data.mediaUrl}
                                        styles={{ maxHeight: data.network.id == 8 ? 170 : "100%" }}
                                        className="videoMax100"
                                    /> : 
                                        <video
                                            id="video"
                                            loop={false}
                                            controls={true}
                                            width={"100%"}
                                            height={"100%"}
                                            playsInline={true}
                                            src={`${data.mediaUrl}`}
                                            data-network={data.network.id}
                                            data-item-id={data.id}
                                            //data-wall-id={wallId}
                                             // chnages done for video tag expiry post before it was wallId
                                             data-wall-id={wall.Personalization.wallId}
                                            data-plan-id={wall.UserDetail.planId}
                                            onError={(e) => loopUpdateDataVideo(e)}
                                        />
                                    )}
                                </div>
                            ) : data.link.indexOf("soundcloud") >= 0 ||
                                data.link.indexOf("vk") >= 0 ? (
                                <div className="tg-embed-iframe">

                                    <Iframe
                                        poster={data.link}
                                        src={data.mediaUrl}
                                        styles={{ maxHeight: data.network.id == 8 ? 170 : "100%" }}
                                        className="videoMax100"
                                    />
                                </div>
                            ) : (
                                <div
                                    className={`tagembedImageWrapper videoPost imageCardN${data.network.id}`}
                                    style={isVideoError ? noVideoStyle : null}
                                >
                                    {isVideoError ? (
                                        <img
                                            src="https://cdn.tagembed.com/app/image/blur-img.jpg"
                                            style={{
                                                visibility: "visible!important",
                                                margin: "0px auto",
                                                objectFit: "contain",
                                            }}
                                            alt=""
                                        />
                                    ) : (
                                        <video
                                            controls={true}
                                            className="videoMax100"
                                            preload="none"
                                            poster={data.file}
                                            src={data.mediaUrl}
                                            onError={this.onErrorVideo}
                                            style={{ maxHeight: "100%" }}
                                            onProgress={(e) => {
                                                this.getHeightAfterChange(e.target.height);
                                            }}
                                            onPlay={(e) => {
                                                this.getHeightAfterChange(e.target.height);
                                            }}
                                        ></video>
                                    )}
                                </div>
                            ))

                        }









                        {/* CONTENT WRAPPER */}
                        {data.network.id == 31 && data.mediaUrl == "" ? null : (
                            <div
                                className={`tagembedContentWrapper contentCardN${data.network.id}`}
                                style={{ backgroundColor: wall.ThemeRule.cardColor }}
                            >
                                <Helmet>
                                    <script
                                        src="https://kit.fontawesome.com/2c8c0b245c.js"
                                        crossorigin="anonymous"
                                    ></script>
                                </Helmet>
                                <div className="postAuthorWrapper">
                                    <img
                                        className={`postAuthorImage ${data.network.id !== 4 ? "roundedCircle" : "border-none"
                                            }`}
                                        style={{
                                            display:
                                                wall.Personalization.postAuthor != 1 ||
                                                    data.author.name === "Instagram User"
                                                    ? "none"
                                                    : "",
                                        }}
                                        src={data.author.picture}
                                        alt=""
                                        data-check="checked"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = data.author.errorPic
                                                ? data.author.errorPic
                                                : onErrorImg;
                                        }}
                                    />

                                    <div className="postAuthorDetails">
                                        <div
                                            className="postAuthorName textTruncate"
                                            style={{
                                                display:
                                                    wall.Personalization.postAuthor === 0 ||
                                                        data.author.username == "Instagram User"
                                                        ? "none"
                                                        : "",
                                                color: fontColorIfWhite(
                                                    "#ffffff",
                                                    wall.ThemeRule.authorColor,
                                                    "#333",
                                                    wall.Personalization.widgetTheme
                                                ),
                                            }}
                                        >
                                            {data.author.name}
                                        </div>
                                        <div className="postAuthorShort">
                                            <div
                                                className="postAuthorHandle textTruncate"
                                                style={{
                                                    display:
                                                        wall.Personalization.postAuthor == 0 ||
                                                            data.author.name === "Instagram User"
                                                            ? "none"
                                                            : "",
                                                    color: fontColorIfWhite(
                                                        "#ffffff",
                                                        wall.ThemeRule.authorColor,
                                                        "#333",
                                                        wall.Personalization.widgetTheme
                                                    ),
                                                }}
                                            >
                                                {" "}
                                                @{data.author.username}
                                            </div>
                                            <div
                                                className="sepratedot"
                                                style={{
                                                    display:
                                                        wall.Personalization.postAuthor == 0 ||
                                                            data.timePost == 0 ||
                                                            data.author.name === "Instagram User"
                                                            ? "none"
                                                            : "",
                                                    color: fontColorIfWhite(
                                                        "#ffffff",
                                                        wall.ThemeRule.authorColor,
                                                        "#333",
                                                        wall.Personalization.widgetTheme
                                                    ),
                                                }}
                                            ></div>
                                            <span
                                                style={{
                                                    display:
                                                        data.timePost == 0 ||
                                                            data.author.name === "Instagram User"
                                                            ? "none"
                                                            : "",
                                                    color: fontColorIfWhite(
                                                        "#ffffff",
                                                        wall.ThemeRule.authorColor,
                                                        "#333",
                                                        wall.Personalization.widgetTheme
                                                    ),
                                                }}
                                                className="timePost"
                                            >
                                                {moment(new Date(data.createdAt * 1000)).fromNow()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="postNetwork" data-network={data.network.name}>
                                        {data.network.name == "slack" ? (
                                            <i className="fab fa-slack" />
                                        ) : (
                                            <NetworkIconModal data={data} wall={wall} />
                                        )}
                                    </div>
                                </div>
                                <div
                                    className="modalOnlyContent"
                                    style={{
                                        display:
                                        (wall.ThemeRule.hideContent == 1 && data.type != 1) ? "none" : (wall.ThemeRule.hideContent == 0 && (data.type == 2 || data.type == 3)) ? "none": '' ,
                                        height:
                                            getHeightContent && data.content !== ""
                                                ? data.type === 2 || data.type === 4
                                                    ? realHeight - 105
                                                    : data.type === 1
                                                        ? "auto"
                                                        : (data.type === 3 || data.type === 5) &&
                                                            (data.link.indexOf("youtube") >= 0 ||
                                                                data.link.indexOf("soundcloud") >= 0 ||
                                                                data.link.indexOf("youtu.be") >= 0 ||
                                                                data.link.indexOf("vimeo") >= 0 ||
                                                                data.link.indexOf("Tumblr") >= 0)
                                                            ? "auto"
                                                            : getHeightContent
                                                : "auto",
                                    }}
                                >
                                    {data.rating != null ? (
                                        <div className="rating">
                                            <img
                                                src={`https://cdn.tagembed.com/app/img/rating/${data.network.id}/${data.rating}.png`}
                                                alt=""
                                            />
                                        </div>
                                    ) : null}
                                    {fontText !== null && fontText !== "" ? (
                                        <link
                                            href={
                                                "https://fonts.googleapis.com/css2?family=" +
                                                fontText +
                                                "&display=swap"
                                            }
                                            rel="stylesheet"
                                        />
                                    ) : null}
                                    <div
                                        className={
                                            fontText
                                                ? `postedText ${data.textDecoClass}`
                                                : `postedText ${data.textDecoClass} setFont font${wall.ThemeRule.font}`
                                        }
                                        style={{
                                            display:
                                                data.hideContent === 1 && data.type !== 1
                                                    ? "none"
                                                    : "block",
                                            fontSize: wall.ThemeRule.fontSize,
                                            textAlign: "left",
                                            color: fontColorIfWhite(
                                                "#ffffff",
                                                wall.ThemeRule.fontColor,
                                                "#333",
                                                wall.Personalization.widgetTheme
                                            ),
                                            fontFamily: `${fontText ? fontText : " "}`,
                                        }}
                                    >
                                        {data.contentTitle != "" ? (
                                            <p> {data.contentTitle} </p>
                                        ) : null}
                                        <p className="chtrLimits emojiApplied">
                                            <ContentConversion
                                                trimContent={Math.trunc(1000 / 5)}
                                                fdata={data}
                                                key={currentIndex}
                                                contentData={data.content}
                                                fullcontentData={data.fullcontent}
                                                personalization={wall.Personalization}
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div className="socialPanel">
                                    <div className="socialIconPanel">
                                        <SocialIconPanel data={data} wall={wall} />
                                    </div>
                                    <SocialPanel
                                        data={data}
                                        viewOnText={viewOnText}
                                        wall={wall}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </Modal>
            </React.Fragment>
        ) : null;
    }
}

export default popup;



// import React, { PureComponent, Suspense } from 'react';
// import Modal from 'react-bootstrap/Modal'
// import moment from "moment";
// import $ from 'jquery'
// import { isMobile } from "react-device-detect";
// import ContentConversion from './contentConversion';
// import './popup.scss';
// import ReactPlayer from 'react-player'
// import Tiktoks from './tiktok'
// import Iframe from 'react-iframe';
// import Helmet from 'react-helmet'
// import { dataUpdate, loopUpdateDataVideo } from '../../utils'


// const noVideoStyle = { alignSelf: 'center', textAlign: 'center' }

// const NetworkIconModal = ({ data, wall }) => {

//     if (data.network.icon !== null) {
//         var f = data.network.icon.substring(3);
//         if (data.network.name !== "RSS") {
//             if (
//                 data.network.name !== "Workplace" && data.network.name !== "Google Review" && data.network.id !== 21 && data.network.id !== 28 && data.network.id !== 26 || (data.network.id === 4 && wall.ThemeRule.fontColor === '#ffffff')
//             ) {
//                 return (
//                     <i className={`fab fa-${f === "facebook" ? "facebook-f" : f} fa-2x`}
//                         style={{ color: data.iconColor }}></i>
//                 );
//             } else if (data.network.name === "SMS") {
//                 return (
//                     <i className={`fab fa-envelope fa-2x`} style={{ color: data.iconColor }}></i>
//                 );
//             } else if (data.network.name === "Workplace") {
//                 return <i className="fa icon-taggbox-workplace-2 fa-2x" style={{ color: data.iconColor }}> </i>;
//             } else if (data.network.name === "Slack") {
//                 return <i className="fab fa-slack fa-2x" style={{ color: data.iconColor }}> </i>;
//             } else if (data.network.id === 21) {
//                 return <i className="fab fa-yammer fa-2x" style={{ color: data.iconColor }}> </i>;
//             } else if (data.network.id === 26) {
//                 return <i className="fa fa-giphy fa-2x" style={{ color: data.iconColor }}> </i>;
//             } else if (data.network.id === 28) {
//                 return <i className="fa fa-capterra fa-2x" style={{ color: data.iconColor }}> </i>;
//             } else if (data.network.id === 4) {
//                 return <i className="fab fa-google-new fa-2x" style={{ color: data.iconColor }}> </i>;
//             } else if (data.network.id === 10) {
//                 return <i className="fab fa-linkedin-in fa-2x" style={{ color: data.iconColor }}> </i>;
//             } else return false
//         } else {
//             return (
//                 <i className={`fab fa-rss fa-2x`} style={{ color: data.iconColor }}></i>
//             );
//         }

//     } else {
//         return null;
//     }
// };
// const capitalize = (s) => {
//     if (typeof s !== "string") return "";
//     return s.charAt(0).toUpperCase() + s.slice(1);
// };

// const SocialPanel = ({ data, viewOnText , wall }) => {
//     if (
//         data.network.name === "SMS" ||
//         data.network.name === "Whatsapp" ||
//         data.network.icon === null ||
//         data.link === null ||
//         data.network.name === null
//     ) {
//         return null;
//     } else {
//         return (
//             <a
//                 style={{ textTransform: "capitalize!important" , color: fontColorIfWhite("#ffffff", wall.ThemeRule.fontColor , "#333",  wall.Personalization.widgetTheme) }}
//                 className={`popupSocialLink ${data.network.name}`}
//                 href={data.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//             >
//                 {`${viewOnText.toString()} ${data.network.name !== "Vimeo" && data.network.name != "Google Review" && data.network.name != "Giphy" && data.network.name != "Workplace"
//                     ? capitalize(data.network.icon.substring(3))
//                     : capitalize(data.network.name)} `} <i className="fa fa-external-link"></i>
//             </a>
//         );
//     }
// };


// const SocialIconPanel = ({ data, wall }) => {
//     return (
//         <>
//             {(data.network.name !== "Twitter") ?
//                 <a
//                     href={data.share.facebook}
//                     style={{ color: fontColorIfWhite("#ffffff", data.iconColor, "#6a6a6a", wall.Personalization.widgetTheme) }}
//                     className="fbPanel"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 > <i className={`fa fa-facebook-f`}></i>
//                 </a>
//                 : ''}
//             <a
//                 href={data.share.twitter}
//                 style={{ color: fontColorIfWhite("#ffffff", data.iconColor, "#6a6a6a", wall.Personalization.widgetTheme) }}
//                 className="twPanel"
//                 target="_blank"
//                 rel="noopener noreferrer"
//             > <i className={`fa fa-twitter`}></i>
//             </a>
//             <a
//                 href={data.share.linkedin}
//                 style={{ color: fontColorIfWhite("#ffffff", data.iconColor, "#6a6a6a", wall.Personalization.widgetTheme) }}
//                 className="linkedinPanel"
//                 target="_blank"
//                 rel="noopener noreferrer"
//             > <i className={`fa fa-linkedin`}></i>
//             </a>
//         </>
//     );
// };

// const fontColorIfWhite = (white, color, defaultColor, theme) => (white === color && theme === 4) || (white === color && theme === 16) || (white === color && theme === 50) || (white === color && theme === 55) ? defaultColor : color;

// var checkNull = false;

// class popup extends PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//             man: this.props.data,
//             cond: 0,
//             viewOnText: this.props.data.viewOnText,
//             fam: this.props.data.idArray,
//             personalization: this.props.data.personalization,
//             currentIndex: this.props.data.index,
//             isVideoError: false,
//             getHeightContent: null,
//             realHeight: null,
//         };
//         this.getHeightAfterChange.bind(this);
//         this.slideWithArrowKeys.bind(this);
//         this.onClickSlider.bind(this);

//     }


//     componentWillReceiveProps(nextProps) {
//         const { currentIndex, data } = nextProps;

//         if (currentIndex === 0 && checkNull === false) {
//             this.setState({ currentIndex: currentIndex, data: data, isVideoError: false });
//             checkNull = false;
//         } else {
//             checkNull = true;
//         }
//     }

//     /*To Display error video Start */
//     onErrorVideo = (e) => {
//         this.setState({ isVideoError: true })
//     }
//     /*To Display error video End */

//     /* To scroll popup slider on click Start */
//     onClickSlider = (j) => event => {

//         const { man } = this.state;
//         if (j === -1) {
//             this.setState({ currentIndex: man.idArray.length - 1 });
//         } else {
//             this.setState({ currentIndex: man.idArray.length == j ? 0 : j });
//         }

//     };
//     /* To scroll popup slider on click End */

//     SliderWithKey = (j) => {
//         const { man } = this.state;
//         if (j === -1) this.setState({ currentIndex: man.idArray.length - 1 });
//         else this.setState({ currentIndex: man.idArray.length == j ? 0 : j });
//     };

//     componentDidMount() {
//         this.setState({ cond: 1 });
//         $(document).keydown(function () {
//             this.slideWithArrowKeys();
//         }.bind(this));

        
//     }

//     getHeightAfterChange = (h) => {
//         let modalWrapper = document.querySelector(".modalWrapper");
//         if (!isMobile) {
//             this.setState({ getHeightContent: (h) ? h - 130 : modalWrapper.offsetHeight - 130 });
//         }

//     }

//     /* to slide popup with arrow keys Start */
//     slideWithArrowKeys = e => {
//         const { man } = this.state;

//         if (man && man.card && man.personalization && this.props.wall.Personalization.popupSlideShow === 1) {
//             e = e || window.event;
//             let self = this;
//             if (e && e.keyCode && e.keyCode != undefined) {
//                 if (e.keyCode == '37') {
//                     self.SliderWithKey(self.state.currentIndex - 1)
//                     this.setState({ getHeightContent: 0 });
//                 } else if (e.keyCode == '39') {
//                     self.SliderWithKey(self.state.currentIndex + 1)
//                     this.setState({ getHeightContent: 0 });

//                 }
//             }
//         }
//     }

//     /* to slide popup with arrow keys End */

//     render() {
//         const { show, onHide, wallId, wall } = this.props;
//         let {
//             isVideoError,
//             fam,
//             man,
//             currentIndex,
//             personalization,
//             viewOnText,
//             cond,
//             getHeightContent,
//             realHeight
//         } = this.state;
//         let fontText = this.props.wall.ThemeRule.fontText
//         let data = this.props.data.card;

//         /*-- incase we want to remove avatar | let onErrorImg = 'https://cdn.tagembed.com/app/img/author2.png'; -- */
//         let onErrorImg = `https://ui-avatars.com/api/?name=${data.author.username}&background=123&color=fff&rounded=true`


//         if (currentIndex === -1) {
//             data = fam[man.idArray.length - 1];
//         } else {
//             data = fam[currentIndex];

//         }

//         return (fam && fam.length > 0 && data && Object.keys(data).length > 0 && ((cond === 1 && data !== '')) ?
//             <React.Fragment>
        
//                 <Modal
//                     key={data.id}
//                     id="tagembedPopup"
//                     show={show}
//                     onHide={onHide}
//                     className={`${(isMobile) ? 'onMobileContent' : ''} tagembedModal ${(wall.ThemeRule.hideContent == 1 && data.type != 1 && (data.type === 4 || data.type === 5)) ? `modal-only-image` : (data.type === 4 || data.type === 5) ? `modal-text-image` : (data.type === 2 || data.type === 3) ? `modal-only-image` : `modal-only-text`} ${data.mediaUrl === '' ? data.network.id === 31 && (data.type === 3 || data.type === 5) ? 'tiktopPopupwrap' : '' : ''}`}
//                     size="lg"
//                     aria-labelledby="Tagembed Feature Popup"
//                     centered
//                     backdrop="static"
//                     animation={false}
//                     enforceFocus={true}
//                     autoFocus={true}
//                     restoreFocus={true}
//                     keyboard={true}
//                     onEnter={this.slideWithArrowKeys}
//                 >
//                     {!isMobile ?
//                         <div style={{ display: wall.Personalization.popupSlideShow !== 1 ? 'none' : '' }}
//                             className={`popArrowSlide ${(data.type === 4 || data.type === 5) ? `modal-text-image` : (data.type === 2 || data.type === 3) ? `modal-only-image` : `modal-only-text`}`}>
//                             <span style={{ cursor: 'pointer' }} className="slideBtn preBtn"
//                                 onClick={this.onClickSlider(currentIndex - 1)}><img
//                                     src='https://cdn.tagembed.com/app/img/slider-right.svg' alt="Pre" /></span>
//                             <span style={{ cursor: 'pointer' }} className="slideBtn nextBtn"
//                                 onClick={this.onClickSlider(currentIndex + 1)}><img
//                                     src='https://cdn.tagembed.com/app/img/slider-right.svg' alt="Next" /></span>
//                         </div>
//                         : null
//                     }
//                     <div className={`modalWrapper ${data.network.id === 31 ? " modalHastagWrapperN31" : ''}`}>
//                         <div className="modalCloseWrapper">
//                             <button type="button" className="modalClose" data-dismiss="modal" onClick={onHide}
//                                 aria-label="Close"></button>
//                         </div>

//                         {wall.Personalization.popupSlideShow === 1 && isMobile ?
//                             <React.Fragment>
//                                 <span style={{ cursor: 'pointer' }} className="slideBtn preBtn"
//                                     onClick={this.onClickSlider(currentIndex - 1)}><img
//                                         src='https://cdn.tagembed.com/app/img/slider-right.svg' alt="Pre" /></span>
//                                 <span style={{ cursor: 'pointer' }} className="slideBtn nextBtn"
//                                     onClick={this.onClickSlider(currentIndex + 1)}><img
//                                         src='https://cdn.tagembed.com/app/img/slider-right.svg' alt="Next" /></span>
//                             </React.Fragment>
//                             : null
//                         }
//                         {/* IMAGE WRAPPER */}
//                         {
//                             (data.type === 2 || data.type === 4) ?
//                                 <div className={`tagembedImageWrapper imageCardN${data.network.id}`}>
//                                     <Suspense>
//                                         <div className="popupBlurimg">
//                                             <img id="img" style={{ maxHeight: "500px !important", opacity: 1 }}
//                                                 src={data.file} alt="" data-network={data.network.id}
//                                                 data-item-id={data.id}
//                                                 data-wall-id={wallId}
//                                                 data-plan-id={wall.UserDetail.planId}
//                                                 data-load="0"
//                                                 onError={(e) => dataUpdate(e)}
//                                                 onLoad={(e) => {
//                                                     if (e.target.src == 'https://cdn.tagembed.com/app/image/blur-img.jpg') {
//                                                         dataUpdate(e)
//                                                     }
//                                                     this.getHeightAfterChange(e.target.height);
//                                                 }} />
//                                             <img id="img" style={{ maxHeight: "500px !important", opacity: 1 }}
//                                                 src={data.file} alt="" data-network={data.network.id}
//                                                 data-item-id={data.id}
//                                                 data-wall-id={wallId}
//                                                 data-plan-id={wall.UserDetail.planId}
//                                                 data-load="0"
//                                                 onError={(e) => dataUpdate(e)}
//                                                 onLoad={(e) => {
//                                                     if (e.target.src == 'https://cdn.tagembed.com/app/image/blur-img.jpg') {
//                                                         dataUpdate(e)
//                                                     }
//                                                     this.getHeightAfterChange(e.target.height);
//                                                 }} />
//                                         </div>
//                                     </Suspense>
//                                 </div> : (data.type === 1) ? <div
//                                     className={`tagembedImageWrapper videoPost imageCardN${data.network.id}`}></div> :
//                                     ((data.type === 3 || data.type === 5)
//                                         && (data.link.indexOf("youtube") >= 0 || data.mediaUrl.indexOf("youtube") >= 0
//                                             || data.mediaUrl.indexOf("tiktok") >= 0 || data.link.indexOf("tiktok") >= 0
//                                             || data.link.indexOf("twitter") >= 0
//                                             || data.mediaUrl.indexOf("twitter") >= 0 || data.link.indexOf("youtu.be") >= 0 || data.link.indexOf("vimeo") || data.link.indexOf("Tumblr") >= 0)) ?
//                                         <div
//                                             className={`tagembedImageWrapper iframeVideo videoMax100 imageCardN${data.network.id}  ${data.network.id === 31 && data.mediaUrl !== '' ? "modalHastagWrapperN31" : ''}`}>
//                                             {data.network.id === 31 && data.mediaUrl === '' ?
//                                                 <Tiktoks data={data} key={data.id} /> : data.network.id === 32 ?
//                                                     <Iframe
//                                                         src={`${data.mediaUrl} allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"`}
//                                                         styles={"100%"}
//                                                         className="videoMax100" /> : data.network.id === 2 || data.network.id === 3 || data.network.id === 18 ?
//                                                         <video
//                                                             controls={true}
//                                                             className="videoMax100"
//                                                             preload="none"
//                                                             autoPlay={true}
//                                                             src={`${data.mediaUrl}`}
//                                                             style={{ maxHeight: '100%' }}
//                                                             data-network={data.network.id}
//                                                             data-item-id={data.id}
//                                                             data-wall-id={wallId}
//                                                             data-plan-id={wall.UserDetail.planId}
//                                                             onError={(e) => {
//                                                                 if (e.target.src != 'https://cdn.tagembed.com/app/image/blur-img.jpg') {
//                                                                     loopUpdateDataVideo(e)
//                                                                 }
//                                                                 else { loopUpdateDataVideo(e) }
//                                                                 this.getHeightAfterChange(e.target.height)
//                                                             }}
//                                                         >
//                                                         </video> : data.network.id === 7 || data.network.id === 8 ?
//                                                             <ReactPlayer
//                                                                 className='ReactPlayer'
//                                                                 loop={false}
//                                                                 controls={true}
//                                                                 playing
//                                                                // light={true}
//                                                                 width={data.network.id === 7 ? 700 : "100%"}
//                                                                 height={data.network.id === 7 ? 500 : "inherit"}
//                                                                 playsinline={true}
//                                                                 url={`${data.mediaUrl}`}
//                                                                 data-network={data.network.id}
//                                                                 data-item-id={data.id}
//                                                                 data-wall-id={wallId}
//                                                                 data-plan-id={wall.UserDetail.planId}
//                                                                 onError={(e) => loopUpdateDataVideo(e)}
//                                                             /> : <video
//                                                                 id="video"
//                                                                 loop={false}
//                                                                 controls={true}
//                                                                 width={"100%"}
//                                                                 height={"100%"}
//                                                                 playsInline={true}
//                                                                 src={`${data.mediaUrl}`}
//                                                                 data-network={data.network.id}
//                                                                 data-item-id={data.id}
//                                                                 data-wall-id={wallId}
//                                                                 data-plan-id={wall.UserDetail.planId}
//                                                                 onError={(e) => loopUpdateDataVideo(e)}
//                                                             />
//                                             }
//                                         </div> : data.link.indexOf("soundcloud") >= 0 || data.link.indexOf("vk") >= 0 ?
//                                             <div className="tg-embed-iframe">
//                                                 <Iframe
//                                                     poster={data.link}
//                                                     src={data.mediaUrl}
//                                                     styles={{ maxHeight: data.network.id == 8 ? 170 : "100%" }}
//                                                     className="videoMax100" /></div>
//                                             : <div className={`tagembedImageWrapper videoPost imageCardN${data.network.id}`}
//                                                 style={isVideoError ? noVideoStyle : null}>
//                                                 {isVideoError ? <img src="https://cdn.tagembed.com/app/image/blur-img.jpg"
//                                                     style={{
//                                                         visibility: 'visible!important',
//                                                         margin: '0px auto',
//                                                         objectFit: 'contain'
//                                                     }} alt="" /> :
//                                                     <video
//                                                         controls={true}
//                                                         className="videoMax100"
//                                                         preload="none"
//                                                         poster={(data.file)}
//                                                         src={data.mediaUrl}
//                                                         onError={this.onErrorVideo}
//                                                         style={{ maxHeight: '100%' }}
//                                                         onProgress={(e) => {
//                                                             this.getHeightAfterChange(e.target.height);
//                                                         }}
//                                                         onPlay={(e) => {
//                                                             this.getHeightAfterChange(e.target.height)
//                                                         }}
//                                                     >
//                                                     </video>}
//                                             </div>
//                         }
//                         {/* CONTENT WRAPPER */}
//                         {data.network.id == 31 && data.mediaUrl == '' ? null :
//                             <div className={`tagembedContentWrapper contentCardN${data.network.id}`}
//                                 style={{ backgroundColor: wall.ThemeRule.cardColor }}>
//                                 <Helmet>
//                                     <script src="https://kit.fontawesome.com/2c8c0b245c.js"
//                                         crossorigin="anonymous"></script>
//                                 </Helmet>
//                                 <div className="postAuthorWrapper">
//                                     <img
//                                         className={`postAuthorImage ${(data.network.id !== 4) ? 'roundedCircle' : 'border-none'}`}
//                                         style={{ display: wall.Personalization.postAuthor != 1 || data.author.name === 'Instagram User' ? 'none' : '' }}
//                                         src={data.author.picture} alt="" data-check="checked" onError={(e) => {
//                                             e.target.onerror = null;
//                                             e.target.src = (data.author.errorPic) ? data.author.errorPic : onErrorImg;
//                                         }} />

//                                     <div className="postAuthorDetails">

//                                         <div className="postAuthorName textTruncate" style={{
//                                             display: wall.Personalization.postAuthor === 0 || data.author.username == "Instagram User" ? 'none' : '',
//                                             color: fontColorIfWhite("#ffffff", wall.ThemeRule.authorColor, "#333", wall.Personalization.widgetTheme)
//                                         }}>
//                                             {data.author.name}
//                                         </div>
//                                         <div className="postAuthorShort">
//                                             <div className="postAuthorHandle textTruncate" style={{
//                                                 display: wall.Personalization.postAuthor == 0 || data.author.name === 'Instagram User' ? 'none' : '',
//                                                 color: fontColorIfWhite("#ffffff", wall.ThemeRule.authorColor, "#333", wall.Personalization.widgetTheme)
//                                             }}> @{data.author.username}</div>
//                                             <div className="sepratedot" style={{
//                                                 display: wall.Personalization.postAuthor == 0 || data.timePost == 0 || data.author.name === 'Instagram User' ? 'none' : '',
//                                                 color: fontColorIfWhite("#ffffff", wall.ThemeRule.authorColor, "#333", wall.Personalization.widgetTheme)
//                                             }}></div>
//                                             <span style={{
//                                                 display: data.timePost == 0 || data.author.name === 'Instagram User' ? 'none' : '',
//                                                 color: fontColorIfWhite("#ffffff", wall.ThemeRule.authorColor, "#333", wall.Personalization.widgetTheme)
//                                             }} className="timePost">{moment(
//                                                 new Date(data.createdAt * 1000)
//                                             ).fromNow()}</span>
//                                         </div>
//                                     </div>

//                                     <div className="postNetwork" data-network={data.network.name}>
//                                         {data.network.name == 'slack' ? <i className='fab fa-slack' /> :
//                                             <NetworkIconModal data={data} wall={wall} />}
//                                     </div>
//                                 </div>
//                                 <div className="modalOnlyContent" style={{
//                                     display: wall.ThemeRule.hideContent == 1 && data.type != 1 ? 'none' : '',
//                                     height: (getHeightContent && data.content !== '') ? (data.type === 2 || data.type === 4) ? realHeight - 105 : (data.type === 1) ? 'auto' :
//                                         (data.type === 3 || data.type === 5) &&
//                                             (data.link.indexOf("youtube") >= 0 || data.link.indexOf("soundcloud") >= 0 || data.link.indexOf("youtu.be") >= 0 || data.link.indexOf("vimeo") >= 0 || data.link.indexOf("Tumblr") >= 0)
//                                             ? 'auto' : getHeightContent : 'auto'
//                                 }}>
//                                     {data.rating != null ? <div className="rating">
//                                         <img
//                                             src={`https://app.tagembed.com/img/rating/${data.network.id}/${data.rating}.png`}
//                                             alt="" />
//                                     </div> : null}
//                                     {fontText !== null && fontText !== '' ? <link
//                                         href={'https://fonts.googleapis.com/css2?family=' + fontText + '&display=swap'}
//                                         rel="stylesheet" /> : null}
//                                     <div
//                                         className={fontText ? `postedText ${data.textDecoClass}` : `postedText ${data.textDecoClass} setFont font${wall.ThemeRule.font}`}
//                                         style={{
//                                             display: (data.hideContent === 1 && data.type !== 1) ? 'none' : 'block',
//                                             fontSize: wall.ThemeRule.fontSize, textAlign: 'left',
//                                             color: fontColorIfWhite("#ffffff", wall.ThemeRule.fontColor, "#333", wall.Personalization.widgetTheme),
//                                             fontFamily: `${fontText ? fontText : " "}`
//                                         }}>
//                                         {data.contentTitle != "" ? <p> {data.contentTitle} </p> : null}
//                                         <p className="chtrLimits emojiApplied">

//                                             <ContentConversion trimContent={Math.trunc(1000 / 5)} fdata={data}
//                                                 key={currentIndex} contentData={data.content}
//                                                 fullcontentData={data.fullcontent}
//                                                 personalization={wall.Personalization} />
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="socialPanel">
//                                     <div className="socialIconPanel">
//                                         <SocialIconPanel data={data} wall={wall} />
//                                     </div>
//                                     <SocialPanel data={data} viewOnText={viewOnText} wall={wall}/>
//                                 </div>
//                             </div>
//                         }
//                     </div>
//                 </Modal>
//             </React.Fragment> : null
//         )

//     }
// }

// export default popup;