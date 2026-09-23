import { HomePlanRequest, HomePlanResult, PartyPlanRequest, PartyPlanResult, JewelryPlanRequest, JewelryPlanResult } from './types';

export function getMockHomePlan(req: HomePlanRequest): HomePlanResult {
  const isINR = req.currency === 'INR';
  const multiplier = isINR ? 80 : 1;
  const budget = req.budget;

  const roomBreakdowns = req.rooms.map((room) => {
    const roomItems = [];
    const roomBudget = Math.round(budget / (req.rooms.length || 1));

    if (room.toLowerCase().includes('living')) {
      roomItems.push(
        {
          id: `item-${Math.random()}`,
          name: `${req.style} Fabric 3-Seater Sofa`,
          category: 'Furniture',
          platform: 'IKEA' as const,
          price: Math.round(roomBudget * 0.38),
          currency: req.currency,
          description: `Ergonomic, easy-to-clean neutral sofa perfectly matching a ${req.style} aesthetic.`,
          matchReason: 'Fits budget allocation while anchoring the room visually.',
          url: 'https://www.ikea.com/search/?q=sofa',
          rating: 4.6,
          tag: 'Best Value',
        },
        {
          id: `item-${Math.random()}`,
          name: 'Nordic Wooden Coffee Table with Shelf',
          category: 'Furniture',
          platform: 'Pepperfry' as const,
          price: Math.round(roomBudget * 0.16),
          currency: req.currency,
          description: 'Solid engineered wood coffee table with lower tier storage.',
          matchReason: 'Compact footprint, complements living room layout.',
          url: 'https://www.pepperfry.com/site_product/search?q=coffee+table',
          rating: 4.4,
        },
        {
          id: `item-${Math.random()}`,
          name: 'Warm Dimmable Smart Ceiling Light & Fan Combo',
          category: 'Lighting & Fixtures',
          platform: 'Amazon' as const,
          price: Math.round(roomBudget * 0.18),
          currency: req.currency,
          description: 'BLDC energy-efficient ceiling fan with multi-temperature LED fixture.',
          matchReason: 'Dual functionality saves fixture costs and power.',
          url: 'https://www.amazon.in/s?k=bldc+ceiling+fan+with+light',
          rating: 4.7,
          tag: 'Energy Efficient',
        },
        {
          id: `item-${Math.random()}`,
          name: 'Boho Geometric Area Rug (5x7 ft)',
          category: 'Decor & Soft Furnishings',
          platform: 'Flipkart' as const,
          price: Math.round(roomBudget * 0.12),
          currency: req.currency,
          description: 'Anti-slip soft microfiber rug to demarcate conversational seating.',
          matchReason: 'Adds warm texture without blowing budget.',
          url: 'https://www.flipkart.com/search?q=area+rug+5x7',
          rating: 4.3,
        }
      );
    } else if (room.toLowerCase().includes('bed')) {
      roomItems.push(
        {
          id: `item-${Math.random()}`,
          name: 'Platform Bed Frame with Headboard Storage',
          category: 'Furniture',
          platform: 'Urban Ladder' as const,
          price: Math.round(roomBudget * 0.45),
          currency: req.currency,
          description: `Clean-lined ${req.style} bed frame engineered for durability.`,
          matchReason: 'Primary bedroom focal point under budget cap.',
          url: 'https://www.urbanladder.com/beds',
          rating: 4.5,
          tag: 'Top Pick',
        },
        {
          id: `item-${Math.random()}`,
          name: 'Minimalist Bedside Lamps (Set of 2)',
          category: 'Lighting',
          platform: 'Amazon' as const,
          price: Math.round(roomBudget * 0.14),
          currency: req.currency,
          description: 'Touch-sensitive bedside reading lamps with built-in USB ports.',
          matchReason: 'Multi-functional bedside utility.',
          url: 'https://www.amazon.in/s?k=bedside+lamps+pair',
          rating: 4.6,
        },
        {
          id: `item-${Math.random()}`,
          name: 'Blackout Thermal Curtains (2 Panels)',
          category: 'Furnishings',
          platform: 'Amazon' as const,
          price: Math.round(roomBudget * 0.15),
          currency: req.currency,
          description: 'Room-darkening heavy drape curtains for uninterrupted sleep.',
          matchReason: 'Essential for light control and thermal comfort.',
          url: 'https://www.amazon.in/s?k=blackout+curtains',
          rating: 4.5,
        }
      );
    } else {
      roomItems.push(
        {
          id: `item-${Math.random()}`,
          name: `${req.style} Dining / Work Table Set`,
          category: 'Furniture',
          platform: 'IKEA' as const,
          price: Math.round(roomBudget * 0.48),
          currency: req.currency,
          description: 'Extendable dining table with 4 ergonomic chairs.',
          matchReason: 'Sturdy, space-adaptable dining setup.',
          url: 'https://www.ikea.com/search/?q=dining+table',
          rating: 4.6,
        },
        {
          id: `item-${Math.random()}`,
          name: 'Pendant Island Lighting Bar',
          category: 'Lighting',
          platform: 'Amazon' as const,
          price: Math.round(roomBudget * 0.22),
          currency: req.currency,
          description: 'Modern 3-lamp overhead pendant chandelier with matte finish.',
          matchReason: 'Elevates ambiance over kitchen/dining surface.',
          url: 'https://www.amazon.in/s?k=pendant+light+cluster',
          rating: 4.4,
        }
      );
    }

    const estimatedCost = roomItems.reduce((acc, it) => acc + it.price, 0);

    return {
      room,
      allocatedBudget: roomBudget,
      estimatedCost,
      items: roomItems,
      designTips: [
        `Prioritize natural light by positioning the primary seating perpendicular to windows.`,
        `Stick to 2 base neutral colors and 1 accent tone aligned with your ${req.style} theme.`,
        `Use vertical wall storage and floating shelves to keep floor area uncluttered.`,
      ],
    };
  });

  const totalEstimatedCost = roomBreakdowns.reduce((sum, r) => sum + r.estimatedCost, 0);
  const budgetAdherencePercentage = Math.min(100, Math.round((totalEstimatedCost / budget) * 100));

  return {
    totalBudget: budget,
    totalEstimatedCost,
    currency: req.currency,
    budgetAdherencePercentage,
    summary: `Your personalized ${req.style} home interior plan is tailored across ${req.rooms.join(', ')} with an estimated total expenditure of ${req.currency === 'INR' ? '₹' : '$'}${totalEstimatedCost.toLocaleString()} (within your ${req.currency === 'INR' ? '₹' : '$'}${budget.toLocaleString()} target).`,
    roomBreakdowns,
    generalTips: [
      'Order lighting fixtures during weekend Amazon/IKEA sales for extra 10-15% discounts.',
      'Measure doorways and staircase clearance before confirming sofa/bed orders.',
      'Use modular furniture that can easily adapt if you rearrange room layouts.',
    ],
    costSavingAdvice: `You currently have an unallocated buffer of ${req.currency === 'INR' ? '₹' : '$'}${Math.max(0, budget - totalEstimatedCost).toLocaleString()} which can be reserved for delivery, assembly charges, or accent cushions.`,
    suggestedPlatforms: ['IKEA', 'Amazon', 'Pepperfry', 'Urban Ladder', 'Flipkart'],
  };
}

