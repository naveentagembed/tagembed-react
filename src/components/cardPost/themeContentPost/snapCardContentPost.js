import React, { PureComponent } from 'react';
import { checkStringInNotNull } from '../../themes/customFunction'
import { convertHtmlStringToRender } from '../../themes/customFunction'
import ContentPostConversion from '../contentPostConversion'
import { CLOUD_URL } from '../../../actions/api'
import { connect } from 'react-redux';


class SnapCardContentPost extends PureComponent {

    render() {
        const { item, isRating, rating, network, isCta, cta, wall } = this.props;

        return <div className={`postCardContent ${(wall.ThemeRule.hideContent === 1 && item.type !== 1) ? 'p0' : ''}`}>
            {wall.ThemeRule.fontText !== null && wall.ThemeRule.fontText !== '' ? <link
                href={'https://fonts.googleapis.com/css2?family=' + wall.ThemeRule.fontText + '&display=swap'}
                rel="stylesheet" /> : null}
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
                {checkStringInNotNull(item.contentTitle) ?
                    <h1 style={{ color: wall.ThemeRule.fontColor }}>{item.contentTitle}</h1> : null}
                <ContentPostConversion item={item} network={network} />
            </div>
            {isCta ? convertHtmlStringToRender(cta) : null}

        </div>
    }
}

const mapStateToProps = state => {
    const { wall } = state
    return {
        wall: wall.wallData,
    }
}


export default connect(mapStateToProps)(SnapCardContentPost);