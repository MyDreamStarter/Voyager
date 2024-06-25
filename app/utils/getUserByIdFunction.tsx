const IP_ADDRESS = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;

export async function getUserByIdFunction(userId: string | null) {
  // send a get request to get data of user saved in db.
  const response = await fetch(
    `https://${IP_ADDRESS}/v1.0/voyager/user/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return undefined;
    });
  return response;
}
