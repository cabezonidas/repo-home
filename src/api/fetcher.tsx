const SILENT_ERRORS = [401, 503, 451, 409, 403];

const jsonHandler = async (res: Response) => {
  if (!res.ok) {
    let error: any = { status: res.status };
    try {
      const json = await res.json();
      error = { ...error, ...json };
    } catch {}
    if (SILENT_ERRORS.includes(res.status)) {
      error.silent = true;
    }
    throw error;
  }
  return res.json();
};

const flickrHandler = async (res: Response) => {
  if (!res.body) {
    throw Error("No body");
  }
  const reader = res.body.getReader();
  const stream = new ReadableStream({
    start(controller) {
      function push() {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          push();
        });
      }
      push();
    },
  });

  const text = await new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
  const flickrStart = "jsonFlickrApi(";
  const flickrEnd = ")";

  if (text.startsWith("jsonFlickrApi(") && text.endsWith(")")) {
    return JSON.parse(
      text.substr(flickrStart.length, text.length - flickrStart.length - flickrEnd.length)
    );
  } else {
    return JSON.parse(text);
  }
};

export const flickrFetcher = async (
  path: string,
  requestInit: NonNullable<Parameters<typeof fetch>[1]> = {}
) => {
  const res = await fetch(path, requestInit);
  const json = flickrHandler(res);
  return json;
};

export const fetcher = async (
  path: string,
  requestInit: NonNullable<Parameters<typeof fetch>[1]> = {}
) => {
  const defaults = { headers: { accept: "*/*", "content-type": "application/json" } };
  const res = await fetch(path, Object.assign(requestInit ?? defaults));
  const json = jsonHandler(res);
  return json;
};
