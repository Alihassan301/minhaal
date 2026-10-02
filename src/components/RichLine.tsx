import React from 'react';
import { HeartIcon } from 'lucide-react';
import { name } from '../data/gift';

interface RichLineProps {
  text: string;
  nameClassName?: string;
  heartClassName?: string;
}

/** Renders a line with the recipient's name highlighted and ❤️ drawn as a crafted heart. */
export function RichLine({ text, nameClassName = '', heartClassName = '' }: RichLineProps) {
  const parts = text.split(/(❤️|❤)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part === '❤️' || part === '❤') {
          return (
            <HeartIcon
              key={i}
              aria-label="love"
              className={`inline-block h-[0.7em] w-[0.7em] fill-rose stroke-rose align-baseline ${heartClassName}`} />);


        }
        const pieces = part.split(name);
        return (
          <React.Fragment key={i}>
            {pieces.map((piece, j) =>
            <React.Fragment key={j}>
                {piece}
                {j < pieces.length - 1 && <span className={nameClassName}>{name}</span>}
              </React.Fragment>
            )}
          </React.Fragment>);

      })}
    </>);

}