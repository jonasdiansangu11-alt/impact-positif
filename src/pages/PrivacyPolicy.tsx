import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Seo from '../components/seo/Seo';

export default function PrivacyPolicy() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background-950 min-h-screen text-background-50 selection:bg-red-500/30 selection:text-white flex flex-col">
      <Seo 
        title="Politique de confidentialité | IMPACT POSITIF" 
        description="Politique de confidentialité de l'agence IMPACT POSITIF."
      />
      <Header />
      
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading mb-10 tracking-tight">
          Politique de <span className="text-red-500">Confidentialité</span>
        </h1>
        
        <div className="space-y-8 text-background-100/70 text-base md:text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-background-50 mb-4">1. Collecte des données personnelles</h2>
            <p>
              Nous collectons les données que vous nous fournissez volontairement lors de l'utilisation de nos formulaires de contact ou de toute autre interaction avec IMPACT POSITIF. Ces données peuvent inclure, sans s'y limiter, votre nom, adresse e-mail et numéro de téléphone.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-background-50 mb-4">2. Utilisation des données</h2>
            <p>
              Les informations collectées sont utilisées pour répondre à vos demandes, améliorer nos services et vous tenir informé de nos activités dans la mesure où vous y avez consenti. Nous ne vendons, ni ne louons vos données personnelles à des tiers.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-background-50 mb-4">3. Sécurité</h2>
            <p>
              La sécurité de vos données personnelles est primordiale pour nous. Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre l'accès non autorisé, l'altération, la divulgation ou la destruction.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-background-50 mb-4">4. Vos droits</h2>
            <p>
              Conformément à la législation en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : <strong>hello@impactpositif.com</strong>.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-background-50 mb-4">5. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité, n'hésitez pas à nous contacter :<br/>
              Avenue Masunda Manoki 11 / Ville Haute, MATADI, RDC<br/>
              +243 818 897 000 - 850 849 310
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
