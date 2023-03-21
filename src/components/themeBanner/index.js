import React, { PureComponent } from 'react';
import { isMobile, isTablet } from "react-device-detect";
import { connect } from 'react-redux';
import BannerLogo from './bannerLogo'
import MiddleBanner from './middleBanner'
import BannerSocialAction from './bannerSocialAction'
import CustomBannerSocialAction from './customBannerSocialAction'
import { CUSTOM_SERVER_PATH, defaultFinalPath } from '../../constants'
import './themeBanner.scss'
import SearchBar from '../search'

/*To display the banner for mobile or desktop if user upload it.*/

const defaultFinalLogo = "https://app.tagembed.com/uploaded/8651481539701.51210.png";
const MobileBanner = ({ wall, banner }) => {
    return <div className="tagembed-mobile-banner" style={{
        minHeight: banner.CustomBanner.banner_height,
        backgroundColor: banner.CustomBanner.background_color,
        backgroundImage: banner.CustomBannerImage.newName === 8661481540843.082 ? `url(${defaultFinalPath})` : `url(${CUSTOM_SERVER_PATH}${banner.CustomBannerImage.path}${banner.CustomBannerImage.newName})`
    }}>
        {banner.LogoImage.newName != null && banner.CustomBanner.bannerType != 4 ? <img
            src={banner.LogoImage.newName === 8651481539701.512 ? defaultFinalLogo : `${CUSTOM_SERVER_PATH}${banner.LogoImage.path}${banner.LogoImage.newName}`}
            alt="banner-logo" /> : null}
           {wall.banner.CustomBanner.bannerType == 6 ? '' : <p className={`setFont font${banner.CustomBanner.subTitleFontStyle}`} style={{
            fontSize: banner.CustomBanner.subTitle_font_size,
            color: banner.CustomBanner.subTitle_font_color
        }}>{banner.CustomBanner.subTitle}</p>}
        
        <h1 className={`setFont font${banner.CustomBanner.titleFontStyle}`} style={{
            fontSize: banner.CustomBanner.title_font_size,
            color: banner.CustomBanner.title_font_color
        }}>{banner.CustomBanner.title}</h1>
        {wall.Personalization.search == 1 ? <SearchBar isMobile={true} /> : null}
        <ul className="headbannerSocialIcon mobileHeadbannerSocialIcon">
            {wall.banner.CustomBanner.socialLinkUrlStatus == 1
                ?
                <CustomBannerSocialAction CustomBanner={banner.CustomBanner} />
                :
                <BannerSocialAction CustomBanner={banner.CustomBanner} />
            }
        </ul>
    </div>
}

const renderComponent = (partInt, wall) => {
    // const products = ['orange', 'apple', 'watermelon'];

    const list = []
//f2be11
    for (let i = 0; i < partInt; i++) {
        list.push(<li>
                {/* <p>{wall.banner.CustomBanner.social_icon_color}</p> */}
            <span style={{ width: '100%' }} className='yellow_star'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width='20' height='20'><path fill={wall.banner.CustomBanner.social_icon_color} d="M6.826 10.743l-3.28 1.724a.5.5 0 0 1-.725-.528l.627-3.65a.5.5 0 0 0-.144-.443L.65 5.26a.5.5 0 0 1 .277-.853l3.666-.533a.5.5 0 0 0 .377-.273L6.61.279a.5.5 0 0 1 .896 0L9.147 3.6a.5.5 0 0 0 .376.273l3.666.533a.5.5 0 0 1 .277.853l-2.653 2.586a.5.5 0 0 0-.144.442l.627 3.651a.5.5 0 0 1-.726.528l-3.279-1.724a.5.5 0 0 0-.465 0z"></path></svg></span>
            <span className='gray_star'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width='20' height='20'><path fill="#c5c5c5" d="M6.826 10.743l-3.28 1.724a.5.5 0 0 1-.725-.528l.627-3.65a.5.5 0 0 0-.144-.443L.65 5.26a.5.5 0 0 1 .277-.853l3.666-.533a.5.5 0 0 0 .377-.273L6.61.279a.5.5 0 0 1 .896 0L9.147 3.6a.5.5 0 0 0 .376.273l3.666.533a.5.5 0 0 1 .277.853l-2.653 2.586a.5.5 0 0 0-.144.442l.627 3.651a.5.5 0 0 1-.726.528l-3.279-1.724a.5.5 0 0 0-.465 0z"></path></svg></span>
        </li>)
    }

    return (
        <>
            {list}
        </>
    )
}
class ThemeBanner extends PureComponent {


