import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { MentorCard } from "@/components/mentor-card";
import { TeamMemberCard } from "@/components/team-member-card";
import { ScrollSection } from "@/components/scroll-section";
import { TypingAnimation } from "@/components/typing-animation";
import { FeedbackSection } from "@/components/feedback-section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Instagram, Sparkles } from "lucide-react";
import { getFeedbacks } from "@/lib/feedbacks";
import { getAllPosts } from "@/lib/posts";
import { Mentor } from "@/lib/types";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  photo?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Khuraman Guliyeva",
    role: "Founder & Director",
    bio: "Description of the student",
    initials: "KG",
    photo: "/khuraman-guliyeva.jpeg",
  },
  {
    id: "2",
    name: "Elshan Huseynzada",
    role: "Operations Lead",
    bio: "Description of the student",
    initials: "EH",
    photo: "/Elshan.jpeg",
  },
  {
    id: "3",
    name: "Ulvi Asadli",
    role: "Community Outreach Lead",
    bio: "Description of the student",
    initials: "UA",
    photo: "/ulvi-asadli.jpeg",
  },
];

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Əmrah",
    surname: "Həsənli",
    expertise:
      "Təhsil İşçilərinin Həmrəyliyi Alyansının Sədri, təhsil məsələləri üzrə ekspert",
    photo: "/emrah-hesenli.jpeg",
  },
  {
    id: "2",
    name: "Vüsət",
    surname: "Əzizov",
    expertise:
      "Silsilə Tədris Mərkəzinin rəhbəri, Təhsil işləri üzrə mütəxəssis.",
    photo: "/vusat-azizov.jpeg",
  },
  {
    id: "3",
    name: "Elnur",
    surname: "Quliyev",
    expertise:
      "Neway Academy-nin təsisçi və direktoru, 10 il təcrübəyə malik ingilis dili mütəxxəsisi",
    photo: "/elnur-guliyev.jpeg",
  },
  {
    id: "4",
    name: "Rizvan",
    surname: "Fikrətoğlu",
    expertise:
      "'Master of Science' Təhsil Mərkəzinin direktoru, Təhsil işləri üzrə ekspert",
    photo: "/rizvan-fikretoglu.jpeg",
  },
  {
    id: "5",
    name: "Ələmdar",
    surname: "Manafov",
    expertise:
      "Marketing Specialist / Entreprenuer Founder of Be Positive Advertising Agency, Marketing & Brand Specialist of Colibri Express",
    photo: "/elemdar-manafov.jpeg",
  },
  {
    id: "6",
    name: "Seyidfatima",
    surname: "Abbasova",
    expertise: "Accredited Trainer. M. Sc. Social Psychology",
    photo: "/seyidfatima-abbasova.jpeg",
  },
  {
    id: "7",
    name: "Günay",
    surname: "İbadova",
    expertise: "Psychtherapist, Trainer",
    photo: "/gunay-ibadova.jpeg",
  },
  {
    id: "8",
    name: "Şahin",
    surname: "Sərdarlı",
    expertise:
      "Karyera və İşə Hazırlıq Mərkəzinin təsisçisi, karyera məsləhətçisi",
    photo: "/sahin-serdarli.jpeg",
  },
  {
    id: "9",
    name: "Ləman",
    surname: "Abbasova",
    expertise:
      "Sosial Media Marketinq üzrə mütəxəssis, mobilograf və Namel Academy təhsil platformasının qurucusu.",
    photo: "/laman-abbasova.jpeg",
  },
  {
    id: "10",
    name: "Rəşad",
    surname: "İmanov",
    expertise:
      "Strateji Kommunikasiya üzrə Mütəxəssis.Strateji Kommunikasiya üzrə Mütəxəssis.",
    photo: "/rasad-imanov.jpeg",
  },
  {
    id: "11",
    name: "Nərmin",
    surname: "Nizam",
    expertise:
      "Amerika Akkreditasiya Assosiasiyası tərəfindən sertifikatlaşdırılmış təlimçi və “Böyük Dayaq” İctimai Birliyinin təsisçisi",
    photo: "/narmin-nizam.jpeg",
  },
  {
    id: "12",
    name: "Rəfiq",
    surname: "Mərdanov",
    expertise:
      "Beyin Yatırım Tədris Mərkəzinin təsisçisi,ölkədə ingilis dili fənni üzrə ilk dinləmə və oxu testlərinin həm-müəllifi  və ingilis dili müəllimi",
    photo: "/rafig-merdanov.jpeg",
  },
  {
    id: "13",
    name: "Mehdi",
    surname: "Bəşirli",
    expertise: "Beynəlxalq dərəcəli Karyera Kouç",
    photo: "/mehdi-besirli.jpg",
  },
  {
    id: "14",
    name: "Nigar",
    surname: "İlqar qızı",
    expertise: "Nitq və Diksiya təlimçisi",
    photo: "/nigar-ilgar-qizi.jpg",
  },
];

