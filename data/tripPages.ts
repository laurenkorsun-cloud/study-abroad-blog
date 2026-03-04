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
          { imageUrl: "/lucerne-1.png" },
          { imageUrl: "/lucerne-2.png" },
          { imageUrl: "/lucerne-3.png" },
          { imageUrl: "/lucerne-4.png" },
          { imageUrl: "/lucerne-5.png" },
          { imageUrl: "/lucerne-6.png" }
        ]
      },
      {
        id: "zurich",
        title: "Zurich",
        date: "February 9, 2026",
        label: "Switzerland · Zurich",
        description: "",
        images: [
          { imageUrl: "/zurich-1.png" },
          { imageUrl: "/zurich-2.png" }
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
        imageUrl: "/lisbon-1.png",
        caption: "Vintage cars crossing Praça do Comércio after the rain."
      },
      {
        imageUrl: "/lisbon-2.png",
        caption: "Umbrellas over Pink Street on a crowded Saturday night."
      },
      {
        imageUrl: "/lisbon-3.png",
        caption: "Morning light on the tram tracks and tiled sidewalks."
      }
    ],
    mapEntryIds: [
      "lisbon-airbnb",
      "lisbon-honest-greens",
      "lisbon-da-noi",
      "lisbon-o-petit",
      "lisbon-peixola",
      "lisbon-manteigaria"
    ],
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
        id: "lisbon-honest-greens",
        title: "Eating breakfast at Honest Greens",
        date: "February 6, 2026",
        label: "Portugal · Lisbon",
        description: "Add your notes about breakfast at Honest Greens.",
        images: [
          { imageUrl: "/honest-greens-lisbon.png" }
        ],
        mapEntryId: "lisbon-honest-greens"
      },
      {
        id: "lisbon-day-1",
        title: "Sintra",
        date: "February 6, 2026",
        label: "Portugal · Lisbon",
        description: "Add your notes for the first day.",
        images: [
          { imageUrl: "/sintra-1.png" },
          { imageUrl: "/sintra-2.png" },
          { imageUrl: "/sintra-3.png" },
          { imageUrl: "/sintra-4.png" },
          { imageUrl: "/sintra-5.png" }
        ]
      },
      {
        id: "lisbon-day-2",
        title: "Dinner at De Noi",
        date: "February 7, 2026",
        label: "Portugal · Lisbon",
        description: "Add your notes for the second day.",
        images: [
          { imageUrl: "/de-noi-1.png" },
          { imageUrl: "/de-noi-2.png" }
        ],
        mapEntryId: "lisbon-da-noi"
      },
      {
        id: "lisbon-day-3",
        title: "Walking tour around Lisbon",
        date: "February 8, 2026",
        label: "Portugal · Lisbon",
        description: "Add your notes for the third day.",
        images: [
          { imageUrl: "/lisbon-tour-1.png" },
          { imageUrl: "/lisbon-tour-2.png" },
          { imageUrl: "/lisbon-tour-3.png" },
          { imageUrl: "/lisbon-tour-4.png" },
          { imageUrl: "/lisbon-tour-5.png" },
          { imageUrl: "/lisbon-tour-6.png" }
        ]
      },
      {
        id: "lisbon-pasteis-manteigaria",
        title: "Pastéis de nata at Manteigaria",
        date: "February 8, 2026",
        label: "Portugal · Lisbon",
        description: "Add your notes about stopping for pastéis de nata at Manteigaria.",
        images: [
          { imageUrl: "/manteigaria-1.png" }
        ],
        mapEntryId: "lisbon-manteigaria"
      },
      {
        id: "lisbon-day-4",
        title: "Lunch at O Petit",
        date: "February 9, 2026",
        label: "Portugal · Lisbon",
        description: "Add your notes for the last day.",
        images: [
          { imageUrl: "/o-petit-1.png" },
          { imageUrl: "/o-petit-2.png" },
          { imageUrl: "/o-petit-3.png" }
        ],
        mapEntryId: "lisbon-o-petit"
      },
      {
        id: "lisbon-dinner-paixolo",
        title: "Dinner at Paixolo",
        date: "February 9, 2026",
        label: "Portugal · Lisbon",
        description: "Add your notes about dinner at Paixolo.",
        images: [
          { imageUrl: "/paixolo-1.png" },
          { imageUrl: "/paixolo-2.png" },
          { imageUrl: "/paixolo-3.png" },
          { imageUrl: "/paixolo-4.png" },
          { imageUrl: "/paixolo-5.png" }
        ],
        mapEntryId: "lisbon-peixola"
      }
    ]
  },
  {
    slug: "florence-first-weekend",
    title: "Florence",
    location: "Florence",
    country: "Italy",
    dateRange: "Feb 13 – 16, 2026",
    locationTags: ["Florence, Italy"],
    slideshow: [
      { imageUrl: "/florence-duomo-1.png", caption: "Visiting the Duomo in Florence." },
      { imageUrl: "/florence-main-2.png", caption: "Palazzo Vecchio under a bright sky." },
      { imageUrl: "/florence-main-3.png", caption: "Ponte Vecchio and the Arno view." }
    ],
    mapEntryIds: ["florence-airbnb", "florence-la-giostra", "florence-statue-of-david", "florence-duomo-view", "florence-uffizi-gallery"],
    activities: [
      { id: "florence-airbnb", title: "Our Airbnb in Florence", date: "Feb 13 – 16, 2026", label: "Italy · Florence", description: "Add your accommodation description here.", entryType: "accommodation", link: "https://www.airbnb.com/rooms/YOUR_LISTING_ID", linkLabel: "View on Airbnb", mapEntryId: "florence-airbnb", rating: 5, images: [] },
      { id: "florence-la-giostra", title: "Dinner at La Giostra", date: "February 13, 2026", label: "Florence · Centro Storico", description: "Add your notes about dinner at La Giostra.", mapEntryId: "florence-la-giostra", images: [{ imageUrl: "/la-giostra-1.png" }, { imageUrl: "/la-giostra-2.png" }] },
      { id: "florence-statue-of-david", title: "Statue of David", date: "February 14, 2026", label: "Florence · Galleria dell'Accademia", description: "Add your notes about seeing Michelangelo's David.", mapEntryId: "florence-statue-of-david", images: [{ imageUrl: "/florence-david-1.png" }] },
      { id: "florence-visiting-duomo", title: "Visiting the Duomo", date: "February 14, 2026", label: "Florence · Duomo", description: "Add your notes about visiting the Duomo.", mapEntryId: "florence-duomo-view", images: [{ imageUrl: "/florence-duomo-1.png" }, { imageUrl: "/florence-duomo-2.png" }, { imageUrl: "/florence-duomo-3.png" }] },
      { id: "florence-uffizi-gallery", title: "Uffizi Gallery", date: "February 14, 2026", label: "Florence · Uffizi", description: "Add your notes about visiting the Uffizi Gallery.", mapEntryId: "florence-uffizi-gallery", images: [{ imageUrl: "/florence-uffizi-1.png" }, { imageUrl: "/florence-uffizi-2.png" }, { imageUrl: "/florence-uffizi-3.png" }] }
    ]
  },
  {
    slug: "prague",
    title: "Prague",
    location: "Prague",
    country: "Czech Republic",
    dateRange: "Feb 19 – 22, 2026",
    locationTags: ["Prague, Czech Republic"],
    slideshow: [
      { imageUrl: "/prague-main-1.png", caption: "Riverside walk by the Vltava." },
      { imageUrl: "/prague-main-2.png", caption: "Old Town architecture under clear skies." },
      { imageUrl: "/prague-main-3.png", caption: "Colorful facades in Prague." }
    ],
    mapEntryIds: ["prague-airbnb", "prague-the-dubliner", "prague-astronomical-clock", "prague-charles-bridge", "prague-exploring-city", "prague-castle", "prague-la-republica", "prague-folklore-dinner", "prague-communism-museum"],
    activities: [
      { id: "prague-airbnb", title: "Our Airbnb in Prague", date: "Feb 19 – 22, 2026", label: "Czech Republic · Prague", description: "Add your accommodation description here.", entryType: "accommodation", link: "https://www.airbnb.com/rooms/YOUR_LISTING_ID", linkLabel: "View on Airbnb", mapEntryId: "prague-airbnb", rating: 5, images: [] },
      { id: "prague-day-1", title: "The Dubliner", date: "February 19, 2026", label: "Czech Republic · Prague", description: "Add your notes about The Dubliner.", mapEntryId: "prague-the-dubliner", images: [{ imageUrl: "/prague-dubliner-1.png" }, { imageUrl: "/prague-dubliner-2.png" }, { imageUrl: "/prague-dubliner-3.png" }] },
      { id: "prague-astronomical-clock", title: "Prague Astronomical Clock", date: "February 20, 2026", label: "Czech Republic · Old Town", description: "Add your notes about seeing the Prague Astronomical Clock.", mapEntryId: "prague-astronomical-clock", images: [{ imageUrl: "/prague-clock-1.png" }] },
      { id: "prague-day-2", title: "Charles Bridge", date: "February 20, 2026", label: "Czech Republic · Prague", description: "Add your notes about exploring Charles Bridge.", mapEntryId: "prague-charles-bridge", images: [{ imageUrl: "/prague-charles-bridge-1.png" }, { imageUrl: "/prague-charles-bridge-2.png" }, { imageUrl: "/prague-charles-bridge-3.png" }, { imageUrl: "/prague-charles-bridge-4.png" }, { imageUrl: "/prague-charles-bridge-5.png" }, { imageUrl: "/prague-charles-bridge-6.png" }] },
      { id: "prague-day-3", title: "Exploring the City", date: "February 21, 2026", label: "Czech Republic · Prague", description: "Add your notes from exploring the city center and markets.", mapEntryId: "prague-exploring-city", images: [{ imageUrl: "/prague-exploring-city-1.png" }, { imageUrl: "/prague-exploring-city-2.png" }, { imageUrl: "/prague-exploring-city-3.png" }, { imageUrl: "/prague-exploring-city-4.png" }, { imageUrl: "/prague-exploring-city-5.png" }, { imageUrl: "/prague-exploring-city-6.png" }] },
      { id: "prague-castle", title: "Prague Castle", date: "February 21, 2026", label: "Czech Republic · Prague Castle", description: "Add your notes from visiting Prague Castle.", mapEntryId: "prague-castle", images: [{ imageUrl: "/prague-castle-1.png" }, { imageUrl: "/prague-castle-2.png" }, { imageUrl: "/prague-castle-3.png" }] },
      { id: "prague-la-republica-dinner", title: "Dinner at La Republica", date: "February 21, 2026", label: "Czech Republic · Prague", description: "Dinner at La Republica.", mapEntryId: "prague-la-republica", images: [{ imageUrl: "/prague-la-republica-1.png" }] },
      { id: "prague-folklore-dinner", title: "Traditional Czech Folklore Dinner", date: "February 21, 2026", label: "Czech Republic · Prague", description: "Traditional Czech folklore dinner with live music and dancing.", mapEntryId: "prague-folklore-dinner", images: [{ imageUrl: "/prague-folklore-dinner-1.png" }, { imageUrl: "/prague-folklore-dinner-2.png" }, { imageUrl: "/prague-folklore-dinner-3.png" }] },
      { id: "prague-day-4", title: "The Communism Museum", date: "February 22, 2026", label: "Czech Republic · Prague", description: "Add your notes from visiting the Museum of Communism.", mapEntryId: "prague-communism-museum", images: [{ imageUrl: "/prague-communism-museum-1.png" }, { imageUrl: "/prague-communism-museum-2.png" }] }
    ]
  },
  {
    slug: "budapest-vienna",
    title: "Budapest & Vienna",
    location: "Budapest",
    country: "Hungary",
    dateRange: "Feb 27 – Mar 1, 2026",
    locationTags: ["Budapest, Hungary", "Vienna, Austria"],
    slideshow: [
      { imageUrl: "/budapest-vienna-main-1.png", caption: "Budapest Parliament lit up at night." },
      { imageUrl: "/budapest-vienna-main-2.png", caption: "Fisherman's Bastion and city views in Budapest." },
      { imageUrl: "/budapest-vienna-main-3.png", caption: "Vienna architecture and museum district." }
    ],
    mapEntryIds: ["budapest-vienna-airbnb"],
    activities: [
      { id: "budapest-vienna-airbnb", title: "Our Airbnb", date: "Feb 27 – Mar 1, 2026", label: "Hungary · Budapest", description: "Add your accommodation description here.", entryType: "accommodation", link: "https://www.airbnb.com/rooms/YOUR_LISTING_ID", linkLabel: "View on Airbnb", mapEntryId: "budapest-vienna-airbnb", rating: 5, images: [] },
      { id: "budapest-vienna-day-1", title: "Arrival", date: "February 27, 2026", label: "Budapest", description: "Add your notes.", images: [] },
      { id: "budapest-vienna-day-2", title: "Exploring", date: "February 28, 2026", label: "Budapest", description: "Add your notes.", images: [] },
      { id: "budapest-vienna-day-3", title: "Budapest or Vienna", date: "March 1, 2026", label: "Budapest/Vienna", description: "Add your notes.", images: [] },
      { id: "budapest-vienna-day-4", title: "Departure", date: "March 1, 2026", label: "Budapest/Vienna", description: "Add your notes.", images: [] }
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
