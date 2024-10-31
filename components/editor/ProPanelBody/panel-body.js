import classnames from 'classnames'
import { useMergeRefs } from '@wordpress/compose'
import { forwardRef, useRef  , useState} from '@wordpress/element'
import { chevronUp, chevronDown } from '@wordpress/icons'
import {
    Button, Icon, FormToggle,
} from '@wordpress/components'
import { debounce } from 'lodash'

const noop = () => {}

const scrollIntoViewIfNeeded = debounce( el => {
    if ( el ) {
        const isAboveView = el.getBoundingClientRect().top < 200
        if ( isAboveView ) {
            el.scrollIntoView( {
                inline: 'start',
                block: 'start',
                behavior: 'instant',
            } )
        }
    }
}, 0, { leading: false, trailing: true } )

const PanelBody = (
    {
        buttonProps = {},
        children,
        className,
        icon,
        initialOpen,
        onToggle = noop,
        isOpen: isForcedOpen = false,
        title,
        id = '',
        checked,
        hasToggle = undefined,
        onChange = noop,
        isPremiumPanel = false,
        showModifiedIndicator = false,
    },
    ref
) => {

    const [ isOpened, setIsOpened ] = useState(false);

    const nodeRef = useRef()

    const handleOnToggle = event => {
        event.preventDefault()
        const newIsOpened = ! isOpened
        setIsOpened( newIsOpened )
        onToggle( newIsOpened )
        if ( ! newIsOpened ) {
            scrollIntoViewIfNeeded( nodeRef.current )
        } else {
            setTimeout( () => {
                scrollIntoViewIfNeeded( nodeRef.current )
            }, 0 )
        }
    }

    const classes = classnames( 'components-panel__body', 'savvy-toggle-panel-body', 'focal-point-control', className, {
        'is-opened': isOpened,
        [ `savvy-panel--${ id }` ]: id,
        'savvy_new_toggle_panel': isPremiumPanel,
    } )

    return (
        <div className={ classes } ref={ useMergeRefs( [ nodeRef, ref ] ) }>
            <PanelBodyTitle
                icon={ icon }
                isOpened={ isOpened }
                onClick={ handleOnToggle }
                title={ title }
                checked={ checked }
                hasToggle={ typeof hasToggle === 'undefined' ? !! onChange : hasToggle }
                onChange={ onChange }
                setIsOpened={ setIsOpened }
                isPremiumPanel={ isPremiumPanel }
                showModifiedIndicator={ showModifiedIndicator }
                { ...buttonProps }
            />
            { typeof children === 'function'
                ? children( { opened: true } )
                : children }
        </div>
    )
}

const PanelBodyTitle = forwardRef(
    ( {
          isOpened, icon, title, isPremiumPanel, showModifiedIndicator,
          checked, hasToggle, onChange, setIsOpened,
          ...props
      }, ref ) => {
        if ( ! title ) {
            return null
        }

        return (
            <h2 className="components-panel__body-title">
                <Button
                    className="savvy-component-body_toggle savvy-panel "
                    aria-expanded={ isOpened }
                    ref={ ref }
                    { ...props }
                >
                    <span aria-hidden="true">
						<Icon
                            className="components-panel__arrow"
                            icon={ isOpened ? chevronUp : chevronDown }
                        />
					</span>
                    { hasToggle && (
                        <FormToggle
                            className="savvy-toggle-panel-form-toggle"
                            checked={ checked }
                            onClick={ ev => {
                                ev.stopPropagation()
                                ev.preventDefault()
                                if ( checked && isOpened ) {
                                } else if ( ! checked && ! isOpened ) {
                                    setIsOpened( isOpen => ! isOpen )
                                }
                                if ( onChange ) {
                                    onChange( ! checked )
                                }
                            } }
                            aria-describedby={ title }
                        />
                    ) }
                    { title }
                    <span className={ classnames( [
                        'savvy-panel-selector',
                        { 'savvy-showed': showModifiedIndicator },
                    ] ) } />
                    { isPremiumPanel && (
                        <div className="savvy-circle-tab" />
                    ) }
                    { icon && (
                        <Icon
                            icon={ icon }
                            className="savvy-components-panel_svg"
                            size={ 20 }
                        />
                    ) }
                </Button>
            </h2>
        )
    }
)

const UpdateComponent = forwardRef( PanelBody )
UpdateComponent.displayName = 'PanelBody'

export default UpdateComponent
