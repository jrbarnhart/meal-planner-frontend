export default function Icon({
  ...props
}: {
  height?: number;
  width?: number;
  className?: string;
}) {
  const { height, width, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 67.733 67.733"
      height={height ?? 256}
      width={width ?? 256}
      className={className ?? ""}
    >
      <defs>
        <linearGradient id="c">
          <stop offset="0" stopColor="#29d640" />
          <stop offset="1" stopColor="#1c8a2a" />
        </linearGradient>
        <linearGradient id="b">
          <stop offset="0" stopColor="#fff" stopOpacity=".544" />
          <stop offset="1" stopColor="#fff" stopOpacity=".034" />
        </linearGradient>
        <linearGradient id="a">
          <stop offset="0" stopColor="#333" />
          <stop offset="1" stopColor="#696969" />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(1.3908 0 0 1.3908 -13.858 -101.733)"
          gradientUnits="userSpaceOnUse"
          y2="283.041"
          x2="12.862"
          y1="242.698"
          x1="54.115"
          id="d"
          xlinkHref="#c"
        />
        <linearGradient
          y2="259.374"
          x2="59.383"
          y1="261.954"
          x1="65.09"
          gradientTransform="scale(1.3908) rotate(-15 -850.754 229.472)"
          gradientUnits="userSpaceOnUse"
          id="g"
          xlinkHref="#a"
        />
        <linearGradient
          y2="260.967"
          x2="13.204"
          y1="262.356"
          x1="4.441"
          gradientTransform="scale(1.3908) rotate(15 910.977 151.316)"
          gradientUnits="userSpaceOnUse"
          id="f"
          xlinkHref="#a"
        />
        <radialGradient
          gradientTransform="matrix(2.33138 -3.156 1.40277 1.03625 -414.28 99.99)"
          gradientUnits="userSpaceOnUse"
          r="18.58"
          fy="262.355"
          fx="34.444"
          cy="262.355"
          cx="34.444"
          id="e"
          xlinkHref="#b"
        />
      </defs>
      <g transform="translate(0 -229.267)" paintOrder="fill markers stroke">
        <circle r="31.615" cy="263.13" cx="34.085" fill="url(#d)" />
        <path
          d="M51.932 281.033a25.292 25.292 0 0 1-35.769 0 25.292 25.292 0 0 1 0-35.768 25.292 25.292 0 0 1 35.769 0 25.292 25.292 0 0 1 0 35.768z"
          fill="url(#e)"
          stroke="#000"
          strokeWidth="1.104"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M56.243 285.344a31.389 31.389 0 0 1-44.39 0 31.389 31.389 0 0 1 0-44.39 31.389 31.389 0 0 1 44.39 0 31.389 31.389 0 0 1 0 44.39z"
          fill="none"
          stroke="#000"
          strokeWidth="2.208"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="m49.774 17.935-16 16.547-12.761-13.336"
        fill="none"
        stroke="#000"
        strokeWidth="4.416"
        strokeLinejoin="round"
      />
      <path
        d="M17.047 24.01c-3.454 11.18-6.32 22.519-10.364 33.54-.395 1.141.227 3.412 2.066 3.89 1.443.375 3.08-.407 3.551-2.384 2.698-12.058 5.05-22.82 7.574-34.23 0 0 2.546.119 4.123-2.186 1.578-2.305 2.239-5.714 2.239-5.714l2.55-9.52s-.111-1.13-.828-1.321c-.716-.192-1.475.64-1.475.64l-2.857 10.453c-.018.14-.561.917-1.12.786-.76-.157-.656-1.13-.63-1.227l2.76-10.4s-.099-1.138-.835-1.31c-.737-.172-1.484.638-1.484.638l-2.842 10.603c-.035.133-.478.838-1.269.637-.744-.192-.827-.787-.765-1.056l2.917-10.886s.062-.892-.84-1.109c-.901-.216-1.572.59-1.572.59L15.4 14.14s-1.353 4.642-.8 6.377c.622 1.951 1.53 3.186 2.448 3.493z"
        fill="url(#f)"
        stroke="#000"
        strokeWidth=".736"
      />
      <path
        d="M56.027 39.461c.152 1.124 1.408 6.738 5.1 18.529.58 1.948-.447 3.443-1.884 3.84-1.832.506-3.506-1.15-3.734-2.335-2.009-11.568-8.787-34.817-9.104-36.45-.326-1.593-2.699-13.93.654-18.078.89-1.176 1.945-.56 2.194.372l8.435 31.48c.363 1.265-.796 2.353-1.66 2.642z"
        fill="url(#g)"
        stroke="#000"
        strokeWidth=".736"
      />
      <path
        d="M47.901 4.416s-.23-.366-.042 1.574c.921 9.452 6.895 32.747 8.066 33.722l1.318-.904.536-1.952-8.635-32.054z"
        fillOpacity=".238"
      />
    </svg>
  );
}