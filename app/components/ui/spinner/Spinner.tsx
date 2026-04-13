import './spinner.css'

export function Spinner({ size = 24 }: { size?: number }) {
    return (
        <svg
            className="spinner"
            width={size}
            height={size}
            viewBox="-20 -20 40 40"
        >
            <circle
                r="15.9154943092"
                className="spinner-circle"
            />
        </svg>
    );
}