    componentWillMount() {
        const { renderId } = this.props.renderId
        this.setState({
          windowWidth: renderId ? document.getElementById(renderId).clientWidth : window.innerWidth
        })
      }

      componentDidMount() {
        const { renderId } = this.props.renderId
        window.addEventListener("resize", () => {
            this.setState({windowWidth: renderId ? document.getElementById(renderId).clientWidth : window.innerWidth, windowHeight: window.innerHeight})
        });

        // const {postData} = this.props;
        // if (postData.length) this.setState({initialCount: postData.length})
    }


    render() {
        const { wall, banner, postData, loader, completeDataObject, item, avgRating } = this.props;
        const { renderId } = this.props.renderId;
        let int_part;
        let float_part;
        let avgrate = parseFloat(avgRating).toFixed(1);
       
        { int_part = Math.trunc(avgrate) }
        { float_part = String(avgrate).split('.')[1] }
        //     let widrat;
        //     if ( '0' > float_part <= '10') {
        //          widrat=  '10%' ;
        //     } else if ('10' > float_part <= '20') {
        //          widrat = '20%';
        //     }
        //     else if ('20' > float_part <= '30') {
        //           widrat = '30%';
        //     }
        //     else if ('30' > float_part <= '40') {
        //           widrat = '40%';
        //     }
        //     else if ('40' > float_part <= '50') {
        //           widrat = '50%';
        //     }
        //     else if ('50' >float_part <= '60') {
        //          widrat = '60%';
        //     }
        //     else if ('60' > float_part <= '70') {
        //          widrat = '70%';
        //     }
        //     else if ('70' > float_part <= '80') {
        //          widrat = '80%';
        //     }
        //     else if ('80' > float_part <= '90') {
        //          widrat = '90%';
        //     }
        //     else if ('90' > float_part <= '100') {
        //         widrat = '100%';
        //    }




        const customHeight = wall.Personalization.search == 1 && banner.CustomBanner.bannerType != 4 ? parseInt(banner.CustomBanner.banner_height) + 40 : banner.CustomBanner.banner_height;
        const CustomBannerType = wall.Personalization.search == 1 ? banner.CustomBanner.bannerType + `-s` : banner.CustomBanner.bannerType;
        
        return banner.CustomBanner.status === 1 ? <React.Fragment>
             
            {
                
                isMobile && !isTablet ? <MobileBanner wall={wall}
                    banner={banner} /> : isMobile && wall.Personalization.widgetTheme === 49 && (renderId ? document.getElementById(renderId).clientWidth : window.innerWidth) < 767 ?
                    <MobileBanner banner={banner} /> :
                    <div className={banner.CustomBanner.banner_position === 1 ? "bannerTop" : "bannerBottom"}
                        id="themeBanner">
                        <div className={`themeBanner banner-${CustomBannerType}`} style={{
                            height: customHeight,
                            backgroundSize: 'cover',
                            backgroundPosition: 'top center',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: banner.CustomBanner.background_color,
                            backgroundImage: banner.CustomBannerImage.newName === 8661481540843.082 ? `url(${defaultFinalPath})` : `url(${CUSTOM_SERVER_PATH}${banner.CustomBannerImage.path}${banner.CustomBannerImage.newName})`
                        }}>
                            <div className="bannerContent">
                                <div className="bannerLeft">
                                    <div className="bannerLogo">
                                        {banner.LogoImage.newName != null ? <BannerLogo LogoImage={banner.LogoImage}
                                            imagePath={`${CUSTOM_SERVER_PATH}${banner.LogoImage.path}${banner.LogoImage.newName}`} /> : null}
                                    </div>
                                </div>
                                {/* search */}
                                {wall.Personalization.search == 1 ? <SearchBar isMobile={false} /> : null}

                                {/* Google banner START */}
                                {wall.banner.CustomBanner.bannerType == 6 ? <> <div className="amaz_rvw">
                                    <img src={'https://cdn.tagembed.com/common/images/bannerImage/' + wall.banner.CustomBanner.networkLogoImage}
                                        className="img-responsive" alt="Banner" />


                                </div>
                                    <div className="amaz_rvw_0">


                                        <strong className='review_avg' style={{color: wall.banner.CustomBanner.subTitle_font_color}}> {avgrate}</strong>

                                        {/* { int_part = Math.trunc(avgrate) }
                                            {float_part = Number((avgrate-int_part).toFixed(2))} */}
                                        


                                        <ul className='rating_star'>
                                       
                                            {renderComponent(int_part,wall)}{float_part > 0 ? <li><span style={(float_part === '1' || float_part === '10') ? { width: '10%' } : (float_part === '2' || float_part === '20') ? { width: '20%' } : (float_part === '3' || float_part === '30') ? { width: '30%' } : (float_part === '4' || float_part === '40') ? { width: '40%' } : (float_part === '5' || float_part === '50') ? { width: '50%' } : (float_part === '6' || float_part === '60') ? { width: '60%' } : (float_part === '7' || float_part === '70') ? { width: '70%' } : (float_part === '8' || float_part === '80') ? { width: '80%' } : (float_part === '9' || float_part === '90') ? { width: '90%' } : { width: '100%' }} className='yellow_star'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width='20' height='20'><path fill={wall.banner.CustomBanner.social_icon_color} d="M6.826 10.743l-3.28 1.724a.5.5 0 0 1-.725-.528l.627-3.65a.5.5 0 0 0-.144-.443L.65 5.26a.5.5 0 0 1 .277-.853l3.666-.533a.5.5 0 0 0 .377-.273L6.61.279a.5.5 0 0 1 .896 0L9.147 3.6a.5.5 0 0 0 .376.273l3.666.533a.5.5 0 0 1 .277.853l-2.653 2.586a.5.5 0 0 0-.144.442l.627 3.651a.5.5 0 0 1-.726.528l-3.279-1.724a.5.5 0 0 0-.465 0z"></path></svg></span>
                                                <span className='gray_star'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width='20' height='20'><path fill="#c5c5c5" d="M6.826 10.743l-3.28 1.724a.5.5 0 0 1-.725-.528l.627-3.65a.5.5 0 0 0-.144-.443L.65 5.26a.5.5 0 0 1 .277-.853l3.666-.533a.5.5 0 0 0 .377-.273L6.61.279a.5.5 0 0 1 .896 0L9.147 3.6a.5.5 0 0 0 .376.273l3.666.533a.5.5 0 0 1 .277.853l-2.653 2.586a.5.5 0 0 0-.144.442l.627 3.651a.5.5 0 0 1-.726.528l-3.279-1.724a.5.5 0 0 0-.465 0z"></path></svg></span></li> : ''}
                                        </ul>
                                        <strong className='total_rvw' style={{color: wall.banner.CustomBanner.subTitle_font_color}}>{postData && postData.length} reviews</strong>
                                    </div>

                                    <div className="amaz_rvw_1">


                                    </div>

                                </>
                                    : null}

                                {/* Google banner  start */}

                            </div>
                            <MiddleBanner CustomBanner={banner.CustomBanner} />
                            <div
                                className={wall.banner.CustomBanner.showMoreUrl != null ? "bannerRight withLarnmore" : "bannerRight withoutLearnmore"}>
                                <div
                                    className={wall.banner.CustomBanner.showMoreUrl != null ? "bannerRight withLarnmore" : "bannerRight withoutLearnmore"}>
                                    <div className="revwbar">
                                        {wall.banner.CustomBanner.bannerType == 6 ?
                                            <div className={isMobile ? `writervwbtn` : `writervwbtn`}>
                                                <a className="btn" style={{color: wall.banner.CustomBanner.bannerReviewLink}}
                                                    target="_blank" rel="noopener noreferrer" href={'https://search.google.com/local/writereview?placeid=' + wall.banner.CustomBanner.subTitle}>Write A Review</a>
                                            </div>
                                            : ''}
                                    </div>

                                </div>

                                <ul className="headbannerSocialIcon">
                                    {wall.banner.CustomBanner.socialLinkUrlStatus == 1 ?
                                        <CustomBannerSocialAction CustomBanner={banner.CustomBanner} /> :
                                        <BannerSocialAction CustomBanner={banner.CustomBanner} />}


                                </ul>
                                <div className="searchBar">
                                    {wall.banner.CustomBanner.showMoreUrl != null ?
                                        <div className={isMobile ? `` : `learn_more`}>
                                            <a href={wall.banner.CustomBanner.showMoreUrl} className="btn"
                                                target="_blank" rel="noopener noreferrer">Learn More</a>
                                        </div>
                                        : ''}
                                </div>

                            </div>

                        </div>
                    </div>
            }
        </React.Fragment> : wall.banner.BannerImage.status === 1 ?
            <div className="bannerTop" id="themeBanner" style={{ zIndex: 9 }}>
                <img src={`${CUSTOM_SERVER_PATH}${wall.banner.BannerImage.path}${wall.banner.BannerImage.newName}`}
                    class="img-responsive" alt="Banner" />
            </div> : null

    }
}