export function getMockPartyPlan(req: PartyPlanRequest): PartyPlanResult {
  const budget = req.budget;
  const isINR = req.currency === 'INR';
  const guests = req.guestCount || 20;

  const cateringBudget = Math.round(budget * 0.45);
  const venueBudget = Math.round(budget * 0.22);
  const decorBudget = Math.round(budget * 0.18);
  const entertainmentBudget = Math.round(budget * 0.15);

  const totalEstimatedCost = cateringBudget + venueBudget + decorBudget + entertainmentBudget;

  return {
    totalBudget: budget,
    totalEstimatedCost,
    currency: req.currency,
    guestCount: guests,
    eventType: req.eventType,
    costPerGuest: Math.round(totalEstimatedCost / guests),
    allocations: [
      {
        category: 'Catering & Food',
        allocatedAmount: cateringBudget,
        percentage: 45,
        vendorSuggestions: [
          {
            id: 'vendor-cat-1',
            name: `${req.foodPreference} Party Buffet Package`,
            category: 'Catering',
            platform: 'Zomato' as const,
            price: Math.round(cateringBudget * 0.7),
            currency: req.currency,
            description: `Curated multi-course catering menu with 3 starters, 3 mains, breads, and dessert for ${guests} people.`,
            matchReason: 'Top rated caterer on Zomato Events with free serving cutlery.',
            url: 'https://www.zomato.com',
            rating: 4.8,
            tag: 'Top Rated Caterer',
          },
          {
            id: 'vendor-cat-2',
            name: 'Beverages, Mocktails & Finger Snacks Assortment',
            category: 'Beverages',
            platform: 'Swiggy' as const,
            price: Math.round(cateringBudget * 0.3),
            currency: req.currency,
            description: 'Fresh mocktail kegs, artisan sodas, and savory finger platters delivered scheduled.',
            matchReason: 'Rapid delivery on Swiggy Instamart/Dineout.',
            url: 'https://www.swiggy.com',
            rating: 4.6,
          },
        ],
      },
      {
        category: 'Venue & Stays',
        allocatedAmount: venueBudget,
        percentage: 22,
        vendorSuggestions: [
          {
            id: 'vendor-ven-1',
            name: `${req.venueType} Booking / Party Hall Access`,
            category: 'Venue & Stay',
            platform: 'OYO' as const,
            price: venueBudget,
            currency: req.currency,
            description: `Pre-booked event hall / villa with parking, air-conditioning, and guest lounge rooms.`,
            matchReason: 'Budget-friendly space via OYO Townhouse or Airbnb.',
            url: 'https://www.oyorooms.com',
            rating: 4.5,
            tag: 'Verified Venue',
          },
        ],
      },
      {
        category: 'Decoration & Lighting',
        allocatedAmount: decorBudget,
        percentage: 18,
        vendorSuggestions: [
          {
            id: 'vendor-dec-1',
            name: `${req.eventType} Theme Decor Kit & Fairy Light Arch`,
            category: 'Decor Supplies',
            platform: 'Amazon' as const,
            price: Math.round(decorBudget * 0.65),
            currency: req.currency,
            description: 'Metallic balloon arch, photo backdrop curtain, and warm string fairy lights.',
            matchReason: 'High visual impact with DIY assembly in under 45 minutes.',
            url: 'https://www.amazon.in/s?k=party+decoration+kit',
            rating: 4.7,
          },
          {
            id: 'vendor-dec-2',
            name: 'Fresh Floral Centerpieces & Table Runners',
            category: 'Floral & Accents',
            platform: 'Other' as const,
            price: Math.round(decorBudget * 0.35),
            currency: req.currency,
            description: 'Seasonal fresh flower arrangements and matching color linen table runners.',
            matchReason: 'Delivered fresh morning of event via Ferns N Petals.',
            url: 'https://www.fnp.com',
            rating: 4.6,
          },
        ],
      },
      {
        category: 'Entertainment & Sound',
        allocatedAmount: entertainmentBudget,
        percentage: 15,
        vendorSuggestions: [
          {
            id: 'vendor-ent-1',
            name: 'High-Wattage Party Speaker with Wireless Mic',
            category: 'Audio',
            platform: 'Amazon' as const,
            price: Math.round(entertainmentBudget * 0.7),
            currency: req.currency,
            description: 'Bluetooth party soundbar with bass boost and karaoke dual wireless microphones.',
            matchReason: 'Eliminates costly external DJ rental for intimate to medium gatherings.',
            url: 'https://www.amazon.in/s?k=party+speaker+with+mic',
            rating: 4.8,
            tag: 'Party Essential',
          },
          {
            id: 'vendor-ent-2',
            name: 'Interactive Party Board Games & Trivia Props',
            category: 'Games',
            platform: 'Flipkart' as const,
            price: Math.round(entertainmentBudget * 0.3),
            currency: req.currency,
            description: 'Icebreaker games, customized photo booth props, and prize tokens.',
            matchReason: 'Keeps guests engaged across all age groups.',
            url: 'https://www.flipkart.com/search?q=party+games',
            rating: 4.5,
          },
        ],
      },
    ],
    timelineChecklist: [
      {
        phase: '1-2 Weeks Before',
        action: `Confirm guest RSVP count (currently planned for ${guests}) and book venue on OYO/Airbnb.`,
        deadline: 'Day -14',
      },
      {
        phase: '5 Days Before',
        action: 'Order decor kit and audio gear from Amazon/Flipkart to test sound and lighting setup.',
        deadline: 'Day -5',
      },
      {
        phase: '2 Days Before',
        action: `Finalize menu and dietary counts with Zomato/Swiggy caterers for ${req.foodPreference}.`,
        deadline: 'Day -2',
      },
      {
        phase: 'Event Day Morning',
        action: 'Assemble balloon arch, check table settings, and do audio/mic sound check.',
        deadline: 'Day 0 (Morning)',
      },
    ],
    tips: [
      'Serve heavy appetizers early to keep guests satisfied while main course is being arranged.',
      'Designate a selfie corner with the balloon arch to maximize memorable photos.',
      'Check venue noise curfew regulations before booking sound equipment.',
    ],
  };
}

