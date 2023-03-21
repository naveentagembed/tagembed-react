import React, {PureComponent, Fragment} from 'react';
import {checkStringInNotNull, convertHtmlStringToRender} from '../themes/customFunction'
import MediaPost from './mediaPost'
import ContentPost from './contentPost'
import PostAuthor from './postAuthor'
import ShareWrapper from './themeContentPost/shareWrapper'


class CardPostFile extends PureComponent {
    state = {
        height: 300,
    }


    render() {
        const {item, imgWidth, widgetTheme, wallId, wall} = this.props;
        const {height} = this.state;

        return widgetTheme === 5 ? <Fragment>
                <MediaPost wallId={wallId} widgetTheme={widgetTheme} imgHeight={height} imgWidth={imgWidth} file={item.file}
                           postFileNew={item.postFileNew} type={item.type} item={item}
                           isFile={checkStringInNotNull(item.file)} personalization={wall.Personalization}
                           network={item.network} wall={wall}/>
                <PostAuthor network={item.network} item={item} wall={wall}/>
                <ContentPost item={item} isRating={checkStringInNotNull(item.rating)} rating={item.rating}
                             network={item.network} isCta={checkStringInNotNull(item.cta)} cta={item.cta}
                             widgetTheme={widgetTheme} imgWidth={imgWidth} wall={wall}/>
                {!item.socialAction && <ShareWrapper network={item.network} item={item}/>}
                {checkStringInNotNull(item.cta) ? convertHtmlStringToRender(item.cta) : null}

            </Fragment> :
            <React.Fragment>
                {/* Used to display Author details Start */}
                {widgetTheme === 49 && <PostAuthor network={item.network} item={item} wall={wall}/>}
                {widgetTheme === 20 || widgetTheme === 53 ?
                    <PostAuthor network={item.network} item={item} wall={wall}/> : null}
                {widgetTheme !== 52 && widgetTheme !== 53 ?
                    <MediaPost wall={wall} wallId={wallId} widgetTheme={widgetTheme} imgHeight={height}
                               imgWidth={imgWidth} file={item.file} postFileNew={item.postFileNew} type={item.type}
                               item={item} isFile={checkStringInNotNull(item.file)}
                               personalization={wall.Personalization} network={item.network}/> : ''}

                {widgetTheme === 19 ? <PostAuthor network={item.network} item={item} wall={wall}/> : null}

                <ContentPost item={item} isRating={checkStringInNotNull(item.rating)} rating={item.rating}
                             network={item.network} isCta={checkStringInNotNull(item.cta)} cta={item.cta}
                             widgetTheme={widgetTheme} imgWidth={imgWidth} wall={wall}/>

                {widgetTheme === 4 || widgetTheme === 52 ?
                    <PostAuthor network={item.network} item={item} imgWidth={imgWidth} wall={wall}/> : null}

                {((widgetTheme === 19 || widgetTheme === 3 || widgetTheme === 4) && !item.socialAction) ?
                    <ShareWrapper network={item.network} item={item}/> : null}
                {widgetTheme === 50 && <ShareWrapper network={item.network} item={item}/>}
                {(widgetTheme === 53 || widgetTheme === 52) && <ShareWrapper network={item.network} item={item}/>}
            </React.Fragment>
    }
}

export default CardPostFile;