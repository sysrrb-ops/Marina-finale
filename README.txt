================================================================================
MOSTAR CITY — CINEMATIC SCROLL STORY
================================================================================

Project Structure:
------------------
marina_valerielle/
├── index.html       Main HTML markup with exact DOM tree & accessible tags
├── styles.css       Complete CSS layout, Ogg Medium font, variables & media queries
├── script.js        Physics & animation engine (scrubbing, parallax, sights slider)
├── README.txt       Documentation and instructions
└── assets/          Remote asset reference and manifest

Overview:
---------
Recreation of the "Mostar city" cinematic scroll experience.
A three-screen cinematic scroll page featuring:
1. Intro & Hero: "MOSTAR" typography floating over the Neretva river valley.
2. Bridge Separation & Frame-Two: Stari Most arch expands, splitframes part,
   and river close-up reveals with custom blur and shade gradients.
3. Bazaar & Old Town Story Panel: Dynamic saturation shift and old town notes.
4. Infinite 3-Set Sights Carousel: 5 sight cards with pin icons, smooth tracking,
   and transition-normalized infinite jumping.
5. Reduced Motion Adaptation: Graceful fallback without momentum inertia.

How to Run:
-----------
1. Simply double-click index.html or open it with any modern web browser.
2. No build tools, package managers, or local servers required.
3. All image assets and the Ogg Medium webfont load securely from remote CDNs.

Remote Assets Manifest:
-----------------------
- Font: OggText-Medium.woff2
  https://dcym8fthxf5uu.cloudfront.net/fonts/247a073c-29f5-4a89-aa3a-741020f346fc/OggText-Medium.woff2
- Sky / Farthest Background:
  https://raft-blast-61784561.figma.site/_assets/v11/16b5007d9c93971e26ffe4e0e3e37946f6bd538c.png
- Back "Four" Glow Layer:
  https://raft-blast-61784561.figma.site/_assets/v11/8a7f8af50e0ce92ec2e228e7b0b4112178c51cf1.png
- Bazaar Mid-Back:
  https://raft-blast-61784561.figma.site/_assets/v11/864afe00e41e2fa20a5aa546e15cb807e0f81384.png
- Splitframe Left:
  https://raft-blast-61784561.figma.site/_assets/v11/7536d7b60a1fce482cf6edf3f0bffd3bad5d0f8a.png
- Splitframe Right:
  https://raft-blast-61784561.figma.site/_assets/v11/392db6a6a6b98e868bd7f8d3f55bb719d51e5028.png
- Bridge Foreground:
  https://raft-blast-61784561.figma.site/_assets/v11/c6a6d8ef49bca43f708aa852692942c45ec950d4.png
- Frame-Two River Close-Up:
  https://raft-blast-61784561.figma.site/_assets/v11/ba75252bab2b1c510987b74837770f7bc8a6b2d4.png
- Pin Icons (Square transparent cutouts):
  - icon1: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260730_230438_d526b8b6-8a2e-4e3b-9993-3908acae03a7.png
  - icon2: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260730_230442_140bc25b-b165-4249-904a-f708bff6970e.png
  - icon3: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260730_230448_825949c9-ccdb-4857-b4a6-e349eccc9010.png
