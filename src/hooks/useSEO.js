import { useEffect, useRef } from 'react'

export default function useTitle({ description, title }) {
    const prevTitle = useRef(document.title)
    const prevDescription = useRef(document.querySelector('meta[name="description"]').getAttribute('content'))

    // we have this hook to be able to change the title and the description of the web, for SEO purpose
    // but since this is not very scalable, we move to React Helmet

    // effect to update the title
    useEffect(() => {
        const previousTitle = prevTitle.current;
        if (title) {
            document.title = `${title} | Giffy`
        }

        return () => {
            // this will be executed every time the compo is unmounted, and before calling the proper effect
            document.title = previousTitle
        }
    }, [title])

    // effect to update the description
    useEffect(() => {
        const metaDescription = document.querySelector('meta[name="description"]')
        const previousDescription = prevDescription.current

        if (description) {
            metaDescription.setAttribute('content', description)
        }

        return () =>
            metaDescription.setAttribute('content', previousDescription)
    }, [description])
}