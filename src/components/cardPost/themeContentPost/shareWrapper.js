import React, {PureComponent} from 'react';

class ShareWrapper extends PureComponent {

    render() {
        const {network, item} = this.props;
        return <div className="shareOptions" onClick={e => e.stopPropagation()} data-color=""
                    style={{display: (item.share.status === 0 || network.id === 7 || network.id === 25) ? 'none' : 'block'}}>
            <a href={item.share.share} className="shShare" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-share icon" aria-hidden="true"></i>
            </a>
            {network.id !== 1 && item.type !== 1 ?
                <a href={item.share.facebook} className="fbShare" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-facebook icon" aria-hidden="true">
                    </i>
                </a>
                : null}
            <a href={item.share.twitter} className="twShare" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-twitter" aria-hidden="true">
                </i>
            </a>

            <a href={item.share.linkedin} className="liShare" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-linkedin" aria-hidden="true">
                </i>
            </a>
        </div>
    }
}

export default ShareWrapper;