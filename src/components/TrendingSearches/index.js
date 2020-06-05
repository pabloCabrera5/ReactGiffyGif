import React, { Suspense } from 'react';
import useNearScreen from 'hooks/useNearScreen';
import Spinner from 'components/Spinner';

// we only load the file when its required, by dinamic import, asyncronous and return a promise
const TrendingSearches = React.lazy(
    () => import('./TrendingSearches')
)
// only load what the users needs
export default function LazyTrendingSearches() {
    // our hook near screen will set the observer to an element (elementRef) which we wil set it our div
    // and will observe it and set to true when near, and we will display it
    const { isNearScreen, elementRef } = useNearScreen({
        distance: '0px',
    });

    // as the lazy module return a promise we need to envolve the compnent inside a Suspense tag expecifying a fallback ( tell react what rendering during he resolves the promise ) 
    return <div ref={elementRef}>
        <Suspense fallback={<Spinner />} >
            {isNearScreen ? <TrendingSearches /> : <Spinner />}
        </Suspense>
    </div>
}