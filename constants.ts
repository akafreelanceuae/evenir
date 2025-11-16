import { ServiceCategory, Vendor, User, QuoteRequest, QuoteResponse, Message } from './types';
import { CameraIcon, MusicNoteIcon, CakeIcon, LocationMarkerIcon, VideoCameraIcon, SparklesIcon, CompassIcon, TicketIcon, ChatAlt2Icon } from './components/Icons';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: '1', name: 'Photographers', icon: CameraIcon, image: 'https://picsum.photos/seed/photographer/800/600', description: 'Capture your special moments forever.' },
  { id: '2', name: 'DJs', icon: MusicNoteIcon, image: 'https://picsum.photos/seed/dj/800/600', description: 'Get the party started with amazing beats.' },
  { id: '3', name: 'Caterers', icon: CakeIcon, image: 'https://picsum.photos/seed/caterer/800/600', description: 'Delight your guests with delicious food.' },
  { id: '4', name: 'Venues', icon: LocationMarkerIcon, image: 'https://picsum.photos/seed/venue/800/600', description: 'Find the perfect backdrop for your event.' },
  { id: '5', name: 'Videographers', icon: VideoCameraIcon, image: 'https://picsum.photos/seed/video/800/600', description: 'Create a cinematic memory of your day.' },
  { id: '6', name: 'Planners', icon: SparklesIcon, image: 'https://picsum.photos/seed/planner/800/600', description: 'Expert help to orchestrate your event.' },
  { id: '7', name: 'Tours & Experiences', icon: CompassIcon, image: 'https://picsum.photos/seed/tours/800/600', description: 'Unforgettable adventures and activities.' },
  { id: '8', name: 'Attractions', icon: TicketIcon, image: 'https://picsum.photos/seed/attractions/800/600', description: 'Visit Dubai\'s world-famous landmarks.' },
  { id: '9', name: 'Guides & Translators', icon: ChatAlt2Icon, image: 'https://picsum.photos/seed/guides/800/600', description: 'Expert local guides and language support.' },
];