const sponsors = [
  { name: "Beyin Yatırım", src: "/sponsors/beyin-yatirim.png" },
  { name: "Böyük Dayaq", src: "/sponsors/boyuk-dayaq.png" },
  { name: "DNTHUB", src: "/sponsors/dnthub.jpg" },
  { name: "Gənclərin İnkişafı", src: "/sponsors/genclerin-inkisaf.jpeg" },
  { name: "Karyera", src: "/sponsors/karyera.png" },
  { name: "Neway", src: "/sponsors/neway.jpeg" },
  { name: "Be Positive", src: "/sponsors/positive.jpg" },
  { name: "Rabitəbank", src: "/sponsors/rabitebank.jpeg" },
  { name: "TIHA", src: "/sponsors/tiha.png" },
  { name: "Yeni Sən", src: "/sponsors/yeni-sen.png" },
];

export default async function WelcomePage() {
  const latestNews = getAllPosts()[0];
  const latestNewsHref = latestNews ? `/news/${latestNews.slug}` : "/news";
  const initialFeedbacks = await getFeedbacks();

  return (
    <>
      {/* <Navigation /> */}
      <header className="pt-24 text-white">
        <ScrollSection className="relative overflow-hidden min-h-screen w-full h-full -mt-24">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Dimming Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-br from-coral-light via-transparent to-gold-light opacity-30" />
          <div className="relative min-h-screen flex items-center justify-center px-4 py-32">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-primary-foreground text-5xl sm:text-5xl md:text-6xl font-bold mb-2">
                <TypingAnimation text="Future Careers" speed={60} />
              </h1>
              <p className="font-serif text-primary-foreground text-xl md:text-2xl font-semibold mb-6 animate-fade-up stagger-1">
                <TypingAnimation
                  text="For Better Future"
                  speed={60}
                  delay={1400}
                />
              </p>
              <p className="text-lg md:text-xl text-primary-foreground mb-8 animate-fade-up stagger-1">
                Guiding school and university students toward confident academic
                and career decisions through mentorship and structured career
                pathways.
              </p>
              <p className="text-base md:text-lg text-foreground mb-8 animate-fade-up stagger-1">
                <span className="font-semibold text-primary-foreground">
                  <Sparkles className="inline-block h-5 w-5 m-2" />
                  Everything is completely free.
                </span>
                <span className="block mt-2 text-primary-foreground">
                  All you need to do is reserve your seat and start your
                  journey.
                </span>
              </p>
              <div className="flex flex-col gap-4 justify-center items-center animate-fade-up stagger-2">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button variant="hero" size="xl" asChild>
                    <Link
                      target="blank"
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdnQH8aIQbrU3t2HaVln-cPq-F4cd1r3MgLYoJ2-dANDOfGMw/viewform"
                    >
                      Reserve Your Meeting{" "}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <Button variant="hero" size="xl" asChild>
                    <Link href="#about">
                      Explore More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <Button variant="hero" size="lg" asChild>
                    <Link
                      href="https://www.instagram.com/futurecareersproject/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80"
                    >
                      <Instagram className="size-12" />
                      <span className="text-base font-medium">Follow Us</span>
                    </Link>
                  </Button>
                  <Button variant="hero" size="lg" asChild>
                    <Link
                      href="https://chat.whatsapp.com/DjF8xA4ieaS5k7wfrnp5eb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80"
                    >
                      <span
                        aria-hidden="true"
                        className="size-6 bg-current [mask-image:url('/icons/whatsapp-icon.svg')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
                      />
                      <span className="text-base font-medium">
                        Join the group
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>
      </header>
      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <ScrollSection>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Core Focus Points */}
            <ScrollSection>
              <div className="grid md:grid-cols-3 gap-6 py-12">
                <div className="space-y-3 p-6 rounded-lg bg-card border border-border hover:border-primary transition-colors">
                  <div className="text-3xl font-bold text-primary">01</div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Mentorship
                  </h3>
                  <p className="text-foreground/70">
                    Connecting people with experienced mentors who guide their
                    professional and career growth.
                  </p>
                </div>

                <div className="space-y-3 p-6 rounded-lg bg-card border border-border hover:border-primary transition-colors">
                  <div className="text-3xl font-bold text-primary">02</div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Education
                  </h3>
                  <p className="text-foreground/70">
                    Providing access to quality learning resources and skill
                    development programs.
                  </p>
                </div>

                <div className="space-y-3 p-6 rounded-lg bg-card border border-border hover:border-primary transition-colors">
                  <div className="text-3xl font-bold text-primary">03</div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Opportunity
                  </h3>
                  <p className="text-foreground/70">
                    Creating pathways to careers and leadership roles that
                    empower future generations.
                  </p>
                </div>
              </div>
            </ScrollSection>

            {/* Sponsors */}
            <ScrollSection>
              <section className="my-12 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-primary">Sponsors</h2>
                  <p className="text-foreground/70">
                    Proudly supported by organizations that invest in youth and
                    education.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-lg bg-card py-6">
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-background to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-background to-transparent" />

                  <div className="sponsors-marquee-track">
                    {[...sponsors, ...sponsors].map((sponsor, index) => (
                      <div
                        key={`${sponsor.src}-${index}`}
                        className="sponsors-marquee-item"
                      >
                        <Image
                          src={sponsor.src}
                          alt={sponsor.name}
                          width={260}
                          height={120}
                          className="h-20 w-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </ScrollSection>

            {/* Latest News Preview */}
            <ScrollSection>
              <Link href={latestNewsHref} className="block my-12">
                <div className="bg-card border border-border rounded-lg p-8 animate-fade-up hover:border-primary transition-colors">
                  <p className="text-sm text-primary font-semibold uppercase tracking-wide">
                    Latest News
                  </p>
                  <h2 className="text-2xl font-bold text-foreground mt-2 mb-4">
                    {latestNews?.metadata.title ?? "Latest News"}
                  </h2>
                  <p className="text-foreground/70 mb-6">
                    {latestNews?.metadata.description ??
                      "Read our newest announcement and stay updated with what’s happening at Future Careers."}
                  </p>
                  <span className="text-primary font-semibold inline-flex items-center gap-1">
                    Read Latest News
                    <span>→</span>
                  </span>
                </div>
              </Link>
            </ScrollSection>
          </div>
        </ScrollSection>

        {/* About Section */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <ScrollSection id="about">
            <div className="mb-16">
              <h1 className="text-5xl font-bold mb-8 text-primary">
                About Future Careers
              </h1>
              <p className="text-xl text-foreground/80 text-pretty leading-relaxed">
                Future Careers is a career pathway and mentoring platform
                designed for school and university students who are preparing
                for academic and professional life.
              </p>
            </div>
          </ScrollSection>

          {/* About the Project */}
          <ScrollSection>
            <div className="mb-16 space-y-6">
              <h2 className="text-3xl font-bold text-primary">Our Purpose</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  We help students discover their strengths, explore career
                  options, and make informed decisions about their education and
                  future professions.
                </p>
                <p>
                  Future Careers was created to bridge the gap between education
                  and real world career planning. Many students struggle with
                  choosing the right academic path, understanding professional
                  industries, and identifying their strengths.
                </p>
                <p>
                  Our platform connects students with experienced mentors and
                  provides structured guidance to support confident academic and
                  career decisions.
                </p>
              </div>
            </div>
          </ScrollSection>

          {/* Access & Support */}
          <ScrollSection>
            <div className="mb-16 space-y-6 bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground">
                Free & Supported
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  <span className="font-semibold text-primary">
                    All of our sessions, mentorship, and activities are
                    completely free of charge.
                  </span>
                </p>
                <p>
                  We are supported by dedicated partners who believe in youth
                  development and education. Our partners contribute their time,
                  expertise, and support without any fee or financial
                  expectation.
                </p>
              </div>
            </div>
          </ScrollSection>

          {/* Legacy & Mission */}
          <ScrollSection>
            <div className="mb-16 space-y-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8 border border-primary/20">
              <h2 className="text-2xl font-bold text-foreground">
                The Taghiyev Legacy
              </h2>
              <p className="text-lg text-foreground/80 text-pretty leading-relaxed">
                Future Careers is proudly developed within the framework of HZT
                Awards 2026 and is dedicated to the legacy of Haji Zeynalabdin
                Taghiyev, a visionary philanthropist who believed in the power
                of education and youth empowerment.
              </p>
              <p className="text-lg text-foreground/80 text-pretty leading-relaxed">
                Inspired by his commitment to future generations, we continue
                that mission by guiding students toward clarity, opportunity,
                and long term success.
              </p>
            </div>
          </ScrollSection>

          {/* Mission & Vision */}
          <ScrollSection>
            <div className="flex gap-x-10 flex-col lg:flex-row">
              <div className="flex-1 mb-16 space-y-6 bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground text-primary">
                  Our Mission
                </h2>
                <p className="text-lg text-foreground/80 text-pretty leading-relaxed">
                  To empower school and university students with clarity,
                  confidence, and structured mentorship so they can make
                  informed academic and career decisions aligned with their
                  abilities and future goals.
                </p>
                <p className="text-lg text-foreground/80 text-pretty leading-relaxed">
                  And to make this guidance accessible to everyone, completely
                  free.
                </p>
              </div>

              {/* Vision */}
              <div className="flex-1 mb-16 space-y-6 bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground text-primary">
                  Our Vision
                </h2>
                <p className="text-lg text-foreground/80 text-pretty leading-relaxed">
                  To become a leading youth career development platform that
                  transforms how students approach academic planning and career
                  exploration through mentorship, digital tools, and real world
                  insight.
                </p>
                <p className="text-lg text-foreground/80 text-pretty leading-relaxed">
                  We believe education guidance should be simple, accessible,
                  and supportive for every student.
                </p>
              </div>
            </div>
          </ScrollSection>

          {/* Core Values */}
          <ScrollSection>
            <div className="mb-16 space-y-6">
              <h2 className="text-3xl font-bold text-primary">Core Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3 p-6 bg-card border border-border rounded-lg">
                  <h3 className="text-lg font-semibold text-primary">
                    Inclusion
                  </h3>
                  <p className="text-foreground/70">
                    We believe every student deserves equal opportunity and a
                    voice in their community.
                  </p>
                </div>
                <div className="space-y-3 p-6 bg-card border border-border rounded-lg">
                  <h3 className="text-lg font-semibold text-primary">
                    Excellence
                  </h3>
                  <p className="text-foreground/70">
                    We are committed to the highest standards in education and
                    mentorship.
                  </p>
                </div>
                <div className="space-y-3 p-6 bg-card border border-border rounded-lg">
                  <h3 className="text-lg font-semibold text-primary">
                    Empowerment
                  </h3>
                  <p className="text-foreground/70">
                    We focus on building confidence, skills, and agency in every
                    students we serve.
                  </p>
                </div>
                <div className="space-y-3 p-6 bg-card border border-border rounded-lg">
                  <h3 className="text-lg font-semibold text-primary">
                    Community
                  </h3>
                  <p className="text-foreground/70">
                    We believe in the power of collective action and shared
                    responsibility.
                  </p>
                </div>
              </div>
            </div>
          </ScrollSection>

          {/* Inspiration Note */}
          <ScrollSection>
            <div className="space-y-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8 border border-primary/20">
              <h2 className="text-2xl font-bold text-foreground">
                The Taghiyev Legacy
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto text-pretty leading-relaxed">
                Inspired by the pioneering work of social reformers who believed
                in the transformative power of education, Future Careers carries
                forward the legacy of social inclusion and human development. We
                honor the vision of those who understood that investing in
                students means investing in entire communities.
              </p>
            </div>
          </ScrollSection>
        </div>

        {/* Team Section */}
        <ScrollSection className="pt-24" id="team">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-16">
              <h1 className="text-5xl font-bold text-primary mb-6">Our Team</h1>
              <p className="text-xl text-foreground/80 max-w-3xl text-pretty leading-relaxed">
                Behind Future Careers is a passionate team committed to building
                opportunities for students and shaping pathways for a better
                future.
              </p>
            </div>

            {/* Team Carousel */}
            <div className="mb-16">
              <Carousel opts={{ align: "start" }} className="w-full px-10">
                <CarouselContent>
                  {teamMembers.map((member) => (
                    <CarouselItem
                      key={member.id}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <TeamMemberCard member={member} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>

            {/* Team Philosophy */}
            <div className="space-y-6 bg-card border border-border rounded-lg p-8">
              <h2 className="text-3xl font-bold text-primary">
                Our Team Philosophy
              </h2>
              <p className="text-lg text-foreground/80 text-pretty leading-relaxed">
                Every member of our team is driven by the belief that education
                and mentorship can transform lives. We work collaboratively to
                create safe, inclusive spaces where students can learn, grow,
                and discover their potential. Our diversity of backgrounds and
                expertise allows us to serve our students with depth, empathy,
                and professionalism.
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* Mentors Section */}
        <ScrollSection className="pt-24" id="mentors">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-16">
              <h1 className="text-5xl font-bold text-primary mb-6">
                Our Mentors
              </h1>
              <p className="text-xl text-foreground/80 max-w-3xl text-pretty leading-relaxed">
                Our mentors are experienced professionals and academic advisors
                who guide students through career exploration, academic
                planning, and personal development. They volunteer their
                knowledge and experience to support students without any fee.
              </p>
            </div>

            {/* Mentors Carousel */}
            <Carousel opts={{ align: "start" }} className="w-full px-10">
              <CarouselContent>
                {mentors.map((mentor) => (
                  <CarouselItem
                    key={mentor.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <MentorCard mentor={mentor} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </ScrollSection>

        <FeedbackSection initialFeedbacks={initialFeedbacks} />

        {/* Reserve Meeting Section */}
        <ScrollSection className="py-24">
          <div className="mx-auto">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8 border border-primary/20 text-center space-y-4 animate-fade-up">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold text-primary">
                  Reserve Meeting
                </h2>
                <p className="text-md text-foreground/80">
                  Booking your session is easy:
                </p>
                <div className="text-md text-foreground/80">
                  1. Choose a mentor. 2. Select a time. 3. Reserve your seat.
                </div>
              </div>

              <p className="text-foreground text-lg leading-relaxed">
                <span className="font-semibold">
                  No fees. No complicated forms.
                </span>{" "}
                Just a simple reservation and your journey begins.
              </p>

              <Button size="xl" asChild>
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdnQH8aIQbrU3t2HaVln-cPq-F4cd1r3MgLYoJ2-dANDOfGMw/viewform"
                  target="_blank"
                >
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        </ScrollSection>
      </main>
    </>
  );
}
