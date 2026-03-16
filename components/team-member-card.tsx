import Image from "next/image";

interface TeamMemberCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    bio: string;
    photo?: string;
  };
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:scale-[1.04] hover:shadow-xl h-full flex flex-col">
      {/* Photo */}
      {member.photo && (
        <div className="w-full overflow-hidden bg-muted">
          <Image
            src={member.photo}
            alt={member.name}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-4 flex flex-col flex-grow">
        <div>
          <h3 className="font-semibold text-foreground text-lg">
            {member.name}
          </h3>
          <p className="text-sm text-primary font-medium">{member.role}</p>
        </div>

        <p className="text-foreground/70 text-sm leading-relaxed flex-grow">
          {member.bio}
        </p>
      </div>
    </div>
  );
}