export const VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'DubaiLens',
    category: 'Photographers',
    bio: 'Capturing life\'s precious moments with artistry and passion. Specializing in weddings and corporate events.',
    longDescription: 'DubaiLens is a premier photography service based in the heart of Dubai. With over a decade of experience, our team, led by acclaimed photographer Aisha Al Marzooqi, specializes in creating stunning visual narratives. We believe every event tells a unique story, and our mission is to capture that story with authenticity and creativity. From intimate family gatherings to grand corporate functions, we bring a keen eye for detail and a commitment to excellence to every project.',
    location: 'Dubai, UAE',
    pricingRange: [1500, 5000],
    portfolio: [
      'https://picsum.photos/seed/dubaipic1/1024/768',
      'https://picsum.photos/seed/dubaipic2/1024/768',
      'https://picsum.photos/seed/dubaipic3/1024/768',
      'https://picsum.photos/seed/dubaipic4/1024/768',
    ],
    rating: 4.9,
    profileImage: 'https://picsum.photos/seed/dubailens/500/500',
    reviews: [
      { id: 'r1', author: 'Fatima H.', avatar: 'https://picsum.photos/seed/fatima/100/100', rating: 5, comment: 'Absolutely stunning photos! They captured our wedding perfectly.', date: '2023-10-15' },
      { id: 'r2', author: 'John S.', avatar: 'https://picsum.photos/seed/john/100/100', rating: 5, comment: 'Professional and creative. Highly recommended for corporate events.', date: '2023-09-02' },
    ],
  },
  {
    id: 'v2',
    name: 'DJ Beats DXB',
    category: 'DJs',
    bio: 'High-energy DJ with a versatile music library to get any crowd moving. Birthdays, weddings, and club nights.',
    longDescription: 'DJ Beats DXB is not just a DJ; he\'s an experience. With an uncanny ability to read the crowd and a music library spanning decades and genres, he guarantees a dance floor that never empties. From the latest chart-toppers to classic anthems, DJ Beats DXB curates a personalized soundtrack for your event, ensuring the vibe is always right. Professional sound and lighting equipment included.',
    location: 'Dubai, UAE',
    pricingRange: [1200, 4000],
    portfolio: [
      'https://picsum.photos/seed/djbeat1/1024/768',
      'https://picsum.photos/seed/djbeat2/1024/768',
      'https://picsum.photos/seed/djbeat3/1024/768',
    ],
    rating: 4.8,
    profileImage: 'https://picsum.photos/seed/djbeats/500/500',
    reviews: [
      { id: 'r3', author: 'Sarah K.', avatar: 'https://picsum.photos/seed/sarah/100/100', rating: 5, comment: 'The best DJ in Dubai! He made my birthday party unforgettable.', date: '2023-11-05' },
      { id: 'r4', author: 'Ahmed R.', avatar: 'https://picsum.photos/seed/ahmed/100/100', rating: 4, comment: 'Great music selection, kept the energy high all night.', date: '2023-08-20' },
    ],
  },
  {
    id: 'v3',
    name: 'Arabian Bites Catering',
    category: 'Caterers',
    bio: 'Authentic Emirati and modern fusion cuisine. We cater to events of all sizes with exceptional taste and service.',
    longDescription: 'At Arabian Bites, we bring the rich flavors of the Middle East to your table with a modern twist. Our culinary team, led by Chef Khalid, uses only the freshest local ingredients to craft exquisite menus that cater to every palate. From traditional lamb ouzi to contemporary camel milk panna cotta, our dishes are a feast for the senses. We offer buffet, plated, and canapé services, all delivered with impeccable hospitality.',
    location: 'Dubai, UAE',
    pricingRange: [200, 800],
    portfolio: [
      'https://picsum.photos/seed/cater1/1024/768',
      'https://picsum.photos/seed/cater2/1024/768',
      'https://picsum.photos/seed/cater3/1024/768',
      'https://picsum.photos/seed/cater4/1024/768',
    ],
    rating: 4.9,
    profileImage: 'https://picsum.photos/seed/arabianbites/500/500',
    reviews: [
      { id: 'r5', author: 'Noora A.', avatar: 'https://picsum.photos/seed/noora/100/100', rating: 5, comment: 'The food was the highlight of our event! Everyone loved it.', date: '2023-10-28' },
      { id: 'r6', author: 'David L.', avatar: 'https://picsum.photos/seed/david/100/100', rating: 5, comment: 'Exceptional service and mouth-watering food. The best caterers we have ever worked with.', date: '2023-09-12' },
    ],
  },
   {
    id: 'v4',
    name: 'Desert Bloom Venues',
    category: 'Venues',
    bio: 'Stunning and versatile event spaces, from lush gardens to elegant ballrooms, in the heart of Dubai.',
    longDescription: 'Desert Bloom offers a portfolio of exclusive venues designed to make your event unforgettable. Whether you envision a romantic garden wedding, a sophisticated corporate gala in a grand ballroom, or a trendy rooftop party with skyline views, we have the perfect space. Our dedicated event team works with you to transform our venues to match your vision, ensuring every detail is perfect.',
    location: 'Dubai, UAE',
    pricingRange: [5000, 25000],
    portfolio: [
      'https://picsum.photos/seed/venue1/1024/768',
      'https://picsum.photos/seed/venue2/1024/768',
      'https://picsum.photos/seed/venue3/1024/768',
    ],
    rating: 4.7,
    profileImage: 'https://picsum.photos/seed/desertbloom/500/500',
    reviews: [
      { id: 'r7', author: 'Omar G.', avatar: 'https://picsum.photos/seed/omar/100/100', rating: 5, comment: 'The ballroom was magnificent, and the staff was incredibly helpful. Made our conference a huge success.', date: '2023-09-30' },
      { id: 'r8', author: 'Jessica W.', avatar: 'https://picsum.photos/seed/jessica/100/100', rating: 4, comment: 'Beautiful garden venue for our wedding. A bit pricey but worth it for the ambiance.', date: '2023-11-11' },
    ],
  },
  {
    id: 'v5',
    name: 'CineVision Films',
    category: 'Videographers',
    bio: 'Cinematic storytelling for weddings and events. We create beautiful films that you\'ll cherish forever.',
    longDescription: 'CineVision Films goes beyond simple recording; we are storytellers. Using state-of-the-art equipment and cinematic techniques, we craft emotionally resonant films that capture the essence of your special day. Our unobtrusive style allows us to capture candid moments, while our artistic editing process weaves them into a compelling narrative. We offer a range of packages, including drone footage and highlight reels.',
    location: 'Dubai, UAE',
    pricingRange: [2000, 8000],
    portfolio: [
      'https://picsum.photos/seed/cine1/1024/768',
      'https://picsum.photos/seed/cine2/1024/768',
    ],
    rating: 5.0,
    profileImage: 'https://picsum.photos/seed/cinevision/500/500',
    reviews: [
      { id: 'r9', author: 'Hassan M.', avatar: 'https://picsum.photos/seed/hassan/100/100', rating: 5, comment: 'Our wedding video is like a movie! We can\'t stop watching it. Absolutely incredible work.', date: '2023-10-21' },
      { id: 'r10', author: 'Chloe T.', avatar: 'https://picsum.photos/seed/chloe/100/100', rating: 5, comment: 'The team was so professional and made us feel comfortable. The final film exceeded all expectations.', date: '2023-08-15' },
    ],
  },
  {
    id: 'v6',
    name: 'Elevant Events',
    category: 'Planners',
    bio: 'Meticulous and creative event planning services. We handle everything from concept to execution, so you can relax.',
    longDescription: 'At Elevant Events, we believe that a perfectly executed event is a work of art. Our team of experienced planners takes the stress out of organizing, managing every detail with precision and flair. We offer full-service planning, partial planning, and day-of coordination for weddings, corporate events, and private parties. Our strong network of trusted vendors in Dubai ensures you get the best quality and value.',
    location: 'Dubai, UAE',
    pricingRange: [3000, 15000],
    portfolio: [
      'https://picsum.photos/seed/plan1/1024/768',
      'https://picsum.photos/seed/plan2/1024/768',
      'https://picsum.photos/seed/plan3/1024/768',
    ],
    rating: 4.9,
    profileImage: 'https://picsum.photos/seed/elevant/500/500',
    reviews: [
      { id: 'r11', author: 'Amina B.', avatar: 'https://picsum.photos/seed/amina/100/100', rating: 5, comment: 'They are miracle workers! Our wedding was flawless and completely stress-free thanks to them.', date: '2023-11-18' },
      { id: 'r12', author: 'Richard P.', avatar: 'https://picsum.photos/seed/richard/100/100', rating: 5, comment: 'Extremely organized and professional. Our product launch was a huge success because of their team.', date: '2023-09-05' },
    ],
  },
  {
    id: 'v7',
    name: 'Mirage Weddings',
    category: 'Photographers',
    bio: 'Luxury wedding photography capturing timeless elegance and heartfelt emotions. Based in Dubai, available worldwide.',
    longDescription: 'Mirage Weddings specializes in creating editorial-style wedding photography that is both timeless and romantic. We focus on capturing genuine emotions and the subtle, beautiful moments that make your day unique. Our approach combines documentary-style coverage with fine art portraiture, resulting in a collection of images that are both authentic and breathtakingly beautiful.',
    location: 'Dubai, UAE',
    pricingRange: [4000, 12000],
    portfolio: [
      'https://picsum.photos/seed/mirage1/1024/768',
      'https://picsum.photos/seed/mirage2/1024/768',
      'https://picsum.photos/seed/mirage3/1024/768',
    ],
    rating: 4.8,
    profileImage: 'https://picsum.photos/seed/mirageweddings/500/500',
    reviews: [
      { id: 'r13', author: 'Laila K.', avatar: 'https://picsum.photos/seed/laila/100/100', rating: 5, comment: 'The photos are like a dream. They are true artists!', date: '2023-10-01' },
      { id: 'r14', author: 'Ben Carter', avatar: 'https://picsum.photos/seed/ben/100/100', rating: 4, comment: 'Beautiful photos, but took a little longer to receive than expected. Worth the wait though!', date: '2023-07-22' },
    ],
  },
  {
    id: 'v8',
    name: 'Desert Adventures Dubai',
    category: 'Tours & Experiences',
    bio: 'Thrilling desert safaris with dune bashing, camel rides, and traditional Bedouin camps. Experience the real Arabian desert.',
    longDescription: 'Escape the city and immerse yourself in the timeless beauty of the Arabian desert with Desert Adventures Dubai. We offer a range of safari packages, from adrenaline-pumping dune bashing in 4x4s to serene camel treks at sunset. Our experiences culminate at our authentic Bedouin-style camp, where you can enjoy a delicious BBQ dinner, live entertainment like belly dancing and Tanoura shows, and stargazing far from the city lights. Safety is our priority, and our experienced guides ensure you have a memorable and safe adventure.',
    location: 'Dubai, UAE',
    pricingRange: [250, 900],
    portfolio: [
      'https://picsum.photos/seed/safari1/1024/768',
      'https://picsum.photos/seed/safari2/1024/768',
      'https://picsum.photos/seed/safari3/1024/768',
    ],
    rating: 4.8,
    profileImage: 'https://picsum.photos/seed/desertsafari/500/500',
    reviews: [
      { id: 'r15', author: 'Michael B.', avatar: 'https://picsum.photos/seed/michael/100/100', rating: 5, comment: 'The dune bashing was insane! So much fun. The camp and dinner were also fantastic.', date: '2023-11-20' },
      { id: 'r16', author: 'Priya S.', avatar: 'https://picsum.photos/seed/priya/100/100', rating: 5, comment: 'A must-do experience in Dubai. Our guide was amazing and took great photos for us.', date: '2023-10-18' },
    ],
  },
  {
    id: 'v9',
    name: 'Marina Yacht Charters',
    category: 'Tours & Experiences',
    bio: 'Luxury yacht rentals and dhow cruises in Dubai Marina. Host a private party or enjoy a scenic tour of the skyline.',
    longDescription: 'Experience Dubai from its most glamorous perspective with Marina Yacht Charters. We offer a fleet of modern, luxurious yachts perfect for any occasion, from corporate events and birthday parties to romantic sunset cruises. Our professional crew will cater to your every need, ensuring a seamless and unforgettable experience on the water. We also offer traditional dhow cruises for a more authentic taste of Arabian hospitality.',
    location: 'Dubai Marina, Dubai',
    pricingRange: [800, 3000],
    portfolio: [
      'https://picsum.photos/seed/yacht1/1024/768',
      'https://picsum.photos/seed/yacht2/1024/768',
      'https://picsum.photos/seed/yacht3/1024/768',
    ],
    rating: 4.9,
    profileImage: 'https://picsum.photos/seed/yachtcharter/500/500',
    reviews: [
      { id: 'r17', author: 'Alex V.', avatar: 'https://picsum.photos/seed/alex/100/100', rating: 5, comment: 'We rented a yacht for my husbands birthday and it was the best decision! The crew was fantastic and the views were breathtaking.', date: '2023-11-25' },
    ],
  },
  {
    id: 'v10',
    name: 'SkyHigh Dubai',
    category: 'Tours & Experiences',
    bio: 'The ultimate thrill! Experience Dubai from above with our skydiving, parasailing, and helicopter tours.',
    longDescription: 'For the ultimate adrenaline rush, SkyHigh Dubai offers unparalleled aerial experiences. See the iconic Palm Jumeirah from 13,000 feet as you skydive with our world-class instructors. Prefer something a bit more relaxed? Our helicopter tours provide stunning panoramic views of the city\'s landmarks. We also offer parasailing for a thrilling ride over the azure waters of the Arabian Gulf.',
    location: 'Palm Jumeirah, Dubai',
    pricingRange: [400, 2200],
    portfolio: [
      'https://picsum.photos/seed/sky1/1024/768',
      'https://picsum.photos/seed/sky2/1024/768',
    ],
    rating: 5.0,
    profileImage: 'https://picsum.photos/seed/skyhigh/500/500',
    reviews: [
      { id: 'r18', author: 'Emily R.', avatar: 'https://picsum.photos/seed/emily/100/100', rating: 5, comment: 'Skydiving over the Palm was a once-in-a-lifetime experience. The team was professional and made me feel safe. 10/10!', date: '2023-10-10' },
    ],
  },
  {
    id: 'v11',
    name: 'Wave Riders JBR',
    category: 'Tours & Experiences',
    bio: 'Adrenaline-pumping water sports at Jumeirah Beach. Jet skiing, flyboarding, and banana boat rides for all.',
    longDescription: 'Make a splash with Wave Riders JBR, Dubai\'s premier water sports provider. Located on the vibrant Jumeirah Beach, we offer a wide range of activities for all ages and skill levels. Feel the speed on our top-of-the-line jet skis, soar above the water on a flyboard, or have a laugh with friends on a banana boat ride. Our certified instructors are on hand to provide guidance and ensure your safety.',
    location: 'JBR Beach, Dubai',
    pricingRange: [150, 600],
    portfolio: [
      'https://picsum.photos/seed/wave1/1024/768',
      'https://picsum.photos/seed/wave2/1024/768',
    ],
    rating: 4.7,
    profileImage: 'https://picsum.photos/seed/waveriders/500/500',
    reviews: [
       { id: 'r19', author: 'Tom H.', avatar: 'https://picsum.photos/seed/tom/100/100', rating: 5, comment: 'Great fun! The jet skis are powerful and the staff are friendly. Easy to book and get started.', date: '2023-11-01' },
    ],
  },
  {
    id: 'v12',
    name: 'Burj Khalifa - At The Top',
    category: 'Attractions',
    bio: 'Ascend to the top of the world\'s tallest building. Witness breathtaking 360-degree views of Dubai from Levels 124, 125, and 148.',
    longDescription: 'No trip to Dubai is complete without a visit to the iconic Burj Khalifa. Our "At The Top" experience takes you to the observation decks on the 124th and 125th floors, offering unparalleled views of the city, desert, and ocean. For a more exclusive experience, the "At The Top SKY" ticket grants access to the luxurious lounge on the 148th floor. It\'s a must-see attraction for tourists and residents alike.',
    location: 'Downtown Dubai',
    pricingRange: [169, 553],
    portfolio: [
      'https://picsum.photos/seed/bk1/1024/768',
      'https://picsum.photos/seed/bk2/1024/768',
    ],
    rating: 4.9,
    profileImage: 'https://picsum.photos/seed/burjkhalifa/500/500',
    reviews: [
       { id: 'r20', author: 'Maria G.', avatar: 'https://picsum.photos/seed/maria/100/100', rating: 5, comment: 'The views are simply out of this world, especially at sunset. An unforgettable experience.', date: '2023-11-15' },
    ],
  },
  {
    id: 'v13',
    name: 'Aquaventure Waterpark',
    category: 'Attractions',
    bio: 'Dive into a world of excitement at the world\'s largest waterpark, located at Atlantis, The Palm. Thrilling slides and a private beach.',
    longDescription: 'Get your pulse racing at Aquaventure Waterpark, home to over 105 record-breaking slides, attractions, and experiences. Plunge down the Leap of Faith, ride the rapids of the lazy river, or relax on our 1km private beach. With attractions for all ages, from the Splashers Kids\' Play Area to the most intense water slides, it\'s the perfect day out for the whole family.',
    location: 'Atlantis, The Palm',
    pricingRange: [299, 349],
    portfolio: [
      'https://picsum.photos/seed/aqua1/1024/768',
      'https://picsum.photos/seed/aqua2/1024/768',
    ],
    rating: 4.8,
    profileImage: 'https://picsum.photos/seed/aquaventure/500/500',
    reviews: [
       { id: 'r21', author: 'The Smith Family', avatar: 'https://picsum.photos/seed/smith/100/100', rating: 5, comment: 'Best waterpark we have ever been to! So much to do for the kids and adults. We spent the whole day there.', date: '2023-10-25' },
    ],
  },
  {
    id: 'v14',
    name: 'Museum of the Future',
    category: 'Attractions',
    bio: 'Step into the world of tomorrow. An architectural marvel showcasing future technology and innovative concepts.',
    longDescription: 'The Museum of the Future is not just a museum; it\'s a gateway to the year 2071. This unique institution showcases how technology can evolve to enhance our bodies and minds, and how it could help solve societal and environmental challenges. With immersive exhibits spanning space travel, climate change, wellness, and more, it offers a hopeful and inspiring vision of the future.',
    location: 'Sheikh Zayed Road, Dubai',
    pricingRange: [149, 149],
    portfolio: [
      'https://picsum.photos/seed/motf1/1024/768',
      'https://picsum.photos/seed/motf2/1024/768',
    ],
    rating: 4.9,
    profileImage: 'https://picsum.photos/seed/motf/500/500',
    reviews: [
       { id: 'r22', author: 'Ben C.', avatar: 'https://picsum.photos/seed/benc/100/100', rating: 5, comment: 'The building is a masterpiece, and the exhibits are even better. Truly inspiring and thought-provoking. A must-visit.', date: '2023-11-22' },
    ],
  },
  {
    id: 'v15',
    name: 'Ski Dubai',
    category: 'Attractions',
    bio: 'Experience a winter wonderland in the desert! Skiing, snowboarding, and penguin encounters at Mall of the Emirates.',
    longDescription: 'Discover the Middle East\'s first indoor ski resort. With 5 ski slopes of varying difficulty, a massive snow park play area, and a colony of Gentoo and King Penguins, Ski Dubai offers a surreal and fun-filled day for everyone. All winter clothing and equipment is included with your pass, so you just need to show up and have fun!',
    location: 'Mall of the Emirates, Dubai',
    pricingRange: [220, 410],
    portfolio: [
      'https://picsum.photos/seed/ski1/1024/768',
      'https://picsum.photos/seed/ski2/1024/768',
    ],
    rating: 4.7,
    profileImage: 'https://picsum.photos/seed/skidubai/500/500',
    reviews: [
       { id: 'r23', author: 'Laura K.', avatar: 'https://picsum.photos/seed/laura/100/100', rating: 5, comment: 'It\'s crazy to be skiing in the middle of the desert! So much fun, and the penguin encounter was adorable.', date: '2023-09-15' },
    ],
  },
  {
    id: 'v16',
    name: 'Dubai Guide Pro',
    category: 'Guides & Translators',
    bio: 'Licensed and experienced tourist guides for private and group tours. Discover the hidden gems of Dubai.',
    longDescription: 'See Dubai through the eyes of a local expert. At Dubai Guide Pro, our certified guides are passionate about sharing the city\'s history, culture, and secrets. We offer customizable private tours, from exploring the historical Al Fahidi district and souks to navigating the modern marvels of Downtown Dubai. Let us create a personalized itinerary that matches your interests.',
    location: 'Dubai, UAE',
    pricingRange: [200, 600],
    portfolio: [
      'https://picsum.photos/seed/guide1/1024/768',
      'https://picsum.photos/seed/guide2/1024/768',
    ],
    rating: 4.9,
    profileImage: 'https://picsum.photos/seed/guidepro/500/500',
    reviews: [
       { id: 'r24', author: 'Hans D.', avatar: 'https://picsum.photos/seed/hans/100/100', rating: 5, comment: 'Our guide, Ahmed, was incredibly knowledgeable and friendly. We saw so much more than we would have on our own.', date: '2023-11-10' },
    ],
  },
  {
    id: 'v17',
    name: 'LingoConnect UAE',
    category: 'Guides & Translators',
    bio: 'Professional translation and interpretation services in Dubai. Arabic, Russian, English, and more. For business or leisure.',
    longDescription: 'Navigate Dubai with confidence with LingoConnect UAE. We provide professional interpreters for business meetings, conferences, and tours. We also offer certified translation services for documents. Our team of native speakers ensures clear, accurate, and culturally sensitive communication to bridge any language gap during your time in the UAE.',
    location: 'Dubai, UAE',
    pricingRange: [300, 1000],
    portfolio: [
      'https://picsum.photos/seed/lingo1/1024/768',
      'https://picsum.photos/seed/lingo2/1024/768',
    ],
    rating: 4.8,
    profileImage: 'https://picsum.photos/seed/lingo/500/500',
    reviews: [
       { id: 'r25', author: 'Olga P.', avatar: 'https://picsum.photos/seed/olga/100/100', rating: 5, comment: 'Used their service for a business meeting. Our Russian-English interpreter was excellent. Very professional.', date: '2023-10-05' },
    ],
  },
  {
    id: 'v18',
    name: 'Pixel Perfect Studios',
    category: 'Photographers',
    bio: 'High-end commercial and corporate event photography. We deliver sharp, professional images that elevate your brand.',
    longDescription: 'Pixel Perfect Studios is a collective of professional photographers specializing in corporate headshots, product photography, and event coverage for businesses in Dubai. We understand the importance of brand image and deliver clean, high-resolution photographs that meet corporate standards. Our studio is fully equipped, and we are also available for on-location shoots.',
    location: 'Dubai, UAE',
    pricingRange: [2000, 7000],
    portfolio: ['https://picsum.photos/seed/pixel1/1024/768', 'https://picsum.photos/seed/pixel2/1024/768'],
    rating: 4.9,
    profileImage: 'https://picsum.photos/seed/pixelperfect/500/500',
    reviews: [{ id: 'r26', author: 'Global Corp', avatar: 'https://picsum.photos/seed/globalcorp/100/100', rating: 5, comment: 'Very professional and efficient. The photos for our annual conference were excellent.', date: '2023-10-12' }]
  },
  {
    id: 'v19',
    name: 'Golden Hour Films',
    category: 'Photographers',
    bio: 'Natural light specialists for weddings and engagements. We create soft, romantic, and light-filled imagery.',
    longDescription: 'We are lovers of natural light and authentic moments. Golden Hour Films focuses on telling love stories through a lens of warmth and romance. We work closely with couples to make them feel comfortable, capturing the candid smiles, tears, and laughter that make their day special. Our style is bright, airy, and timeless.',
    location: 'Dubai, UAE',
    pricingRange: [3500, 9000],
    portfolio: ['https://picsum.photos/seed/golden1/1024/768', 'https://picsum.photos/seed/golden2/1024/768', 'https://picsum.photos/seed/golden3/1024/768'],
    rating: 4.8,
    profileImage: 'https://picsum.photos/seed/goldenhour/500/500',
    reviews: [{ id: 'r27', author: 'Sara & Ali', avatar: 'https://picsum.photos/seed/saraali/100/100', rating: 5, comment: 'The engagement photos are absolutely magical! They captured the golden hour light so perfectly.', date: '2023-11-08' }]
  },
  {
    id: 'v20',
    name: 'Arabic Rhythms',
    category: 'DJs',
    bio: 'Specializing in Khaleeji, Arabic pop, and fusion music for weddings and traditional events.',
    longDescription: 'DJ Khalid of Arabic Rhythms is an expert in creating the perfect atmosphere for traditional and modern Arabic events. With an extensive library of Khaleeji classics, modern pop hits from across the Arab world, and seamless fusion mixes, he keeps guests of all ages on the dance floor. Perfect for weddings, henna parties, and national day celebrations.',
    location: 'Dubai, UAE',
    pricingRange: [1800, 5000],
    portfolio: ['https://picsum.photos/seed/arabicdj1/1024/768', 'https://picsum.photos/seed/arabicdj2/1024/768'],
    rating: 4.9,
    profileImage: 'https://picsum.photos/seed/arabicrhythms/500/500',
    reviews: [{ id: 'r28', author: 'Mohammed A.', avatar: 'https://picsum.photos/seed/mohammeda/100/100', rating: 5, comment: 'The best DJ for a traditional wedding. He knew all the right songs to play. Everyone was dancing!', date: '2023-10-29' }]
  },
  {
    id: 'v21',
    name: 'Retro Vibe DJ',
    category: 'DJs',
    bio: 'Your go-to DJ for 80s, 90s, and 00s themed parties. Get ready for a blast from the past!',
    longDescription: 'Throwing a retro-themed party? Retro Vibe DJ has you covered. Specializing in the biggest hits from the 80s, 90s, and early 2000s, he brings the nostalgia and energy to make your event a memorable one. From disco and new wave to classic hip hop and pop-punk, get ready to dance to the soundtrack of your youth.',
    location: 'Dubai, UAE',
    pricingRange: [1000, 3000],
    portfolio: ['https://picsum.photos/seed/retrodj1/1024/768'],
    rating: 4.7,
    profileImage: 'https://picsum.photos/seed/retrovibe/500/500',
    reviews: [{ id: 'r29', author: 'Jennifer M.', avatar: 'https://picsum.photos/seed/jenniferm/100/100', rating: 5, comment: 'Hired for my 40th birthday (90s theme) and it was perfect! The music was spot on all night.', date: '2023-09-23' }]
  },
  {
    id: 'v22',
    name: 'Gourmet Global',
    category: 'Caterers',
    bio: 'Exquisite international cuisine for luxury events. We create bespoke menus with a focus on quality and presentation.',
    longDescription: 'Gourmet Global provides a high-end catering experience for discerning clients. Our international chefs specialize in a variety of cuisines, including French, Italian, Japanese, and modern fusion. We use only the finest ingredients and are known for our artistic food presentation. From elegant canapés to multi-course tasting menus, we elevate your event dining.',
    location: 'Dubai, UAE',
    pricingRange: [500, 2000],
    portfolio: ['https://picsum.photos/seed/gourmet1/1024/768', 'https://picsum.photos/seed/gourmet2/1024/768', 'https://picsum.photos/seed/gourmet3/1024/768'],
    rating: 4.9,
    profileImage: 'https://picsum.photos/seed/gourmetglobal/500/500',
    reviews: [{ id: 'r30', author: 'Eleonore D.', avatar: 'https://picsum.photos/seed/eleonore/100/100', rating: 5, comment: 'The food was a work of art and tasted even better. Truly Michelin-star quality catering.', date: '2023-11-16' }]
  },
  {
    id: 'v23',
    name: 'Sweet Delights Bakery',
    category: 'Caterers',
    bio: 'Custom cakes, cupcakes, and dessert tables for any celebration. We make your sweet dreams come true.',
    longDescription: 'Specializing in all things sweet, Sweet Delights Bakery is your destination for show-stopping wedding cakes, fun birthday creations, and elegant dessert tables. We work with you to design a custom cake that matches your theme and flavor preferences. All our creations are baked from scratch with love and the finest ingredients.',
    location: 'Dubai, UAE',
    pricingRange: [300, 2500],
    portfolio: ['https://picsum.photos/seed/sweet1/1024/768', 'https://picsum.photos/seed/sweet2/1024/768'],
    rating: 4.8,
    profileImage: 'https://picsum.photos/seed/sweetdelights/500/500',
    reviews: [{ id: 'r31', author: 'Karen W.', avatar: 'https://picsum.photos/seed/karenw/100/100', rating: 5, comment: 'The most beautiful and delicious birthday cake for my daughter. It was exactly what we wanted!', date: '2023-10-20' }]
  },
  {
    id: 'v24',
    name: 'The Marina View Hall',
    category: 'Venues',
    bio: 'A modern, elegant event hall with spectacular floor-to-ceiling views of the Dubai Marina skyline.',
    longDescription: 'Host your next event against the stunning backdrop of Dubai Marina. The Marina View Hall offers a sophisticated and contemporary space with panoramic windows, state-of-the-art AV equipment, and flexible seating arrangements. It is ideal for corporate functions, gala dinners, and elegant weddings for up to 200 guests. In-house catering and planning services are available.',
    location: 'Dubai Marina, Dubai',
    pricingRange: [10000, 40000],
    portfolio: ['https://picsum.photos/seed/marinaview1/1024/768', 'https://picsum.photos/seed/marinaview2/1024/768'],
    rating: 4.8,
    profileImage: 'https://picsum.photos/seed/marinaview/500/500',
    reviews: [{ id: 'r32', author: 'Innovate Inc.', avatar: 'https://picsum.photos/seed/innovate/100/100', rating: 5, comment: 'We hosted our annual awards night here. The view is incredible and the service was top-notch.', date: '2023-09-28' }]
  },
  {
    id: 'v25',
    name: 'The Secret Garden',
    category: 'Venues',
    bio: 'An intimate and enchanting outdoor garden venue, perfect for romantic weddings and private gatherings.',
    longDescription: 'Tucked away from the city\'s hustle, The Secret Garden is a lush, green oasis perfect for intimate celebrations. With beautiful landscaping, fairy lights, and a charming gazebo, it provides a magical setting for weddings, bridal showers, and special birthdays. The venue can accommodate up to 80 guests and allows for external caterers.',
    location: 'Jumeirah, Dubai',
    pricingRange: [8000, 20000],
    portfolio: ['https://picsum.photos/seed/garden1/1024/768', 'https://picsum.photos/seed/garden2/1024/768'],
    rating: 4.9,
    profileImage: 'https://picsum.photos/seed/secretgarden/500/500',
    reviews: [{ id: 'r33', author: 'Jasmin A.', avatar: 'https://picsum.photos/seed/jasmin/100/100', rating: 5, comment: 'The most romantic place for a small wedding. It felt like a fairytale.', date: '2023-11-03' }]
  },
  {
    id: 'v26',
    name: 'Corporate Visionaries',
    category: 'Videographers',
    bio: 'Professional video production for businesses. We create compelling brand stories, event coverage, and promotional videos.',
    longDescription: 'In the corporate world, video is king. Corporate Visionaries helps businesses communicate their message effectively through high-quality video production. We cover everything from conference highlights and interviews to slick promotional videos for your website and social media. Our team handles the entire process, from storyboarding to post-production.',
    location: 'Dubai, UAE',
    pricingRange: [3000, 15000],
    portfolio: ['https://picsum.photos/seed/corpvid1/1024/768', 'https://picsum.photos/seed/corpvid2/1024/768'],
    rating: 4.9,
    profileImage: 'https://picsum.photos/seed/corpvision/500/500',
    reviews: [{ id: 'r34', author: 'Tech Solutions Ltd.', avatar: 'https://picsum.photos/seed/techltd/100/100', rating: 5, comment: 'The video they produced for our product launch was fantastic. High quality and delivered on time.', date: '2023-10-14' }]
  },
  {
    id: 'v27',
    name: 'Event Horizon Cinema',
    category: 'Videographers',
    bio: 'Dynamic, fast-paced event videography for parties, concerts, and festivals. We capture the energy and excitement.',
    longDescription: 'Event Horizon Cinema specializes in creating high-energy highlight reels that capture the soul of your event. Using multiple cameras, drones, and creative editing techniques, we produce videos that are as exciting as the event itself. Perfect for sharing on social media and for promotional purposes.',
    location: 'Dubai, UAE',
    pricingRange: [2500, 10000],
    portfolio: ['https://picsum.photos/seed/eventh1/1024/768'],
    rating: 4.8,
    profileImage: 'https://picsum.photos/seed/eventhorizon/500/500',
    reviews: [{ id: 'r35', author: 'Music Fest DXB', avatar: 'https://picsum.photos/seed/musicfest/100/100', rating: 5, comment: 'Incredible after-movie for our festival! They really captured the vibe.', date: '2023-11-26' }]
  },
  {
    id: 'v28',
    name: 'The Big Day Planners',
    category: 'Planners',
    bio: 'Full-service wedding planning for grand celebrations. We manage every detail for a luxurious and stress-free wedding.',
    longDescription: 'For the wedding of your dreams, trust The Big Day Planners. We specialize in planning large-scale, luxury weddings in Dubai. Our services cover everything from venue selection and vendor management to design, decor, and day-of coordination. We have an extensive network of the best suppliers in the city to bring your grand vision to life.',
    location: 'Dubai, UAE',
    pricingRange: [15000, 50000],
    portfolio: ['https://picsum.photos/seed/bigday1/1024/768', 'https://picsum.photos/seed/bigday2/1024/768'],
    rating: 5.0,
    profileImage: 'https://picsum.photos/seed/bigday/500/500',
    reviews: [{ id: 'r36', author: 'Sheikha M.', avatar: 'https://picsum.photos/seed/sheikham/100/100', rating: 5, comment: 'Our wedding was an absolute fairytale, and we owe it all to them. Every detail was perfection.', date: '2023-10-27' }]
  },
  {
    id: 'v29',
    name: 'Launchpad Corporate Events',
    category: 'Planners',
    bio: 'Expert planners for corporate events, conferences, and product launches. We ensure a professional and impactful event.',
    longDescription: 'Launchpad specializes in creating and executing seamless corporate events. We understand the importance of brand messaging and ROI. Our team manages logistics, AV production, speaker coordination, and delegate management to ensure your conference, product launch, or company retreat is a resounding success and achieves its business objectives.',
    location: 'Dubai, UAE',
    pricingRange: [10000, 45000],
    portfolio: ['https://picsum.photos/seed/launch1/1024/768'],
    rating: 4.9,
    profileImage: 'https://picsum.photos/seed/launchpad/500/500',
    reviews: [{ id: 'r37', author: 'Future Tech Conf.', avatar: 'https://picsum.photos/seed/futuretech/100/100', rating: 5, comment: 'Impeccable organization for our 3-day conference. The team was professional and proactive.', date: '2023-09-19' }]
  }
];

