import { CountUp } from 'countup.js';

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll( '.Savvy-counter' ).forEach(
        element => {
            const counter = new CountUp(element, element.dataset.endVal, {
                startVal: element.dataset.startVal,
                duration: element.dataset.duration,
                separator: element.dataset.separator,
                prefix: element.dataset.prefix,
                suffix: element.dataset.suffix,
                enableScrollSpy: true
            });

            if (!counter.error) {
                counter.start();
            } else {
                console.error(counter.error);
            }
        }
    );
})

