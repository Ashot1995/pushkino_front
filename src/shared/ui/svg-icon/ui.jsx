export function SvgIcon({id, color}) {
    return (
        <svg className="svg-icon" fill={color}>
            <use xlinkHref={`/images/icons/sprite.svg#${id}`}></use>
        </svg>
    )
}
