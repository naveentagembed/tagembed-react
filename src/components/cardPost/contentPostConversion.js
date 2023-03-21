import React, {PureComponent} from 'react';
import {decode} from 'html-entities';
import {connect} from 'react-redux';
import parse from 'html-react-parser';
import Emojify from 'react-emojione';
import {reactStringReplace} from '../../constants'

const textContentStyleSheetName = (widgetTheme) => {
    let common = `chtrLimits emojiApplied line`
    switch (widgetTheme) {
        case 4:
            return `text_trim ${common}`
            break;
        case 16:
            return `horizontal_text_trim ${common}`
            break;
        case 50:
            return `gallery_text_trim ${common}`
            break;
        default:
            return `${common}`
    }

}
const convertCss = (hashtag_color, match, isHash) => {
    let style = `<span className="gridhashtag" style="color:${hashtag_color};font-weight:bold;">${isHash ? `#` : ``}${match}</span>`
    return style;
}

class ContentPostConversion extends PureComponent {
    unicodeyEmojiConvert = (data) => {
        return <Emojify style={{height: 24, width: 24}}>{parse(data)}</Emojify>
    }

    render() {

        const {item, widgetTheme, wall} = this.props;

        return item.network.id === 20 ?
            <pre className={textContentStyleSheetName(widgetTheme)+wall.ThemeRule.lineTrim}> {
                wall.Personalization.hashtag_highlight !== 0 ?
                    wall.Personalization.hashtag_all === 1 ? this.unicodeyEmojiConvert(window.slackdown.parse(reactStringReplace(decode(item.content), /#(\w+)/g, (match, i) => convertCss(wall.Personalization.hashtag_color, match, true)), item.slackMember))
                        : wall.Personalization.hashtag_feed === 1 && (item.hash.hashString) ? this.unicodeyEmojiConvert(window.slackdown.parse(reactStringReplace(decode(item.content), item.hash.hashString, (match, i) => convertCss(wall.Personalization.hashtag_color, match, false)
                        ), item.slackMember)) : this.unicodeyEmojiConvert(window.slackdown.parse(decode(item.content), item.slackMember))
                    : this.unicodeyEmojiConvert(window.slackdown.parse(decode(item.content), item.slackMember))
            }</pre>
            : <pre className={textContentStyleSheetName(widgetTheme)+wall.ThemeRule.lineTrim}>{
                wall.Personalization.hashtag_highlight !== 0 ?
                    wall.Personalization.hashtag_all === 1 ? reactStringReplace(decode(item.content), /#(\w+)/g, (match, i) => (
                            <span key={match + i}
                                  style={{color: wall.Personalization.hashtag_color, fontWeight: "bold"}}>#{match}</span>
                        ))
                        : wall.Personalization.hashtag_feed === 1 && item.hash.hashString ? reactStringReplace(decode(item.content), item.hash.hashString, (match, i) => (
                            <span key={match + i}
                                  style={{color: wall.Personalization.hashtag_color, fontWeight: "bold"}}>{match}</span>
                        )) : decode(item.content)
                    : <p className={'chtrLimits emojiApplied line' +wall.ThemeRule.lineTrim} style={{ paddingBottom: '0px !important', textAlign: wall.ThemeRule.textAlignment }}>{decode(item.fullcontent)}</p> // replace  content with fullcontent
            }</pre>
    }
}

const mapStateToProps = state => {
    const {wall} = state
    return {
        wall: wall.wallData
    }
}
export default connect(mapStateToProps)(ContentPostConversion);