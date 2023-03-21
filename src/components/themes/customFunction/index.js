import parse from 'html-react-parser';
import Scrollbar from 'smooth-scrollbar';

export const scrlBarComan = (BackgroundImagePath, ThemeRuleTransparent, widgetTheme, isMobile, height, errorData, Bg_Path, ThemeRuleBackgroundColor, fixedHeightStyle) => {

    return {
        backgroundImage: BackgroundImagePath !== null && ThemeRuleTransparent === 0 ? 'url(' + Bg_Path + ')' : null,
        backgroundColor: ThemeRuleTransparent === 0 ? ThemeRuleBackgroundColor : "none",
        backgroundRepeat: "repeat",//"no-repeat",
        backgroundSize: "100%",//"cover",
        backgroundPosition: "center top",
        overflow: widgetTheme !== 49 && fixedHeightStyle == null ? 'hidden' : 'auto',
        outline: "none",
        marginTop: 0,
        backgroundAttachment: 'fixed',
        display: (errorData === 203 || errorData === 207 || errorData === 201 || errorData === 202 || errorData === 204 || errorData === 205 || errorData === 206 || errorData === 208 || errorData === 209 || errorData === 211 || errorData === 212) ? 'none' : 'block',
        scrollbarWidth: 'none'
    }
}

export const checkStringInNotNull = (string) => string != null && string !== "" ? true : false;
export const convertHtmlStringToRender = (html) => parse(html)

/* SCROLLBAR */
const scrollFun = (loadMoreRequest) => {
    var ScrollbarOptions = {
        damping: 0.1,
        thumbMinSize: 10
    };
    const Scroll = Scrollbar.init(document.querySelector('#themesPostWrapper'), ScrollbarOptions);
    Scroll.addListener((s) => {
        let documentHeight = document.body.scrollHeight;
        let load = (parseInt(documentHeight) / 2) > 250 ? (parseInt(documentHeight) / 2) : 250;
        if ((s.offset.y) >= (s.limit.y - load)) {
            loadMoreRequest().then((scrollResponse) => {
            })
        }
    })
}
export const scrollbarComman = (loadMoreRequest) => scrollFun(loadMoreRequest);

