import { useQuery } from "react-query";
import { UseQueryOptions as Options } from "react-query";
import { flickr } from "../config";
import { flickrFetcher } from "./fetcher";

interface IPaginated {
  page: number;
  per_page: number;
}

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

export const useSearchAlbums = (
  params: {
    variables?: IPaginated;
  } & Options<IResult> = {}
) => {
  const { variables = { page: 1, per_page: 4 }, ...options } = params;
  const { page, per_page } = variables;
  const { path, api_key, user_id, format } = flickr;
  const method = "flickr.photosets.getList";

  return useQuery<IResult>(
    ["albums", page, per_page],
    () =>
      flickrFetcher(
        `${path}${new URLSearchParams(
          Object.entries({
            method,
            api_key,
            user_id,
            format,
            page: String(page),
            per_page: String(per_page),
          })
        )}`
      ),
    options
  );
};
