function IconExclamationMark({ size = "1rem" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <g clip-path="url(#a)">
        <path
          fill="#18181b"
          fill-rule="evenodd"
          d="m8.91 1.76-.33 6.5c0 .14-.11.24-.24.24h-.68a.25.25 0 0 1-.25-.24l-.32-6.5c0-.14.1-.26.25-.26h1.32c.14 0 .26.12.25.26m1.17 6.58.33-6.5C10.46.84 9.66 0 8.66 0H7.34c-1 0-1.8.84-1.75 1.84l.33 6.5c.04.93.81 1.66 1.74 1.66h.68c.93 0 1.7-.73 1.74-1.66M8 12.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2m2.5 1a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0"
          clip-rule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default IconExclamationMark;
