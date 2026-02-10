// data/tripPages.ts
export interface TripSlide {
  imageUrl: string;
  caption?: string;
}

export interface MomentImage {
  imageUrl: string;
  caption?: string;
}

export type TripEntryType = "activity" | "accommodation";

export interface TripActivity {
  id: string;
  title: string;
  description: string; // Main text content
  date?: string; // Optional: e.g. "Jan 23, 2026" for vlog-style chronological entries
  label?: string; // Optional: e.g. "Switzerland · Zurich" or neighborhood/area
  images?: MomentImage[]; // Optional array of images for slideshow
  width?: string; // Optional: "full", "1/2", "1/3", "2/3", etc. (Tailwind grid classes)
  height?: string; // Optional: "auto", "tall", "short" for future customization
  /** Optional: id of a related MapEntry for this moment (used to highlight markers in the trip map) */
  mapEntryId?: string;
  /** Optional: "activity" (default) or "accommodation" – accommodation entries show a link to the listing */
  entryType?: TripEntryType;
  /** Optional: URL to the accommodation listing (e.g. Airbnb). Shown as a clickable link when entryType is "accommodation" */
  link?: string;
  /** Optional: custom label for the link, e.g. "View on Airbnb". Default comes from content. */
  linkLabel?: string;
  /** Optional: rating out of 5 (e.g. for accommodation). Displayed as star graphics when set. */
  rating?: number;
}

export interface TripPage {
  slug: string;
  title: string;
  location: string;
  country: string;
  dateRange: string;
  /** Optional: extra location tags to show as circles (e.g. "Lucerne, Switzerland") */
  locationTags?: string[];
  slideshow: TripSlide[];
  activities: TripActivity[];
  mapEntryIds: string[]; // IDs from the global MAP_ENTRIES dataset
}

