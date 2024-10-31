import {
  InnerBlocks,
  useBlockProps
} from '@wordpress/block-editor';
import {
  marginClassGenerator,
  paddingClassGenerator,
  animationClassGenerator,
  animationStyleGenerator,
  effectClassGenerator,
  effectStyleGenerator,
  getBackgroundBlockClasses,
  generateBackgroundStyles,
  renderBackgroundOverlay,
  renderBackgroundVideo
} from '/components/editor';

// Version 0.9.0 of savvy-blocks | changes: add Effects
const v1 = {
    attributes: {
        background: {
          type: "object"
        },
        effects: {
          type: "object"
        },
        margin: {
          type: "object"
        },
        padding: {
          type: "object"
        },
        textColor: {
          type: "string"
        },
        animation: {
          type: "object"
        }
      },
    save( props ) {
        const {
            attributes: {
                animation,
                background,
                effects,
                margin,
                padding,
                textColor,
            },
        } = props

        const blockProps = useBlockProps.save({
            className: [
                'savvy-section',
                ...(margin ? [marginClassGenerator(margin)] : []),
                ...(padding ? [paddingClassGenerator(padding)] : []),
                ...(textColor ? [`text-${textColor}`] : []),
                ...(animation ? [animationClassGenerator(animation)] : []),
                ...( effects? [ effectClassGenerator( effects ) ] : [] ),
                getBackgroundBlockClasses(background)
            ].join(' '),
            style: {
                ...(generateBackgroundStyles(background)),
                ...(animation && animationStyleGenerator(animation)),
                ...(effects && effectStyleGenerator(effects))
            }
        });

        return (
            <section {...blockProps}>
                {renderBackgroundOverlay(background)}
                <InnerBlocks.Content />
            </section>
        )
    }
}

const v2 = {
  attributes: {
      "background": {
        "type": "object"
      },
      "effects": {
        "type": "object"
      },
      "margin": {
        "type": "object"
      },
      "padding": {
        "type": "object"
      },
      "textColor": {
        "type": "string"
      },
      "animation": {
        "type": "object"
      }
    },
  save( props ) {
      const {
          attributes: {
            animation,
            background,
            effects,
            margin,
            padding,
            textColor,
          },
      } = props

      const blockProps = useBlockProps.save({
        className: [
            'savvy-section position-relative',
            ...(margin ? [marginClassGenerator(margin)] : []),
            ...(padding ? [paddingClassGenerator(padding)] : []),
            ...(textColor ? [`text-${textColor}`] : []),
            ...(animation ? [animationClassGenerator(animation)] : []),
            ...( effects? [ effectClassGenerator( effects ) ] : [] ),
            getBackgroundBlockClasses(background)
        ].join(' '),
        style: {
            ...(generateBackgroundStyles(background)),
            ...(animation && animationStyleGenerator(animation)),
            ...(effects && effectStyleGenerator(effects))
        }
    });

      return (
          <section {...blockProps}>
              {renderBackgroundOverlay(background)}
              {renderBackgroundVideo(background)}
              <InnerBlocks.Content />
          </section>
      )
  }
}

export default [v2, v1];
