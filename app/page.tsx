import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { MentorMarqueeGrid } from "@/components/mentor-marquee-grid";
import { ScrollSection } from "@/components/scroll-section";
import { TypingAnimation } from "@/components/typing-animation";
import { FeedbackSection } from "@/components/feedback-section";
import { ArrowRight, Info, Instagram, Sparkles } from "lucide-react";
import { getFeedbacks } from "@/lib/feedbacks";
import { getAllPosts } from "@/lib/posts";
import { mentors, teamMembers } from "@/lib/home-data";
import { Badge } from "@/components/ui/badge";
import { AppLink } from "@/components/ui/link";
import { NewsPopupModal } from "@/components/news-popup-modal";

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

const statistics = [
  {
    value: "700+",
    label: "Students participated in our events",
    primary: true,
  },
  { value: "15+", label: "Trainings was conducted" },
  { value: "10+", label: "Schools were involved" },
  { value: "5+", label: "Region Schools were involved" },
  { value: "500+", label: "Participants in trainings" },
  { value: "50+", label: "Mentors participated in our events" },
];

function extractFirstImageFromMarkdown(content: string): string | null {
  const match = content.match(/!\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/);
  return match?.[1] ?? null;
}

export default async function WelcomePage() {
  const allNews = getAllPosts();
  const latestNews = allNews[0];
  const latestNewsHref = latestNews ? `/news/${latestNews.slug}` : "/news";
  const recentNews = allNews.slice(0, 3);
  const initialFeedbacks = await getFeedbacks();

  return (
    <>
      {/* <Navigation /> */}
      <header className="pt-32">
        <ScrollSection className="relative -mt-24 px-4 md:py-16 sm:px-6 lg:px-8 lg:h-screen lg:flex lg:flex-col lg:justify-center lg:py-0">
          <div className="mx-auto flex w-full max-w-4xl items-center justify-center lg:h-[calc(100vh-8rem)]">
            <div className="p-6 py-20 sm:p-8 lg:p-10 flex flex-col flex-1 text-center items-center">
              <Badge
                className="text-sm md:text-md px-5 rounded-full mb-3 uppercase tracking-wide animate-fade-up"
                variant={"outline"}
              >
                <Info className="mr-1" />
                With the partnership of ADA University
              </Badge>
              <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                Design Your Future Career with{" "}
                <span className="text-primary">Future Careers</span>
              </h1>
              <p className="my-5 text-lg md:text-xl animate-fade-up stagger-1 max-w-3xl">
                Guiding school and university students toward confident academic
                and career decisions through mentorship and structured career
                pathways.
              </p>

              <div className="mt-2 flex flex-col gap-4 animate-fade-up stagger-2 items-center">
                <div className="flex flex-col sm:flex-row gap-4">
                  <AppLink
                    variant="heroCta"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdnQH8aIQbrU3t2HaVln-cPq-F4cd1r3MgLYoJ2-dANDOfGMw/viewform"
                  >
                    Reserve Your Meeting
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </AppLink>

                  <AppLink variant="heroCta" href="#about">
                    Explore More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </AppLink>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-1 text-base">
                  <span>Follow us on</span>
                  <AppLink
                    href="https://www.instagram.com/futurecareersproject/"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="hoverUnderline"
                    className="font-medium text-[#dd366d] hover:text-[#C13584]"
                  >
                    Instagram
                  </AppLink>
                  <span>or join our</span>
                  <AppLink
                    href="https://chat.whatsapp.com/DjF8xA4ieaS5k7wfrnp5eb"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="hoverUnderline"
                    className="font-medium text-[#25D366] hover:text-[#1DA851]"
                  >
                    Whatsapp group
                  </AppLink>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>
      </header>
      <main className="py-5 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <ScrollSection>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Core Focus Points */}
            {/* <ScrollSection>
              <div className="grid md:grid-cols-3 gap-6 md:py-8">
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
            </ScrollSection> */}

            {/* Recent News */}
            <ScrollSection>
              <section className="space-y-6 py-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-4xl font-bold text-primary">
                    Latest updates from our events
                  </h2>

                  <AppLink
                    variant="heroCta"
                    href="/news"
                    className="self-start rounded-full px-5 text-base h-10"
                  >
                    See more
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </AppLink>
                </div>

                <hr className="border-t border-border" />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {recentNews.map((post) => {
                    const imageSrc =
                      extractFirstImageFromMarkdown(post.content) ??
                      "/future-careers-logo.png";

                    return (
                      <Link
                        key={post.slug}
                        href={`/news/${post.slug}`}
                        className="group relative block h-88 overflow-hidden rounded-2xl border border-border bg-card"
                      >
                        <Image
                          src={imageSrc}
                          alt={post.metadata.title ?? "Recent news"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />

                        <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/55" />

                        <div className="absolute inset-x-0 bottom-0 z-10 flex min-h-40 flex-col justify-end p-6 text-left text-white transition-transform duration-300 group-hover:-translate-y-1 sm:p-7">
                          <h3 className="line-clamp-2 text-xl font-semibold leading-tight">
                            {post.metadata.title ?? "Untitled"}
                          </h3>
                          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/90">
                            {post.metadata.description ??
                              "Discover our latest milestone and event highlights."}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            </ScrollSection>

            {/* Feedback */}
            <ScrollSection id="feedbacks">
              <FeedbackSection initialFeedbacks={initialFeedbacks} />
            </ScrollSection>

            {/* Sponsors */}
            <ScrollSection>
              <section className="my-16 space-y-6 relative left-1/2 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center space-y-2">
                  <h2 className="text-4xl font-bold text-primary">
                    Meet Our Partners
                  </h2>
                  <p className="text-foreground/70">
                    Proudly supported by organizations that invest in youth and
                    education.
                  </p>
                </div>

                <div className="relative overflow-hidden bg-card py-6">
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
                          width={340}
                          height={160}
                          className="h-28 w-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </ScrollSection>
          </div>
        </ScrollSection>

        {/* About Section */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <ScrollSection id="about">
            <div className="mb-16">
              <h1 className="text-4xl font-bold mb-8 text-primary">
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
              <h2 className="text-2xl font-bold text-primary">
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
            <div className="mb-16 bg-linear-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/20 overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center gap-8 p-8">
                <div className="flex-1 relative h-80 lg:h-96 w-full lg:w-auto">
                  <Image
                    src="/taghiyev.jpg"
                    alt="Haji Zeynalabdin Taghiyev"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <h2 className="text-2xl font-bold text-primary">
                    The Taghiyev Legacy
                  </h2>
                  <p className="text-lg text-foreground/80 text-pretty leading-relaxed">
                    Future Careers is proudly developed within the framework of
                    HZT Awards 2026 and is dedicated to the legacy of Haji
                    Zeynalabdin Taghiyev, a visionary philanthropist who
                    believed in the power of education and youth empowerment.
                  </p>
                  <p className="text-lg text-foreground/80 text-pretty leading-relaxed">
                    Inspired by his commitment to future generations, we
                    continue that mission by guiding students toward clarity,
                    opportunity, and long term success.
                  </p>
                </div>
              </div>
            </div>
          </ScrollSection>

          {/* Mission & Vision */}
          <ScrollSection>
            <div className="flex gap-x-10 flex-col lg:flex-row">
              <div className="flex-1 mb-16 space-y-6 bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
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
                <h2 className="text-2xl font-bold text-primary">Our Vision</h2>
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
          {/* <ScrollSection>
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
          </ScrollSection> */}
        </div>

        {/* Statistics */}
        <ScrollSection>
          <section className="my-12 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold text-primary mt-5">
                Statistics: Our Impact in Numbers
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {statistics.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-lg border bg-card text-center hover:border-primary transition-colors ${
                    stat.primary
                      ? "border-primary/40 p-8 sm:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-center"
                      : "border-border p-6"
                  }`}
                >
                  <p
                    className={`font-bold text-primary ${
                      stat.primary ? "text-5xl md:text-6xl" : "text-4xl"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p
                    className={`mt-2 text-foreground/80 ${
                      stat.primary ? "text-lg" : "text-base"
                    }`}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </ScrollSection>

        {/* Latest News Preview */}
        {/* <ScrollSection>
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
        </ScrollSection> */}

        {/* Team Section */}
        <ScrollSection className="pt-10" id="team">
          <section className="relative left-1/2 w-screen -translate-x-1/2 bg-primary py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-16 text-center">
                <h1 className="text-5xl font-bold text-primary-foreground mb-6 ">
                  Our Team
                </h1>
                <p className="text-xl text-primary-foreground/85 max-w-3xl text-pretty leading-relaxed mx-auto">
                  Behind Future Careers is a passionate team committed to
                  building opportunities for students and shaping pathways for a
                  better future.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <article
                    key={member.id}
                    className="group relative h-120 overflow-hidden rounded-2xl border border-white/20"
                  >
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : null}

                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent transition-colors duration-300 group-hover:from-black/90" />

                    <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-primary-foreground transition-transform duration-300 group-hover:-translate-y-2">
                      <h3 className="text-2xl font-semibold">{member.name}</h3>
                      <p className="mt-1 text-sm font-medium text-primary-foreground/90">
                        {member.role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-primary-foreground/85 line-clamp-3">
                        {member.bio}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              {/* Team Philosophy */}
              <div className="mt-12 space-y-6 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-primary-foreground">
                  Our Team Philosophy
                </h2>
                <p className="text-lg text-primary-foreground/85 text-pretty leading-relaxed">
                  Every member of our team is driven by the belief that
                  education and mentorship can transform lives. We work
                  collaboratively to create safe, inclusive spaces where
                  students can learn, grow, and discover their potential. Our
                  diversity of backgrounds and expertise allows us to serve our
                  students with depth, empathy, and professionalism.
                </p>
              </div>
            </div>
          </section>
        </ScrollSection>

        {/* Mentors Section */}
        <ScrollSection className="pt-24" id="mentors">
          <div className="relative left-1/2 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-16 text-center mx-auto">
                <h1 className="text-5xl font-bold text-primary mb-6">
                  Our Mentors
                </h1>
                <p className="text-xl text-foreground/80 max-w-3xl mx-auto text-pretty leading-relaxed">
                  Our mentors are experienced professionals and academic
                  advisors who guide students through career exploration,
                  academic planning, and personal development. They volunteer
                  their knowledge and experience to support students without any
                  fee.
                </p>
              </div>

              <MentorMarqueeGrid mentors={mentors} />
            </div>
          </div>
        </ScrollSection>

        {/* Reserve Meeting Section */}
        <ScrollSection className="py-24">
          <div className="mx-auto">
            <div className="bg-linear-to-br from-primary/5 to-secondary/5 rounded-lg p-8 border border-primary/20 text-center space-y-4 animate-fade-up">
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
                <AppLink
                  variant="heroCta"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdnQH8aIQbrU3t2HaVln-cPq-F4cd1r3MgLYoJ2-dANDOfGMw/viewform"
                  target="_blank"
                  className="rounded-full"
                >
                  Book Now
                </AppLink>
              </Button>
            </div>
          </div>
        </ScrollSection>
      </main>

      {/* News Popup Modal */}
      <NewsPopupModal latestNews={latestNews} />
    </>
  );
}
