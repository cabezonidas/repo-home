import { Box } from "@cabezonidas/shop-ui";
import React from "react";
import { useSearchAlbums } from "../api/use-search-albums";
import { Album } from "./album";

export const Gallery = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Box>>(
  (props, ref) => {
    const { data } = useSearchAlbums();
    return (
      <Box ref={ref} {...props}>
        {data?.photosets.photoset.map(
          ({ id: album, farm, title: { _content: title }, primary, secret }) => (
            <Album key={album} {...{ album, farm, title, primary, secret }} />
          )
        )}
      </Box>
    );
  }
);
