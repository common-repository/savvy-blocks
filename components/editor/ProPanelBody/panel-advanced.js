import PanelBody from './panel-body'
import { memo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

const noop = () => {}

const PanelProSettings = memo( props => {
    return <PanelBody { ...props } />
} )

PanelProSettings.defaultProps = {
    id: '',
    className: '',
    title: __( 'Panel settings', 'savvy-blocks' ),
    checked: false,
    onChange: null,
    initialOpen: false,
    hasToggle: false,
    onToggle: noop,
    isOpen: null,
}

export default PanelProSettings
