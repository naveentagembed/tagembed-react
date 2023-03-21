import React, { PureComponent } from 'react';
import moment from 'moment';
import Helmet from 'react-helmet'

class postAuthor extends PureComponent {

    render() {
        const { item, network, imgWidth, wall } = this.props;

        /*-- incase we want to remove avatar | let onErrorImg = 'https://cdn.tagembed.com/app/img/author2.png'; -- */
        let onErrorImg = `https://ui-avatars.com/api/?name=${item.author.username}&background=123&color=fff&rounded=true`

        return (
            <div
                className={item.network.id == 32 ? 'postAuthorVk' : `postAuthor ${(item.postAuthor === 0) ? 'authorDetailsHide' : ''} ${parseInt(imgWidth) < 201 ? 'minimumPost' : ''}`}>
                <Helmet>
                    <script src="https://kit.fontawesome.com/2c8c0b245c.js" crossorigin="anonymous"></script>
                </Helmet>
                <div className="postNetwork" data-network={network.name} data-network-color={network.color}>
                    <i className={network.id === 20 ? 'fab fa-slack' : `fa ${(network.id === 7) ? 'fa-youtube-play' : network.icon}`}
                        style={{ color: item.iconColor }}>
                    </i>
                </div>
                <div className={`authorInfo ${(item.author.username == 'Instagram User') ? 'postByInstaHandel' : ' '}`}
                    style={{ display: (item.instaHash === 0) ? 'none' : 'flex' }}>

                    <div><img style={{ display: (item.postAuthor === 0) ? 'none' : 'block' }} src={item.author.picture}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = (item.author.errorPic) ? item.author.errorPic : onErrorImg;
                        }}
                        alt="" className={`${(network.id !== 4) ? 'roundedCircle' : 'shadowNone'}`} />
                    </div>
                    <div className="postAuthorInfo">
                        <div className="postAuthorName textTruncate" style={{
                            display: (item.postAuthor === 0) ? 'none' : 'block',
                            color: wall.ThemeRule.authorColor,
                           
                        }}>
                            {item.author.name}
                        </div>

                        <div className="authrHandleTime">
                            <small className="authrHandle textTruncate" style={{
                                display: (item.postAuthor === 0) ? 'none' : 'block',
                                color: wall.ThemeRule.authorColor,
                              
                            }} target="_blank">
                                @{item.author.username}
                            </small>
                            <div className="sepratedot" style={{
                                display: (item.postAuthor === 0 || item.timePost === 0) ? 'none' : 'block',
                                color: wall.ThemeRule.authorColor
                            }}></div>
                            <small className="timePost" style={{
                                display: (item.timePost === 0) ? 'none' : 'block',
                                color: wall.ThemeRule.authorColor,
                               
                            }} data-livestamp={item.createdAt}>
                                {moment(new Date(item.createdAt * 1000)).fromNow()}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default postAuthor;