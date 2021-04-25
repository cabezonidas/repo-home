import { useInfiniteQuery } from "react-query";
import { UseInfiniteQueryOptions as Options } from "react-query";
import { flickr } from "../config";
import { flickrFetcher } from "./fetcher";

interface IAlbum {
  id: string;
  owner: string;
  username: string;
  primary: string;
  secret: string;
  server: string;
  farm: number;
  count_views: number;
  count_comments: number;
  count_photos: number;
  count_videos: number;
  title: {
    _content: string;
  };
}

interface IResult {
  photosets: {
    page: number;
    pages: number;
    perpage: string;
    total: number;
    photoset: IAlbum[];
  };
  stat: string;
}

export const useSearchAlbums = (params: Options<IResult> = {}) => {
  const { path, api_key, user_id, format } = flickr;
  const method = "flickr.photosets.getList";

  return useInfiniteQuery<IResult>(
    ["albums"],
    ({ pageParam = 0 }: { pageParam?: number }) =>
      flickrFetcher(
        `${path}${new URLSearchParams(
          Object.entries({
            method,
            api_key,
            user_id,
            format,
            page: String(pageParam),
            per_page: "20",
          })
        )}`
      ),
    params
  );
};
