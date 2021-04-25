import { Box, Input, Label, useBreakpoint } from "@cabezonidas/shop-ui";
import React from "react";
import { useProducts } from "../api/use-products";
import { matchSorter } from "match-sorter";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";

export const Products = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Box>>(
  (props, ref) => {
    const { isLarge, isMediumLarge } = useBreakpoint();

    const fontSizeHeading = isLarge ? 100 : isMediumLarge ? 80 : 55;
    const { data } = useProducts();

    type Item = NonNullable<typeof data>[number]["items"][number];

    const items = (
      data?.reduce<Item[]>((res, item) => {
        return [...res, ...item.items];
      }, []) ?? []
    ).sort((a, b) => (a.displayName < b.displayName ? -1 : 1));

    const [filterKey, setFilterKey] = React.useState("");

    const sortedItems = matchSorter(items, filterKey, {
      keys: ["displayName", "displayDescription", "price"],
    });

    return (
      <Box ref={ref} {...props}>
        <Heading css={{}} textAlign="center" fontSize={fontSizeHeading}>
          Catálogo
        </Heading>
        <Box mb="2" textAlign="center">
          Recuerda escribirnos a nuestro WhatsApp para concretar un pedido
        </Box>
        <Box px="14px" overflow="hidden">
          <Box maxWidth="500px" mb="4" mx="auto">
            <Label htmlFor="search" css={{}}>
              Buscar
            </Label>
            <Input
              css={{}}
              id="search"
              value={filterKey}
              onChange={e => setFilterKey(e.target.value)}
              placeholder="pastel del sur"
            />
          </Box>
          <Box height="400px" overflow="hidden">
            <Box overflow="auto" height="100%" maxWidth="500px" mx="auto">
              <Box
                display="grid"
                gridTemplateColumns="1fr auto"
                gridTemplateRows="max-content"
                style={{ rowGap: 5 }}
              >
                {sortedItems.map(item => (
                  <React.Fragment key={item.productId}>
                    <Box>
                      <Box fontWeight="bold">{item.displayName}</Box>
                      <Box fontSize="small">{item.displayDescription}</Box>
                    </Box>
                    <Box textAlign="right" fontSize="large">
                      {item.price}
                    </Box>
                  </React.Fragment>
                ))}
              </Box>
            </Box>
          </Box>
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
