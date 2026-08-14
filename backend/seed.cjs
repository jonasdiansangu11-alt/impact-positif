const axios = require("axios");

const STRAPI_URL = "http://localhost:1337/api";

async function seed() {
  console.log("Seeding data to Strapi...");

  try {
    // 1. Seed Hero
    await axios.post(`${STRAPI_URL}/hero`, {
      data: {
        title: "Nous sommes IMPACT POSITIF",
        subtitle: "L'Agence Conseil en Communication & Marketing au cœur de Matadi, Kongo-Central.",
        ctaPrimary: "Demander un devis",
        ctaSecondary: "Découvrir notre expertise"
      }
    });
    console.log("Hero seeded.");

    // 2. Seed About
    await axios.post(`${STRAPI_URL}/about`, {
      data: {
        content: "Notre agence marketing spécialisée dans le secteur de la communication et stratégie Marketing, est implantée au Kongo-Central dans la ville de Matadi depuis 2015, ce qui nous a permis d’acquérir une expertise énorme sur les différents marchés et le comportement des consommateurs de cette province.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Default video
        signature: "Jonas DIANSANGU, CEO"
      }
    });
    console.log("About seeded.");

    // 3. Seed Services
    const services = [
      {
        title: "Activation clients",
        description: "Campagnes terrain, animations points de vente et expériences immersives pour engager directement votre audience.",
        icon: "ri-user-star-fill"
      },
      {
        title: "Event Management",
        description: "Conception, organisation et pilotage d'événements professionnels, lancements de produits et soirées d'entreprise mémorables.",
        icon: "ri-calendar-check-fill"
      },
      {
        title: "Production Support",
        description: "Logistique événementielle, régie technique, location de matériel et coordination opérationnelle sur site.",
        icon: "ri-settings-3-fill"
      },
      {
        title: "Media & Public Relations",
        description: "Relations presse, achat d'espace, partenariats médias et stratégies d'influence pour amplifier votre voix.",
        icon: "ri-megaphone-fill"
      },
      {
        title: "Digital Marketing",
        description: "Stratégies social media, campagnes publicitaires ciblées, création de contenu et analyse de performance.",
        icon: "ri-macbook-fill"
      },
      {
        title: "Graphic Design",
        description: "Identité visuelle, création de supports imprimés et digitaux, et conception de chartes graphiques percutantes.",
        icon: "ri-quill-pen-fill"
      }
    ];

    // Delete existing services first (optional, but safe for a seed script if possible, though public API might not allow DELETE without admin token)
    // Since it's a fresh install, we just post.
    for (const svc of services) {
      await axios.post(`${STRAPI_URL}/services`, {
        data: svc
      });
    }
    console.log("Services seeded.");

    // 4. Seed Location
    await axios.post(`${STRAPI_URL}/location`, {
      data: {
        name: "Siège Social",
        address: "Av. Kasa-Vubu, Matadi, Kongo-Central, RDC",
        email: "contact@impactpositif.com",
        phone: "+243 000 000 000"
      }
    });
    console.log("Location seeded.");

    // 5. Seed Global
    await axios.post(`${STRAPI_URL}/global`, {
      data: {
        siteName: "IMPACT POSITIF",
        primaryColor: "#7c3aed", // Mauve
        secondaryColor: "#ef4444" // Red
      }
    });
    console.log("Global seeded.");

    console.log("Seeding completed successfully!");
  } catch (err) {
    console.error("Seeding failed:");
    if (err.response) {
      console.error(err.response.data);
    } else {
      console.error(err.message);
    }
  }
}

seed();
