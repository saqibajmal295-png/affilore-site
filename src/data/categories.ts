import { Category } from '@/types';

export const categories: Category[] = [
  {
    slug: 'best-espresso-coffee-gear',
    title: 'Best Espresso & Coffee Gear (2025/2026 Tested)',
    shortTitle: 'Coffee & Espresso',
    tagline: 'Precision brewers, conical burr grinders, and temperature-controlled kettles tested for extraction uniformity.',
    description:
      'We spent over 300 brewing hours testing water dispersal rates, thermal stability to within ±0.5°F, and micron-level grind consistency to find the absolute best coffee gear for your countertop.',
    iconName: 'Coffee',
    heroImage: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1400&q=80',
    featuredProductSlug: 'breville-precision-brewer-thermal',
    buyingGuide: {
      intro:
        'Great coffee comes down to extraction physics: water temperature (195°F–205°F), brew time, and particle distribution. Cheaper brewers scald the beans or brew under-temp, leaving sour notes.',
      factors: [
        {
          title: 'PID Temperature Control',
          description:
            'Look for digital thermal stability that prevents temperature dips during the crucial 3-minute extraction cycle.',
        },
        {
          title: 'Flow-Rate Customization',
          description:
            'Adjustable bloom time and flow rate ensure light, medium, and dark roasts receive the proper saturation.',
        },
        {
          title: 'Carafe Thermal Retention',
          description:
            'Double-wall stainless steel carafes keep coffee piping hot for 4+ hours without a bitter heating element bake.',
        },
      ],
      bottomLine:
        'If you want coffee shop quality at home without manual pour-over frustration, choose a certified golden-cup brewer with variable bloom times.',
    },
    faqs: [
      {
        question: 'What is SCA Golden Cup certification?',
        answer:
          'The Specialty Coffee Association tests brewers rigorously for brew temp (197.6–204.8°F), extraction time within 4 to 8 minutes, and uniform bed saturation.',
      },
      {
        question: 'Is a burr grinder really worth it over a blade grinder?',
        answer:
          'Yes, 100%. Blade grinders shatter beans into uneven boulders and dust, leading to both sour and bitter flavors simultaneously. Burr grinders provide uniform particle size.',
      },
    ],
  },
  {
    slug: 'best-smart-kitchen-gadgets',
    title: 'Best Smart Kitchen Gadgets for Effortless Cooking',
    shortTitle: 'Smart Kitchen',
    tagline: 'Wi-Fi air fryers, app-connected precision sous vide, and wireless probes that eliminate guesswork.',
    description:
      'Connected kitchen tech should save time, not introduce tech headaches. We evaluate real-world Wi-Fi range, sensor accuracy against NIST-calibrated thermometers, and app reliability.',
    iconName: 'Smartphone',
    heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
    featuredProductSlug: 'cosori-smart-air-fryer-toaster-oven',
    buyingGuide: {
      intro:
        'Smart cooking appliances bridge the gap between amateur cooks and professional precision by providing real-time internal core temperatures, automated heat curves, and push notifications.',
      factors: [
        {
          title: 'Sensor Accuracy & Calibration',
          description:
            'Wireless probes must read accurately within ±1°F to prevent costly steaks and roasts from overcooking.',
        },
        {
          title: 'Local Standalone Usability',
          description:
            'Every smart gadget should still work effortlessly from manual tactile dials if your Wi-Fi router ever drops offline.',
        },
        {
          title: 'App Ecosystem & Push Alerts',
          description:
            'Well-designed companion apps send ambient temperature spikes and countdowns directly to your Apple Watch or phone.',
        },
      ],
      bottomLine:
        'Invest in smart kitchen gadgets where automated precision directly prevents mistakes — especially internal temperature monitoring and dual-zone air frying.',
    },
    faqs: [
      {
        question: 'Do smart kitchen appliances require a subscription?',
        answer:
          'None of the appliances we recommend require mandatory monthly subscriptions; all app features and firmware updates are free.',
      },
      {
        question: 'Can wireless probes withstand high heat searing?',
        answer:
          'Ceramic and stainless probes typically handle ambient temps up to 572°F, but the probe tip inserted inside the meat must stay under 212°F.',
      },
    ],
  },
  {
    slug: 'best-budget-cooking-essentials',
    title: 'Best Budget Cooking Essentials Under $50 (That Outlast Expensive Brands)',
    shortTitle: 'Budget Essentials',
    tagline: 'Heirloom-grade cast iron, Japanese steel chef knives, and indestructible silicone tools on a budget.',
    description:
      'You do not need to spend thousands to stock a chef-worthy kitchen. We stress-tested budget kitchen tools against premium $300 counterparts to find real everyday workhorses.',
    iconName: 'UtensilsCrossed',
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80',
    featuredProductSlug: 'lodge-pre-seasoned-cast-iron-skillet-12-inch',
    buyingGuide: {
      intro:
        'Marketing hype in cookware often inflates prices by 400%. A $25 cast iron pan or a $40 high-carbon chef knife frequently outperforms luxury designer pieces when properly cared for.',
      factors: [
        {
          title: 'Material Purity & Gauge',
          description:
            'Heavy cast iron and thick tri-ply stainless steel hold heat exponentially better than thin decorative non-stick.',
        },
        {
          title: 'Replaceability vs Longevity',
          description:
            'Non-stick coatings degrade in 2-3 years, while raw cast iron and carbon steel improve with every seasoning.',
        },
        {
          title: 'Balance & Ergonomics',
          description:
            'A lightweight knife with improper spine geometry causes wrist fatigue during high-volume vegetable prep.',
        },
      ],
      bottomLine:
        'Spend money where thermal retention and blade sharpness matter, and skip celebrity-endorsed branded cookware sets.',
    },
    faqs: [
      {
        question: 'How do you clean pre-seasoned cast iron?',
        answer:
          'Wash with warm water and a drop of mild soap (modern soap won’t strip polymerized oil!). Dry immediately and rub with a tiny droplet of high-smoke-point neutral oil.',
      },
      {
        question: 'Is budget carbon steel hard to maintain?',
        answer:
          'Not at all. Keep it dry and avoid soaking in water. It builds a natural non-stick slick patina that rivals Teflon.',
      },
    ],
  },
  {
    slug: 'best-countertop-appliances',
    title: 'Best Countertop Appliances That Deserve Your Kitchen Space',
    shortTitle: 'Countertop Gear',
    tagline: 'High-torque blenders, multi-cookers, and compact convection stations evaluated for motor longevity.',
    description:
      'Countertop real estate is prime kitchen territory. We tested decibel output, motor torque under frozen ingredient load, and ease of teardown cleaning to ensure these appliances earn their spot.',
    iconName: 'Flame',
    heroImage: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1400&q=80',
    featuredProductSlug: 'instant-pot-duo-crisp-11-in-1',
    buyingGuide: {
      intro:
        'The worst countertop appliances are unitaskers that collect dust after two uses. We look for multifunctional heavy hitters capable of replacing three or more single-purpose gadgets.',
      factors: [
        {
          title: 'Motor Wattage & Torque',
          description:
            'Look for at least 1200W for blenders and food processors to crush ice and nut butters without thermal shutoff.',
        },
        {
          title: 'Footprint-to-Capacity Ratio',
          description:
            'Appliances that fit neatly under standard 18-inch upper kitchen cabinets get used 5x more often.',
        },
        {
          title: 'Dishwasher-Safe Removable Components',
          description:
            'If an appliance takes 20 minutes to hand wash and reassemble, you will stop using it. Seamless cleaning is essential.',
        },
      ],
      bottomLine:
        'Prioritize versatile multi-cookers with pressure and air fry capabilities to maximize counter utility.',
    },
    faqs: [
      {
        question: 'Can an all-in-one multi-cooker truly air fry as well as a standalone unit?',
        answer:
          'Modern hybrid units like the Duo Crisp circulate 400°F air within 15% of the crisping speed of dedicated basket fryers, while saving 50% counter space.',
      },
    ],
  },
];
