import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { getStrapiMediaUrl } from '../lib/api';

// ─── Data : détail de chaque projet ───────────────────────────────────────────
export const projectsData: Record<string, ProjectDetail> = {
  'forum-eco-2025': {
    id: 'forum-eco-2025',
    title: 'Forum Économique de Kinshasa 2025',
    category: "Sommet d'Affaires",
    date: 'Mars 2025',
    location: 'Centre Financier de Kinshasa, RDC',
    client: 'Gouvernement Provincial de Kinshasa',
    coverImage: '/images/IMG_3294.jpg',
    tagline: 'Un sommet, une vision, une nation en mouvement.',
    description: `Le Forum Économique de Kinshasa 2025 a rassemblé plus de 2 000 décideurs, entrepreneurs et investisseurs venus de toute l'Afrique centrale pour débattre des défis et opportunités économiques de la République Démocratique du Congo.\n\nIMPACT POSITIF a été mandaté pour concevoir et produire l'intégralité de cet événement majeur : de l'architecture scénique à la logistique complète, en passant par la direction artistique et la retransmission en direct.\n\nLa scénographie immersive avec un keynote stage LED 360° a permis de créer une ambiance spectaculaire, renforçant l'image d'un Congo résolument tourné vers l'avenir. Les espaces de networking interactifs ont facilité des centaines de rencontres d'affaires à fort potentiel.`,
    highlights: [
      { label: 'Participants', value: '2 000+' },
      { label: 'Intervenants', value: '48' },
      { label: 'Partenaires', value: '30+' },
      { label: 'Pays représentés', value: '12' },
    ],
    photos: [
      '/images/IMG_3294.jpg',
      '/images/IMG_3247.jpg',
      '/images/IMG_3225.jpg',
      '/images/IMG_3079.jpg',
    ],
    videoUrl: '',
    tags: ["Sommet d'Affaires", 'Scénographie LED', 'Networking', 'Kinshasa'],
  },
  'finance-africaine': {
    id: 'finance-africaine',
    title: 'Sommet de la Finance Africaine',
    category: 'Conférence Financière',
    date: 'Juin 2025',
    location: 'Hôtel Pullman, Kinshasa, RDC',
    client: 'Rawbank',
    coverImage: '/images/IMG_3247.jpg',
    tagline: 'Là où la finance africaine trace son avenir.',
    description: `L'activation Rawbank au Sommet de la Finance Africaine s'est imposée comme l'une des plus remarquées de l'événement. IMPACT POSITIF a conçu et réalisé un pavillon interactif de 800 m² qui a attiré des milliers de visiteurs et renforcé significativement la notoriété de la marque.\n\nL'espace VIP d'exception a permis à Rawbank de recevoir ses clients et partenaires stratégiques dans un cadre digne des plus grands événements financiers mondiaux. Les démonstrations en direct de services bancaires innovants ont suscité un vif intérêt et de nombreuses demandes d'ouverture de comptes sur place.`,
    highlights: [
      { label: 'Surface du pavillon', value: '800 m²' },
      { label: 'Visiteurs accueillis', value: '5 000+' },
      { label: 'Réunions VIP', value: '150+' },
      { label: 'Leads générés', value: '800+' },
    ],
    photos: [
      '/images/IMG_3247.jpg',
      '/images/IMG_3294.jpg',
      '/images/DSCF8096.jpg',
      '/images/IMG_3079.jpg',
    ],
    videoUrl: '',
    tags: ['Finance', 'Activation de Marque', 'Pavillon Interactif', 'Rawbank'],
  },
  'rdc-tech-expo': {
    id: 'rdc-tech-expo',
    title: 'RDC Tech Innovation Expo',
    category: 'Activation de Marque',
    date: 'Septembre 2024',
    location: '5 villes de la RDC',
    client: 'Ministère du Numérique — RDC',
    coverImage: '/images/IMG_3225.jpg',
    tagline: 'Cinq villes. Une même révolution numérique.',
    description: `La RDC Tech Innovation Expo a été une tournée technologique d'envergure nationale, passant par Kinshasa, Lubumbashi, Goma, Matadi et Kisangani. IMPACT POSITIF a conçu une scénographie modulaire capable d'être montée et démontée en moins de 24 heures.\n\nLes dômes interactifs, pièces maîtresses du dispositif, plongeaient les visiteurs dans des univers numériques immersifs. Des démonstrations de startups congolaises côtoyaient des présentations de technologies mondiales, incarnant la vision d'une RDC numérique et connectée.`,
    highlights: [
      { label: 'Villes parcourues', value: '5' },
      { label: 'Visiteurs totaux', value: '15 000+' },
      { label: 'Startups présentées', value: '60' },
      { label: 'Jours d\'événement', value: '15' },
    ],
    photos: [
      '/images/IMG_3225.jpg',
      '/images/IMG_3294.jpg',
      '/images/IMG_20251118_093325_969.jpg',
      '/images/472537940_9486448048055010_7383733551397155173_n.jpg',
    ],
    videoUrl: '',
    tags: ['Technologie', 'Tournée Nationale', 'Innovation', 'Numérique'],
  },
  'gala-excellence': {
    id: 'gala-excellence',
    title: 'Gala National de l\'Excellence',
    category: 'Soirée de Prestige',
    date: 'Décembre 2024',
    location: 'Grand Hôtel de Kinshasa, RDC',
    client: 'Fondation Excellence Congo',
    coverImage: '/images/IMG_3079.jpg',
    tagline: 'Une nuit pour célébrer l\'excellence congolaise.',
    description: `Le Gala National de l'Excellence est l'événement de prestige par excellence en RDC. IMPACT POSITIF a orchestré une soirée inoubliable célébrant les femmes et hommes d'exception qui font rayonner le Congo.\n\nDe la décoration somptueuse aux animations artistiques, en passant par la régie complète de la retransmission télévisée en direct sur 3 chaînes nationales, chaque détail a été pensé pour refléter l'excellence à la congolaise. Plus de 800 personnalités du monde des affaires, de la politique et de la culture étaient réunies.`,
    highlights: [
      { label: 'Personnalités présentes', value: '800+' },
      { label: 'Prix décernés', value: '25' },
      { label: 'Chaînes diffusantes', value: '3' },
      { label: 'Spectateurs TV', value: '500 000+' },
    ],
    photos: [
      '/images/IMG_3079.jpg',
      '/images/IMG_3294.jpg',
      '/images/IMG_3247.jpg',
      '/images/DSCF8096.jpg',
    ],
    videoUrl: '',
    tags: ['Gala', 'Prestige', 'Télévision', 'Excellence'],
  },
  'investisseurs-miniers': {
    id: 'investisseurs-miniers',
    title: 'Symposium des Investisseurs Miniers',
    category: 'Sommet Stratégique',
    date: 'Octobre 2024',
    location: 'Kolwezi, Province du Lualaba, RDC',
    client: 'Fédération des Entreprises du Congo',
    coverImage: '/images/DSCF8096.jpg',
    tagline: 'Le rendez-vous mondial des décideurs du secteur minier en Afrique.',
    description: `Le Symposium des Investisseurs Miniers de Kolwezi a réuni des délégations internationales venues d'Europe, d'Asie et d'Amérique pour explorer les opportunités d'investissement dans le secteur minier de la RDC.\n\nIMPACT POSITIF a relevé le défi logistique colossal d'organiser un événement de cette envergure dans le Lualaba. La direction artistique d'une élégance rare, le protocole de sécurité de niveau présidentiel et les pavillons d'exposition haut de gamme ont fait l'unanimité auprès des délégués internationaux.`,
    highlights: [
      { label: 'Délégations internationales', value: '35' },
      { label: 'Pays représentés', value: '22' },
      { label: 'Contrats signés', value: 'Milliards USD' },
      { label: 'Superficie événement', value: '3 000 m²' },
    ],
    photos: [
      '/images/DSCF8096.jpg',
      '/images/IMG_3294.jpg',
      '/images/IMG_3247.jpg',
      '/images/IMG_3225.jpg',
    ],
    videoUrl: '/videos/MTS_SANS_MARK.mp4',
    tags: ['Mines', 'Investissement', 'Kolwezi', 'International'],
  },
  'telecom-summit': {
    id: 'telecom-summit',
    title: 'Telecom Transformation Summit',
    category: 'Salon Professionnel',
    date: 'Novembre 2025',
    location: 'Palais du Peuple, Kinshasa, RDC',
    client: 'Association des Opérateurs Télécom RDC',
    coverImage: '/images/IMG_20251118_093325_969.jpg',
    tagline: 'Connecter l\'Afrique centrale, un réseau à la fois.',
    description: `Le Telecom Transformation Summit a réuni les acteurs majeurs des télécommunications d'Afrique centrale pour débattre des enjeux de la 5G, de la fibre optique et de l'inclusion numérique.\n\nLes stands interactifs immersifs conçus par IMPACT POSITIF ont permis aux opérateurs de présenter leurs innovations de manière spectaculaire. Les pitchs de start-ups télécoms ont généré des levées de fonds significatives, tandis que les panels stratégiques ont posé les bases d'une coopération renforcée dans le secteur.`,
    highlights: [
      { label: 'Exposants', value: '85' },
      { label: 'Start-ups pitchées', value: '20' },
      { label: 'Visiteurs professionnels', value: '3 500+' },
      { label: 'Panels & conférences', value: '18' },
    ],
    photos: [
      '/images/IMG_20251118_093325_969.jpg',
      '/images/472537940_9486448048055010_7383733551397155173_n.jpg',
      '/images/IMG_3294.jpg',
      '/images/IMG_3225.jpg',
    ],
    videoUrl: '',
    tags: ['Télécommunications', '5G', 'Start-ups', 'Innovation'],
  },
  'forum-numerique': {
    id: 'forum-numerique',
    title: 'Forum National du Numérique',
    category: 'Conférence Technologique',
    date: 'Septembre 2025',
    location: 'Kinshasa, RDC',
    client: 'Ministère des PTNTIC — RDC',
    coverImage: '/images/472537940_9486448048055010_7383733551397155173_n.jpg',
    tagline: 'La souveraineté numérique commence ici.',
    description: `Le Forum National du Numérique a été l'événement phare de la stratégie gouvernementale pour la souveraineté numérique de la RDC. IMPACT POSITIF a conçu une expérience hybride inédite, combinant un événement physique d'envergure à Kinshasa et une diffusion digitale accessible depuis tout le pays.\n\nLes keynotes inspirantes de personnalités technologiques africaines et internationales ont tracé la feuille de route numérique du Congo. Les hackathons de génie, compétition entre les meilleures universités du pays, ont démontré le formidable potentiel des jeunes talents congolais.`,
    highlights: [
      { label: 'Participants physiques', value: '1 800+' },
      { label: 'Spectateurs en ligne', value: '50 000+' },
      { label: 'Hackathon teams', value: '40' },
      { label: 'Keynote speakers', value: '22' },
    ],
    photos: [
      '/images/472537940_9486448048055010_7383733551397155173_n.jpg',
      '/images/IMG_20251118_093325_969.jpg',
      '/images/IMG_3294.jpg',
      '/images/484791148_9917717734928037_2835140427910031556_n.jpg',
    ],
    videoUrl: '',
    tags: ['Numérique', 'Souveraineté', 'Hybride', 'Hackathon'],
  },
  'festival-creatif': {
    id: 'festival-creatif',
    title: 'Festival des Industries Créatives',
    category: 'Festival & Exposition',
    date: 'Juillet 2025',
    location: 'Espace Tervuren, Kinshasa, RDC',
    client: 'Alliance des Créatifs Congolais',
    coverImage: '/images/484791148_9917717734928037_2835140427910031556_n.jpg',
    tagline: 'L\'Afrique crée, le monde regarde.',
    description: `Le Festival des Industries Créatives a été une célébration explosive de la culture congolaise et africaine dans toutes ses expressions : mode, musique, design graphique, architecture, motion design et arts numériques.\n\nIMPACT POSITIF a créé un dispositif scénographique qui transformait chaque espace en une galerie d'art vivante. Les masterclasses animées par des personnalités mondiales du design ont attiré des centaines de jeunes créatifs avides d'apprendre. Les galeries d'exposition virtuelles ont permis à des talents basés en dehors de Kinshasa de participer pleinement à l'aventure.`,
    highlights: [
      { label: 'Artistes et créateurs', value: '200+' },
      { label: 'Visiteurs', value: '8 000+' },
      { label: 'Masterclasses', value: '15' },
      { label: 'Pays participants', value: '18' },
    ],
    photos: [
      '/images/484791148_9917717734928037_2835140427910031556_n.jpg',
      '/images/472537940_9486448048055010_7383733551397155173_n.jpg',
      '/images/IMG_3079.jpg',
      '/images/IMG_3225.jpg',
    ],
    videoUrl: '',
    tags: ['Culture', 'Créativité', 'Design', 'Art Africain'],
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProjectDetail {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  client: string;
  coverImage: string;
  tagline: string;
  description: string;
  highlights: { label: string; value: string }[];
  photos: string[];
  videoUrl: string;
  tags: string[];
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? projectsData[slug] : null;

  // Get all project IDs for prev/next navigation
  const allIds = Object.keys(projectsData);
  const currentIndex = slug ? allIds.indexOf(slug) : -1;
  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
  const nextId = currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background-950 flex items-center justify-center text-center px-6">
        <div>
          <p className="text-red-400 text-sm uppercase tracking-widest mb-4">Projet introuvable</p>
          <h1 className="text-white text-3xl font-bold mb-6">Ce projet n'existe pas encore.</h1>
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <i className="ri-arrow-left-line"></i> Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-950 text-white">

      {/* ── BACK BUTTON ── */}
      <div className="fixed top-24 left-6 z-40">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 text-white/70 hover:text-white text-sm px-4 py-2 rounded-full transition-all duration-200 hover:border-white/30"
        >
          <i className="ri-arrow-left-line"></i> Retour
        </button>
      </div>

      {/* ── HERO COVER ── */}
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src={(typeof project.coverImage === 'string' ? project.coverImage : getStrapiMediaUrl(project.coverImage)) || project.coverImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-950 via-background-950/60 to-black/30" />

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold tracking-widest uppercase">
                {project.category}
              </span>
              <span className="text-white/50 text-sm">{project.date}</span>
              <span className="text-white/30">·</span>
              <span className="text-white/50 text-sm">{project.location}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] max-w-4xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-red-300 italic font-light">
              {project.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* LEFT : Description + Vidéo */}
          <div className="lg:col-span-2 space-y-16">

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/10">
                L'histoire
              </h2>
              {project.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-white/70 leading-relaxed text-base mb-5">
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Galerie photos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/10">
                Galerie photos
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {project.photos.map((photo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`group relative overflow-hidden rounded-xl ${i === 0 ? 'col-span-2 aspect-[16/7]' : 'aspect-[4/3]'}`}
                  >
                    <img
                      src={(typeof photo === 'string' ? photo : getStrapiMediaUrl(photo)) || photo}
                      alt={`${project.title} — photo ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Vidéo (placeholder si pas de lien) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/10">
                Bande d'annonce
              </h2>
              {project.videoUrl ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 group">
                  {typeof project.videoUrl === 'string' && project.videoUrl.endsWith('.mp4') ? (
                    <video
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    >
                      <source src={project.videoUrl} type="video/mp4" />
                    </video>
                  ) : typeof project.videoUrl === 'string' && project.videoUrl.startsWith('http') && !project.videoUrl.includes('mp4') ? (
                    <iframe
                      src={project.videoUrl}
                      title={`Vidéo — ${project.title}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    >
                      <source src={getStrapiMediaUrl(project.videoUrl) || project.videoUrl} type="video/mp4" />
                    </video>
                  )}
                </div>
              ) : (
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                    <i className="ri-play-fill text-red-400 text-2xl ml-1"></i>
                  </div>
                  <p className="text-white/40 text-sm">Vidéo disponible prochainement</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* RIGHT : Sidebar */}
          <div className="space-y-8">

            {/* Chiffres clés */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-sm font-bold tracking-widest uppercase text-red-400 mb-5">
                Chiffres clés
              </h3>
              <div className="space-y-5">
                {project.highlights.map((h, i) => (
                  <div key={i} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <p className="text-3xl font-extrabold text-white">{h.value}</p>
                    <p className="text-white/50 text-sm mt-1">{h.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Infos projet */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"
            >
              <h3 className="text-sm font-bold tracking-widest uppercase text-red-400 mb-5">
                Fiche projet
              </h3>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Client</p>
                <p className="text-white font-semibold text-sm">{project.client}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Catégorie</p>
                <p className="text-white font-semibold text-sm">{project.category}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Date</p>
                <p className="text-white font-semibold text-sm">{project.date}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Lieu</p>
                <p className="text-white font-semibold text-sm">{project.location}</p>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-sm font-bold tracking-widest uppercase text-red-400 mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-gradient-to-br from-red-600/20 to-red-900/10 border border-red-500/20 rounded-2xl p-6 text-center"
            >
              <p className="text-white font-bold mb-2">Vous avez un projet similaire ?</p>
              <p className="text-white/50 text-sm mb-5">Discutons de votre vision ensemble.</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 w-full justify-center bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                Nous contacter <i className="ri-arrow-right-line"></i>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── NAV PREV / NEXT ── */}
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-6">
          {prevId ? (
            <Link
              to={`/case-studies/${prevId}`}
              className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors"
            >
              <span className="w-12 h-12 rounded-full border border-white/15 group-hover:border-white/40 flex items-center justify-center transition-colors">
                <i className="ri-arrow-left-line"></i>
              </span>
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Précédent</p>
                <p className="font-semibold text-sm line-clamp-1">{projectsData[prevId]?.title}</p>
              </div>
            </Link>
          ) : <div />}

          {nextId ? (
            <Link
              to={`/case-studies/${nextId}`}
              className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors sm:flex-row-reverse text-right"
            >
              <span className="w-12 h-12 rounded-full border border-white/15 group-hover:border-white/40 flex items-center justify-center transition-colors">
                <i className="ri-arrow-right-line"></i>
              </span>
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Suivant</p>
                <p className="font-semibold text-sm line-clamp-1">{projectsData[nextId]?.title}</p>
              </div>
            </Link>
          ) : <div />}
        </div>
      </div>

    </div>
  );
}
