import React, {PureComponent} from 'react';
import {convertHtmlStringToRender} from '../../themes/customFunction'
import {CLOUD_URL} from '../../../actions/api'
import PostAuthor from '../postAuthor'
import '../../../scss/theme/polaroid.scss'

class PolaroidContentPost extends PureComponent {

    render() {
        const {item, isRating, rating, network, isCta, cta, wall} = this.props;
        return <div className="postCardContent p0">

            {isRating ? <div className="postRating">
                <img src={`${CLOUD_URL}/images/rating/${network.id}/${rating}.png`} alt="rating"/>
            </div> : null}
            {isCta ? convertHtmlStringToRender(cta) : null}
            <PostAuthor network={item.network} item={item} wall={wall}/>
        </div>
    }
}

export default PolaroidContentPost;