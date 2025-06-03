// app/about/page.tsx
import TeamCard from "@/app/ui/user/TeamCard";
import { teamData } from "@/app/lib/placeholder-data";


export default function AboutPage() {
  return (
    <>
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-8 flex justify-center">
        <div className="w-full max-w-[1070px] bg-white rounded-2xl p-6">
          <h1 className="text-center text-black text-3xl font-bold mb-6">
            Our Team
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {teamData.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                description={member.description}
                image={member.image}
                tags={member.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
