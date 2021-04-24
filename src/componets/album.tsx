import React from "react";

export const Album = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    album: string;
    title: string;
    farm: number;
    primary: string;
    secret: string;
    width?: number;
    height?: number;
  }
>(({ album, farm, title, primary, secret, width = 640, height = 480, ...props }, ref) => {
  return (
    <a
      ref={ref}
      data-flickr-embed="true"
      data-header="false"
      data-footer="false"
      href={`https://www.flickr.com/photos/lareposteria/albums/${album}`}
      title={title}
      {...props}
    >
      <img
        src={`https://live.staticflickr.com/${farm}/${primary}_${secret}.jpg`}
        width={width}
        height={height}
        alt={title}
      />
    </a>
  );
});
