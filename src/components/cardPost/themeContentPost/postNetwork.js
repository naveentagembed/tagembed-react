import React, {PureComponent} from 'react';
import moment from 'moment';

class PostNetwork extends PureComponent {

    render() {
        const {network, item,wall} = this.props;
        /*-- incase we want to remove avatar | let onErrorImg = 'https://cdn.tagembed.com/app/img/author2.png'; -- */
        let onErrorImg = `https://ui-avatars.com/api/?name=${item.author.username}&background=123&color=fff&rounded=true`
        return <h4>
            <div className="postNetwork" data-network={network.name} data-network-color={network.color}>
                <i className={`fa ${(network.id === 7) ? 'fa-youtube-play' : network.icon}`}
                   style={{color: item.iconColor}}>
                </i>
            </div>
            <div className="authorInfo" style={{display: (item.instaHash === 0) ? 'none' : 'block'}}>
                <img style={{display: (item.postAuthor === 0) ? 'none' : ''}} src={item.author.picture}
                     onError={(e) => {
                         e.target.onerror = null;
                         e.target.src = (item.author.errorPic) ? item.author.errorPic : onErrorImg;
                     }}
                     alt="postAuthor"/>
                <div className="postAuthorName"
                     style={{display: (item.postAuthor === 0) ? 'none' : '', color: wall.ThemeRule.authorColor}}>
                    {item.author.name}
                </div>

                <div className="authrHandleTime">
                    <span className="authrHandle"
                          style={{display: (item.postAuthor === 0) ? 'none' : '', color: wall.ThemeRule.authorColor}}
                          target="_blank">
                        @{item.author.username}
                    </span>
                    <div className="sepratedot" style={{
                        display: (item.postAuthor === 0 || item.timePost === 0) ? 'none' : '',
                        color: wall.ThemeRule.authorColor
                    }}></div>
                    <span className="timePost"
                          style={{display: (item.timePost === 0) ? 'none' : '', color: wall.ThemeRule.authorColor}}
                          data-livestamp={item.createdAt}>
                        {moment(new Date(item.createdAt * 1000)).fromNow()}
                    </span>
                </div>
                <div className="clearfix"></div>
            </div>
        </h4>
    }
}

export default PostNetwork;