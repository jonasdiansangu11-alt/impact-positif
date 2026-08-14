import axios from "axios";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
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
  whoAreWeContent: "Créée en 2015, IMPACT POSITIF est plus qu'une agence ; c'est un partenaire stratégique. Basés en République Démocratique du Congo, nous fusionnons créativité, technologie et stratégie pour délivrer des campagnes qui marquent les esprits et transforment les marchés.",
  ourApproachContent: "L'excellence n'est pas une option, c'est notre standard. Nous abordons chaque projet avec une minutie chirurgicale, en alignant notre créativité débordante sur vos objectifs d'affaires les plus ambitieux."
};

const MOCK_SERVICES = [
  { documentId: "1", title: "Activation Client", description: "Des actions ciblées pour engager directement votre audience et créer une connexion authentique avec votre marque.", image: "/images/activation-clients.png", capabilities: "Communication one to one,Animation / Road Show,Productions médias" },
  { documentId: "2", title: "Activation Commerce", description: "Des stratégies marketing pointues pour dynamiser vos ventes et optimiser votre présence sur le point de vente.", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1600", capabilities: "Animation Point de Vente,Retail audit,Conception publicitaire" },
  { documentId: "3", title: "Événementiel", description: "Création et gestion globale de vos événements, pour offrir des expériences mémorables et impactantes.", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600", capabilities: "Conception,Événement privé,Événement d'entreprise" }
];

const MOCK_LOCATION = {
  city: "Kinshasa",
  address: "Gombe, Kinshasa - RDC",
  country: "RDC"
};

const MOCK_GLOBAL = {
  siteName: "IMPACT POSITIF",
  contactEmail: "hello@impactpositif.com"
};

const MOCK_TESTIMONIALS = [
  { id: 1, name: "Sophie Kalala", role: "Directrice Marketing", company: "Rawbank", text: "L'équipe d'Impact Positif a complètement redéfini notre sommet financier. Leur professionnalisme et leur vision créative sont hors du commun.", rating: 5, avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&w=150&q=80" },
  { id: 2, name: "Marc Ndiaye", role: "CEO", company: "TechAfrica", text: "Un partenaire exceptionnel pour nos activations terrain. Le retour sur investissement a dépassé toutes nos espérances.", rating: 5, avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=150&q=80" },
  { id: 3, name: "Amina Loko", role: "Fondatrice", company: "Créa Mode RDC", text: "Leur gestion événementielle est impeccable. Chaque détail était pensé, de la scénographie à la gestion des invités.", rating: 5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" }
];

const MOCK_REALIZATIONS = [
  { documentId: "forum-eco", title: "Forum Économique de Kinshasa 2025", category: "Sommet d'Affaires", summary: "Production intégrale, scénographie immersive 360° et expériences VIP.", location: "Centre Financier, Kinshasa", image: "/images/IMG_3294.jpg" },
  { documentId: "finance", title: "Sommet de la Finance Africaine", category: "Conférence Financière", summary: "Pavillon interactif de 800 m² avec démonstrations en direct.", location: "Pullman Hotel, Kinshasa", image: "/images/IMG_3247.jpg" },
  { documentId: "tech-expo", title: "RDC Tech Innovation Expo", category: "Activation de Marque", summary: "Tournée technologique majeure à travers 5 villes.", location: "Tournée Nationale, RDC", image: "/images/IMG_3225.jpg" },
  { documentId: "gala", title: "Gala National de l'Excellence", category: "Soirée de Prestige", summary: "Direction artistique raffinée et retransmission en direct.", location: "Fleuve Congo Hotel, Kinshasa", image: "/images/IMG_3079.jpg" }
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

