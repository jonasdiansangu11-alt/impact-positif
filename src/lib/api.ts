import axios from "axios";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "https://impact-positif-api.onrender.com";
const API_URL = `${STRAPI_URL}/api`;

export function getStrapiMediaUrl(media: any): string | null {
  if (!media) return null;
  const url = media?.url || media?.data?.attributes?.url;
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export const checkStrapiConnection = async (): Promise<boolean> => {
  try {
    const res = await axios.get(`${API_URL}/hero`, { timeout: 3000 });
    return res.status === 200;
  } catch {
    return false;
  }
};

const MOCK_HERO = {
  titlePrefix: "VOTRE VISION,", titleHighlight1: "NOTRE", titleHighlight2: "IMPACT", subtitle: "IMPACT POSITIF est une agence créative globale. Nous concevons des expériences de marque inoubliables pour propulser votre entreprise vers de nouveaux sommets.",
  videoUrl: "https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4",
  posterUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000"
};

const MOCK_ABOUT = {
  whoAreWeContent: "Créée en 2015, IMPACT POSITIF est une Agence Conseil en Marketing spécialisée dans la communication, la stratégie marketing et l'accompagnement des entreprises. Nous prenons le temps de comprendre parfaitement la structure de nos clients, leurs atouts et leurs objectifs avant de proposer une solution sur-mesure, alignée sur leurs valeurs et leur image.",
  ourApproachContent: "L'excellence n'est pas une option, c'est notre standard. Nous abordons chaque projet avec une minutie chirurgicale, en alignant notre créativité débordante sur vos objectifs d'affaires les plus ambitieux.",
  ourRoleTitle: "NOTRE RÔLE",
  ourRoleContent: "Grâce à notre équipe jeune et dynamique, nous avons la capacité d'intervenir partout pour répondre à vos problématiques de communication et de vente. Notre particularité réside dans notre engagement à fournir un travail de qualité, soigné, perfectionniste et toujours avec le souci du détail, tout en suivant les avancées technologiques."
};

const MOCK_SERVICES = [
  { documentId: "1", title: "Activation", description: "Des actions ciblées pour engager directement votre audience sur le terrain.", image: "/images/activation-clients.png", capabilities: "Activation client,Communication one-to-one,Animation / Roadshow" },
  { documentId: "2", title: "Commerce", description: "Des stratégies marketing et commerciales pointues pour dynamiser vos ventes.", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1600", capabilities: "Retail audit,Merchandising,Animation de point de vente" },
  { documentId: "3", title: "Communication", description: "Des solutions de communication pour renforcer votre image de marque.", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=1600", capabilities: "Conception publicitaire,Productions médias" },
  { documentId: "4", title: "Événementiel", description: "Création et gestion globale de vos événements d'entreprise et privés.", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600", capabilities: "Conception et gestion d'événements,Événement privé,Événement d'entreprise" }
];

const MOCK_LOCATION = {
  city: "Kinshasa",
  address: "Gombe, Kinshasa - RDC",
  country: "RDC"
};

const MOCK_GLOBAL = {
  siteName: "IMPACT POSITIF",
  contactEmail: "contact@impactpositif.com",
  contactPhone1: "+243 81 889 7000",
  contactPhone2: "+243 85 84 93 102"
};

const MOCK_TESTIMONIALS = [
  { id: 1, name: "Sophie Kalala", role: "Directrice Marketing", company: "Rawbank", text: "L'équipe d'Impact Positif a complètement redéfini notre sommet financier. Leur professionnalisme et leur vision créative sont hors du commun.", rating: 5, avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&w=150&q=80" },
  { id: 2, name: "Marc Ndiaye", role: "CEO", company: "TechAfrica", text: "Un partenaire exceptionnel pour nos activations terrain. Le retour sur investissement a dépassé toutes nos espérances.", rating: 5, avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=150&q=80" },
  { id: 3, name: "Amina Loko", role: "Fondatrice", company: "Créa Mode RDC", text: "Leur gestion événementielle est impeccable. Chaque détail était pensé, de la scénographie à la gestion des invités.", rating: 5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" }
];

const MOCK_REALIZATIONS = [
  { documentId: "canal-luozi", title: "Activité LUOZI", category: "Activation", summary: "Opération de visibilité et d'activation terrain pour la marque.", location: "Luozi", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1600", client: "Canal+" },
  { documentId: "bcc-matadi", title: "Lancement BCC", category: "Événementiel", summary: "Organisation et gestion globale de la cérémonie de lancement officiel.", location: "Matadi", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600", client: "BCC" },
  { documentId: "canal-can-2019", title: "Lancement CAN 2016 & 2019", category: "Événementiel", summary: "Expériences immersives et diffusion des matchs de la Coupe d'Afrique des Nations.", location: "Kongo-Central", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1600", client: "Canal+" },
  { documentId: "coca-cola-copa", title: "Lancement Copa Coca-Cola", category: "Événement Sportif", summary: "Coordination des activités de lancement de la compétition sportive.", location: "Kongo-Central", image: "https://images.unsplash.com/photo-1518605368461-1ee7e55ac96c?auto=format&fit=crop&q=80&w=1600", client: "Coca-Cola" },
  { documentId: "premierbet-jackpot", title: "Méga Millions & Lancement Jackpot", category: "Activation", summary: "Remises de jackpot et déploiement promotionnel à travers la province.", location: "Kongo-Central", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600", client: "PremierBet" },
  { documentId: "airtel-recrutement", title: "Recrutement Agents Terrain", category: "Ressources Humaines", summary: "Campagne de recrutement et formation d'agents pour le déploiement des activités commerciales.", location: "Kongo-Central", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1600", client: "Airtel" },
  { documentId: "expo-entreprise", title: "Salon Expo d'Entreprise", category: "Événementiel", summary: "Création et gestion de stands professionnels pour divers clients.", location: "RDC", image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=1600", client: "Divers" }
];

const MOCK_FEATURED_PROJECT = {
  title: "Forum Économique de Kinshasa 2025",
  description: "Le plus grand sommet d'affaires d'Afrique Centrale rassemblant les décideurs clés pour façonner l'avenir économique de la région.",
  client: "Gouvernement RDC",
  coverImage: "/images/IMG_3294.jpg",
  galleryImages: []
};

const MOCK_ADS = [
  { id: 1, title: "Découvrez notre nouveau service Digital", link: "#services", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80", type: "banner" }
];

const MOCK_MEDIATHEQUE = [
  { id: 1, title: "Séminaire de rentrée", category: "Événements", file: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600" },
  { id: 2, title: "Backstage Soirée VIP", category: "Backstage", file: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=1600" },
  { id: 3, title: "Campagne RDC 2025", category: "Campagnes", file: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=1600" },
  { id: 4, title: "Atelier Stratégie Digitale", category: "Ateliers", file: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1600" },
];

export const fetchHero = async () => {
  try {
    const res = await axios.get(`${API_URL}/hero?populate=*`);
    return res.data?.data || MOCK_HERO;
  } catch (error) {
    return MOCK_HERO;
  }
};

export const fetchAbout = async () => {
  try {
    const res = await axios.get(`${API_URL}/about?populate=*`);
    return res.data?.data || MOCK_ABOUT;
  } catch (error) {
    return MOCK_ABOUT;
  }
};

export const fetchServices = async () => {
  try {
    const res = await axios.get(`${API_URL}/services?populate=*`);
    return res.data?.data?.length ? res.data.data : MOCK_SERVICES;
  } catch (error) {
    return MOCK_SERVICES;
  }
};

export const fetchLocation = async () => {
  try {
    const res = await axios.get(`${API_URL}/location`);
    return res.data?.data || MOCK_LOCATION;
  } catch (error) {
    return MOCK_LOCATION;
  }
};

export const fetchGlobal = async () => {
  try {
    const res = await axios.get(`${API_URL}/global?populate=*`);
    return res.data?.data || MOCK_GLOBAL;
  } catch (error) {
    return MOCK_GLOBAL;
  }
};

export const fetchTestimonials = async () => {
  try {
    const res = await axios.get(`${API_URL}/testimonials?populate=*`);
    return res.data?.data?.length ? res.data.data : MOCK_TESTIMONIALS;
  } catch (error) {
    return MOCK_TESTIMONIALS;
  }
};

export const fetchRealizations = async () => {
  try {
    const res = await axios.get(`${API_URL}/realizations?populate=*`);
    return res.data?.data?.length ? res.data.data : MOCK_REALIZATIONS;
  } catch (error) {
    return MOCK_REALIZATIONS;
  }
};

export const fetchAds = async () => {
  try {
    const res = await axios.get(`${API_URL}/ads?populate=*`);
    return res.data?.data?.length ? res.data.data : MOCK_ADS;
  } catch (error) {
    return MOCK_ADS;
  }
};

export const submitMessage = async (data: any) => {
  try {
    const res = await axios.post(`${API_URL}/messages`, { data });
    return res.data;
  } catch (error) {
    console.error('Error submitting message', error);
    throw error;
  }
};

export const fetchMediatheque = async () => {
  try {
    const res = await axios.get(`${API_URL}/mediatheques?populate=*`);
    return res.data?.data?.length ? res.data.data : MOCK_MEDIATHEQUE;
  } catch (error) {
    return MOCK_MEDIATHEQUE;
  }
};

export const fetchFeaturedProject = async () => {
  try {
    const res = await axios.get(`${API_URL}/featured-project?populate=*`);
    return res.data?.data || MOCK_FEATURED_PROJECT;
  } catch (error) {
    return MOCK_FEATURED_PROJECT;
  }
};

