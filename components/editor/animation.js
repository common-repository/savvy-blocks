const animationClassGenerator = (animation) => {
    const classList = [];

    if (animation?.name) {
        if (animation?.name?.value === 'fade' || animation?.name?.value === 'slide') {
            classList.push(`anim-${animation?.name?.value}-${animation.name?.action}`);
        } else if (animation?.name?.value === 'fill') {
            classList.push(`anim-${animation?.name?.value}-${animation.type}`);
        } else if (animation?.name?.value === 'custom') {
            if (animation?.togglePoints === true) {
                classList.push(`anim-${animation?.name?.value}3`);
            } else {
                classList.push(`anim-${animation?.name?.value}2`);
            }
        } else {
            classList.push(`anim-${animation?.name?.value}`);
        }
    }
    if (animation?.eventName) {
        classList.push(`animate-${animation.eventName}`);
    }
    if (animation?.timingFunction) {
        classList.push(`anim-timing-${animation.timingFunction}`);
    }
    if (animation?.direction) {
        classList.push(`anim-dir-${animation.direction}`);
    }
    if (animation?.stopReverse) {
        classList.push(`anim-stop-reverse`);
    }
    if (animation?.fillMode) {
        classList.push(`anim-fill-mode-${animation.fillMode}`);
    }

    return classList.join(' ');
}

const animationStyleGenerator = (animation) => {

    const style = {
        animationDuration: animation?.duration || undefined,
        '--animation-scale': animation?.scale || undefined,
        '--animation-fill-first': animation?.type === 'type-color' && animation?.color?.first ? animation?.color?.first : undefined,
        '--animation-fill-second': animation?.type === 'type-color' && animation?.color?.second ? animation?.color?.second : undefined,
        '--animation-fill-gradient': animation?.type === 'type-gradient' && animation?.gradient?.value ? animation?.gradient?.value : undefined,
        '--animation-fill-gradient-size': animation?.type === 'type-gradient' && animation?.gradient?.size ? animation?.gradient?.size + '%' : undefined,
        '--animation-fill-gradient-from': animation?.type === 'type-gradient' && animation?.gradient?.from ? animation?.gradient?.from : undefined,
        '--animation-fill-gradient-to': animation?.type === 'type-gradient' && animation?.gradient?.to ? animation?.gradient?.to : undefined,
        animationDelay: animation?.delay || undefined,
        animationIterationCount: animation?.infinite ? 'infinite' : (animation?.iterations || undefined),
    };

    if (animation?.name?.value === 'custom'){
        for (const key of ['first', 'middle', 'last']) {
            const opacityKey = `--animation-custom-${key}-opacity`;
            const blurKey = `--animation-custom-${key}-blur`;
            const horizontalKey = `--animation-custom-${key}-horizontal`;
            const verticalKey = `--animation-custom-${key}-vertical`;
            const rotateKey = `--animation-custom-${key}-rotate`;
            const scaleKey = `--animation-custom-${key}-scale`;
            const transformKey = `--animation-custom-${key}-transform`;
    
            const opacityValue = animation?.name?.value === 'custom' && animation?.points?.[key]?.opacity/10;
            const blurValue = animation?.name?.value === 'custom' && animation?.points?.[key]?.blur;
            const horizontalValue = animation?.name?.value === 'custom' && animation?.points?.[key]?.horizontal;
            const verticalValue = animation?.name?.value === 'custom' && animation?.points?.[key]?.vertical;
            const rotateValue = animation?.name?.value === 'custom' && animation?.points?.[key]?.rotate;
            const scaleValue = animation?.name?.value === 'custom' && animation?.points?.[key]?.scale;
            const transformValue = animation?.name?.value === 'custom' && animation?.points?.[key]?.transformOrigin;
    
            style[opacityKey] = opacityValue !== undefined ? `${opacityValue};` : '1';
            style[blurKey] = blurValue !== undefined ? `${blurValue}px;` : '0';
            style[horizontalKey] = horizontalValue !== undefined ? `${horizontalValue}px;` : '0';
            style[verticalKey] = verticalValue !== undefined ? `${verticalValue}px;` : '0';
            style[rotateKey] = rotateValue !== undefined ? `${rotateValue}deg;` : '0';
            style[scaleKey] = scaleValue !== undefined ? `${scaleValue};` : '1';
            style[transformKey] = transformValue !== undefined ? `${transformValue};` : 'center center';
        }   
    }

    return style;
}

export {
    animationClassGenerator,
    animationStyleGenerator
};