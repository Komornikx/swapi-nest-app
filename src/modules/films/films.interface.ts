export interface Film {
  _id: string;
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: Date;
  opening_crawl: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  url: string;
}
