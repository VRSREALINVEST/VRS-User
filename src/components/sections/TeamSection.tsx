import Image from "next/image";

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
}

// A server component: the page fetches the team (lib/publicContent) and the
// cards are rendered into the initial HTML, with no client JS. The section is
// hidden when there is no one to show or the API failed.
export default function TeamSection({
  members,
}: {
  members: TeamMember[] | null;
}) {
  if (!members?.length) return null;

  const isScrollable = members.length > 4;

  return (
    <section className="py-20 md:py-24">
      <div className="px-6 md:px-10 lg:px-20">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto mb-6 opacity-80"></div>

          <h2 className=" text-3xl md:text-4xl font-medium text-white tracking-[-0.01em]">
            Meet Our Team
          </h2>

          <p className=" text-gray-400 mt-4 text-[11px] md:text-sm tracking-[0.18em] uppercase">
            Experienced professionals dedicated to helping you create real
            freedom
          </p>
        </div>
        {/* SCROLL / GRID */}
        {/* next/image serves each photo resized for the card and loads it
            lazily; the card height is fixed, so nothing shifts as it loads. */}
        {isScrollable ? (
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
            {members.map((member) => (
              <div
                key={member._id}
                className="min-w-[260px] md:min-w-[300px] snap-start
                relative group rounded-2xl overflow-hidden
                border border-[var(--card-border)]
                bg-[var(--card-bg)]
                transition-all duration-500
                hover:border-[var(--primary-gold)]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
              >
                {/* IMAGE */}
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={600}
                    height={720}
                    sizes="(min-width: 768px) 300px, 260px"
                    className="w-full h-[340px] md:h-[360px] object-cover
                  group-hover:scale-105 transition duration-700"
                  />
                ) : (
                  <div className="h-[340px] md:h-[360px]" />
                )}

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 w-full p-5 text-center">
                  <h3 className=" text-white text-lg font-medium tracking-tight">
                    {member.name}
                  </h3>

                  <p className=" text-gray-400 mt-2 text-[11px] tracking-[0.15em] uppercase">
                    {member.role}
                  </p>

                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto mt-4 opacity-80"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member) => (
              <div
                key={member._id}
                className="relative group rounded-2xl overflow-hidden
                border border-[var(--card-border)]
                bg-[var(--card-bg)]
                transition-all duration-500
                hover:border-[var(--primary-gold)]/40"
              >
                {/* IMAGE */}
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={600}
                    height={720}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="w-full h-[340px] md:h-[360px] object-cover
                  group-hover:scale-105 transition duration-700"
                  />
                ) : (
                  <div className="h-[340px] md:h-[360px]" />
                )}

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 w-full p-5 text-center">
                  <h3 className="text-white text-lg font-medium">
                    {member.name}
                  </h3>

                  <p className="text-gray-400 mt-1 text-sm">{member.role}</p>

                  <div className="w-10 h-[2px] bg-[var(--primary-gold)] mx-auto mt-3"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
