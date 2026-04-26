/* ============================================================
   Yeildpredicto — js/data.js
   All static data: districts, water options, calendar,
   crop subcategories, specific crop details, alternatives
   ============================================================ */

// ── Default detected city ──────────────────────────────────
const DEFAULT_CITY = 'Mangalagiri, Andhra Pradesh';

// ── District map (state → districts) ──────────────────────
const DISTRICT_MAP = {
  'Andhra Pradesh': ['Visakhapatnam','Vijayawada','Guntur','Tirupati','Kakinada','Nellore','Kurnool','Rajahmundry','Kadapa','Anantapur','Krishna','West Godavari','East Godavari','Chittoor','Prakasam'],
  'Telangana':      ['Hyderabad','Warangal','Karimnagar','Khammam','Nizamabad','Nalgonda','Medak','Adilabad','Rangareddy','Mahbubnagar','Siddipet','Mancherial','Jagitial','Suryapet'],
  'Maharashtra':    ['Mumbai','Pune','Nagpur','Nashik','Aurangabad','Solapur','Amravati','Kolhapur','Sangli','Latur','Jalgaon','Ahmednagar','Satara','Ratnagiri'],
  'Karnataka':      ['Bengaluru','Mysuru','Hubli','Mangaluru','Belagavi','Kalaburagi','Davangere','Ballari','Tumkur','Raichur','Shivamogga','Bidar','Vijayapura','Dharwad'],
  'Tamil Nadu':     ['Chennai','Coimbatore','Madurai','Tiruchirappalli','Salem','Tirunelveli','Erode','Vellore','Thanjavur','Tiruppur','Dindigul','Cuddalore','Kancheepuram','Tiruvannamalai'],
  'Uttar Pradesh':  ['Lucknow','Kanpur','Agra','Varanasi','Meerut','Allahabad','Bareilly','Aligarh','Moradabad','Gorakhpur','Jhansi','Mathura','Muzaffarnagar','Saharanpur'],
  'Punjab':         ['Ludhiana','Amritsar','Jalandhar','Patiala','Bathinda','Mohali','Hoshiarpur','Gurdaspur','Firozpur','Moga','Sangrur','Fatehgarh Sahib','Mansa','Barnala'],
  'Gujarat':        ['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar','Junagadh','Gandhinagar','Anand','Mehsana','Kutch','Bharuch','Navsari','Valsad'],
  'Rajasthan':      ['Jaipur','Jodhpur','Kota','Bikaner','Ajmer','Udaipur','Bharatpur','Alwar','Sikar','Pali','Barmer','Nagaur','Churu','Sriganganagar'],
  'Madhya Pradesh': ['Bhopal','Indore','Jabalpur','Gwalior','Ujjain','Sagar','Dewas','Satna','Ratlam','Rewa','Chhindwara','Vidisha','Hoshangabad','Morena'],
  'Bihar':          ['Patna','Gaya','Bhagalpur','Muzaffarpur','Darbhanga','Arrah','Begusarai','Chhapra','Katihar','Munger','Nalanda','Sitamarhi','Samastipur','Vaishali'],
  'West Bengal':    ['Kolkata','Howrah','Durgapur','Asansol','Siliguri','Malda','Murshidabad','Nadia','Burdwan','Midnapore','Jalpaiguri','Cooch Behar','North 24 Parganas','South 24 Parganas'],
  'Kerala':         ['Thiruvananthapuram','Kochi','Kozhikode','Thrissur','Kannur','Alappuzha','Kollam','Palakkad','Malappuram','Kottayam','Idukki','Pathanamthitta','Wayanad','Kasaragod'],
  'Haryana':        ['Faridabad','Gurugram','Panipat','Ambala','Yamunanagar','Rohtak','Hisar','Karnal','Sonipat','Kurukshetra','Sirsa','Bhiwani','Rewari','Jind'],
  'Odisha':         ['Bhubaneswar','Cuttack','Rourkela','Berhampur','Sambalpur','Puri','Balasore','Bhadrak','Baripada','Jharsuguda','Koraput','Kendrapara','Dhenkanal','Angul'],
  'Assam':          ['Guwahati','Silchar','Dibrugarh','Jorhat','Nagaon','Tinsukia','Tezpur','Bongaigaon','Dhubri','Lakhimpur','Cachar','Kamrup','Golaghat','Sonitpur']
};

// ── Water resource options ─────────────────────────────────
const WATER_OPTIONS = [
  { label: 'Rainwater / Rainfed',     icon: 'RAIN', detail: 'Monsoon rain, rooftop collection, or open-field rainwater.' },
  { label: 'Borewell / Groundwater',  icon: 'WELL', detail: 'Tube well or borewell water available near the farm.' },
  { label: 'Open Well',               icon: 'WELL', detail: 'Traditional dug well or shared community well.' },
  { label: 'Canal Irrigation',        icon: 'CANAL', detail: 'Government canal, channel, or distributary water.' },
  { label: 'River / Stream Nearby',   icon: 'RIVER', detail: 'Flowing surface water close enough for farm use.' },
  { label: 'Farm Pond / Lake',        icon: 'POND', detail: 'Stored surface water in a pond, lake, or small check dam.' },
  { label: 'Tank / Reservoir',        icon: 'TANK', detail: 'Village tank, storage reservoir, or harvested water body.' },
  { label: 'Drip / Sprinkler System', icon: 'DRIP', detail: 'Micro-irrigation system for efficient water delivery.' }
];

// ── Crop calendar data ─────────────────────────────────────
const CALENDAR_DATA = {
  January:   { crops: ['Wheat','Mustard','Peas','Masoor'],           img: '../images/peas.png' },
  February:  { crops: ['Wheat','Chana','Sunflower'],                 img: '../images/sunflowerr.png' },
  March:     { crops: ['Sugarcane','Vegetables','Maize'],             img: '../images/sugarcane.png' },
  April:     { crops: ['Cotton','Groundnut','Vegetables','Watermelon'], img: '../images/moong.png' },
  May:       { crops: ['Paddy Nursery','Jowar','Maize'],             img: '../images/jowar.png' },
  June:      { crops: ['Rice','Maize','Soybean','Cotton'],            img: '../images/rice.png' },
  July:      { crops: ['Rice','Sorghum','Bajra','Groundnut'],         img: '../images/groundnut.png' },
  August:    { crops: ['Rice','Maize','Pulses'],                      img: '../images/maize.png' },
  September: { crops: ['Rice','Vegetables','Maize'],                  img: '../images/rice.png' },
  October:   { crops: ['Wheat (sow)','Mustard','Potato'],             img: '../images/wheat.png' },
  November:  { crops: ['Wheat','Barley','Peas','Potato'],             img: '../images/potato.png' },
  December:  { crops: ['Wheat','Mustard','Vegetables','Masoor'],      img: '../images/mustard.png' }
};

// ── Marquee images ─────────────────────────────────────────
const MARQUEE_ITEMS = [
  { label: 'niger',     img: '../images/niger.png' },
  { label: 'linseed',   img: '../images/linseed.png' },
  { label: 'mango',     img: '../images/mango.png' },
  { label: 'masoor',    img: '../images/masoor.png' },
  { label: 'moong',     img: '../images/moong.png' },
  { label: 'moth bean', img: '../images/moth bean.png' },
  { label: 'mustard',   img: '../images/mustard.png' },
  { label: 'oats',      img: '../images/oats.png' },
  { label: 'onion',     img: '../images/onion.png' },
  { label: 'papaya',    img: '../images/papaya.png' },
  { label: 'peas',      img: '../images/peas.png' },
  { label: 'potato',    img: '../images/potato.png' },
  { label: 'pumpkin',   img: '../images/pumpkin.png' },
  { label: 'Rajma',     img: '../images/Rajma.png' },
  { label: 'rapeseed',  img: '../images/rapaseed.png' },
  { label: 'soyabean',  img: '../images/soyabean.png' },
  { label: 'sugarcane', img: '../images/sugarcane.png' },
  { label: 'sunflower', img: '../images/sunflowerr.png' },
  { label: 'tea',       img: '../images/tea.png' },
  { label: 'spinach',   img: '../images/spinach.png' },
  { label: 'sorghum',   img: '../images/sorghum.png' },
  { label: 'sesame',    img: '../images/sesame.png' },
  { label: 'safflower', img: '../images/safflower.png' },
  { label: 'rubber',    img: '../images/rubber.png' },
  { label: 'okra',      img: '../images/okra.png' },
  { label: 'rice',      img: '../images/rice.png' },
  { label: 'jute',      img: '../images/jute.png' },
  { label: 'horsegram', img: '../images/horsegram.png' },
  { label: 'jowar',     img: '../images/jowar.png' },
  { label: 'indigo',    img: '../images/indigo.png' },
  { label: 'maize',     img: '../images/maize.png' },
  { label: 'groundnut', img: '../images/groundnut.png' },
  { label: 'grapes',    img: '../images/grapes.png' },
];

/* ============================================================
   CROP SUBCATEGORIES
   ============================================================ */
