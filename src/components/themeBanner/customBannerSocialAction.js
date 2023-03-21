import React, {Fragment, PureComponent} from 'react';

class CustomBannerSocialAction extends PureComponent {
    render() {
        const {CustomBanner} = this.props;
        return <Fragment>

            {CustomBanner.tiktokUrl != null ?
                <li style={{
                    fontSize: 15 + CustomBanner.social_icon_size,
                    height: 15 + CustomBanner.social_icon_size,
                    width: 15 + CustomBanner.social_icon_size,
                    lineHeight: `${15 + CustomBanner.social_icon_size}px`
                }}>
                    <a href={CustomBanner.tiktokUrl} target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.tagembed.com/app/img/svg-icon/tiktok.svg" alt="tiktok"
                             className="tiktok-icon" style={{fontSize: CustomBanner.social_icon_size}}/>
                    </a>
                </li>
                : ''}

            {CustomBanner.instagramUrl != null ?
                <li style={{
                    fontSize: 15 + CustomBanner.social_icon_size,
                    height: 15 + CustomBanner.social_icon_size,
                    width: 15 + CustomBanner.social_icon_size,
                    lineHeight: `${15 + CustomBanner.social_icon_size}px`
                }}>
                    <a href={CustomBanner.instagramUrl} target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-instagram"
                           style={{color: `#000000`, fontSize: CustomBanner.social_icon_size}}></i>
                    </a>
                </li>
                : ''}

            {CustomBanner.youtubeUrl != null ?
                <li style={{
                    fontSize: 15 + CustomBanner.social_icon_size,
                    height: 15 + CustomBanner.social_icon_size,
                    width: 15 + CustomBanner.social_icon_size,
                    lineHeight: `${15 + CustomBanner.social_icon_size}px`
                }}>
                    <a href={CustomBanner.youtubeUrl} target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-youtube-play"
                           style={{color: `#000000`, fontSize: CustomBanner.social_icon_size}}></i>
                    </a>
                </li>
                : ''}

            {CustomBanner.facebookUrl != null ?
                <li style={{
                    fontSize: 15 + CustomBanner.social_icon_size,
                    height: 15 + CustomBanner.social_icon_size,
                    width: 15 + CustomBanner.social_icon_size,
                    lineHeight: `${15 + CustomBanner.social_icon_size}px`
                }}>
                    <a href={CustomBanner.facebookUrl} target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-facebook"
                           style={{color: `#000000`, fontSize: CustomBanner.social_icon_size}}></i>
                    </a>
                </li>
                : ''}

            {CustomBanner.twitterUrl != null ?
                <li style={{
                    fontSize: 15 + CustomBanner.social_icon_size,
                    height: 15 + CustomBanner.social_icon_size,
                    width: 15 + CustomBanner.social_icon_size,
                    lineHeight: `${15 + CustomBanner.social_icon_size}px`
                }}>
                    <a href={CustomBanner.twitterUrl} target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-twitter"
                           style={{color: `#000000`, fontSize: CustomBanner.social_icon_size}}></i>
                    </a>
                </li>
                : ''}

        </Fragment>
    }
}

export default CustomBannerSocialAction;