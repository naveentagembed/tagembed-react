import React, {PureComponent} from "react";
import {decode} from 'html-entities';
import parse from 'html-react-parser';
import Emojify from 'react-emojione';

const reactStringReplace = require("react-string-replace");
const convertCss = (hashtag_color, match, isHash) => {
    let style = `<span className="gridhashtag" style="color:${hashtag_color};font-weight:bold;">${isHash ? `#` : ``}${match}</span>`
    return style;
}

const SlackContent = ({fdata, content, personalization, unicodeyEmojiConvert}) => <React.Fragment>

    {personalization.hashtag_highlight === 1 &&
    personalization.hashtag_feed === 0 &&
    personalization.hashtag_all === 0
        ? unicodeyEmojiConvert(content)
        : personalization.hashtag_highlight === 1 &&
        personalization.hashtag_feed === 0 &&
        personalization.hashtag_all === 1
            ? unicodeyEmojiConvert(reactStringReplace(
                content,
                /#(\w+)/g,
                (match, i) => convertCss(personalization.hashtag_color, match, true)
            ))
            : personalization.hashtag_highlight === 1 &&
            personalization.hashtag_feed === 1 &&
            personalization.hashtag_all === 0 && fdata.hash.hashString
                ? unicodeyEmojiConvert(reactStringReplace(
                    decode(content),
                    fdata.hash.hashString,
                    (match, i) => convertCss(personalization.hashtag_color, match, false)
                ))
                : personalization.hashtag_highlight === 1 &&
                personalization.hashtag_feed === 1 &&
                personalization.hashtag_all === 1
                    ? unicodeyEmojiConvert(reactStringReplace(
                        decode(content),
                        /#(\w+)/g,
                        (match, i) => convertCss(personalization.hashtag_color, match, true)
                    ))
                    : unicodeyEmojiConvert(decode(content))}
</React.Fragment>

const ContentWithOutSlack = ({fdata, content, personalization}) => <React.Fragment>
    {personalization.hashtag_highlight === 1 &&
    personalization.hashtag_feed === 0 &&
    personalization.hashtag_all === 0
        ? decode(content)
        : personalization.hashtag_highlight === 1 &&
        personalization.hashtag_feed === 0 &&
        personalization.hashtag_all === 1
            ? reactStringReplace(
                decode(content),
                /#(\w+)/g,
                (match, i) => (
                    <span
                        className="gridhashtag"
                        style={{
                            color: personalization.hashtag_color,
                            fontWeight: "bold",
                        }}
                    >

                        #{match}
                    </span>
                )
            )
            : personalization.hashtag_highlight === 1 &&
            personalization.hashtag_feed === 1 &&
            personalization.hashtag_all === 0 && fdata.hash.hashString
                ? reactStringReplace(
                    decode(content),
                    fdata.hash.hashString,
                    (match, i) => (
                        <span
                            className="gridhashtag"
                            style={{
                                color: personalization.hashtag_color,
                                fontWeight: "bold",
                            }}
                        >

                            {match}
                        </span>
                    )
                )
                : personalization.hashtag_highlight === 1 &&
                personalization.hashtag_feed === 1 &&
                personalization.hashtag_all === 1
                    ? reactStringReplace(
                        decode(content),
                        /#(\w+)/g,
                        (match, i) => (
                            <span key={i}
                                  className="gridhashtag"
                                  style={{
                                      color: personalization.hashtag_color,
                                      fontWeight: "bold",
                                  }}
                            >

                                #{match}
                            </span>
                        )
                    )
                    : decode(content)}
</React.Fragment>

const findHaseTagIndex = (data) => {
    let FindHasheTag = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i] === "#") FindHasheTag.push(i);
    }
    return FindHasheTag;
}
const findWhiteSpace = (startFrom, content) => {
    let value = 0;

    for (; startFrom < content.length; startFrom++) {
        if (content[startFrom] == " " || content[startFrom] == '') {
            return value = startFrom;
            break;
        }
    }
    if (value === 0 && content.length < 210) value = content.length;
    else value = 200;
    return startFrom == undefined ? 200 : value;

}

class ContentConversion extends PureComponent {
    state = {
        isTrimEnable: false
    }
    unicodeyEmojiConvert = (data) => {
        return <Emojify style={{height: 24, width: 24}}>{parse(data)}</Emojify>
    }
    onClickReadText = event => {
        const {isTrimEnable} = this.state;
        this.setState({isTrimEnable: !isTrimEnable});
    }

    render() {
        const {fdata, fullcontentData, personalization} = this.props;

        return fdata.network.id === 20 ?
            <React.Fragment><SlackContent fdata={fdata} content={window.slackdown.parse(fullcontentData)}
                                          personalization={personalization}
                                          unicodeyEmojiConvert={this.unicodeyEmojiConvert}/>
            </React.Fragment> : <React.Fragment><ContentWithOutSlack fdata={fdata} content={fullcontentData}
                                                                     personalization={personalization}/>
            </React.Fragment>


    }

}

export default ContentConversion;