const mapStateToProps = state => {
    const { webFilters, wall, postData, loader, completeDataObject, item } = state
    return {
        renderId: state.renderId,
        wall: state.wall.wallData,
        appendData: postData.appendData,
        loader: loader,
        avgRating: state.postData.avgRating,
        postData: state.postData.postData,
        completeDataObject: state.postData.completeDataObject,

    }
}




export default connect(mapStateToProps)(ThemeBanner);









// import React, {PureComponent} from 'react';
// import {isMobile, isTablet} from "react-device-detect";
// import {connect} from 'react-redux';
// import BannerLogo from './bannerLogo'
// import MiddleBanner from './middleBanner'
// import BannerSocialAction from './bannerSocialAction'
// import CustomBannerSocialAction from './customBannerSocialAction'
// import {CUSTOM_SERVER_PATH, defaultFinalPath} from '../../constants'
// import './themeBanner.scss'
// import SearchBar from '../search'

// /*To display the banner for mobile or desktop if user upload it.*/

// const defaultFinalLogo = "https://app.tagembed.com/uploaded/8651481539701.51210.png";
// const MobileBanner = ({wall, banner}) => {
//     return <div className="tagembed-mobile-banner" style={{
//         minHeight: banner.CustomBanner.banner_height,
//         backgroundColor: banner.CustomBanner.background_color,
//         backgroundImage: banner.CustomBannerImage.newName === 8661481540843.082 ? `url(${defaultFinalPath})` : `url(${CUSTOM_SERVER_PATH}${banner.CustomBannerImage.path}${banner.CustomBannerImage.newName})`
//     }}>
//         {banner.LogoImage.newName != null && banner.CustomBanner.bannerType != 4 ? <img
//             src={banner.LogoImage.newName === 8651481539701.512 ? defaultFinalLogo : `${CUSTOM_SERVER_PATH}${banner.LogoImage.path}${banner.LogoImage.newName}`}
//             alt="banner-logo"/> : null}
//         <p className={`setFont font${banner.CustomBanner.subTitleFontStyle}`} style={{
//             fontSize: banner.CustomBanner.subTitle_font_size,
//             color: banner.CustomBanner.subTitle_font_color
//         }}>{banner.CustomBanner.subTitle}</p>
//         <h1 className={`setFont font${banner.CustomBanner.titleFontStyle}`} style={{
//             fontSize: banner.CustomBanner.title_font_size,
//             color: banner.CustomBanner.title_font_color
//         }}>{banner.CustomBanner.title}</h1>
//         {wall.Personalization.search == 1 ? <SearchBar isMobile={true}/> : null}
//         <ul className="headbannerSocialIcon mobileHeadbannerSocialIcon">
//             {wall.banner.CustomBanner.socialLinkUrlStatus == 1
//                 ?
//                 <CustomBannerSocialAction CustomBanner={banner.CustomBanner}/>
//                 :
//                 <BannerSocialAction CustomBanner={banner.CustomBanner}/>
//             }
//         </ul>
//     </div>
// }


