import React, { PureComponent } from 'react';
import { checkStringInNotNull } from '../../themes/customFunction'
import { convertHtmlStringToRender } from '../../themes/customFunction'
import ContentPostConversion from '../contentPostConversion'
import { connect } from 'react-redux';
import { CLOUD_URL } from '../../../actions/api'

class WidgetCardContentPost extends PureComponent {
    render() {
        const { item, isRating, rating, network, isCta, cta, wall } = this.props;
        return <div
            className={`postCardContent ${(wall.ThemeRule.hideContent === 1 && item.type !== 1 && !isCta) ? 'p0' : 'isCta'}`}
            style={{ paddingBottom: !item.socialAction && item.share.status !== 0 && network.id !== 7 ? '44px' : '' }}>
            {wall.ThemeRule.fontText !== null && wall.ThemeRule.fontText !== '' ? <link
                href={'https://fonts.googleapis.com/css2?family=' + wall.ThemeRule.fontText + '&display=swap'}
                rel="stylesheet" /> : null}
            {isRating ? <div className="postRating">
                <img src={`${CLOUD_URL}/images/rating/${network.id}/${rating}.png`} alt="rating" />
            </div> : null}

            {isCta ? convertHtmlStringToRender(cta) : null}
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
                <ContentPostConversion item={item} network={network} />
            </div>

        </div>
    }
}

const mapStateToProps = state => {
    const { wall } = state
    return {
        wall: wall.wallData,
    }
}
export default connect(mapStateToProps)(WidgetCardContentPost);