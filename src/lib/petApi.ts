const DOG_API_URL = "https://api.thedogapi.com/v1";
const CAT_API_URL = "https://api.thecatapi.com/v1";

export interface BreedInfo {
  id: number;
  name: string;
  temperament?: string;
  life_span?: string;
  weight?: { metric: string };
  image?: { url: string };
}

export interface PetImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export async function getDogBreeds(limit = 12): Promise<BreedInfo[]> {
  try {
    const res = await fetch(`${DOG_API_URL}/breeds?limit=${limit}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getCatBreeds(limit = 12): Promise<BreedInfo[]> {
  try {
    const res = await fetch(`${CAT_API_URL}/breeds?limit=${limit}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getRandomDogImages(limit = 6): Promise<PetImage[]> {
  try {
    const res = await fetch(
      `${DOG_API_URL}/images/search?limit=${limit}&size=med`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getRandomCatImages(limit = 6): Promise<PetImage[]> {
  try {
    const res = await fetch(
      `${CAT_API_URL}/images/search?limit=${limit}&size=med`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const DOG_FACTS = [
  "A dog's nose print is unique, much like a human fingerprint.",
  "Dogs can understand up to 250 words and gestures.",
  "Puppies are born deaf and don't hear until about 3 weeks old.",
  "A dog's sense of smell is 10,000 to 100,000 times more acute than a human's.",
  "Dogs have three eyelids, including one to keep their eyes moist.",
  "Greyhounds can run up to 45 mph, making them the fastest dog breed.",
  "Dogs curl up to sleep to protect their organs - an instinct from wild days.",
  "Dalmatians are born completely white and develop spots as they grow.",
];

const CAT_FACTS = [
  "Cats spend 70% of their lives sleeping.",
  "A cat's purr vibrates at 25-150 Hz, which can promote healing.",
  "Cats have over 20 vocalizations, including the meow, just for humans.",
  "A group of cats is called a 'clowder'.",
  "Cats can rotate their ears 180 degrees.",
  "Adult cats only meow to communicate with humans, not other cats.",
  "A cat's brain is 90% similar to a human's.",
  "Cats can jump up to six times their length.",
];

export function getRandomPetFact(): { fact: string; type: "dog" | "cat" } {
  const allFacts = [
    ...DOG_FACTS.map((f) => ({ fact: f, type: "dog" as const })),
    ...CAT_FACTS.map((f) => ({ fact: f, type: "cat" as const })),
  ];
  return allFacts[Math.floor(Math.random() * allFacts.length)];
}
