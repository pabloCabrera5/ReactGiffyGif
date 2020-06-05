import { useState, useEffect, useRef } from 'react';

export default function useNearScreen({ distance = '300px', externalRef, once = true } = {}) {
    const [isNearScreen, setNearScreen] = useState(false);
    const elementRef = useRef();

    useEffect(() => {
        let observer;
        const element = externalRef ? externalRef.current : elementRef.current
        // receive by default this 2 params, the entries and the observer
        const onChange = (entries, observer) => {
            const ele = entries[0]
            // if the element is intercepting within the distance we set 
            if (ele.isIntersecting) {
                setNearScreen(true)
                //observer.unobserve(ele);
                once && observer.disconnect();
            } else {
                // to be able to made various paginations if we scroll up, we have to update the value so the event can fire again
                !once && setNearScreen(false)
            }
        }
        // we load the polifyll of intersectionObserver only if the browser dont have it (IE)
        Promise.resolve(
            typeof (IntersectionObserver) !== 'undefined'
                ? IntersectionObserver
                : import('intersection-observer')
        ).then(() => {
            observer = new IntersectionObserver(onChange, {
                rootMargin: distance
            })

            if (element) observer.observe(element);
        })
        return () => observer && observer.disconnect();
    })
    return { isNearScreen, elementRef }
}
