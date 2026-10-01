export default function Home() {
  return (
    <main className="overflow-hidden bg-[#030711] text-white selection:bg-[#1677ff] selection:text-white">
      {/* HERO */}
      <section className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[-15%] top-[-15%] h-[650px] w-[650px] rounded-full bg-[#084ca8]/20 blur-[140px]" />
          <div className="absolute right-[-10%] top-[15%] h-[550px] w-[550px] rounded-full bg-[#0b2f6b]/30 blur-[150px]" />
          <div className="absolute bottom-[-30%] left-[35%] h-[600px] w-[600px] rounded-full bg-[#062557]/20 blur-[160px]" />

          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage: `
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030711]" />
        </div>

        {/* NAVBAR */}
        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1c6ed1]/30 bg-[#0a2a59]/40 shadow-[0_0_30px_rgba(22,119,255,0.12)]">
              <div className="h-3.5 w-3.5 rounded-full border-[3px] border-[#2f8cff]" />
            </div>

            <span className="text-xl font-semibold tracking-[-0.035em]">
              Orbit<span className="text-[#3b8cff]">X</span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 text-sm text-white/55 md:flex">
            <a href="#platform" className="transition hover:text-white">
              Platform
            </a>
            <a href="#solutions" className="transition hover:text-white">
              Solutions
            </a>
            <a href="#network" className="transition hover:text-white">
              Network
            </a>
            <a href="#company" className="transition hover:text-white">
              Company
            </a>
          </nav>

          <a
            href="#contact"
            className="rounded-full border border-[#2c74cb]/30 bg-[#0b2e61]/25 px-5 py-2.5 text-sm font-medium text-white/85 backdrop-blur transition hover:border-[#3a8df0]/60 hover:bg-[#0d3978]/40"
          >
            Talk to us
          </a>
        </header>

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-16 px-6 pb-24 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#2875cb]/20 bg-[#0b2a59]/25 px-4 py-2 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3b8cff] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3b8cff]" />
              </span>

              <span className="text-xs font-medium tracking-wide text-[#88baff]">
                Intelligent telecom operations
              </span>
            </div>

            <h1 className="max-w-4xl text-5xl font-medium leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-[88px]">
              Connectivity,
              <br />
              <span className="bg-gradient-to-r from-white/55 via-[#78aff5] to-[#2e7fe2] bg-clip-text text-transparent">
                orchestrated.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/50 sm:text-lg">
              OrbitX brings subscriptions, usage, allowances and billing
              together into one intelligent platform built for modern telecom
              operations.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#platform"
                className="rounded-full bg-[#1473e6] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_40px_rgba(20,115,230,0.25)] transition hover:bg-[#2584f5]"
              >
                Explore OrbitX
              </a>

              <a
                href="#solutions"
                className="rounded-full border border-white/10 bg-white/[0.025] px-6 py-3.5 text-sm text-white/70 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              >
                Discover solutions
              </a>
            </div>

            <div className="mt-16 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/[0.07] pt-7 text-xs text-white/35">
              <span>Real-time usage operations</span>
              <span>Automated billing</span>
              <span>Reliable connectivity lifecycle</span>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#126ed6]/10 blur-[100px]" />

            <div className="relative rounded-[30px] border border-[#3489eb]/15 bg-[#071323]/80 p-3 shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              <div className="rounded-[24px] border border-white/[0.07] bg-[#050b15]">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#5c8dc9]">
                      OrbitX Network
                    </p>
                    <p className="mt-1 text-base font-medium text-white/90">
                      Operations overview
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-[#1e7a57]/25 bg-[#0e3a2b]/20 px-3 py-1.5 text-[11px] text-[#58d29c]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#58d29c]" />
                    Operational
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-5">
                  <MetricCard
                    label="Subscriptions"
                    value="Active"
                    detail="Lifecycle connected"
                  />
                  <MetricCard
                    label="Usage engine"
                    value="Live"
                    detail="Processing continuously"
                  />
                  <MetricCard
                    label="Billing"
                    value="Automated"
                    detail="Cycle based"
                  />
                  <MetricCard
                    label="Allowance"
                    value="Real-time"
                    detail="Priority controlled"
                  />
                </div>

                <div className="mx-5 mb-5 rounded-2xl border border-white/[0.07] bg-[#08111f] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">
                        Network activity
                      </p>
                      <p className="mt-1 text-xs text-white/30">
                        Live operational events
                      </p>
                    </div>

                    <span className="rounded-full bg-[#0d2c57] px-2.5 py-1 text-[10px] text-[#6aa9ef]">
                      LIVE
                    </span>
                  </div>

                  <div className="space-y-5">
                    <Activity
                      title="Usage successfully processed"
                      subtitle="Allowance allocation completed"
                    />

                    <Activity
                      title="Billing cycle renewed"
                      subtitle="Monthly allowances activated"
                    />

                    <Activity
                      title="Subscription activated"
                      subtitle="Connectivity lifecycle started"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-[#2b78d1]/15 bg-[#07182f]/85 px-5 py-4 shadow-xl backdrop-blur-xl sm:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#5885b9]">
                Platform state
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#348cff]" />
                <span className="text-sm text-white/75">
                  Systems synchronized
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY STRIP */}
      <section className="border-y border-white/[0.06] bg-[#040a14]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/[0.06] px-6 md:grid-cols-4 lg:px-8">
          <Stat value="24/7" label="Operational readiness" />
          <Stat value="Real-time" label="Usage processing" />
          <Stat value="Automated" label="Billing lifecycle" />
          <Stat value="Unified" label="Telecom operations" />
        </div>
      </section>

      {/* PLATFORM */}
      <section
        id="platform"
        className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36"
      >
        <SectionIntro
          eyebrow="The platform"
          title="One operational layer for modern connectivity."
          description="OrbitX brings the moving parts of telecom operations into one coordinated platform — giving teams clearer control over customers, subscriptions, usage and billing."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <CapabilityCard
            number="01"
            title="Subscription operations"
            description="Manage the complete subscription lifecycle from activation through recurring service cycles."
          />

          <CapabilityCard
            number="02"
            title="Usage intelligence"
            description="Process network usage continuously and translate activity into accurate customer consumption."
          />

          <CapabilityCard
            number="03"
            title="Allowance control"
            description="Coordinate data, voice and messaging allowances with precise priority-based consumption."
          />

          <CapabilityCard
            number="04"
            title="Automated billing"
            description="Keep recurring service cycles moving automatically with reliable monthly renewals."
          />
        </div>
      </section>

      {/* SOLUTIONS */}
      <section
        id="solutions"
        className="relative border-y border-white/[0.06] bg-[#040a14]"
      >
        <div className="absolute right-[-20%] top-[-30%] h-[700px] w-[700px] rounded-full bg-[#093a82]/15 blur-[180px]" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-36">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4c91e6]">
              Built for operations
            </p>

            <h2 className="mt-5 max-w-lg text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
              Less operational noise.
              <span className="text-white/35"> More control.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-white/45">
              OrbitX is designed around the continuous flow of telecom
              operations — where subscriptions change, usage arrives, balances
              move and billing cycles never stop.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Solution
              title="Continuous processing"
              description="Usage moves through the platform as it happens, keeping customer balances aligned with network activity."
            />

            <Solution
              title="Reliable operations"
              description="Critical workflows are designed to remain consistent even when requests repeat or background work is retried."
            />

            <Solution
              title="Automated lifecycle"
              description="Recurring subscription cycles continue without requiring manual operational intervention."
            />

            <Solution
              title="Clear control"
              description="Every operational component remains focused on one source of truth across the platform."
            />
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section
        id="network"
        className="mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36"
      >
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-[#0f67c8]/10 blur-[110px]" />

            <div className="relative min-h-[480px] rounded-[32px] border border-[#2e78c7]/15 bg-[#06101f] p-6">
              <div
                className="absolute inset-0 rounded-[32px] opacity-[0.055]"
                style={{
                  backgroundImage: `
                    radial-gradient(circle, white 1px, transparent 1px)
                  `,
                  backgroundSize: "26px 26px",
                }}
              />

              <div className="relative flex h-full min-h-[430px] items-center justify-center">
                <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-[#2d7fd8]/15">
                  <div className="absolute h-56 w-56 rounded-full border border-[#2d7fd8]/20" />
                  <div className="absolute h-40 w-40 rounded-full border border-[#2d7fd8]/25" />

                  <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-[#4a98ee]/30 bg-[#0b2e5f] shadow-[0_0_70px_rgba(34,123,230,0.25)]">
                    <span className="text-xl font-semibold">
                      Orbit<span className="text-[#438ee7]">X</span>
                    </span>
                  </div>

                  <NetworkNode className="-left-5 top-12" label="Usage" />
                  <NetworkNode className="-right-5 top-12" label="Billing" />
                  <NetworkNode className="-bottom-4 left-16" label="Plans" />
                  <NetworkNode
                    className="-bottom-4 right-12"
                    label="Subscriptions"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4c91e6]">
              Connected by design
            </p>

            <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
              Every operation,
              <span className="text-white/35"> working together.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-white/45">
              OrbitX coordinates the systems behind connectivity so that usage,
              subscription state, allowances and billing remain synchronized as
              the network evolves.
            </p>

            <div className="mt-10 space-y-6">
              <FeatureLine
                title="Unified lifecycle"
                description="Subscription changes flow through one connected operational model."
              />
              <FeatureLine
                title="Continuous state"
                description="Usage and allowance balances remain aligned as activity is processed."
              />
              <FeatureLine
                title="Recurring automation"
                description="Monthly service cycles continue without manual intervention."
              />
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY */}
      <section
        id="company"
        className="border-y border-white/[0.06] bg-[#040a14]"
      >
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4c91e6]">
                OrbitX
              </p>

              <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-6xl">
                Telecom operations should feel
                <span className="text-white/35"> effortless.</span>
              </h2>
            </div>

            <p className="max-w-lg text-base leading-8 text-white/45">
              We believe connectivity platforms should remove operational
              friction, automate repetitive workflows and give telecom teams a
              clearer view of the systems they depend on every day.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030711] via-[#061327] to-[#071c3b]" />

        <div className="absolute left-1/2 top-1/2 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0c5fc2]/15 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-32 text-center lg:px-8 lg:py-40">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5599ea]">
            Move connectivity forward
          </p>

          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-6xl">
            A smarter operational layer
            <br />
            <span className="text-white/35">for modern telecom.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-white/45">
            Bring subscription, usage and billing operations together with
            OrbitX.
          </p>

          <a
            href="mailto:hello@orbitx.com"
            className="mt-10 inline-flex rounded-full bg-[#1677e8] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_50px_rgba(22,119,232,0.25)] transition hover:bg-[#2688f7]"
          >
            Contact OrbitX
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.07] bg-[#02050b]">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1d65b8]/25 bg-[#0a244c]/40">
                <div className="h-3 w-3 rounded-full border-[2px] border-[#3787e5]" />
              </div>

              <span className="font-semibold tracking-[-0.03em]">
                Orbit<span className="text-[#3a87e0]">X</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-7 text-xs text-white/35">
              <a href="#platform" className="transition hover:text-white/70">
                Platform
              </a>
              <a href="#solutions" className="transition hover:text-white/70">
                Solutions
              </a>
              <a href="#network" className="transition hover:text-white/70">
                Network
              </a>
              <a href="#company" className="transition hover:text-white/70">
                Company
              </a>
            </div>

            <p className="text-xs text-white/25">
              © 2026 OrbitX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#08121f] p-4 transition hover:border-[#2c75c8]/20 hover:bg-[#09182a]">
      <p className="text-[11px] text-white/30">{label}</p>
      <p className="mt-2 text-sm font-medium text-white/90">{value}</p>
      <p className="mt-1 text-[10px] text-[#507aa7]">{detail}</p>
    </div>
  );
}

function Activity({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#337bc7]/30 bg-[#0b2c59]">
        <div className="h-1.5 w-1.5 rounded-full bg-[#3a8ce7]" />
      </div>

      <div>
        <p className="text-sm text-white/75">{title}</p>
        <p className="mt-1 text-xs text-white/30">{subtitle}</p>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-5 py-8 first:pl-0 last:pr-0 md:px-8">
      <p className="text-lg font-medium text-white/85">{value}</p>
      <p className="mt-1 text-xs text-white/30">{label}</p>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4c91e6]">
          {eyebrow}
        </p>

        <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
          {title}
        </h2>
      </div>

      <p className="max-w-lg text-base leading-8 text-white/45">
        {description}
      </p>
    </div>
  );
}

function CapabilityCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#06101d] p-7 transition duration-300 hover:border-[#2d7acb]/25 hover:bg-[#07172a] sm:p-9">
      <div className="absolute right-[-70px] top-[-70px] h-44 w-44 rounded-full bg-[#0d5fbd]/0 blur-3xl transition duration-500 group-hover:bg-[#0d5fbd]/10" />

      <div className="relative">
        <span className="text-xs font-medium text-[#3f7eba]">{number}</span>

        <h3 className="mt-14 text-xl font-medium tracking-[-0.025em]">
          {title}
        </h3>

        <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
          {description}
        </p>

        <div className="mt-8 h-px w-10 bg-[#2b77c7]/50 transition-all duration-300 group-hover:w-20" />
      </div>
    </div>
  );
}

function Solution({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/[0.07] bg-[#06101d]/70 p-6 backdrop-blur">
      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-[#337bc7]/20 bg-[#0b2b58]/50">
        <div className="h-2.5 w-2.5 rounded-full bg-[#3c8ee9]" />
      </div>

      <h3 className="text-base font-medium">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-white/38">{description}</p>
    </div>
  );
}

function NetworkNode({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div
      className={`absolute rounded-full border border-[#2d76c5]/20 bg-[#08182d] px-4 py-2 text-[11px] text-[#76a6da] shadow-xl ${className}`}
    >
      {label}
    </div>
  );
}

function FeatureLine({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3589e7]" />

      <div>
        <h3 className="text-sm font-medium text-white/80">{title}</h3>
        <p className="mt-1.5 max-w-md text-sm leading-6 text-white/35">
          {description}
        </p>
      </div>
    </div>
  );
}
