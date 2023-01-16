import { Box, Input, Instagram, Label, NavLink, Whatsapp } from "@cabezonidas/shop-ui";
import React from "react";
import { useProducts } from "../api/use-products";
import { matchSorter } from "match-sorter";

export const Products = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Box>>(
  (props, ref) => {
    const { data, isLoading, isSuccess } = useProducts();

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
        <Box display="grid" textAlign="center" marginTop={"10px"}>
          <NavLink
            css={{}}
            href="https://api.whatsapp.com/send?phone=5491127778899"
            style={{ width: "unset", borderRadius: 5, background: "#5a755b" }}
            margin="auto"
          >
            <Box
              display="grid"
              gridTemplateColumns="auto 1fr"
              gridGap="4"
              width="max-content"
              margin="auto"
              alignItems="center"
              style={{ fontSize: "x-large" }}
            >
              <Whatsapp css={{}} />
              <Box>11 2777 8899 (Sólo mensajes)</Box>
            </Box>
          </NavLink>
          <NavLink
            css={{}}
            href="https://www.instagram.com/ReposteriaDeLasArtes"
            style={{ width: "unset" }}
            margin="auto"
          >
            <Box
              display="grid"
              gridTemplateColumns="auto 1fr"
              gridGap="4"
              width="max-content"
              margin="auto"
              alignItems="center"
              style={{ fontSize: "large" }}
            >
              <Instagram css={{}} />
              <Box>@ReposteriaDeLasArtes</Box>
            </Box>
          </NavLink>
        </Box>
        {isLoading && (
          <Box maxWidth="500px" my="6" mx="auto" textAlign={"center"}>
            Cargando catálogo...
          </Box>
        )}
        {isSuccess && (
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
        )}
      </Box>
    );
  }
);
