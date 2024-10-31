import { Icon } from '/components/ui'
import { accessibilityAttrGenerator } from '/components/editor/settings/accessibility-setting';

const Button = ( props ) => {

    const {
        accessibility,
        id,
        className,
        style,
        text,
        url,
        rel,
        target,
        icons,
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
            id={ id }
            href={ url }
            { ...buttonAttributes }
            role="button"
            className={ className }
            style={ style }
            { ...accessibilityAttrs }
        >
            <span className='savvy-button-overlay' />

            {
                icons && icons?.left && (
                    <span className='savvy-btn-icon icon-left'>
                        <Icon icon={ {name: icons.left, type: 'font'} }/>
                    </span>
                )
            }
            {
                text && (
                    <span className='savvy-btn-text'>{ text }</span>
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
