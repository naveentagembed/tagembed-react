import React, { PureComponent, Fragment, Suspense } from 'react';
import Iframe from 'react-iframe';
import { FILE_PATH, FILE_PATHWAY } from '../../constants'
import ReactPlayer from 'react-player'
import { dataUpdate,dataUpdate1, loopUpdateDataVideo } from '../../utils'

const VideoComponent = ({ data, wallId, wall }) => <>
    {
        ((data.type === 3 || data.type === 5) && (data.link.indexOf("youtube") >= 0 || data.mediaUrl.indexOf("youtube") >= 0 || 
        //commented due to play facebook video in video tag instead of reactplayer-video tag
        //data.mediaUrl.indexOf("facebook") >= 0 || data.link.indexOf("facebook") >= 0 || 
        data.link.indexOf("twitter") >= 0 || data.mediaUrl.indexOf("twitter") >= 0 || data.link.indexOf("youtu.be") >= 0 || data.link.indexOf("Tumblr") >= 0)) || data.mediaUrl.indexOf("vimeo") >= 0 || data.link.indexOf("vimeo") >= 0 ?
            <div className={data.network.id === 7 ? 'tagembedImageWrapper videoMax100 imageCard' : `tagembedImageWrapper iframeVideo videoMax100 imageCardN${data.network.id}`}> 
                <ReactPlayer id="video" loop={false} controls={true} width="100%" height={data.network.id === 8 ? 170 : data.network.id === 7 ? 200 : "100%"} playsinline={true} url={`${data.mediaUrl}`} />
            </div> : data.link.indexOf("soundcloud") >= 0 || data.link.indexOf("vk") >= 0 ?
                <div>
                    <Iframe src={`${data.mediaUrl} allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"`} styles={{ maxHeight: '100%' }} className="videoMax100" />
                </div>
                : data.network.id === 2 || data.network.id === 3 || data.network.id === 18 ?
                    <video controls className="videoMax100 hellodolly" autoPlay={false} preload="auto" poster={(data.file)} src={`${data.mediaUrl}`} style={{ maxHeight: '100%' }} data-network={data.network.id} data-item-id={data.id} data-load="0" data-wall-id={wallId} data-plan-id={wall.UserDetail.planId} data-feed-id={data.feedId}
                    //onError={(e) => { if (e.target.src !== 'https://cdn.tagembed.com/app/image/blur-img.jpg') { loopUpdateDataVideo(e) } }} 
                    onError={(e) => dataUpdate1(e)}
                    >
                    </video> : <video controls className="videoMax100 hello" preload="none" poster={(data.file)} src={data.mediaUrl} style={{ maxHeight: '100%' }} data-network={data.network.id} data-item-id={data.id} data-load="0" data-wall-id={wallId} data-plan-id={wall.UserDetail.planId} data-feed-id={data.feedId} onError={(e) => dataUpdate1(e)} > </video>
    }
</>


