# backend/core/management/commands/seed_data.py
"""
Populate the database with realistic sample data for all models.

Usage:
    python manage.py seed_data            # seed everything
    python manage.py seed_data --clear    # wipe then re-seed
    python manage.py seed_data --model testimonial
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import date, timedelta
import random

from core.models import (
    QuoteRequest,
    Testimonial,
    Aircraft,
    ContactMessage,
    FAQ,
)


# ─────────────────────────────────────────────────────────────
# Raw seed data
# ─────────────────────────────────────────────────────────────

AIRCRAFT_DATA = [
    # Light jets
    dict(name="Cessna Citation CJ3+",  category="light",      seats=7,  range_km=3200,  max_payload_kg=None,   description="The benchmark light jet for short regional hops. Efficient and nimble."),
    dict(name="Embraer Phenom 300E",   category="light",      seats=8,  range_km=3650,  max_payload_kg=None,   description="Best-selling light jet for five consecutive years. Spacious stand-up cabin."),
    dict(name="Pilatus PC-12 NGX",     category="turboprop",  seats=9,  range_km=3480,  max_payload_kg=1300,   description="Versatile turboprop capable of operating from short, unpaved airstrips."),
    # Midsize jets
    dict(name="Cessna Citation XLS+",  category="midsize",    seats=9,  range_km=3700,  max_payload_kg=None,   description="Ideal coast-to-coast midsize with flat-floor cabin and stand-up headroom."),
    dict(name="Bombardier Learjet 75", category="midsize",    seats=9,  range_km=3779,  max_payload_kg=None,   description="Iconic silhouette with club seating and best-in-class speed performance."),
    dict(name="Hawker 800XP",          category="midsize",    seats=8,  range_km=5003,  max_payload_kg=None,   description="Long-proven midsize platform with a wide, squared-off cabin."),
    # Heavy jets
    dict(name="Gulfstream G450",       category="heavy",      seats=14, range_km=8450,  max_payload_kg=None,   description="Transcontinental powerhouse with a four-zone cabin and full galley."),
    dict(name="Bombardier Global 6500",category="heavy",      seats=13, range_km=12000, max_payload_kg=None,   description="Ultra-smooth ride quality with Nuage seats and whisper-quiet cabin."),
    dict(name="Dassault Falcon 2000S", category="heavy",      seats=10, range_km=7400,  max_payload_kg=None,   description="Category-defying range for a heavy jet, with exceptional fuel efficiency."),
    # Ultra-long range
    dict(name="Gulfstream G700",       category="ultra_long", seats=19, range_km=13890, max_payload_kg=None,   description="The world's largest purpose-built business jet with 10 living areas."),
    dict(name="Bombardier Global 7500",category="ultra_long", seats=19, range_km=14260, max_payload_kg=None,   description="Nonstop between any two cities on the planet. Four true living spaces."),
    # Cargo aircraft
    dict(name="Boeing 737-800SF",      category="cargo",      seats=0,  range_km=5765,  max_payload_kg=20870,  description="Converted narrow-body freighter for general cargo up to 23 tonnes."),
    dict(name="Boeing 747-400F",       category="cargo",      seats=0,  range_km=9200,  max_payload_kg=113000, description="The quintessential heavy freighter — nose-loading for outsized loads."),
    dict(name="Antonov An-124",        category="cargo",      seats=0,  range_km=5400,  max_payload_kg=120000, description="The go-to aircraft for outsized and overweight cargo globally."),
    # Helicopter
    dict(name="AgustaWestland AW139",  category="helicopter", seats=15, range_km=1061,  max_payload_kg=1950,   description="Premier medium-twin helicopter for offshore, VIP, and emergency ops."),
]

TESTIMONIAL_DATA = [
    dict(client_name="Sarah Mitchell",    company="Global CHRO, Apex Corp",          service_type="private_jet",      rating=5, is_featured=True,
         body="Our executive team moved between four cities in a single weekend. SkyCharter made the logistically impossible feel completely routine. The aircraft was pristine, the crew exceptional."),
    dict(client_name="Carlos Ramirez",    company="Head of Logistics, MedSupply SA",  service_type="air_cargo",        rating=5, is_featured=True,
         body="They arranged an emergency cargo flight for critical medical supplies in under three hours. Remarkable speed, professional crew, and zero hiccups on a mission that couldn't afford any."),
    dict(client_name="Aisha Kamau",       company="Senior Event Producer, Luminary",  service_type="group_air",        rating=5, is_featured=True,
         body="Moved 200 guests from Nairobi to Zanzibar seamlessly for our corporate retreat. Every single detail — transfers, catering, timing — was handled perfectly. We'll be calling SkyCharter again."),
    dict(client_name="James Okonkwo",     company="CEO, Meridian Energy Ltd",         service_type="aircraft_leasing", rating=5, is_featured=False,
         body="The ACMI deal SkyCharter structured for us saved weeks of fleet downtime during our transition period. Their leasing desk has real depth of knowledge — not just a broker, a true partner."),
    dict(client_name="Dr. Lena Brandt",   company="Director of Operations, RELIEF International", service_type="aes", rating=5, is_featured=True,
         body="During the flood crisis we had aircraft wheels-up within 90 minutes of making the call. SkyCharter is on every emergency contact list we maintain. Invaluable."),
    dict(client_name="Tom Hargreaves",    company="Chairman, Hargreaves Ventures",    service_type="private_jet",      rating=5, is_featured=False,
         body="I've been using private charter for 20 years. SkyCharter consistently provides the best aircraft options at the most competitive prices, with zero fuss. My PA now calls them before anyone else."),
    dict(client_name="Mei Lin Zhang",     company="Managing Director, Pacific Horizons", service_type="group_air",     rating=4, is_featured=False,
         body="Arranged a complex routing for our 80-person team across three cities in Southeast Asia. A few minor timing hiccups, but SkyCharter resolved everything swiftly and professionally."),
    dict(client_name="Rashid Al-Farsi",   company="VP Fleet, Meridian Airways",       service_type="flight_support",   rating=5, is_featured=False,
         body="Their flight support desk secured overflight permits for seven countries in 48 hours — something we'd been struggling with for weeks. Genuinely impressive operational capability."),
    dict(client_name="Natasha Bergström", company="Tour Manager, Velvet Circuit",     service_type="group_air",        rating=5, is_featured=False,
         body="Touring with 35 crew and tonnes of equipment is a logistical nightmare. SkyCharter turned it into a non-event. They understood the entertainment industry from day one."),
    dict(client_name="David Osei",        company="Procurement Director, GoldFields", service_type="air_cargo",        rating=5, is_featured=False,
         body="Time-critical mining equipment flown to a remote site in West Africa. No commercial option existed. SkyCharter had a solution on the table within the hour. Outstanding."),
]

FAQ_DATA = [
    # Global FAQs
    dict(service_type="", order=1, question="Do I need an account to request a quote?",
         answer="No. You can submit a quote request as a guest — simply fill in the form with your contact details, route, and travel requirements. No registration is required."),
    dict(service_type="", order=2, question="How quickly will I receive a quote?",
         answer="Our operations team aims to respond with tailored aircraft options within 2 hours of receiving your request, 24 hours a day, 7 days a week."),
    dict(service_type="", order=3, question="Is payment required upfront?",
         answer="Typically a deposit is required to confirm the booking, with the balance due before departure. Payment terms are outlined clearly in your charter agreement."),
    dict(service_type="", order=4, question="Are the aircraft safety-audited?",
         answer="Yes. SkyCharter only works with operators who hold current ARGUS or IS-BAO safety ratings. We conduct our own due-diligence checks independently of operator-provided documentation."),
    # Private jet FAQs
    dict(service_type="private_jet", order=1, question="Which airports can private jets use?",
         answer="Private jets can access over 5,000 airports worldwide — far more than commercial aviation. This includes small regional airports, private terminals (FBOs), and executive aerodromes close to your destination."),
    dict(service_type="private_jet", order=2, question="How far in advance should I book?",
         answer="We can arrange flights with as little as a few hours' notice, though booking further ahead gives you more aircraft choice and may yield better pricing."),
    dict(service_type="private_jet", order=3, question="Can I bring pets on board?",
         answer="In most cases, yes. Policies vary by operator and aircraft. Let us know when you submit your request and we will source a pet-friendly aircraft."),
    # Air cargo FAQs
    dict(service_type="air_cargo", order=1, question="What types of cargo can you transport?",
         answer="We arrange transport for a wide range of cargo including perishables, pharmaceuticals, hazardous materials (DG), outsized equipment, live animals, valuable goods, and humanitarian aid."),
    dict(service_type="air_cargo", order=2, question="Can you handle dangerous goods (DG)?",
         answer="Yes. We work with IATA-certified operators and handlers for all DG categories. Full documentation preparation and compliance support is included in the service."),
    dict(service_type="air_cargo", order=3, question="What is the largest payload you can accommodate?",
         answer="For extremely heavy or outsized cargo, we can source Antonov An-124 freighters with payloads exceeding 120 tonnes. Contact our cargo desk to discuss your specific requirements."),
    # Group air FAQs
    dict(service_type="group_air", order=1, question="What is the minimum group size for a charter?",
         answer="There is no strict minimum, but group charters typically become cost-effective for parties of 20 or more passengers. For smaller groups, a private jet may be more suitable."),
    dict(service_type="group_air", order=2, question="Can we choose our departure airport?",
         answer="Yes. One of the key advantages of group charter is the ability to depart from any suitable airport, including regional airports closer to your team's location."),
    # Aircraft leasing FAQs
    dict(service_type="aircraft_leasing", order=1, question="What is the difference between wet and dry lease?",
         answer="A wet lease (ACMI) includes the Aircraft, Crew, Maintenance, and Insurance — the lessor's crew operates under your flight number. A dry lease provides the aircraft only; you supply your own crew, maintenance, and insurance."),
    dict(service_type="aircraft_leasing", order=2, question="What is the shortest lease term available?",
         answer="Ad-hoc wet leases can be arranged for as little as a single day for AOG (Aircraft on Ground) cover or capacity emergencies. Contact our leasing desk for options."),
    # AES FAQs
    dict(service_type="aes", order=1, question="How quickly can you mobilise for a genuine emergency?",
         answer="For declared emergencies, our AES team targets wheels-up within 2–4 hours from the point of confirmed activation, subject to aircraft positioning and permit requirements."),
    dict(service_type="aes", order=2, question="Do you work with NGOs and government agencies?",
         answer="Yes. SkyCharter has established relationships with major humanitarian organisations, UN agencies, and government emergency management bodies. We offer standing agreement pricing for repeat partners."),
    # Flight support FAQs
    dict(service_type="flight_support", order=1, question="Which regions do you provide overflight permits for?",
         answer="We handle overflight and landing permits for all regions globally, including complex jurisdictions such as Russia, China, Central Asia, and West Africa. Our permit desk operates 24/7."),
    dict(service_type="flight_support", order=2, question="Can you arrange ground handling at remote airports?",
         answer="Yes. Our network covers hundreds of remote and regional airports. We coordinate fuel uplift, handling agents, catering, customs, and crew transport even at locations without established FBO infrastructure."),
]

CONTACT_DATA = [
    dict(full_name="Peter Jensen",      email="peter.jensen@northsea.com",    subject="General enquiry about cargo services",           message="Hi, I'd like to learn more about your air cargo capabilities for North Sea oil platform supply chains. Please get in touch."),
    dict(full_name="Amara Diallo",      email="amara.d@transcontinental.aero", subject="ACMI lease availability Q3",                      message="We are exploring ACMI options for our West Africa routes during the summer peak. Could someone from your leasing team call me?"),
    dict(full_name="Sophie Marchetti",  email="sophie@marchetti-events.it",   subject="Group charter for 120 pax Milan to Mykonos",      message="Planning a high-profile corporate event. Need a group charter from MXP to JMK in mid-July. Flexible on dates by ±2 days."),
    dict(full_name="Robert Kim",        email="rkim@seoulglobalfund.kr",      subject="Private jet enquiry for Asia Pacific routes",      message="Our chairman travels frequently between Seoul, Tokyo, Singapore and Hong Kong. Looking for a preferred charter partner."),
    dict(full_name="Fatima Al-Rashidi", email="f.alrashidi@gulfmedical.ae",   subject="Medical evacuation standing contract",             message="We are a medical centre in Muscat looking for a reliable medevac partner. Please send information on your AES standing contract options."),
]

QUOTE_REQUEST_DATA = [
    dict(full_name="Marcus Thompson",   email="marcus.t@thompsongroup.co.uk", phone="+44 20 7946 0123", company_name="Thompson Group",      service_type="private_jet",      origin="London Luton (LTN)",     destination="Nice (NCE)",            departure_date=date.today()+timedelta(days=14), return_date=date.today()+timedelta(days=17), passengers=4,  special_requests="Champagne and canapés on board. Prefer G-IV or larger."),
    dict(full_name="Yuki Tanaka",       email="ytanaka@tokyovp.jp",           phone="+81 3 1234 5678",  company_name="Tokyo VP Logistics",  service_type="air_cargo",        origin="Narita (NRT)",           destination="Los Angeles (LAX)",      departure_date=date.today()+timedelta(days=7),  return_date=None,                            passengers=1,  cargo_weight_kg=8500, special_requests="Automotive parts — no DG. Delivery slot at LAX 06:00 local."),
    dict(full_name="Elena Volkov",      email="e.volkov@volkovholdings.ru",   phone="+7 495 000 0001",  company_name="Volkov Holdings",     service_type="private_jet",      origin="Moscow (VKO)",           destination="Dubai (DXB)",            departure_date=date.today()+timedelta(days=5),  return_date=date.today()+timedelta(days=9),  passengers=6,  special_requests="Need two aircraft if single heavy jet not available. Catering: Russian cuisine preferred."),
    dict(full_name="Kwame Asante",      email="k.asante@africarelief.org",    phone="+233 30 000 0001", company_name="Africa Relief NGO",   service_type="aes",              origin="Accra (ACC)",            destination="Conakry (CKY)",          departure_date=date.today()+timedelta(days=2),  return_date=None,                            passengers=12, cargo_weight_kg=15000, special_requests="Humanitarian aid — food and medicine. URGENT — please call immediately."),
    dict(full_name="Isabella Rossi",    email="i.rossi@milandesign.it",       phone="+39 02 000 0001",  company_name="Milan Design House",  service_type="group_air",        origin="Milan Malpensa (MXP)",   destination="New York JFK (JFK)",     departure_date=date.today()+timedelta(days=30), return_date=date.today()+timedelta(days=37), passengers=45, special_requests="Fashion week delegation. Need hold space for design samples. Cabin Wi-Fi essential."),
    dict(full_name="Sven Lindqvist",    email="slindqvist@nordicair.se",      phone="+46 8 000 0001",   company_name="Nordic Air AB",       service_type="aircraft_leasing", origin="Stockholm Arlanda (ARN)",destination="Reykjavik (KEF)",        departure_date=date.today()+timedelta(days=60), return_date=None,                            passengers=1,  special_requests="Looking for 6-month dry lease on 737-800 or A320 equivalent."),
    dict(full_name="Grace Odhiambo",    email="",                             phone="+254 722 000001",  company_name="",                    service_type="private_jet",      origin="Nairobi Wilson (WIL)",   destination="Mombasa (MBA)",          departure_date=date.today()+timedelta(days=3),  return_date=date.today()+timedelta(days=6),  passengers=2,  special_requests="Honeymoon trip. Any special touches appreciated!"),
    dict(full_name="Huang Wei",         email="hw@shanghailogistics.cn",      phone="+86 21 0000 0001", company_name="Shanghai Logistics",  service_type="air_cargo",        origin="Shanghai Pudong (PVG)",  destination="Frankfurt (FRA)",        departure_date=date.today()+timedelta(days=10), return_date=None,                            passengers=1,  cargo_weight_kg=45000, special_requests="Electronics cargo. DGR Class 9 lithium batteries. Full IATA compliance required."),
    dict(full_name="Ahmed Khalil",      email="ahmed.k@riyadhcorp.sa",        phone="+966 11 000 0001", company_name="Riyadh Corp",         service_type="flight_support",   origin="Riyadh (RUH)",           destination="Multiple (see notes)",   departure_date=date.today()+timedelta(days=21), return_date=None,                            passengers=1,  special_requests="Need overflight permits and ground handling for a 10-leg trip across Africa. Route to follow."),
    dict(full_name="Claire Dupont",     email="c.dupont@euromedical.fr",      phone="+33 1 0000 0001",  company_name="EuroMedical SA",      service_type="aes",              origin="Paris (CDG)",            destination="Kinshasa (FIH)",         departure_date=date.today()+timedelta(days=1),  return_date=None,                            passengers=4,  cargo_weight_kg=2000, special_requests="Medical evacuation team + equipment. Patient requires ICU-level in-flight care."),
]


class Command(BaseCommand):
    help = "Seed the database with sample data for all models."

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Delete all existing records before seeding.",
        )
        parser.add_argument(
            "--model",
            type=str,
            default="all",
            choices=["all", "aircraft", "testimonial", "faq", "contact", "quote"],
            help="Seed only a specific model (default: all).",
        )

    def handle(self, *args, **options):
        model_filter = options["model"]
        do_clear     = options["clear"]

        self.stdout.write(self.style.MIGRATE_HEADING("\n🛫  SkyCharter — Database Seeder\n"))

        if do_clear:
            self._clear(model_filter)

        if model_filter in ("all", "aircraft"):
            self._seed_aircraft()
        if model_filter in ("all", "testimonial"):
            self._seed_testimonials()
        if model_filter in ("all", "faq"):
            self._seed_faqs()
        if model_filter in ("all", "contact"):
            self._seed_contacts()
        if model_filter in ("all", "quote"):
            self._seed_quotes()

        self.stdout.write(self.style.SUCCESS("\n✅  Seeding complete!\n"))

    # ── Clear ────────────────────────────────────────────────
    def _clear(self, model_filter):
        mapping = {
            "aircraft":    Aircraft,
            "testimonial": Testimonial,
            "faq":         FAQ,
            "contact":     ContactMessage,
            "quote":       QuoteRequest,
        }
        targets = list(mapping.values()) if model_filter == "all" else [mapping[model_filter]]
        for model in targets:
            count, _ = model.objects.all().delete()
            self.stdout.write(self.style.WARNING(f"  🗑  Cleared {count} {model.__name__} records"))

    # ── Aircraft ─────────────────────────────────────────────
    def _seed_aircraft(self):
        created = 0
        for data in AIRCRAFT_DATA:
            _, new = Aircraft.objects.get_or_create(name=data["name"], defaults={**data, "is_active": True})
            if new:
                created += 1
        self.stdout.write(self.style.SUCCESS(f"  ✈  Aircraft:       {created} created  ({Aircraft.objects.count()} total)"))

    # ── Testimonials ─────────────────────────────────────────
    def _seed_testimonials(self):
        created = 0
        for data in TESTIMONIAL_DATA:
            _, new = Testimonial.objects.get_or_create(
                client_name=data["client_name"],
                defaults=data,
            )
            if new:
                created += 1
        self.stdout.write(self.style.SUCCESS(f"  ⭐  Testimonials:   {created} created  ({Testimonial.objects.count()} total)"))

    # ── FAQs ─────────────────────────────────────────────────
    def _seed_faqs(self):
        created = 0
        for data in FAQ_DATA:
            _, new = FAQ.objects.get_or_create(
                question=data["question"],
                defaults={**data, "is_active": True},
            )
            if new:
                created += 1
        self.stdout.write(self.style.SUCCESS(f"  ❓  FAQs:           {created} created  ({FAQ.objects.count()} total)"))

    # ── Contact messages ─────────────────────────────────────
    def _seed_contacts(self):
        # Contact messages have no unique key — skip if count already matches
        if ContactMessage.objects.count() >= len(CONTACT_DATA):
            self.stdout.write(self.style.WARNING(f"  📧  Contacts:       skipped (already seeded)"))
            return
        created = 0
        for data in CONTACT_DATA:
            ContactMessage.objects.create(**data)
            created += 1
        self.stdout.write(self.style.SUCCESS(f"  📧  Contacts:       {created} created  ({ContactMessage.objects.count()} total)"))

    # ── Quote Requests ───────────────────────────────────────
    def _seed_quotes(self):
        if QuoteRequest.objects.count() >= len(QUOTE_REQUEST_DATA):
            self.stdout.write(self.style.WARNING(f"  📋  Quotes:         skipped (already seeded)"))
            return

        statuses = [s[0] for s in QuoteRequest.Status.choices]
        created  = 0
        for data in QUOTE_REQUEST_DATA:
            QuoteRequest.objects.create(
                **data,
                status=random.choice(statuses),
            )
            created += 1
        self.stdout.write(self.style.SUCCESS(f"  📋  Quote Requests: {created} created  ({QuoteRequest.objects.count()} total)"))