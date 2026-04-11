# Invitation de mariage React

Le projet a ete migre en React + Vite pour mieux organiser et modifier l'invitation digitale.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvre l'URL affichee par Vite (souvent `http://localhost:5173`).

## Build production

```bash
npm run build
npm run preview
```

## Personnalisation principale

Modifie `src/data/siteConfig.js` :

- infos mariage (`coupleNames`, `dateLabel`, `venue`, `kabylePhrase` — phrase en kabyle sur le hero, ex. `Ansuf yisswen`)
- page d'accueil : `intro.introMode`
  - `"envelope"` (defaut) : animation enveloppe CSS (cachet, rabat, faire-part) — voir `src/components/EnvelopeIntroAnimation.jsx`
  - `"video"` : fond video + overlay (activer aussi `useVideoBackground`)
  - `"simple"` : degrade + texte sans enveloppe
- textes intro (`overlayTitle`, `overlaySubtitle`, `overlayMessage`, `ctaLabel`)
- intro style reference : `exclusiveLine`, `sealMonogram` (ex. `A & M`)
- hero (`hero.videoSrc`, `hero.musicSrc`, citation)
- programme (`schedule`)
- section RSVP (`rsvp`)

## Motifs kabyles

Decor geometrique inspire des tapis / broderies kabyles (losanges, chevrons, triangles, cadres aux coins) :
`src/components/KabyleMotifs.jsx` + `KabyleMotifs.css`. Present sur l'intro enveloppe et sur le contenu principal.

## Structure

- `src/App.jsx` : assemblage des sections
- `src/components/KabyleMotifs.jsx` : motifs kabyles en fond
- `src/components/IntroScreen.jsx` : animation d'ouverture editable
- `src/components/Countdown.jsx` : compte a rebours
- `src/components/RsvpForm.jsx` : formulaire RSVP
- `src/styles.css` : styles globaux
