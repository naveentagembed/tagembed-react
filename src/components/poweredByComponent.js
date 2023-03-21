import React, {PureComponent} from 'react';
import tagembedIcon from '../assets/icons/tagembed-icon52x52.png';

const poweredByWrapper = {
    display: 'inline-flex',
    width: '100%',
    justifyContent: 'flex-end'
}
const powered_byStyle = {
    padding: '5px 12px 5px 12px', borderRadius: '4px',
    fontWeight: 600,
    border: '1px solid white',
    display: 'inline-flex',
    backgroundColor: '#ffffff',
    color: '#1f1b1b',
    width: 'auto',
    fontSize: '14px',
    alignItems: 'center'
}
const polaroidCardStyle = {
    padding: '5px 12px 5px 12px',
    borderRadius: '4px',
    fontWeight: 600,
    border: '1px solid white',
    display: 'inline-block',
    backgroundColor: '#ffffff',
    color: '#333333',
    fontSize: '14px',
    zIndex: '96',
}

const squareCardStyle = {
    padding: '3px 6px',
    borderRadius: '4px',
    fontWeight: 600,
    border: '1px solid white',
    display: 'inline-block',
    backgroundColor: 'rgba(21, 21, 21, 0.7411764705882353)',
    color: '#ffffff',
    fontSize: '14px',
    zIndex: '96',
}
const horizontalStyle = {
    ...squareCardStyle,
    position: 'absolute',
    bottom: '6px',
    right: '4px',
    zIndex: '96',
    marginBottom: 4
}

/* To display the notice badge for free users*/
class PoweredBY extends PureComponent {
    render() {
        const {widgetTheme, wallId} = this.props;
        return <a className={`theme${widgetTheme}_poweredBy poweredBy`} rel="noopener noreferrer"
                  href={`https://tagembed.com/?utm_source=free_plan_widget_${widgetTheme}&utm_medium=${wallId}&utm_campaign=powered-by-logo`}
                  target="_blank" style={widgetTheme === 20 ? poweredByWrapper : null}>
            <div className="poweredbywrapper"
                 style={widgetTheme === 4 ? squareCardStyle : widgetTheme === 3 ? polaroidCardStyle : widgetTheme === 16 || widgetTheme === 55 ? horizontalStyle : powered_byStyle}>
                <img src={tagembedIcon} width="24px" height="24px" alt="tagembed"/>
                <span>Powered by Tagembed</span>
            </div>
        </a>
    }
}

export default PoweredBY;