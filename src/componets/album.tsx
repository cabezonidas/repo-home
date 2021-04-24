import React from "react";

export const Album = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    link: string;
    cover: string;
    width?: number;
    height?: number;
  }
>(({ title, link, cover, width = 640, height = 480, ...props }, ref) => {
  return (
    <a
      ref={ref}
      data-flickr-embed="true"
      data-header="false"
      data-footer="false"
      href={link}
      title={title}
      {...props}
    >
      <img src={cover} width={width} height={height} alt={title} />
    </a>
  );
});