// class ThemeBanner extends PureComponent {
//     render() {
//         const {wall, banner} = this.props;
//         const customHeight = wall.Personalization.search == 1 && banner.CustomBanner.bannerType != 4 ? parseInt(banner.CustomBanner.banner_height) + 40 : banner.CustomBanner.banner_height;
//         const CustomBannerType = wall.Personalization.search == 1 ? banner.CustomBanner.bannerType + `-s` : banner.CustomBanner.bannerType;
//         return banner.CustomBanner.status === 1 ? <React.Fragment>
//             {
//                 isMobile && !isTablet ? <MobileBanner wall={wall}
//                                                       banner={banner}/> : isMobile && wall.Personalization.widgetTheme === 49 && document.getElementById('root').clientWidth < 767 ?
//                     <MobileBanner banner={banner}/> :
//                     <div className={banner.CustomBanner.banner_position === 1 ? "bannerTop" : "bannerBottom"}
//                          id="themeBanner">
//                         <div className={`themeBanner banner-${CustomBannerType}`} style={{
//                             height: customHeight,
//                             backgroundSize: 'cover',
//                             backgroundPosition: 'top center',
//                             backgroundRepeat: 'no-repeat',
//                             backgroundColor: banner.CustomBanner.background_color,
//                             backgroundImage: banner.CustomBannerImage.newName === 8661481540843.082 ? `url(${defaultFinalPath})` : `url(${CUSTOM_SERVER_PATH}${banner.CustomBannerImage.path}${banner.CustomBannerImage.newName})`
//                         }}>
//                             <div className="bannerContent">
//                                 <div className="bannerLeft">
//                                     <div className="bannerLogo">
//                                         {banner.LogoImage.newName != null ? <BannerLogo LogoImage={banner.LogoImage}
//                                                                                         imagePath={`${CUSTOM_SERVER_PATH}${banner.LogoImage.path}${banner.LogoImage.newName}`}/> : null}
//                                     </div>
//                                 </div>
//                                 {/* search */}
//                                 {wall.Personalization.search == 1 ? <SearchBar isMobile={false}/> : null}

