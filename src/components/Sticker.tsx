import React from 'react';

export type StickerType =
  // Wedding Elements
  | 'arch'
  | 'greenery-bush'
  | 'bouquet'
  | 'envelope'
  | 'candelabra'
  | 'chair'
  | 'bird-seal'
  | 'calla-stems'
  // Botanical Flowers
  | 'white-rose'
  | 'blue-hydrangea'
  | 'green-hydrangea'
  | 'chamomile-bouquet'
  | 'white-lisianthus'
  | 'green-gerbera'
  | 'white-alstroemeria'
  | 'green-snapdragon'
  | 'green-viburnum'
  | 'white-laceflower'
  | 'green-orchid'
  | 'single-calla'
  | 'white-stock'
  | 'white-lily'
  | 'bells-of-ireland'
  | 'white-waxflower'
  | 'hypericum-berries'
  | 'green-carnation-stem'
  | 'chamomile-stem'
  | 'carnation-light-green'
  | 'pompon-green'
  // Legacy Aliases
  | 'bow'
  | 'champagne-tower'
  | 'white-bouquet'
  | 'cake'
  | 'letter'
  | 'shoes'
  | 'perfume'
  | 'details-oval'
  | 'ribbon-flutes'
  | 'ring-box'
  | 'yellow-flower'
  | 'pink-bouquet'
  | 'polaroid'
  | 'single-flower';

interface StickerProps {
  type: StickerType;
  className?: string;
  style?: React.CSSProperties;
  rotate?: number;
  width?: string | number;
}

export const Sticker: React.FC<StickerProps> = ({
  type,
  className = '',
  style = {},
  rotate = 0,
  width = '80px',
}) => {
  const widthStyle = typeof width === 'number' ? `${width}px` : width;

  return (
    <div
      className={`inline-block pointer-events-none select-none drop-shadow-md transition-transform duration-300 ${className}`}
      style={{
        width: widthStyle,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      <img
        src={`/images/stickers/${type}.png`}
        alt={`${type} sticker`}
        className="w-full h-auto object-contain block"
        loading="lazy"
      />
    </div>
  );
};
