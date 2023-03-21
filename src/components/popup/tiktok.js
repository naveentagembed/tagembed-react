import React, {PureComponent} from 'react'
import {Helmet} from "react-helmet";


class Tiktoks extends PureComponent {

    state = {
        data: null
    }

    componentDidMount() {
        this.onLoad();
        const {data} = this.props
        this.setState({data});
    }

    onLoad = () => {
        const scriptList = document.querySelectorAll("script[type='text/javascript']")
        const convertedNodeList = Array.from(scriptList)
        const testScript = convertedNodeList.find(script => script.id === "tiktok-embed")
        if (testScript) {
            var element = document.getElementById("tagembedPopup");
            element.classList.remove("tiktopPopupwrap");
            testScript.parentNode.removeChild(testScript)
        }

    }

    componentWillReceiveProps(nextProps) {
        this.onLoad();
        const {data} = nextProps
        setTimeout(() => {
            var element = document.getElementById("tagembedPopup");
            element.classList.add("tiktopPopupwrap");
            this.setState({data})
        }, 1000)
    }

    componentWillUnmount() {
        this.setState({data: null});
    }

    render() {
        const {data} = this.state;
        return data && <>
            <blockquote key={data.id} className="tiktok-embed" cite={data.link}
                        data-video-id={data.link.substring(data.link.lastIndexOf('/') + 1)}
                        style={{maxWidth: "605px", minWidth: "330px",minHeight:300}}>
                <section></section>
            </blockquote>
            <Helmet>
                <script id="tiktok-embed" async src="https://www.tiktok.com/embed.js" type="text/javascript"></script>
            </Helmet>
        </>
    }
}

export default Tiktoks;