//                             </div>
//                             <MiddleBanner CustomBanner={banner.CustomBanner}/>
//                             <div
//                                 className={wall.banner.CustomBanner.showMoreUrl != null ? "bannerRight withLarnmore" : "bannerRight withoutLearnmore"}>
//                                 <ul className="headbannerSocialIcon">
//                                     {wall.banner.CustomBanner.socialLinkUrlStatus == 1 ?
//                                         <CustomBannerSocialAction CustomBanner={banner.CustomBanner}/> :
//                                         <BannerSocialAction CustomBanner={banner.CustomBanner}/>}
//                                 </ul>
//                                 <div className="searchBar">
//                                     {wall.banner.CustomBanner.showMoreUrl != null ?
//                                         <div className={isMobile ? `` : `learn_more`}>
//                                             <a href={wall.banner.CustomBanner.showMoreUrl} className="btn"
//                                                target="_blank" rel="noopener noreferrer">Learn More</a>
//                                         </div>
//                                         : ''}
//                                 </div>

//                             </div>

//                         </div>
//                     </div>
//             }
//         </React.Fragment> : wall.banner.BannerImage.status === 1 ?
//             <div className="bannerTop" id="themeBanner" style={{zIndex: 9}}>
//                 <img src={`${CUSTOM_SERVER_PATH}${wall.banner.BannerImage.path}${wall.banner.BannerImage.newName}`}
//                      class="img-responsive" alt="Banner"/>
//             </div> : null

//     }
// }

// const mapStateToProps = state => {
//     return {
//         wall: state.wall.wallData,
//     }
// }

// export default connect(mapStateToProps)(ThemeBanner);