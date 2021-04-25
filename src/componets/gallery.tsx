import { Box } from "@cabezonidas/shop-ui";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useSearchAlbums } from "../api/use-search-albums";
import { Thumbnail } from "./thumbnail";

type Album = {
  link: string;
  cover: string;
  title: string;
  count: number;
  newIndex: boolean;
};

export const Gallery = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Box>>(
  (props, ref) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchAlbums({
      getNextPageParam: lastPage => {
        const nextPage = lastPage.photosets.page + 1;
        if (nextPage <= lastPage.photosets.pages) {
          return nextPage;
        }
      },
    });

    const { ref: thumbnailRef, inView } = useInView();

    const albums =
      (data?.pages ?? []).reduce<Album[]>(
        (res, curr) => [
          ...res.map(p => ({ ...p, newIndex: false })),
          ...(curr.photosets.photoset ?? []).map(
            (
              { id: album, farm, title: { _content: title }, primary, secret, count_photos },
              index
            ) => ({
              link: `https://www.flickr.com/photos/lareposteria/albums/${album}`,
              cover: `https://live.staticflickr.com/${farm}/${primary}_${secret}_n.jpg`,
              title,
              count: count_photos,
              newIndex: index === 0,
            })
          ),
        ],
        []
      ) ?? [];

    React.useEffect(() => {
      if (inView && !(!hasNextPage || isFetchingNextPage)) {
        fetchNextPage();
      }
    }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

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
        {albums.map(album => (
          <Thumbnail key={album.link} {...album} ref={album.newIndex ? thumbnailRef : undefined} />
        ))}
      </Box>
    );
  }
);
