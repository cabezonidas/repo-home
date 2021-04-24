import { Box } from "@cabezonidas/shop-ui";
import React from "react";
import { useSearchAlbums } from "../api/use-search-albums";
import { Thumbnail } from "./thumbnail";

export const Gallery = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Box>>(
  (props, ref) => {
    const { data } = useSearchAlbums();

    const albums = data?.photosets.photoset.map(
      ({ id: album, farm, title: { _content: title }, primary, secret, count_photos }) => ({
        link: `https://www.flickr.com/photos/lareposteria/albums/${album}`,
        cover: `https://live.staticflickr.com/${farm}/${primary}_${secret}_n.jpg`,
        title,
        count: count_photos,
      })
    );

    return (
      <Box
        ref={ref}
        display="grid"
        style={{
          rowGap: 10,
          columnGap: 10,
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
        {...props}
      >
        {albums?.map(album => (
          <Thumbnail key={album.link} {...album} />
        ))}
      </Box>
    );
  }
);