const CROP_SUBCATEGORIES = {

  // ── VEGETABLES ──────────────────────────────────────────
  veg: [
    {
      id: 'brinjal', name: 'Brinjal', sci: 'Solanum melongena',
      yield: 18, yieldLow: 12, yieldHigh: 24,
      marketPrice: 900, waterNeed: 'Medium', season: 'Year Round',
      soil: 'Well-drained Loamy', duration: '90–120 days', score: 85,
      tags: ['Low Input','Hardy Crop','Multiple Harvest'],
      pros: ['Tolerates heat well','Continuous harvest','Low input cost'],
      cons: ['Fruit borer attack','Needs frequent spraying'],
      img: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=700&q=80'
    },
    {
      id: 'cabbage', name: 'Cabbage', sci: 'Brassica oleracea var. capitata',
      yield: 18, yieldLow: 12, yieldHigh: 25,
      marketPrice: 800, waterNeed: 'Medium', season: 'Rabi (Oct–Feb)',
      soil: 'Loamy / Clay Loam', duration: '80–100 days', score: 78,
      tags: ['Cool Season','High Volume','Market Staple'],
      pros: ['Good yield per acre','Consistent local demand','Easy to grow'],
      cons: ['Caterpillar attack','Requires cool weather','Low price per kg'],
      img: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=700&q=80'
    },
    {
      id: 'carrot', name: 'Carrot', sci: 'Daucus carota',
      yield: 12, yieldLow: 8, yieldHigh: 18,
      marketPrice: 1500, waterNeed: 'Medium', season: 'Rabi (Oct–Feb)',
      soil: 'Sandy Loam / Loamy', duration: '80–100 days', score: 76,
      tags: ['Root Crop','Rabi Season','Good Price'],
      pros: ['Good market price','Deep root loosens soil','Stores well'],
      cons: ['Needs loose deep soil','Cracking in heavy rain'],
      img: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=700&q=80'
    },
    {
      id: 'cauliflower', name: 'Cauliflower', sci: 'Brassica oleracea var. botrytis',
      yield: 14, yieldLow: 9, yieldHigh: 20,
      marketPrice: 1200, waterNeed: 'Medium', season: 'Rabi (Oct–Feb)',
      soil: 'Loamy / Clay Loam', duration: '60–90 days', score: 77,
      tags: ['Cool Season','Short Duration','Urban Demand'],
      pros: ['High urban demand','Short crop cycle','Good price during winter'],
      cons: ['Needs cool weather','Susceptible to head browning'],
      img: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=700&q=80'
    },
    {
      id: 'garlic', name: 'Garlic', sci: 'Allium sativum',
      yield: 4.0, yieldLow: 3.0, yieldHigh: 6.0,
      marketPrice: 11000, waterNeed: 'Medium', season: 'Rabi (Oct–Mar)',
      soil: 'Sandy Loam / Loam', duration: '130–160 days', score: 83,
      tags: ['Highest Revenue','Medicinal Demand','Storable'],
      pros: ['Highest revenue per acre among spices','Very long shelf life','Medicinal boom demand'],
      cons: ['Needs cool climate','Purple blotch disease'],
      img: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=700&q=80'
    },
    {
      id: 'onion', name: 'Onion', sci: 'Allium cepa',
      yield: 10, yieldLow: 7, yieldHigh: 15,
      marketPrice: 2500, waterNeed: 'Medium', season: 'Rabi (Oct–Feb)',
      soil: 'Sandy Loam', duration: '110–130 days', score: 80,
      tags: ['High Demand','Storable','Cash Crop'],
      pros: ['Long shelf life','High export demand','Good price stability'],
      cons: ['Sensitive to waterlogging','Requires cool weather'],
      img: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=700&q=80'
    },
    {
      id: 'potato', name: 'Potato', sci: 'Solanum tuberosum',
      yield: 14, yieldLow: 10, yieldHigh: 20,
      marketPrice: 1100, waterNeed: 'Medium', season: 'Rabi (Oct–Feb)',
      soil: 'Loamy / Sandy Loam', duration: '75–100 days', score: 78,
      tags: ['Staple Crop','High Yield','Cold Season'],
      pros: ['Huge domestic demand','High calorie crop','Good yield'],
      cons: ['Needs cold nights','Late blight disease risk'],
      img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700&q=80'
    },
    {
      id: 'pumpkin', name: 'Pumpkin', sci: 'Cucurbita maxima',
      yield: 20, yieldLow: 14, yieldHigh: 28,
      marketPrice: 700, waterNeed: 'Medium', season: 'Kharif (Jun–Sep)',
      soil: 'Sandy Loam / Loam', duration: '90–120 days', score: 72,
      tags: ['High Volume','Creeper Crop','Low Maintenance'],
      pros: ['Very high yield','Low input cost','Dual use vegetable + seed'],
      cons: ['Low market price','Needs space for vines'],
      img: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=700&q=80'
    },
    {
      id: 'spinach', name: 'Spinach', sci: 'Spinacia oleracea',
      yield: 6, yieldLow: 4, yieldHigh: 9,
      marketPrice: 1800, waterNeed: 'Low', season: 'Rabi (Oct–Feb)',
      soil: 'Sandy Loam / Loam', duration: '30–45 days', score: 72,
      tags: ['Quick Harvest','Urban Market','Leafy Vegetable'],
      pros: ['Fastest harvest cycle','High urban demand','Can sell multiple cuts'],
      cons: ['Very perishable','Low per-acre revenue'],
      img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=700&q=80'
    },
    {
      id: 'tomato', name: 'Tomato', sci: 'Solanum lycopersicum',
      yield: 20, yieldLow: 14, yieldHigh: 28,
      marketPrice: 1200, waterNeed: 'Medium', season: 'Year Round',
      soil: 'Loamy / Sandy Loam', duration: '70–90 days', score: 88,
      tags: ['High Value','Drip Friendly','Year Round'],
      pros: ['High market demand','Short duration','Multiple harvests'],
      cons: ['Pest prone','Needs staking support','Price fluctuations'],
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=700&q=80'
    },
    {
      id: 'okra', name: 'Okra (Ladyfinger)', sci: 'Abelmoschus esculentus',
      yield: 8, yieldLow: 5, yieldHigh: 12,
      marketPrice: 1400, waterNeed: 'Low', season: 'Kharif (Jun–Sep)',
      soil: 'Sandy Loam / Loam', duration: '50–65 days', score: 82,
      tags: ['Drought Tolerant','Fast Harvest','Low Water'],
      pros: ['Short crop duration','Low water need','Consistent demand'],
      cons: ['Hand-picking labour intensive','Stings during harvest'],
      img: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=700&q=80'
    }
  ],

  // ── FRUITS ──────────────────────────────────────────────
  fruits: [
    {
      id: 'banana', name: 'Banana', sci: 'Musa paradisiaca',
      yield: 35, yieldLow: 25, yieldHigh: 45,
      marketPrice: 1500, waterNeed: 'High', season: 'Year Round',
      soil: 'Alluvial / Loamy', duration: '10–15 months', score: 87,
      tags: ['High Yield','Perennial','Tropical'],
      pros: ['Very high yield','Year round harvest','Strong demand'],
      cons: ['Needs lots of water','Wind damage risk','Long duration'],
      img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=700&q=80'
    },
    {
      id: 'grapes', name: 'Grapes', sci: 'Vitis vinifera',
      yield: 10, yieldLow: 7, yieldHigh: 15,
      marketPrice: 6000, waterNeed: 'Medium', season: 'Rabi–Summer (Jan–May)',
      soil: 'Sandy Loam / Loam', duration: '2–3 years first harvest', score: 74,
      tags: ['Premium Fruit','Export Quality','Perennial'],
      pros: ['Very high price per kg','Export demand','Long productive life'],
      cons: ['High establishment cost','Needs training / trellis system','Disease prone in humid conditions'],
      img: 'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=700&q=80'
    },
    {
      id: 'mango', name: 'Mango', sci: 'Mangifera indica',
      yield: 8, yieldLow: 5, yieldHigh: 12,
      marketPrice: 4000, waterNeed: 'Low', season: 'Summer (Apr–Jun)',
      soil: 'Loamy / Alluvial', duration: '4–5 years first harvest', score: 78,
      tags: ['Premium Fruit','Low Water','Long Term Investment'],
      pros: ['Very high market price','Low water after establishment','Long productive life'],
      cons: ['Takes 4+ years to produce','Alternate bearing problem'],
      img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=700&q=80'
    },
    {
      id: 'papaya', name: 'Papaya', sci: 'Carica papaya',
      yield: 40, yieldLow: 28, yieldHigh: 55,
      marketPrice: 1200, waterNeed: 'Medium', season: 'Year Round',
      soil: 'Loamy / Sandy Loam', duration: '9–12 months', score: 84,
      tags: ['Fast Return','High Yield','Tropical'],
      pros: ['Fastest fruit crop return','Very high yield','Dual use fruit+raw'],
      cons: ['Stem rot in waterlogged soil','Wind damage'],
      img: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=700&q=80'
    }
  ],

  // ── CEREALS / GRAINS ────────────────────────────────────
  rice: [
    {
      id: 'bajra', name: 'Bajra (Pearl Millet)', sci: 'Pennisetum glaucum',
      yield: 2.0, yieldLow: 1.2, yieldHigh: 3.0,
      marketPrice: 2250, waterNeed: 'Low', season: 'Kharif (Jun–Sep)',
      soil: 'Sandy / Light Loamy', duration: '65–90 days', score: 75,
      tags: ['Drought Hardy','Sandy Soil','Short Duration'],
      pros: ['Very drought resistant','Short crop cycle','Growing health food demand'],
      cons: ['Lower yield','Downy mildew disease risk'],
      img: 'https://images.unsplash.com/photo-1623744840283-b5ccbb0f8da4?w=700&q=80'
    },
    {
      id: 'barley', name: 'Barley', sci: 'Hordeum vulgare',
      yield: 2.8, yieldLow: 2.0, yieldHigh: 3.8,
      marketPrice: 1700, waterNeed: 'Low', season: 'Rabi (Oct–Mar)',
      soil: 'Sandy Loam / Loam', duration: '90–110 days', score: 72,
      tags: ['Drought Tolerant','Rabi Crop','Industrial Use'],
      pros: ['Low water requirement','Used in brewery & malt industry','Grows in marginal soils'],
      cons: ['Lower market price','Limited local demand'],
      img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&q=80'
    },
    {
      id: 'jowar', name: 'Jowar (Sorghum)', sci: 'Sorghum bicolor',
      yield: 2.5, yieldLow: 1.8, yieldHigh: 3.5,
      marketPrice: 2100, waterNeed: 'Low', season: 'Kharif / Rabi',
      soil: 'Any – even Poor Soils', duration: '100–120 days', score: 78,
      tags: ['Drought Tolerant','Low Water','Nutritious'],
      pros: ['Extremely drought tolerant','Grows in poor soils','Nutritional grain'],
      cons: ['Lower market infrastructure','Price support less than rice/wheat'],
      img: 'https://images.unsplash.com/photo-1602524816-89739ecde3a1?w=700&q=80'
    },
    {
      id: 'maize', name: 'Maize (Corn)', sci: 'Zea mays',
      yield: 5.0, yieldLow: 3.5, yieldHigh: 7.0,
      marketPrice: 1800, waterNeed: 'Medium', season: 'Kharif / Rabi',
      soil: 'Loamy / Sandy Loam', duration: '80–110 days', score: 88,
      tags: ['High Yield','Versatile','Animal Feed'],
      pros: ['Higher yield than wheat','Dual use grain + feed','Growing demand'],
      cons: ['Fall armyworm threat','Price volatile'],
      img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=700&q=80'
    },
    {
      id: 'oats', name: 'Oats', sci: 'Avena sativa',
      yield: 2.0, yieldLow: 1.4, yieldHigh: 2.8,
      marketPrice: 2800, waterNeed: 'Low', season: 'Rabi (Oct–Feb)',
      soil: 'Sandy Loam / Loam', duration: '90–120 days', score: 68,
      tags: ['Health Food','Rabi Crop','Fodder Use'],
      pros: ['Growing health food demand','Can be used as green fodder','Low water need'],
      cons: ['Limited procurement infrastructure','Low yield'],
      img: 'https://images.unsplash.com/photo-1614961908687-5d3e1a5a1a5a?w=700&q=80'
    },
    {
      id: 'ragi', name: 'Ragi (Finger Millet)', sci: 'Eleusine coracana',
      yield: 1.8, yieldLow: 1.2, yieldHigh: 2.5,
      marketPrice: 3200, waterNeed: 'Low', season: 'Kharif (Jun–Sep)',
      soil: 'Sandy Loam / Red Soil', duration: '90–120 days', score: 76,
      tags: ['Superfood','Drought Hardy','Nutritious'],
      pros: ['High calcium & iron content','Drought tolerant','Growing health food market'],
      cons: ['Low yield','Threshing is labour intensive'],
      img: 'https://images.unsplash.com/photo-1505471768190-275e2ad7b3f9?w=700&q=80'
    },
    {
      id: 'rice', name: 'Rice (Paddy)', sci: 'Oryza sativa',
      yield: 4.2, yieldLow: 3.0, yieldHigh: 5.5,
      marketPrice: 2000, waterNeed: 'High', season: 'Kharif (Jun–Oct)',
      soil: 'Clay / Loamy Clay', duration: '90–150 days', score: 92,
      tags: ['Staple Crop','Kharif','High Water'],
      pros: ['Stable government support price','Huge demand','Good infrastructure'],
      cons: ['Water intensive','Labour intensive','Methane emission concern'],
      img: 'https://images.unsplash.com/photo-1536054024-cbfdbf2ca5f8?w=700&q=80'
    },
    {
      id: 'sorghum', name: 'Sorghum', sci: 'Sorghum bicolor',
      yield: 2.5, yieldLow: 1.8, yieldHigh: 3.5,
      marketPrice: 2100, waterNeed: 'Low', season: 'Kharif / Rabi',
      soil: 'Any – even Poor Soils', duration: '100–120 days', score: 78,
      tags: ['Drought Tolerant','Low Water','Industrial Use'],
      pros: ['Very drought tolerant','Multiple end-uses','Grows in marginal soils'],
      cons: ['Lower market price','Limited local procurement'],
      img: 'https://images.unsplash.com/photo-1602524816-89739ecde3a1?w=700&q=80'
    },
    {
      id: 'triticale', name: 'Triticale', sci: 'Triticosecale',
      yield: 3.0, yieldLow: 2.2, yieldHigh: 4.0,
      marketPrice: 1900, waterNeed: 'Low', season: 'Rabi (Oct–Mar)',
      soil: 'Sandy Loam / Loam', duration: '100–125 days', score: 65,
      tags: ['Hybrid Crop','Rabi Season','Fodder Use'],
      pros: ['Better than wheat in marginal soils','Dual grain + fodder use','Tolerates acidity'],
      cons: ['Very limited market','Low awareness among farmers'],
      img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&q=80'
    },
    {
      id: 'wheat', name: 'Wheat', sci: 'Triticum aestivum',
      yield: 3.5, yieldLow: 2.5, yieldHigh: 4.8,
      marketPrice: 2200, waterNeed: 'Medium', season: 'Rabi (Nov–Apr)',
      soil: 'Loamy / Clay Loam', duration: '100–130 days', score: 85,
      tags: ['Rabi Crop','MSP Supported','Staple'],
      pros: ['Government MSP support','Less water than rice','Long storage'],
      cons: ['Needs cool climate','Rust disease risk'],
      img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&q=80'
    },
    {
      id: 'foddermaize', name: 'Fodder Maize', sci: 'Zea mays (fodder type)',
      yield: 35, yieldLow: 25, yieldHigh: 50,
      marketPrice: 350, waterNeed: 'Medium', season: 'Kharif / Rabi',
      soil: 'Loamy / Sandy Loam', duration: '60–75 days', score: 70,
      tags: ['Livestock Feed','Short Duration','High Biomass'],
      pros: ['Very high green biomass','Short duration','Consistent dairy demand'],
      cons: ['Low value per tonne','Only viable near dairy farms'],
      img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=700&q=80'
    }
  ],

  // ── PULSES ──────────────────────────────────────────────
  pulses: [
    {
      id: 'chana', name: 'Chana (Chickpea)', sci: 'Cicer arietinum',
      yield: 1.2, yieldLow: 0.8, yieldHigh: 1.8,
      marketPrice: 5000, waterNeed: 'Low', season: 'Rabi (Oct–Feb)',
      soil: 'Sandy Loam / Loam', duration: '90–110 days', score: 88,
      tags: ['High Price','Nitrogen Fix','Rabi Ideal'],
      pros: ['Very high market price','Improves soil nitrogen','Low water need'],
      cons: ['Pod borer pest','Sensitive to frost'],
      img: 'https://images.unsplash.com/photo-1574885594230-4c5428e9a91f?w=700&q=80'
    },
    {
      id: 'cowpea', name: 'Cowpea', sci: 'Vigna unguiculata',
      yield: 0.9, yieldLow: 0.6, yieldHigh: 1.4,
      marketPrice: 5500, waterNeed: 'Low', season: 'Kharif / Zaid',
      soil: 'Sandy Loam / Loam', duration: '60–90 days', score: 74,
      tags: ['Drought Hardy','Short Duration','Soil Improver'],
      pros: ['Very drought tolerant','Nitrogen fixation','Short crop cycle'],
      cons: ['Low yield','Limited market in some regions'],
      img: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=700&q=80'
    },
    {
      id: 'horsegram', name: 'Horsegram', sci: 'Macrotyloma uniflorum',
      yield: 0.7, yieldLow: 0.4, yieldHigh: 1.0,
      marketPrice: 6000, waterNeed: 'Low', season: 'Rabi (Oct–Jan)',
      soil: 'Poor / Red Laterite Soil', duration: '90–120 days', score: 70,
      tags: ['Dryland Crop','Medicinal Use','Drought Hardy'],
      pros: ['Extremely drought tolerant','Grows in poorest soils','Medicinal demand'],
      cons: ['Very low yield','Limited procurement centres'],
      img: 'https://images.unsplash.com/photo-1583524505974-6facd53f4597?w=700&q=80'
    },
    {
      id: 'masoor', name: 'Masoor (Lentil)', sci: 'Lens culinaris',
      yield: 0.9, yieldLow: 0.6, yieldHigh: 1.3,
      marketPrice: 5500, waterNeed: 'Low', season: 'Rabi (Nov–Mar)',
      soil: 'Sandy Loam / Clay Loam', duration: '100–120 days', score: 80,
      tags: ['High Protein','Low Water','Rabi'],
      pros: ['High protein demand','Nitrogen fixation','Good export market'],
      cons: ['Low yield per acre','Rust disease susceptibility'],
      img: 'https://images.unsplash.com/photo-1583524505974-6facd53f4597?w=700&q=80'
    },
    {
      id: 'moong', name: 'Moong (Green Gram)', sci: 'Vigna radiata',
      yield: 0.8, yieldLow: 0.5, yieldHigh: 1.2,
      marketPrice: 6000, waterNeed: 'Low', season: 'Kharif / Zaid',
      soil: 'Sandy Loam / Loam', duration: '60–75 days', score: 82,
      tags: ['Short Duration','High Price','Low Water'],
      pros: ['Very short crop duration','High market price','Fits Zaid season'],
      cons: ['Low yield','Yellow mosaic virus risk'],
      img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=700&q=80'
    },
    {
      id: 'mothbean', name: 'Moth Bean', sci: 'Vigna aconitifolia',
      yield: 0.6, yieldLow: 0.4, yieldHigh: 0.9,
      marketPrice: 5800, waterNeed: 'Low', season: 'Kharif (Jun–Sep)',
      soil: 'Sandy / Arid Soils', duration: '65–90 days', score: 68,
      tags: ['Arid Zone Crop','Extreme Drought Hardy','Desert Pulse'],
      pros: ['Survives near-zero rainfall','Fixes nitrogen','Nutritional value'],
      cons: ['Very low yield','Niche market'],
      img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=700&q=80'
    },
    {
      id: 'peas', name: 'Peas', sci: 'Pisum sativum',
      yield: 3.5, yieldLow: 2.5, yieldHigh: 5.0,
      marketPrice: 3000, waterNeed: 'Low', season: 'Rabi (Oct–Jan)',
      soil: 'Sandy Loam / Loam', duration: '60–90 days', score: 76,
      tags: ['Short Duration','Vegetable + Grain','Cool Season'],
      pros: ['Quick harvest','Dual market – vegetable & dry grain','Nitrogen fixation'],
      cons: ['Powdery mildew disease','Needs cool temperatures'],
      img: 'https://images.unsplash.com/photo-1587735234168-f0f56c7df6f2?w=700&q=80'
    },
    {
      id: 'rajma', name: 'Rajma (Kidney Bean)', sci: 'Phaseolus vulgaris',
      yield: 1.0, yieldLow: 0.7, yieldHigh: 1.5,
      marketPrice: 7000, waterNeed: 'Medium', season: 'Rabi (Oct–Feb)',
      soil: 'Loamy / Sandy Loam', duration: '90–120 days', score: 72,
      tags: ['Premium Pulse','Hill Crop','High Price'],
      pros: ['Very high market price','Niche premium market','Good in cooler regions'],
      cons: ['Very low yield','Needs cool climate','Limited cultivation zone'],
      img: 'https://images.unsplash.com/photo-1574885594230-4c5428e9a91f?w=700&q=80'
    },
    {
      id: 'turarhar', name: 'Tur / Arhar (Pigeon Pea)', sci: 'Cajanus cajan',
      yield: 1.0, yieldLow: 0.7, yieldHigh: 1.5,
      marketPrice: 6500, waterNeed: 'Low', season: 'Kharif (Jun–Oct)',
      soil: 'Loamy / Sandy Loam', duration: '130–160 days', score: 78,
      tags: ['Very High Price','Drought Hardy','Kharif'],
      pros: ['Highest price among pulses','Very drought tolerant','Long harvest period'],
      cons: ['Long crop duration','Wilt disease risk'],
      img: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=700&q=80'
    },
    {
      id: 'urad', name: 'Urad (Black Gram)', sci: 'Vigna mungo',
      yield: 0.75, yieldLow: 0.5, yieldHigh: 1.1,
      marketPrice: 6200, waterNeed: 'Low', season: 'Kharif / Rabi',
      soil: 'Loamy / Clay Loam', duration: '70–90 days', score: 76,
      tags: ['High Value','Short Duration','Double Season'],
      pros: ['Can be grown in both Kharif & Rabi','High market price','Short duration'],
      cons: ['Mosaic virus','Very low yield'],
      img: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=700&q=80'
    }
  ],

  // ── CASH CROPS ──────────────────────────────────────────
  cash: [
    {
      id: 'cotton', name: 'Cotton', sci: 'Gossypium hirsutum',
      yield: 2.1, yieldLow: 1.4, yieldHigh: 3.0,
      marketPrice: 6500, waterNeed: 'Medium', season: 'Kharif (May–Nov)',
      soil: 'Black / Clay Loam', duration: '150–180 days', score: 83,
      tags: ['High Value','Black Soil','Cash Crop'],
      pros: ['Very high income per acre','Government MSP support','Export demand'],
      cons: ['Bollworm attack','Long season','Needs deep soil'],
      img: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=700&q=80'
    },
    {
      id: 'jute', name: 'Jute', sci: 'Corchorus olitorius',
      yield: 2.8, yieldLow: 2.0, yieldHigh: 3.8,
      marketPrice: 4500, waterNeed: 'High', season: 'Kharif (Apr–Sep)',
      soil: 'Alluvial / Sandy Loam', duration: '100–120 days', score: 65,
      tags: ['Industrial Fibre','Eastern India','Eco-Friendly'],
      pros: ['Government support','Eco-friendly crop','Mill demand'],
      cons: ['Limited to specific regions','Labour intensive harvesting'],
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80'
    },
    {
      id: 'sugarcane', name: 'Sugarcane', sci: 'Saccharum officinarum',
      yield: 68, yieldLow: 50, yieldHigh: 90,
      marketPrice: 350, waterNeed: 'High', season: 'Year Round',
      soil: 'Loamy / Clay Loam', duration: '10–12 months', score: 80,
      tags: ['Very High Yield','Water Intensive','Mill Contract'],
      pros: ['Guaranteed mill purchase','Very high tonnage','Ratoon crop saves cost'],
      cons: ['Very water intensive','Long crop period','Price fixed by govt'],
      img: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=700&q=80'
    },
    {
      id: 'tobacco', name: 'Tobacco', sci: 'Nicotiana tabacum',
      yield: 1.2, yieldLow: 0.8, yieldHigh: 1.8,
      marketPrice: 12000, waterNeed: 'Medium', season: 'Rabi (Oct–Feb)',
      soil: 'Sandy Loam / Light Loamy', duration: '100–130 days', score: 70,
      tags: ['High Value','Export Crop','Rabi Season'],
      pros: ['Very high price per kg','Strong export market','Government regulated procurement'],
      cons: ['Health regulation restrictions','Soil depletion over years','Limited to licensed areas'],
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80'
    },
    {
      id: 'rubber', name: 'Rubber', sci: 'Hevea brasiliensis',
      yield: 0.8, yieldLow: 0.5, yieldHigh: 1.2,
      marketPrice: 18000, waterNeed: 'High', season: 'Perennial (7+ years)',
      soil: 'Laterite / Well-drained Loamy', duration: '7 years first harvest', score: 62,
      tags: ['Perennial','Industrial Crop','Kerala-Specific'],
      pros: ['Very high price per kg','Perennial income for decades','Rubber board support'],
      cons: ['7 years to first latex','Only suited to humid tropics','Price linked to global market'],
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80'
    },
    {
      id: 'coffee', name: 'Coffee', sci: 'Coffea arabica / canephora',
      yield: 1.0, yieldLow: 0.6, yieldHigh: 1.5,
      marketPrice: 22000, waterNeed: 'High', season: 'Perennial (3+ years)',
      soil: 'Rich Loamy / Well-drained Hill Soil', duration: '3 years first harvest', score: 60,
      tags: ['Premium Export','Hill Crop','Perennial'],
      pros: ['Extremely high export price','Perennial income','Coffee Board support'],
      cons: ['Restricted to hill zones','High establishment cost','Needs shade trees'],
      img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=80'
    },
    {
      id: 'tea', name: 'Tea', sci: 'Camellia sinensis',
      yield: 1.5, yieldLow: 1.0, yieldHigh: 2.2,
      marketPrice: 20000, waterNeed: 'High', season: 'Perennial (3+ years)',
      soil: 'Acidic Loamy Hill Soil', duration: '3 years first pluck', score: 58,
      tags: ['Perennial','Export Crop','Hill Zones'],
      pros: ['High price per kg','Stable global demand','Tea Board procurement'],
      cons: ['Only grows in specific hill areas','Very high establishment cost','Labour intensive plucking'],
      img: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=700&q=80'
    }
  ],

  // ── OILSEEDS ────────────────────────────────────────────
  oil: [
    {
      id: 'castor', name: 'Castor', sci: 'Ricinus communis',
      yield: 1.2, yieldLow: 0.8, yieldHigh: 1.8,
      marketPrice: 6000, waterNeed: 'Low', season: 'Kharif (Jun–Nov)',
      soil: 'Sandy Loam / Red Soil', duration: '150–180 days', score: 74,
      tags: ['Industrial Oil','Drought Hardy','Long Duration'],
      pros: ['Very drought tolerant','Industrial + pharmaceutical demand','Government MSP'],
      cons: ['Long crop duration','Toxic seed handling required','Niche market'],
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=700&q=80'
    },
    {
      id: 'groundnut', name: 'Groundnut', sci: 'Arachis hypogaea',
      yield: 1.8, yieldLow: 1.2, yieldHigh: 2.6,
      marketPrice: 5500, waterNeed: 'Low', season: 'Kharif / Rabi',
      soil: 'Sandy Loam / Red Soil', duration: '90–130 days', score: 86,
      tags: ['Sandy Soil','Low Water','Oil + Food'],
      pros: ['Dual use oil + snack market','Nitrogen fixation','Low input'],
      cons: ['Aflatoxin contamination risk','Pod borer pest'],
      img: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=700&q=80'
    },
    {
      id: 'linseed', name: 'Linseed (Flaxseed)', sci: 'Linum usitatissimum',
      yield: 0.8, yieldLow: 0.5, yieldHigh: 1.2,
      marketPrice: 5500, waterNeed: 'Low', season: 'Rabi (Oct–Feb)',
      soil: 'Loamy / Clay Loam', duration: '90–120 days', score: 68,
      tags: ['Omega-3 Rich','Low Water','Industrial Fibre'],
      pros: ['Growing health supplement demand','Dual oil + fibre crop','Low water need'],
      cons: ['Low yield','Limited local procurement'],
      img: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=700&q=80'
    },
    {
      id: 'mustard', name: 'Mustard (Rapeseed)', sci: 'Brassica juncea',
      yield: 1.2, yieldLow: 0.8, yieldHigh: 1.8,
      marketPrice: 5200, waterNeed: 'Low', season: 'Rabi (Oct–Feb)',
      soil: 'Loamy / Clay Loam', duration: '100–120 days', score: 82,
      tags: ['Low Water','Rabi Ideal','MSP Supported'],
      pros: ['Very low water requirement','Government MSP','Easy to grow'],
      cons: ['Aphid attack in cold','Low yield compared to other oilseeds'],
      img: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=700&q=80'
    },
    {
      id: 'niger', name: 'Niger Seed', sci: 'Guizotia abyssinica',
      yield: 0.6, yieldLow: 0.4, yieldHigh: 0.9,
      marketPrice: 5800, waterNeed: 'Low', season: 'Kharif (Jun–Nov)',
      soil: 'Red Laterite / Sandy Loam', duration: '90–120 days', score: 65,
      tags: ['Tribal Belt Crop','Dryland Oilseed','Bird Feed'],
      pros: ['Grows in marginal soils','Good price per kg','Bird seed export market'],
      cons: ['Very low yield','Limited market infrastructure'],
      img: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=700&q=80'
    },
    {
      id: 'rapeseed', name: 'Rapeseed', sci: 'Brassica napus',
      yield: 1.3, yieldLow: 0.9, yieldHigh: 1.9,
      marketPrice: 5000, waterNeed: 'Low', season: 'Rabi (Oct–Feb)',
      soil: 'Loamy / Sandy Loam', duration: '100–120 days', score: 76,
      tags: ['Edible Oil','Rabi Crop','Low Water'],
      pros: ['Good edible oil quality','Low water need','Similar to mustard cultivation'],
      cons: ['Sometimes confused with mustard in market','Aphid susceptibility'],
      img: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=700&q=80'
    },
    {
      id: 'sesame', name: 'Sesame (Til)', sci: 'Sesamum indicum',
      yield: 0.6, yieldLow: 0.4, yieldHigh: 0.9,
      marketPrice: 9000, waterNeed: 'Low', season: 'Kharif (Jun–Sep)',
      soil: 'Sandy Loam / Well-drained Loam', duration: '75–95 days', score: 75,
      tags: ['Premium Oil','Short Duration','Drought Hardy'],
      pros: ['Very high price per kg','Short duration','Drought tolerant'],
      cons: ['Very low yield','Capsule shattering at harvest'],
      img: 'https://images.unsplash.com/photo-1631209121750-a9f656d28f21?w=700&q=80'
    },
    {
      id: 'soybean', name: 'Soybean', sci: 'Glycine max',
      yield: 1.5, yieldLow: 1.0, yieldHigh: 2.2,
      marketPrice: 4200, waterNeed: 'Medium', season: 'Kharif (Jun–Oct)',
      soil: 'Loamy / Clay Loam', duration: '90–110 days', score: 80,
      tags: ['Protein Rich','Kharif Oilseed','Industrial Use'],
      pros: ['High protein content','Growing industrial demand','Nitrogen fixation'],
      cons: ['Yellow mosaic disease','Needs good drainage'],
      img: 'https://images.unsplash.com/photo-1571912493988-4c3a4d16df97?w=700&q=80'
    },
    {
      id: 'sunflower', name: 'Sunflower', sci: 'Helianthus annuus',
      yield: 1.4, yieldLow: 0.9, yieldHigh: 2.0,
      marketPrice: 5000, waterNeed: 'Medium', season: 'Rabi / Zaid',
      soil: 'Loamy / Sandy Loam', duration: '90–110 days', score: 78,
      tags: ['Premium Oil','Short Duration','Kharif + Rabi'],
      pros: ['Premium quality oil','Grows in both seasons','Bird resistant'],
      cons: ['Head rot disease','Downy mildew'],
      img: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=700&q=80'
    },
    {
      id: 'safflower', name: 'Safflower', sci: 'Carthamus tinctorius',
      yield: 0.8, yieldLow: 0.5, yieldHigh: 1.2,
      marketPrice: 5800, waterNeed: 'Low', season: 'Rabi (Oct–Mar)',
      soil: 'Black / Clay Loam', duration: '120–150 days', score: 70,
      tags: ['Dryland Oilseed','Rabi Crop','Drought Hardy'],
      pros: ['Highly drought tolerant','Black soil specialist','Good oil quality'],
      cons: ['Thorny plant – hard to harvest','Limited market'],
      img: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=700&q=80'
    }
  ],

  // ── SPICES ──────────────────────────────────────────────
  spices: [
    {
      id: 'cardamom', name: 'Cardamom', sci: 'Elettaria cardamomum',
      yield: 0.15, yieldLow: 0.10, yieldHigh: 0.22,
      marketPrice: 120000, waterNeed: 'High', season: 'Perennial (3+ years)',
      soil: 'Loamy / Humid Forest Soil', duration: '3 years first harvest', score: 65,
      tags: ['Queen of Spices','Highest Price','Hill Crop'],
      pros: ['Highest price per kg of any Indian spice','Perennial crop income','Spices Board support'],
      cons: ['Only grows in very specific humid hill zones','Disease prone','Very high setup cost'],
      img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=700&q=80'
    },
    {
      id: 'chilli', name: 'Chilli (Red Pepper)', sci: 'Capsicum annuum',
      yield: 1.5, yieldLow: 1.0, yieldHigh: 2.2,
      marketPrice: 10000, waterNeed: 'Medium', season: 'Kharif / Rabi',
      soil: 'Sandy Loam / Loam', duration: '120–150 days', score: 82,
      tags: ['Highest Price','Export Quality','Dual Season'],
      pros: ['Highest per-kg price among common spices','Export quality demand','Dried form stores well'],
      cons: ['Aphid & thrips attack','Price highly volatile'],
      img: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=700&q=80'
    },
    {
      id: 'ginger', name: 'Ginger', sci: 'Zingiber officinale',
      yield: 3.5, yieldLow: 2.5, yieldHigh: 5.0,
      marketPrice: 7000, waterNeed: 'High', season: 'Kharif (Apr–Dec)',
      soil: 'Loamy / Well-drained Alluvial', duration: '8–10 months', score: 79,
      tags: ['Premium Spice','Medicinal','High Yield'],
      pros: ['Growing health food demand','Good export market','High revenue per acre'],
      cons: ['Rhizome rot disease','Needs well-drained land'],
      img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=700&q=80'
    },
    {
      id: 'turmeric', name: 'Turmeric', sci: 'Curcuma longa',
      yield: 2.5, yieldLow: 1.8, yieldHigh: 3.5,
      marketPrice: 8000, waterNeed: 'Medium', season: 'Kharif (Jun–Jan)',
      soil: 'Loamy / Well-drained Clay', duration: '7–9 months', score: 85,
      tags: ['High Value','Medicinal','Long Shelf Life'],
      pros: ['Very high export demand','Medicinal use premium','Long shelf life'],
      cons: ['Rhizome rot in waterlogged soil','7–9 month duration'],
      img: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=700&q=80'
    }
  ],

  // ── OTHERS ──────────────────────────────────────────────
  others: [
    {
      id: 'indigo', name: 'Indigo', sci: 'Indigofera tinctoria',
      yield: 1.0, yieldLow: 0.7, yieldHigh: 1.5,
      marketPrice: 15000, waterNeed: 'Low', season: 'Kharif (Jun–Sep)',
      soil: 'Sandy Loam / Loam', duration: '90–120 days', score: 60,
      tags: ['Natural Dye','Niche Market','Drought Hardy'],
      pros: ['Growing organic / natural dye demand','Drought tolerant','Premium niche pricing'],
      cons: ['Very limited market infrastructure','Processing needed before sale','Niche buyer base'],
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80'
    }
  ]
};

