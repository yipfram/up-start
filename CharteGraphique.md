# Charte Graphique — Food Explorer MVP Suite

## Identité & Ton
- **Positionnement** : Food-tech premium, chaleureux et créatif. L’interface met en valeur la chasse aux expériences culinaires avec un twist “gaming / social”.
- **Ambiance** : Mélange entre néon nocturne et chaleur culinaire. Les dégradés dynamiques donnent l’impression d’un flux en direct (stories, nightlife), tandis que les cartes blanches offrent un cadre lisible pour les données.

## Palette de couleurs
| Rôle | Couleur | Usage |
|------|---------|-------|
| Primaire | `#FC5218` | Call-to-action, badges actifs, éléments chauffés (boutons, labels). |
| Secondaire | `#FF8A3D` | Dégradés, hover chauds, liaisons avec l’univers food. |
| Accent Froid | `#0EA5E9`, `#7C3AED` | Contraste neon, feedback de sélection (markers map, accents dans Quest Mode). |
| Fond clair | `#F5F7FA` | Toile générale pour les pages. |
| Surface | `#FFFFFF` | Cartes, modales, panneaux secondaires. |
| Texte principal | `#1F2933` | Corps et titres. |
| Texte secondaire | `#52606D` | Métadonnées, descriptions. |

> **Dégradés signatures**  
> - `from-brand-primary via-[#f97316] to-[#1d4ed8]` (Pulse Wave)  
> - `from-[#ec4899] via-[#8b5cf6] to-[#0ea5e9]` (Neon City/Oasis)  
> - `from-[#22c55e] via-[#10b981] to-[#fde047]` (Garden Party)

## Typographie
- **Famille** : `Inter`, fallback system sans-serif.  
- **Hiérarchie** :
  - Titres H1/H2 en `font-semibold`, tracking serré pour renforcer le côté éditorial.
  - Paragraphes en `text-base`/`text-sm` pour garder une densité lisible.
  - Accents “tech” via uppercase et `tracking-[0.3em]` sur étiquettes (Quest Mode, badges).

## Composants & Styles
- **Cartes** : rayon `24px` / `32px`, ombre `shadow-card` (`0 12px 30px rgba(15, 23, 42, 0.12)`) pour flotter sur le fond.
- **Boutons** : 
  - Primaire: capsule (`rounded-full`), fond `brand-primary`, texte blanc, hover léger `brand-primary/90`.
  - Secondaire: capsule outline `border-brand-muted/40`, hover vers fond clair.
- **Map** : markers en dégradé chaud ; état sélection `activeIcon` (violet → cyan) pour signaler la progression de quête.
- **Story Cards** : aspect 9:16, overlays radiaux, blur `backdrop-blur` pour l’effet verre / néon. Images en blend `mix-blend-screen` pour un rendu Spotify Wrapped.
- **Progression** : barres arrondies + badges uppercase (`tracking-[0.3em]`) reprenant le vocabulaire gaming.

## Iconographie & Illustrations
- Utiliser des formes douces, glow et halos néon (`box-shadow` diffus, blur).  
- Les marqueurs et indicateurs utilisent des pictos simplifiés (points lumineux, pulsations).  
- Aucune iconographie détaillée : priorité à la couleur et aux gradients.

## Règles d’espacement
- Grille principale `max-w-6xl`, marges horizontales `px-4 md:px-6 lg:px-8`.  
- Espacement vertical `gap-6` entre sections majeures.  
- Cartes internes `p-6 md:p-8`, listes `gap-3/4`.  
- Respecter la respirations : pas de densification extrême pour garder le côté “premium”.

## États & Feedback
- **Hover** : éclaircir la couleur ou ajouter un léger `shadow-card`.  
- **Actif** : ring `ring-white ring-offset-brand-primary` sur les thèmes, ou changement de dégradé.  
- **Loading** : placeholders `animate-shimmer` avec pattern diagonale (map fallback).
- **Notif / badges** : uppercase + `tracking-[0.3em]`, teinte `brand-primary` ou `white/70`.

## Accessibilité
- Conserver un contraste suffisant (texte foncé sur fond clair ; pour texte sur gradient, ajouter overlays foncés).  
- Les CTA restent lisibles (> AA).  
- Les éléments interactifs sont accessibles au clavier (`focus-visible:outline-brand-primary`).

## Usage
- **Pages** :
  - `/` : Découverte (map + cartes).  
  - `/instamvp` : Studio story.  
  - `/play` : Quest Mode gamifié (progression + story).  
- **Health** : `/health.json` répond `{ "status": "ok" }`.  

Respecter cette charte pour toute extension (nouveaux modules ou écrans) afin d’assurer la cohérence visuelle et narrative de la plateforme Food Explorer.
