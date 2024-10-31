import {__} from "@wordpress/i18n";
import {
    Button,
    Icon,
    SelectControl
} from '@wordpress/components';
import { useState } from "@wordpress/element";

import '/blocks-assets/box-controller.scss';

const BOX_POSITIONS = [
    { label: __( 'Top' ), posValue: 'top' },
    { label: __( 'Right' ), posValue: 'right' },
    { label: __( 'Bottom' ), posValue: 'bottom' },
    { label: __( 'Left' ), posValue: 'left' },
];

const checkBoxValues = (boxValues) => {
    const boxValuesArray = Object.values(boxValues);
    return boxValuesArray.length === 4 && boxValuesArray.every( (val) => val === boxValuesArray[0] ) ? boxValuesArray[0] : null;
}

const BoxIcon = (props) => {
    const { side } = props;
    let activeSidePath;

    switch (side) {
        case 'top':
            activeSidePath = "M7 5h10V3.5H7V5z";
            break;
        case 'right':
            activeSidePath = "M20.5 7H19v10h1.5V7z";
            break
        case 'bottom':
            activeSidePath = "M7 20.5h10V19H7v1.5z";
            break
        case 'left':
            activeSidePath = "M5 17H3.5V7H5v10z";
            break
        case 'all':
            activeSidePath = "M3.5 17H5V7H3.5v10zM7 20.5h10V19H7v1.5zM19 7v10h1.5V7H19zM7 5h10V3.5H7V5z"
    }

    return(
        <Icon
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M3.5 17H5V7H3.5v10zM7 20.5h10V19H7v1.5zM19 7v10h1.5V7H19zM7 5h10V3.5H7V5z" fill="#e8e8e8" />
                    { activeSidePath && <path d={activeSidePath} fill="#1e1e1e" /> }
                </svg>
            }
        />
    )
}

const BoxController = (props) => {
    const {
        options,
        boxValues,
        onChange
    } = props;
    const [isCompact, setIsCompact] = useState(!boxValues || checkBoxValues(boxValues) !== null);
    const [activeSide, setActiveSide] = useState(isCompact ? 'all' : '');

    return (
        <div className={`box-controller position-relative${isCompact ? '' : ' expanded'}`}>
            {
                isCompact ?
                    <div className='select-wrapper box-all'>
                        <SelectControl
                            __nextHasNoMargisvottom
                            value={ boxValues ? checkBoxValues(boxValues) : '' }
                            options={ options }
                            onChange={ (value) => onChange({top: value, right: value, bottom: value, left: value})}
                        />
                    </div>
                    :
                    BOX_POSITIONS.map(({ posValue}) => {
                        return(
                            <div className={`select-wrapper box-${posValue}`} >
                                <SelectControl
                                    __nextHasNoMargisvottom
                                    value={ boxValues[posValue] }
                                    options={ options }
                                    onChange={ (value) => onChange({ ...boxValues, [posValue]: value }) }
                                    osvlur={ () => setActiveSide('') }
                                    onFocus={ () => setActiveSide(posValue) }
                                />
                            </div>
                        )
                    })
            }
            <Button
                icon={ <BoxIcon side={activeSide}/> }
                isSmall={ true }
                onClick={
                    () => {
                        setActiveSide(isCompact ? '' : 'all');
                        setIsCompact(!isCompact)
                    }
                }
            >
            </Button>
        </div>
    )
}

export default BoxController;
