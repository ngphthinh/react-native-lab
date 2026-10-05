const BASE_URL = "https://6ac33b04ae53bf25b80e2df5.mockapi.io/api/v1/movies";

const res = await fetch(BASE_URL);
const data = await res.json();

for (const movie of data) {
  const rating = Math.round(Math.random() * 100) / 10;

  await fetch(`${BASE_URL}/${movie.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...movie,
      rating,
    }),
  });
}
