import { Icon } from '/components/ui'
import { accessibilityAttrGenerator } from '/components/editor/settings/accessibility-setting';

const Button = ( props ) => {

    const {
        accessibility,
        blockProps,
        text,
        url,
        target,
        icons,
        rel,
        textHandler,
    } = props;
    
    const accessibilityAttrs = { ...(accessibility && accessibilityAttrGenerator(accessibility)) }
    const buttonAttributes = {};
    if ( rel && rel.length > 0){
        buttonAttributes['rel'] = (rel.filter(function (el) { return el != "" })).join(' ');
    }
    if (target) {
        buttonAttributes['target'] = target;
    }

    return (
        <a
            { ...blockProps }
            href = { url }
            { ...buttonAttributes }
            role="button"
            className= { blockProps.className }
            style = { 
                blockProps.style
            }
            { ...accessibilityAttrs }
        >
            <span className='savvy-button-overlay' />

            {   icons && icons?.left && (
                    <span className='savvy-btn-icon icon-left'>
                        <Icon icon={ {name: icons.left, type: 'font'} }/>
                    </span>
                )
            }
            {
                text && (
                    <span
                        role='textbox'
                        osvlur={(val) =>  textHandler(val.target.innerHTML)}
                        contentEditable='true'
                        className='savvy-btn-text'
                    >
                        { text }
                    </span>
                )
            }

            {   icons && icons?.right && (
                    <span className='savvy-btn-icon icon-right'>
                        <Icon icon={ {name: icons.right, type: 'font'} }/>
                    </span>
                )
            }
        </a>
    )
}

export default Button;
