import { Box, useBreakpoint } from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
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

    const { isLarge, isMediumLarge } = useBreakpoint();

    const fontSizeHeading = isLarge ? 100 : isMediumLarge ? 80 : 55;

    return (
      <Box ref={ref} {...props}>
        <Heading css={{}} mb="8" textAlign="center" fontSize={fontSizeHeading}>
          Galería de recuerdos
        </Heading>
        <Box
          display="grid"
          style={{
            rowGap: 10,
            columnGap: 10,
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {albums.map(album => (
            <Thumbnail
              key={album.link}
              {...album}
              ref={album.newIndex ? thumbnailRef : undefined}
            />
          ))}
        </Box>
      </Box>
    );
  }
);

const Heading = styled(Box)(() => ({
  fontFamily: "'Tangerine', cursive",
  padding: 30,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  userSelect: "none",
}));
