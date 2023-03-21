import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { checkStringInNotNull } from '../../themes/customFunction'
import ContentPostConversion from '../contentPostConversion'

const isMinimumPost = { transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }

class GalleryPhotoContentPost extends PureComponent {

    render() {
        const { item, network, widgetTheme, imgWidth, wall } = this.props;
        let onErrorImg = `https://ui-avatars.com/api/?name=${item.author.username}&background=123&color=fff&rounded=true`

        return <React.Fragment>
            <div className="image_overlay_black"></div>
            <div className="postNetwork" data-network={network.name} data-network-color={network.color}>
                <i className={`fa ${(network.id === 7) ? 'fa-youtube-play' : network.icon}`}
                    style={{ color: item.iconColor }}>
                </i>
            </div>

            <div className='postCardContent' style={{display : wall.Personalization.postTime == 0 && wall.Personalization.postAuthor == 0 && wall.ThemeRule.hideContent == 1 ? 'none' : ' ' }}>
                <div className="postAuthorClassic">
                    <div className="authorInfo" style={parseInt(wall.Personalization.minimumPostWidth) < 201 ? {
                        ...isMinimumPost,
                        display: (item.instaHash === 0) ? 'none' : ''
                    } : { display: (item.instaHash === 0) ? 'none' : '' }}>
                        <img style={{ display: (item.postAuthor === 0) ? 'none' : '' }} src={item.author.picture}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = (item.author.errorPic) ? item.author.errorPic : onErrorImg;
                            }}
                            alt=" " />
                        <div className="postAuthorName" style={{
                            display: (item.postAuthor === 0) ? 'none' : 'block',
                            color: wall.ThemeRule.authorColor
                        }}>
                            {item.author.name}
                        </div>

                        <div className="authrHandleTime">
                            <span className="authrHandle" style={{
                                display: (item.postAuthor === 0) ? 'none' : 'block',
                                color: wall.ThemeRule.authorColor,
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: parseInt(wall.Personalization.minimumPostWidth) < 180 ? '60.5px' : '100px'
                            }} target="_blank">
                                @{item.author.username}
                            </span>
                            <div className="sepratedot" style={{
                                display: (item.postAuthor === 0 || item.timePost === 0) ? 'none' : 'block',
                                color: wall.ThemeRule.authorColor
                            }}></div>
                            <span className="timePost" style={{
                                display: (item.timePost === 0) ? 'none' : 'block',
                                color: wall.ThemeRule.authorColor
                            }} data-livestamp={item.createdAt}>
                                {moment(new Date(item.createdAt * 1000)).fromNow()}
                            </span>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                {wall.ThemeRule.fontText !== null && wall.ThemeRule.fontText !== '' ? <link
                    href={'https://fonts.googleapis.com/css2?family=' + wall.ThemeRule.fontText + '&display=swap'}
                    rel="stylesheet" /> : null}
                <div
                    className={wall.ThemeRule.fontText ? `postedText ${item.textDecoClass}` : `postedText ${item.textDecoClass} setFont font${wall.ThemeRule.font}`}
                    style={{
                        display: (wall.ThemeRule.hideContent === 1 && item.type !== 1) ? 'none' : 'block',
                        fontSize: wall.ThemeRule.fontSize,
                        color: wall.ThemeRule.fontColor,
                        fontFamily: `${wall.ThemeRule.fontText ? wall.ThemeRule.fontText : " "}`
                    }}>
                    {checkStringInNotNull(item.contentTitle) ?
                        <h1 style={{ color: wall.ThemeRule.fontColor }}>{item.contentTitle}</h1> : null}
                    {parseInt(wall.Personalization.minimumPostWidth) > 201 ?
                        <ContentPostConversion item={item} network={network} widgetTheme={widgetTheme}
                            imgWidth={imgWidth} /> : null}
                </div>
            </div>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        wall: state.wall.wallData
    }
}

export default connect(mapStateToProps)(GalleryPhotoContentPost);