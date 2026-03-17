const PET_CARE_TIPS = [
  { tip: "Dogs need dental checkups every 6 months to prevent gum disease and tooth loss.", category: "Dental Care" },
  { tip: "Regular vaccinations protect your pet from deadly diseases like Parvo, Rabies, and Distemper.", category: "Vaccinations" },
  { tip: "Cats should be dewormed every 3 months, even indoor cats can get parasites.", category: "Parasite Control" },
  { tip: "Never give your dog chocolate, grapes, onions, or xylitol — they're toxic to pets.", category: "Food Safety" },
  { tip: "Puppies need socialization before 14 weeks of age for healthy behavioural development.", category: "Training" },
  { tip: "Regular grooming prevents matting, skin infections, and helps you spot lumps early.", category: "Grooming" },
  { tip: "Pets over 7 years old should have a full health checkup every 6 months.", category: "Senior Care" },
  { tip: "Keep your pet's nails trimmed — overgrown nails can cause pain and walking problems.", category: "Nail Care" },
  { tip: "Always keep fresh water available. Dogs need about 30ml per kg of body weight daily.", category: "Hydration" },
  { tip: "A microchip costs under ₹1,000 and is the best way to reunite with a lost pet.", category: "Microchipping" },
  { tip: "Don't skip flea and tick prevention, especially during monsoon season in Pune.", category: "Parasite Control" },
  { tip: "Spaying/neutering prevents certain cancers and reduces stray overpopulation.", category: "Spay/Neuter" },
];

export function getRandomPetCareTip(): { tip: string; category: string } {
  return PET_CARE_TIPS[Math.floor(Math.random() * PET_CARE_TIPS.length)];
}
