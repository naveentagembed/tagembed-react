import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { checkStringInNotNull } from '../../themes/customFunction'
import ContentPostConversion from '../contentPostConversion'
import { CLOUD_URL } from '../../../actions/api'

class SquarePhotoContentPost extends PureComponent {

    render() {
        const { item, isRating, rating, network, widgetTheme, imgWidth, wall } = this.props;

        return <React.Fragment>
            <div style={{ display: wall.Personalization.postTime == 0 && wall.Personalization.postAuthor == 0 && wall.ThemeRule.hideContent == 1 ? 'none' : ' ' }}>
                <div className="postNetwork" data-network={network.name} data-network-color={network.color}>
                    <i className={`fa ${(network.id === 7) ? 'fa-youtube-play' : network.icon}`}
                        style={{ color: item.iconColor }}>
                    </i>
                </div>
                {wall.ThemeRule.fontText !== null && wall.ThemeRule.fontText !== '' ? <link
                    href={'https://fonts.googleapis.com/css2?family=' + wall.ThemeRule.fontText + '&display=swap'}
                    rel="stylesheet" /> : null}
                <div className={`postCardContent ${parseInt(imgWidth) < 201 ? 'minimumPost' : ''}`}>
                    {isRating ? <div className="postRating">
                        <img src={`${CLOUD_URL}/images/rating/${network.id}/${rating}.png`} alt="rating" />
                    </div> : null}

                    <div
                        className={wall.ThemeRule.fontText ? `postedText ${item.textDecoClass}` : `postedText ${item.textDecoClass} setFont font${wall.ThemeRule.font}`}
                        style={{
                            display: (wall.ThemeRule.hideContent === 1 && item.type !== 1) ? 'none' : 'block',
                            fontSize: wall.ThemeRule.fontSize,
                            color: wall.ThemeRule.fontColor,
                            fontFamily: `${wall.ThemeRule.fontText ? wall.ThemeRule.fontText : " "}`
                        }}>
                        {checkStringInNotNull(item.contentTitle) && parseInt(wall.Personalization.minimumPostWidth) > 201 ?
                            <h1 style={{ color: wall.ThemeRule.fontColor }}>{item.contentTitle}</h1> : null}
                        {parseInt(wall.Personalization.minimumPostWidth) > 201 ?
                            <ContentPostConversion item={item} network={network} widgetTheme={widgetTheme}
                                imgWidth={imgWidth} /> : null}
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        wall: state.wall.wallData,
    }
}

export default connect(mapStateToProps)(SquarePhotoContentPost);