// Changed to 'let' to allow adding new users on signup
export let USERS: User[] = [
    {
        id: 'u1',
        name: 'Fatima H.',
        email: 'fatima@example.com',
        password: 'password123',
        role: 'organizer',
        profilePhoto: 'https://picsum.photos/seed/fatima/100/100',
    },
    {
        id: 'u2',
        name: 'Aisha Al Marzooqi',
        email: 'aisha@dubailens.com',
        password: 'password123',
        role: 'vendor',
        profilePhoto: 'https://picsum.photos/seed/dubailens/500/500',
        vendorProfileId: 'v1'
    },
    {
        id: 'u3',
        name: 'DJ Beats',
        email: 'dj@beats.com',
        password: 'password123',
        role: 'vendor',
        profilePhoto: 'https://picsum.photos/seed/djbeats/500/500',
        vendorProfileId: 'v2'
    }
];

const MOCK_RESPONSES: QuoteResponse[] = [
    {
        id: 'resp1',
        vendorId: 'v2',
        priceProposal: 1800,
        message: "Hi Fatima, thanks for reaching out! I'm available on your requested date. My 'Gold Party' package for 4 hours would be perfect for your birthday and costs 1800 AED. This includes my full sound system and basic lighting. Let me know if you'd like to book!",
        timestamp: '2023-12-05T10:30:00Z'
    }
];

