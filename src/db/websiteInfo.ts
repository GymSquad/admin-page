export type WebsiteInfo = {
  category: string;
  name: string;
  url: string;
};

export const websiteInfo = [
  {
    category: "c1",
    name: "n1",
    url: "u1",
  },
  {
    category: "c2",
    name: "n2",
    url: "u2",
  },
  {
    category: "c3",
    name: "n3",
    url: "u3",
  },
] satisfies WebsiteInfo[];
