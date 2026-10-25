// =====================================================================
// All editable text for the portfolio lives in this file.
// Image keys (e.g. 'l_fbq3') match file names in src/assets/images/.
// =====================================================================

export const designer = {
  name: 'Asiri Gayashan',
  title: 'Graphic Designer & Digital Marketer',
  basedIn: ['Sri Lanka', 'Working worldwide'],
  email: 'your@email.com',
  behance: 'behance.net/yourname',
};

// Order used for the 3D image floors (hero, wall, cover)
export const ALL = ['l_fbq3','s_crf','r_fort','g_driving','k_gen','s_re','l_s75','r_riverston','s_ktm','g_peace','k_drill','s_cb','l_s70','r_sinharaja','g_imports','s_drz','k_jack','s_ninja','l_s30','r_unawatuna','g_reliable','s_xr','k_mower','s_pulsar'];
export const rep = (n, off = 0) => Array.from({ length: n }, (_, i) => ALL[(i + off) % ALL.length]);

export const tapes = {
  heroA: ['SOCIAL MEDIA DESIGN', '24 POSTS', '5 BRANDS', 'TEMPLATE SYSTEMS'],
  heroB: ['LUYUAN EV', 'KIAWAY TOOLS', 'SAKURA', 'RISING SRI LANKA', 'SHANE GROUP AUTOHUB'],
  wall: ['THANKS FOR SCROLLING', "LET'S BUILD YOUR FEED", 'PORTFOLIO 2026'],
};

// Index rows
export const BRANDS = [
  { n: '01', name: 'Luyuan EV × Thenujaya Holdings', ind: 'EV motorcycles · Maththegama', role: 'Design', c: '04', col: '#1E9E3E', th: ['l_fbq3','l_s75','l_s70','l_s30'] },
  { n: '02', name: 'Kiaway Tools', ind: 'Power tools · Giriulla', role: 'Design', c: '04', col: '#E31E24', th: ['k_drill','k_mower','k_jack','k_gen'] },
  { n: '03', name: 'Sakura', ind: 'Spare parts · Malabe', role: 'Design & Facebook marketing', c: '08', col: '#C2B200', th: ['s_crf','s_ktm','s_re','s_ninja'] },
  { n: '04', name: 'Rising Sri Lanka', ind: 'Tourism · Malabe', role: 'Design & Facebook marketing', c: '04', col: '#8E1B2C', th: ['r_fort','r_sinharaja','r_riverston','r_unawatuna'] },
  { n: '05', name: 'Shane Group AutoHub', ind: 'Vehicles & spare parts · Australia', role: 'Design · via Aus Digi Solutions', c: '04', col: '#19B04B', th: ['g_driving','g_peace','g_imports','g_reliable'] },
];

// "Every post is a system" section
export const LAYERS = [
  ['03', '#B5FF00', 'Grid', 'A 12-column grid keeps margins and alignment identical on every post.'],
  ['02', '#FF4D1A', 'Zones', 'Fixed areas for logos, headline, model lock-up, spec chips, price and contact.'],
  ['01', '#fff', 'Artwork', 'The scene, product and copy change — the zones underneath never do.'],
];
export const ZONES = [[16,16,108,32],[296,16,88,32],[90,52,220,70],[110,128,180,22],[28,236,96,64],[16,342,150,40],[250,338,134,44]];
export const STEPS = [
  ['01', 'Audit', 'Brand colours, audience, language and what the page must say every week.'],
  ['02', 'Master template', 'One post designed as a system with fixed zones.'],
  ['03', 'Series', 'New product or scene, same structure — always recognisable.'],
  ['04', 'Feed check', 'Reviewed as a grid so the page reads as one brand.'],
];

export const SKILLS = [
  ['Template systems', 'Reusable layouts that let a brand publish fast without losing consistency.'],
  ['Bilingual typography', 'Sinhala and English set to work together, not fight for space.'],
  ['Photo compositing', 'Cut-outs, scenes and lighting built to stop the scroll.'],
  ['Facebook content', 'Page management and engagement series that bring audiences back.'],
];

