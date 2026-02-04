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
}

export interface TripPage {
  slug: string;
  title: string;
  location: string;
  country: string;
  dateRange: string;
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
    slideshow: [
      {
        imageUrl:
          "/DSC00333.JPG",
        caption:
          "Rhine Falls, view from the Schloss Laufen."
      },
      {
        imageUrl:
          "/IMG_3411.heic",
        caption: "View from the train, powdery mildew on trees."
      },
      {
        imageUrl:
          "/IMG_3593.heic",
        caption: "Lucerne, evening walks along Chapel Bridge."
      }
    ],
    mapEntryIds: ["switzerland-airbnb-zurich", "tres-amigos-winterthur"],
    activities: [
      {
        id: "switzerland-airbnb",
        title: "Our Airbnb in Zurich",
        date: "Jan 23 – 25, 2026",
        label: "Switzerland · Zurich",
        description: "Cozy apartment right in the city center. Easy walk to the lake, trains, and cafes. Perfect base for weekend trips to Rhine Falls and Lucerne.",
        entryType: "accommodation",
        link: "https://www.airbnb.com/rooms/YOUR_LISTING_ID",
        linkLabel: "View on Airbnb",
        mapEntryId: "switzerland-airbnb-zurich",
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
            imageUrl:
              "/IMG_3436.heic",
          },
          {
            imageUrl:
              "/IMG_3439.heic",
          },
          {
            imageUrl:
              "/IMG_3440.heic",
          }
        ]
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
            imageUrl:
              "/IMG_3474.heic",
          },
          {
            imageUrl:
              "/IMG_3480.heic",
          },
          {
            imageUrl:
              "/IMG_3495.heic",
          }
        ]
      }
    ]
  },
  {
    slug: "florence-first-weekend",
    title: "Florence – First Weekend Away",
    location: "Florence",
    country: "Italy",
    dateRange: "Sept 5 – 7, 2026",
    slideshow: [],
    mapEntryIds: ["florence-duomo-view", "florence-gelato-riverside"],
    activities: [
      {
        id: "getting-lost",
        title: "Getting intentionally lost between museums",
        date: "Sept 6, 2026",
        label: "Florence · Centro Storico",
        description:
          "We walked without a map for hours, turning down whatever side street looked most interesting.",
        images: []
      },
      {
        id: "gelato-twice",
        title: "Going back for gelato twice in one day",
        date: "Sept 7, 2026",
        label: "Florence · Lungarno",
        description:
          "There was a stand along the river that we passed in the afternoon. We went back after dinner, and the staff remembered our order. Pistachio and stracciatella, eaten while watching the sunset turn the Arno golden.",
        images: [
          {
            imageUrl:
              "https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg?auto=compress&cs=tinysrgb&w=1600",
            caption: "Gelato by the Arno at sunset"
          },
          {
            imageUrl:
              "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1600",
            caption: "The same stand, second visit of the day"
          },
          {
            imageUrl:
              "https://images.pexels.com/photos/1796727/pexels-photo-1796727.jpeg?auto=compress&cs=tinysrgb&w=1600",
            caption: "Pistachio and stracciatella as the sky turned golden"
          }
        ]
      }
    ]
  },
  {
    slug: "amalfi-coast-escape",
    title: "Amalfi Coast Escape",
    location: "Amalfi Coast",
    country: "Italy",
    dateRange: "Sept 19 – 21, 2026",
    slideshow: [
      {
        imageUrl:
          "https://images.pexels.com/photos/167404/pexels-photo-167404.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Houses stacked impossibly high above the blue."
      },
      {
        imageUrl:
          "https://images.pexels.com/photos/1796726/pexels-photo-1796726.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Every turn on the cliffside road felt a little bit like flying."
      }
    ],
    activities: [
      {
        id: "beach-rest",
        title: "Slowing down by the water",
        date: "Sept 20, 2026",
        label: "Amalfi Coast · Beach",
        description:
          "We gave ourselves permission not to see everything. Instead, we spent entire afternoons on the same patch of rocky beach, reading, swimming, and counting how many ferries came and went. It was the first weekend that felt like real rest, not an itinerary."
      }
    ],
    mapEntryIds: ["amalfi-beach-spot", "amalfi-lemon-shop"]
  },
  {
    slug: "naples-pizza-pilgrimage",
    title: "Naples – Pizza Pilgrimage",
    location: "Naples",
    country: "Italy",
    dateRange: "Sept 26 – 28, 2026",
    slideshow: [
      {
        imageUrl: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "The birthplace of pizza—wood-fired and folded in half on the street."
      },
      {
        imageUrl: "https://images.pexels.com/photos/1454953/pexels-photo-1454953.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Neapolitan streets loud with scooters and conversation."
      }
    ],
    activities: [
      {
        id: "pizza-quest",
        title: "Chasing the perfect margherita",
        date: "Sept 26, 2026",
        label: "Naples · Spaccanapoli",
        description: "We tried three pizzerias in one day. The first was good. The second was better. The third—in a tiny alley with no sign—was the one we still talk about. Charred crust, San Marzano tomatoes, buffalo mozzarella that stretched for what felt like forever."
      },
      {
        id: "street-life",
        title: "Napoli at full volume",
        date: "Sept 27, 2026",
        label: "Naples · Centro",
        description: "Everything in Naples feels louder and more alive than Rome. Scooters weaving between pedestrians, laundry hanging from every balcony, and the smell of espresso and frying dough on every corner. We walked for hours and never wanted to sit down."
      }
    ],
    mapEntryIds: []
  },
  {
    slug: "tuscany-autumn-hills",
    title: "Tuscany – Autumn in the Hills",
    location: "Tuscany",
    country: "Italy",
    dateRange: "Oct 3 – 5, 2026",
    slideshow: [
      {
        imageUrl: "https://images.pexels.com/photos/1450383/pexels-photo-1450383.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Golden light on rolling hills and cypress trees."
      },
      {
        imageUrl: "https://images.pexels.com/photos/1121274/pexels-photo-1121274.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Small towns perched on hilltops, one winding road up and down."
      }
    ],
    activities: [
      {
        id: "wine-and-olives",
        title: "A farm lunch that lasted four hours",
        date: "Oct 4, 2026",
        label: "Tuscany · Chianti",
        description: "We drove up a gravel road to a family-run farm. Lunch was bread, olive oil, pecorino, salami, and wine—all made on the property. We sat under an olive tree until the sun dropped behind the hills. No rush, no menu, just whatever Nonna brought out next."
      }
    ],
    mapEntryIds: []
  },
  {
    slug: "cinque-terre-cliffside-trails",
    title: "Cinque Terre – Cliffside Trails",
    location: "Cinque Terre",
    country: "Italy",
    dateRange: "Oct 10 – 12, 2026",
    slideshow: [
      {
        imageUrl: "https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Colorful villages stacked above the Ligurian Sea."
      },
      {
        imageUrl: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Hiking between villages with the sea always in view."
      }
    ],
    activities: [
      {
        id: "trail-walk",
        title: "Walking from Monterosso to Vernazza",
        date: "Oct 11, 2026",
        label: "Cinque Terre · Coastal Trail",
        description: "The trail was steeper than we expected. Two hours of stone steps and olive groves, with the sea opening up between the trees. When Vernazza appeared below—all pastel buildings and tiny harbor—we sat on a rock and didn't move for twenty minutes."
      },
      {
        id: "focaccia-port",
        title: "Focaccia by the harbor",
        date: "Oct 12, 2026",
        label: "Cinque Terre · Vernazza",
        description: "We bought focaccia warm from a bakery and ate it on the rocks while the sun set. Salt and rosemary, the sound of waves, and a train full of day-trippers pulling away. The village felt quiet for the first time all weekend."
      }
    ],
    mapEntryIds: []
  },
  {
    slug: "paris-fall-break",
    title: "Paris – Fall Break",
    location: "Paris",
    country: "France",
    dateRange: "Oct 17 – 20, 2026",
    slideshow: [
      {
        imageUrl: "https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "The Eiffel Tower through autumn leaves."
      },
      {
        imageUrl: "https://images.pexels.com/photos/1113638/pexels-photo-1113638.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Late afternoon light on the Seine."
      }
    ],
    activities: [
      {
        id: "louvre-morning",
        title: "The Louvre before the crowds",
        date: "Oct 18, 2026",
        label: "Paris · 1st Arrondissement",
        description: "We got there at opening and headed straight for the Denon wing. For forty minutes we had the Winged Victory mostly to ourselves. By the time we left, the hall was packed. Worth every minute of the early alarm."
      },
      {
        id: "croissant-hunt",
        title: "In search of the perfect croissant",
        date: "Oct 19, 2026",
        label: "Paris · Le Marais",
        description: "We tried four bakeries in one morning. Flaky, buttery, each one different. The last stop—a tiny place with no seating—was the one. We ate them on a bench by the Canal Saint-Martin and watched the barges pass."
      }
    ],
    mapEntryIds: []
  },
  {
    slug: "barcelona-sea-and-streets",
    title: "Barcelona – Sea and Streets",
    location: "Barcelona",
    country: "Spain",
    dateRange: "Oct 24 – 26, 2026",
    slideshow: [
      {
        imageUrl: "https://images.pexels.com/photos/666697/pexels-photo-666697.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Sagrada Familia rising above the city."
      },
      {
        imageUrl: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "The Mediterranean from Barceloneta beach."
      }
    ],
    activities: [
      {
        id: "gaudi-afternoon",
        title: "Losing ourselves in Gaudí",
        date: "Oct 25, 2026",
        label: "Barcelona · Eixample",
        description: "Park Güell in the morning, Casa Batlló in the afternoon. Every surface curved and colorful. We kept stopping to touch the mosaics. It felt like walking through someone's wildest dream."
      },
      {
        id: "tapas-evening",
        title: "Tapas until midnight",
        date: "Oct 26, 2026",
        label: "Barcelona · El Raval",
        description: "We hopped from bar to bar—patatas bravas, jamón, grilled octopus, pan con tomate. Each place had one thing they did perfectly. By the end we'd lost count of how many stops we'd made."
      }
    ],
    mapEntryIds: []
  },
  {
    slug: "vienna-cozy-museums",
    title: "Vienna – Cozy Museums",
    location: "Vienna",
    country: "Austria",
    dateRange: "Nov 1 – 3, 2026",
    slideshow: [
      {
        imageUrl: "https://images.pexels.com/photos/208702/pexels-photo-208702.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Hofburg Palace in November light."
      },
      {
        imageUrl: "https://images.pexels.com/photos/2746823/pexels-photo-2746823.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Coffee and cake in a traditional Kaffeehaus."
      }
    ],
    activities: [
      {
        id: "belvedere-morning",
        title: "Klimt at the Belvedere",
        date: "Nov 2, 2026",
        label: "Vienna · Belvedere",
        description: "We went for The Kiss and stayed for three hours. The gold leaf in person is nothing like in photos. We sat in front of it for a long time, then wandered through room after room of paintings we'd never seen before."
      },
      {
        id: "sacher-torte",
        title: "Sachertorte and hot chocolate",
        date: "Nov 2, 2026",
        label: "Vienna · Innere Stadt",
        description: "We splurged on the famous hotel café. The cake was dense and barely sweet. The hot chocolate was practically pudding. Outside, the first snow of the season was starting to fall."
      }
    ],
    mapEntryIds: []
  },
  {
    slug: "prague-cobblestones-and-cafes",
    title: "Prague – Cobblestones and Cafés",
    location: "Prague",
    country: "Czech Republic",
    dateRange: "Nov 7 – 9, 2026",
    slideshow: [
      {
        imageUrl: "https://images.pexels.com/photos/415980/pexels-photo-415980.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Charles Bridge at dawn."
      },
      {
        imageUrl: "https://images.pexels.com/photos/545048/pexels-photo-545048.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Old Town Square and the astronomical clock."
      }
    ],
    activities: [
      {
        id: "bridge-dawn",
        title: "Charles Bridge before sunrise",
        date: "Nov 8, 2026",
        label: "Prague · Malá Strana",
        description: "We woke up at 5am to beat the crowds. The bridge was almost empty. Fog hung over the Vltava. The statues seemed to watch us as we walked across. By 7am the first tour groups had arrived—we were already at a café with hot chocolate."
      },
      {
        id: "trdelnik",
        title: "Trdelník and the hunt for the best one",
        date: "Nov 9, 2026",
        label: "Prague · Old Town",
        description: "We tried four stands. Cinnamon, sugar, filled with ice cream, plain and warm. The best was from a tiny stall in a side alley—no line, no Instagram setup, just a man with a rolling pin and a fire."
      }
    ],
    mapEntryIds: []
  },
  {
    slug: "budapest-thermal-evenings",
    title: "Budapest – Thermal Evenings",
    location: "Budapest",
    country: "Hungary",
    dateRange: "Nov 14 – 16, 2026",
    slideshow: [
      {
        imageUrl: "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Parliament reflected in the Danube at night."
      },
      {
        imageUrl: "https://images.pexels.com/photos/326057/pexels-photo-326057.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Széchenyi thermal baths—steam rising into the cold air."
      }
    ],
    activities: [
      {
        id: "thermal-baths",
        title: "A night at the baths",
        date: "Nov 15, 2026",
        label: "Budapest · City Park",
        description: "We went to Széchenyi after dark. The outdoor pools were steaming in the cold. We moved between hot and cold, sometimes just floating, watching the yellow building glow against the black sky. Three hours felt like twenty minutes."
      },
      {
        id: "ruin-bars",
        title: "Ruin bars and ruin bars",
        date: "Nov 16, 2026",
        label: "Budapest · Jewish Quarter",
        description: "Every bar was weirder than the last. Vintage furniture, graffiti, plants everywhere, rooms that led to more rooms. We got lost in one and ended up in a courtyard with a fire pit. The whole city felt like a secret."
      }
    ],
    mapEntryIds: []
  },
  {
    slug: "milan-fashion-and-trains",
    title: "Milan – Fashion and Trains",
    location: "Milan",
    country: "Italy",
    dateRange: "Nov 21 – 23, 2026",
    slideshow: [
      {
        imageUrl: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "The Duomo and Galleria Vittorio Emanuele II."
      },
      {
        imageUrl: "https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Aperitivo hour in Navigli."
      }
    ],
    activities: [
      {
        id: "duomo-rooftop",
        title: "The Duomo from above",
        date: "Nov 22, 2026",
        label: "Milan · Centro",
        description: "We climbed to the rooftop. Spires and statues everywhere, close enough to touch. The view of the city—flat and endless—made Rome feel like a village. We stayed until they kicked us out."
      },
      {
        id: "aperitivo-navigli",
        title: "Aperitivo along the canals",
        date: "Nov 22, 2026",
        label: "Milan · Navigli",
        description: "Spritzes and little plates of olives, cheese, and bread. The canals were lit with string lights. We sat outside in November—everyone had a blanket—and pretended we weren't cold."
      }
    ],
    mapEntryIds: []
  },
  {
    slug: "lake-como-quiet-water",
    title: "Lake Como – Quiet Water",
    location: "Lake Como",
    country: "Italy",
    dateRange: "Nov 28 – 30, 2026",
    slideshow: [
      {
        imageUrl: "https://images.pexels.com/photos/1674046/pexels-photo-1674046.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Varenna at golden hour."
      },
      {
        imageUrl: "https://images.pexels.com/photos/409127/pexels-photo-409127.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Ferry crossing the lake, mountains on every side."
      }
    ],
    activities: [
      {
        id: "ferry-hop",
        title: "Ferry-hopping between villages",
        date: "Nov 29, 2026",
        label: "Lake Como",
        description: "We took the ferry from Bellagio to Varenna to Menaggio. Each village was smaller and quieter than the last. We had lunch in a place with three tables. The lake was still, the mountains sharp against the sky. Everything felt slowed down."
      },
      {
        id: "villa-gardens",
        title: "Villa gardens in the off-season",
        date: "Nov 30, 2026",
        label: "Lake Como · Tremezzo",
        description: "The tourist season was over. We had Villa Carlotta's gardens mostly to ourselves. Empty fountains, bare branches, a few camellias already blooming. It felt like we'd found a secret version of the lake."
      }
    ],
    mapEntryIds: []
  },
  {
    slug: "munich-christmas-markets",
    title: "Munich – Christmas Markets",
    location: "Munich",
    country: "Germany",
    dateRange: "Dec 5 – 7, 2026",
    slideshow: [
      {
        imageUrl: "https://images.pexels.com/photos/236699/pexels-photo-236699.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Marienplatz Christmas market at dusk."
      },
      {
        imageUrl: "https://images.pexels.com/photos/2916828/pexels-photo-2916828.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Glühwein and gingerbread in the cold."
      }
    ],
    activities: [
      {
        id: "christmas-markets",
        title: "Glühwein and lebkuchen",
        date: "Dec 6, 2026",
        label: "Munich · Marienplatz",
        description: "We hit four markets in one day. Each had its own character—one was medieval, one was for crafts, one was tiny and hidden in a courtyard. We drank glühwein until our fingers thawed and bought more ornaments than we could carry."
      },
      {
        id: "english-garden",
        title: "The English Garden in winter",
        date: "Dec 7, 2026",
        label: "Munich · Englischer Garten",
        description: "The park was frozen and quiet. We walked along the creek, past bare trees and empty beer gardens. A few surfers were still riding the Eisbach wave in wetsuits. We stood and watched them until our noses went numb."
      }
    ],
    mapEntryIds: []
  }
];

export function getTripPageBySlug(slug: string): TripPage | undefined {
  return TRIP_PAGES.find((trip) => trip.slug === slug);
}

/** All trips for overview page. Add/remove trips in TRIP_PAGES above. */
export function getAllTrips(): TripPage[] {
  return TRIP_PAGES;
}
