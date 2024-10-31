function FlipSVG({ svgUrl, types }) {

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(svgUrl, 'text/xml');
        let svgElement = xmlDoc.documentElement;

        types.forEach(type => {
            if (type === 'flip_shape_horizontally') {
                svgElement.setAttribute('transform', 'scale(-1, 1)');
            } else if (type === 'flip_shape_vertically') {
                svgElement.setAttribute('transform', 'scale(1, -1)');
            }
        });

        return new XMLSerializer().serializeToString(svgElement);

}

export default FlipSVG;
