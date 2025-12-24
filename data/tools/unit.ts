import { type Tool } from '@/types/tool'

export const unitTools: Tool[] = [
  {
    slug: 'unit-converter',
    title: 'Unit Converter - Convert Units Online Free',
    category: 'unit',
    description: 'Convert between different units of measurement including length, weight, temperature, and file size. Instant conversions with popular unit pairs.',
    keywords: [
      'unit converter',
      'convert units',
      'km to miles',
      'kg to lbs',
      'celsius to fahrenheit',
      'meters to feet',
      'pounds to kilograms',
      'temperature converter',
      'length converter',
      'weight converter',
      'file size converter',
      'GB to MB',
    ],

    mode: 'comprehensive',
    features: [
      {
        id: 'length',
        name: 'Length',
        description: 'Convert between length units (km, miles, meters, feet, etc.)',
      },
      {
        id: 'weight',
        name: 'Weight',
        description: 'Convert between weight units (kg, lbs, grams, ounces, etc.)',
      },
      {
        id: 'area',
        name: 'Area',
        description: 'Convert between area units (sqm, sq ft, acres, hectares, etc.)',
      },
      {
        id: 'volume',
        name: 'Volume',
        description: 'Convert between volume units (liters, gallons, cubic meters, etc.)',
      },
      {
        id: 'speed',
        name: 'Speed',
        description: 'Convert between speed units (m/s, km/h, mph, knots, etc.)',
      },
      {
        id: 'pressure',
        name: 'Pressure',
        description: 'Convert between pressure units (Pa, bar, psi, atm, etc.)',
      },
      {
        id: 'energy',
        name: 'Energy',
        description: 'Convert between energy units (J, kJ, Wh, kcal, etc.)',
      },
      {
        id: 'temperature',
        name: 'Temperature',
        description: 'Convert between temperature units (Celsius, Fahrenheit, Kelvin)',
      },
      {
        id: 'filesize',
        name: 'File Size',
        description: 'Convert between file size units (KB, MB, GB, TB, etc.)',
      },
    ],
    defaultFeature: 'length',

    component: 'unit-converter',
    tags: ['popular', 'essential'],
    inputType: 'number with unit',
    outputType: 'converted value',

    examples: [
      {
        input: '1 kilometer',
        output: '0.621371 miles',
        description: 'Convert kilometers to miles',
      },
      {
        input: '10 kilograms',
        output: '22.0462 pounds',
        description: 'Convert kilograms to pounds',
      },
      {
        input: '0°C',
        output: '32°F',
        description: 'Convert Celsius to Fahrenheit',
      },
      {
        input: '1 GB',
        output: '1000 MB',
        description: 'Convert gigabytes to megabytes',
      },
    ],

    faq: [
      {
        question: 'How do I convert kilometers to miles?',
        answer: 'To convert kilometers to miles, multiply the kilometer value by 0.621371. For example, 10 km = 10 × 0.621371 = 6.21371 miles. Our calculator does this automatically - just enter the value and select your units.',
      },
      {
        question: 'What\'s the difference between kg and lbs?',
        answer: 'Kilogram (kg) is the metric unit of mass, while pound (lb) is the imperial unit. 1 kilogram equals approximately 2.20462 pounds. The kilogram is used worldwide, while pounds are primarily used in the United States.',
      },
      {
        question: 'How to convert Celsius to Fahrenheit?',
        answer: 'The formula is: °F = (°C × 9/5) + 32. For example, 20°C = (20 × 9/5) + 32 = 68°F. You can also use our temperature converter for instant results.',
      },
      {
        question: 'What is the difference between GB and GiB?',
        answer: 'GB (Gigabyte) uses decimal (base-10): 1 GB = 1,000 MB. GiB (Gibibyte) uses binary (base-2): 1 GiB = 1,024 MiB. Operating systems typically show GiB but call it GB, which can cause confusion.',
      },
      {
        question: 'Can I convert between metric and imperial units?',
        answer: 'Yes! Our converter supports both metric (SI) and imperial units. You can convert between any combination, such as meters to feet, kilograms to pounds, or liters to gallons.',
      },
      {
        question: 'Are the conversions accurate?',
        answer: 'Yes, all conversions use official conversion factors and are accurate up to 6 decimal places. The results are suitable for most practical and scientific applications.',
      },
    ],

    related: [],

    priority: 10,
    createdAt: '2025-01-01',
    lastUpdatedAt: '2025-01-01',
  },
  {
    slug: 'temperature-converter',
    title: 'Temperature Conversion & Reference Tool',
    category: 'unit',
    description: 'Convert Celsius, Fahrenheit, Kelvin, and Rankine with common temperature references.',
    keywords: [
      'celsius to fahrenheit',
      'fahrenheit to celsius',
      'kelvin to celsius',
      'temperature converter',
      'rankine to celsius',
    ],

    component: 'temperature-converter',
    tags: ['popular', 'essential'],
    inputType: 'temperature value',
    outputType: 'converted temperature',

    examples: [
      {
        input: '0°C',
        output: '32°F',
        description: 'Convert Celsius to Fahrenheit',
      },
      {
        input: '300K',
        output: '26.85°C',
        description: 'Convert Kelvin to Celsius',
      },
    ],

    faq: [
      {
        question: 'Which temperature scales are supported?',
        answer: 'The tool supports Celsius, Fahrenheit, Kelvin, and Rankine for scientific and everyday use.',
      },
      {
        question: 'What is absolute zero?',
        answer: 'Absolute zero is the lowest possible temperature: 0K, -273.15°C, -459.67°F.',
      },
      {
        question: 'Why does this tool show reference temperatures?',
        answer: 'References like freezing and boiling points help you sanity-check conversions quickly.',
      },
    ],

    related: ['unit-converter'],

    priority: 9,
    createdAt: '2025-01-05',
    lastUpdatedAt: '2025-01-05',
  },
  {
    slug: 'file-size-calculator',
    title: 'File Size & Download Time Calculator',
    category: 'unit',
    description: 'Convert file sizes and estimate download or upload times based on your network speed.',
    keywords: [
      'file size calculator',
      'kb to mb',
      'mb to gb',
      'download time calculator',
      'upload time calculator',
    ],

    component: 'file-size-calculator',
    tags: ['popular', 'essential'],
    inputType: 'file size and speed',
    outputType: 'converted size and time estimate',

    examples: [
      {
        input: '1 GB at 100 Mbps',
        output: 'about 1m 20s',
        description: 'Estimate download time for a 1 GB file',
      },
      {
        input: '2048 MB',
        output: '2 GB',
        description: 'Convert file size units',
      },
    ],

    faq: [
      {
        question: 'What speed units are supported?',
        answer: 'You can use Mbps, Kbps, MB/s, and GB/s to match your ISP or device metrics.',
      },
      {
        question: 'Why does download time differ from real-world results?',
        answer: 'Actual speed can vary due to network congestion, server limits, and overhead. This tool gives an estimate.',
      },
      {
        question: 'Does it support binary units?',
        answer: 'Yes. You can convert between decimal (MB/GB) and binary units (MiB/GiB).',
      },
    ],

    related: ['unit-converter'],

    priority: 8,
    createdAt: '2025-01-05',
    lastUpdatedAt: '2025-01-05',
  },
]
