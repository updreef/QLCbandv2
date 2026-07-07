import { useEffect } from "react";
import { shows, blogPosts } from "../data";

interface SchemaMarkupProps {
  route: string;
  slug?: string;
}

export default function SchemaMarkup({ route, slug }: SchemaMarkupProps) {
  useEffect(() => {
    // Remove existing JSON-LD script tags if any
    const existingScripts = document.querySelectorAll("script[data-schema]");
    existingScripts.forEach((script) => script.remove());

    let schemaData: any = null;

    // 1. Home / General Schema (MusicGroup)
    if (route === "home" || route === "") {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "MusicGroup",
        "name": "Quarter Life Crisis",
        "alternateName": "QLC Band",
        "genre": "Rock",
        "homeLocation": {
          "@type": "Place",
          "name": "Bunschoten-Spakenburg, Nederland"
        },
        "description": "Quarter Life Crisis (QLC) is een energieke 6-koppige rock coverband uit Bunschoten-Spakenburg en Amersfoort. Wij spelen de grootste rockhits en herkenbare anthems.",
        "slogan": "Play loud, grow up later",
        "telephone": "+31 6 40 42 00 54",
        "email": "Ruben_beukers@outlook.com",
        "member": [
          { "@type": "OrganizationRole", "member": { "@type": "Person", "name": "Ruben Beukers" }, "roleName": "Lead Vocals & Rhythm Guitar" },
          { "@type": "OrganizationRole", "member": { "@type": "Person", "name": "Daan de Graaf" }, "roleName": "Lead Guitar" },
          { "@type": "OrganizationRole", "member": { "@type": "Person", "name": "Thijs Hopman" }, "roleName": "Keys & Synths" },
          { "@type": "OrganizationRole", "member": { "@type": "Person", "name": "Jesse van de Groep" }, "roleName": "Bass Guitar" },
          { "@type": "OrganizationRole", "member": { "@type": "Person", "name": "Thomas Koelewijn" }, "roleName": "Drums" },
          { "@type": "OrganizationRole", "member": { "@type": "Person", "name": "Sophie van Diermen" }, "roleName": "Backing Vocals" }
        ],
        "event": shows
          .filter((s) => s.status === "upcoming")
          .map((s) => ({
            "@type": "MusicEvent",
            "name": s.title,
            "startDate": s.date,
            "location": {
              "@type": "Place",
              "name": s.location,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": s.address,
                "addressLocality": s.city,
                "addressCountry": "NL"
              }
            },
            "performer": {
              "@type": "MusicGroup",
              "name": "Quarter Life Crisis"
            }
          }))
      };
    } 
    // 2. Event Show Detail
    else if (route === "optredens-detail" && slug) {
      const show = shows.find((s) => s.slug === slug);
      if (show) {
        schemaData = {
          "@context": "https://schema.org",
          "@type": "MusicEvent",
          "name": show.title,
          "startDate": show.date,
          "description": show.description,
          "location": {
            "@type": "Place",
            "name": show.location,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": show.address,
              "addressLocality": show.city,
              "addressCountry": "NL"
            }
          },
          "performer": {
            "@type": "MusicGroup",
            "name": "Quarter Life Crisis"
          },
          "image": show.image
        };
      }
    } 
    // 3. Booking WebPage
    else if (route === "boek-ons") {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Rockband boeken - Quarter Life Crisis",
        "description": "Boek Quarter Life Crisis (QLC) voor jouw dorpsfeest, bruiloft, festival of tuinfeest in regio Utrecht en Amersfoort. Neem direct contact op voor prijzen en beschikbaarheid.",
        "provider": {
          "@type": "MusicGroup",
          "name": "Quarter Life Crisis",
          "email": "Ruben_beukers@outlook.com",
          "telephone": "+31 6 40 42 00 54"
        }
      };
    } 
    // 4. Blog Post Detail
    else if (route === "blog-detail" && slug) {
      const post = blogPosts.find((p) => p.slug === slug);
      if (post) {
        schemaData = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "datePublished": post.date,
          "description": post.summary,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "MusicGroup",
            "name": "Quarter Life Crisis"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://qlcband.nl/#/blog/${post.slug}`
          }
        };
      }
    }

    if (schemaData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema", "true");
      script.innerHTML = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }
  }, [route, slug]);

  return null;
}