export const TRIP_PAGES: TripPage[] = [
  {
    slug: "Switzerland",
    title: "Switzerland",
    location: "Zurich",
    country: "Switzerland",
    dateRange: "Jan 23 – 25, 2026",
    locationTags: ["Zurich, Switzerland", "Lucerne, Switzerland"],
    slideshow: [
      {
        imageUrl: "/DSC00333.JPG",
        caption: "Rhine Falls, view from the Schloss Laufen."
      },
      {
        imageUrl: "/lucerne-1.png",
        caption: "View from the train, powdery mildew on trees."
      },
      {
        imageUrl: "/lucerne-3.png",
        caption: "Lucerne, evening walks along Chapel Bridge."
      }
    ],
        mapEntryIds: ["switzerland-airbnb-zurich", "tres-amigos-winterthur", "Le-Dezaley"],
    activities: [
      {
        id: "switzerland-airbnb",
        title: "Our Airbnb in Zurich",
        date: "Jan 23 – 25, 2026",
        label: "Switzerland · Zurich",
        description: "Cozy apartment right in the city center. Easy walk to the lake, trains, and cafes. Perfect base for weekend trips to Rhine Falls and Lucerne.",
        entryType: "accommodation",
        link: "https://www.vrbo.com/2476934ha",
        linkLabel: "View on VRBO",
        mapEntryId: "switzerland-airbnb-zurich",
        rating: 5,
        images: []
      },
      {
        id: "Rhine-Falls",
        title: "Rhine Falls in Schloss Laufen",
        date: "January 23, 2026",
        label: "Switzerland · Rhine Falls",
        description:
          "After landing, we took the train straight to Rhine falls, the most beautiful waterfall ever. Pro-tip: Purchase train tickets day of. OMIO is slightly cheapr if you book in advance, but you have no options of when you come and go. If you decide you want to leave early you have to buy a whole new train ticket. The train ride to Rhine Falls was gorgeous. The white trees and swiss countryside were amazing to see. On the train, we got ready, did our makeup, and finally arrived after an hour. With our travel backpacks we walked through the castle and Rhine falls and stopped for some pictures. The tickets to actually walk through the waterfall were 5 euro. We made our way down the steep steps, getting super close to the waterfall, where the water was able to splash us. The town across the river was small and industrial, and we didnt go but we ventured to find lunch in another small city.",
        images: [
          {
            imageUrl:
              "/IMG_3381.heic"
          },
          {
            imageUrl:
              "/IMG_0056.heic"
          },
          {
            imageUrl:
              "/IMG_0057.heic"
          },
          {
            imageUrl:
              "/IMG_3432.JPG"
          },
          {
            imageUrl:
              "/IMG_3658.JPG"
          },
          {
            imageUrl:
              "/IMG_3411.heic"
          }
        ]
      },
      {
        id: "Winterthur",
        title: "Quick Stop: Winterthur",
        date: "January 23, 2026",
        label: "Switzerland · Winterthur",
        description: 
          "Pit Stop in Winterthur! We stopped in a small town to explore, and potentially eat. We found a restuarant called 'Tres Amigos' (of course mexican food in Switzerland). We sat down and quickly discovered that a quesadilla was 40 American Dollars and quickly left the fine establishment. We ran across the street to Coop, the most amazing grocery store ever where we got amazing salad bowls for 7 CHFs or 10 dollars. Then we ran back to the train and went home to Zurich.",
        mapEntryId: "tres-amigos-winterthur",
        images: [
          {
            imageUrl: "/IMG_3436.heic"
          },
          {
            imageUrl: "/IMG_3439.heic"
          },
          {
            imageUrl: "/IMG_3440.heic"
          }
        ]
      },
      {
        id: "Dinner at Le Dezaley",
        title: "Dinner at Le Dezaley",
        date: "January 23, 2026",
        label: "Switzerland · Zurich",
        description: 
          "We went for a fondue dinner at Le Dezaley! Honestly, fondue is not my favorite food ever. It was just cheese and bread and they made us each get a main dish and it was very very expensive. Really not my favorite, I would've gone gotten chocolate fondue instead. But it was very pretty inside and we had some drinks before so it was a great time regardless. We tried to go out afterwards in Zurich old town, but the scene was not active.",
        mapEntryId: "Le-Dezaley",
        images: [
          {
            imageUrl: "/IMG_3474.heic"
          },
          {
            imageUrl: "/IMG_3480.heic"
          },
          {
            imageUrl: "/IMG_3495.heic"
          }
        ]
      },
      {
        id: "12-hours-lucerne",
        title: "12 hours in Lucerne",
        date: "January 24, 2026",
        label: "Switzerland · Lucerne",
        description: "",
        images: [
          { imageUrl: "/lucerne-1.png", caption: "Twilight by the river." },
          { imageUrl: "/lucerne-2.png", caption: "Chapel Bridge and Water Tower." },
          { imageUrl: "/lucerne-3.png", caption: "Evening by the water." },
          { imageUrl: "/lucerne-4.png", caption: "City lights on the Reuss." },
          { imageUrl: "/lucerne-5.png", caption: "Night in the old town." },
          { imageUrl: "/lucerne-6.png", caption: "By the water at night." }
        ]
      },
      {
        id: "zurich",
        title: "Zurich",
        date: "February 9, 2026",
        label: "Switzerland · Zurich",
        description: "",
        images: [
          { imageUrl: "/zurich-1.png", caption: "Swan on the Limmat." },
          { imageUrl: "/zurich-2.png", caption: "Panoramic view along the river." }
        ]
      }
    ]
  },
  {
    slug: "Lisbon",
    title: "Lisbon",
    location: "Lisbon",
    country: "Portugal",
    dateRange: "Feb 6 – 8, 2026",
    locationTags: ["Lisbon, Portugal"],
    slideshow: [
      {
        imageUrl: "https://images.pexels.com/photos/356618/pexels-photo-356618.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Lisbon skyline and the Tagus."
      },
      {
        imageUrl: "https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Pastel de nata and coffee."
      },
      {
        imageUrl: "https://images.pexels.com/photos/1118866/pexels-photo-1118866.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Tram 28 through Alfama."
      }
    ],
    mapEntryIds: ["lisbon-airbnb"],
    activities: [
      {
        id: "lisbon-airbnb",
        title: "Our Airbnb in Lisbon",
        date: "Feb 6 – 8, 2026",
        label: "Portugal · Lisbon",
        description: "Add your accommodation description here.",
        entryType: "accommodation",
        link: "https://www.airbnb.com/rooms/YOUR_LISTING_ID",
        linkLabel: "View on Airbnb",
        mapEntryId: "lisbon-airbnb",
        rating: 5,
        images: []
      },
      {
        id: "lisbon-day-1",
        title: "Arrival",
        date: "February 6, 2026",
        label: "Portugal · Lisbon",
        description: "Add your notes for the first day.",
        images: []
      },
      {
        id: "lisbon-day-2",
        title: "Exploring Lisbon",
        date: "February 7, 2026",
        label: "Portugal · Lisbon",
        description: "Add your notes for the second day.",
        images: []
      },
      {
        id: "lisbon-day-3",
        title: "Lisbon",
        date: "February 8, 2026",
        label: "Portugal · Lisbon",
        description: "Add your notes for the third day.",
        images: []
      },
      {
        id: "lisbon-day-4",
        title: "Departure",
        date: "February 9, 2026",
        label: "Portugal · Lisbon",
        description: "Add your notes for the last day.",
        images: []
      }
    ]
  },
  {
    slug: "florence-first-weekend",
    title: "Florence – First Weekend Away",
    location: "Florence",
    country: "Italy",
    dateRange: "Feb 13 – 16, 2026",
    locationTags: ["Florence, Italy"],
    slideshow: [
      { imageUrl: "https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "View of Florence and the Duomo." },
      { imageUrl: "https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Gelato by the Arno at sunset." },
      { imageUrl: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "The Arno and Ponte Vecchio." }
    ],
    mapEntryIds: ["florence-airbnb", "florence-duomo-view", "florence-gelato-riverside"],
    activities: [
      { id: "florence-airbnb", title: "Our Airbnb in Florence", date: "Feb 13 – 16, 2026", label: "Italy · Florence", description: "Add your accommodation description here.", entryType: "accommodation", link: "https://www.airbnb.com/rooms/YOUR_LISTING_ID", linkLabel: "View on Airbnb", mapEntryId: "florence-airbnb", rating: 5, images: [] },
      { id: "getting-lost", title: "Getting intentionally lost between museums", date: "February 14, 2026", label: "Florence · Centro Storico", description: "We walked without a map for hours, turning down whatever side street looked most interesting.", mapEntryId: "florence-duomo-view", images: [] },
      { id: "gelato-twice", title: "Going back for gelato twice in one day", date: "February 15, 2026", label: "Florence · Lungarno", description: "There was a stand along the river that we passed in the afternoon. We went back after dinner, and the staff remembered our order. Pistachio and stracciatella, eaten while watching the sunset turn the Arno golden.", mapEntryId: "florence-gelato-riverside", images: [{ imageUrl: "https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Gelato by the Arno at sunset" }, { imageUrl: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "The same stand, second visit of the day" }, { imageUrl: "https://images.pexels.com/photos/1796727/pexels-photo-1796727.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Pistachio and stracciatella as the sky turned golden" }] }
    ]
  },
  {
    slug: "prague",
    title: "Prague",
    location: "Prague",
    country: "Czech Republic",
    dateRange: "Feb 20 – 23, 2026",
    locationTags: ["Prague, Czech Republic"],
    slideshow: [
      { imageUrl: "https://images.pexels.com/photos/415980/pexels-photo-415980.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Charles Bridge at dawn." },
      { imageUrl: "https://images.pexels.com/photos/545048/pexels-photo-545048.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Old Town Square." },
      { imageUrl: "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Prague Castle." }
    ],
    mapEntryIds: ["prague-airbnb"],
    activities: [
      { id: "prague-airbnb", title: "Our Airbnb in Prague", date: "Feb 20 – 23, 2026", label: "Czech Republic · Prague", description: "Add your accommodation description here.", entryType: "accommodation", link: "https://www.airbnb.com/rooms/YOUR_LISTING_ID", linkLabel: "View on Airbnb", mapEntryId: "prague-airbnb", rating: 5, images: [] },
      { id: "prague-day-1", title: "Arrival", date: "February 20, 2026", label: "Czech Republic · Prague", description: "Add your notes.", images: [] },
      { id: "prague-day-2", title: "Exploring Prague", date: "February 21, 2026", label: "Czech Republic · Prague", description: "Add your notes.", images: [] },
      { id: "prague-day-3", title: "Prague", date: "February 22, 2026", label: "Czech Republic · Prague", description: "Add your notes.", images: [] },
      { id: "prague-day-4", title: "Departure", date: "February 23, 2026", label: "Czech Republic · Prague", description: "Add your notes.", images: [] }
    ]
  },
  {
    slug: "budapest-vienna",
    title: "Budapest & Vienna",
    location: "Budapest",
    country: "Hungary",
    dateRange: "Feb 27 – Mar 2, 2026",
    locationTags: ["Budapest, Hungary", "Vienna, Austria"],
    slideshow: [
      { imageUrl: "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Parliament on the Danube." },
      { imageUrl: "https://images.pexels.com/photos/326057/pexels-photo-326057.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Széchenyi thermal baths." },
      { imageUrl: "https://images.pexels.com/photos/208702/pexels-photo-208702.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Vienna." }
    ],
    mapEntryIds: ["budapest-vienna-airbnb"],
    activities: [
      { id: "budapest-vienna-airbnb", title: "Our Airbnb", date: "Feb 27 – Mar 2, 2026", label: "Hungary · Budapest", description: "Add your accommodation description here.", entryType: "accommodation", link: "https://www.airbnb.com/rooms/YOUR_LISTING_ID", linkLabel: "View on Airbnb", mapEntryId: "budapest-vienna-airbnb", rating: 5, images: [] },
      { id: "budapest-vienna-day-1", title: "Arrival", date: "February 27, 2026", label: "Budapest", description: "Add your notes.", images: [] },
      { id: "budapest-vienna-day-2", title: "Exploring", date: "February 28, 2026", label: "Budapest", description: "Add your notes.", images: [] },
      { id: "budapest-vienna-day-3", title: "Budapest or Vienna", date: "March 1, 2026", label: "Budapest/Vienna", description: "Add your notes.", images: [] },
      { id: "budapest-vienna-day-4", title: "Departure", date: "March 2, 2026", label: "Budapest/Vienna", description: "Add your notes.", images: [] }
    ]
  },
  {
    slug: "amsterdam",
    title: "Amsterdam",
    location: "Amsterdam",
    country: "Netherlands",
    dateRange: "Mar 6 – 9, 2026",
    locationTags: ["Amsterdam, Netherlands"],
    slideshow: [
      { imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Canals of Amsterdam." },
      { imageUrl: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Museum district." },
      { imageUrl: "https://images.pexels.com/photos/1796727/pexels-photo-1796727.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Jordaan." }
    ],
    mapEntryIds: ["amsterdam-airbnb"],
    activities: [
      { id: "amsterdam-airbnb", title: "Our Airbnb in Amsterdam", date: "Mar 6 – 9, 2026", label: "Netherlands · Amsterdam", description: "Add your accommodation description here.", entryType: "accommodation", link: "https://www.airbnb.com/rooms/YOUR_LISTING_ID", linkLabel: "View on Airbnb", mapEntryId: "amsterdam-airbnb", rating: 5, images: [] },
      { id: "amsterdam-day-1", title: "Arrival", date: "March 6, 2026", label: "Netherlands · Amsterdam", description: "Add your notes.", images: [] },
      { id: "amsterdam-day-2", title: "Exploring Amsterdam", date: "March 7, 2026", label: "Netherlands · Amsterdam", description: "Add your notes.", images: [] },
      { id: "amsterdam-day-3", title: "Amsterdam", date: "March 8, 2026", label: "Netherlands · Amsterdam", description: "Add your notes.", images: [] },
      { id: "amsterdam-day-4", title: "Departure", date: "March 9, 2026", label: "Netherlands · Amsterdam", description: "Add your notes.", images: [] }
    ]
  },
  {
    slug: "dublin",
    title: "Dublin",
    location: "Dublin",
    country: "Ireland",
    dateRange: "Mar 13 – 16, 2026",
    locationTags: ["Dublin, Ireland"],
    slideshow: [
      { imageUrl: "https://images.pexels.com/photos/1113638/pexels-photo-1113638.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Trinity College." },
      { imageUrl: "https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Temple Bar." },
      { imageUrl: "https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Dublin streets." }
    ],
    mapEntryIds: ["dublin-airbnb"],
    activities: [
      { id: "dublin-airbnb", title: "Our Airbnb in Dublin", date: "Mar 13 – 16, 2026", label: "Ireland · Dublin", description: "Add your accommodation description here.", entryType: "accommodation", link: "https://www.airbnb.com/rooms/YOUR_LISTING_ID", linkLabel: "View on Airbnb", mapEntryId: "dublin-airbnb", rating: 5, images: [] },
      { id: "dublin-day-1", title: "Arrival", date: "March 13, 2026", label: "Ireland · Dublin", description: "Add your notes.", images: [] },
      { id: "dublin-day-2", title: "Exploring Dublin", date: "March 14, 2026", label: "Ireland · Dublin", description: "Add your notes.", images: [] },
      { id: "dublin-day-3", title: "Dublin", date: "March 15, 2026", label: "Ireland · Dublin", description: "Add your notes.", images: [] },
      { id: "dublin-day-4", title: "Departure", date: "March 16, 2026", label: "Ireland · Dublin", description: "Add your notes.", images: [] }
    ]
  },
  {
    slug: "elenas-birthday",
    title: "Elena's Birthday",
    location: "Rome",
    country: "Italy",
    dateRange: "Mar 20 – 23, 2026",
    locationTags: ["Rome, Italy"],
    slideshow: [
      { imageUrl: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Celebrating in Rome." },
      { imageUrl: "https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Add your caption." },
      { imageUrl: "https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Add your caption." }
    ],
    mapEntryIds: [],
    activities: [
      { id: "elenas-bday", title: "Elena's Birthday Weekend", date: "March 20, 2026", label: "Italy · Rome", description: "Add your notes for Elena's birthday celebration.", images: [] }
    ]
  },
  {
    slug: "paris",
    title: "Paris",
    location: "Paris",
    country: "France",
    dateRange: "Mar 27 – 30, 2026",
    locationTags: ["Paris, France"],
    slideshow: [
      { imageUrl: "https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "The Eiffel Tower." },
      { imageUrl: "https://images.pexels.com/photos/1113638/pexels-photo-1113638.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "The Seine." },
      { imageUrl: "https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Parisian streets." }
    ],
    mapEntryIds: ["paris-airbnb"],
    activities: [
      { id: "paris-airbnb", title: "Our Airbnb in Paris", date: "Mar 27 – 30, 2026", label: "France · Paris", description: "Add your accommodation description here.", entryType: "accommodation", link: "https://www.airbnb.com/rooms/YOUR_LISTING_ID", linkLabel: "View on Airbnb", mapEntryId: "paris-airbnb", rating: 5, images: [] },
      { id: "paris-day-1", title: "Arrival", date: "March 27, 2026", label: "France · Paris", description: "Add your notes.", images: [] },
      { id: "paris-day-2", title: "Exploring Paris", date: "March 28, 2026", label: "France · Paris", description: "Add your notes.", images: [] },
      { id: "paris-day-3", title: "Paris", date: "March 29, 2026", label: "France · Paris", description: "Add your notes.", images: [] },
      { id: "paris-day-4", title: "Departure", date: "March 30, 2026", label: "France · Paris", description: "Add your notes.", images: [] }
    ]
  },
  {
    slug: "malta",
    title: "Malta",
    location: "Valletta",
    country: "Malta",
    dateRange: "Apr 17 – 20, 2026",
    locationTags: ["Malta"],
    slideshow: [
      { imageUrl: "https://images.pexels.com/photos/1796727/pexels-photo-1796727.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Valletta." },
      { imageUrl: "https://images.pexels.com/photos/167404/pexels-photo-167404.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Blue Grotto." },
      { imageUrl: "https://images.pexels.com/photos/1796726/pexels-photo-1796726.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Mdina." }
    ],
    mapEntryIds: ["malta-airbnb"],
    activities: [
      { id: "malta-airbnb", title: "Our Airbnb in Malta", date: "Apr 17 – 20, 2026", label: "Malta", description: "Add your accommodation description here.", entryType: "accommodation", link: "https://www.airbnb.com/rooms/YOUR_LISTING_ID", linkLabel: "View on Airbnb", mapEntryId: "malta-airbnb", rating: 5, images: [] },
      { id: "malta-day-1", title: "Arrival", date: "April 17, 2026", label: "Malta", description: "Add your notes.", images: [] },
      { id: "malta-day-2", title: "Exploring Malta", date: "April 18, 2026", label: "Malta", description: "Add your notes.", images: [] },
      { id: "malta-day-3", title: "Malta", date: "April 19, 2026", label: "Malta", description: "Add your notes.", images: [] },
      { id: "malta-day-4", title: "Departure", date: "April 20, 2026", label: "Malta", description: "Add your notes.", images: [] }
    ]
  },
  {
    slug: "milan",
    title: "Milan",
    location: "Milan",
    country: "Italy",
    dateRange: "May 8 – 11, 2026",
    locationTags: ["Milan, Italy"],
    slideshow: [
      { imageUrl: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "The Duomo." },
      { imageUrl: "https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Navigli." },
      { imageUrl: "https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg?auto=compress&cs=tinysrgb&w=1600", caption: "Galleria Vittorio Emanuele." }
    ],
    mapEntryIds: ["milan-airbnb"],
    activities: [
      { id: "milan-airbnb", title: "Our Airbnb in Milan", date: "May 8 – 11, 2026", label: "Italy · Milan", description: "Add your accommodation description here.", entryType: "accommodation", link: "https://www.airbnb.com/rooms/YOUR_LISTING_ID", linkLabel: "View on Airbnb", mapEntryId: "milan-airbnb", rating: 5, images: [] },
      { id: "milan-day-1", title: "Arrival", date: "May 8, 2026", label: "Italy · Milan", description: "Add your notes.", images: [] },
      { id: "milan-day-2", title: "Exploring Milan", date: "May 9, 2026", label: "Italy · Milan", description: "Add your notes.", images: [] },
      { id: "milan-day-3", title: "Milan", date: "May 10, 2026", label: "Italy · Milan", description: "Add your notes.", images: [] },
      { id: "milan-day-4", title: "Departure", date: "May 11, 2026", label: "Italy · Milan", description: "Add your notes.", images: [] }
    ]
  }
];

export function getTripPageBySlug(slug: string): TripPage | undefined {
  if (!slug) return undefined;
  const lower = slug.toLowerCase();
  return TRIP_PAGES.find((trip) => trip.slug.toLowerCase() === lower);
}

/** All trips for overview page. Add/remove trips in TRIP_PAGES above. */
export function getAllTrips(): TripPage[] {
  return TRIP_PAGES;
}
