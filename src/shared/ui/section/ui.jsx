export function Section({defaultClass, children}) {
    return (
        <section className={defaultClass}>
            <div className={`${defaultClass}__container`}>
                {children}
            </div>
        </section>
    )
}