const MOCK_MESSAGES: Message[] = [
    {
        id: 'm1',
        senderId: 'u3', // DJ Beats
        text: "Hi Fatima, I've sent over the quote. The price includes a full 4-hour set, my professional sound system, and some basic party lights. Let me know if you have any questions!",
        timestamp: '2023-12-05T10:31:00Z'
    },
    {
        id: 'm2',
        senderId: 'u1', // Fatima
        text: "Thanks! That sounds great. Can we request specific songs or genres?",
        timestamp: '2023-12-05T11:05:00Z'
    }
];


export const QUOTE_REQUESTS: QuoteRequest[] = [
    {
        id: 'qr1',
        organizerId: 'u1',
        vendorId: 'v2',
        eventType: 'Birthday Party',
        date: '2023-12-25',
        budget: 2000,
        details: 'Looking for a DJ for my 30th birthday party. About 50 guests. We love 90s hip hop and modern pop music. The event will be from 8 PM to 12 AM.',
        status: 'responded',
        responses: MOCK_RESPONSES,
        messages: MOCK_MESSAGES
    },
    {
        id: 'qr2',
        organizerId: 'u1',
        vendorId: 'v3',
        eventType: 'Corporate Dinner',
        date: '2024-01-15',
        budget: 10000,
        details: 'Need catering for a corporate dinner for 80 guests. Looking for a buffet-style service with a mix of traditional and modern dishes. Any vegetarian options would be a plus.',
        status: 'pending',
        responses: [],
        messages: []
    }
];