import type { Metadata } from 'next';
import { Person } from '@/_lib/schema/combinedSearch';
export const generatePersonMetadata = (person: Person): Metadata => {
  return {
    title: `${person.name} | Biography, Filmography & Details | Cinephiler`,
    description: `${
      `Learn about ${person.name}, ${person.known_for_department}`
    }...`,
    keywords: [
      `${person.name}`,
      `${person.name} movies`,
      `${person.name} biography`,
      `${person.known_for_department}`,
      "actor profile",
      "director information",
    ],
    openGraph: {
      title: `${person.name} | Cinephiler`,
      description:
        `Detailed information about ${person.name}`,
      url: `https://www.cinephiler.com/people/${person.id}`,
      images: [
        {
          url: person.profile_path
            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
            : "/default-person-og.jpg",
          width: 500,
          height: 750,
          alt: `${person.name} photo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${person.name} | Cinephiler`,
      description:
        `Learn about ${person.name}`,
      images: [
        person.profile_path
          ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
          : "/default-person-og.jpg",
      ],
    },
  };
};
