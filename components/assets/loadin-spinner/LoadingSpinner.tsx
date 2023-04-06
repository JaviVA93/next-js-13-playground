import style from './loadingSpinner.module.css'

export default function LoadingSpinner(props: any) {
    const classes = (props.className) ? `${style.ldsSpinner} ${props.className}` : style.ldsSpinner
    return (
        <div {...props} className={classes}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}