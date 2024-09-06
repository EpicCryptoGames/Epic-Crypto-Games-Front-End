export async function getAPI<T>({
  route,
  signal,
}: {
  route: string;
  signal?: AbortSignal;
}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${route}`, {
      signal,
    });
    const resData = await res.json();
    return resData?.data as T;
  } catch (error) {
    console.log("Get API error: ", error);
  }
}

export async function postAPI<T>({
  route,
  postData,
}: {
  route: string;
  postData: any;
}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${route}`, {
      method: "POST",

      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const resData = await res.json();
    return resData as T;
  } catch (error) {
    console.log("Post API error: ", error);
  }
}
