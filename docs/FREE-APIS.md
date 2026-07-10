# Free API keys — the big list

A catalogue of free / free-tier APIs to scale Travel With Mia. Grab keys as you
need them. **No-key** means you can call it with zero signup. Tiers change, so
double-check limits when you sign up.

> Already wired into the site: **Amadeus** (flights). Everything else here is
> ready for us to plug in when you want it — just say which.

## ✈️ Flights & aviation
| API | What it does | Free tier | Sign up |
|-----|--------------|-----------|---------|
| **Amadeus Self-Service** ✅ *(wired in)* | Flight search, fares, hotels, airport info | Free test env, ~2k calls/mo | developers.amadeus.com |
| **Duffel** | Flight search + actually issue tickets | Free test mode | duffel.com |
| **Aviationstack** | Live flight status & schedules | 100 calls/mo free | aviationstack.com |
| **AeroDataBox** | Flight status, airport schedules (via RapidAPI) | Free tier | rapidapi.com |
| **OpenSky Network** | Live aircraft positions | **No-key** (fair use) | opensky-network.org |

## 🏨 Hotels & destinations
| API | What it does | Free tier | Sign up |
|-----|--------------|-----------|---------|
| **Amadeus Hotel Search** | Hotel offers & booking | Included in Amadeus test | developers.amadeus.com |
| **Hotelbeds APItude** | Hotel content & rates | Free test creds | developer.hotelbeds.com |
| **OpenTripMap** | Places, attractions, POIs | Free tier | opentripmap.io |

## 🌤️ Weather (great for "what's it like in…" on destination pages)
| API | What it does | Free tier | Sign up |
|-----|--------------|-----------|---------|
| **Open-Meteo** | Forecast + historical weather | **No-key**, generous | open-meteo.com |
| **OpenWeatherMap** | Current + forecast | 1M calls/mo free | openweathermap.org |
| **WeatherAPI** | Weather + astronomy | Free tier | weatherapi.com |

## 💱 Currency (holiday budgeting widgets)
| API | What it does | Free tier | Sign up |
|-----|--------------|-----------|---------|
| **Frankfurter** | ECB FX rates | **No-key** | frankfurter.app |
| **exchangerate.host** | FX + conversion | Free (key) | exchangerate.host |
| **Open Exchange Rates** | FX rates | 1k/mo free | openexchangerates.org |

## 🗺️ Maps, geocoding & places
| API | What it does | Free tier | Sign up |
|-----|--------------|-----------|---------|
| **OpenStreetMap Nominatim** | Geocoding / addresses | **No-key** (fair use) | nominatim.org |
| **MapTiler** | Maps & geocoding | 100k loads/mo free | maptiler.com |
| **Mapbox** | Maps, directions | 50k loads/mo free | mapbox.com |
| **Google Places** | Place details & reviews | Free monthly credit | console.cloud.google.com |

## 🌍 Country & travel info
| API | What it does | Free tier | Sign up |
|-----|--------------|-----------|---------|
| **RestCountries** | Country facts, currencies, flags | **No-key** | restcountries.com |
| **Nager.Date** | Public holidays by country | **No-key** | date.nager.at |
| **TimeZoneDB** | Timezones | Free tier | timezonedb.com |
| **Travel-Advisory.info** | Country safety scores | **No-key** | travel-advisory.info |

## 🖼️ Photography (swap the placeholder images)
| API | What it does | Free tier | Sign up |
|-----|--------------|-----------|---------|
| **Unsplash** | High-quality photos | 50 req/hr demo, 5k/hr prod | unsplash.com/developers |
| **Pexels** | Photos + video | Free, 200/hr | pexels.com/api |
| **Pixabay** | Photos & illustrations | Free | pixabay.com/api/docs |

## 🤖 AI (to actually power the "AI specialists")
| API | What it does | Free tier | Sign up |
|-----|--------------|-----------|---------|
| **Google Gemini** | Chat, generation | Generous free tier | aistudio.google.com |
| **Groq** | Very fast open-model inference | Free tier | console.groq.com |
| **OpenRouter** | One key, many models | Free models available | openrouter.ai |
| **Hugging Face** | Open models & inference | Free tier | huggingface.co |
| **Anthropic (Claude)** | Chat, drafting | Paid, small free credit | console.anthropic.com |
| **OpenAI** | Chat, drafting | Paid | platform.openai.com |

> To make the AI personas *actually chat* (not just present), we'd add one of
> the above (Gemini or Groq are the best free starts) behind a server route.
> Ask me and I'll build the chat widget.

## ✉️ Email & messaging (enquiry notifications, newsletters)
| API | What it does | Free tier | Sign up |
|-----|--------------|-----------|---------|
| **Resend** | Transactional email | 3k emails/mo free | resend.com |
| **Brevo** (Sendinblue) | Email + SMS marketing | 300 emails/day free | brevo.com |
| **EmailJS** | Email from the browser | 200/mo free | emailjs.com |
| **Twilio** | SMS / WhatsApp | Trial credit | twilio.com |

## 📊 Analytics (privacy-friendly, consent-aware)
| API | What it does | Free tier | Sign up |
|-----|--------------|-----------|---------|
| **Vercel Analytics** | Page/traffic insights | Free on Hobby | vercel.com |
| **Plausible** (self-host) | Privacy analytics | Free if self-hosted | plausible.io |
| **Cloudflare Web Analytics** | Privacy analytics | **Free** | cloudflare.com |

---

### Suggested next integrations (all free, high impact)
1. **Open-Meteo weather** on destination & holiday-type pages (no key). ⭐
2. **Frankfurter currency** converter for budgeting (no key). ⭐
3. **Resend** so new enquiries email you instantly (3k/mo free). ⭐
4. **Gemini/Groq** to make an AI specialist genuinely chat. ⭐

Tell me which and I'll wire them in the same graceful way as flights (works with
a placeholder, upgrades the moment a key is added).
