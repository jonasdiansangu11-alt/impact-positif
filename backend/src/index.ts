import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Enable public read permissions for all our API content types
    const publicRole = await strapi
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "public" } });

    if (!publicRole) return;

    const apiContentTypes = [
      "api::global.global",
      "api::hero.hero",
      "api::about.about",
      "api::service.service",
      "api::location.location",
      "api::message.message",
      "api::testimonial.testimonial",
      "api::realization.realization",
      "api::ad.ad",
      "api::mediatheque.mediatheque",
      "api::featured-project.featured-project",
    ];

    for (const uid of apiContentTypes) {
      // Determine actions based on content type kind
      const contentType = (strapi as any).contentTypes[uid];
      if (!contentType) continue;

      const actions = ["find"];
      if (contentType.kind === "collectionType") {
        actions.push("findOne");
      }
      // Allow 'create' on message so the contact form can post
      if (uid === "api::message.message") {
        actions.push("create");
      }

      for (const action of actions) {
        const existingPermission = await strapi
          .query("plugin::users-permissions.permission")
          .findOne({
            where: {
              role: publicRole.id,
              action: `${uid}.${action}`,
            },
          });

        if (!existingPermission) {
          await strapi
            .query("plugin::users-permissions.permission")
            .create({
              data: {
                action: `${uid}.${action}`,
                role: publicRole.id,
                enabled: true,
              },
            });
        }
      }
    }

    console.log("[bootstrap] Public API permissions configured.");

    // Seeding Initial Data if empty
    try {
      const heroCount = await strapi.documents("api::hero.hero").count({});
      if (heroCount === 0) {
        await strapi.documents("api::hero.hero").create({
          data: {
            titlePrefix: "Nous sommes",
            titleHighlight1: "IMPACT",
            titleHighlight2: "POSITIF"
          }
        });
        console.log("[bootstrap] Hero seeded.");
      }

      const aboutCount = await strapi.documents("api::about.about").count({});
      if (aboutCount === 0) {
        await strapi.documents("api::about.about").create({
          data: {
            whoAreWeTitle: "Notre Agence",
            whoAreWeContent: "Notre agence marketing spécialisée dans le secteur de la communication et stratégie Marketing, est implantée au Kongo-Central dans la ville de Matadi depuis 2015, ce qui nous a permis d’acquérir une expertise énorme sur les différents marchés et le comportement des consommateurs de cette province.",
            ourRoleTitle: "Notre Rôle",
            ourRoleContent: "Nous accompagnons nos clients..."
          }
        });
        console.log("[bootstrap] About seeded.");
      }

      const locationCount = await strapi.documents("api::location.location").count({});
      if (locationCount === 0) {
        await strapi.documents("api::location.location").create({
          data: {
            city: "Matadi"
          }
        });
        console.log("[bootstrap] Location seeded.");
      }

      const globalCount = await strapi.documents("api::global.global").count({});
      if (globalCount === 0) {
        await strapi.documents("api::global.global").create({
          data: {
            siteName: "IMPACT POSITIF",
            contactEmail: "contact@impactpositif.com",
            logoUrl: "/images/logo.png"
          }
        });
        console.log("[bootstrap] Global seeded.");
      }

      const serviceCount = await strapi.documents("api::service.service").count({});
      if (serviceCount === 0) {
        const services = [
          { title: "Activation clients", description: "Campagnes terrain, animations points de vente et expériences immersives pour engager directement votre audience.", icon: "ri-user-star-fill" },
          { title: "Event Management", description: "Conception, organisation et pilotage d'événements professionnels, lancements de produits et soirées d'entreprise mémorables.", icon: "ri-calendar-check-fill" },
          { title: "Production Support", description: "Logistique événementielle, régie technique, location de matériel et coordination opérationnelle sur site.", icon: "ri-settings-3-fill" },
          { title: "Media & Public Relations", description: "Relations presse, achat d'espace, partenariats médias et stratégies d'influence pour amplifier votre voix.", icon: "ri-megaphone-fill" },
          { title: "Digital Marketing", description: "Stratégies social media, campagnes publicitaires ciblées, création de contenu et analyse de performance.", icon: "ri-macbook-fill" },
          { title: "Graphic Design", description: "Identité visuelle, création de supports imprimés et digitaux, et conception de chartes graphiques percutantes.", icon: "ri-quill-pen-fill" }
        ];
        
        for (const svc of services) {
          await strapi.documents("api::service.service").create({
            data: svc
          });
        }
        console.log("[bootstrap] Services seeded.");
      }

      const testimonialCount = await strapi.documents("api::testimonial.testimonial").count({});
      if (testimonialCount === 0) {
        const testimonials = [
          { name: "Jean Dupont", role: "CEO", company: "Tech SARL", text: "Une équipe formidable qui a su transformer notre vision en réalité.", rating: 5 },
          { name: "Marie Curie", role: "Directrice Marketing", company: "Innov SA", text: "Leurs campagnes ont eu un impact direct sur nos ventes. Très satisfaite.", rating: 5 },
          { name: "Alain Prost", role: "Fondateur", company: "Vitesse Inc", text: "Professionnalisme et créativité au rendez-vous. Je recommande vivement.", rating: 4 }
        ];
        for (const t of testimonials) {
          await strapi.documents("api::testimonial.testimonial").create({ data: t });
        }
        console.log("[bootstrap] Testimonials seeded.");
      }

      const realizationCount = await strapi.documents("api::realization.realization").count({});
      if (realizationCount === 0) {
        const realizations = [
          { title: "Lancement de produit X", category: "Event Management", summary: "Organisation du lancement du nouveau produit avec plus de 500 invités.", location: "Kinshasa" },
          { title: "Campagne d'affichage Y", category: "Media", summary: "Affichage publicitaire dans les grandes artères de la ville.", location: "Matadi" },
          { title: "Rebranding Z", category: "Graphic Design", summary: "Refonte complète de l'identité visuelle de l'entreprise Z.", location: "Boma" },
          { title: "Activation Point de Vente", category: "Activation clients", summary: "Animation commerciale dans 50 points de vente.", location: "Kongo-Central" }
        ];
        for (const r of realizations) {
          await strapi.documents("api::realization.realization").create({ data: r });
        }
        console.log("[bootstrap] Realizations seeded.");
      }

      const adCount = await strapi.documents("api::ad.ad").count({});
      if (adCount === 0) {
        await strapi.documents("api::ad.ad").create({
          data: {
            title: "Offre spéciale de lancement",
            link: "https://impactpositif.com/promo",
            type: "banner",
            position: "home-middle"
          }
        });
        console.log("[bootstrap] Ad seeded.");
      }

      const mediathequeCount = await strapi.documents("api::mediatheque.mediatheque").count({});
      if (mediathequeCount === 0) {
        const medias = [
          { title: "Séminaire de rentrée", category: "Événements", mediaType: "photo" as const },
          { title: "Backstage Soirée VIP", category: "Backstage", mediaType: "photo" as const },
          { title: "Campagne RDC 2025", category: "Campagnes", mediaType: "video" as const },
          { title: "Atelier Stratégie Digitale", category: "Ateliers", mediaType: "photo" as const }
        ];
        for (const m of medias) {
          await strapi.documents("api::mediatheque.mediatheque").create({ data: m });
        }
        console.log("[bootstrap] Mediatheque seeded.");
      }

      const featuredCount = await strapi.documents("api::featured-project.featured-project").count({});
      if (featuredCount === 0) {
        await strapi.documents("api::featured-project.featured-project").create({
          data: {
            title: "Forum Économique de Kinshasa 2025",
            description: "Le plus grand sommet d'affaires d'Afrique Centrale rassemblant les décideurs clés pour façonner l'avenir économique de la région.",
            client: "Gouvernement RDC"
          }
        });
        console.log("[bootstrap] Featured Project seeded.");
      }
    } catch (e) {
      console.error("[bootstrap] Error during seeding:", e);
    }
  },
};
