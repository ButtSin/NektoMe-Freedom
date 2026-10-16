function IconGavel({ width = '1rem', height = '1rem' }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='m13 10 7.38 7.42A2.1 2.1 0 0 1 18.9 21c-.56 0-1.1-.22-1.5-.61L10 13m3-3L9 6m4 4 .5.5 2.3-2.3a1 1 0 0 0 0-1.4l-3.6-3.6a1 1 0 0 0-1.4 0L8.5 5.5 9 6m4 4-3 3M6 9l-.5-.5-2.3 2.3a1 1 0 0 0 0 1.4l3.6 3.6a1 1 0 0 0 1.4 0l2.3-2.3-.5-.5zm0 0 3-3M3 21h7'
      />
    </svg>
  );
}

export default IconGavel;