class MediaPost extends PureComponent {
    state = { isImage: "" }
    /* To Display image on Load Start */
    onUpdateImage = event => {
        this.setState({ isImage: event.target.src })
        let myImg = document.querySelector(`#image${this.props.item.id}`)
        const height = myImg.naturalHeight;
        const width = myImg.naturalWidth;
        const minHeight = myImg.naturalminHeight;
        myImg.setAttribute("height", height)
        myImg.setAttribute("width", width)
        myImg.setAttribute("minHeight", minHeight)

    }
    render() {
        const { wallId, isFile, type, file, network, imgWidth, item, widgetTheme, personalization, wall, imageList } = this.props;
        const { isImage } = this.state;
        return <Fragment>
            {
                isFile ? <div className="image">
                    {widgetTheme === 4 || widgetTheme === 3 || widgetTheme === 50 ? <React.Fragment>
                        {type === 1 ?
                            <div style={{ backgroundImage: `url(${isImage !== "" ? isImage : file})` }}>
                                <img id={`image${item.id}`} alt="" src={file} onLoad={this.onUpdateImage} style={{ display: 'none' }} data-network={item.network.id} data-wall-id={wallId} data-plan-id={wall.UserDetail.planId} data-link={item.link} data-load="0" data-item-id={item.id} data-feed-id={item.feedId} img-popup={file} onError={(e) => dataUpdate(e)} />
                            </div> :
                            <div style={{ backgroundImage: `url(${isImage !== "" ? isImage : file})`,
                             minHeight: widgetTheme === 4 ? imgWidth : 250, 
                             backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', backgroundPosition: widgetTheme === 3 || widgetTheme === 50 ? 'center center' : 'top center', width: 'auto', 
                        //aspectRatio: wall.ThemeRule.aspectRatio === 1 ? wall.ThemeRule.aspectImageRatio : '', 
                        aspectRatio: (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? '' : wall.ThemeRule.aspectImageRatio,
                             borderRadius: widgetTheme === 3 ? '' : wall.ThemeRule.cardCurve + 'px' }}>
                                <img id={`image${item.id}`} alt="" src={file} onLoad={this.onUpdateImage} style={{ display: 'none' }} data-network={item.network.id} data-plan-id={wall.UserDetail.planId} data-wall-id={wallId} data-feed-id={item.feedId} data-item-id={item.id} img-popup={file} data-load="0" onError={(e) => dataUpdate(e)} />
                            </div>
                        }
                    </React.Fragment> : <React.Fragment>
                        {type === 1 ? <Suspense>
                            <img id={`image${item.id}`} onLoad={this.onUpdateImage} alt=""
                                style={{ minHeight: widgetTheme === 4 ? imgWidth : 250, width: '100%', backgroundSize: 'cover', backgroundPosition: '50%', backgroundRepeat: 'no-repeat', height: widgetTheme === 4 ? imgWidth : 'auto', transition: 'opacity 0.25s ease-in 0.5s' }}
                                src={file} wrapperclassname="fade-in imgDisplay" data-network={item.network.id} data-plan-id={wall.UserDetail.planId} data-feed-id={item.feedId} data-link={item.link} data-wall-id={wallId} data-load="0" data-item-id={item.id} onError={(e) => dataUpdate(e)} />
                        </Suspense>
                            : <Suspense>
                                {personalization.postFeatured === 0 && personalization.mobilePopup == 0 && (type === 3 || type === 5 && !(type === 2 || type === 4))
                                    ? <VideoComponent data={item} wallId={wallId} wall={wall} />
                                    : <img id={`image${item.id}`} onLoad={this.onUpdateImage} alt=""
                                        style={{ minHeight: (network.id == 8 ? '' : 250), width: '100%', height: widgetTheme === 4 ? imgWidth : 'auto', transition: 'opacity 0.25s ease-in 0.5s', backgroundSize: 'cover', backgroundPosition: '50%', backgroundRepeat: 'no-repeat', 
                                        //aspectRatio: wall.ThemeRule.aspectRatio === 1 ? wall.ThemeRule.aspectImageRatio : '' 
                                        aspectRatio: (wall.ThemeRule.aspectImageRatio === 0 || wall.ThemeRule.aspectImageRatio === null) ? '' : wall.ThemeRule.aspectImageRatio 
                                    }}
                                        wrapperclassname="imgDisplay imgBlock" src={file} data-network={item.network.id} data-plan-id={wall.UserDetail.planId} data-link={item.link} data-feed-id={item.feedId}
                                        data-wall-id={wallId} data-load="0" data-item-id={item.id}
                                        onError={(e) => dataUpdate(e)} />
                                }
                            </Suspense>}
                    </React.Fragment>
                    }
                    {item.mediaUrl && (personalization.postFeatured === 1 || personalization.mobilePopup === 1) ? <div className="videoIcon"> {network.id === 7 ? <img src={`${FILE_PATHWAY}img/youtube.png`} alt="" style={{ height: 72, width: 72 }} /> : <img src={`${FILE_PATHWAY}img/play.png`} alt="" style={{ height: 72, width: 72 }} />} </div> : null}
                    {Object.keys(item.imageList).length > 0 ? <div className="multipostIcon"> <img src={`${FILE_PATHWAY}img/svg-icon/multi-post.svg`} alt="" /> </div> : null}
                </div> : null
            }
            {
                (type === 3 || type === 5) && (personalization.postFeatured === 1 || personalization.mobilePopup === 1) && !isFile ?
                    <div className="image">
                        <img src={`${FILE_PATHWAY}img/blank.jpg`} alt="" />
                        <div className="videoIcon">
                            {network.id === 7 ? <img src={`${FILE_PATHWAY}img/youtube.png`} alt="" style={{ height: 72, width: 72 }} /> : <img src={`${FILE_PATHWAY}img/play.png`} alt="" style={{ height: 72, width: 72 }} />}
                        </div>
                    </div> : null
            }
        </Fragment>
    }
}
export default MediaPost;


// old before expiry post on card while popup is off //

// import React, { PureComponent, Fragment, Suspense } from 'react';
// import Iframe from 'react-iframe';
// import { FILE_PATH } from '../../constants'
// import ReactPlayer from 'react-player'
// import { dataUpdate, loopUpdateDataVideo } from '../../utils'

// const VideoComponent = ({ data, wallId, wall }) => <>
//     {
//         ((data.type === 3 || data.type === 5) && (data.link.indexOf("youtube") >= 0 || data.mediaUrl.indexOf("youtube") >= 0 || data.mediaUrl.indexOf("facebook") >= 0 || data.link.indexOf("facebook") >= 0 || data.link.indexOf("twitter") >= 0 || data.mediaUrl.indexOf("twitter") >= 0 || data.link.indexOf("youtu.be") >= 0 || data.link.indexOf("Tumblr") >= 0)) || data.mediaUrl.indexOf("vimeo") >= 0 || data.link.indexOf("vimeo") >= 0 ?
//             <div className={data.network.id === 7 ? 'tagembedImageWrapper videoMax100 imageCard' : `tagembedImageWrapper iframeVideo videoMax100 imageCardN${data.network.id}`}>
//                 <ReactPlayer id="video" loop={false} controls={true} width="100%" height={data.network.id === 8 ? 170 : data.network.id === 7 ? 200 : "100%"} playsinline={true} url={`${data.mediaUrl}`} />
//             </div> : data.link.indexOf("soundcloud") >= 0 || data.link.indexOf("vk") >= 0 ?
//                 <div>
//                     <Iframe src={`${data.mediaUrl} allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"`} styles={{ maxHeight: '100%' }} className="videoMax100" />
//                 </div>
//                 : data.network.id === 2 || data.network.id === 3 || data.network.id === 18 ?
//                     <video controls className="videoMax100" autoPlay={false} preload="auto" src={`${data.mediaUrl}`} style={{ maxHeight: '100%' }} data-network={data.network.id} data-item-id={data.id} data-wall-id={wallId} data-plan-id={wall.UserDetail.planId} onError={(e) => { if (e.target.src !== 'https://cdn.tagembed.com/app/image/blur-img.jpg') { loopUpdateDataVideo(e) } }} >
//                     </video> : <video controls className="videoMax100" preload="none" poster={(data.file)} src={data.mediaUrl} style={{ maxHeight: '100%' }} > </video>
//     }
// </>


// class MediaPost extends PureComponent {
//     state = { isImage: "" }
//     /* To Display image on Load Start */
//     onUpdateImage = event => {
//         this.setState({ isImage: event.target.src })
//         let myImg = document.querySelector(`#image${this.props.item.id}`)
//         const height = myImg.naturalHeight;
//         const width = myImg.naturalWidth;
//         const minHeight = myImg.naturalminHeight;
//         myImg.setAttribute("height", height)
//         myImg.setAttribute("width", width)
//         myImg.setAttribute("minHeight", minHeight)

//     }
//     render() {
//         const { wallId, isFile, type, file, network, imgWidth, item, widgetTheme, personalization, wall, imageList } = this.props;
//         const { isImage } = this.state;
//         return <Fragment>
//             {
//                 isFile ? <div className="image">
//                     {widgetTheme === 4 || widgetTheme === 3 || widgetTheme === 50 ? <React.Fragment>
//                         {type === 1 ?
//                             <div style={{ backgroundImage: `url(${isImage !== "" ? isImage : file})` }}>
//                                 <img id={`image${item.id}`} alt="" src={file} onLoad={this.onUpdateImage} style={{ display: 'none' }} data-network={item.network.id} data-wall-id={wallId} data-plan-id={wall.UserDetail.planId} data-link={item.link} data-load="0" data-item-id={item.id} img-popup={file} onError={(e) => dataUpdate(e)} />
//                             </div> :
//                             <div style={{ backgroundImage: `url(${isImage !== "" ? isImage : file})`,
//                              minHeight: widgetTheme === 4 ? imgWidth : 250, 
//                              backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', backgroundPosition: widgetTheme === 3 || widgetTheme === 50 ? 'center center' : 'top center', width: 'auto', aspectRatio: wall.ThemeRule.aspectRatio === 1 ? wall.ThemeRule.aspectImageRatio : '', borderRadius: widgetTheme === 3 || widgetTheme === 50 ? '' : wall.ThemeRule.cardCurve + 'px' }}>
//                                 <img id={`image${item.id}`} alt="" src={file} onLoad={this.onUpdateImage} style={{ display: 'none' }} data-network={item.network.id} data-plan-id={wall.UserDetail.planId} data-wall-id={wallId} data-item-id={item.id} img-popup={file} data-load="0" onError={(e) => dataUpdate(e)} />
//                             </div>
//                         }
//                     </React.Fragment> : <React.Fragment>
//                         {type === 1 ? <Suspense>
//                             <img id={`image${item.id}`} onLoad={this.onUpdateImage} alt=""
//                                 style={{ minHeight: widgetTheme === 4 ? imgWidth : 250, width: '100%', backgroundSize: 'cover', backgroundPosition: '50%', backgroundRepeat: 'no-repeat', height: widgetTheme === 4 ? imgWidth : 'auto', transition: 'opacity 0.25s ease-in 0.5s' }}
//                                 src={file} wrapperclassname="fade-in imgDisplay" data-network={item.network.id} data-plan-id={wall.UserDetail.planId} data-link={item.link} data-wall-id={wallId} data-load="0" data-item-id={item.id} onError={(e) => dataUpdate(e)} />
//                         </Suspense>
//                             : <Suspense>
//                                 {personalization.postFeatured === 0 && personalization.mobilePopup == 0 && (type === 3 || type === 5 && !(type === 2 || type === 4))
//                                     ? <VideoComponent data={item} wallId={wallId} wall={wall} />
//                                     : <img id={`image${item.id}`} onLoad={this.onUpdateImage} alt=""
//                                         style={{ minHeight: (network.id == 8 ? '' : 250), width: '100%', height: widgetTheme === 4 ? imgWidth : 'auto', transition: 'opacity 0.25s ease-in 0.5s', backgroundSize: 'cover', backgroundPosition: '50%', backgroundRepeat: 'no-repeat', aspectRatio: wall.ThemeRule.aspectRatio === 1 ? wall.ThemeRule.aspectImageRatio : '' }}
//                                         wrapperclassname="imgDisplay imgBlock" src={file} data-network={item.network.id} data-plan-id={wall.UserDetail.planId} data-link={item.link}
//                                         data-wall-id={wallId} data-load="0" data-item-id={item.id}
//                                         onError={(e) => dataUpdate(e)} />
//                                 }
//                             </Suspense>}
//                     </React.Fragment>
//                     }
//                     {item.mediaUrl && (personalization.postFeatured === 1 || personalization.mobilePopup === 1) ? <div className="videoIcon"> {network.id === 7 ? <img id="img" src={`${FILE_PATHWAY}img/youtube.png`} alt="" style={{ height: 72, width: 72 }} /> : <img id="img" src={`${FILE_PATHWAY}img/play.png`} alt="" style={{ height: 72, width: 72 }} />} </div> : null}
//                     {Object.keys(item.imageList).length > 0 ? <div className="multipostIcon"> <img id="img" src={`${FILE_PATHWAY}img/svg-icon/multi-post.svg`} alt="" /> </div> : null}
//                 </div> : null
//             }
//             {
//                 (type === 3 || type === 5) && (personalization.postFeatured === 1 || personalization.mobilePopup === 1) && !isFile ?
//                     <div className="image">
//                         <img id="img" src={`${FILE_PATHWAY}img/blank.jpg`} alt="" />
//                         <div className="videoIcon">
//                             {network.id === 7 ? <img id="img" src={`${FILE_PATHWAY}img/youtube.png`} alt="" style={{ height: 72, width: 72 }} /> : <img id="img" src={`${FILE_PATHWAY}img/play.png`} alt="" style={{ height: 72, width: 72 }} />}
//                         </div>
//                     </div> : null
//             }
//         </Fragment>
//     }
// }
// export default MediaPost;