// Brand chapters. `custom` picks the showcase component in Chapter.jsx.
export const CHAPTERS = [
  {
    id: 'c04', num: '01', pc: '04', tag: 'EV motorcycles — Maththegama', gname: 'LUYUAN', gsize: 430,
    obg: 'linear-gradient(180deg,#1E9E3E 0%,#0F6B2A 100%)', ofg: '#fff', fan: ['l_s75','l_fbq3','l_s30'],
    otext: 'Lifestyle launch posts for Thenujaya Holdings — four models, four Sri Lankan moments.',
    tbg: '#fff', tfg: '#0F6B2A', tw: ['ONE SCOOTER','FOUR LIVES','SCENE FIRST','SPEC SECOND'],
    bg: '#E7F0E2', fg: '#0D3B1E', accent: '#1E9E3E', line: 'rgba(13,59,30,.2)', mkbg: '#fff', mkfg: '#0D3B1E', mkbd: '#1E9E3E',
    meta: [['Client','Thenujaya Holdings — Luyuan dealer'],['Industry','Electric motorcycles'],['Location','Maththegama, Sri Lanka'],['My role','Graphic design']],
    big: ['ONE SCOOTER.', 'FOUR LIVES.'],
    lede: 'Instead of a scooter on a plain background, each Luyuan model is placed in a real Sri Lankan moment — the field, the festive homecoming, the open road, the school gate — so customers see themselves before they see the price.',
    anat: {
      img: 'l_fbq3',
      mk: [[.33,.07],[.74,.07],[.5,.17],[.5,.26],[.62,.35],[.31,.64],[.43,.9],[.66,.89]],
      notes: [['Dual brand lock-up','Luyuan badge and the Kiaway dealer mark share the top edge.'],['Dealer credit','Keeps the local seller visible on every model post.'],['Sinhala hook line','A short emotional line that names the customer.'],['Bold Sinhala headline','The promise, set large in deep brand green.'],['Model wordmark','Italic LUYUAN + model badge, reused on every post.'],['Spec chips','Motor warranty, battery warranty or range — icon-led and scannable.'],['Price block','Solid green pill, always bottom-left.'],['Location & phone','Always bottom-right on clean green.']],
    },
    custom: 'cards',
    posts: [['l_fbq3','The farmer','FBQ-3','Rs. 260,000'],['l_s75','The homecoming','S75','Rs. 530,000'],['l_s70','The young rider','S70','Rs. 440,000'],['l_s30','The school run','S30','Rs. 595,000']],
    prin: [['Four audiences, one layout','Each scene speaks to a different buyer while the info zones never move.'],['Sky-to-grass gradient','Photos fade into solid brand green, so price and contact always sit on a clean base.'],['Warranty as a selling point','Five-year motor cover is a badge, not buried in body copy.']],
  },
  {
    id: 'c05', num: '02', pc: '04', tag: 'Power tools — Giriulla', gname: 'KIAWAY', gsize: 430,
    obg: '#E31E24', ofg: '#fff', gout: false, fan: ['k_mower','k_gen','k_drill'],
    otext: 'A price-led product template — new stock goes live the same day it lands.',
    tbg: '#0D0D0E', tfg: '#fff', tw: ['PRICE-LED','SAME-DAY POSTING','WARRANTY','FREE DELIVERY'],
    bg: 'linear-gradient(180deg,#7D0A0A 0%,#0D0D0E 100%)', fg: '#fff', accent: '#FF3B40', line: 'rgba(255,255,255,.18)',
    meta: [['Client','Kiaway by Thenujaya Holdings'],['Industry','Power tools & garage equipment'],['Location','Giriulla, Sri Lanka'],['My role','Graphic design']],
    big: ['NEW STOCK,', 'SAME DAY.'],
    lede: 'Product, specs, warranty, free delivery, instalment option and price always sit in the same place — so a new tool can go live the moment it lands in the shop. The full Kiaway brand case study is a separate project on my profile.',
    custom: 'tags',
    posts: [['k_drill','HUGO Bench Drill','Rs. 57,870'],['k_mower','Lawn Mower','Rs. 82,000'],['k_jack','Lifting Jack','Rs. 97,985'],['k_gen','5500W Generator','Rs. 228,500']],
    prin: [['Price you read in a second','The biggest number on the post, in a solid red block.'],['Trust badges first','Warranty and free delivery, tied to the product with leader lines.'],['Bilingual spec card','English technical specs and Sinhala benefits in one white card.']],
  },
  {
    id: 'c06', num: '03', pc: '08', tag: 'Spare parts — Malabe', gname: 'SAKURA', gsize: 430,
    obg: '#FFF200', ofg: '#0B0B0B', fan: ['s_re','s_crf','s_ninja'],
    otext: 'Facebook page management and two engagement series for a rider community.', blend: 'normal',
    tbg: '#0B0B0B', tfg: '#FFF200', tw: ['SPEC SPOTLIGHT','TORQUE TIMES','HOT NEWS','RIDER COMMUNITY'],
    bg: '#0B0B0B', fg: '#fff', accent: '#FFF200', line: 'rgba(255,255,255,.16)',
    meta: [['Client','Sakura Genuine Spare Parts'],['Industry','Motorcycle spare parts'],['Location','Malabe, Sri Lanka'],['My role','Design & Facebook page management']],
    big: ['CONTENT THAT', 'KEEPS RIDERS', 'COMING BACK.'],
    lede: "I managed Sakura's Facebook page and created two recurring series to keep riders engaged between sales posts. Both live in the same black-and-yellow world, so the page stays recognisable whatever format is running.",
    custom: 'sakura',
    seriesA: [['s_crf','Honda CRF'],['s_drz','Suzuki DRZ 400'],['s_ktm','KTM 450'],['s_xr','Honda XR']],
    seriesB: [['s_re','Royal Enfield Bullet has been in continuous production for 93 years'],['s_cb',"The Honda CB750 is considered the world's first superbike"],['s_ninja','A Ninja H2R can beat an F1 car in a drag race'],['s_pulsar','In India, a Pulsar N160 costs only around Rs. 395,000']],
    prin: [['Engagement, not just ads','Explainers and news give followers a reason to like, comment and share.'],['Black + signal yellow','Two colours that own the feed and work on any photo.'],['Formats that scale','Swap the bike or the headline and the series keeps running.']],
  },
  {
    id: 'c07', num: '04', pc: '04', tag: 'Tourism — Malabe', gname: 'DISCOVER', gsize: 330, gtop: 150,
    obg: '#8E1B2C', ofg: '#F4EFE8', gout: true, fan: ['r_fort','r_riverston','r_unawatuna'],
    otext: 'A "Discover Sri Lanka" postcard series for Rising Sri Lanka\'s Facebook page.',
    tbg: '#F4EFE8', tfg: '#8E1B2C', tw: ['GALLE','RAKWANA','MATALE','UNAWATUNA','DISCOVER SRI LANKA'],
    bg: '#F4EFE8', fg: '#24201F', accent: '#8E1B2C', line: 'rgba(36,32,31,.18)', mkbg: '#8E1B2C', mkfg: '#fff', mkbd: '#fff',
    meta: [['Client','Rising Sri Lanka'],['Industry','Tourism'],['Location','Malabe, Sri Lanka'],['My role','Design & Facebook page management']],
    big: ['EDITORIAL,', 'NOT AD-LIKE.'],
    lede: 'Each post reads like a magazine postcard — an elegant district name, a short story about the place, and the landscape fading into black — built to inspire travel and invite shares.',
    anat: {
      img: 'r_riverston',
      mk: [[.16,.2],[.66,.12],[.82,.3],[.12,.58],[.72,.76],[.63,.93]],
      notes: [['The lock-up','DISCOVER / district / SRI LANKA — any destination drops straight in.'],['District in serif','A high-contrast serif in deep maroon gives the series its elegance.'],['Short story','Three lines of copy: what it is, why it matters, why go.'],['Ghost type','The place name sits translucent inside the photo.'],['White sky fade','The image melts into the white header, so text always reads cleanly.'],['Signature footer','Fade to black and the Rising Sri Lanka mark, centred.']],
    },
    custom: 'postcards',
    posts: [['r_fort','Galle Fort Market','GALLE','Southern Province'],['r_sinharaja','Sinharaja Forest','RAKWANA','Sabaragamuwa'],['r_riverston','Riverston Peak','MATALE','Central Province'],['r_unawatuna','Unawatuna Beach','GALLE','Southern Province']],
    prin: [['A series, not one-offs','Followers learn the format and look forward to the next destination.'],['Restraint sells the place','White space and one colour let the photography lead.'],['Endless by design','New district, new photo, new story — it never runs out.']],
  },
  {
    id: 'c08', num: '05', pc: '04', tag: 'Vehicles & spare parts — Australia', gname: 'AUTOHUB', gsize: 400,
    obg: '#0C1410', ofg: '#22C55E', gout: true, fan: ['g_imports','g_peace','g_reliable'],
    otext: 'Headline-first awareness posts for an Australian dealer, made at Aus Digi Solutions.',
    tbg: '#22C55E', tfg: '#0C1410', tw: ['HEADLINE FIRST','ONE KEYWORD','ONE CTA','AUSTRALIA'],
    bg: '#0C1410', fg: '#fff', accent: '#22C55E', line: 'rgba(255,255,255,.16)', mkbg: '#22C55E', mkfg: '#0C1410', mkbd: '#0C1410',
    meta: [['Client','Shane Group AutoHub'],['Industry','Vehicles & spare parts'],['Location','Australia'],['My role','Graphic design — Aus Digi Solutions, Malabe']],
    big: ['ONE WORD', 'DOES THE', 'SELLING.'],
    lede: 'Designed during my time as a graphic designer at Aus Digi Solutions in Malabe. An oversized green keyword carries the message, the photograph sets the mood, and a white pill closes with the call to action.',
    anat: {
      img: 'g_peace',
      mk: [[.89,.08],[.74,.12],[.74,.25],[.66,.62],[.15,.82],[.86,.87]],
      notes: [['Logo corner','The SG mark sits top-right, never competing with the headline.'],['Lead-in line','Small caps set the question or context.'],['The keyword','Condensed, oversized and in brand green — the one thing you remember.'],['Mood photography','Landscape-led vehicle shots with plenty of sky for type.'],['Supporting line','One sentence of reassurance in white.'],['CTA pill','A white rounded pill with green text closes every post.']],
    },
    custom: 'billboard',
    posts: [['g_driving','From dreaming to driving'],['g_peace','Peace of mind'],['g_imports','Japanese imports'],['g_reliable','Reliable vehicle?']],
    prin: [['Message hierarchy','Lead-in → keyword → reassurance → CTA, in that order, every time.'],['Built for a new market','Clean English copy and global-style visuals for an Australian audience.'],['Green as a signature','One brand colour on keyword and CTA ties the series together.']],
  },
];