export function getMockJewelryPlan(req: JewelryPlanRequest): JewelryPlanResult {
  const budget = req.budget;
  const isGold = req.style.toLowerCase().includes('traditional') || req.style.toLowerCase().includes('temple');
  const primaryMetal = isGold ? 'Yellow Gold / Antique Polish' : 'Sterling Silver & Rose Gold';

  const necklacePrice = Math.round(budget * 0.42);
  const earringsPrice = Math.round(budget * 0.28);
  const banglesPrice = Math.round(budget * 0.18);
  const ringPrice = Math.round(budget * 0.12);

  const totalEstimatedCost = necklacePrice + earringsPrice + banglesPrice + ringPrice;

  return {
    totalBudget: budget,
    totalEstimatedCost,
    currency: req.currency,
    occasion: req.occasion,
    aestheticAnalysis: {
      outfitColorsDetected: ['Royal Navy / Deep Blue', 'Gilded Gold Borders', 'Emerald Accents'],
      necklineDetected: 'Deep Sweetheart / V-Neckline (Ideal for choker or layered collar necklace)',
      recommendedMetal: primaryMetal,
      overallVibe: `${req.style} Elegance tailored for ${req.occasion}`,
    },
    recommendations: [
      {
        pieceType: 'Necklace / Choker',
        item: {
          id: 'jewel-1',
          name: `${req.style} Statement Choker Set with Kundan / CZ Drops`,
          category: 'Necklace',
          platform: 'Tanishq' as const,
          price: necklacePrice,
          currency: req.currency,
          description: `Handcrafted ${primaryMetal} choker designed to sit flush above sweetheart/collar necklines.`,
          matchReason: 'Harmonizes with outfit embroidery while remaining under 45% of total budget.',
          url: 'https://www.tanishq.co.in',
          rating: 4.9,
          tag: 'Showstopper',
        },
      },
      {
        pieceType: 'Earrings / Jhumkas',
        item: {
          id: 'jewel-2',
          name: `Matching Chandbali / Dangler Earrings in ${primaryMetal}`,
          category: 'Earrings',
          platform: 'CaratLane' as const,
          price: earringsPrice,
          currency: req.currency,
          description: 'Lightweight filigree earrings with pearl drops that catch light without pulling the earlobe.',
          matchReason: 'Complements the necklace motif without overpowering the facial profile.',
          url: 'https://www.caratlane.com',
          rating: 4.8,
          tag: 'Best Match',
        },
      },
      {
        pieceType: 'Bangles / Bracelets',
        item: {
          id: 'jewel-3',
          name: 'Kada Style Openable Bracelet Pair with Carved Motifs',
          category: 'Wristwear',
          platform: 'Amazon' as const,
          price: banglesPrice,
          currency: req.currency,
          description: 'Intricately etched twin kada bracelets with secure screw clasp.',
          matchReason: 'Adds rhythmic movement to hands during festivities and photos.',
          url: 'https://www.amazon.in/s?k=gold+plated+kada+bangles',
          rating: 4.6,
        },
      },
      {
        pieceType: 'Rings',
        item: {
          id: 'jewel-4',
          name: 'Solitaire CZ / Polki Adjustable Statement Ring',
          category: 'Ring',
          platform: 'Flipkart' as const,
          price: ringPrice,
          currency: req.currency,
          description: 'Geometric cocktail ring with floral halo rim and adjustable band.',
          matchReason: 'Complete the coordinated look within remaining balance.',
          url: 'https://www.flipkart.com/search?q=statement+cocktail+ring',
          rating: 4.5,
        },
      },
    ],
    stylingTips: [
      'If your neckline has heavy zari embroidery, opt for a choker instead of a long haar to prevent visual clutter.',
      'Pair the warm undertones of the jewelry with a warm-toned matte lipstick for cohesive photography.',
      'Store each jewelry piece in individual moisture-proof pouches after the event to preserve polish.',
    ],
  };
}
