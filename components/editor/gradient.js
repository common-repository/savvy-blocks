import { useContext } from '@wordpress/element';
import { GradientPicker } from '@wordpress/components';

import { Settings } from '/components/context';

const Gradient = (props) => {
    const {
        value: gradientValue,
        onChange
    } = props;

    const { settings } = useContext( Settings )

    const gradients = settings && settings?.gradients;

    return (
        <>
            <GradientPicker
                __nextHasNoMargin
                value={ gradientValue }
                onChange={ ( value ) => onChange(value) }
                gradients = { gradients || [] }
            />
        </>
    )
}

export {
    Gradient as default
};
