import React, {Fragment, PureComponent} from 'react';

const LogoSocialAction1 = ({CustomBanner}) => {
    if (CustomBanner.social_icon_color_status === 2) return <li className="fb" style={{
        borderColor: CustomBanner.social_icon_color,
        height: 15 + CustomBanner.social_icon_size,
        width: 15 + CustomBanner.social_icon_size,
        lineHeight: `${15 + CustomBanner.social_icon_size}px`
    }}>
        <i id="fbicon" className="fa fa-facebook"
           style={{fontSize: CustomBanner.social_icon_size, color: CustomBanner.social_icon_color}}></i>
    </li>
    else return <li className="fb" style={{
        borderColor: '#3b5998',
        height: 15 + CustomBanner.social_icon_size,
        width: 15 + CustomBanner.social_icon_size,
        lineHeight: `${15 + CustomBanner.social_icon_size}px`
    }}>
        <i id="fbicon" className="fa fa-facebook" style={{fontSize: CustomBanner.social_icon_size}}></i>
    </li>
}
const LogoSocialAction2 = ({CustomBanner}) => {
    if (CustomBanner.social_icon_color_status === 2) return <li className="tw" style={{
        borderColor: CustomBanner.social_icon_color,
        height: 15 + CustomBanner.social_icon_size,
        width: 15 + CustomBanner.social_icon_size,
        lineHeight: `${15 + CustomBanner.social_icon_size}px`
    }}>
        <i id="twicon" className="fa fa-twitter"
           style={{fontSize: CustomBanner.social_icon_size, color: CustomBanner.social_icon_color}}></i>
    </li>
    else return <li className="tw" style={{
        borderColor: '#00aced',
        height: 15 + CustomBanner.social_icon_size,
        width: 15 + CustomBanner.social_icon_size
    }}>
        <i id="twicon" className="fa fa-twitter" style={{fontSize: CustomBanner.social_icon_size}}></i>
    </li>
}
const LogoSocialAction3 = ({CustomBanner}) => {
    if (CustomBanner.social_icon_color_status === 2) return <li className="insta" style={{
        fontSize: 15 + CustomBanner.social_icon_size,
        borderColor: CustomBanner.social_icon_color,
        height: 15 + CustomBanner.social_icon_size,
        width: 15 + CustomBanner.social_icon_size,
        lineHeight: `${15 + CustomBanner.social_icon_size}px`
    }}>
        <i id="instaicon" className="fa fa-instagram"
           style={{fontSize: CustomBanner.social_icon_size, color: CustomBanner.social_icon_color}}></i>
    </li>
    else return <li className="insta" style={{
        fontSize: 15 + CustomBanner.social_icon_size,
        borderColor: '#cd486b',
        height: 15 + CustomBanner.social_icon_size,
        width: 15 + CustomBanner.social_icon_size,
        lineHeight: `${15 + CustomBanner.social_icon_size}px`
    }}><i id="instaicon" className="fa fa-instagram" style={{fontSize: CustomBanner.social_icon_size}}></i></li>
}

class BannerSocialAction extends PureComponent {
    render() {

        const {CustomBanner} = this.props;
        return <Fragment>
            {CustomBanner.social_icon_status === 1 ? CustomBanner.social_icons === "2,3" ?
                <Fragment><LogoSocialAction2 CustomBanner={CustomBanner}/><LogoSocialAction3
                    CustomBanner={CustomBanner}/></Fragment>
                : CustomBanner.social_icons === "1,3" ? <Fragment>
                        <LogoSocialAction1 CustomBanner={CustomBanner}/>
                        <LogoSocialAction3 CustomBanner={CustomBanner}/>
                    </Fragment>
                    : CustomBanner.social_icons === "1,2" ? <Fragment>
                            <LogoSocialAction1 CustomBanner={CustomBanner}/>
                            <LogoSocialAction2 CustomBanner={CustomBanner}/></Fragment>
                        : CustomBanner.social_icons === 1 ? <LogoSocialAction1 CustomBanner={CustomBanner}/>
                            : CustomBanner.social_icons === 2 ? <LogoSocialAction2 CustomBanner={CustomBanner}/>
                                : CustomBanner.social_icons === 3 ? <LogoSocialAction3 CustomBanner={CustomBanner}/>
                                    : CustomBanner.social_icons === "1,2,3" ? <Fragment>
                                            <LogoSocialAction1 CustomBanner={CustomBanner}/>
                                            <LogoSocialAction2 CustomBanner={CustomBanner}/>
                                            <LogoSocialAction3 CustomBanner={CustomBanner}/>
                                        </Fragment>
                                        : null : null}
        </Fragment>

    }
}

export default BannerSocialAction;