import React from 'react';


const Logo = React.forwardRef(({ href, ...props }, ref) => (
  <a href={href} ref={ref} {...props} className='cursor-pointer'>
    <svg xmlns='http://www.w3.org/2000/svg' width='100' height='50' viewBox='0 0 363.171 144.372'>
      <g id='Group_28' data-name='Group 28' transform='translate(-1568.405 -99.305)'>
        <g id='Group_26' data-name='Group 26' transform='translate(981.066 -1344.202) rotate(60)'>
          <text
            id='C'
            transform='translate(1564.014 195.488) rotate(30)'
            fill='#d5b1fa'
            stroke='#d5b1fa'
            strokeWidth='1'
            fontSize='135'
            fontFamily='OCRAExtended, OCR A'>
            <tspan x='0' y='0'>
              C
            </tspan>
          </text>
          <text
            id='C-2'
            data-name='C'
            transform='translate(1609.432 222.139) rotate(30)'
            fill='#d5b1fa'
            stroke='#d5b1fa'
            strokeWidth='1'
            fontSize='135'
            fontFamily='OCRAExtended, OCR A'>
            <tspan x='0' y='0'>
              C
            </tspan>
          </text>
        </g>
        <g id='Group_27' data-name='Group 27' transform='translate(1684.576 101.305)'>
          <text id='Closet' transform='translate(11 91)' fill='#2a2a2a' fontSize='86' fontFamily='SegoeUI, Segoe UI'>
            <tspan x='0' y='0'>
              Closet
            </tspan>
          </text>
          <text
            id='Connect'
            transform='translate(21.675 130.308)'
            fill='#d5b1fa'
            fontSize='39'
            fontFamily='SegoeUI, Segoe UI'>
            <tspan x='0' y='0'>
              Connect
            </tspan>
          </text>
        </g>
      </g>
    </svg>
    </a>
));

export default Logo