/* ============================================================
   BETTER ALTERNATIVES DATA
   ============================================================ */
const BETTER_ALTERNATIVES = {

  // Vegetables
  brinjal:    [
    { name: 'Tomato',      sci: 'Solanum lycopersicum',  yield: 20, score: 91, reason: 'Higher yield and better market access in urban centres', advantage: '+2 t/acre more yield', img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&q=70', badge: 'Higher Yield' },
    { name: 'Okra',        sci: 'Abelmoschus esculentus',yield: 8,  score: 85, reason: 'Much lower water consumption and labour for similar income', advantage: 'Less water, same income', img: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&q=70', badge: 'Less Water' }
  ],
  cabbage:    [
    { name: 'Cauliflower', sci: 'Brassica oleracea var. botrytis', yield: 14, score: 82, reason: 'Higher market price with same growing season and soil type', advantage: '+₹400/quintal price', img: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&q=70', badge: 'Better Price' },
    { name: 'Peas',        sci: 'Pisum sativum',         yield: 3.5, score: 79, reason: 'Peas fix nitrogen and can be sold as fresh vegetable at premium price', advantage: 'Soil improvement + premium', img: 'https://images.unsplash.com/photo-1587735234168-f0f56c7df6f2?w=400&q=70', badge: 'Dual Benefit' }
  ],
  carrot:     [
    { name: 'Potato',      sci: 'Solanum tuberosum',     yield: 14, score: 82, reason: 'Higher yield and bigger market in same Rabi season conditions', advantage: '+2 t/acre more yield', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=70', badge: 'Higher Yield' },
    { name: 'Onion',       sci: 'Allium cepa',           yield: 10, score: 84, reason: 'Better storable crop with consistently higher returns in this region', advantage: 'Better storability', img: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&q=70', badge: 'Better Storage' }
  ],
  cauliflower:[
    { name: 'Cabbage',     sci: 'Brassica oleracea var. capitata', yield: 18, score: 80, reason: 'More hardy crop with lower disease risk in similar growing conditions', advantage: 'Lower disease risk', img: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&q=70', badge: 'Less Risk' },
    { name: 'Tomato',      sci: 'Solanum lycopersicum',  yield: 20, score: 91, reason: 'Year round production possibility with higher value output per acre', advantage: 'Year round income', img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&q=70', badge: 'Year Round' }
  ],
  garlic:     [
    { name: 'Chilli',      sci: 'Capsicum annuum',       yield: 1.5, score: 86, reason: 'Chilli in rotation after garlic controls soil nematodes effectively', advantage: 'Natural nematode control', img: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&q=70', badge: 'Rotation Benefit' },
    { name: 'Onion',       sci: 'Allium cepa',           yield: 10, score: 83, reason: 'Onion as intercrop or rotation gives extra income with shared inputs', advantage: 'Shared input savings', img: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&q=70', badge: 'Shared Inputs' }
  ],
  onion:      [
    { name: 'Garlic',      sci: 'Allium sativum',        yield: 4,  score: 87, reason: 'Garlic fetches ₹11,000/quintal vs onion ₹2,500 in same season', advantage: '4× higher price', img: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=400&q=70', badge: 'Premium Price' },
    { name: 'Potato',      sci: 'Solanum tuberosum',     yield: 14, score: 82, reason: 'Higher yield per acre with similar season and water requirement', advantage: '+4 t/acre more yield', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=70', badge: 'Higher Yield' }
  ],
  potato:     [
    { name: 'Tomato',      sci: 'Solanum lycopersicum',  yield: 20, score: 90, reason: 'Higher revenue per acre in this soil type and climate', advantage: '+₹2.4 lakh/acre revenue', img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&q=70', badge: 'More Revenue' },
    { name: 'Onion',       sci: 'Allium cepa',           yield: 10, score: 83, reason: 'Better market price and good storability for this region', advantage: 'Better storability', img: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&q=70', badge: 'Better Storage' }
  ],
  pumpkin:    [
    { name: 'Tomato',      sci: 'Solanum lycopersicum',  yield: 20, score: 91, reason: 'Much higher income per acre on same land with better market price', advantage: '3× income per acre', img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&q=70', badge: 'More Income' },
    { name: 'Brinjal',     sci: 'Solanum melongena',     yield: 18, score: 85, reason: 'Higher price per kg with similar heat tolerance and growing conditions', advantage: 'Higher price/kg', img: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&q=70', badge: 'Better Price' }
  ],
  spinach:    [
    { name: 'Chilli',      sci: 'Capsicum annuum',       yield: 1.5, score: 82, reason: 'Chilli fetches ₹10,000/quintal vs spinach ₹1,800 with far higher income', advantage: '5× higher income/acre', img: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&q=70', badge: 'Much Higher Price' },
    { name: 'Moong',       sci: 'Vigna radiata',         yield: 0.8, score: 85, reason: 'Better return on same small plot with lower risk', advantage: 'Higher value grain', img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=70', badge: 'Higher Value' }
  ],
  tomato:     [
    { name: 'Capsicum',    sci: 'Capsicum annuum',       yield: 12, score: 91, reason: 'Fetches 3× higher market price with same water & soil input', advantage: '+₹2,300/quintal over Tomato', img: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=70', badge: 'Higher Price' },
    { name: 'Brinjal',     sci: 'Solanum melongena',     yield: 18, score: 87, reason: 'More heat tolerant and less prone to price crashes', advantage: 'Steadier price, less risk', img: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&q=70', badge: 'Lower Risk' }
  ],
  okra:       [
    { name: 'Tomato',      sci: 'Solanum lycopersicum',  yield: 20, score: 91, reason: 'Higher total yield and better revenue per acre in this location', advantage: '+2.5× yield per acre', img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&q=70', badge: 'Higher Yield' },
    { name: 'Moong',       sci: 'Vigna radiata',         yield: 0.8, score: 85, reason: 'Moong can be grown in Zaid season to add a third crop cycle per year', advantage: 'Extra crop per year', img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=70', badge: 'Extra Season' }
  ],

  // Fruits
  banana:     [
    { name: 'Papaya',      sci: 'Carica papaya',         yield: 40, score: 91, reason: 'Faster first harvest (9 months vs 15) with equally high yield', advantage: '6 months sooner return', img: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&q=70', badge: 'Faster Return' },
    { name: 'Mango',       sci: 'Mangifera indica',      yield: 8,  score: 82, reason: 'Premium fruit price at ₹4,000/quintal with low water after establishment', advantage: 'Long-term premium income', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=70', badge: 'Long Term Value' }
  ],
  grapes:     [
    { name: 'Papaya',      sci: 'Carica papaya',         yield: 40, score: 90, reason: 'Harvest in 9 months vs 2–3 years for grapes and far lower setup cost', advantage: 'Return 2 years earlier', img: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&q=70', badge: 'Much Faster' },
    { name: 'Mango',       sci: 'Mangifera indica',      yield: 8,  score: 83, reason: 'Less disease pressure in humid conditions compared to grapes', advantage: 'Lower disease risk', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=70', badge: 'Less Risk' }
  ],
  mango:      [
    { name: 'Papaya',      sci: 'Carica papaya',         yield: 40, score: 90, reason: 'Harvest starts in 9 months vs 4–5 years for mango', advantage: 'Return 4 years earlier', img: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&q=70', badge: 'Much Faster' },
    { name: 'Banana',      sci: 'Musa paradisiaca',      yield: 35, score: 87, reason: 'Year-round income with first harvest in under 15 months', advantage: 'Steady year-round income', img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=70', badge: 'Earlier Harvest' }
  ],
  papaya:     [
    { name: 'Banana',      sci: 'Musa paradisiaca',      yield: 35, score: 89, reason: 'More consistent year-round income with slightly higher total revenue', advantage: 'Steady year-round income', img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=70', badge: 'Steady Income' },
    { name: 'Mango',       sci: 'Mangifera indica',      yield: 8,  score: 83, reason: 'After 4–5 years mango gives very high premium income long-term', advantage: 'Long-term premium', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=70', badge: 'Long Term' }
  ],

  // Cereals
  bajra:      [
    { name: 'Jowar',       sci: 'Sorghum bicolor',       yield: 2.5, score: 82, reason: 'Higher yield in loamy soils with similar drought tolerance', advantage: '0.5 t/acre more yield', img: 'https://images.unsplash.com/photo-1602524816-89739ecde3a1?w=400&q=70', badge: 'Higher Yield' },
    { name: 'Moong',       sci: 'Vigna radiata',         yield: 0.8, score: 85, reason: 'Moong gives 3× higher income per kg in same short duration season', advantage: '3× better price/kg', img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=70', badge: 'Better Price' }
  ],
  barley:     [
    { name: 'Wheat',       sci: 'Triticum aestivum',     yield: 3.5, score: 88, reason: 'Better market price with government MSP support in same Rabi season', advantage: 'Better MSP + market', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=70', badge: 'Better MSP' },
    { name: 'Mustard',     sci: 'Brassica juncea',       yield: 1.2, score: 84, reason: 'Mustard gives higher price per quintal in similar Rabi conditions', advantage: 'Higher ₹/quintal', img: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400&q=70', badge: 'Higher Price' }
  ],
  jowar:      [
    { name: 'Bajra',       sci: 'Pennisetum glaucum',    yield: 2.0, score: 82, reason: 'Growing health food demand with shorter crop cycle in similar conditions', advantage: '30 days shorter cycle', img: 'https://images.unsplash.com/photo-1623744840283-b5ccbb0f8da4?w=400&q=70', badge: 'Shorter Cycle' },
    { name: 'Groundnut',   sci: 'Arachis hypogaea',      yield: 1.8, score: 88, reason: 'In this soil groundnut gives far higher income per acre than jowar', advantage: '3× income per acre', img: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=70', badge: 'Higher Income' }
  ],
  maize:      [
    { name: 'Rice',        sci: 'Oryza sativa',          yield: 4.2, score: 92, reason: 'Government MSP ensures guaranteed price stability for this location', advantage: 'Price guaranteed', img: 'https://images.unsplash.com/photo-1536054024-cbfdbf2ca5f8?w=400&q=70', badge: 'Price Stability' },
    { name: 'Soybean',     sci: 'Glycine max',           yield: 1.5, score: 84, reason: 'Soybean as rotation crop improves soil health and adds income', advantage: 'Soil improvement', img: 'https://images.unsplash.com/photo-1571912493988-4c3a4d16df97?w=400&q=70', badge: 'Soil Health' }
  ],
  oats:       [
    { name: 'Wheat',       sci: 'Triticum aestivum',     yield: 3.5, score: 88, reason: 'Much stronger market infrastructure and government support than oats', advantage: 'Better market access', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=70', badge: 'Better Market' },
    { name: 'Barley',      sci: 'Hordeum vulgare',       yield: 2.8, score: 76, reason: 'Industrial malt demand growing faster than oats in this region', advantage: 'Growing demand', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=70', badge: 'Growing Demand' }
  ],
  ragi:       [
    { name: 'Jowar',       sci: 'Sorghum bicolor',       yield: 2.5, score: 80, reason: 'Higher yield per acre with similar drought tolerance', advantage: '0.7 t/acre more yield', img: 'https://images.unsplash.com/photo-1602524816-89739ecde3a1?w=400&q=70', badge: 'Higher Yield' },
    { name: 'Groundnut',   sci: 'Arachis hypogaea',      yield: 1.8, score: 88, reason: 'In red soil areas groundnut gives far higher income than ragi', advantage: '3× income per acre', img: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=70', badge: 'Higher Income' }
  ],
  rice:       [
    { name: 'Maize',       sci: 'Zea mays',              yield: 5.0, score: 90, reason: 'Higher yield with 60% less water and shorter crop duration', advantage: '60% less water', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=70', badge: 'Water Saver' },
    { name: 'Sugarcane',   sci: 'Saccharum officinarum', yield: 68,  score: 84, reason: 'Guaranteed mill purchase contract with 10× higher tonnage', advantage: 'Guaranteed buyer', img: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400&q=70', badge: 'Guaranteed Sale' }
  ],
  sorghum:    [
    { name: 'Bajra',       sci: 'Pennisetum glaucum',    yield: 2.0, score: 82, reason: 'Bajra has better market growth as health food and shorter duration', advantage: '30 days shorter cycle', img: 'https://images.unsplash.com/photo-1623744840283-b5ccbb0f8da4?w=400&q=70', badge: 'Shorter Cycle' },
    { name: 'Groundnut',   sci: 'Arachis hypogaea',      yield: 1.8, score: 88, reason: 'In this soil groundnut gives far higher income per acre than sorghum', advantage: '3× income per acre', img: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=70', badge: 'Higher Income' }
  ],
  triticale:  [
    { name: 'Wheat',       sci: 'Triticum aestivum',     yield: 3.5, score: 88, reason: 'Far better market infrastructure and procurement support', advantage: 'Better market access', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=70', badge: 'Better Market' },
    { name: 'Barley',      sci: 'Hordeum vulgare',       yield: 2.8, score: 76, reason: 'Barley has established industrial demand in malt and brewery sectors', advantage: 'Established demand', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=70', badge: 'Established Demand' }
  ],
  wheat:      [
    { name: 'Maize',       sci: 'Zea mays',              yield: 5.0, score: 91, reason: 'Maize gives higher yield and growing demand for animal feed & starch', advantage: '1.5 t/acre more yield', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=70', badge: 'Higher Yield' },
    { name: 'Mustard',     sci: 'Brassica juncea',       yield: 1.2, score: 85, reason: 'In this soil & season mustard outperforms with better price per kg', advantage: 'Better ₹/kg return', img: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400&q=70', badge: 'Better Return' }
  ],
  foddermaize:[
    { name: 'Maize',       sci: 'Zea mays',              yield: 5.0, score: 90, reason: 'Grain maize fetches far higher value per acre than fodder maize', advantage: '5× more income per acre', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=70', badge: 'Higher Value' },
    { name: 'Jowar',       sci: 'Sorghum bicolor',       yield: 2.5, score: 80, reason: 'Jowar can be used as dual grain + fodder with better per-kg price', advantage: 'Dual use + better price', img: 'https://images.unsplash.com/photo-1602524816-89739ecde3a1?w=400&q=70', badge: 'Dual Use' }
  ],

  // Pulses
  chana:      [
    { name: 'Tur/Arhar',   sci: 'Cajanus cajan',         yield: 1.0, score: 85, reason: 'Toor fetches ₹6,500/quintal vs chana ₹5,000 in this region', advantage: '+₹1,500/quintal price', img: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&q=70', badge: 'Higher Price' },
    { name: 'Mustard',     sci: 'Brassica juncea',       yield: 1.2, score: 88, reason: 'Mustard in rotation with chana improves soil and adds extra income', advantage: 'Better rotation crop', img: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400&q=70', badge: 'Rotation Fit' }
  ],
  cowpea:     [
    { name: 'Moong',       sci: 'Vigna radiata',         yield: 0.8, score: 85, reason: 'Moong fetches ₹6,000/quintal and fits in Zaid season just like cowpea', advantage: 'Higher market price', img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=70', badge: 'Better Price' },
    { name: 'Urad',        sci: 'Vigna mungo',           yield: 0.75, score: 79, reason: 'Urad can be grown Kharif + Rabi giving double income in a year', advantage: 'Two seasons per year', img: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400&q=70', badge: 'Double Season' }
  ],
  horsegram:  [
    { name: 'Moong',       sci: 'Vigna radiata',         yield: 0.8, score: 85, reason: 'Moong gives 8× higher income per kg than horsegram in same season', advantage: 'Much higher income', img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=70', badge: 'Higher Income' },
    { name: 'Chana',       sci: 'Cicer arietinum',       yield: 1.2, score: 88, reason: 'Better market infrastructure and higher yield than horsegram in Rabi', advantage: '+0.5 t/acre yield', img: 'https://images.unsplash.com/photo-1574885594230-4c5428e9a91f?w=400&q=70', badge: 'Higher Yield' }
  ],
  masoor:     [
    { name: 'Chana',       sci: 'Cicer arietinum',       yield: 1.2, score: 90, reason: 'Slightly higher yield with better market support price in this zone', advantage: '+0.3 t/acre yield', img: 'https://images.unsplash.com/photo-1574885594230-4c5428e9a91f?w=400&q=70', badge: 'Higher Yield' },
    { name: 'Moong',       sci: 'Vigna radiata',         yield: 0.8, score: 84, reason: 'Moong fetches ₹6,000/quintal and fits in a shorter Zaid season', advantage: 'Fits extra season', img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=70', badge: 'Extra Season' }
  ],
  moong:      [
    { name: 'Chana',       sci: 'Cicer arietinum',       yield: 1.2, score: 90, reason: 'Higher yield per acre with good Rabi season fit for this location', advantage: '0.4 t/acre more yield', img: 'https://images.unsplash.com/photo-1574885594230-4c5428e9a91f?w=400&q=70', badge: 'Higher Yield' },
    { name: 'Tur/Arhar',   sci: 'Cajanus cajan',         yield: 1.0, score: 83, reason: 'Toor has highest price among pulses at ₹6,500/quintal for this climate', advantage: 'Highest price pulse', img: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&q=70', badge: 'Best Price' }
  ],
  mothbean:   [
    { name: 'Bajra',       sci: 'Pennisetum glaucum',    yield: 2.0, score: 80, reason: 'Bajra gives 3× higher yield in similar arid conditions with better returns', advantage: '3× higher yield', img: 'https://images.unsplash.com/photo-1623744840283-b5ccbb0f8da4?w=400&q=70', badge: 'Higher Yield' },
    { name: 'Sesame',      sci: 'Sesamum indicum',       yield: 0.6, score: 76, reason: 'Sesame fetches ₹9,000/quintal in the same arid dryland conditions', advantage: 'Higher price/quintal', img: 'https://images.unsplash.com/photo-1631209121750-a9f656d28f21?w=400&q=70', badge: 'Better Price' }
  ],
  peas:       [
    { name: 'Chana',       sci: 'Cicer arietinum',       yield: 1.2, score: 88, reason: 'Higher income per acre with nitrogen fixation in Rabi season', advantage: 'Higher income + soil benefit', img: 'https://images.unsplash.com/photo-1574885594230-4c5428e9a91f?w=400&q=70', badge: 'More Income' },
    { name: 'Masoor',      sci: 'Lens culinaris',        yield: 0.9, score: 83, reason: 'Masoor at ₹5,500/quintal gives higher income per acre than peas', advantage: 'Higher price/quintal', img: 'https://images.unsplash.com/photo-1583524505974-6facd53f4597?w=400&q=70', badge: 'Higher Price' }
  ],
  rajma:      [
    { name: 'Chana',       sci: 'Cicer arietinum',       yield: 1.2, score: 90, reason: 'Better yield with more established market across all Indian regions', advantage: 'Wider market reach', img: 'https://images.unsplash.com/photo-1574885594230-4c5428e9a91f?w=400&q=70', badge: 'Wider Market' },
    { name: 'Tur/Arhar',   sci: 'Cajanus cajan',         yield: 1.0, score: 83, reason: 'Tur can be grown in warmer plains where rajma struggles', advantage: 'Better in plains', img: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&q=70', badge: 'Plains Suited' }
  ],
  turarhar:   [
    { name: 'Chana',       sci: 'Cicer arietinum',       yield: 1.2, score: 90, reason: 'Shorter season (110 days vs 160) allowing a second crop per year', advantage: 'Fits extra crop', img: 'https://images.unsplash.com/photo-1574885594230-4c5428e9a91f?w=400&q=70', badge: 'Shorter Season' },
    { name: 'Cotton',      sci: 'Gossypium hirsutum',    yield: 2.1, score: 86, reason: 'On black cotton soil this location strongly favours cotton over Toor', advantage: 'Soil-matched crop', img: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=400&q=70', badge: 'Soil Match' }
  ],
  urad:       [
    { name: 'Moong',       sci: 'Vigna radiata',         yield: 0.8, score: 87, reason: 'Moong matures 15–20 days faster than urad for similar income', advantage: '15 days faster', img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=70', badge: 'Faster Harvest' },
    { name: 'Chana',       sci: 'Cicer arietinum',       yield: 1.2, score: 90, reason: 'Significantly higher yield per acre with better price support', advantage: '+60% more yield', img: 'https://images.unsplash.com/photo-1574885594230-4c5428e9a91f?w=400&q=70', badge: 'Much Higher Yield' }
  ],

  // Cash crops
  cotton:     [
    { name: 'Soybean',     sci: 'Glycine max',           yield: 1.5, score: 85, reason: 'Soybean in rotation reduces bollworm pressure and adds soil nitrogen', advantage: 'Reduces pest pressure', img: 'https://images.unsplash.com/photo-1571912493988-4c3a4d16df97?w=400&q=70', badge: 'Pest Reduction' },
    { name: 'Tur/Arhar',   sci: 'Cajanus cajan',         yield: 1.0, score: 82, reason: 'Toor intercropped with cotton improves per-acre income significantly', advantage: 'Intercrop income', img: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&q=70', badge: 'Intercrop Fit' }
  ],
  jute:       [
    { name: 'Rice',        sci: 'Oryza sativa',          yield: 4.2, score: 90, reason: 'Better infrastructure and market support for rice in this region', advantage: 'Better market access', img: 'https://images.unsplash.com/photo-1536054024-cbfdbf2ca5f8?w=400&q=70', badge: 'Better Market' },
    { name: 'Maize',       sci: 'Zea mays',              yield: 5.0, score: 88, reason: 'Maize growing demand and better price compared to jute in this location', advantage: 'Growing demand', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=70', badge: 'Growing Demand' }
  ],
  sugarcane:  [
    { name: 'Rice',        sci: 'Oryza sativa',          yield: 4.2, score: 90, reason: 'Rice needs far less time (150 days vs 12 months) and less water', advantage: '9 months shorter', img: 'https://images.unsplash.com/photo-1536054024-cbfdbf2ca5f8?w=400&q=70', badge: 'Shorter Cycle' },
    { name: 'Banana',      sci: 'Musa paradisiaca',      yield: 35, score: 87, reason: 'Banana gives comparable revenue with slightly less water in this climate', advantage: 'Less water intensive', img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=70', badge: 'Water Efficient' }
  ],
  tobacco:    [
    { name: 'Chilli',      sci: 'Capsicum annuum',       yield: 1.5, score: 85, reason: 'Chilli gives comparable income in same Rabi season without regulation restrictions', advantage: 'No regulation barriers', img: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&q=70', badge: 'Less Restricted' },
    { name: 'Cotton',      sci: 'Gossypium hirsutum',    yield: 2.1, score: 82, reason: 'Cotton on same sandy loam soil with government MSP and no health regulations', advantage: 'MSP protected + legal ease', img: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=400&q=70', badge: 'MSP Supported' }
  ],
  rubber:     [
    { name: 'Coconut',     sci: 'Cocos nucifera',        yield: 8,  score: 74, reason: 'Coconut produces in 5 years and needs less humid-specific climate conditions', advantage: '2 years sooner return', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=70', badge: 'Sooner Return' },
    { name: 'Banana',      sci: 'Musa paradisiaca',      yield: 35, score: 85, reason: 'Banana can be intercropped between rubber trees during the 7-year wait period', advantage: 'Income while rubber matures', img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=70', badge: 'Intercrop Option' }
  ],
  coffee:     [
    { name: 'Cardamom',    sci: 'Elettaria cardamomum',  yield: 0.15, score: 70, reason: 'Cardamom can be intercropped under coffee shade for additional income', advantage: 'Intercrop under coffee', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=70', badge: 'Intercrop Fit' },
    { name: 'Banana',      sci: 'Musa paradisiaca',      yield: 35, score: 85, reason: 'Banana provides income in 12 months while coffee plantation matures', advantage: 'Short-term income bridge', img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=70', badge: 'Income Bridge' }
  ],
  tea:        [
    { name: 'Cardamom',    sci: 'Elettaria cardamomum',  yield: 0.15, score: 68, reason: 'Cardamom intercropped with tea gives premium income from same hill land', advantage: 'Same hill land, premium crop', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=70', badge: 'Premium Intercrop' },
    { name: 'Ginger',      sci: 'Zingiber officinale',   yield: 3.5, score: 78, reason: 'Ginger can be grown in shade under tea and provides income within 10 months', advantage: 'Shade-tolerant intercrop', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=70', badge: 'Shade Intercrop' }
  ],

  // Oilseeds
  castor:     [
    { name: 'Groundnut',   sci: 'Arachis hypogaea',      yield: 1.8, score: 88, reason: 'Higher income per acre with easier handling and better local market', advantage: 'No toxicity handling', img: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=70', badge: 'Safer Crop' },
    { name: 'Sesame',      sci: 'Sesamum indicum',       yield: 0.6, score: 78, reason: 'Sesame at ₹9,000/quintal in same dryland conditions with shorter duration', advantage: 'Shorter + better price', img: 'https://images.unsplash.com/photo-1631209121750-a9f656d28f21?w=400&q=70', badge: 'Better Price' }
  ],
  groundnut:  [
    { name: 'Soybean',     sci: 'Glycine max',           yield: 1.5, score: 83, reason: 'Soybean has less aflatoxin risk and growing industrial demand', advantage: 'Lower contamination risk', img: 'https://images.unsplash.com/photo-1571912493988-4c3a4d16df97?w=400&q=70', badge: 'Less Risk' },
    { name: 'Chilli',      sci: 'Capsicum annuum',       yield: 1.5, score: 87, reason: 'On this sandy loam soil chilli gives 2× income per acre vs groundnut', advantage: '2× income/acre', img: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&q=70', badge: 'Double Income' }
  ],
  linseed:    [
    { name: 'Mustard',     sci: 'Brassica juncea',       yield: 1.2, score: 85, reason: 'Better market infrastructure and higher yield than linseed in same season', advantage: 'Better market + higher yield', img: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400&q=70', badge: 'Better Market' },
    { name: 'Chana',       sci: 'Cicer arietinum',       yield: 1.2, score: 88, reason: 'Higher income per acre in Rabi season with nitrogen fixation benefit', advantage: 'Higher income + soil fix', img: 'https://images.unsplash.com/photo-1574885594230-4c5428e9a91f?w=400&q=70', badge: 'Better Return' }
  ],
  mustard:    [
    { name: 'Wheat',       sci: 'Triticum aestivum',     yield: 3.5, score: 87, reason: 'Wheat gives higher yield with similar inputs and better MSP in this zone', advantage: 'Higher MSP + yield', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=70', badge: 'Better MSP' },
    { name: 'Chana',       sci: 'Cicer arietinum',       yield: 1.2, score: 88, reason: 'Chana at ₹5,000/quintal outperforms mustard income in Rabi season', advantage: 'Higher price/quintal', img: 'https://images.unsplash.com/photo-1574885594230-4c5428e9a91f?w=400&q=70', badge: 'Higher Price' }
  ],
  niger:      [
    { name: 'Sesame',      sci: 'Sesamum indicum',       yield: 0.6, score: 78, reason: 'Sesame fetches ₹9,000/quintal vs niger ₹5,800 in same dryland conditions', advantage: '+₹3,200/quintal price', img: 'https://images.unsplash.com/photo-1631209121750-a9f656d28f21?w=400&q=70', badge: 'Higher Price' },
    { name: 'Groundnut',   sci: 'Arachis hypogaea',      yield: 1.8, score: 85, reason: 'Higher yield and much better market infrastructure than niger in this region', advantage: '3× yield + better market', img: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=70', badge: 'Better Market' }
  ],
  rapeseed:   [
    { name: 'Mustard',     sci: 'Brassica juncea',       yield: 1.2, score: 85, reason: 'Mustard has stronger domestic market and government MSP support in India', advantage: 'Stronger MSP support', img: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400&q=70', badge: 'MSP Supported' },
    { name: 'Sunflower',   sci: 'Helianthus annuus',     yield: 1.4, score: 80, reason: 'Slightly higher yield with premium oil quality demand in this season', advantage: 'Premium oil + more yield', img: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&q=70', badge: 'Premium Oil' }
  ],
  sesame:     [
    { name: 'Groundnut',   sci: 'Arachis hypogaea',      yield: 1.8, score: 88, reason: 'Higher yield per acre with stronger local market compared to sesame', advantage: '3× higher yield', img: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=70', badge: 'Higher Yield' },
    { name: 'Moong',       sci: 'Vigna radiata',         yield: 0.8, score: 85, reason: 'Moong in Zaid gives extra income cycle on same land after sesame Kharif', advantage: 'Extra season income', img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=70', badge: 'Extra Season' }
  ],
  soybean:    [
    { name: 'Groundnut',   sci: 'Arachis hypogaea',      yield: 1.8, score: 88, reason: 'Groundnut fetches ₹5,500/quintal vs soybean ₹4,200 in this soil type', advantage: '+₹1,300/quintal', img: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=70', badge: 'Higher Price' },
    { name: 'Tur/Arhar',   sci: 'Cajanus cajan',         yield: 1.0, score: 84, reason: 'Toor gives ₹6,500/quintal and equally drought tolerant as soybean', advantage: '55% higher price/quintal', img: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&q=70', badge: 'Much Higher Price' }
  ],
  sunflower:  [
    { name: 'Groundnut',   sci: 'Arachis hypogaea',      yield: 1.8, score: 88, reason: 'Higher income per acre with same growing conditions in this region', advantage: '+₹500/quintal price', img: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=70', badge: 'Higher Income' },
    { name: 'Soybean',     sci: 'Glycine max',           yield: 1.5, score: 84, reason: 'Growing industrial and export demand makes soybean a better bet', advantage: 'Growing demand', img: 'https://images.unsplash.com/photo-1571912493988-4c3a4d16df97?w=400&q=70', badge: 'Future Demand' }
  ],
  safflower:  [
    { name: 'Mustard',     sci: 'Brassica juncea',       yield: 1.2, score: 85, reason: 'Mustard has much better market infrastructure and MSP support than safflower', advantage: 'Better MSP + market', img: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400&q=70', badge: 'Better Market' },
    { name: 'Chana',       sci: 'Cicer arietinum',       yield: 1.2, score: 88, reason: 'Chana on same black soil gives higher income and nitrogen benefit', advantage: 'Higher income + soil fix', img: 'https://images.unsplash.com/photo-1574885594230-4c5428e9a91f?w=400&q=70', badge: 'Higher Income' }
  ],

  // Spices
  cardamom:   [
    { name: 'Ginger',      sci: 'Zingiber officinale',   yield: 3.5, score: 82, reason: 'Ginger can be grown at lower altitude with same humid conditions and yields in 10 months', advantage: 'Easier growing conditions', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=70', badge: 'More Accessible' },
    { name: 'Turmeric',    sci: 'Curcuma longa',         yield: 2.5, score: 84, reason: 'Turmeric at ₹8,000/quintal in same moist climate with lower establishment cost', advantage: 'Lower setup cost', img: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&q=70', badge: 'Lower Investment' }
  ],
  chilli:     [
    { name: 'Garlic',      sci: 'Allium sativum',        yield: 4.0, score: 89, reason: 'Garlic ₹11,000/quintal with less pest pressure and steadier prices', advantage: 'Stable premium price', img: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=400&q=70', badge: 'Price Stability' },
    { name: 'Turmeric',    sci: 'Curcuma longa',         yield: 2.5, score: 87, reason: 'Lower price volatility and medicinal demand ensures steady income', advantage: 'Less price volatility', img: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&q=70', badge: 'Stable Demand' }
  ],
  ginger:     [
    { name: 'Turmeric',    sci: 'Curcuma longa',         yield: 2.5, score: 87, reason: 'Less disease risk than ginger with comparable market price', advantage: 'Lower rhizome rot risk', img: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&q=70', badge: 'Lower Risk' },
    { name: 'Garlic',      sci: 'Allium sativum',        yield: 4.0, score: 91, reason: 'Garlic in Rabi season gives 57% higher income per acre in this climate', advantage: '+57% income per acre', img: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=400&q=70', badge: 'More Income' }
  ],
  turmeric:   [
    { name: 'Ginger',      sci: 'Zingiber officinale',   yield: 3.5, score: 84, reason: 'Ginger fetches ₹7,000/quintal and has same growing requirements', advantage: 'Comparable income', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=70', badge: 'Similar Returns' },
    { name: 'Garlic',      sci: 'Allium sativum',        yield: 4.0, score: 89, reason: 'Garlic at ₹11,000/quintal gives 37% more income than turmeric per acre', advantage: '37% more income', img: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=400&q=70', badge: 'Higher Income' }
  ],

  // Others
  indigo:     [
    { name: 'Sesame',      sci: 'Sesamum indicum',       yield: 0.6, score: 78, reason: 'Sesame in same Kharif season with far better market availability than indigo', advantage: 'Better market access', img: 'https://images.unsplash.com/photo-1631209121750-a9f656d28f21?w=400&q=70', badge: 'Better Market' },
    { name: 'Moong',       sci: 'Vigna radiata',         yield: 0.8, score: 85, reason: 'Moong gives much higher income per acre in same season with established buyers', advantage: 'Established buyers', img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=70', badge: 'Established Market' }
  ]
};
